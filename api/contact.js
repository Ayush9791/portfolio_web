import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please complete all fields." });
  }

  if (name.length > 100 || /[\r\n]/.test(name)) {
    return res.status(400).json({ error: "Please enter a valid name under 100 characters." });
  }

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  if (message.length > 3000) {
    return res.status(400).json({ error: "Please keep the message under 3000 characters." });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: "Contact email is not configured yet." });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "aayushdeep979@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend rejected portfolio contact message:", error);
      return res.status(502).json({ error: "Email delivery failed. Please try again or email directly." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Portfolio contact delivery failed:", error);
    return res.status(502).json({ error: "Email delivery failed. Please try again or email directly." });
  }
}
