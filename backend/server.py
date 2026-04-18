from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging
import secrets
import bcrypt
import jwt
import random
import re
from datetime import datetime, timezone, timedelta
from pydantic import BaseModel, Field
from typing import List, Optional

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

JWT_ALGORITHM = "HS256"

def get_jwt_secret():
    return os.environ["JWT_SECRET"]

# Password utils
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {"sub": user_id, "email": email, "exp": datetime.now(timezone.utc) + timedelta(minutes=60), "type": "access"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)

# Auth helper
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Generate slug
def generate_slug(name: str) -> str:
    slug = re.sub(r'[^a-z0-9]+', '-', name.lower()).strip('-')
    return f"{slug}-{secrets.token_hex(4)}"

# --- MOCK AI REVIEW GENERATION ---
REVIEW_TEMPLATES = {
    "hotel": {
        "casual": [
            "Honestly, {name} was such a vibe! Super clean rooms, chill staff, and the location? Perfect for wandering around. Would totally stay again.",
            "Just got back from {name} and wow, I'm already missing it. Bed was like sleeping on a cloud. Breakfast had so many options I couldn't decide. 10/10.",
            "Spent the weekend at {name} and it was exactly what I needed. Easy check-in, comfy room, great pool area. Nothing fancy, just done really well.",
            "If you're looking for a no-hassle stay, {name} is it. Super friendly people, everything was clean, and the vibe was just right. Already booked my next trip!",
            "Loved {name}! The room was cozy, the view was gorgeous, and there's a great restaurant right downstairs. It felt like a mini vacation even on a work trip.",
            "{name} surprised me honestly. Didn't expect much but the rooms were spotless, staff remembered my name by day two, and the whole place just felt welcoming.",
        ],
        "formal": [
            "I had the privilege of staying at {name} recently, and the experience was truly exemplary. The accommodations were impeccably maintained, the staff demonstrated exceptional professionalism, and the amenities exceeded my expectations in every regard.",
            "{name} represents the gold standard in hospitality. From the seamless check-in process to the meticulously appointed rooms, every detail has been thoughtfully considered. I would unreservedly recommend this establishment to discerning travelers.",
            "During my recent visit to {name}, I was thoroughly impressed by the caliber of service and attention to detail. The property is beautifully maintained, the dining options are of superior quality, and the overall experience was one of refined comfort.",
            "It is with great pleasure that I commend {name} for an outstanding stay. The facilities are modern and well-maintained, the concierge team was exceptionally helpful, and the establishment upholds the highest standards of cleanliness and hospitality.",
            "Having traveled extensively, I can confidently state that {name} ranks among the finest accommodations I have experienced. The elegance of the property, combined with the attentive service, creates an environment of unparalleled comfort and distinction.",
            "{name} delivered an experience that was nothing short of exceptional. The room appointments were of the highest quality, the staff conducted themselves with admirable courtesy, and every aspect of my stay reflected a commitment to excellence.",
        ],
        "enthusiastic": [
            "OMG {name} is AMAZING!! The rooms are absolutely gorgeous, the staff are the sweetest people ever, and I literally did not want to leave! This is THE place to stay!! You HAVE to try it! ★★★★★",
            "I am OBSESSED with {name}!!! Everything from the lobby to the room to the rooftop was STUNNING. The breakfast spread was INSANE — like a dream come true! Best hotel experience of my LIFE!",
            "WOW WOW WOW!! {name} blew my mind!! The pool is incredible, the bed is heavenly, and the service is next-level amazing! I've already told ALL my friends they need to book here ASAP!",
            "{name} is a total GEM!! I was smiling the entire stay — the room was perfect, the views were breathtaking, and the team made me feel like a VIP! Cannot WAIT to come back!!",
            "If I could give {name} 10 stars I WOULD!! Every single thing was perfect — the spotless rooms, the amazing food, the incredible staff! This hotel has completely won my heart! ABSOLUTELY LOVED IT!",
            "HANDS DOWN the best hotel I've EVER stayed at!! {name} is pure magic — the ambiance, the comfort, the attention to detail! I'm literally counting down the days until I can go back!!",
        ],
    },
    "restaurant": {
        "casual": [
            "The food at {name} is seriously good. Went with a few friends and everyone loved what they ordered. Nothing too fussy, just really tasty food and a nice relaxed vibe.",
            "Had dinner at {name} and I'm still thinking about it. Great portions, fresh ingredients, and the dessert was next level. Definitely coming back soon.",
            "{name} is our new favorite spot. Good food, friendly staff, fair prices — what more do you need? We've been back three times already and it never disappoints.",
            "Dropped by {name} on a whim and so glad we did. The menu has something for everyone, the atmosphere is chill, and the food came out fast. Super solid all around.",
            "If you haven't tried {name} yet, you're missing out. We ordered the specials and they were incredible. The kind of place where you just feel at home. Love it.",
            "Went to {name} for a birthday dinner and it was perfect. Great food, great service, and they even surprised us with a little something extra. Really nice touch.",
        ],
        "formal": [
            "Dining at {name} was an exemplary culinary experience. Each course was prepared with evident skill and presented with artistic precision. The service was refined and attentive, befitting an establishment of this caliber.",
            "I am pleased to recommend {name} as a dining destination of the highest order. The menu demonstrates a masterful understanding of flavor profiles, and the ambiance is both sophisticated and welcoming. A truly distinguished restaurant.",
            "{name} consistently delivers an exceptional dining experience. The quality of ingredients is superb, the execution is flawless, and the sommelier's recommendations were impeccable. It is a credit to the culinary landscape of this area.",
            "Having dined at numerous acclaimed restaurants, I can attest that {name} stands apart. The attention to detail in every dish, the gracious service, and the refined atmosphere combine to create an experience of the highest distinction.",
            "It was a genuine pleasure to dine at {name}. The cuisine was of outstanding quality, the presentation was immaculate, and the staff demonstrated a level of professionalism that is increasingly rare. Most highly recommended.",
            "{name} has established itself as a benchmark for culinary excellence. From the carefully curated menu to the elegant dining environment, every element reflects a commitment to providing guests with a truly memorable experience.",
        ],
        "enthusiastic": [
            "The food at {name} is absolutely DIVINE!! Every single dish was bursting with flavor and the presentation was GORGEOUS! The service was incredible — this is a MUST-VISIT!! I'm telling EVERYONE!",
            "OH MY GOODNESS!! {name} is hands down the BEST restaurant I've ever been to!! The menu is creative, the portions are generous, and the atmosphere is PERFECT! I'm already planning my next visit!!",
            "BEST. DINING. EXPERIENCE. EVER!! {name} knocked it out of the park! The appetizers were AMAZING, the mains were SPECTACULAR, and don't even get me started on dessert!! INCREDIBLE!!",
            "{name} has completely STOLEN my heart!! The chef is an absolute GENIUS — every bite was like a flavor explosion! The staff was SO friendly and the whole vibe was just WONDERFUL! 11/10!!",
            "I literally CANNOT stop raving about {name}!! Went for dinner and it was the most MAGICAL meal! Fresh ingredients, creative recipes, and an atmosphere that made us want to stay forever!! ABSOLUTELY PERFECT!",
            "If you're looking for an UNFORGETTABLE meal, RUN don't walk to {name}!! The food is out of this WORLD, the service is top-notch, and the prices are totally fair! My new ALL-TIME FAVORITE restaurant!!",
        ],
    },
}

