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
    "hotel": [
        "Absolutely loved my stay at {name}! The rooms were spotless and the staff went above and beyond to make us feel welcome. The location is perfect for exploring the area. Would definitely recommend to anyone looking for a comfortable stay.",
        "What a wonderful experience at {name}. From the moment we checked in, everything was seamless. The amenities were top-notch and the breakfast spread was incredible. Can't wait to come back!",
        "Had an amazing time at {name}. The ambiance is so relaxing and the room service was prompt and delicious. Perfect place for a weekend getaway. Five stars all the way!",
        "{name} exceeded all my expectations. The attention to detail in every aspect of our stay was remarkable. The pool area is gorgeous and the concierge helped us plan the perfect itinerary.",
        "Stayed at {name} for our anniversary and it was absolutely perfect. The room had a beautiful view, the bed was incredibly comfortable, and the restaurant downstairs served some of the best food we've ever had.",
        "I've stayed at many hotels but {name} stands out. The cleanliness, the friendly staff, and the overall vibe make it a must-visit. Already planning my next trip here!",
    ],
    "restaurant": [
        "The food at {name} is absolutely divine! Every dish was bursting with flavor and the presentation was beautiful. The service was attentive without being intrusive. A must-visit!",
        "Had dinner at {name} last night and I'm still thinking about it. The menu is creative, the portions are generous, and the atmosphere is perfect for a special night out. Highly recommend!",
        "Best dining experience in town! {name} never disappoints. The chef clearly puts passion into every plate. The appetizers were as impressive as the mains. Will be back soon!",
        "{name} has become our go-to spot for family dinners. The variety on the menu means everyone finds something they love. Great value for money and always consistent quality.",
        "Visited {name} on a friend's recommendation and wow, what a gem! The ambiance is warm and inviting, the staff is super friendly, and the food is out of this world. Don't miss the desserts!",
        "If you're looking for an unforgettable meal, {name} is the place. Fresh ingredients, creative recipes, and an atmosphere that makes you want to linger. Top marks across the board!",
    ],
}

def generate_reviews_for_place(name: str, category: str) -> list:
    cat_key = category.lower()
    templates = REVIEW_TEMPLATES.get(cat_key, REVIEW_TEMPLATES["restaurant"])
    selected = random.sample(templates, min(5, len(templates)))
    reviews = []
    for t in selected:
        rating = random.choice([4, 4, 5, 5, 5])
        reviews.append({
            "text": t.format(name=name),
            "rating": rating,
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

class PlaceUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    google_review_url: Optional[str] = None
    image_url: Optional[str] = None

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
    reviews = generate_reviews_for_place(place.name, place.category)
    doc = {
        "name": place.name,
        "category": place.category,
        "description": place.description,
        "address": place.address,
        "google_review_url": place.google_review_url,
        "image_url": place.image_url,
        "slug": slug,
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
    places = await db.places.find({}, {"_id": 1, "name": 1, "category": 1, "slug": 1, "total_scans": 1, "total_copies": 1, "google_review_url": 1, "image_url": 1, "address": 1, "description": 1, "created_at": 1}).to_list(1000)
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
async def regenerate_reviews(place_id: str, request: Request):
    user = await get_current_user(request)
    place = await db.places.find_one({"_id": ObjectId(place_id)})
    if not place:
        raise HTTPException(status_code=404, detail="Place not found")
    reviews = generate_reviews_for_place(place["name"], place["category"])
    await db.places.update_one({"_id": ObjectId(place_id)}, {"$set": {"reviews": reviews, "updated_at": datetime.now(timezone.utc).isoformat()}})
    return {"reviews": reviews}

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
