import { useState } from 'react';
import { motion } from 'motion/react';
import { User, Phone, Send, CheckCircle } from 'lucide-react';

import { contactService } from '../../api/contactService';

export function LeadCaptureForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await contactService(formData);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <section 
      id="contact" 
      className="py-20 bg-[#121212] relative overflow-hidden
      scroll-mt-24"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,204,0,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FFCC00]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 
              className="text-4xl lg:text-5xl mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Замовте <span className="text-[#FFCC00]">Безкоштовну консультацію</span>
            </h2>
            <p 
              className="text-white/70"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Залиште свої контактні дані й менеджер з вами зв'яжиться протягом 24 годин
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-[#1C1C1C] rounded-2xl p-8 lg:p-12 border border-white/10 shadow-2xl"
          >
            {/* Background Image Overlay */}
            <div className="absolute inset-0 opacity-5 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1616594092403-fb65629b0a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5kb3clMjBibGluZHMlMjBiZWRyb29tfGVufDF8fHx8MTc4MTk4MTIyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="relative space-y-6">
                {/* Name Input */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm text-white/70 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    ПІБ
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFCC00]/50 focus:shadow-[0_0_20px_rgba(255,204,0,0.1)] transition-all"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm text-white/70 mb-2"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Номер телефону
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+380 (XX) XXX-XX-XX"
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFCC00]/50 focus:shadow-[0_0_20px_rgba(255,204,0,0.1)] transition-all"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#FFCC00] text-[#121212] rounded-xl px-8 py-4 hover:bg-[#F2B705] transition-all shadow-[0_0_30px_rgba(255,204,0,0.3)] hover:shadow-[0_0_40px_rgba(255,204,0,0.5)] flex items-center justify-center gap-2 group"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="font-semibold text-lg">Замовити безкоштовну консультацію</span>
                  <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Privacy Notice */}
                <p className="text-xs text-white/40 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                  By submitting this form, you agree to our privacy policy. 
                  We respect your privacy and will never share your information.
                </p>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative py-12 text-center"
              >
                <div className="w-20 h-20 bg-[#FFCC00]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-[#FFCC00]" />
                </div>
                <h3 
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Thank You!
                </h3>
                <p 
                  className="text-white/70"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  We've received your request. Our specialist will contact you soon.
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-[#FFCC00] text-lg mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Відвідайте нас
              </div>
              <div className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                Шоурум в Черкасах 
                Вулиця М. Батицького 1<br />Mon-Sat: 9AM-7PM
              </div>
            </div>
            <div>
              <div className="text-[#FFCC00] text-lg mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Зателефонуйте
              </div>
              <div className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                +380 (50) 123-45-67<br />
              </div>
            </div>
            <div>
              <div className="text-[#FFCC00] text-lg mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Пишіть на пошту
              </div>
              <div className="text-sm text-white/60" style={{ fontFamily: 'Inter, sans-serif' }}>
                info@sunbeam.ua<br />Швидкі відповіді
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