VALID_TONES = ["casual", "formal", "enthusiastic"]

def generate_reviews_for_place(name: str, category: str, tone: str = "casual") -> list:
    cat_key = category.lower()
    tone_key = tone.lower() if tone and tone.lower() in VALID_TONES else "casual"
    cat_templates = REVIEW_TEMPLATES.get(cat_key, REVIEW_TEMPLATES["restaurant"])
    templates = cat_templates.get(tone_key, cat_templates["casual"])
    selected = random.sample(templates, min(5, len(templates)))
    reviews = []
    for t in selected:
        rating = random.choice([4, 4, 5, 5, 5])
        reviews.append({
            "text": t.format(name=name),
            "rating": rating,
            "tone": tone_key,
            "generated_at": datetime.now(timezone.utc).isoformat()
        })
    return reviews

# --- MODELS ---
class LoginRequest(BaseModel):
    email: str
    password: str

class PlaceCreate(BaseModel):
    name: str
    category: str
    description: Optional[str] = ""
    address: Optional[str] = ""
    google_review_url: str
    image_url: Optional[str] = ""
    tone: Optional[str] = "casual"

class PlaceUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    google_review_url: Optional[str] = None
    image_url: Optional[str] = None
    tone: Optional[str] = None

class RegenerateRequest(BaseModel):
    tone: Optional[str] = None

