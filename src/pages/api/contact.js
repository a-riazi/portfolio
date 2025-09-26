import nodemailer from 'nodemailer';

export const POST = async ({ request }) => {
  try {
    // Accept either <form> submits (FormData) or JSON fetch bodies
    const contentType = request.headers.get('content-type') || '';
    let data;
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form);
    }

    const { name = '', email = '', message = '' } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing name, email, or message.' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Use env vars (add them in a .env file)
    const user = import.meta.env.SMTP_USER;
    const pass = import.meta.env.SMTP_PASS;
    const to = import.meta.env.CONTACT_EMAIL || user;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    // Optional but great for debugging connection/auth issues:
    await transporter.verify();

    await transporter.sendMail({
      from: `Portfolio Contact <${user}>`, // authenticated sender
      replyTo: email,                        // visitor's email goes here
      to,
      subject: `Portfolio Contact Form: ${name}`,
      text: message,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    // Log full error server-side and return a helpful snippet client-side
    console.error('Contact API error:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message || 'Failed to send email.' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
};
