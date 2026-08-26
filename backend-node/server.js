require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initDb, query } = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

const path = require("path");
const fs = require("fs");
const multer = require("multer");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Serve static uploaded files
app.use("/uploads", express.static(uploadDir));


const REVIEW_TEMPLATES = require("./templates");

async function generateReviews(name, category, tone) {
  const normTone = tone ? tone.toLowerCase().trim() : 'casual';
  const normCategory = category ? category.toLowerCase().trim() : 'other';

  if (process.env.GEMINI_API_KEY) {
    try {
      const prompt = `Generate 3 distinct, high-quality Google reviews for a ${category} named "${name}". 
      The reviews should have a ${tone} tone.
      Output them as a JSON array of objects with "rating" (number, mostly 5) and "text" (string). Only output valid JSON.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0]) {
        const rawText = data.candidates[0].content.parts[0].text;
        const jsonMatch = rawText.match(/\[.*\]/s);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      }
    } catch (err) {
      console.error("Gemini failed, falling back to local templates", err);
    }
  }

  const catTemplates = REVIEW_TEMPLATES[normCategory] || REVIEW_TEMPLATES.other;
  const templates = catTemplates[normTone] || catTemplates.casual || REVIEW_TEMPLATES.other.casual;
  const shuffled = [...templates].sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 3);

  return selected.map(template => ({
    rating: Math.random() > 0.3 ? 5 : 4,
    text: template.replace(/{name}/g, name)
  }));
}

// API Routes


// Hello route
app.get("/api/hello", (req, res) => {
  res.status(200).send({ message: "Hello from Standalone Node Backend!" });
});

// Image Upload Endpoint
app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
  const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});


// Admin Auth Routes (matching original hardcoded auth)
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const lowerEmail = email ? email.toLowerCase().trim() : "";
  if ((lowerEmail === "admin@admin.com" || lowerEmail === "admin@reviewboost.com" || lowerEmail === "admin@googleboost.com") && password === "admin123") {
    res.json({ token: "admin-secret-token", user: { id: 1, email: lowerEmail } });
  } else {
    res.status(401).json({ error: "Invalid credentials", detail: "Invalid email or password" });
  }
});

app.get("/api/auth/me", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader === "Bearer admin-secret-token") {
    res.json({ user: { id: 1, email: "admin@reviewboost.com" } });
  } else {
    res.status(401).json({ error: "Unauthorized", detail: "Session expired or unauthorized" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.json({ success: true });
});

// --- PLACES API ---

// List places
app.get("/api/places", async (req, res) => {
  try {
    const rows = await query("SELECT * FROM places ORDER BY id DESC");
    // Standardize structure: Firestore documents returned reviews as objects/arrays
    const places = rows.map(row => ({
      ...row,
      id: String(row.id),
      reviews: row.reviews ? JSON.parse(row.reviews) : []
    }));
    res.json(places);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch places" });
  }
});

// Create place
app.post("/api/places", async (req, res) => {
  try {
    const place = req.body;
    const tone = place.tone || 'casual';

    const generatedReviews = await generateReviews(place.name, place.category, tone);
    const reviewsStr = JSON.stringify(generatedReviews);

    const todayStr = new Date().toISOString().split('T')[0];

    // Insert place
    const result = await query(
      `INSERT INTO places (name, category, address, description, google_review_url, image_url, tone, reviews, last_rotated_date, total_scans, total_copies) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)`,
      [
        place.name,
        place.category,
        place.address || "",
        place.description || "",
        place.google_review_url || "",
        place.image_url || "",
        tone,
        reviewsStr,
        todayStr
      ]
    );

    const insertedId = String(result.insertId);

    // Update slug to match the ID
    await query("UPDATE places SET slug = ? WHERE id = ?", [insertedId, result.insertId]);

    res.json({
      id: insertedId,
      slug: insertedId,
      name: place.name,
      category: place.category,
      address: place.address || "",
      description: place.description || "",
      google_review_url: place.google_review_url || "",
      image_url: place.image_url || "",
      tone,
      reviews: generatedReviews,
      total_scans: 0,
      total_copies: 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create place" });
  }
});

// Regenerate reviews
app.post("/api/places/:id/regenerate-reviews", async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await query("SELECT * FROM places WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });

    const place = rows[0];
    const tone = req.body.tone || place.tone || 'casual';

    const generatedReviews = await generateReviews(place.name, place.category, tone);
    const reviewsStr = JSON.stringify(generatedReviews);
    const todayStr = new Date().toISOString().split('T')[0];
    await query("UPDATE places SET reviews = ?, tone = ?, last_rotated_date = ? WHERE id = ?", [reviewsStr, tone, todayStr, id]);

    res.json({ reviews: generatedReviews, tone: tone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to regenerate reviews" });
  }
});

// Get single place
app.get("/api/places/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const rows = await query("SELECT * FROM places WHERE id = ?", [id]);
    if (rows.length === 0) return res.status(404).json({ error: "Not found" });

    const place = rows[0];
    res.json({
      ...place,
      id: String(place.id),
      reviews: place.reviews ? JSON.parse(place.reviews) : []
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch place" });
  }
});

// Delete place
app.delete("/api/places/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await query("DELETE FROM places WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete place" });
  }
});

// --- PUBLIC ROUTES (QR SCANS) ---

// Public get place by slug or ID
app.get("/api/public/place/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    // Check slug or integer ID
    let rows = await query("SELECT * FROM places WHERE slug = ?", [slug]);
    if (rows.length === 0 && !isNaN(slug)) {
      rows = await query("SELECT * FROM places WHERE id = ?", [parseInt(slug)]);
    }

    if (rows.length === 0) return res.status(404).json({ error: "Not found" });

    const placeData = rows[0];
    const todayStr = new Date().toISOString().split('T')[0];

    let reviewsArr = [];
    if (placeData.last_rotated_date !== todayStr) {
      try {
        const freshReviews = await generateReviews(placeData.name, placeData.category, placeData.tone);
        const reviewsStr = JSON.stringify(freshReviews);
        await query("UPDATE places SET reviews = ?, last_rotated_date = ? WHERE id = ?", [reviewsStr, todayStr, placeData.id]);
        reviewsArr = freshReviews;
        console.log(`Auto-rotated reviews to today's date for place: ${placeData.name}`);
      } catch (err) {
        console.error("Failed to auto-rotate reviews on fetch:", err);
        reviewsArr = placeData.reviews ? JSON.parse(placeData.reviews) : [];
      }
    } else {
      reviewsArr = placeData.reviews ? JSON.parse(placeData.reviews) : [];
    }

    // Increment scans
    const newScans = (placeData.total_scans || 0) + 1;
    await query("UPDATE places SET total_scans = ? WHERE id = ?", [newScans, placeData.id]);

    res.json({
      ...placeData,
      id: String(placeData.id),
      reviews: reviewsArr,
      total_scans: newScans
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch place" });
  }
});

