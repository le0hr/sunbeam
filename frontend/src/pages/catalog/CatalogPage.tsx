import { useState, useMemo } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  Sun, ArrowLeft, Search, SlidersHorizontal, X, Star,
  ChevronDown, Phone, ArrowRight, Check
} from "lucide-react";
import { ProductCard } from "./ProductCard";
import { ProductDrawer } from "./ProductDrawer";
import { productService } from "../../api/productServise";

import { useEffect } from "react";
// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Roller Blinds", "Day-Night", "Blackout", "Shutters", "Custom"];

const MATERIALS = ["All Materials", "Fabric", "PVC", "Aluminium", "Wood", "Composite"];

const products = [
  {
    id: 1,
    name: "Aurora Day-Night",
    category: "Day-Night",
    material: "Fabric",
    price: 2800,
    rating: 4.9,
    reviews: 128,
    popular: true,
    new: false,
    description: "Effortlessly transition between sheer and opaque panels. Perfect for living rooms that demand both ambience and privacy.",
    colors: ["#F5F0E8", "#D4C5A9", "#8B7355", "#2C2C2C"],
    image: "https://images.unsplash.com/photo-1506455050018-40e785776da4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXklMjBuaWdodCUyMHJvbGxlciUyMGJsaW5kc3xlbnwxfHx8fDE3ODE5ODEyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Dual-layer system", "UV protection 97%", "Easy installation", "Custom sizing"],
  },
  {
    id: 2,
    name: "Nocturne Blackout",
    category: "Blackout",
    material: "PVC",
    price: 2200,
    rating: 4.8,
    reviews: 204,
    popular: true,
    new: false,
    description: "Total darkness on demand. Our thickest blackout lining blocks 100% of light — ideal for bedrooms and home cinemas.",
    colors: ["#1A1A1A", "#2D2D2D", "#4A3728", "#1C2B3A"],
    image: "https://images.unsplash.com/photo-1609534117141-ff9f20450902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFja291dCUyMHdpbmRvdyUyMGJsaW5kc3xlbnwxfHx8fDE3ODE5ODEyMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["100% light blocking", "Thermal insulation", "Noise reduction", "Moisture resistant"],
  },
  {
    id: 3,
    name: "Linen Classic Roller",
    category: "Roller Blinds",
    material: "Fabric",
    price: 1600,
    rating: 4.7,
    reviews: 89,
    popular: false,
    new: false,
    description: "Timeless woven linen texture that complements any interior. Soft diffused light for a warm, natural atmosphere.",
    colors: ["#E8DFD0", "#C9B99A", "#A89070", "#7A6550"],
    image: "https://images.unsplash.com/photo-1616594092403-fb65629b0a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3aW5kb3clMjBibGluZHMlMjBiZWRyb29tfGVufDF8fHx8MTc4MTk4MTIyNnww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Natural linen blend", "Light filtering", "Anti-static coating", "Washable"],
  },
  {
    id: 4,
    name: "Heritage Shutter",
    category: "Shutters",
    material: "Wood",
    price: 6500,
    rating: 5.0,
    reviews: 47,
    popular: false,
    new: false,
    description: "Solid basswood shutters with a hand-lacquered finish. A statement piece that adds architectural value to any room.",
    colors: ["#F5F0E8", "#D4B896", "#8B6914", "#2C1A0E"],
    image: "https://images.unsplash.com/photo-1518027322746-3813f2e2bb5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwd2luZG93JTIwc2h1dHRlcnN8ZW58MXx8fHwxNzgxOTgxMjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Solid basswood", "Hand-lacquered", "Adjustable louvres", "15-year warranty"],
  },
  {
    id: 5,
    name: "Prism Motorised",
    category: "Roller Blinds",
    material: "Composite",
    price: 4200,
    rating: 4.9,
    reviews: 63,
    popular: false,
    new: true,
    description: "Smart motorised blinds controlled via app or voice. Schedule sunrise and sunset automations for effortless living.",
    colors: ["#FFFFFF", "#E0E0E0", "#B0B0B0", "#404040"],
    image: "https://images.unsplash.com/photo-1632120669818-ed5498030e32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3aW5kb3clMjB0cmVhdG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc4MTk4MTIyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Motorised drive", "App & voice control", "Automation schedules", "Battery or wired"],
  },
  {
    id: 6,
    name: "Bespoke Studio",
    category: "Custom",
    material: "Fabric",
    price: 0,
    rating: 5.0,
    reviews: 31,
    popular: false,
    new: true,
    description: "Fully custom-designed solution for unusual windows, skylights, and architectural features. We measure, design, and install.",
    colors: ["#FFCC00", "#F2B705", "#D4A017", "#8B6914"],
    image: "https://images.unsplash.com/photo-1732973708124-444694c08759?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByb2xsZXIlMjBibGluZHMlMjBkYXJrJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzgxOTgxMjI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Any shape window", "Material samples", "3D visualisation", "Full installation"],
  },
  {
    id: 7,
    name: "Velvet Dimout",
    category: "Roller Blinds",
    material: "Fabric",
    price: 1950,
    rating: 4.6,
    reviews: 72,
    popular: false,
    new: false,
    description: "A sumptuous velvet-effect fabric that filters light to a warm amber glow. Adds depth and luxury to any space.",
    colors: ["#4A1942", "#1A3A5C", "#1C3A2A", "#3A2010"],
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Velvet texture", "Dimout 85%", "Anti-crease", "Eco-certified"],
  },
  {
    id: 8,
    name: "Aluminium Venetian",
    category: "Shutters",
    material: "Aluminium",
    price: 3100,
    rating: 4.7,
    reviews: 55,
    popular: false,
    new: false,
    description: "Precision-cut aluminium louvres with a micro-perforation option for ventilation without sacrificing privacy.",
    colors: ["#C0C0C0", "#A0A0A0", "#707070", "#303030"],
    image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Micro-perforation", "Corrosion-proof", "Tilt & raise", "Slim 25mm profile"],
  },
  {
    id: 9,
    name: "Polar Blackout Duo",
    category: "Blackout",
    material: "PVC",
    price: 2600,
    rating: 4.8,
    reviews: 91,
    popular: true,
    new: false,
    description: "Twin-roller system combining a sheer voile with a full blackout panel. Two blinds, one cassette — maximum flexibility.",
    colors: ["#F5F5F5", "#E8E8E8", "#D0D0D0", "#1A1A1A"],
    image: "https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    features: ["Twin cassette", "Sheer + blackout", "Child-safe cord", "Colour-matched"],
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────




const PRODUCT_TYPES = ["Рулонна", "День-Ніч", "Жорстка"];

const SYSTEM_CLASSES = [
  {
    id: "econom",
    label: "Econom",
    multiplier: 0.82,
    description:
      "Practical entry-level system with a reliable open-roll mechanism. Suitable for low-traffic rooms and rental properties where durability and easy installation matter more than aesthetics.",
  },
  {
    id: "standard",
    label: "Standard",
    multiplier: 1.0,
    description:
      "Our most popular class — a cassette-enclosed cassette system with a soft-close brake and coordinated colour fascia. Balances premium look with accessible pricing for everyday living spaces.",
  },
  {
    id: "premium",
    label: "Premium",
    multiplier: 1.38,
    description:
      "Top-tier motorised or clutch-drive cassette with a slim 55 mm profile, powder-coated aluminium rails, and a 10-year mechanical warranty. The definitive choice for showroom-quality interiors.",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

export function CatalogPage() {


  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMaterial, setActiveMaterial] = useState("All Materials");
  const [sortBy, setSortBy] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);


  const [product, setProduct] = useState<any>([]);

  useEffect(() => {
    productService.getProductList(1)
      .then(data => setProduct(data));
  }, []);

  // const{
  //   id,
  //   name,
  //   slug,
  //   description,
  //   classesDescriptionDict,
  //   images,
  //   variations,
  //   allColors,
  //   allTypes,
  //   allClasses
  //   } = product


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
        {selectedProduct && product && (
          <ProductDrawer 
            product={product} 
            onClose={() => setSelectedProduct(null)} 
            classesDescription={product.classesDescriptionDict} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
