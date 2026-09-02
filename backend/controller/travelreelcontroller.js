import pool from "../db.js";
import cloudinary from "../cloudinary.js";
import streamifier from "streamifier";
import { checkTravelVideo } from "../services/travelchecker.js"; // NEW


/* =========================================================
   UPLOAD TRAVEL REEL
========================================================= */

export async function uploadTravelReel(req, res) {
  try {
    /*
      USER ID COMES FROM JWT
      The auth middleware puts the decoded JWT
      inside req.user
    */

    const userId = req.user.id;

    const {
      title,
      description,
      district_id,
      place_id,
      reel_type
    } = req.body;


    /* =====================================================
       1. CHECK VIDEO
    ===================================================== */

    if (!req.file) {
      return res.status(400).json({
        error: "Video is required"
      });
    }


    /* =====================================================
       2. CHECK REQUIRED FIELDS
    ===================================================== */

    if (!title || !district_id || !reel_type) {
      return res.status(400).json({
        error: "Title, district and reel type are required"
      });
    }


    /* =====================================================
       3. CHECK REEL TYPE
    ===================================================== */

    if (
      reel_type !== "district" &&
      reel_type !== "place"
    ) {
      return res.status(400).json({
        error: "Invalid reel type"
      });
    }


    /* =====================================================
       4. DISTRICT REEL

       If reel_type = district,
       place_id should NOT be required.
    ===================================================== */

    if (reel_type === "district") {
      if (place_id) {
        return res.status(400).json({
          error: "District reels should not have a place"
        });
      }
    }


    /* =====================================================
       5. PLACE REEL

       If reel_type = place,
       place_id is compulsory.
    ===================================================== */

    if (reel_type === "place" && !place_id) {
      return res.status(400).json({
        error: "Place is required for a place reel"
      });
    }


    /* =====================================================
       6. CHECK DISTRICT
    ===================================================== */

    const districtResult = await pool.query(
      `
      SELECT id
      FROM districts
      WHERE id = $1
      `,
      [district_id]
    );

    if (districtResult.rows.length === 0) {
      return res.status(404).json({
        error: "District not found"
      });
    }


    /* =====================================================
       7. CHECK PLACE

       The selected place must belong
       to the selected district.
    ===================================================== */

    if (reel_type === "place") {

      const placeResult = await pool.query(
        `
        SELECT id
        FROM places
        WHERE id = $1
        AND district_id = $2
        `,
        [
          place_id,
          district_id
        ]
      );

      if (placeResult.rows.length === 0) {
        return res.status(404).json({
          error: "Place not found in the selected district"
        });
      }
    }


    /* =====================================================
       NEW: 8. CHECK VIDEO USING GEMINI AI

       The complete uploaded video is checked.
       No video-duration restriction is added.
    ===================================================== */

    const aiResult = await checkTravelVideo(
      req.file.buffer,
      req.file.mimetype
    );

    console.log("Gemini travel check:", aiResult);


    /* =====================================================
       NEW: 9. APPROVAL CONDITION

       Video is accepted only when:

       isTravel === true
       AND
       confidence >= 0.80
    ===================================================== */

    if (
      aiResult.isTravel !== true ||
      aiResult.confidence < 0.80
    ) {
      return res.status(400).json({
        error: "Video rejected. The video is not sufficiently related to travel content.",
        aiResult: {
          isTravel: aiResult.isTravel,
          confidence: aiResult.confidence,
          category: aiResult.category,
          reason: aiResult.reason
        }
      });
    }


    /* =====================================================
       10. UPLOAD VIDEO TO CLOUDINARY
    ===================================================== */

    const uploadResult = await new Promise(
      (resolve, reject) => {

        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: "travelreels",
              resource_type: "video"
            },

            (error, result) => {

              if (error) {
                reject(error);
              } else {
                resolve(result);
              }

            }
          );


        streamifier
          .createReadStream(req.file.buffer)
          .pipe(uploadStream);
      }
    );


    /* =====================================================
       11. SAVE DATA INTO POSTGRESQL
    ===================================================== */

    const result = await pool.query(
      `
      INSERT INTO travel_reels
      (
        user_id,
        district_id,
        place_id,
        reel_type,
        title,
        description,
        video_url,
        cloudinary_public_id,
        status,
        likes
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10
      )
      RETURNING *
      `,
      [
        userId,
        district_id,
        reel_type === "place"
          ? place_id
          : null,
        reel_type,
        title,
        description || null,
        uploadResult.secure_url,
        uploadResult.public_id,
        "approved", // CHANGED from pending
        0
      ]
    );


    /* =====================================================
       12. RESPONSE
    ===================================================== */

    return res.status(201).json({

      message:
        "Travel reel uploaded and approved successfully.",

      reel: result.rows[0]

    });

  } catch (error) {

    console.error(
      "Travel reel upload error:",
      error
    );

    return res.status(500).json({
      error: "Failed to upload travel reel",
      details: error.message
    });

  }
}


/* =========================================================
   GET ALL APPROVED TRAVEL REELS
========================================================= */

