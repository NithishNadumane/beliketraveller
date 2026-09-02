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
 
export async function getPlacesByDistrict(req, res) {

  const districtId = Number(req.params.districtId);

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        district_id,
        name,
        description,
        address
      FROM places
      WHERE district_id = $1
      ORDER BY name
      `,
      [districtId]
    );

    return res.status(200).json(result.rows);

  } catch (error) {

    console.error(
      "Get places by district error:",
      error.message
    );

    return res.status(500).json({
      error: "Failed to fetch places"
    });

  }
}