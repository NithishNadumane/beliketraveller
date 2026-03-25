import { generateEmbedding } from "./embedding.js";
import { index } from "./pineconeClient.js";

export const retrieveContext = async (question) => {
  const [embedding] = await generateEmbedding(question);

  const result = await index.query({
    vector: embedding,
    topK: 2, // ⚡ reduced from 3
    includeMetadata: true,
    namespace: "default"
  });

  return result.matches
    .map(match => match.metadata.text)
    .join("\n");
};