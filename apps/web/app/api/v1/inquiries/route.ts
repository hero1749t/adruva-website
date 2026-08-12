import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      companyName,
      serviceInterested,
      budgetRange,
      timeline,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, message: "Name and Email are required." },
        { status: 400 },
      );
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const teamEmail =
      process.env.TEAM_EMAIL || user || "hello@adruvasolution.com";

    if (!user || !pass) {
      console.warn(
        "SMTP credentials missing in environment variables. Running in mock mode.",
      );
      return NextResponse.json({
        success: true,
        message:
          "Mock email submission successful. (SMTP credentials missing on Vercel)",
      });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    // 1. Team Lead Notification Email
    const teamMailOptions = {
      from: `"Adruva Solution Alerts" <${user}>`,
      to: teamEmail,
      subject: `🚨 [New Lead Alert] - ${name} is interested in ${serviceInterested || "General Inquiry"}`,
      text: `Hi Dipendra,

You have received a new lead from the contact form:

Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Company: ${companyName || "N/A"}
Service: ${serviceInterested || "N/A"}
Budget: ${budgetRange || "N/A"}
Timeline: ${timeline || "N/A"}
Message: ${message || "N/A"}

Regards,
Adruva Solution System Alerts`,
    };

    // 2. User Confirmation Email
    const userMailOptions = {
      from: `"Adruva Solution" <${user}>`,
      to: email,
      subject: `Inquiry Received - Adruva Solution`,
      text: `Hi ${name},

Thank you for reaching out to Adruva Solution!

Our team is currently reviewing your details and requirements. We will contact you shortly to discuss your project further.

Your inquiry details:
- Service: ${serviceInterested || "N/A"}
- Budget: ${budgetRange || "N/A"}
- Timeline: ${timeline || "N/A"}

In the meantime, feel free to check out our work: https://www.adruvasolution.com/work

Best regards,
Team Adruva Solution`,
    };

    // Send emails in parallel
    await Promise.all([
      transporter.sendMail(teamMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    return NextResponse.json({
      success: true,
      message: "Your message has been sent! We'll get back within 24 hours.",
    });
  } catch (error: any) {
    console.error("Contact route handler error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