# --- AUTH ROUTES ---
@api_router.post("/auth/login")
async def login(req: LoginRequest, response: Response):
    email = req.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(req.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=False, samesite="lax", max_age=3600, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=False, samesite="lax", max_age=604800, path="/")
    return {"token": access_token, "user": {"id": user_id, "email": user["email"], "name": user.get("name", ""), "role": user.get("role", "admin")}}

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return {"user": user}

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out"}

# --- PLACES ROUTES ---
@api_router.post("/places")
async def create_place(place: PlaceCreate, request: Request):
    user = await get_current_user(request)
    slug = generate_slug(place.name)
    tone = place.tone if place.tone and place.tone in VALID_TONES else "casual"
    reviews = generate_reviews_for_place(place.name, place.category, tone)
    doc = {
        "name": place.name,
        "category": place.category,
        "description": place.description,
        "address": place.address,
        "google_review_url": place.google_review_url,
        "image_url": place.image_url,
        "slug": slug,
        "tone": tone,
        "reviews": reviews,
        "total_scans": 0,
        "total_copies": 0,
        "created_by": user["_id"],
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat(),
    }
    result = await db.places.insert_one(doc)
    doc["id"] = str(result.inserted_id)
    doc.pop("_id", None)
    return doc

@api_router.get("/places")
async def list_places(request: Request):
    user = await get_current_user(request)
    places = await db.places.find({}, {"_id": 1, "name": 1, "category": 1, "slug": 1, "total_scans": 1, "total_copies": 1, "google_review_url": 1, "image_url": 1, "address": 1, "description": 1, "tone": 1, "created_at": 1}).to_list(1000)
    for p in places:
        p["id"] = str(p.pop("_id"))
    return places

@api_router.get("/places/{place_id}")
async def get_place(place_id: str, request: Request):
    user = await get_current_user(request)
    place = await db.places.find_one({"_id": ObjectId(place_id)})
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    place["id"] = str(place.pop("_id"))
    return place