export async function getTravelReels(req, res) {

  try {

    const result = await pool.query(
      `
      SELECT
        tr.id,
        tr.user_id,
        tr.district_id,
        tr.place_id,
        tr.reel_type,
        tr.title,
        tr.description,
        tr.video_url,
        tr.thumbnail_url,
        tr.status,
        tr.likes,
        tr.created_at,
        tr.updated_at,

        d.name AS district_name,

        p.name AS place_name,

        u.name AS user_name

      FROM travel_reels tr

      JOIN districts d
        ON tr.district_id = d.id

      LEFT JOIN places p
        ON tr.place_id = p.id

      JOIN users u
        ON tr.user_id = u.id

      WHERE tr.status = 'approved'

      ORDER BY tr.created_at DESC
      `
    );

    return res.status(200).json(
      result.rows
    );

  } catch (error) {

    console.error(
      "Get travel reels error:",
      error
    );

    return res.status(500).json({
      error: "Failed to fetch travel reels"
    });

  }
}


/* =========================================================
   GET REELS BY DISTRICT
========================================================= */

export async function getTravelReelsByDistrict(
  req,
  res
) {

  try {

    const districtId =
      Number(req.params.districtId);


    if (!Number.isInteger(districtId)) {

      return res.status(400).json({
        error: "Invalid district ID"
      });

    }


    const result = await pool.query(
      `
      SELECT
        tr.id,
        tr.user_id,
        tr.district_id,
        tr.place_id,
        tr.reel_type,
        tr.title,
        tr.description,
        tr.video_url,
        tr.thumbnail_url,
        tr.likes,
        tr.created_at,

        d.name AS district_name,

        p.name AS place_name,

        u.name AS user_name

      FROM travel_reels tr

      JOIN districts d
        ON tr.district_id = d.id

      LEFT JOIN places p
        ON tr.place_id = p.id

      JOIN users u
        ON tr.user_id = u.id

      WHERE tr.district_id = $1
      AND tr.status = 'approved'

      ORDER BY tr.created_at DESC
      `,
      [districtId]
    );


    return res.status(200).json(
      result.rows
    );

  } catch (error) {

    console.error(
      "District reels error:",
      error
    );

    return res.status(500).json({
      error: "Failed to fetch district reels"
    });

  }

}


/* =========================================================
   GET REELS BY PLACE
========================================================= */

export async function getTravelReelsByPlace(
  req,
  res
) {

  try {

    const placeId =
      Number(req.params.placeId);


    if (!Number.isInteger(placeId)) {

      return res.status(400).json({
        error: "Invalid place ID"
      });

    }


    const result = await pool.query(
      `
      SELECT
        tr.id,
        tr.user_id,
        tr.district_id,
        tr.place_id,
        tr.reel_type,
        tr.title,
        tr.description,
        tr.video_url,
        tr.thumbnail_url,
        tr.likes,
        tr.created_at,

        d.name AS district_name,

        p.name AS place_name,

        u.name AS user_name

      FROM travel_reels tr

      JOIN districts d
        ON tr.district_id = d.id

      JOIN places p
        ON tr.place_id = p.id

      JOIN users u
        ON tr.user_id = u.id

      WHERE tr.place_id = $1
      AND tr.status = 'approved'

      ORDER BY tr.created_at DESC
      `,
      [placeId]
    );


    return res.status(200).json(
      result.rows
    );

  } catch (error) {

    console.error(
      "Place reels error:",
      error
    );

    return res.status(500).json({
      error: "Failed to fetch place reels"
    });

  }

}


/* =========================================================
   DELETE TRAVEL REEL
========================================================= */

export async function deleteTravelReel(
  req,
  res
) {

  try {

    const reelId =
      Number(req.params.id);


    if (!Number.isInteger(reelId)) {

      return res.status(400).json({
        error: "Invalid reel ID"
      });

    }


    /* =====================================================
       GET REEL
    ===================================================== */

    const findResult = await pool.query(
      `
      SELECT
        id,
        user_id,
        cloudinary_public_id
      FROM travel_reels
      WHERE id = $1
      `,
      [reelId]
    );


    if (findResult.rows.length === 0) {

      return res.status(404).json({
        error: "Travel reel not found"
      });

    }


    const reel =
      findResult.rows[0];


    /* =====================================================
       ONLY OWNER CAN DELETE
    ===================================================== */

    if (reel.user_id !== req.user.id) {

      return res.status(403).json({
        error: "You can delete only your own reel"
      });

    }


    /* =====================================================
       DELETE FROM CLOUDINARY
    ===================================================== */

    await cloudinary.uploader.destroy(
      reel.cloudinary_public_id,
      {
        resource_type: "video"
      }
    );


    /* =====================================================
       DELETE FROM DATABASE
    ===================================================== */

    const deleteResult = await pool.query(
      `
      DELETE FROM travel_reels
      WHERE id = $1
      RETURNING *
      `,
      [reelId]
    );


    return res.status(200).json({

      message:
        "Travel reel deleted successfully",

      reel:
        deleteResult.rows[0]

    });

  } catch (error) {

    console.error(
      "Delete travel reel error:",
      error
    );

    return res.status(500).json({
      error: "Failed to delete travel reel"
    });

  }

}