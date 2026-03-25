import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateEmbedding = async (text) => {
  try {
    const response = await axios.post(
      "https://api.jina.ai/v1/embeddings",
      {
        input: Array.isArray(text) ? text : [text],
        model: "jina-embeddings-v2-base-en"
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.JINA_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.data.map(d => d.embedding);

  } catch (err) {
    console.error("Embedding error:", err.response?.data || err.message);
    throw err;
  }
};