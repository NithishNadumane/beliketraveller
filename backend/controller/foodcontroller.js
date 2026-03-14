import pool from "../db.js";
export const getpopularfood = async (req, res) => {
  try {
    const { districtId } = req.query;

    const result = await pool.query(
      "SELECT * FROM popular_food_places WHERE district_id = $1",
      [districtId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getrestaurants = async (req, res) => {
  try {
    const { districtId } = req.query;

    const result = await pool.query(
      "SELECT * FROM restaurants WHERE district_id = $1",
      [districtId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getstays = async (req, res) => {
  try {
    const { districtId } = req.query;

    const result = await pool.query(
      "SELECT * FROM stays WHERE district_id = $1",
      [districtId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};