import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/filosofia', label: 'Filosofía' },
    { path: '/capacidad', label: 'Capacidad productiva' },
    { path: '/direccion', label: 'Dirección' },
    { path: '/trabaja', label: 'Trabajá con nosotros' },
    { path: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-stone-900/95 backdrop-blur-lg shadow-xl border-b border-stone-800/50'
            : 'bg-gradient-to-b from-amber-950/50 via-stone-900/30 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24 lg:h-32">
            <Link
              to="/"
              className="relative z-50 flex items-center transition-opacity duration-300 hover:opacity-80 py-4"
            >
              <Logo className="h-16 lg:h-20 w-auto object-contain" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="hidden lg:flex items-center space-x-10 ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`uppercase text-xs tracking-[0.15em] transition-all duration-300 hover:text-white ${
                    location.pathname === link.path
                      ? 'text-white font-medium'
                      : 'text-white/75 font-light'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-stone-900 z-40 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '80px' }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className="uppercase text-xl tracking-[0.12em] font-light text-white/90 hover:text-white transition-all duration-300"
              style={{
                animation: isMobileMenuOpen
                  ? `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                  : 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}