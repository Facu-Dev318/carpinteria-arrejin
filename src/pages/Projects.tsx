import { useEffect, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

const CATEGORIES = [
  { id: 'cocinas', label: 'Cocinas' },
  { id: 'revestimientos', label: 'Revestimientos y Vanitorys' },
  { id: 'bibliotecas', label: 'Bibliotecas y Repisas' },
  { id: 'puertas', label: 'Puertas' },
  { id: 'escaleras', label: 'Escaleras' },
  { id: 'camas', label: 'Camas' },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('cocinas');
  const [currentImageIndices, setCurrentImageIndices] = useState<Record<string, number>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
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
        initialIndices[project.id] = 0;
      });
      setCurrentImageIndices(initialIndices);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const intervals: Record<string, NodeJS.Timeout> = {};

    projects.forEach(project => {
      if (project.images.length > 1 && !slideshowPaused[project.id]) {
        intervals[project.id] = setInterval(() => {
          setCurrentImageIndices(prev => ({
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

  const openLightbox = (project: Project, imageIndex: number) => {
    setLightboxProject(project);
    setLightboxImageIndex(imageIndex);
    setLightboxOpen(true);
    setSlideshowPaused(prev => ({ ...prev, [project.id]: true }));
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    if (lightboxProject) {
      setSlideshowPaused(prev => ({ ...prev, [lightboxProject.id]: false }));
    }
    setTimeout(() => {
      setLightboxProject(null);
      setLightboxImageIndex(0);
    }, 300);
  };

  const categoryProjects = projects.filter(p => p.category === selectedCategory);

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

      <section className="py-16 lg:py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-stone-400 font-light text-lg">Cargando proyectos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-3 space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-6 py-4 text-left transition-all duration-300 group ${
                      selectedCategory === category.id
                        ? 'bg-amber-800 text-white'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <span className="text-sm font-light tracking-wide uppercase">
                      {category.label}
                    </span>
                    <ChevronRight
                      size={18}
                      className={`transition-transform duration-300 ${
                        selectedCategory === category.id ? 'translate-x-1' : 'group-hover:translate-x-1'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="lg:col-span-9">
                {categoryProjects.length === 0 ? (
                  <div className="bg-stone-900 p-12 text-center">
                    <p className="text-stone-400 font-light text-lg">
                      No hay proyectos disponibles en esta categoría.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8">
                    {categoryProjects.map((project) => {
                      const currentImageIndex = currentImageIndices[project.id] || 0;
                      const currentImage = project.images[currentImageIndex] || project.images[0];

                      return (
                        <div
                          key={project.id}
                          className="bg-stone-900 overflow-hidden group"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-5">
                            <div
                              className="md:col-span-3 relative aspect-video md:aspect-[4/3] overflow-hidden cursor-pointer"
                              onClick={() => openLightbox(project, currentImageIndex)}
                            >
                              {project.images.length > 1 ? (
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
                            <div className="md:col-span-2 p-8 flex flex-col justify-center space-y-4">
                              <h2 className="text-3xl font-light text-white">
                                {project.title}
                              </h2>
                              <div className="space-y-2 text-sm text-stone-400 font-light">
                                <p>{project.typology}</p>
                                <p>{project.location} · {project.year}</p>
                              </div>
                              {project.description && (
                                <p className="text-stone-300 font-light leading-relaxed pt-4">
                                  {project.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && lightboxProject && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-stone-300 transition-colors duration-300 z-50"
          >
            <X size={32} />
          </button>
          <div
            className="max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video overflow-hidden bg-stone-900">
              <img
                src={lightboxProject.images[lightboxImageIndex]}
                alt={`${lightboxProject.title} - ${lightboxImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
            {lightboxProject.images.length > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {lightboxProject.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setLightboxImageIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      idx === lightboxImageIndex ? 'bg-white w-8' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
