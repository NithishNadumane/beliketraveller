import { GoogleGenAI } from "@google/genai";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { spawn } from "child_process";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


// ==========================================
// RUN PYTHON + OPENCV
// ==========================================

function extractFrames(videoPath, outputDir) {
  return new Promise((resolve, reject) => {

    const python = spawn("python", [
      path.join(process.cwd(), "services", "extractFrames.py"),
      videoPath,
      outputDir
    ]);

    let output = "";
    let errorOutput = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    python.on("close", (code) => {

      if (code !== 0) {
        reject(
          new Error(
            errorOutput || "OpenCV frame extraction failed"
          )
        );

        return;
      }

      try {
        const result = JSON.parse(output);
        resolve(result);

      } catch (error) {
        reject(
          new Error(
            "Could not parse OpenCV response"
          )
        );
      }
    });
  });
}


// ==========================================
// CHECK TRAVEL VIDEO
// ==========================================

export async function checkTravelVideo(
  videoBuffer,
  mimeType = "video/mp4"
) {

  let tempFilePath;
  let framesDir;

  try {

    // ==========================================
    // 1. CREATE TEMPORARY MP4
    // ==========================================

    const extension =
      mimeType.split("/")[1] || "mp4";

    tempFilePath = path.join(
      os.tmpdir(),
      `travel-reel-${Date.now()}.${extension}`
    );

    await fs.writeFile(
      tempFilePath,
      videoBuffer
    );

    console.log(
      "Temporary video created:",
      tempFilePath
    );


    // ==========================================
    // 2. CREATE FRAMES DIRECTORY
    // ==========================================

    framesDir = path.join(
      os.tmpdir(),
      `travel-frames-${Date.now()}`
    );

    await fs.mkdir(
      framesDir,
      { recursive: true }
    );


    // ==========================================
    // 3. EXTRACT FRAMES USING OPENCV
    // ==========================================

    console.log(
      "Extracting frames using OpenCV..."
    );

    const frameResult = await extractFrames(
      tempFilePath,
      framesDir
    );

    if (!frameResult.success) {
      throw new Error(
        frameResult.error ||
        "Frame extraction failed"
      );
    }

    console.log(
      `Extracted ${frameResult.frames.length} frames`
    );

    console.log(
      "Video duration:",
      frameResult.duration,
      "seconds"
    );


    // ==========================================
    // 4. READ EXTRACTED FRAMES
    // ==========================================

    const frameParts = [];

    for (const framePath of frameResult.frames) {

      const imageBuffer =
        await fs.readFile(framePath);

      const base64Image =
        imageBuffer.toString("base64");

      frameParts.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image
        }
      });
    }


    // ==========================================
    // 5. GEMINI PROMPT
    // ==========================================

    const prompt = `
You are a travel-content classifier.

You are given multiple frames extracted from the SAME video.

Analyze ALL frames together and determine whether
the video is primarily related to travel or tourism.

TRAVEL-RELATED CONTENT INCLUDES:

- Tourist destinations
- Beaches
- Mountains
- Trekking
- Temples
- Waterfalls
- Historical places
- Tourist attractions
- Sightseeing
- Road trips
- Nature destinations
- Tourism activities
- Hotels or resorts when presented as part of travel
- Travel experiences
- Famous places or monuments

NOT TRAVEL-RELATED:

- Gaming
- Cooking
- Dance
- Gym/workout
- Random selfies
- Product advertisements
- Memes
- Entertainment unrelated to travel
- Ordinary daily-life videos
- Videos where travel is not the main subject

IMPORTANT:

Judge the PRIMARY content represented by ALL frames.

Do not classify a video as travel just because
one frame contains a person, road, building, or nature.

Look for evidence that the overall video represents
a travel or tourism experience.

Return ONLY JSON in exactly this format:

{
  "isTravel": true,
  "confidence": 0.95,
  "category": "beach",
  "reason": "The frames primarily show a tourist beach destination."
}

Rules:

- isTravel must be true or false.
- confidence must be between 0 and 1.
- category should describe the main travel category.
- If the video is not travel-related, set isTravel to false.
- Do not include markdown.
`;


    // ==========================================
    // 6. SEND FRAMES TO GEMINI
    // ==========================================

    console.log(
      "Sending extracted frames to Gemini..."
    );

    const response =
      await ai.models.generateContent({

        model: "gemini-3.5-flash-lite",

        contents: [
          {
            role: "user",

            parts: [
              ...frameParts,

              {
                text: prompt
              }
            ]
          }
        ],

        config: {
          responseMimeType: "application/json"
        }
      });


    // ==========================================
    // 7. CONVERT GEMINI RESPONSE TO JSON
    // ==========================================

    const result =
      JSON.parse(response.text);

    console.log(
      "Gemini result:",
      result
    );

    return result;


  } catch (error) {

    console.error(
      "Travel video AI check failed:",
      error
    );

    throw error;


  } finally {


    // ==========================================
    // 8. DELETE TEMPORARY VIDEO
    // ==========================================

    if (tempFilePath) {

      try {

        await fs.unlink(
          tempFilePath
        );

        console.log(
          "Temporary video deleted"
        );

      } catch (error) {

        console.log(
          "Could not delete temporary video"
        );
      }
    }


    // ==========================================
    // 9. DELETE EXTRACTED FRAMES
    // ==========================================

    if (framesDir) {

      try {

        await fs.rm(
          framesDir,
          {
            recursive: true,
            force: true
          }
        );

        console.log(
          "Extracted frames deleted"
        );

      } catch (error) {

        console.log(
          "Could not delete frames directory"
        );
      }
    }
  }
}