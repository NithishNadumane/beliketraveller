import pool from "../db.js";

export async function getplacebycategory(req, res) {
  const { districtId, selectedCategory } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        p.id,
        p.name,
        p.description,
        p.category,
        p.district_id,
        (
          SELECT i.src
          FROM images i
          WHERE i.place_id = p.id
          ORDER BY i.id ASC
          LIMIT 1
        ) AS image_url
      FROM places p
      WHERE p.district_id = $1
      AND p.category ILIKE $2
      ORDER BY p.id ASC
      `,
      [districtId, `%${selectedCategory}%`]
    );

    if (result.rows.length === 0) {
      console.log("No place found");
      return res.status(404).json({
        message: "No places found for this category"
      });
    }

    return res.json(result.rows);

  } catch (error) {
    console.error("Error fetching places with images:", error);
    res.status(500).json({
      message: "Server error fetching places"
    });
  }
}