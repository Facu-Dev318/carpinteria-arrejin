import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProjects();
  }, []);

  const loadFeaturedProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order_index')
      .limit(3);

    if (data && !error) {
      setFeaturedProjects(data);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(/hero-cocina-arrejin.png.png)',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/80 via-stone-900/70 to-stone-900/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 animate-fade-in-up leading-tight uppercase">
            Carpintería Arrejin
          </h1>
          <p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/95 mb-8 max-w-3xl mx-auto leading-snug animate-fade-in-up"
            style={{ animationDelay: '0.15s' }}
          >
            Diseño en madera para obras que exigen detalle
          </p>
          <p
            className="text-sm sm:text-base md:text-lg font-light text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            Con más de 60 años de trayectoria, trabajamos junto a estudios y desarrolladores dando forma a proyectos donde el diseño y la precisión son protagonistas.
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            style={{ animationDelay: '0.4s' }}
          >
            <Link
              to="/proyectos"
              className="group px-8 py-4 bg-white text-stone-900 hover:bg-stone-100 transition-all duration-300 flex items-center space-x-3"
            >
              <span className="text-sm font-normal tracking-wide">Ver proyectos</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/contacto"
              className="group px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-stone-900 transition-all duration-300 flex items-center space-x-3"
            >
              <span className="text-sm font-normal tracking-wide">Contacto</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full" />
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            <div className="space-y-3">
              <div className="text-6xl lg:text-7xl font-light text-stone-900 tracking-tight">60</div>
              <div className="text-sm uppercase tracking-widest text-stone-500 font-normal">Años de trayectoria</div>
              <p className="text-stone-600 font-light text-sm leading-relaxed pt-2">
                Tres generaciones perfeccionando el arte de la carpintería arquitectónica
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-6xl lg:text-7xl font-light text-stone-900 tracking-tight">15</div>
              <div className="text-sm uppercase tracking-widest text-stone-500 font-normal">Profesionales</div>
              <p className="text-stone-600 font-light text-sm leading-relaxed pt-2">
                Equipo especializado en fabricación, acabado y montaje de alta complejidad
              </p>
            </div>
            <div className="space-y-3">
              <div className="text-6xl lg:text-7xl font-light text-stone-900 tracking-tight">10+</div>
              <div className="text-sm uppercase tracking-widest text-stone-500 font-normal">Proyectos mensuales</div>
              <p className="text-stone-600 font-light text-sm leading-relaxed pt-2">
                Capacidad productiva para múltiples obras simultáneas en toda la provincia de Buenos Aires
              </p>
            </div>
          </div>
        </div>
      </section>

      {!isLoading && featuredProjects.length > 0 && (
        <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-16">
              <h2 className="text-4xl lg:text-5xl font-light text-stone-900 mb-6">
                Proyectos destacados
              </h2>
              <p className="text-lg text-stone-600 font-light max-w-2xl leading-relaxed">
                Una selección de trabajos que reflejan nuestra capacidad técnica y compromiso con la excelencia
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {featuredProjects.map((project, index) => (
                <Link
                  key={project.id}
                  to="/proyectos"
                  className="group"
                  style={{
                    animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                  }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-200 mb-6">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-stone-900 group-hover:text-stone-700 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-stone-500 font-light">
                      {project.typology} · {project.location} · {project.year}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-16 text-center">
              <Link
                to="/proyectos"
                className="inline-flex items-center space-x-3 text-stone-900 hover:text-stone-600 transition-colors duration-300 group"
              >
                <span className="text-sm font-normal tracking-wide border-b border-stone-900 group-hover:border-stone-600">
                  Ver todos los proyectos
                </span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 lg:py-32 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3 space-y-8">
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-widest text-stone-400 font-normal mb-4">
                  Desde 1964
                </div>
                <h2 className="text-4xl lg:text-6xl font-light leading-tight">
                  Tradición, precisión<br />y escala corporativa
                </h2>
              </div>
              <div className="space-y-6 text-base lg:text-lg font-light text-stone-300 leading-relaxed border-l-2 border-stone-700 pl-6">
                <p>
                  Carpintería Arrejin combina el conocimiento artesanal transmitido a través de tres generaciones con infraestructura moderna y capacidad productiva para proyectos de envergadura.
                </p>
                <p>
                  Trabajamos junto a nuestros clientes para materializar obras que exigen precisión técnica, acabados impecables y cumplimiento de plazos estrictos.
                </p>
                <p>
                  Nuestro taller cuenta con maquinaria CNC, equipos de calibrado profesional y líneas de acabado que garantizan consistencia y calidad en cada pieza que entregamos.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/filosofia"
                  className="inline-flex items-center space-x-3 text-white hover:text-stone-300 transition-colors duration-300 group"
                >
                  <span className="text-sm font-normal tracking-wide border-b border-white group-hover:border-stone-300">
                    Conocer nuestra filosofía
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-stone-800/50 p-8 space-y-4 border border-stone-700">
                <h3 className="text-xl font-normal text-white">Capacidades técnicas</h3>
                <ul className="space-y-3 text-sm font-light text-stone-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-stone-500 mt-1">—</span>
                    <span>Carpintería arquitectónica de alta complejidad</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-stone-500 mt-1">—</span>
                    <span>Mobiliario fijo y equipamiento a medida</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-stone-500 mt-1">—</span>
                    <span>Revestimientos y panelería decorativa</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-stone-500 mt-1">—</span>
                    <span>Fabricación CNC para diseños complejos</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-stone-500 mt-1">—</span>
                    <span>Montaje y supervisión en obra</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-stone-50">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="bg-white border border-stone-200 p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-widest text-stone-500 font-normal">
                  Nuevos proyectos
                </div>
                <h2 className="text-3xl lg:text-5xl font-light text-stone-900 leading-tight">
                  Trabajemos juntos en tu próximo desarrollo
                </h2>
              </div>
              <p className="text-base lg:text-lg text-stone-600 font-light leading-relaxed">
                Si buscas un socio confiable para tu próximo proyecto, conversemos.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-stone-900 text-white hover:bg-stone-800 transition-all duration-300 group"
                >
                  <span className="text-sm font-normal tracking-wide">Contactar</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link
                  to="/capacidad"
                  className="inline-flex items-center space-x-3 px-8 py-4 border border-stone-300 text-stone-900 hover:bg-stone-50 transition-all duration-300"
                >
                  <span className="text-sm font-normal tracking-wide">Ver capacidad productiva</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
