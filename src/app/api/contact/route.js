import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import sanitizeHtml from 'sanitize-html';
import validator from 'validator';

// Rate limiter configuration
const rateLimiter = new RateLimiterMemory({
  points: parseInt(process.env.RATE_LIMIT_MAX || '5'), // Number of requests
  duration: 3600, // 1 hour in seconds
});

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Input validation and sanitization
const validateAndSanitizeInput = (data) => {
  const errors = [];
  const sanitized = {};

  // Validate and sanitize name
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  } else if (data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (data.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  } else {
    sanitized.name = sanitizeHtml(data.name.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  // Validate and sanitize email
  if (!data.email || data.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!validator.isEmail(data.email.trim())) {
    errors.push('Invalid email format');
  } else {
    sanitized.email = validator.normalizeEmail(data.email.trim().toLowerCase());
  }

  // Validate and sanitize company (optional)
  if (data.company && data.company.trim().length > 0) {
    if (data.company.trim().length > 100) {
      errors.push('Company name must be less than 100 characters');
    } else {
      sanitized.company = sanitizeHtml(data.company.trim(), {
        allowedTags: [],
        allowedAttributes: {},
      });
    }
  } else {
    sanitized.company = '';
  }

  // Validate and sanitize message
  if (!data.message || data.message.trim().length === 0) {
    errors.push('Message is required');
  } else if (data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (data.message.trim().length > 2000) {
    errors.push('Message must be less than 2000 characters');
  } else {
    sanitized.message = sanitizeHtml(data.message.trim(), {
      allowedTags: [],
      allowedAttributes: {},
    });
  }

  // Honeypot field check (should be empty)
  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.push('Spam detected');
  }

  return { errors, sanitized };
};

// Create email templates
const createEmailTemplates = (data) => {
  const { name, email, company, message } = data;
  const companyText = company ? ` from ${company}` : '';

  // Email to site owner
  const ownerEmail = {
    from: process.env.SMTP_USER,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `New Contact Form Submission${companyText}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1e293b; margin-bottom: 20px; border-bottom: 3px solid #3b82f6; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 8px; font-size: 16px;">Contact Information:</h3>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0; color: #6b7280;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #3b82f6;">${email}</a></p>
            ${company ? `<p style="margin: 5px 0; color: #6b7280;"><strong>Company:</strong> ${company}</p>` : ''}
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 8px; font-size: 16px;">Message:</h3>
            <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: #9ca3af; font-size: 14px;">
              Submitted on: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}

Submitted on: ${new Date().toLocaleString()}
    `,
  };

  // Auto-reply email to sender
  const autoReply = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Thank you for reaching out - Walter Okumu',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
        <div style="background-color: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1e293b; margin-bottom: 10px;">Thank You, ${name}!</h1>
            <div style="height: 3px; width: 60px; background: linear-gradient(90deg, #3b82f6, #1d4ed8); margin: 0 auto; border-radius: 2px;"></div>
          </div>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out! I've received your message and will get back to you within 24 hours.
          </p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0; color: #374151; line-height: 1.6;">
              <strong>In the meantime:</strong><br>
              • Feel free to check out my <a href="https://walterokumu.com/blog" style="color: #3b82f6;">blog</a> for insights on customer success and technical solutions<br>
              • Connect with me on <a href="https://linkedin.com/in/walter-okumu-oriaro" style="color: #3b82f6;">LinkedIn</a><br>
              • Schedule a call directly through my <a href="https://calendly.com/walterokumu" style="color: #3b82f6;">Calendly</a>
            </p>
          </div>
          
          <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
            I'm excited to learn more about your project and discuss how I can help drive your business forward.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="margin: 5px 0; color: #6b7280;">Best regards,</p>
            <p style="margin: 5px 0; color: #1e293b; font-weight: bold;">Walter Okumu</p>
            <p style="margin: 5px 0; color: #9ca3af; font-size: 14px;">Customer Success & Technical Solutions</p>
            <p style="margin: 5px 0;">
              <a href="mailto:hello@walterokumu.com" style="color: #3b82f6; text-decoration: none;">hello@walterokumu.com</a>
            </p>
          </div>
        </div>
      </div>
    `,
    text: `
Thank You, ${name}!

Thank you for reaching out! I've received your message and will get back to you within 24 hours.

In the meantime:
• Feel free to check out my blog for insights on customer success and technical solutions: https://walterokumu.com/blog
• Connect with me on LinkedIn: https://linkedin.com/in/walter-okumu-oriaro  
• Schedule a call directly through my Calendly: https://calendly.com/walterokumu

I'm excited to learn more about your project and discuss how I can help drive your business forward.

Best regards,
Walter Okumu
Customer Success & Technical Solutions
hello@walterokumu.com
    `,
  };

  return { ownerEmail, autoReply };
};

// Get client IP address
const getClientIP = (request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const clientIP = forwarded
    ? forwarded.split(',')[0].trim()
    : realIP || 'unknown';
  return clientIP;
};

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    try {
      await rateLimiter.consume(clientIP);
    } catch (rejRes) {
      return Response.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.round(rejRes.msBeforeNext / 1000) || 3600,
        },
        { status: 429 },
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (_error) {
      return Response.json(
        { success: false, error: 'Invalid JSON data' },
        { status: 400 },
      );
    }

    // Validate and sanitize input
    const { errors, sanitized } = validateAndSanitizeInput(body);

    if (errors.length > 0) {
      return Response.json(
        { success: false, errors },
        { status: 400 },
      );
    }

    // Check if required environment variables are set
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP credentials not configured');
      return Response.json(
        { success: false, error: 'Email service not configured' },
        { status: 500 },
      );
    }

    // Create email transporter
    const transporter = createTransporter();

    // Verify SMTP connection
    try {
      await transporter.verify();
    } catch (_error) {
      console.error('SMTP connection failed:', _error);
      return Response.json(
        { success: false, error: 'Email service unavailable' },
        { status: 500 },
      );
    }

    // Create email templates
    const { ownerEmail, autoReply } = createEmailTemplates(sanitized);

    // Send emails
    try {
      // Send notification to site owner
      await transporter.sendMail(ownerEmail);

      // Send auto-reply to sender
      await transporter.sendMail(autoReply);

      console.log(`Contact form submission from ${sanitized.email} processed successfully`);

      return Response.json({
        success: true,
        message: 'Your message has been sent successfully! I\'ll get back to you within 24 hours.',
      });

    } catch (_error) {
      console.error('Failed to send emails:', _error);
      return Response.json(
        { success: false, error: 'Failed to send message. Please try again.' },
        { status: 500 },
      );
    }

  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return Response.json(
    { error: 'Method not allowed' },
    { status: 405 },
  );
}

export async function PUT() {
  return Response.json(
    { error: 'Method not allowed' },
    { status: 405 },
  );
}

export async function DELETE() {
  return Response.json(
    { error: 'Method not allowed' },
    { status: 405 },
  );
}
