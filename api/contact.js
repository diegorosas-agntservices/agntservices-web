const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, projectType, message } = req.body;

    // 1. Configure your email transport
    // YOU MUST REPLACE THESE VALUES WITH YOUR ACTUAL EMAIL CREDENTIALS
    // Example for Gmail: usage of App Passwords is required
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or 'outlook', 'yahoo', or host: 'smtp.example.com'
      auth: {
        user: 'diegorosas@agntservices.org',
        pass: 'iprm dxne pzpz mqgv',
      },
    });

    try {
      // 2. Send the email
      await transporter.sendMail({
        from: `"AGNT Web Form" <${email}>`, // Sender address
        to: 'diegorosas@agntservices.org', // List of receivers (your email)
        subject: `New Project Inquiry: ${projectType} from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          Project Type: ${projectType}
          
          Message:
          ${message}
        `,
        html: `
          <h3>New Inquiry from AGNT Website</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Project Type:</strong> ${projectType}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      return res.status(200).json({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email send error:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
