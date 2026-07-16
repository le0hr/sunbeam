import { useRoletyCalculator } from "../../../hooks/useRoletyCalculator";
import { TransformedVariableProduct } from "../../../types/product";
import { SystemClasses } from "../../../types/systemClasses";
import DimensionsInput from "./CustomDimentions";

// const colorMap: Record<string, string> = {
//   "Білий": "#FFFFFF",
//   "Чорний": "#000000",
//   "Сірий": "#808080",
//   "Коричневий": "#6B4423",
//   "Антрацит": "#3A3A3A",
//   "Золотий дуб": "#B8860B",
//   "Горіх": "#7B4A2A",
// };

export function RoletyForm({ product, classesDescription, onClose }: { product: TransformedVariableProduct; classesDescription: Record<string, string>; onClose: () => void; SYSTEM_CLASSES:SystemClasses[]; PRODUCT_TYPES: string[] }) {
  
  const {
    width, setWidth,
    height, setHeight,
    selectedType, setSelectedType,
    selectedColor, setSelectedColor,
    selectedClass, setSelectedClass,
    availableColors,
    availableClasses,
    availableTypes,
    currentVariation,
    finalPrice
  } = useRoletyCalculator(product.variations, classesDescription );
  
  return(
    
    <div className="flex flex-col gap-8">
      {/* ── Type Selector ─────────────────────────────────── */}
      <div>
        <p className="text-white/50 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Тип</p>
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/5">
          {availableTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedType === type.id
                  ? "bg-[#FFCC00] text-[#121212] shadow-[0_0_12px_rgba(255,204,0,0.25)]"
                  : "text-white/50 hover:text-white/80"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
              >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── System Class ──────────────────────────────────── */}
      <div>
        <p className="text-white/50 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Клас системи</p>
        <div className="space-y-2">
          {availableClasses.map((cls) => {
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
                    ×1
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
      {/* <div>
        <p className="text-white/50 text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "Inter, sans-serif" }}>Кольори</p>
        <div className="flex gap-3">
          {availableColors.map((color) => (
            <button
              key={color.id}
              onClick={() => setSelectedColor(color.id)}
              className="relative w-8 h-8 rounded-full border-2 transition-all"
              style={{
                backgroundColor: colorMap[color.id],
                borderColor: selectedColor === color.id ? "#FFCC00" : "transparent",
                boxShadow: selectedColor === color.id ? "0 0 0 1px #FFCC00" : "0 0 0 1px rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div> */}
      <DimensionsInput width={width} height={height} setWidth={setWidth} setHeight={setHeight} finalPrice = {finalPrice} basePrice={0} />
    </div>);
}