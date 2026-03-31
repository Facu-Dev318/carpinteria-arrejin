import { useEffect, useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [slideshowIndices, setSlideshowIndices] = useState<Record<string, number>>({});
  const [slideshowPaused, setSlideshowPaused] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order_index');

    if (data && !error) {
      setProjects(data);
      const initialIndices: Record<string, number> = {};
      data.forEach(project => {
        if (project.category === 'cocinas') {
          initialIndices[project.id] = 0;
        }
      });
      setSlideshowIndices(initialIndices);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const intervals: Record<string, NodeJS.Timeout> = {};

    projects.forEach(project => {
      if (project.category === 'cocinas' && project.images.length > 1 && !slideshowPaused[project.id]) {
        intervals[project.id] = setInterval(() => {
          setSlideshowIndices(prev => ({
            ...prev,
            [project.id]: ((prev[project.id] || 0) + 1) % project.images.length
          }));
        }, 3000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [projects, slideshowPaused]);

  const toggleSlideshow = (projectId: string) => {
    setSlideshowPaused(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl lg:text-7xl font-light mb-8 animate-fade-in-up">
            Proyectos
          </h1>
          <p
            className="text-lg lg:text-xl font-light text-stone-300 max-w-3xl leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Desarrollamos proyectos de carpintería entendiendo en profundidad la dinámica de una obra. Sabemos que cada decisión impacta en tiempos, costos y resultados, por eso trabajamos con precisión, planificación y materiales de alta calidad para garantizar ejecuciones confiables y duraderas.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[4/5] bg-stone-200 mb-6" />
                  <div className="h-8 bg-stone-200 mb-3 w-3/4" />
                  <div className="h-4 bg-stone-200 w-1/2" />
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-stone-500 font-light text-lg">
                No hay proyectos disponibles en este momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              {projects.map((project, index) => {
                const isCocinas = project.category === 'cocinas';
                const currentImageIndex = slideshowIndices[project.id] || 0;
                const currentImage = project.images[currentImageIndex] || project.images[0];

                return (
                  <article
                    key={project.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div
                      className="relative aspect-[4/5] overflow-hidden bg-stone-200 mb-6"
                      onClick={(e) => {
                        if (isCocinas && project.images.length > 1) {
                          e.stopPropagation();
                          toggleSlideshow(project.id);
                        }
                      }}
                    >
                      {isCocinas && project.images.length > 1 ? (
                        <div className="relative w-full h-full">
                          {project.images.map((image, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={image}
                              alt={`${project.title} - ${imgIndex + 1}`}
                              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                                imgIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          ))}
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute bottom-4 right-4 flex space-x-1">
                            {project.images.map((_, idx) => (
                              <div
                                key={idx}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                  idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={currentImage}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </>
                      )}
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-light text-stone-900 group-hover:text-stone-600 transition-colors duration-300">
                        {project.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-stone-500 font-light">
                        <span className="inline-flex items-center space-x-2">
                          <MapPin size={16} />
                          <span>{project.location}</span>
                        </span>
                        <span className="inline-flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>{project.year}</span>
                        </span>
                      </div>
                      <p className="text-sm uppercase tracking-wider text-stone-400 font-normal">
                        {project.typology}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-stone-900/95 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden bg-stone-200">
              {selectedProject.category === 'cocinas' && selectedProject.images.length > 1 ? (
                <div className="relative w-full h-full">
                  {selectedProject.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${selectedProject.title} - ${imgIndex + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        imgIndex === (slideshowIndices[selectedProject.id] || 0) ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedProject.images.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          idx === (slideshowIndices[selectedProject.id] || 0) ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <img
                  src={selectedProject.images[0]}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="p-8 lg:p-12 space-y-6">
              <div>
                <h2 className="text-4xl font-light text-stone-900 mb-4">
                  {selectedProject.title}
                </h2>
                <div className="flex flex-wrap gap-4 text-sm text-stone-500 font-light">
                  <span className="inline-flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{selectedProject.location}</span>
                  </span>
                  <span className="inline-flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{selectedProject.year}</span>
                  </span>
                  <span className="text-stone-400 font-normal uppercase tracking-wider">
                    {selectedProject.typology}
                  </span>
                </div>
              </div>
              <p className="text-lg font-light text-stone-700 leading-relaxed">
                {selectedProject.description}
              </p>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-colors duration-300 text-sm font-normal tracking-wide"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
