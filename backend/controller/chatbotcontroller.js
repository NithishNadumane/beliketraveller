import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { retrieveContext } from "../rag/retrieveContext.js";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const chatWithGemini = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    let context = "";

    // Retrieve RAG information for meaningful queries
    if (userMessage.trim().length > 8) {
      console.time("RAG");

      context = await retrieveContext(userMessage);

      console.timeEnd("RAG");
    }

    const systemInstruction = `
You are BeLikeTraveller — a friendly AI travel companion.

You help users with travel-related questions, especially destinations,
places to visit, food, activities, hotels, routes, attractions and
experiences in Karnataka.

IMPORTANT:

1. Understand the user's question first.

2. If the question is travel-related:
   - Use the retrieved travel information below when it is relevant.
   - Combine the retrieved information with your general knowledge.
   - Do not restrict your answer only to the retrieved information.
   - If the user asks for a list, provide as many useful destinations as
     requested.
   - Prefer information from the retrieved travel data when available.
   - Do not make up specific details that are clearly unsupported by the
     retrieved information.

3. If the question is NOT travel-related:
   - Answer normally using your general knowledge.
   - Do not force the travel information into the answer.

4. Never mention RAG, retrieval, embeddings, vector databases, context,
   or internal implementation details.

5. Be friendly, helpful and conversational.

RETRIEVED TRAVEL INFORMATION:
${context || "No specific travel information was retrieved."}
`;

    console.time("Gemini");

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    console.timeEnd("Gemini");

    const reply =
      response.text?.trim() ||
      "Sorry, I couldn't generate a response.";

    return res.status(200).json({
      reply,
    });

  } catch (error) {
    console.error("Gemini chat error:", error);

    return res.status(500).json({
      error: "AI response failed",
    });
  }
};