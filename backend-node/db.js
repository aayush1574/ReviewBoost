const mysql = require("mysql2/promise");
const sqlite3 = require("sqlite3");
const path = require("path");
const fs = require("fs");

let pool = null;
let sqliteDb = null;
let isSQLite = false;

// Initialize database connection
async function initDb() {
  const useMySQL = process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME;

  if (useMySQL) {
    console.log("Connecting to MySQL Database...");
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
    isSQLite = false;
  } else {
    console.log("No MySQL credentials provided. Falling back to local SQLite database...");
    const dbPath = path.resolve(__dirname, "database.sqlite");
    sqliteDb = new sqlite3.Database(dbPath);
    isSQLite = true;
  }

  // Create tables if they do not exist
  const createTableQuery = isSQLite
    ? `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        category TEXT,
        address TEXT,
        description TEXT,
        google_review_url TEXT,
        image_url TEXT,
        slug TEXT UNIQUE,
        tone TEXT,
        reviews TEXT,
        last_rotated_date TEXT,
        total_scans INTEGER DEFAULT 0,
        total_copies INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    : `CREATE TABLE IF NOT EXISTS places (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        category VARCHAR(255),
        address TEXT,
        description TEXT,
        google_review_url TEXT,
        image_url TEXT,
        slug VARCHAR(255) UNIQUE,
        tone VARCHAR(50),
        reviews TEXT,
        last_rotated_date VARCHAR(10),
        total_scans INT DEFAULT 0,
        total_copies INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;

  await query(createTableQuery);

  // Run migration to add last_rotated_date if it doesn't exist
  try {
    if (isSQLite) {
      await query("ALTER TABLE places ADD COLUMN last_rotated_date TEXT");
    } else {
      await query("ALTER TABLE places ADD COLUMN last_rotated_date VARCHAR(10)");
    }
    console.log("Migration: Added last_rotated_date column to places table.");
  } catch (err) {
    // If the column already exists, this query will fail, which is expected and can be ignored.
    if (err.message && (err.message.includes("duplicate column name") || err.message.includes("already exists"))) {
      // Ignored
    } else {
      console.log("Migration check (column might already exist):", err.message);
    }
  }
  console.log("Database initialized and verified.");
}

// Universal query runner
function query(sql, params = []) {
  if (isSQLite) {
    return new Promise((resolve, reject) => {
      // Convert standard placeholder '?' to sqlite compatible format if necessary
      // (sqlite3 uses standard ? placeholders as well, so direct mapping works)
      if (sql.trim().toUpperCase().startsWith("SELECT")) {
        sqliteDb.all(sql, params, (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        });
      } else {
        sqliteDb.run(sql, params, function (err) {
          if (err) reject(err);
          else resolve({ insertId: this.lastID, affectedRows: this.changes });
        });
      }
    });
  } else {
    return pool.query(sql, params).then(([results]) => {
      // Standardize response format with insertId/affectedRows
      return results;
    });
  }
}

module.exports = {
  initDb,
  query,
  getIsSQLite: () => isSQLite
};
