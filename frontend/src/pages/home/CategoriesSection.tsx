import { motion } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'Ролети День-Ніч',
    description: 'Ідеальний баланс приватності та сонячного світла',
    image: 'https://images.unsplash.com/photo-1506455050018-40e785776da4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXklMjBuaWdodCUyMHJvbGxlciUyMGJsaW5kc3xlbnwxfHx8fDE3ODE5ODEyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    popular: true,
  },
  {
    id: 2,
    title: 'Блекаут Ролети',
    description: 'Повне блокування сонячного світла',
    image: 'https://images.unsplash.com/photo-1609534117141-ff9f20450902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja291dCUyMHdpbmRvdyUyMGJsaW5kc3xlbnwxfHx8fDE3ODE5ODEyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    popular: false,
  },
  {
    id: 3,
    title: 'Класичні Ролети',
    description: "Класична елегантність для будь якого інтер'єру",
    image: 'https://images.unsplash.com/photo-1616594092403-fb65629b0a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5kb3clMjBibGluZHMlMjBiZWRyb29tfGVufDF8fHx8MTc4MTk4MTIyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    popular: false,
  },
  {
    id: 4,
    title: 'Жалюзі',
    description: 'Складний дизайн з неймовірною довговічністю',
    image: 'https://images.unsplash.com/photo-1518027322746-3813f2e2bb5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwd2luZG93JTIwc2h1dHRlcnN8ZW58MXx8fHwxNzgxOTgxMjI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    popular: false,
  },
  {
    id: 5,
    title: 'Плісе',
    description: "Сучасне рішення для будь-якого інтер'єру",
    image: 'https://images.unsplash.com/photo-1632120669818-ed5498030e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aW5kb3clMjB0cmVhdG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc4MTk4MTIyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    popular: true,
  },
  // {
  //   id: 6,
  //   title: 'Персональне рішення',
  //   description: 'Tailored designs for unique requirements',
  //   image: 'https://images.unsplash.com/photo-1732973708124-444694c08759?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByb2xsZXIlMjBibGluZHMlMjBkYXJrJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzgxOTgxMjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  //   popular: false,
  // },
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
            <motion.div
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

                <Link
                  to="/catalog"
                  className="group/btn flex items-center gap-2 text-[#FFCC00] hover:gap-3 transition-all"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 border-2 border-[#FFCC00]/20 rounded-2xl" />
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFCC00]/0 via-[#FFCC00]/10 to-[#FFCC00]/0 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
