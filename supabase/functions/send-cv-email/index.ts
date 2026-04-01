import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface EmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  cvUrl?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, phone, message, cvUrl }: EmailRequest = await req.json();

    const emailBody = `
Nueva solicitud laboral recibida desde el sitio web de Carpintería Arrejin

Nombre: ${name}
Email: ${email}
Teléfono: ${phone}

Mensaje:
${message}

${cvUrl ? `CV adjunto: ${cvUrl}` : 'No se adjuntó CV'}

---
Este correo fue generado automáticamente desde el formulario de trabajo del sitio web.
    `.trim();

    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY no configurado");
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Carpintería Arrejin <noreply@carpinteriaarrejin.com>",
        to: ["carpinteria.arrejin@gmail.com"],
        subject: `Nueva solicitud laboral - ${name}`,
        text: emailBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error("Error de Resend:", errorData);
      throw new Error(`Error al enviar email: ${errorData}`);
    }

    const responseData = await resendResponse.json();

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error en send-cv-email:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido"
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
});
