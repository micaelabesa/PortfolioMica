import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async (req: VercelRequest, res: VercelResponse) => {
  // Solo acepta POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { name, email, subject, message } = req.body;

  // Validaciones
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // Configurar transporte de email (Gmail example)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    // Email al usuario (confirmación)
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Recibimos tu mensaje',
      html: `
        <h2>Hola ${name},</h2>
        <p>Recibimos tu mensaje sobre: <strong>${subject}</strong></p>
        <p>Te responderé en 24-48 horas.</p>
        <br>
        <p>¡Gracias por contactar!</p>
      `
    });

    // Email a ti (notificación)
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'micaela.besasso@hotmail.com',
      subject: `Nuevo contacto: ${subject}`,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>De:</strong> ${name} (${email})</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    });

    return res.status(200).json({ 
      success: true,
      message: 'Mensaje enviado correctamente' 
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    return res.status(500).json({ 
      error: 'Error al procesar el formulario',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};