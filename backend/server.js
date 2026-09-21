require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

console.log("API key loaded:", !!process.env.GEMINI_API_KEY);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
    res.send("SmartStudy AI Backend is running!");
});

async function askGemini(question) {
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Gemini attempt ${attempt}/${maxRetries}`);

            const response = await ai.models.generateContent({
                model: "gemini-3.5-flash-lite",
                contents: question
            });

            return response.text;

        } catch (error) {
            console.log(`Attempt ${attempt} failed:`, error.status);

            if (error.status !== 503 || attempt === maxRetries) {
                throw error;
            }

            const waitTime = attempt * 3000;

            console.log(`Retrying in ${waitTime / 1000} seconds...`);

            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
    }
}

app.post("/ask-ai", async (req, res) => {

    console.log("POST /ask-ai received");

    try {
        const question = req.body.question;

        console.log("Question:", question);

        const answer = await askGemini(question);

        console.log("Gemini response received");

        res.json({
            answer: answer
        });

    } catch (error) {

        console.log("GEMINI ERROR:", error);

        res.status(500).json({
            error: "Gemini is temporarily busy. Please try again in a moment."
        });
    }
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});