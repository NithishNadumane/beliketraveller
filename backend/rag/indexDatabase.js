import path from "path";
import { fileURLToPath } from "url";
import PDFParser from "pdf2json";
import { generateEmbedding } from "./embedding.js";
import { index } from "./pineconeClient.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PDF_PATH = path.join(__dirname, "..", "data", "data.pdf");

function parsePDF(filePath) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", err => reject(err));

    pdfParser.on("pdfParser_dataReady", pdfData => {
      let text = "";

      pdfData.Pages.forEach(page => {
        page.Texts.forEach(textItem => {
          text += decodeURIComponent(textItem.R[0].T) + " ";
        });
      });

      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
}

async function indexPDF() {
  try {
    console.log("Reading PDF...");

    const text = await parsePDF(PDF_PATH);
    const chunks = text.match(/[\s\S]{1,800}/g) || [];

    console.log("Total chunks:", chunks.length);

    // ⚡ parallel embeddings
    const embeddings = await Promise.all(
      chunks.map(chunk => generateEmbedding(chunk))
    );

    const vectors = embeddings.map((emb, i) => ({
      id: `chunk-${i}`,
      values: emb[0],
      metadata: { text: chunks[i] }
    }));

    console.log("Uploading to Pinecone...");

    await index.upsert({
      records: vectors,
      namespace: "default"
    });

    console.log("✅ Successfully indexed");

  } catch (err) {
    console.error("ERROR:", err);
  }
}

indexPDF();