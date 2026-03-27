import { Mail, Phone, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Leadership() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl lg:text-7xl font-light mb-8 animate-fade-in-up">
            Dirección
          </h1>
          <p
            className="text-lg lg:text-xl font-light text-stone-300 max-w-3xl leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Liderazgo con visión de largo plazo, comprometido con la excelencia técnica, el crecimiento sostenido y la construcción de relaciones duraderas con clientes y colaboradores.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-200">
              <img
                src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Renzo Arrejin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-4">
                  Renzo Arrejin
                </h2>
                <p className="text-xl text-stone-600 font-light">
                  Director General
                </p>
              </div>

              <div className="space-y-6">
                <p className="text-lg font-light text-stone-700 leading-relaxed">
                  Tercera generación al frente de Carpintería Arrejin. Formado en el oficio desde los 15 años, Renzo combina conocimiento técnico profundo con visión estratégica de negocio.
                </p>
                <p className="text-lg font-light text-stone-700 leading-relaxed">
                  Bajo su dirección, la empresa pasó de ser un taller tradicional a una operación moderna con alcance nacional, invirtiendo en tecnología, capacitación y desarrollo de procesos, siempre manteniendo los valores de calidad y atención personalizada heredados de generaciones anteriores.
                </p>
                <p className="text-lg font-light text-stone-700 leading-relaxed">
                  Renzo lidera personalmente la relación con estudios de arquitectura, desarrolladores y clientes premium, asegurando que cada proyecto reciba la atención y el compromiso necesarios para materializarse con excelencia.
                </p>
              </div>

              <div className="pt-6 border-t border-stone-200 space-y-4">
                <h3 className="text-lg font-normal text-stone-900 mb-4">
                  Contacto directo para nuevos proyectos
                </h3>
                <div className="space-y-3">
                  <a
                    href="mailto:renzo@carpinteriaarrejin.com.ar"
                    className="flex items-center space-x-3 text-stone-700 hover:text-stone-900 transition-colors duration-300"
                  >
                    <Mail size={20} />
                    <span className="font-light">renzo@carpinteriaarrejin.com.ar</span>
                  </a>
                  <a
                    href="tel:+5491156789012"
                    className="flex items-center space-x-3 text-stone-700 hover:text-stone-900 transition-colors duration-300"
                  >
                    <Phone size={20} />
                    <span className="font-light">+54 9 11 5678-9012</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-stone-700 hover:text-stone-900 transition-colors duration-300"
                  >
                    <Linkedin size={20} />
                    <span className="font-light">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8 mb-12">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-900">
              Enfoque de trabajo
            </h2>
            <p className="text-lg font-light text-stone-700 leading-relaxed max-w-3xl mx-auto">
              Creemos en construir relaciones de largo plazo basadas en confianza, transparencia y resultados consistentes. Cada proyecto es una oportunidad para demostrar compromiso y capacidad técnica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 space-y-4">
              <h3 className="text-2xl font-light text-stone-900">Cercanía</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Participación directa en cada proyecto. Acceso inmediato a dirección para definiciones, seguimiento y resolución de imprevistos.
              </p>
            </div>
            <div className="bg-white p-8 space-y-4">
              <h3 className="text-2xl font-light text-stone-900">Transparencia</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Comunicación clara sobre tiempos, costos y desafíos técnicos. Reportes periódicos de avance y coordinación proactiva.
              </p>
            </div>
            <div className="bg-white p-8 space-y-4">
              <h3 className="text-2xl font-light text-stone-900">Compromiso</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Cumplimiento de plazos pactados, respuesta rápida ante contingencias y disponibilidad total hasta la entrega final.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-stone-900 mb-8">
            ¿Tenés un proyecto en mente?
          </h2>
          <p className="text-lg text-stone-600 font-light mb-12 leading-relaxed">
            Conversemos sobre tus necesidades. Nos especializamos en proyectos arquitectónicos complejos y trabajamos junto a estudios y desarrolladores para materializarlos con precisión.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300"
          >
            <span className="text-sm font-normal tracking-wide">Contactar a Renzo Arrejin</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
