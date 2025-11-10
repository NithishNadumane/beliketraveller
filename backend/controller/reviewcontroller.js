import pool from '../db.js';
export async function getreviews(req, res) {
  const { placeId } = req.params;
  try {
    const result = await pool.query(
      `SELECT r.id, r.rating, r.comment, r.name, r.created_at, u.name AS username
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.place_id = $1
       ORDER BY r.created_at DESC`,
      [placeId]
    );
    res.json(result.rows);
  }
  catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
// export async function addreviews(req, res) {

// }