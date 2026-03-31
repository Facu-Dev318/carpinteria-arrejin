import { Users, Ruler, Factory, CheckCircle } from 'lucide-react';

export default function Capacity() {
  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light animate-fade-in-up text-center">
            Capacidad productiva para obras simultáneas
          </h1>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Taller de carpintería"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-stone-900">
                Infraestructura moderna
              </h2>
              <p className="text-lg font-light text-stone-700 leading-relaxed">
                Capacidad productiva preparada para proyectos complejos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-24">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-100 text-stone-800 rounded-full">
                <Factory size={24} />
              </div>
              <h3 className="text-2xl font-light text-stone-900">1.200m² de taller</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Espacio equipado con áreas diferenciadas para cada etapa del proceso productivo: corte, fabricación, terminación y control de calidad.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-100 text-stone-800 rounded-full">
                <Users size={24} />
              </div>
              <h3 className="text-2xl font-light text-stone-900">15 profesionales</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Equipo multidisciplinario: maestros carpinteros, operarios especializados, técnicos en terminación y personal de montaje.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-100 text-stone-800 rounded-full">
                <Ruler size={24} />
              </div>
              <h3 className="text-2xl font-light text-stone-900">Diseño técnico</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Capacidad de interpretar planos arquitectónicos, generar planos de taller y proponer soluciones constructivas optimizadas.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-100 text-stone-800 rounded-full">
                <CheckCircle size={24} />
              </div>
              <h3 className="text-2xl font-light text-stone-900">Control de calidad</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Procesos internos de verificación en cada etapa: selección de material, fabricación, terminación y pre-montaje en taller.
              </p>
            </div>
          </div>

          <div className="bg-stone-50 p-8 lg:p-12 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-light text-stone-900">
              Proceso de trabajo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h3 className="text-xl font-normal text-stone-900">1. Análisis y cotización</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  Revisamos planos, definimos materiales, evaluamos complejidad técnica y entregamos presupuesto detallado con cronograma tentativo.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-normal text-stone-900">2. Planificación técnica</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  Generamos planos de taller, definimos secuencia de fabricación, coordinamos con otros gremios y preparamos logística.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-normal text-stone-900">3. Fabricación</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  Selección de madera, corte, mecanizado, ensamblado y terminación con controles de calidad en cada etapa del proceso.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-normal text-stone-900">4. Montaje y entrega</h3>
                <p className="text-stone-600 font-light leading-relaxed">
                  Transporte, instalación profesional en obra, ajustes finales y entrega con documentación técnica del proyecto ejecutado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-8">
            <p className="text-lg font-light text-stone-300 leading-relaxed">
              Nuestra estructura productiva nos permite gestionar varios proyectos de manera paralela sin comprometer plazos ni calidad. Trabajamos regularmente con estudios de arquitectura y desarrolladores en obras de mediana y gran escala.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
