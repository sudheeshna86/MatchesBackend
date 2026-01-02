import pool from "../config/db.js";

export const addFavorite = async (req, res) => {
  try {
    const { matchId } = req.params;
    const userId = req.user.id;

    await pool.query(
      "INSERT INTO favorites (user_id, match_id) VALUES ($1,$2)",
      [userId, matchId]
    );

    res.json({ message: "Added to favorites" });
  } catch (err) {
    res.status(400).json({ message: "Already in favorites" });
  }
};

export const removeFavorite = async (req, res) => {
  const { matchId } = req.params;
  const userId = req.user.id;

  await pool.query(
    "DELETE FROM favorites WHERE user_id=$1 AND match_id=$2",
    [userId, matchId]
  );

  res.json({ message: "Removed from favorites" });
};

export const getFavorites = async (req, res) => {
  const userId = req.user.id;

  const result = await pool.query(
    `SELECT m.* FROM matches m
     JOIN favorites f ON m.id = f.match_id
     WHERE f.user_id=$1`,
    [userId]
  );

  res.json(result.rows);
};
