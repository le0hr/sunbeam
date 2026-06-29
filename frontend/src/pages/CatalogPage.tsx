import { useState, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun, ArrowLeft, Search, SlidersHorizontal, X, Star,
  ChevronDown, Phone, ArrowRight, Check
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Roller Blinds", "Day-Night", "Blackout", "Shutters", "Custom"];

const MATERIALS = ["All Materials", "Fabric", "PVC", "Aluminium", "Wood", "Composite"];

const products = [
  {
    id: 1,
    name: "Aurora Day-Night",
    category: "День-Ніч",
    material: "Тканина",
    price: 2800,
    rating: 4.9,
    reviews: 128,
    popular: true,
    new: false,
    description: "Легкий перехід між прозорими та щільними смугами. Ідеально підходить для віталень, де потрібні затишна атмосфера та приватність.",
    colors: ["#F5F0E8", "#D4C5A9", "#8B7355", "#2C2C2C"],
    image: "https://images.unsplash.com/photo-1506455050018-40e785776da4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXklMjBuaWdodCUyMHJvbGxlciUyMGJsaW5kc3xlbnwxfHx8fDE3ODE5ODEyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Двошарова система", "Захист від УФ-променів 97%", "Просте встановлення", "Виготовлення за індивідуальними розмірами"],
  },
  {
    id: 2,
    name: "Nocturne Blackout",
    category: "Блекаут",
    material: "ПВХ",
    price: 2200,
    rating: 4.8,
    reviews: 204,
    popular: true,
    new: false,
    description: "Повна темрява за першої потреби. Наша найщільніша підкладка блекаут блокує 100% світла — чудовий вибір для спалень та домашніх кінотеатрів.",
    colors: ["#1A1A1A", "#2D2D2D", "#4A3728", "#1C2B3A"],
    image: "https://images.unsplash.com/photo-1609534117141-ff9f20450902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja291dCUyMHdpbmRvdyUyMGJsaW5kc3xlbnwxfHx8fDE3ODE5ODEyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["100% блокування світла", "Термоізоляція", "Шумозаглушення", "Вологостійкість"],
  },
  {
    id: 3,
    name: "Linen Classic Roller",
    category: "Рулонні штори",
    material: "Тканина",
    price: 1600,
    rating: 4.7,
    reviews: 89,
    popular: false,
    new: false,
    description: "Елегантна текстура тканого льону, яка пасуватиме до будь-якого інтер'єру. М'яке розсіяне світло створює теплу й природну атмосферу.",
    colors: ["#E8DFD0", "#C9B99A", "#A89070", "#7A6550"],
    image: "https://images.unsplash.com/photo-1616594092403-fb65629b0a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5kb3clMjBibGluZHMlMjBiZWRyb29tfGVufDF8fHx8MTc4MTk4MTIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Натуральний преміум-льон", "Фільтрація світла", "Антистатичне покриття", "Можна прати"],
  },
  {
    id: 4,
    name: "Heritage Shutter",
    category: "Віконниці",
    material: "Дерево",
    price: 6500,
    rating: 5.0,
    reviews: 47,
    popular: false,
    new: false,
    description: "Віконниці з масиву липи з покриттям ручним лаком. Справжній витвір мистецтва, що додає архітектурної цінності будь-якій кімнаті.",
    colors: ["#F5F0E8", "#D4B896", "#8B6914", "#2C1A0E"],
    image: "https://images.unsplash.com/photo-1518027322746-3813f2e2bb5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwd2luZG93JTIwc2h1dHRlcnN8ZW58MXx8fHwxTzgxOTgxMjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Масив американської липи", "Покриття ручним лаком", "Регульовані ламелі", "15 років гарантії"],
  },
  {
    id: 5,
    name: "Prism Motorised",
    category: "Рулонні штори",
    material: "Композит",
    price: 4200,
    rating: 4.9,
    reviews: 63,
    popular: false,
    new: true,
    description: "Розумні автоматичні штори з керуванням через додаток або голос. Налаштовуйте автоматичні сценарії під схід та захід сонця для максимального комфорту.",
    colors: ["#FFFFFF", "#E0E0E0", "#B0B0B0", "#404040"],
    image: "https://images.unsplash.com/photo-1632120669818-ed5498030e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aW5kb3clMjB0cmVhdG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc4MTk4MTIyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Електропривід", "Керування через додаток та голос", "Розклад автоматизації", "Живлення від акумулятора або мережі"],
  },
  {
    id: 6,
    name: "Bespoke Studio",
    category: "Індивідуальне замовлення",
    material: "Тканина",
    price: 0,
    rating: 5.0,
    reviews: 31,
    popular: false,
    new: true,
    description: "Повністю індивідуальне дизайнерське рішення для нестандартних вікон, мансард та архітектурних особливостей. Ми самі заміримо, спроектуємо та встановимо.",
    colors: ["#FFCC00", "#F2B705", "#D4A017", "#8B6914"],
    image: "https://images.unsplash.com/photo-1732973708124-444694c08759?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByb2xsZXIlMjBibGluZHMlMjBkYXJrJTIwaW50ZXJpb3J8ZW58MXx8fHwxTzgxOTgxMjI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Вікна будь-якої форми", "Зразки матеріалів", "3D-візуалізація", "Встановлення під ключ"],
  },
  {
    id: 7,
    name: "Velvet Dimout",
    category: "Рулонні штори",
    material: "Тканина",
    price: 1950,
    rating: 4.6,
    reviews: 72,
    popular: false,
    new: false,
    description: "Розкішна тканина з ефектом велюру, яка м'яко фільтрує світло, створюючи тепле янтарне сяйво. Додає глибини та преміальності будь-якому простору.",
    colors: ["#4A1942", "#1A3A5C", "#1C3A2A", "#3A2010"],
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Оксамитова текстура", "Затемнення (Dimout) 85%", "Захист від зминання", "Еко-сертифікований матеріал"],
  },
  {
    id: 8,
    name: "Aluminium Venetian",
    category: "Віконниці",
    material: "Алюміній",
    price: 3100,
    rating: 4.7,
    reviews: 55,
    popular: false,
    new: false,
    description: "Високоточні алюмінієві ламелі з можливістю мікроперфорації для вентиляції без втрати приватності.",
    colors: ["#C0C0C0", "#A0A0A0", "#707070", "#303030"],
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Мікроперфорація", "Захист від корозії", "Регулювання нахилу та підйому", "Тонкий профіль 25 мм"],
  },
  {
    id: 9,
    name: "Polar Blackout Duo",
    category: "Блекаут",
    material: "ПВХ",
    price: 2600,
    rating: 4.8,
    reviews: 91,
    popular: true,
    new: false,
    description: "Подвійна система касет, що поєднує прозору вуаль та щільну панель блекаут. Дві штори в одному коробі — максимум гнучкості.",
    colors: ["#F5F5F5", "#E8E8E8", "#D0D0D0", "#1A1A1A"],
    image: "https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Подвійна касета", "Прозора + блекаут", "Безпечний шнур для дітей", "Колір короба в тон тканини"],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? "fill-[#FFCC00] text-[#FFCC00]" : "fill-white/20 text-white/20"}`}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, onSelect }: { product: typeof products[0]; onSelect: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      onClick={onSelect}
      className="group relative bg-[#1C1C1C] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FFCC00]/40 transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C] via-[#1C1C1C]/20 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.popular && (
            <span className="bg-[#FFCC00] text-[#121212] text-xs font-semibold px-2.5 py-1 rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>
              Popular
            </span>
          )}
          {product.new && (
            <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20" style={{ fontFamily: "Inter, sans-serif" }}>
              New
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-lg leading-tight" style={{ fontFamily: "Playfair Display, serif" }}>
            {product.name}
          </h3>
        </div>
        <p className="text-white/50 text-xs mb-3" style={{ fontFamily: "Inter, sans-serif" }}>
          {product.category} · {product.material}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={product.rating} />
          <span className="text-white/40 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Color swatches */}
        <div className="flex items-center gap-1.5 mb-4">
          {product.colors.map((color) => (
            <div
              key={color}
              className="w-5 h-5 rounded-full border border-white/10"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div style={{ fontFamily: "Inter, sans-serif" }}>
            {product.price > 0 ? (
              <span className="text-white font-semibold">
                від <span className="text-[#FFCC00]">{product.price.toLocaleString("uk-UA")} ₴</span>
              </span>
            ) : (
              <span className="text-[#FFCC00] font-semibold">Індивідуальна ціна</span>
            )}
          </div>
          <button className="flex items-center gap-1 text-[#FFCC00] text-sm hover:gap-2 transition-all" style={{ fontFamily: "Inter, sans-serif" }}>
            Детальніше <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl border border-[#FFCC00]/20" />
    </motion.div>
  );
}

function ProductDrawer({ product, onClose }: { product: typeof products[0]; onClose: () => void }) {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-lg bg-[#181818] h-full overflow-y-auto border-l border-white/10 flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#181818]/95 backdrop-blur-sm border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <span className="text-white/50 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            {product.category}
          </span>
          <button onClick={onClose} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
            <X className="w-4 h-4 text-white/60" />
          </button>
        </div>

        {/* Image */}
        <div className="relative h-72 flex-shrink-0 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/10 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            {product.popular && (
              <span className="bg-[#FFCC00] text-[#121212] text-xs font-semibold px-2.5 py-1 rounded-full" style={{ fontFamily: "Inter, sans-serif" }}>Popular</span>
            )}
            {product.new && (
              <span className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20" style={{ fontFamily: "Inter, sans-serif" }}>New</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-6 space-y-6">
          <div>
            <h2 className="text-3xl mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
              {product.name}
            </h2>
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} />
              <span className="text-white/50 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                {product.rating} · {product.reviews} відгуків
              </span>
            </div>
          </div>

          <p className="text-white/70 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            {product.description}
          </p>

          {/* Colors */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Кольори</p>
            <div className="flex gap-3">
              {product.colors.map((color, i) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(i)}
                  className="relative w-8 h-8 rounded-full border-2 transition-all"
                  style={{
                    backgroundColor: color,
                    borderColor: selectedColor === i ? "#FFCC00" : "transparent",
                    boxShadow: selectedColor === i ? "0 0 0 1px #FFCC00" : "0 0 0 1px rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Характеристики</p>
            <ul className="space-y-2">
              {product.features.map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-white/80 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
                  <div className="w-5 h-5 rounded-full bg-[#FFCC00]/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-[#FFCC00]" />
                  </div>
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <p className="text-white/50 text-xs mb-1" style={{ fontFamily: "Inter, sans-serif" }}>Ціна</p>
            {product.price > 0 ? (
              <p className="text-2xl font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                від <span className="text-[#FFCC00]">{product.price.toLocaleString("uk-UA")} ₴</span>
              </p>
            ) : (
              <p className="text-xl font-semibold text-[#FFCC00]" style={{ fontFamily: "Inter, sans-serif" }}>
                Індивідуальна ціна
              </p>
            )}
            <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Включає доставку та монтаж</p>
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-0 bg-[#181818]/95 backdrop-blur-sm border-t border-white/5 p-6 flex gap-3">
          <button
            className="flex-1 py-3 bg-[#FFCC00] text-[#121212] font-semibold rounded-xl hover:bg-[#F2B705] transition-all shadow-[0_0_20px_rgba(255,204,0,0.25)] hover:shadow-[0_0_32px_rgba(255,204,0,0.45)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Замовити вимірювання
          </button>
          <a
            href="tel:+380501234567"
            className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-colors border border-white/5"
          >
            <Phone className="w-5 h-5 text-white/70" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMaterial, setActiveMaterial] = useState("All Materials");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (activeMaterial !== "All Materials") {
      list = list.filter((p) => p.material === activeMaterial);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sortBy === "popular") list.sort((a, b) => b.reviews - a.reviews);
    else if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [activeCategory, activeMaterial, sortBy, searchQuery]);

  return (
    <div className="min-h-screen bg-[#121212] text-white">

      {/* Hero band */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#1C1C1C] to-[#121212] py-14">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% -10%, rgba(255,204,0,0.12) 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#FFCC00] text-sm uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Колекція 2026
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-4xl lg:text-6xl mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Весь <span className="text-[#FFCC00]">асортимент</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-white/60 max-w-xl mx-auto"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {products.length} моделей рулонних штор та жалюзі — від класики до преміум автоматики
          </motion.p>
        </div>
      </div>

      {/* Filters bar */}
      <div className="sticky top-[65px] z-30 bg-[#121212]/95 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Пошук..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FFCC00]/50 transition-colors"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-white/30 hover:text-white/60" />
                </button>
              )}
            </div>

            {/* Category tabs */}
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-[#FFCC00] text-[#121212] font-semibold shadow-[0_0_12px_rgba(255,204,0,0.3)]"
                      : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3 ml-auto">
              {/* Material filter */}
              <div className="relative">
                <select
                  value={activeMaterial}
                  onChange={(e) => setActiveMaterial(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-sm text-white/70 focus:outline-none focus:border-[#FFCC00]/50 transition-colors cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {MATERIALS.map((m) => (
                    <option key={m} value={m} className="bg-[#1C1C1C]">{m}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white/5 border border-white/10 rounded-xl pl-4 pr-8 py-2.5 text-sm text-white/70 focus:outline-none focus:border-[#FFCC00]/50 transition-colors cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <option value="popular" className="bg-[#1C1C1C]">За популярністю</option>
                  <option value="rating" className="bg-[#1C1C1C]">За рейтингом</option>
                  <option value="price-asc" className="bg-[#1C1C1C]">Ціна: дешевше</option>
                  <option value="price-desc" className="bg-[#1C1C1C]">Ціна: дорожче</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <main className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <p className="text-white/40 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
            {filtered.length === products.length
              ? `${products.length} товарів`
              : `${filtered.length} з ${products.length} товарів`}
          </p>
        </div>

        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-white/40 text-lg" style={{ fontFamily: "Playfair Display, serif" }}>Нічого не знайдено</p>
            <p className="text-white/30 text-sm mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Спробуйте змінити фільтри або пошуковий запит</p>
            <button
              onClick={() => { setActiveCategory("All"); setActiveMaterial("All Materials"); setSearchQuery(""); }}
              className="mt-6 px-6 py-2.5 bg-[#FFCC00]/10 text-[#FFCC00] rounded-xl hover:bg-[#FFCC00]/20 transition-colors text-sm"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Скинути фільтри
            </button>
          </motion.div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => setSelectedProduct(product)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* CTA band */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl bg-[#1C1C1C] border border-white/5 p-10 md:p-14 text-center relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(255,204,0,0.1) 0%, transparent 60%)",
            }}
          />
          <h2 className="text-3xl lg:text-4xl mb-3 relative z-10" style={{ fontFamily: "Playfair Display, serif" }}>
            Не знайшли підходящий варіант?
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto relative z-10" style={{ fontFamily: "Inter, sans-serif" }}>
            Наші дизайнери розроблять індивідуальне рішення для будь-якого вікна та інтер'єру
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <button
              className="px-8 py-3.5 bg-[#FFCC00] text-[#121212] font-semibold rounded-xl hover:bg-[#F2B705] transition-all shadow-[0_0_24px_rgba(255,204,0,0.3)] hover:shadow-[0_0_40px_rgba(255,204,0,0.5)]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Замовити консультацію
            </button>
            <Link
              to="/"
              className="px-8 py-3.5 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-colors border border-white/10 text-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              На головну
            </Link>
          </div>
        </motion.div>
      </main>


      {/* Product detail drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
