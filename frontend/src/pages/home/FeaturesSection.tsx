import { motion } from 'motion/react';
import { MapPin, Ruler, Award, Shield } from 'lucide-react';

const features = [
  {
    icon: MapPin,
    title: 'Магазин в Черкасах',
    description: 'Відвідайте наш магазин щоб перевірити та відчути якість наших систем',
  },
  {
    icon: Ruler,
    title: 'Швидкі заміри',
    description: 'Замовте майстра що професійно зніме ваші заміри',
  },
  {
    icon: Award,
    title: '10+ років досвіду',
    description: 'Довірений дистрибютор сонцезахисних систем',
  },
  {
    icon: Shield,
    title: 'Якість гарантована',
    description: 'Найкращі матеріали та гарантія на всю продукцію',
  },
];

export function FeaturesSection() {
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
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Чому обрати <span className="text-[#FFCC00]">Sunbeam</span>
          </h2>
          <p 
            className="text-white/70 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Ми надаємо вийнятковий сервіс та якість товару для кожного покупця
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#1C1C1C] rounded-xl p-6 border border-white/5 hover:border-[#FFCC00]/30 transition-all hover:shadow-[0_0_30px_rgba(255,204,0,0.1)]"
            >
              <div className="w-14 h-14 bg-[#FFCC00]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#FFCC00]/20 transition-colors">
                <feature.icon className="w-7 h-7 text-[#FFCC00]" />
              </div>
              
              <h3 
                className="text-xl mb-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {feature.title}
              </h3>
              
              <p 
                className="text-white/60 text-sm leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
