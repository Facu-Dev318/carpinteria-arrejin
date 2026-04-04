import { useEffect, useState } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { supabase, Project } from '../lib/supabase';

const CATEGORIES = [
  { id: 'cocinas', label: 'Cocinas' },
  { id: 'revestimientos', label: 'Revestimientos' },
  { id: 'vanitorys', label: 'Vanitorys' },
  { id: 'bibliotecas', label: 'Bibliotecas y Repisas' },
  { id: 'puertas', label: 'Puertas' },
  { id: 'escaleras', label: 'Escaleras' },
  { id: 'cavas', label: 'Cavas' },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('cocinas');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);
  const [slideshowPaused, setSlideshowPaused] = useState(false);
  const [allCategoryImages, setAllCategoryImages] = useState<string[]>([]);

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
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const categoryProjects = projects.filter(p => {
      if (selectedCategory === 'bibliotecas' && p.category === 'bibliotecas y repisas') {
        return true;
      }
      if (selectedCategory === 'vanitorys' && p.category === 'vanitory') {
        return true;
      }
      return p.category === selectedCategory;
    });
    const images: string[] = [];
    categoryProjects.forEach(project => {
      images.push(...project.images);
    });
    setAllCategoryImages(images);
    setCurrentImageIndex(0);
  }, [selectedCategory, projects]);

  useEffect(() => {
    if (allCategoryImages.length > 1 && !slideshowPaused) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % allCategoryImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [allCategoryImages, slideshowPaused]);

  const openLightbox = (imageIndex: number) => {
    setLightboxImageIndex(imageIndex);
    setLightboxOpen(true);
    setSlideshowPaused(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSlideshowPaused(false);
    setTimeout(() => {
      setLightboxImageIndex(0);
    }, 300);
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-light mb-6 lg:mb-8 animate-fade-in-up">
            Proyectos
          </h1>
          <p
            className="text-base md:text-lg lg:text-xl font-light text-stone-300 max-w-3xl leading-relaxed"
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
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
              <div className="lg:col-span-3 space-y-2">
                {CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4 text-left transition-all duration-300 group min-h-[44px] ${
                      selectedCategory === category.id
                        ? 'bg-amber-800 text-white'
                        : 'bg-stone-900 text-stone-300 hover:bg-stone-800'
                    }`}
                  >
                    <span className="text-xs lg:text-sm font-light tracking-wide uppercase">
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
                {allCategoryImages.length === 0 ? (
                  <div className="bg-stone-900 p-12 text-center">
                    <p className="text-stone-400 font-light text-lg">
                      No hay proyectos disponibles en esta categoría.
                    </p>
                  </div>
                ) : (
                  <div className="bg-stone-900 overflow-hidden">
                    <div
                      className="relative aspect-video cursor-pointer"
                      onClick={() => openLightbox(currentImageIndex)}
                    >
                      {allCategoryImages.map((image, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={image}
                          alt={`${selectedCategory} - ${imgIndex + 1}`}
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                            imgIndex === currentImageIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        />
                      ))}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
                      {allCategoryImages.length > 1 && (
                        <div className="absolute bottom-4 right-4 flex space-x-1">
                          {allCategoryImages.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="p-8 text-center">
                      <h2 className="text-3xl font-light text-white mb-2">
                        {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                      </h2>
                      <p className="text-stone-400 font-light">
                        {allCategoryImages.length} {allCategoryImages.length === 1 ? 'imagen' : 'imágenes'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {lightboxOpen && allCategoryImages.length > 0 && (
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
                src={allCategoryImages[lightboxImageIndex]}
                alt={`${selectedCategory} - ${lightboxImageIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
            {allCategoryImages.length > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {allCategoryImages.map((_, idx) => (
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
