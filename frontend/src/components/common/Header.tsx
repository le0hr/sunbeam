import { Link } from 'react-router';
import { Phone, Sun } from 'lucide-react';
import logoUrl from '../icons/logo.png';

interface HeaderProps {
  onRequestMeasurement?: () => void;
}

export function Header({ onRequestMeasurement }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#121212] border-b border-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src = {logoUrl} className="w-[150px] h-auto"/>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8" style={{ fontFamily: 'Inter, sans-serif' }}>
            <Link to="/catalog" className="text-white/80 hover:text-white transition-colors">
              Каталог
            </Link>
            <a href="#about" className="text-white/80 hover:text-white transition-colors">
              Про нас
            </a>
            <a href="#contact" className="text-white/80 hover:text-white transition-colors">
              Зв'язатись
            </a>
          </nav>

          {/* Right side - Phone & CTA */}
          <div className="flex items-center gap-4">
            <a 
              href="tel:+380501234567" 
              className="hidden lg:flex items-center gap-2 text-white/80 hover:text-white transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <Phone className="w-4 h-4" />
              <span>+380 (50) 123-45-67</span>
            </a>
            <button
              onClick={onRequestMeasurement}
              className="px-6 py-2.5 bg-[#FFCC00] text-[#121212] rounded-lg hover:bg-[#F2B705] transition-all shadow-[0_0_20px_rgba(255,204,0,0.3)] hover:shadow-[0_0_30px_rgba(255,204,0,0.5)]"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Замовити замір
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
