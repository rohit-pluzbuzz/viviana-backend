const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: "mysql-2d196fdd-viviana.f.aivencloud.com", // ✅ hostname only
  port: 16963, // ✅ Aiven MySQL port
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 4,
  queueLimit: 0,
  ssl: {
    // ✅ Required for Aiven
    rejectUnauthorized: true,
  },
});

db.getConnection()
  .then(() => {
    console.log("✅ Connected to MySQL database.");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });

module.exports = db;
