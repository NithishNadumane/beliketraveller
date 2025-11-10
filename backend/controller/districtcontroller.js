import pool from "../db.js";

export async function getdistricts(req, res) {
  const { district } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM districts WHERE lower(name) = lower($1)',
      [district]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "District not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching district:", error);
    return res.status(500).json({ message: "Server error" });
  }
}