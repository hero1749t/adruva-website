import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../common/email/email.service';

@Injectable()
export class EmailTemplatesService implements OnModuleInit {
  private readonly logger = new Logger(EmailTemplatesService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async onModuleInit() {
    await this.seedDefaultTemplates();
  }

  async seedDefaultTemplates() {
    const defaultTemplates = [
      {
        type: 'inquiry_acknowledgement',
        name: 'Client Inquiry Auto-Reply',
        subject: 'Thank you for contacting Adruva Solution! 🚀',
        variables: ['name', 'service', 'budget', 'timeline'],
        content: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #333333; }
  .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e1e4e6; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .header { background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; text-align: center; color: #ffffff; }
  .logo { font-size: 24px; font-weight: bold; letter-spacing: 1px; color: #6366f1; }
  .logo span { color: #ffffff; }
  .body { padding: 40px 30px; line-height: 1.6; }
  .greeting { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 0; }
  .details-box { background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 15px; margin: 20px 0; border-radius: 4px; }
  .details-item { margin: 8px 0; font-size: 14px; }
  .details-label { font-weight: bold; color: #475569; }
  .button-container { text-align: center; margin: 30px 0 10px; }
  .button { background-color: #6366f1; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block; }
  .footer { background-color: #f8fafc; padding: 25px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  .footer-links { margin-top: 10px; }
  .footer-links a { color: #6366f1; text-decoration: none; margin: 0 10px; }
</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">Adruva<span>Solution</span></div>
    </div>
    <div class="body">
      <p class="greeting">Hi {{name}},</p>
      <p>Thank you for reaching out to Adruva Solution! We have received your inquiry and our team is already reviewing it. We will get back to you within 24 hours.</p>
      
      <p>Here are the project details you submitted:</p>
      <div class="details-box">
        <div class="details-item"><span class="details-label">Service:</span> {{service}}</div>
        <div class="details-item"><span class="details-label">Est. Budget:</span> {{budget}}</div>
        <div class="details-item"><span class="details-label">Est. Timeline:</span> {{timeline}}</div>
      </div>
      
      <p>In the meantime, you can explore our latest case studies and see how we help businesses automate work and scale growth.</p>
      
      <div class="button-container">
        <a href="https://www.adruvasolution.com/work" class="button" target="_blank">View Our Portfolio</a>
      </div>
    </div>
    <div class="footer">
      <p>Near Bageshwari Devi Mandir, Shanti Nagar, Dhalwala, Rishikesh, Uttarakhand - 249137</p>
      <div class="footer-links">
        <a href="https://www.adruvasolution.com" target="_blank">Website</a> | 
        <a href="https://wa.me/919149276799" target="_blank">WhatsApp</a>
      </div>
    </div>
  </div>
</body>
</html>`,
      },
      {
        type: 'job_acknowledgement',
        name: 'Job Application Auto-Reply',
        subject:
          "We've received your application for {{jobTitle}} at Adruva! 💼",
        variables: ['name', 'jobTitle'],
        content: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #333333; }
  .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e1e4e6; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .header { background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; text-align: center; color: #ffffff; }
  .logo { font-size: 24px; font-weight: bold; letter-spacing: 1px; color: #6366f1; }
  .logo span { color: #ffffff; }
  .body { padding: 40px 30px; line-height: 1.6; }
  .greeting { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 0; }
  .info-badge { background-color: #e0e7ff; color: #4338ca; padding: 6px 12px; border-radius: 20px; font-size: 14px; font-weight: bold; display: inline-block; margin-bottom: 20px; }
  .footer { background-color: #f8fafc; padding: 25px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  .footer-links { margin-top: 10px; }
  .footer-links a { color: #6366f1; text-decoration: none; margin: 0 10px; }
</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">Adruva<span>Solution</span></div>
    </div>
    <div class="body">
      <p class="greeting">Dear {{name}},</p>
      <p>Thank you for applying to join our team! We have successfully received your application for the following position:</p>
      
      <div class="info-badge">{{jobTitle}}</div>
      
      <p>Our hiring managers are currently reviewing your qualifications, experience, and details. If your profile matches our requirements, we will reach out to you within 3-5 business days to discuss the next steps in our recruitment process.</p>
      
      <p>We appreciate your interest in working with Adruva Solution!</p>
      
      <p>Warm regards,<br>People Operations Team<br><strong>Adruva Solution</strong></p>
    </div>
    <div class="footer">
      <p>Near Bageshwari Devi Mandir, Shanti Nagar, Dhalwala, Rishikesh, Uttarakhand - 249137</p>
      <div class="footer-links">
        <a href="https://www.adruvasolution.com" target="_blank">Careers Page</a> | 
        <a href="https://www.adruvasolution.com/about" target="_blank">About Us</a>
      </div>
    </div>
  </div>
</body>
</html>`,
      },
      {
        type: 'newsletter_welcome',
        name: 'Newsletter Welcome',
        subject: 'Welcome to Adruva Insights! Newsletter Confirmed 🎉',
        variables: ['email'],
        content: `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; margin: 0; padding: 20px; color: #333333; }
  .card { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e1e4e6; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
  .header { background: linear-gradient(135deg, #0f172a, #1e293b); padding: 30px; text-align: center; color: #ffffff; }
  .logo { font-size: 24px; font-weight: bold; letter-spacing: 1px; color: #6366f1; }
  .logo span { color: #ffffff; }
  .body { padding: 40px 30px; line-height: 1.6; }
  .greeting { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 0; }
  .topics { margin: 20px 0; padding-left: 20px; }
  .topics li { margin-bottom: 10px; }
  .button-container { text-align: center; margin: 30px 0 10px; }
  .button { background-color: #6366f1; color: #ffffff !important; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block; }
  .footer { background-color: #f8fafc; padding: 25px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  .footer-links { margin-top: 10px; }
  .footer-links a { color: #6366f1; text-decoration: none; margin: 0 10px; }
</style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="logo">Adruva<span>Insights</span></div>
    </div>
    <div class="body">
      <p class="greeting">Welcome to the Club! 🚀</p>
      <p>Thanks for subscribing to Adruva Insights. You are now part of our growing community of builders, founders, and tech enthusiasts.</p>
      
      <p>Here is what you can look forward to receiving in your inbox:</p>
      <ul class="topics">
        <li><strong>Digital Engineering:</strong> Technical deep-dives on Next.js, APIs, and cloud architecture.</li>
        <li><strong>AI & Automation:</strong> Real-world case studies of businesses using AI agents to save 10+ hours a week.</li>
        <li><strong>Growth Marketing:</strong> Insights and optimizations for SEO, Meta Ads, and Google Ads.</li>
      </ul>
      
      <p>We send high-value guides and resources once a month. No spam, ever.</p>
      
      <div class="button-container">
        <a href="https://www.adruvasolution.com/blog" class="button" target="_blank">Read Our Latest Articles</a>
      </div>
    </div>
    <div class="footer">
      <p>Near Bageshwari Devi Mandir, Shanti Nagar, Dhalwala, Rishikesh, Uttarakhand - 249137</p>
      <div class="footer-links">
        <a href="https://www.adruvasolution.com" target="_blank">Website</a> | 
        <a href="https://www.adruvasolution.com/blog" target="_blank">Blogs</a>
      </div>
    </div>
  </div>
</body>
</html>`,
      },
    ];

    for (const temp of defaultTemplates) {
      await this.prisma.websiteEmailTemplate.upsert({
        where: { type: temp.type },
        update: {},
        create: temp,
      });
    }

    this.logger.log('Seeded default email templates.');
  }

  async findAll() {
    return this.prisma.websiteEmailTemplate.findMany({
      orderBy: { type: 'asc' },
    });
  }

  async findByType(type: string) {
    return this.prisma.websiteEmailTemplate.findUnique({
      where: { type },
    });
  }

  async update(id: string, subject: string, content: string) {
    return this.prisma.websiteEmailTemplate.update({
      where: { id },
      data: { subject, content },
    });
  }

  async sendTest(id: string, to: string) {
    const template = await this.prisma.websiteEmailTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      throw new Error('Template not found');
    }

    let parsedHtml = template.content;
    let parsedSubject = template.subject;

    const dummyVars: Record<string, string> = {
      name: 'Test Customer',
      service: 'Custom SaaS Development',
      budget: '₹2L – ₹5L',
      timeline: '1-3 months',
      jobTitle: 'Senior Full Stack Engineer',
      email: to,
    };

    template.variables.forEach((variable) => {
      const value = dummyVars[variable] || '[' + variable + ']';
      parsedHtml = parsedHtml.replace(
        new RegExp('{{' + variable + '}}', 'g'),
        value,
      );
      parsedSubject = parsedSubject.replace(
        new RegExp('{{' + variable + '}}', 'g'),
        value,
      );
    });

    // Append test email tag
    parsedHtml = parsedHtml.replace(
      '</body>',
      `<div style="text-align:center; font-size:11px; padding: 10px; background-color:#fffbeb; color:#b45309; border-top:1px solid #fef3c7;">⚠️ This is a test email sent from the Adruva Dashboard.</div></body>`,
    );

    return this.emailService.sendHtmlMail(to, parsedSubject, parsedHtml);
  }
}
