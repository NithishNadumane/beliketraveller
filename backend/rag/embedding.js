import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const HF_API_URL =
"https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";

export const generateEmbedding = async (text) => {

  const response = await axios.post(
    HF_API_URL,
    {
      inputs: text
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  const embedding = response.data.flat();

  return embedding;
};