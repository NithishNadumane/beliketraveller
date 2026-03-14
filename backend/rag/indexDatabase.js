import pool from "../db.js";
import { generateEmbedding } from "./embedding.js";
import { collection } from "./chromaClient.js";

async function indexDatabase() {

  console.log("Indexing database...");

  const places = await pool.query(
    "SELECT id, name, description FROM places"
  );

  for (const p of places.rows) {

    const text = `
Place: ${p.name}
Description: ${p.description}
`;

    const embedding = await generateEmbedding(text);

    await collection.add({
      ids: [String(p.id)],
      embeddings: [embedding],
      documents: [text]
    });

  }

  console.log("Indexing completed.");

}

indexDatabase();