import { motion, AnimatePresence } from "motion/react";
import {ArrowRight} from "lucide-react";

import {TransformedVariableProduct} from "../../types/product"
import React from "react"

interface ProductCardProps {
  product: TransformedVariableProduct;
  onSelect: () => void;
}

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({ product, onSelect }, ref) => {
    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        onClick={onSelect}
        className="group relative flex h-full flex-col bg-[#1C1C1C] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FFCC00]/40 transition-all duration-300 cursor-pointer"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between mb-2">
            <h3
              className="text-xl leading-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              {product.name}
            </h3>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <div style={{ fontFamily: "Inter, sans-serif" }}>
              {product.price.length > 0 && Number(product.price) > 0 ? (
                <span className="text-lg text-white font-semibold">
                  від{" "}
                  <span className="text-[#FFCC00]">
                    {product.price.toLocaleString("uk-UA")} ₴
                  </span>
                </span>
              ) : (
                <span className="text-lg text-[#FFCC00] font-semibold">
                  Індивідуальна ціна
                </span>
              )}
            </div>

            <button
              className="flex items-center gap-1 text-[#FFCC00] text-base hover:gap-2 transition-all"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Детальніше <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl border border-[#FFCC00]/20" />
      </motion.div>
    );
  }
);

ProductCard.displayName = "ProductCard";