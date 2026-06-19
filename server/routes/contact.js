const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");


const { body, validationResult } = require("express-validator");


router.post(
  "/contact",
  [
  
    body("name").trim().notEmpty().withMessage,
    body("email").trim().normalizeEmail().isEmail().withMessage,
    body("subject").trim().notEmpty().withMessage,
    body("message").isLength({ min: 10 }).withMessage,
  ],
  async (req, res) => {
    
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
     
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, subject, message } = req.body;
      
      const newUpdate = new Contact({ name, email, subject, message });
      await newUpdate.save();
      
      res.status(201).json({ message: "Your message has been sent successfully! 🎉" });
    } catch (err) {
      res.status(500).json({ message: "Server error, failed to send message" });
    }
  }
);


router.get("/admin/contact", async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});


router.delete("/admin/contact/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete message" });
  }
});

module.exports = router;