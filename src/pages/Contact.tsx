import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-light mb-6 lg:mb-8 animate-fade-in-up">
            Contacto
          </h1>
          <p
            className="text-base md:text-lg lg:text-xl font-light text-stone-300 max-w-3xl leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Hagamos realidad tu próximo proyecto
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
                    href="mailto:carpinteria.arrejin@gmail.com"
                    className="flex items-start space-x-4 p-6 bg-stone-50 hover:bg-stone-100 transition-colors duration-300 group min-h-[44px]"
                  >
                    <Mail size={24} className="text-stone-800 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="text-lg font-normal text-stone-900 mb-2">Email</h3>
                      <p className="text-stone-600 font-light">
                        carpinteria.arrejin@gmail.com
                      </p>
                      <p className="text-sm text-stone-500 font-light mt-1">
                        Para consultas generales y presupuestos
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://wa.me/5491123724612"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 p-6 bg-stone-50 hover:bg-stone-100 transition-colors duration-300 group min-h-[44px]"
                  >
                    <Phone size={24} className="text-stone-800 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="text-lg font-normal text-stone-900 mb-2">Teléfono</h3>
                      <p className="text-stone-600 font-light">
                        +54 11 2372-4612
                      </p>
                      <p className="text-sm text-stone-500 font-light mt-1">
                        Administración
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

                  <a
                    href="https://www.instagram.com/carpinteriaarrejin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-4 p-6 bg-stone-50 hover:bg-stone-100 transition-colors duration-300 group min-h-[44px]"
                  >
                    <Instagram size={24} className="text-stone-800 flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h3 className="text-lg font-normal text-stone-900 mb-2">Instagram</h3>
                      <p className="text-stone-600 font-light">
                        @carpinteriaarrejin
                      </p>
                      <p className="text-sm text-stone-500 font-light mt-1">
                        Seguinos para ver nuestros proyectos
                      </p>
                    </div>
                  </a>
                </div>
              </div>

            </div>

            <div className="space-y-8">
              <div className="aspect-video lg:aspect-square bg-stone-200 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps?q=Dumont+636,+Isidro+Casanova,+Buenos+Aires,+Argentina&output=embed"
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
                <p className="text-stone-600 font-light leading-relaxed text-justify">
                  Nos especializamos en carpintería a medida.
                </p>
                <p className="text-stone-600 font-light leading-relaxed text-justify">
                  Envíanos planos, referencias o una descripción general de tu proyecto y te responderemos con una propuesta inicial y presupuesto estimativo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