@api_router.put("/places/{place_id}")
async def update_place(place_id: str, update: PlaceUpdate, request: Request):
    user = await get_current_user(request)
    updates = {k: v for k, v in update.model_dump().items() if v is not None}
    if not updates:
        raise HTTPException(status_code=400, detail="No fields to update")
    updates["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.places.update_one({"_id": ObjectId(place_id)}, {"$set": updates})
    place = await db.places.find_one({"_id": ObjectId(place_id)})
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    place["id"] = str(place.pop("_id"))
    return place

@api_router.delete("/places/{place_id}")
async def delete_place(place_id: str, request: Request):
    user = await get_current_user(request)
    result = await db.places.delete_one({"_id": ObjectId(place_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Place not found")
    return {"message": "Place deleted"}

@api_router.post("/places/{place_id}/regenerate-reviews")
async def regenerate_reviews(place_id: str, body: RegenerateRequest, request: Request):
    user = await get_current_user(request)
    place = await db.places.find_one({"_id": ObjectId(place_id)})
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    tone = body.tone if body.tone and body.tone in VALID_TONES else place.get("tone", "casual")
    reviews = generate_reviews_for_place(place["name"], place["category"], tone)
    await db.places.update_one({"_id": ObjectId(place_id)}, {"$set": {"reviews": reviews, "tone": tone, "updated_at": datetime.now(timezone.utc).isoformat()}})
    return {"reviews": reviews, "tone": tone}

# --- PUBLIC ROUTES (no auth needed) ---
@api_router.get("/public/place/{slug}")
async def get_public_place(slug: str, request: Request):
    place = await db.places.find_one({"slug": slug})
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    # Track scan
    await db.places.update_one({"_id": place["_id"]}, {"$inc": {"total_scans": 1}})
    await db.scan_events.insert_one({
        "place_id": str(place["_id"]),
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "user_agent": request.headers.get("user-agent", ""),
    })
    return {
        "name": place["name"],
        "category": place["category"],
        "description": place.get("description", ""),
        "address": place.get("address", ""),
        "google_review_url": place["google_review_url"],
        "image_url": place.get("image_url", ""),
        "reviews": place.get("reviews", []),
        "slug": place["slug"],
    }

@api_router.post("/public/place/{slug}/copy")
async def track_copy(slug: str):
    place = await db.places.find_one({"slug": slug})
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    await db.places.update_one({"_id": place["_id"]}, {"$inc": {"total_copies": 1}})
    await db.copy_events.insert_one({
        "place_id": str(place["_id"]),
        "timestamp": datetime.now(timezone.utc).isoformat(),
    })
    return {"message": "Copy tracked"}

# --- ANALYTICS ---
@api_router.get("/analytics/overview")
async def analytics_overview(request: Request):
    user = await get_current_user(request)
    total_places = await db.places.count_documents({})
    pipeline = [{"$group": {"_id": None, "total_scans": {"$sum": "$total_scans"}, "total_copies": {"$sum": "$total_copies"}}}]
    result = await db.places.aggregate(pipeline).to_list(1)
    stats = result[0] if result else {"total_scans": 0, "total_copies": 0}
    # Recent scans (last 7 days)
    seven_days_ago = (datetime.now(timezone.utc) - timedelta(days=7)).isoformat()
    recent_scans = await db.scan_events.count_documents({"timestamp": {"$gte": seven_days_ago}})
    recent_copies = await db.copy_events.count_documents({"timestamp": {"$gte": seven_days_ago}})
    # Top places
    top_places = await db.places.find({}, {"_id": 0, "name": 1, "category": 1, "total_scans": 1, "total_copies": 1, "slug": 1}).sort("total_scans", -1).to_list(5)
    return {
        "total_places": total_places,
        "total_scans": stats.get("total_scans", 0),
        "total_copies": stats.get("total_copies", 0),
        "recent_scans_7d": recent_scans,
        "recent_copies_7d": recent_copies,
        "top_places": top_places,
    }

# Include router
app.include_router(api_router)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Startup: seed admin + create indexes
@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.places.create_index("slug", unique=True)
    # Seed admin
    admin_email = os.environ.get("ADMIN_EMAIL", "admin@reviewboost.com")
    admin_password = os.environ.get("ADMIN_PASSWORD", "admin123")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({"email": admin_email, "password_hash": hashed, "name": "Admin", "role": "admin", "created_at": datetime.now(timezone.utc).isoformat()})
        logger.info(f"Admin user seeded: {admin_email}")
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})
        logger.info("Admin password updated")
    # Write test credentials
    os.makedirs("/app/memory", exist_ok=True)
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write(f"# Test Credentials\n\n## Admin\n- Email: {admin_email}\n- Password: {admin_password}\n- Role: admin\n\n## Auth Endpoints\n- POST /api/auth/login\n- GET /api/auth/me\n- POST /api/auth/logout\n")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
