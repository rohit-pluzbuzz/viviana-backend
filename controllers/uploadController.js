// controllers/uploadController.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const safeOriginal = file.originalname.replace(/\s+/g, "");
    cb(null, Date.now() + "-" + safeOriginal);
  },
});

const upload = multer({ storage });

const handleUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = `/uploads/${req.file.filename}`;
  const fullUrl = `${req.protocol}://${req.get("host")}${filePath}`;

  res.status(200).json({
    filePath,
    fullUrl
  });
};

module.exports = { upload, handleUpload };
