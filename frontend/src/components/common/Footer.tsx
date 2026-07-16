import { Link } from 'react-router';
import { Sun, Instagram, Facebook, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#FFCC00] to-[#F2B705] rounded-full flex items-center justify-center">
                <Sun className="w-6 h-6 text-[#121212]" />
              </div>
              <span className="text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                Sunbeam
              </span>
            </div>
            <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Ролети та жалюзі для сучасних осель. Якість, якій можна довіряти.
            </p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Посилання
            </h3>
            <ul className="space-y-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li>
                <Link to="/catalog" className="text-white/60 hover:text-[#FFCC00] transition-colors text-sm">
                  Product Catalog
                </Link>
              </li>
              <li>
                <a href="#about" className="text-white/60 hover:text-[#FFCC00] transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-[#FFCC00] transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div> */}

          {/* Products */}
          {/* <div>
            <h3 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Products
            </h3>
            <ul className="space-y-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li className="text-white/60 text-sm">Day-Night Blinds</li>
              <li className="text-white/60 text-sm">Blackout Blinds</li>
              <li className="text-white/60 text-sm">Classic Rollers</li>
              <li className="text-white/60 text-sm">Premium Shutters</li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h3 className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Зв'язатись
            </h3>
            <div className="space-y-3 mb-4">
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Черкаси, Україна
              </p>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                +380 (63) 630-31-31
              </p>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                info@sunbeam.ua
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-9 h-9 bg-white/5 hover:bg-[#FFCC00]/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white/60 hover:text-[#FFCC00]" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 bg-white/5 hover:bg-[#FFCC00]/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white/60 hover:text-[#FFCC00]" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 bg-white/5 hover:bg-[#FFCC00]/20 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-white/60 hover:text-[#FFCC00]" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2026 Sunbeam. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
