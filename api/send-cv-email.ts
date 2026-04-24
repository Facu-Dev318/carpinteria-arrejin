import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
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
    const { nombre, email, telefono, mensaje, cvUrl } = req.body;

    if (!nombre || !email || !telefono) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const emailContent = `
      <h2>Nueva postulación laboral</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje || 'Sin mensaje adicional'}</p>
      ${cvUrl ? `<p><strong>CV adjunto:</strong> <a href="${cvUrl}">Descargar CV</a></p>` : '<p><em>Sin CV adjunto</em></p>'}
    `;

    const result = await resend.emails.send({
      from: 'noreply@carpinteriaarrejin.com.ar',
      to: 'carpinteria.arrejin@gmail.com',
      subject: `Nueva postulación laboral — ${nombre}`,
      html: emailContent,
    });

    if (result.error) {
      return res.status(500).json({ error: 'Error al enviar el email', details: result.error });
    }

    return res.status(200).json({ success: true, message: 'Email enviado correctamente' });

  } catch (error: any) {
    return res.status(500).json({ error: 'Error al enviar el email', details: error.message });
  }
}
