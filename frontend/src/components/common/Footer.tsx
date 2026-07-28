import { Link } from "react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { FooterMap } from "../map/FooterMap";

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5">
      <div className="container mx-auto px-6 pt-20">
        {/* ================= MAP ================= */}
        <section className="mb-24"
                  id="map">
          <div className="text-center mb-10">
            <span
              className="uppercase tracking-[0.35em] text-xs text-[#D4AF37]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              SHOWROOM
            </span>
            <h2
              className="mt-3 text-3xl md:text-4xl text-white"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Завітайте до нас
            </h2>
            <p
              className="mt-4 text-white/60 max-w-2xl mx-auto leading-7"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Перегляньте розташування нашого шоуруму та
              побудуйте маршрут у декілька кліків.
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8" />
          </div>
          <div className="max-w-5xl mx-auto">
            <FooterMap />
          </div>
        </section>
        {/* ================= LINKS ================= */}
        <section className="border-t border-white/5 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Brand */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
              <img
                src="/logo.png"
                alt="SunBeam"
                className="h-14 w-auto mb-4"
              />
              <p
                className="text-white/60 text-sm max-w-xs leading-7"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Ролети, жалюзі, плісе та москітні сітки
                для сучасних осель. Якість, якій можна довіряти.
              </p>
            </div>
            {/* Links */}
            <div className="md:col-span-2">
              <h3
                className="text-white mb-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Посилання
              </h3>
              <ul
                className="space-y-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <li>
                  <Link
                    to="/catalog"
                    className="text-white/60 hover:text-[#D4AF37] transition-colors"
                  >
                    Каталог
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#about"
                    className="text-white/60 hover:text-[#D4AF37]"
                  >
                    Про нас
                  </Link>
                </li>
                <li>
                  <Link
                    to="/#contact"
                    className="text-white/60 hover:text-[#D4AF37]"
                  >
                    Контакти
                  </Link>
                </li>
              </ul>
            </div>
            {/* Products */}
            <div className="md:col-span-3">
              <h3
                className="text-white mb-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Продукція
              </h3>
              <ul
                className="space-y-3"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <li>
                  <Link
                    to="/catalog/rolety"
                    className="text-white/60 hover:text-[#D4AF37]"
                  >
                    Ролети
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog/plise"
                    className="text-white/60 hover:text-[#D4AF37]"
                  >
                    Плісе
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog/zhalyuzi"
                    className="text-white/60 hover:text-[#D4AF37]"
                  >
                    Жалюзі
                  </Link>
                </li>
                <li>
                  <Link
                    to="/catalog/moskitna"
                    className="text-white/60 hover:text-[#D4AF37]"
                  >
                    Москітні сітки
                  </Link>
                </li>
              </ul>
            </div>
            {/* Contact */}
            <div className="md:col-span-3">
              <h3
                className="text-white mb-4"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Контакти
              </h3>
              <div
                className="space-y-3 text-white/60"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <p>Черкаси, Україна</p>
                <p>
                  <a
                    href="tel:+380636303131"
                    className="hover:text-[#D4AF37]"
                  >
                    +380 (63) 630-31-31
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:sun.beam.protection@gmail.com"
                    className="hover:text-[#D4AF37]"
                  >
                    sun.beam.protection@gmail.com
                  </a>
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors group"
                >
                  <Instagram className="w-5 h-5 text-white/60 group-hover:text-[#D4AF37]" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors group"
                >
                  <Facebook className="w-5 h-5 text-white/60 group-hover:text-[#D4AF37]" />
                </a>

                <a
                  href="mailto:sun.beam.protection@gmail.com"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#D4AF37]/20 flex items-center justify-center transition-colors group"
                >
                  <Mail className="w-5 h-5 text-white/60 group-hover:text-[#D4AF37]" />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* ================= BOTTOM ================= */}
        <div className="mt-12 border-t border-white/5 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-white/40 text-sm"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2026 SunBeam. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}