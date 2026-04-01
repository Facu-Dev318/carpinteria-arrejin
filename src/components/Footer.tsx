import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-stone-200 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <div className="space-y-6 lg:col-span-1">
            <Logo variant="light" className="h-20 w-auto" />
            <p className="text-xs font-light text-stone-400 leading-relaxed uppercase tracking-wider">
              Carpintería arquitectónica premium
            </p>
            <p className="text-sm font-light text-stone-400 leading-relaxed">
              Tres generaciones dedicadas a la excelencia en madera para proyectos de alto nivel en toda Argentina.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-normal tracking-wider uppercase text-stone-400">
              Navegación
            </h4>
            <nav className="flex flex-col space-y-3">
              {[
                { path: '/proyectos', label: 'Proyectos' },
                { path: '/filosofia', label: 'Filosofía' },
                { path: '/capacidad', label: 'Capacidad productiva' },
                { path: '/direccion', label: 'Dirección' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm font-light text-stone-300 hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-normal tracking-wider uppercase text-stone-400">
              Oportunidades
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link
                to="/trabaja"
                className="text-sm font-light text-stone-300 hover:text-white transition-colors duration-300"
              >
                Trabajá con nosotros
              </Link>
              <Link
                to="/contacto"
                className="text-sm font-light text-stone-300 hover:text-white transition-colors duration-300"
              >
                Contacto
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-normal tracking-wider uppercase text-stone-400">
              Contacto
            </h4>
            <div className="flex flex-col space-y-3">
              <a
                href="mailto:carpinteria.arrejin@gmail.com"
                className="flex items-start space-x-3 text-sm font-light text-stone-300 hover:text-white transition-colors duration-300"
              >
                <Mail size={18} className="mt-0.5 flex-shrink-0" />
                <span>carpinteria.arrejin@gmail.com</span>
              </a>
              <a
                href="tel:+541135807288"
                className="flex items-start space-x-3 text-sm font-light text-stone-300 hover:text-white transition-colors duration-300"
              >
                <Phone size={18} className="mt-0.5 flex-shrink-0" />
                <span>+54 11 3580-7288</span>
              </a>
              <div className="flex items-start space-x-3 text-sm font-light text-stone-300">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span>Dumont 636<br />Isidro Casanova<br />Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm font-light text-stone-400">
              © {currentYear} Carpintería Arrejin. Todos los derechos reservados.
            </p>
            <p className="text-sm font-light text-stone-400">
              Arquitectura en madera desde 1964
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
