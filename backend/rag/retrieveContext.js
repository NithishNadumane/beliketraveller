import { generateEmbedding } from "./embedding.js";
import { index } from "./pineconeClient.js";

export const retrieveContext = async (question) => {

  const [embedding] = await generateEmbedding(question);
  console.time("pinecone query")
  const result = await index.query({
    vector: embedding,
    topK: 2, // ⚡ reduced from 3
    includeMetadata: true,
    namespace: "default"
  });
  console.timeEnd("pinecone query")

  return result.matches
    .map(match => match.metadata.text)
    .join("\n");
};