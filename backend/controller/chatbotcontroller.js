import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const HF_API_URL = "https://router.huggingface.co/v1/chat/completions";

export const chatWithLlama = async (req, res) => {
  try {
    const userMessage = req.body.message;

    const payload = {
      model: "meta-llama/Llama-3.1-8B-Instruct:novita", // ✅ correct model format
      messages: [
        {
          role: "system",
          content:
            "You are BeLikeTraveller — a friendly AI travel companion who gives travel tips, destination ideas, and helps users plan trips.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    };

    const response = await axios.post(HF_API_URL, payload, {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`, // ✅ use .env key
        "Content-Type": "application/json",
      },
    });

    console.log("HF API Key:", process.env.HF_API_KEY ? "Loaded ✅" : "❌ Missing");

    // ✅ The API now returns data.choices[0].message.content
    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "Sorry, I didn’t understand that.";

    res.json({ reply });
  } catch (err) {
    console.error("Hugging Face API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Error connecting to Hugging Face API" });
  }
};
