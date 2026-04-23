import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('', { status: 200, headers });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  try {
    const body = await req.json();
    const { nombre, email, telefono, mensaje, cvUrl } = body;

    if (!nombre || !email || !telefono) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), { status: 400, headers });
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
      return new Response(JSON.stringify({ error: 'Error al enviar el email', details: result.error }), { status: 500, headers });
    }

    return new Response(JSON.stringify({ success: true, message: 'Email enviado correctamente' }), { status: 200, headers });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Error al enviar el email', details: error.message }), { status: 500, headers });
  }
}

export const config = { runtime: 'edge' };
