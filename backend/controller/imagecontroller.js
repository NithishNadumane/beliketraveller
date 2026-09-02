// import pool from "../db.js";

// // Fetch images + place names for a district
// export const getImagesByDistrict = async (req, res) => {
//   const { districtName } = req.params;

//   try {
//     const result = await pool.query(
//       `SELECT m.id AS media_id,
//               m.url AS media_url,
//               p.name AS place_name,
//               d.name AS district_name
//        FROM media m
//        JOIN places p ON m.place_id = p.id
//        JOIN districts d ON p.district_id = d.id
//        WHERE d.name ILIKE $1;`,
//       [districtName]
//     );

//     res.json(result.rows);
//   } catch (error) {
//     console.error("Error fetching images:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
import pool from "../db.js";

// Fetch one image + place names for a district
export const getImagesByDistrict = async (req, res) => {
  const { districtName } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT 
        m.id AS media_id,
        m.src AS media_url,
        p.name AS place_name,
        d.name AS district_name
      FROM images m
      JOIN places p 
        ON m.place_id = p.id
      JOIN districts d 
        ON p.district_id = d.id
      WHERE d.name ILIKE $1
      AND m.id = (
        SELECT MIN(i.id)
        FROM images i
        WHERE i.place_id = p.id
      )
      ORDER BY p.id ASC;
      `,
      [districtName]
    );

    res.json(result.rows);

  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Server error" });
  }
};