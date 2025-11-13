const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: "mysql-2d196fdd-vivana.f.aivencloud.com", // ✅ only hostname here
  port: 16963, // ✅ add port separately
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 4,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: true, // ✅ Aiven MySQL usually requires SSL
  },
});

db.getConnection()
  .then(() => {
    console.log("✅ Connected to MySQL database.");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

module.exports = db;
