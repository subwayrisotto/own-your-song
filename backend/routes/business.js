const express = require('express');
const businessEmailTemplate = require('../emails/businessEmailTemplate');
const businessRouter = express.Router();
const Business = require('../models/Business'); 
const { sendEmail } = require('../utils/emailSender');

businessRouter.post('/business-order', async (req, res) => {
  try {
    const businessEntry = new Business(req.body);
    const email = req.body.email;
    const businessData = req.body;
    await businessEntry.save();
    if (email) {
      await sendEmail(
        process.env.ADMIN_EMAIL,
        `OYS | Business Order | ${email}`,
        businessEmailTemplate({
          email: email || "B2B", businessData
        })
      );
    }
    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving to database" });
  }
});

module.exports = businessRouter;