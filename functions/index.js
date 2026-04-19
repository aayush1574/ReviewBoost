/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

/* eslint-disable */
const {setGlobalOptions} = require("firebase-functions");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({maxInstances: 10});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({origin: true}));
app.use(express.json());

// Example API Route
app.get("/api/hello", (req, res) => {
  res.status(200).send({message: "Hello from Firebase Backend!"});
});

// AI Review Route
app.post("/api/review", async (req, res) => {
  const {code} = req.body;
  if (!code) {
    return res.status(400).send({error: "Code is required in the request body"});
  }

  try {
    const prompt = `You are an expert code reviewer. Please review the provided code, pointing out bugs, optimizations, and best practices. Format your response in clean Markdown.\n\nCode to review:\n${code}`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{text: prompt}]
        }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error((data.error && data.error.message) || "Failed to fetch review from Gemini");
    }

    const review = data.candidates[0].content.parts[0].text;
    res.status(200).send({review});
  } catch (error) {
    console.error("Error during AI review:", error);
    res.status(500).send({error: error.message});
  }
});

// Export the Express app as a Firebase Cloud Function
exports.api = functions.https.onRequest(app);
