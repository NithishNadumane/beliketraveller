import pool from '../db.js';
export async function getrentals(req, res) {
  const { placeId } = req.params;
  try {
    const result = await pool.query(
     ` select * from rentals where district_id = $1`, [placeId]
    );
    res.json(result.rows)
  }
  catch (error) {
    console.error("error fetchoing rentals:",error);
  }
}