import { Award, Heart, Target, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const filosofiaImages: string[] = [
  '/IMG-20260402-WA0108.jpg'
];

export default function Philosophy() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (filosofiaImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % filosofiaImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="min-h-screen pt-20 lg:pt-24">
      <section className="py-16 lg:py-24 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h1 className="text-5xl lg:text-7xl font-light mb-8 animate-fade-in-up">
            Filosofía
          </h1>
          <p
            className="text-lg lg:text-xl font-light text-stone-300 max-w-3xl leading-relaxed"
            style={{ animationDelay: '0.2s' }}
          >
            Hoy somos un equipo de 15 profesionales, entre ellos operarios, colocadores, arquitecta, diseñadora y electricista, que continúan trabajando cada proyecto con la misma dedicación que nos caracteriza desde el inicio.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative aspect-[4/5] overflow-hidden rounded-full bg-stone-900 flex items-center justify-center">
              {filosofiaImages.length === 0 ? (
                <div className="text-center px-8">
                  <p className="text-stone-400 font-light text-lg">Imágenes del taller</p>
                  <p className="text-stone-500 font-light text-sm mt-2">próximamente</p>
                </div>
              ) : (
                filosofiaImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Taller - ${index + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))
              )}
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-light text-stone-900">
                Tradición que evoluciona
              </h2>
              <p className="text-lg font-light text-stone-700 leading-relaxed">
                Somos una empresa familiar que lleva décadas apostando al crecimiento sostenido: cada año reinvertimos en maquinaria de última generación y en la capacitación de nuestro equipo. Esa filosofía de mejora continua es la que nos posicionó como una de las carpinterías de mayor calidad y prestigio en toda la provincia de Buenos Aires.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-24">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-100 text-stone-800 rounded-full">
                <Award size={24} />
              </div>
              <h3 className="text-2xl font-light text-stone-900">Excelencia</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Cada proyecto es una oportunidad para demostrar nuestra capacidad técnica y nuestro compromiso con la calidad superior.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-100 text-stone-800 rounded-full">
                <Heart size={24} />
              </div>
              <h3 className="text-2xl font-light text-stone-900">Sensibilidad</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Entendemos que trabajamos para materializar la visión de arquitectos y diseñadores. Nos integramos con respeto y profesionalismo.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-100 text-stone-800 rounded-full">
                <Target size={24} />
              </div>
              <h3 className="text-2xl font-light text-stone-900">Precisión</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Combinamos conocimiento del oficio con tecnología moderna para garantizar ejecución impecable en cada detalle.
              </p>
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-stone-100 text-stone-800 rounded-full">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-2xl font-light text-stone-900">Crecimiento</h3>
              <p className="text-stone-600 font-light leading-relaxed">
                Invertimos constantemente en capacitación, maquinaria y procesos para acompañar proyectos cada vez más complejos.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-4xl lg:text-5xl font-light text-stone-900">
                Visión contemporánea
              </h2>
              <p className="text-lg font-light text-stone-700 leading-relaxed">
                Nuestra meta es consolidarnos como un referente en carpintería de diseño, y construir relaciones a largo plazo, convirtiéndonos en el aliado confiable para arquitectos, desarrolladores y clientes que buscan resultados de calidad.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden order-1 lg:order-2">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Visión moderna"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
