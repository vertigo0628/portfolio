import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ detail: 'All fields are required' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ detail: 'Invalid email address' });
        }

        // Create transporter with Gmail SMTP
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_SERVER || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.SENDER_PASSWORD,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: process.env.RECIPIENT_EMAIL,
            subject: `Portfolio Contact: Message from ${name}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #34C759;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #eee;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="border: 1px solid #eee; margin-top: 20px;">
          <p style="color: #888; font-size: 12px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
            replyTo: email,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Success response
        return res.status(200).json({
            success: true,
            message: 'Message sent successfully!'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return res.status(500).json({ detail: 'Failed to send message. Please try again.' });
    }
}
