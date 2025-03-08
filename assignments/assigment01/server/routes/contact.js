// server/routes/contact.js
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  console.log("Received contact form submission:", req.body);
  res.status(200).json({ success: "Message sent successfully" });
});

module.exports = router;
