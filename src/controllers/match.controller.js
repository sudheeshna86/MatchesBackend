import pool from "../config/db.js";

export const getMatches = async (req, res) => {
  try {
    const { sport, search } = req.query;

    // Case 1: Both sport + search
    if (sport && search) {
      const result = await pool.query(
        `SELECT * FROM matches
         WHERE sport = $1
           AND (team_a ILIKE $2 OR team_b ILIKE $2)
         ORDER BY start_time ASC`,
        [sport, `%${search}%`]
      );
      return res.json(result.rows);
    }

    // Case 2: Only sport filter
    if (sport) {
      const result = await pool.query(
        `SELECT * FROM matches
         WHERE sport = $1
         ORDER BY start_time ASC`,
        [sport]
      );
      return res.json(result.rows);
    }

    // Case 3: Only search by team name
    if (search) {
      const result = await pool.query(
        `SELECT * FROM matches
         WHERE team_a ILIKE $1 OR team_b ILIKE $1
         ORDER BY start_time ASC`,
        [`%${search}%`]
      );
      return res.json(result.rows);
    }

    // Case 4: No filters → return all matches
    const result = await pool.query(
      "SELECT * FROM matches ORDER BY start_time ASC"
    );
    res.json(result.rows);

  } catch (err) {
    console.error("Error fetching matches:", err);
    res.status(500).json({ error: err.message });
  }
};
