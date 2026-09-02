import pool from "../db.js";

export async function getreviews(req, res) {
  const { placeId } = req.params;

  try {
    const result = await pool.query(
      `SELECT 
          r.id,
          r.rating,
          r.comment,
          r.created_at,
          u.name AS username
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.place_id = $1
       ORDER BY r.created_at DESC`,
      [placeId]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Error fetching reviews:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}


export async function addreviews(req, res) {
  const { placeId, rating, comment } = req.body;

  // User comes from JWT authentication
  const userId = req.user.id;

  try {
    if (!placeId || !rating || !comment) {
      return res.status(400).json({
        message: "Place, rating and comment are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    await pool.query(
      `INSERT INTO reviews
       (place_id, user_id, rating, comment)
       VALUES ($1, $2, $3, $4)`,
      [placeId, userId, rating, comment]
    );

    res.status(201).json({
      message: "Review added successfully",
    });

  } catch (error) {
    console.error("Error adding review:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}