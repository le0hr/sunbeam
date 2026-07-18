import { Link, useLocation } from "react-router";
import { Phone } from "lucide-react";
import logoUrl from "../icons/logo.png";

export function Header() {
  const { pathname, hash } = useLocation();
  const navLinks = [
    { label: "Каталог", to: "/catalog" },
    { label: "Про нас", to: "/#about" },
    { label: "Зв'язатись", to: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-14">
            {/* Logo */}
            <Link to="/#home" className="flex-shrink-0">
              <img
                src={logoUrl}
                alt="Sunbeam"
                className="w-[150px] h-auto"
              />
            </Link>
            <div className="hidden md:block w-px h-6 bg-white/10" />
            {/* Navigation */}
            <nav
              className="hidden md:flex items-center gap-8"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {navLinks.map(({ label, to }) => {
                const isActive =
                  to === "/catalog"
                    ? pathname === "/catalog"
                    : pathname === "/" && hash === to.slice(1);

                return (
                  <Link
                    key={label}
                    to={to}
                    className={`
                      relative
                      py-2
                      text-[15px]
                      font-medium
                      transition-all
                      duration-300
                      after:absolute
                      after:left-0
                      after:-bottom-4
                      after:h-[2px]
                      after:rounded-full
                      after:bg-[#E6F7FF]
                      after:transition-all
                      after:duration-300
                      ${
                        isActive
                          ? "text-[#E6F7FF] after:w-full"
                          : "text-white/50 hover:text-[#E6F7FF] after:w-0 hover:after:w-full"
                      }
                    `}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-5">
            <a
              href="tel:+380501234567"
              className="hidden lg:flex items-center gap-2 text-white/55 hover:text-white transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <Phone className="w-4 h-4" />
              <span>+380 (63) 630-31-31</span>
            </a>

            <Link
              to="/#contact"
              className="px-6 py-3 bg-[#FFCC00] text-[#121212] rounded-xl font-semibold text-[15px]
              hover:bg-[#F2B705] transition-all
              shadow-[0_0_20px_rgba(255,204,0,0.25)]
              hover:shadow-[0_0_32px_rgba(255,204,0,0.45)]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Замовити замір
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}