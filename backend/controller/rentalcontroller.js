import pool from '../db.js';

export async function getrentals(req, res) {
  const placeId = Number(req.params.placeId);

  try {
    const result = await pool.query(
      "SELECT * FROM public.rentals WHERE district_id = $1",
      [placeId]
    );

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("RENDER DB ERROR:", error.message);
    return res.status(500).json({ error: error.message });
  }
}
