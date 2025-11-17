// routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const path = require('path');

// POST /api/upload
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Return the URL path so frontend/admin can fetch it.
    // If you want to return the full absolute URL, you can build it from request:
    const host = req.get('host'); // domain:port
    const protocol = req.protocol; // http/https
    const filePath = `/uploads/${req.file.filename}`;

    // Prefer returning the path (frontend will prepend API_BASE), but also send fullUrl
    res.json({
      filePath,                      // e.g. "/uploads/160...jpg"
      fullUrl: `${protocol}://${host}${filePath}` // e.g. "https://viviana-backend.onrender.com/uploads/..."
    });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed', message: err.message });
  }
});

module.exports = router;
