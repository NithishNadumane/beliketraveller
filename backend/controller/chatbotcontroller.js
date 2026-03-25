import axios from "axios";
import dotenv from "dotenv";
import { retrieveContext } from "../rag/retrieveContext.js";

dotenv.config();

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";

export const chatWithLlama = async (req, res) => {
  try {
    const userMessage = req.body.message;

    let context = "";

    // 🔥 only run RAG for meaningful queries
    if (userMessage.length > 8) {
      context = await retrieveContext(userMessage);
    }

    const payload = {
      model: "meta-llama/Llama-3.1-8B-Instruct", // ⚡ faster model
      messages: [
        {
          role: "system",
          content: "You are BeLikeTraveller — a friendly AI travel companion."
        },
        {
          role: "system",
          content: `Use this travel knowledge:\n${context}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
    };

    const response = await axios.post(HF_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "Sorry, I didn’t understand that.";

    res.json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "RAG error" });
  }
};