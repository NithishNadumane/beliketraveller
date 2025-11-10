import pool from "../db.js"; 


export const getImagesByPlaceId = async (req, res) => {
  try {
    const { placeId } = req.params;

    const result = await pool.query(
      "SELECT * FROM images WHERE place_id = $1 ",
      [placeId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No images found for this place" });
    }

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching images:", error.message);
    res.status(500).json({ message: "Server error while fetching images" });
  }
};
