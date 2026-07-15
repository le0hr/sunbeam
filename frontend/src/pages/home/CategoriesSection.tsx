import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const MotionLink = motion(Link);

const categories = [
  {
    id: 1,
    title: 'Ролети',
    description: 'Ідеальний баланс приватності та сонячного світла',
    image: 'https://mirrolet.com.ua/local/image/002/004/podvijni-rulonni-shtori-750@.jpg',
    popular: true,
    categorySlug: 'rolety'
  },
  {
    id: 2,
    title: 'Плісе',
    description: 'Повне блокування сонячного світла',
    image: 'https://images.shafastatic.net/1291736632',
    popular: false,
    categorySlug: 'plise'

  },
  {
    id: 3,
    title: 'Жалюзі',
    description: "Класична елегантність для будь якого інтер'єру",
    image: 'https://content.rozetka.com.ua/goods/images/big/669522333.jpg',
    popular: false,
    categorySlug: 'zhalyuzi'
    
  },
  {
    id: 4,
    title: 'Москітні сітки',
    description: 'Системи захисту від комах',
    image: 'https://vrps.com.ua/image/cache/catalog/tovary/pidvikonnja/Sitka_antrazit_vikonna-600x600.jpg',
    popular: false,
    categorySlug: "moskitna"
  },
];

export function CategoriesSection() {
  return (
    <section id="catalog" className="py-20 bg-gradient-to-b from-[#121212] to-[#1C1C1C]">
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
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Наш <span className="text-[#FFCC00]">асортимент</span>
          </h2>
          <p 
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Перегляньте наявні категорії систем сонцезахисту
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <MotionLink
              to = {`/catalog?category=${category.categorySlug}`} 
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-[#1C1C1C] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FFCC00]/50 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/50 to-transparent opacity-80" />
                
                {/* Popular Badge */}
                {category.popular && (
                  <div className="absolute top-4 right-4 bg-[#FFCC00] text-[#121212] px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {category.title}
                </h3>
                <p 
                  className="text-white/60 mb-4"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {category.description}
                </p>

                <div
                  className="group/btn flex items-center gap-2 text-[#FFCC00] hover:gap-3 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 border-2 border-[#FFCC00]/20 rounded-2xl" />
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFCC00]/0 via-[#FFCC00]/10 to-[#FFCC00]/0 blur-xl" />
              </div>
            </MotionLink>
          ))}
        </div>
      </div>
    </section>
  );
}
