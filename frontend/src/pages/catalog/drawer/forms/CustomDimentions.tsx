import type { Dispatch, SetStateAction } from "react";

interface DimensionsInputProps {
  width: number;
  height: number;
  setWidth: Dispatch<SetStateAction<number>>;
  setHeight: Dispatch<SetStateAction<number>>;
  finalPrice: number;
  basePrice: number; // Передаємо базову ціну товару від WooCommerce
}

export default function DimensionsInput({
  width,
  height,
  setWidth,
  setHeight,
  finalPrice,
  basePrice,
}: DimensionsInputProps) {
  // Допоміжна змінна: перевіряємо, чи користувач ввів адекватні розміри
  const hasValidDimensions = width > 0 && height > 0;

  return (
    <div className="space-y-5">
      {/* ── Блок введення розмірів ─────────────────────────────── */}
      <div>
        <p 
          className="text-white/50 text-xs uppercase tracking-widest mb-3" 
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Розміри
        </p>
        
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
                  value={value || ""}
                  onChange={(e) => onChange(Number(e.target.value))}
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

      {/* ── Блок динамічної ціни ───────────────────────────────── */}
      <div
        className={`rounded-2xl p-5 border transition-all duration-300 ${
          finalPrice
            ? "bg-[#FFCC00]/5 border-[#FFCC00]/20"
            : "bg-white/5 border-white/5"
        }`}
      >
        <p className="text-white/50 text-xs mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
          Ціна
        </p>

        {finalPrice ? (
          <>
            <p className="text-3xl font-semibold mb-1" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="text-[#FFCC00]">{finalPrice.toLocaleString("uk-UA")} ₴</span>
            </p>
            <p className="text-white/35 text-xs leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              * розраховано для {width} × {height} мм · включає доставку та монтаж
            </p>
          </>
        ) : basePrice > 0 ? (
          <>
            <p className="text-2xl font-semibold" style={{ fontFamily: "Inter, sans-serif" }}>
              від <span className="text-[#FFCC00]">{basePrice.toLocaleString("uk-UA")} ₴</span>
            </p>
            <p className="text-white/35 text-xs mt-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
              {hasValidDimensions
                ? "Оберіть тип, клас та колір системи, щоб побачити точну ціну"
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
  );
}