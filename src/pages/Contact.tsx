import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl lg:text-7xl font-light mb-8 animate-fade-in-up">
            Contacto
          </h1>
          <p
            className="text-lg lg:text-xl font-light text-stone-300 max-w-3xl leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Estamos disponibles para conversar sobre tu proyecto arquitectónico. Trabajamos con estudios, desarrolladores y clientes premium en toda Argentina.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-light text-stone-900 mb-8">
                  Información de contacto
                </h2>
                <div className="space-y-6">
                  <a
                    href="https://wa.me/5491142567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 p-6 bg-stone-50 hover:bg-stone-100 transition-colors duration-300 group"
                  >
                    <MessageCircle size={24} className="text-stone-800 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="text-lg font-normal text-stone-900 mb-2">WhatsApp</h3>
                      <p className="text-stone-600 font-light">
                        +54 9 11 4256-7890
                      </p>
                      <p className="text-sm text-stone-500 font-light mt-1">
                        Respuesta inmediata en horario comercial
                      </p>
                    </div>
                  </a>

                  <a
                    href="mailto:info@carpinteriaarrejin.com.ar"
                    className="flex items-start space-x-4 p-6 bg-stone-50 hover:bg-stone-100 transition-colors duration-300 group"
                  >
                    <Mail size={24} className="text-stone-800 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="text-lg font-normal text-stone-900 mb-2">Email</h3>
                      <p className="text-stone-600 font-light">
                        info@carpinteriaarrejin.com.ar
                      </p>
                      <p className="text-sm text-stone-500 font-light mt-1">
                        Para consultas generales y presupuestos
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+541142567890"
                    className="flex items-start space-x-4 p-6 bg-stone-50 hover:bg-stone-100 transition-colors duration-300 group"
                  >
                    <Phone size={24} className="text-stone-800 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="text-lg font-normal text-stone-900 mb-2">Teléfono</h3>
                      <p className="text-stone-600 font-light">
                        +54 11 4256-7890
                      </p>
                      <p className="text-sm text-stone-500 font-light mt-1">
                        Lun a Vie: 8:00 a 18:00 hs
                      </p>
                    </div>
                  </a>

                  <div className="flex items-start space-x-4 p-6 bg-stone-50">
                    <MapPin size={24} className="text-stone-800 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-normal text-stone-900 mb-2">Taller y oficinas</h3>
                      <p className="text-stone-600 font-light">
                        Dumont 636<br />
                        Isidro Casanova<br />
                        Buenos Aires, Argentina<br />
                        CP: 1765
                      </p>
                      <p className="text-sm text-stone-500 font-light mt-3">
                        Visitas al taller: coordinar previamente
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-stone-900 text-white p-8 space-y-4">
                <h3 className="text-2xl font-light">Contacto directo con dirección</h3>
                <p className="font-light text-stone-300 leading-relaxed">
                  Para proyectos de envergadura o consultas específicas, podés contactar directamente a Renzo Arrejin, Director General.
                </p>
                <a
                  href="mailto:renzo@carpinteriaarrejin.com.ar"
                  className="inline-block text-white hover:text-stone-300 transition-colors duration-300 border-b border-white hover:border-stone-300 font-light"
                >
                  renzo@carpinteriaarrejin.com.ar
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <div className="aspect-square bg-stone-200 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.8668!2d-58.6!3d-34.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDQyJzAwLjAiUyA1OMKwMzYnMDAuMCJX!5e0!3m2!1ses-419!2sar!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Carpintería Arrejin"
                />
              </div>

              <div className="bg-stone-50 p-8 space-y-6">
                <h3 className="text-2xl font-light text-stone-900">
                  ¿Cómo podemos ayudarte?
                </h3>
                <div className="space-y-4 text-stone-600 font-light">
                  <p>Nos especializamos en:</p>
                  <ul className="space-y-2 ml-4">
                    <li>• Carpintería arquitectónica para proyectos residenciales</li>
                    <li>• Mobiliario y revestimientos para hoteles y restaurantes</li>
                    <li>• Equipamiento corporativo a medida</li>
                    <li>• Desarrollos de alta complejidad técnica</li>
                    <li>• Asesoramiento técnico para estudios de arquitectura</li>
                  </ul>
                </div>
                <p className="text-stone-600 font-light leading-relaxed">
                  Envianos planos, referencias o una descripción general de tu proyecto y te responderemos con una propuesta inicial y presupuesto estimativo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-stone-900 mb-6">
            Alcance nacional
          </h2>
          <p className="text-lg text-stone-600 font-light leading-relaxed">
            Si bien nuestro taller está en Buenos Aires, trabajamos en proyectos en todo el territorio argentino. Contamos con logística propia y equipo de montaje para garantizar la correcta instalación en cualquier punto del país.
          </p>
        </div>
      </section>
    </div>
  );
}
