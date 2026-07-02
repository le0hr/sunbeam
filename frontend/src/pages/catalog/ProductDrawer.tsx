import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import {X, Check, Phone} from "lucide-react";
import { StarRating } from "./StarRating";
import {Product} from "../../types/product";
import {SystemClasses} from "../../types/systemClasses";
import {TransformedVariableProduct} from "../../types/product";
import { useProductCalculator } from "../../hooks/useRoletyCalculator";
import { RoletyForm } from "./forms/RoletyForm";



export function ProductDrawer({ product, SYSTEM_CLASSES, PRODUCT_TYPES, onClose }: { product: Product; onClose: () => void; SYSTEM_CLASSES:SystemClasses[]; PRODUCT_TYPES: string[] }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedClass, setSelectedClass] = useState("standard");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  
  const CALCULATOR_COMPONENTS: Record<number, React.ComponentType<any>> = {
    15: RoletyForm
  
  };


  const activeClass = SYSTEM_CLASSES.find((c) => c.id === selectedClass)!;

  const calcPrice = (): number | null => {
    const w = parseFloat(width);
    const h = parseFloat(height);
    if (!w || !h || w <= 0 || h <= 0 || product.price === 0) return null;
    const areaSqM = (w / 1000) * (h / 1000);
    return Math.round(product.price * activeClass.multiplier * areaSqM * 10) / 10;
  };
  const calculatedPrice = calcPrice();
  const hasValidDimensions = parseFloat(width) > 0 && parseFloat(height) > 0;


  // export const ProductCalculator: React.FC<TransformedVariableProduct> = ({ product }) => {
  // // const {
  // //   width, setWidth,
  // //   height, setHeight,
  // //   selectedType, setSelectedType,
  // //   selectedClass, setSelectedClass,
  // //   availableClasses,
  // //   currentVariation,
  // //   finalPrice
  // // } = useProductCalculator(product.variations);


  // Додати визначення по категоріям
  const TargetCalculator =CALCULATOR_COMPONENTS[15]; 


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


          {/* ── Type Selector ─────────────────────────────────── */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Тип</p>
            <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
              {PRODUCT_TYPES.map((type, i) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(i)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedType === i
                      ? "bg-[#FFCC00] text-[#121212] shadow-[0_0_12px_rgba(255,204,0,0.25)]"
                      : "text-white/50 hover:text-white/80"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                  >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* ── System Class ──────────────────────────────────── */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Клас системи</p>
            <div className="space-y-2">
              {SYSTEM_CLASSES.map((cls) => {
                const isActive = selectedClass === cls.id;
                return (
                  <button
                    key={cls.id}
                    onClick={() => setSelectedClass(cls.id)}
                    className={`w-full text-left rounded-xl border transition-all duration-200 overflow-hidden ${
                      isActive
                        ? "border-[#FFCC00]/50 bg-[#FFCC00]/5"
                        : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
                    }`}
                  >
                    {/* Row */}
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-all ${
                          isActive ? "border-[#FFCC00] bg-[#FFCC00]" : "border-white/20 bg-transparent"
                        }`}
                      >
                        {isActive && <div className="w-full h-full rounded-full scale-50 bg-[#121212]" />}
                      </div>
                      <span
                        className={`font-medium text-sm transition-colors ${isActive ? "text-white" : "text-white/60"}`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {cls.label}
                      </span>
                      <span
                        className={`ml-auto text-xs transition-colors ${isActive ? "text-[#FFCC00]" : "text-white/30"}`}
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        ×{cls.multiplier.toFixed(2)}
                      </span>
                    </div>

                    {/* Expanded description */}
                    {isActive && (
                      <div className="px-4 pb-4">
                        <div className="h-px bg-[#FFCC00]/15 mb-3" />
                        <p className="text-white/55 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                          {cls.description}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

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
          {/* ── Custom Dimensions ─────────────────────────────── */}
          <div>
            <p className="text-white/50 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Розміри</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Ширина", value: width, onChange: setWidth },
                { label: "Висота", value: height, onChange: setHeight },
              ].map(({ label, value, onChange }) => (
                <div key={label}>
                  <label
                    className="block text-white/40 text-xs mb-1.5"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      placeholder="0"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FFCC00]/50 focus:bg-[#FFCC00]/3 transition-all pr-12"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                    <span
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      мм
                    </span>
                  </div>
                </div>
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

          {/* ── Dynamic Price ─────────────────────────────────── */}
          <div
            className={`rounded-2xl p-5 border transition-all duration-300 ${
              calculatedPrice
                ? "bg-[#FFCC00]/5 border-[#FFCC00]/20"
                : "bg-white/5 border-white/5"
            }`}
          >
            <p className="text-white/50 text-xs mb-2" style={{ fontFamily: "Inter, sans-serif" }}>Ціна</p>

            {calculatedPrice ? (
              <>
                <p className="text-3xl font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  <span className="text-[#FFCC00]">{calculatedPrice.toLocaleString("uk-UA")} ₴</span>
                </p>
                <p className="text-white/35 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  * розраховано для {width} × {height} мм · клас {activeClass.label} · включає доставку та монтаж
                </p>
              </>
            ) : product.price > 0 ? (
              <>
                <p className="text-2xl font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
                  від <span className="text-[#FFCC00]">{product.price.toLocaleString("uk-UA")} ₴</span>
                </p>
                <p className="text-white/35 text-xs mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  {hasValidDimensions
                    ? "Оберіть клас системи, щоб побачити точну ціну"
                    : "* вкажіть ширину та висоту для розрахунку точної вартості"}
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold text-[#FFCC00]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Індивідуальна ціна
                </p>
                <p className="text-white/35 text-xs mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                  Ціна розраховується після консультації з дизайнером
                </p>
              </>
            )}
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
