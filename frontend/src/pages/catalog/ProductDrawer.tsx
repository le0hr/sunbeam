import { motion, AnimatePresence } from "motion/react";
import { useState, useMemo } from "react";
import {X, Check, Phone} from "lucide-react";
import {SystemClasses} from "../../types/systemClasses";
import {TransformedVariableProduct} from "../../types/product";
import { RoletyForm } from "./forms/RoletyForm";
import { PliseForm } from "./forms/PliseForm";
import { ZhalyuziForm } from "./forms/ZhalyuziForm";
import { MoskitnaForm } from "./forms/MoskitnaForm";
import { Link } from "react-router";



const CALCULATOR_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'Ролети': RoletyForm,
  'Плісе': PliseForm,
  'Жалюзі': ZhalyuziForm,
  'Москітна сітка': MoskitnaForm

};

export function ProductDrawer({ product, classesDescription, onClose }: { product: TransformedVariableProduct; onClose: () => void; classesDescription: Record<string, string> }) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedType, setSelectedType] = useState(0);
  const [selectedClass, setSelectedClass] = useState("standard");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  
  // Додати визначення по категоріям
  const TargetCalculator =CALCULATOR_COMPONENTS[product.categories[0].name]; 


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
        {/* Close button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 z-50 w-10 h-10 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Image */}
        <div className="relative h-72 flex-shrink-0 overflow-hidden">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/10 to-transparent" />
        </div>

        {/* Body */}
        <div className="flex-1 px-6 py-6 space-y-6">
          <div>
            <h2 className="text-3xl mb-1" style={{ fontFamily: "Playfair Display, serif" }}>
              {product.name}
            </h2>
          </div>

          <p className="text-white/70 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
            <div
            // Обережно з цим, потрібно правильно форматувати опис товару в адмінці
              dangerouslySetInnerHTML={{ __html: product.description }}/>
          </p>


          <TargetCalculator product={product} classesDescription = {classesDescription}></TargetCalculator>
          
        </div>

        {/* CTA */}
        <div className="sticky bottom-0 bg-[#181818]/95 backdrop-blur-sm border-t border-white/5 p-6 flex gap-3">
          <Link
            to="/#contact"
            className="flex flex-1 items-center justify-center py-3
                      bg-[#FFCC00] text-[#121212] font-semibold
                      rounded-xl hover:bg-[#F2B705] transition-all
                      shadow-[0_0_20px_rgba(255,204,0,0.25)]
                      hover:shadow-[0_0_32px_rgba(255,204,0,0.45)]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Замовити вимірювання
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
