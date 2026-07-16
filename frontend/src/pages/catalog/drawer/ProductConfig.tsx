import type { ComponentType } from "react";
import { TransformedVariableProduct } from "../../../types/product";
import { RoletyForm } from "./forms/RoletyForm";
import { PliseForm } from "./forms/PliseForm";
import { ZhalyuziForm } from "./forms/ZhalyuziForm";
import { MoskitnaForm } from "./forms/MoskitnaForm";

const CALCULATOR_COMPONENTS: Record<string, ComponentType<any>> = {
  'Ролети': RoletyForm,
  'Плісе': PliseForm,
  'Жалюзі': ZhalyuziForm,
  'Москітна сітка': MoskitnaForm
};

export function ProductConfig({ product, classesDescription, calculatedPrice, setCalculatedPrice, onShowOrder }: { product: TransformedVariableProduct; calculatedPrice: number; setCalculatedPrice: (v: number) => void; onShowOrder: () => void; classesDescription: Record<string, string> }) {
  const TargetCalculator = CALCULATOR_COMPONENTS[product.categories?.[0]?.name || ""];

  return (
    <div>
      <div className="flex-1 px-6 py-6 space-y-6">
        <div>
          <h2 className="text-3xl mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
            {product.name}
          </h2>
        </div>

        <div className="text-white/70 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
          <div
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        {TargetCalculator ? (
          <TargetCalculator
            product={product}
            classesDescription={classesDescription}
            calculatedPrice={calculatedPrice}
            setCalculatedPrice={setCalculatedPrice}
          />
        ) : (
          <div className="text-white/60 text-sm">
            Немає калькулятора для цього продукту.
          </div>
        )}
      </div>

      <div className="sticky bottom-0 bg-[#181818]/95 backdrop-blur-sm border-t border-white/5 p-6 flex gap-3">
        <button
          type="button"
          onClick={onShowOrder}
          className="flex flex-1 items-center justify-center py-3 bg-[#FFCC00] text-[#121212] font-semibold rounded-xl hover:bg-[#F2B705] transition-all shadow-[0_0_20px_rgba(255,204,0,0.25)] hover:shadow-[0_0_32px_rgba(255,204,0,0.45)]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Замовити вимірювання
        </button>
      </div>
    </div>
  );
}
