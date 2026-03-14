import pool from "../db.js";
export async function travelagencycontroller(req, res) {
  const placeId = Number(req.params.placeId);
  try {
    const result = await pool.query(
      "select * from travel_agencies where district_id=$1", [placeId]
    )
    return res.status(200).json(result.rows);
  }
  catch (error) {
    console.error("Render db error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}