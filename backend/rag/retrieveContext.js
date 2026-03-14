import { generateEmbedding } from "./embedding.js";
import { collection } from "./chromaClient.js";

export const retrieveContext = async (question) => {

  const embedding = await generateEmbedding(question);

  const result = await collection.query({
    queryEmbeddings: [embedding],
    nResults: 3
  });

  if (!result.documents || result.documents.length === 0) {
    return "";
  }

  return result.documents[0].join("\n");
};