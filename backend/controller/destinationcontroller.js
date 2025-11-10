import pool from "../db.js";

export const searchplace = async (req, res) => {
  try {
    const query = req.query.query; // matches frontend: axios.get(...?query=${query})
    if (!query) {
      return res.status(400).json({ error: "Query parameter 'query' is required" });
    }

    // Search districts
    const districts = await pool.query(
      `SELECT id, name, description, latitude, longitude
       FROM districts
       WHERE LOWER(name) LIKE LOWER($1)`,
      [`%${query}%`]
    );

    // Search places
    const places = await pool.query(
      `SELECT p.id, p.name, p.description, p.latitude, p.longitude, d.name AS district_name
       FROM places p
       JOIN districts d ON p.district_id = d.id
       WHERE LOWER(p.name) LIKE LOWER($1) OR LOWER(d.name) LIKE LOWER($1)`,
      [`%${query}%`]
    );

    // Decide what to return for frontend routing
    if (districts.rows.length > 0) {
      return res.json({ type: "district", name: districts.rows[0].name });
    } else if (places.rows.length > 0) {
      const place = places.rows[0];
      return res.json({ type: "place", district: place.district_name, name: place.name });
    } else {
      return res.json({ type: "none" });
    }
  } catch (err) {
    console.error("Error in searchHandler:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};
