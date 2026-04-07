import { Resend } from 'resend';

interface CVSubmission {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  cvUrl: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler = async (event: any) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body: CVSubmission = JSON.parse(event.body || '{}');
    const { nombre, email, telefono, mensaje, cvUrl } = body;

    if (!nombre || !email || !telefono || !cvUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Faltan campos requeridos' }),
      };
    }

    const emailContent = `
      <h2>Nueva postulación laboral</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${telefono}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje || 'Sin mensaje adicional'}</p>
      <p><strong>CV adjunto:</strong> <a href="${cvUrl}">Descargar CV</a></p>
    `;

    await resend.emails.send({
      from: 'postulaciones@carpinteria-arrejin.com',
      to: 'carpinteria.arrejin@gmail.com',
      subject: `Nueva postulación laboral — ${nombre}`,
      html: emailContent,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Email enviado correctamente' }),
    };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error al enviar el email', details: error.message }),
    };
  }
};
