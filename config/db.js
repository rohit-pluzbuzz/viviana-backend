const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: "devshback.cxkq8k2a6xgg.ap-south-1.rds.amazonaws.com", // ✅ only hostname here
  port: 3306, // ✅ add port separately
  user: "admin",
  password: "adminpass",
  database: "dev.sh.back",
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
