import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Resend } from "resend";

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors({
  origin: "*", // allow GitHub Pages
}));

app.use(bodyParser.json());

app.post("/send-feedback", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Project Securite <onboarding@resend.dev>",
      to: "bacemklali1@gmail.com",
      subject: "New Feedback Received",
      html: `
        <h2>New Feedback Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Resend Error:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running.");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
