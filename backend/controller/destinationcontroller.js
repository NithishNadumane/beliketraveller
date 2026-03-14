import pool from "../db.js";

export const searchplace = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.json({ results: [] });
    }

    // 🔥 Search districts (limit 5)
    const districts = await pool.query(
      `SELECT id, name
       FROM districts
       WHERE name ILIKE $1
       LIMIT 5`,
      [`%${query}%`]
    );

    // 🔥 Search places (limit 5)
    const places = await pool.query(
      `SELECT p.id, p.name, d.name AS district_name
       FROM places p
       JOIN districts d ON p.district_id = d.id
       WHERE p.name ILIKE $1 OR d.name ILIKE $1
       LIMIT 5`,
      [`%${query}%`]
    );

    // 🔥 Combine & limit total 5
    const results = [
      ...districts.rows.map((d) => ({
        type: "district",
        name: d.name,
      })),
      ...places.rows.map((p) => ({
        type: "place",
        name: p.name,
        district: p.district_name,
      })),
    ].slice(0, 5);

    return res.json({ results });

  } catch (err) {
    console.error("Error in searchHandler:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
