import { Phone, User, Ruler } from "lucide-react";
import { TransformedVariableProduct } from "../../../types/product";

const MEASURE_OPTIONS = [
  { id: "measure-service", label: "Ми зробимо заміри", sub: "Наш спеціаліст приїде та виконає точні виміри" },
  { id: "use-mine", label: "Я сам заміряю", sub: "Ви надасте готові розміри для розрахунку" },
  { id: "both", label: "Спочатку консультація", sub: "Ми домовимось про заміри і монтаж" }
];

export interface OrderStepProps {
  product: TransformedVariableProduct;
  selectedColor?: string;
  selectedType?: string;
  selectedClassLabel?: string;
  width: string;
  height: string;
  hasDimensions: boolean;
  calculatedPrice: number | null;
  measureOption: string;
  setMeasureOption: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  nameError: string;
  setNameError: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  phoneError: string;
  setPhoneError: (v: string) => void;
  onSubmit: () => void;
  currentVariation: any;
}

export function OrderStep({
  product,
  selectedType,
  selectedClassLabel,
  width,
  height,
  hasDimensions,
  calculatedPrice,
  measureOption,
  setMeasureOption,
  name,
  setName,
  nameError,
  setNameError,
  phone,
  setPhone,
  phoneError,
  setPhoneError,
  onSubmit,
  currentVariation
}: OrderStepProps) {
  return (
    <div className="px-6 py-6 space-y-6">

      {/* ── Compact product summary ─────────────────────────── */}
      <div className="flex items-start gap-4 pb-6 border-b border-white/8">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
        />

        <div className="flex-1 min-w-0">
          <h3 className="text-lg leading-snug mb-2" style={{ fontFamily: "Playfair Display, serif" }}>
            {product.name}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {selectedType && (
              <span
                className="px-2 py-0.5 bg-white/8 rounded-md text-white/55 text-xs"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {selectedType}
              </span>
            )}
            {selectedClassLabel && (
              <span
                className="px-2 py-0.5 bg-[#FFCC00]/10 text-[#FFCC00] rounded-md text-xs"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {selectedClassLabel}
              </span>
            )}
            {hasDimensions && (
              <span
                className="px-2 py-0.5 bg-white/8 rounded-md text-white/55 text-xs flex items-center gap-1"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                <Ruler className="w-3 h-3" />
                {width} × {height} мм
              </span>
            )}
          </div>
        </div>

        {/* price */}
        <div className="flex-shrink-0 text-right">
          {calculatedPrice ? (
            <p
              className="text-lg font-semibold text-[#FFCC00]"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {calculatedPrice.toLocaleString("uk-UA")} ₴
            </p>
          ) : Number(product.price) > 0 ? (
            <p className="text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
              від {Number(product.price).toLocaleString("uk-UA")} ₴
            </p>
          ) : (
            <p className="text-sm text-[#FFCC00]" style={{ fontFamily: "Inter, sans-serif" }}>
              Інд. ціна
            </p>
          )}
        </div>
      </div>

      {/* ── Measure option ──────────────────────────────────── */}
      <div>
        <p
          className="text-white/50 text-xs uppercase tracking-widest mb-3"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Що з вимірюванням?
        </p>
        <div className="space-y-2">
          {MEASURE_OPTIONS.map(({ id, label, sub }) => {
            if (!hasDimensions && (id === "use-mine" || id === "both")) return null;
            const isActive = measureOption === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setMeasureOption(id)}
                className={`w-full text-left flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
                  isActive
                    ? "border-[#FFCC00]/50 bg-[#FFCC00]/5"
                    : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
                }`}
              >
                <div
                  className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all ${
                    isActive ? "border-[#FFCC00]" : "border-white/25"
                  }`}
                >
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FFCC00]" />}
                </div>
                <div>
                  <p
                    className={`text-sm font-medium leading-snug ${isActive ? "text-white" : "text-white/60"}`}
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-white/35 text-xs mt-0.5 leading-relaxed"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {sub}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Name ────────────────────────────────────────────── */}
      <div>
        <label
          className="block text-white/40 text-xs uppercase tracking-wider mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Ваше ім'я
        </label>
        <div className="relative">
          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setNameError(""); }}
            placeholder="Іван Іваненко"
            className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${nameError ? "border-red-500/60 focus:border-red-500/80" : "border-white/10 focus:border-[#FFCC00]/50"}`}
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
        {nameError && (
          <p className="mt-1.5 text-red-400/80 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {nameError}
          </p>
        )}
      </div>

      {/* ── Phone ───────────────────────────────────────────── */}
      <div>
        <label
          className="block text-white/40 text-xs uppercase tracking-wider mb-2"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Номер телефону *
        </label>
        <div className="relative">
          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => { setPhone(e.target.value); setPhoneError(""); }}
            placeholder="+380 (XX) XXX-XX-XX"
            className={`w-full bg-white/5 border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
              phoneError
                ? "border-red-500/60 focus:border-red-500/80"
                : "border-white/10 focus:border-[#FFCC00]/50"
            }`}
            style={{ fontFamily: "Inter, sans-serif" }}
          />
        </div>
        {phoneError && (
          <p className="mt-1.5 text-red-400/80 text-xs" style={{ fontFamily: "Inter, sans-serif" }}>
            {phoneError}
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="w-full rounded-xl bg-[#FFCC00] py-3 text-sm font-semibold text-[#121212] transition-colors hover:bg-[#F2B705]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Підтвердити замовлення
      </button>

      <p
        className="text-center text-white/25 text-xs"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Ваші дані в безпеці — ми не передаємо їх третім особам
      </p>

      <div className="h-2" />
    </div>
  );
}
