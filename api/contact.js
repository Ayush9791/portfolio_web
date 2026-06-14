import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    "Unknown";

  const country = req.headers["x-vercel-ip-country"] || "Unknown";
  const region = req.headers["x-vercel-ip-country-region"] || "Unknown";
  const city = req.headers["x-vercel-ip-city"] || "Unknown";
  const userAgent = req.headers["user-agent"] || "Unknown";

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  if (message.length > 3000) {
    return res.status(400).json({ error: "Message too long" });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "aayushdeep979@gmail.com",
      reply_to: email,
      subject: `New message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

IP: ${ip}
Country: ${country}
Region: ${region}
City: ${city}
User Agent: ${userAgent}

Message:
${message}
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return res.status(500).json({ error: "Email failed" });
  }
}