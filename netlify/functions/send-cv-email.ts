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
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    let body: CVSubmission;
    try {
      body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    } catch (parseError) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid JSON in request body' }),
      };
    }

    const { nombre, email, telefono, mensaje, cvUrl } = body;

    if (!nombre || !email || !telefono) {
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
      ${cvUrl ? `<p><strong>CV adjunto:</strong> <a href="${cvUrl}">Descargar CV</a></p>` : '<p><em>Sin CV adjunto</em></p>'}
    `;

    console.log('Intentando enviar email a carpinteria.arrejin@gmail.com...');
    console.log('Datos:', { nombre, email, telefono, tieneCV: !!cvUrl });

    const result = await resend.emails.send({
      from: 'noreply@carpinteriaarrejin.com.ar',
      to: 'carpinteria.arrejin@gmail.com',
      subject: `Nueva postulación laboral — ${nombre}`,
      html: emailContent,
    });

    console.log('✅ RESPUESTA DE RESEND (ÉXITO):', JSON.stringify(result, null, 2));

    if (result.error) {
      console.error('❌ RESEND DEVOLVIÓ ERROR:', JSON.stringify(result.error, null, 2));
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Error al enviar el email',
          details: result.error
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email enviado correctamente',
        emailId: result.data?.id
      }),
    };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error al enviar el email',
        details: error.message || 'Unknown error'
      }),
    };
  }
};
