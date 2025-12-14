import pool from '../db.js';

export async function getrentals(req, res) {
  const { placeId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM rentals WHERE district_id = $1",
      [placeId]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("error fetching rentals:", error);

    // ✅ THIS WAS MISSING
    return res.status(500).json({
      error: "Failed to fetch rentals"
    });
  }
}
