import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Gradient Glow Background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#FFCC00]/10 via-transparent to-transparent opacity-30 blur-3xl" />
      
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10"
          >
            <h1 
              className="text-5xl lg:text-7xl mb-6 leading-tight"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Сонцезахисні системи{' '}
              <span className="text-[#FFCC00]">для Вашого Дому</span>
            </h1>
            
            <p 
              className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Відчуйте ідеальне поєднання стилю, функціональності та якості. 
              Ролети та жалюзі, виготовлені на замовлення, створені для того, 
              щоб підкреслити красу вашого інтер’єру та забезпечити оптимальний контроль освітлення.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-[#FFCC00] text-[#121212] rounded-xl hover:bg-[#F2B705] transition-all shadow-[0_0_30px_rgba(255,204,0,0.4)] hover:shadow-[0_0_40px_rgba(255,204,0,0.6)] flex items-center gap-2"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span className="font-semibold">Отримати консультацію</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Переглянути каталог
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl text-[#FFCC00] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  10+
                </div>
                <div className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Років досвіду
                </div>
              </div>
              <div>
                <div className="text-3xl text-[#FFCC00] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  2000+
                </div>
                <div className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Щасливих клієнтів
                </div>
              </div>
              <div>
                <div className="text-3xl text-[#FFCC00] mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                  100%
                </div>
                <div className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Гарантія якості
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1732973708124-444694c08759?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByb2xsZXIlMjBibGluZHMlMjBkYXJrJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzgxOTgxMjI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern roller blinds in dark interior"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-50" />
            </div>
            
            {/* Floating Badge */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-[#1C1C1C] border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFCC00] rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <div>
                  <div className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Premium Quality
                  </div>
                  <div className="font-semibold" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Certified Materials
                  </div>
                </div>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
