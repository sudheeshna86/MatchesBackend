import pool from "./config/db.js";

const seedMatches = async () => {
  await pool.query(`
    INSERT INTO matches (sport, league, team_a, team_b, start_time)
      VALUES
  
      ('Cricket','IPL','CSK','MI','2026-01-02 18:00'),
      ('Cricket','IPL','CSK','RCB','2026-01-05 19:30'),
      ('Cricket','IPL','CSK','KKR','2026-01-08 18:00'),
      ('Cricket','IPL','CSK','SRH','2026-01-12 19:30'),
      ('Cricket','IPL','RR','GT','2026-01-06 18:00'),
      ('Cricket','IPL','LSG','PBKS','2026-01-07 19:30'),
      ('Football','EPL','Arsenal','Chelsea','2026-01-03 21:00'),
      ('Football','EPL','Liverpool','Man City','2026-01-06 22:00'),
      ('Football','La Liga','Barcelona','Real Madrid','2026-01-10 21:30'),
      ('Tennis','ATP','Nadal','Djokovic','2026-01-04 16:00'),
      ('Tennis','ATP','Alcaraz','Medvedev','2026-01-09 15:30')
  `);

  console.log("Matches seeded successfully");
  process.exit();
};

seedMatches();
