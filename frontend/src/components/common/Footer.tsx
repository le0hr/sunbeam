import { Link } from 'react-router';
import { Sun, Instagram, Facebook, Mail } from 'lucide-react';


export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-4 flex flex-col items-center text-center"> {/* Змінено: items-center та text-center */}
            <div className="flex justify-center items-center gap-2 mb-3 w-full"> {/* Змінено: justify-center та додано w-full */}
              <img
                src="/logo.png"
                alt="Sunbeam"
                className="h-14 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm max-w-[280px]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Ролети та жалюзі для сучасних осель. Якість, якій можна довіряти.
            </p>
          </div>
          {/* Quick Links */}
          <div className="md:col-span-2">
            <h3 className="text-base text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Посилання
            </h3>
            <ul className="space-y-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li>
                <Link to="/catalog" className="text-white/60 hover:text-[#FFCC00] transition-colors text-sm">
                  Каталог товарів
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-white/60 hover:text-[#FFCC00] transition-colors text-sm">
                  Про нас
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-white/60 hover:text-[#FFCC00] transition-colors text-sm">
                  Контакти
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <h3 className="text-base text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Продукція
            </h3>
            <ul className="space-y-2" style={{ fontFamily: 'Inter, sans-serif' }}>
              <li >
                <Link to='/catalog?category=rolety' className="text-white/60 text-sm hover:text-[#FFCC00] transition-colors cursor-pointer">
                  Ролети
                </Link>
              </li>
              <li >
                <Link to='/catalog?category=plise' className="text-white/60 text-sm hover:text-[#FFCC00] transition-colors cursor-pointer">
                  Плісе
                </Link>
              </li>
              <li >
                <Link to='/catalog?category=zhalyuzi' className="text-white/60 text-sm hover:text-[#FFCC00] transition-colors cursor-pointer">
                  Жалюзі
                </Link>
              </li>
              <li >
                <Link to='/catalog?category=moskitna' className="text-white/60 text-sm hover:text-[#FFCC00] transition-colors cursor-pointer">
                  Москітні сітки
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="text-base text-white mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
              Зв'язатись
            </h3>
            <div className="space-y-2 mb-4">
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Черкаси, Україна
              </p>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <a href="tel:+380636303131" className="hover:text-[#FFCC00] transition-colors">
                  +380 (63) 630-31-31
                </a>
              </p>
              <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                <a href="mailto:sun.beam.protection@gmail.com" className="hover:text-[#FFCC00] transition-colors">
                  sun.beam.protection@gmail.com
                </a>
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-8 h-8 bg-white/5 hover:bg-[#FFCC00]/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-white/60 group-hover:text-[#FFCC00] transition-colors" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-white/5 hover:bg-[#FFCC00]/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-white/60 group-hover:text-[#FFCC00] transition-colors" />
              </a>
              <a 
                href="mailto:info@sunbeam.ua" 
                className="w-8 h-8 bg-white/5 hover:bg-[#FFCC00]/20 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-white/60 group-hover:text-[#FFCC00] transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            © 2026 Sunbeam. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}