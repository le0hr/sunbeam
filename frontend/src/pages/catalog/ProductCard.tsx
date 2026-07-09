import { motion, AnimatePresence } from "motion/react";
import { StarRating } from "./StarRating";
import {ArrowRight} from "lucide-react";

import {Product} from "../../types/product"
import React from "react"

interface ProductCardProps {
  product: Product;
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
);

ProductCard.displayName = "ProductCard";