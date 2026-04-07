import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Careers() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let cvUrl = null;

      if (cvFile) {
        const fileExt = cvFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('cvs')
          .upload(fileName, cvFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('cvs')
          .getPublicUrl(fileName);

        cvUrl = publicUrl;
      }

      const { error } = await supabase.from('job_applications').insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        cv_url: cvUrl,
        status: 'new',
      });

      if (error) throw error;

      console.log('Intentando enviar email a:', '/.netlify/functions/send-cv-email');
      console.log('Datos a enviar:', {
        nombre: formData.name,
        email: formData.email,
        telefono: formData.phone,
        mensaje: formData.message,
        cvUrl: cvUrl,
      });

      const emailResponse = await fetch('/.netlify/functions/send-cv-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.name,
          email: formData.email,
          telefono: formData.phone,
          mensaje: formData.message,
          cvUrl: cvUrl,
        }),
      });

      console.log('Respuesta del servidor:', emailResponse.status, emailResponse.statusText);

      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error('Error al enviar email:', errorText);
      } else {
        const successData = await emailResponse.json();
        console.log('Email enviado exitosamente:', successData);
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setCvFile(null);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-light mb-6 lg:mb-8 animate-fade-in-up">
            Trabajá con nosotros
          </h1>
          <p
            className="text-base md:text-lg lg:text-xl font-light text-stone-300 max-w-3xl leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Estamos en constante crecimiento y siempre buscamos sumar talento comprometido con la excelencia y el trabajo bien hecho.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="mb-16 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-900">
              ¿Por qué sumarte a nuestro equipo?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-normal text-stone-900">Proyectos desafiantes</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  Trabajamos en proyectos arquitectónicos complejos y diversos: residencias premium, hoteles, espacios corporativos y desarrollos a medida que exigen lo mejor de cada profesional.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-normal text-stone-900">Crecimiento profesional</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  Invertimos en capacitación continua y valoramos el desarrollo de carrera. Buscamos personas que quieran crecer junto a la empresa.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-normal text-stone-900">Tecnología moderna</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  Maquinaria CNC, equipamiento de última generación y procesos optimizados. Vas a trabajar con herramientas profesionales.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-normal text-stone-900">Ambiente profesional</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  Equipo comprometido, trato respetuoso y condiciones laborales serias. Valoramos el conocimiento y la dedicación.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 p-8 lg:p-12">
            <h2 className="text-3xl font-light text-stone-900 mb-8">
              Enviá tu postulación
            </h2>

            {submitStatus === 'success' && (
              <div className="mb-8 p-6 bg-green-50 border border-green-200 flex items-start space-x-4">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="text-lg font-normal text-green-900 mb-2">
                    Postulación enviada con éxito
                  </h3>
                  <p className="text-green-800 font-light">
                    Gracias por tu interés. Revisaremos tu CV y nos pondremos en contacto si tu perfil se ajusta a nuestras necesidades actuales.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-8 p-6 bg-red-50 border border-red-200 flex items-start space-x-4">
                <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
                <div>
                  <h3 className="text-lg font-normal text-red-900 mb-2">
                    Error al enviar la postulación
                  </h3>
                  <p className="text-red-800 font-light">
                    Hubo un problema al procesar tu solicitud. Por favor intentá nuevamente o contactanos directamente.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-normal text-stone-900 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-normal text-stone-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-normal text-stone-900 mb-2">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-normal text-stone-900 mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Contanos sobre tu experiencia, habilidades y por qué querés trabajar con nosotros"
                  className="w-full px-4 py-3 bg-white border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <label className="block text-sm font-normal text-stone-900 mb-2">
                  CV (PDF)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setCvFile(e.target.files?.[0] || null)}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label
                    htmlFor="cv-upload"
                    className="flex items-center justify-center space-x-3 w-full px-4 py-6 bg-white border-2 border-dashed border-stone-300 hover:border-stone-900 cursor-pointer transition-colors duration-300"
                  >
                    <Upload size={24} className="text-stone-400" />
                    <span className="text-stone-600 font-light">
                      {cvFile ? cvFile.name : 'Seleccionar archivo PDF'}
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-sm font-normal tracking-wide">
                  {isSubmitting ? 'Enviando...' : 'Enviar postulación'}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
