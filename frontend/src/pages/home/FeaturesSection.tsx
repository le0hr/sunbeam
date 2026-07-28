import { motion } from "motion/react";
import { MapPin, Ruler, Award, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const features = [
  {
    icon: MapPin,
    title: "Магазин у Черкасах",
    description:
      "Відвідайте наш шоурум та перегляньте продукцію наживо перед покупкою.",
    cta: "Відкрити карту",
    action: "map",
  },
  {
    icon: Ruler,
    title: "Швидкі заміри",
    description:
      "Замовте професійний виїзд майстра для точних замірів ваших вікон.",
    cta: "Замовити замір",
    action: "contact",
  },
  {
    icon: Award,
    title: "10+ років досвіду",
    description:
      "Понад десять років допомагаємо клієнтам обрати найкращі сонцезахисні системи.",
    cta: "Переглянути каталог",
    action: "/catalog",
  },
  {
    icon: Shield,
    title: "Якість гарантована",
    description:
      "Використовуємо тільки перевірені матеріали та надаємо гарантію на продукцію.",
    cta: "Обрати систему",
    action: "/catalog",
  },
];

export function FeaturesSection() {
  const navigate = useNavigate();

  const handleClick = (action: string) => {
    if (action.startsWith("/")) {
      navigate(action);
      return;
    }

    document.getElementById(action)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section id="about" className="py-20 bg-[#121212] scroll-mt-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Чому обрати <span className="text-[#FFCC00]">SunBeam</span>
          </h2>

          <p
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Ми пропонуємо якісні сонцезахисні системи, професійний сервіс та
            індивідуальний підхід до кожного клієнта.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.button
              key={feature.title}
              type="button"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => handleClick(feature.action)}
              className="group text-left bg-[#1C1C1C] rounded-xl p-6 border border-white/5 hover:border-[#FFCC00]/30 hover:shadow-[0_0_30px_rgba(255,204,0,0.12)] transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl bg-[#FFCC00]/10 flex items-center justify-center mb-5 group-hover:bg-[#FFCC00]/20 transition-colors">
                <feature.icon className="w-7 h-7 text-[#FFCC00]" />
              </div>

              <h3
                className="text-xl mb-3"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {feature.title}
              </h3>

              <p
                className="text-white/60 text-sm leading-7"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {feature.description}
              </p>

              <div className="mt-6 flex items-center text-[#FFCC00] text-sm font-medium">
                <span>{feature.cta}</span>

                <ArrowRight
                  size={16}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}