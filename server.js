import express from "express";
import dotenv from "dotenv";
import { askOpenAI, askGrok } from "./utils/aiClients.js";

dotenv.config();

const app = express();
app.use(express.json());

const GROK_CONFIG = { key: process.env.GROK_API_KEY, url: process.env.GROK_API_URL };

let sessions = {}; // multi-user chat history

app.post("/api/ask", async (req, res) => {
  const { userId, question, provider } = req.body;
  if (!question || !userId) return res.status(400).json({ error: "Missing userId or question" });

  if (!sessions[userId]) sessions[userId] = { history: [] };

  try {
    let answer = "";
    if (provider === "openai") answer = await askOpenAI(question, process.env.OPENAI_API_KEY);
    else if (provider === "grok") answer = await askGrok(question, GROK_CONFIG);
    else return res.status(400).json({ error: "Invalid provider" });

    sessions[userId].history.push({ question, answer, provider });
    res.json({ answer, history: sessions[userId].history });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.APP_PORT || 3000, () => console.log(`ThinkCage backend running on port ${process.env.APP_PORT || 3000}`));
