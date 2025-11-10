import pool from "../db.js";
export async function getplace(req, res) {
  const { places } = req.params;
  const placeName = places.replace(/-/g, " ");
  try {
    const result = await pool.query('select * from places where lower(name)=lower($1)', [placeName]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "place not found" });
    }
    return res.json(result.rows[0]);
  }
  catch (error) {
    console.error("error fetching place:", error);

  }
 }