// Track copy
app.post("/api/public/place/:slug/copy", async (req, res) => {
  try {
    const slug = req.params.slug;
    let rows = await query("SELECT * FROM places WHERE slug = ?", [slug]);
    if (rows.length === 0 && !isNaN(slug)) {
      rows = await query("SELECT * FROM places WHERE id = ?", [parseInt(slug)]);
    }

    if (rows.length === 0) return res.status(404).json({ error: "Not found" });

    const placeData = rows[0];
    await query("UPDATE places SET total_copies = total_copies + 1 WHERE id = ?", [placeData.id]);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update copy count" });
  }
});

// AI Review Route (Original raw AI Review endpoint)
app.post("/api/review", async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).send({ error: "Code is required in the request body" });
  }

  try {
    const prompt = `You are an expert code reviewer. Please review the provided code, pointing out bugs, optimizations, and best practices. Format your response in clean Markdown.\n\nCode to review:\n${code}`;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).send({ error: "GEMINI_API_KEY is not configured on the server." });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error((data.error && data.error.message) || "Failed to fetch review from Gemini");
    }

    const review = data.candidates[0].content.parts[0].text;
    res.status(200).send({ review });
  } catch (error) {
    console.error("Error during AI review:", error);
    res.status(500).send({ error: error.message });
  }
});

// Init DB and Start Server
initDb().then(() => {
  // Start the background schedule to proactively rotate reviews daily
  // Runs every 4 hours to find any places not yet rotated to today's date.
  setInterval(async () => {
    try {
      const todayStr = new Date().toISOString().split('T')[0];
      const rows = await query("SELECT * FROM places WHERE last_rotated_date IS NULL OR last_rotated_date != ?", [todayStr]);
      for (const place of rows) {
        console.log(`Background auto-rotating reviews for place ID ${place.id} (${place.name})`);
        const freshReviews = await generateReviews(place.name, place.category, place.tone);
        await query("UPDATE places SET reviews = ?, last_rotated_date = ? WHERE id = ?", [JSON.stringify(freshReviews), todayStr, place.id]);
      }
    } catch (err) {
      console.error("Error in background daily auto-rotation:", err);
    }
  }, 4 * 60 * 60 * 1000); // every 4 hours

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize database", err);
  process.exit(1);
});
