require("dotenv").config(); // Load environment variables

const express = require("express");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// Gemini AI initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Serve HTML file
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// /ask endpoint
app.post("/ask", async (req, res) => {
  const { question, requestId } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ error: "Question is empty." });
  }

  // Block specific questions using regex
  const blockedPattern = /\bk\s*-?\s*map\b/i; // Matches "k map", "k-map", etc.
  if (blockedPattern.test(question)) {
    return res.json({ answer: "I'm sorry, I can't answer that question." });
  }

  console.log(`[${new Date().toISOString()}] Received question: "${question}" | Req ID: ${requestId}`);

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(question);
    const response = await result.response;
    const answer = response.text();

    console.log("✅ AI Answer:", answer);

    res.json({ answer });
  } catch (error) {
    console.error("❌ Error from Gemini API:", error.message || error);
    res.status(500).json({ error: "Failed to generate AI response." });
  }
});

// Optional stop handler
app.post("/stop", (req, res) => {
  const { requestId } = req.body;
  console.log(`🛑 Stop requested for Request ID: ${requestId}`);
  // Handle cancellation logic here if needed
  res.status(200).json({ message: "Request stop acknowledged." });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
