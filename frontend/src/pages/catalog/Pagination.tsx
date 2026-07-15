import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";


function getPageRange(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [1];
  if (current > 3) pages.push("…");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("…");
  pages.push(total);
  return pages;
}

export interface PaginationProps {
  current: number;
  total: number;
  perPage: number;
  totalProducts: number;
  onChange: (page: number) => void;
}

export function Pagination({ current, total, perPage, totalProducts, onChange }: PaginationProps) {
  if (total <= 1) return null;

  const from = (current - 1) * perPage + 1;
  const to   = Math.min(current * perPage, totalProducts);

  return (
    <div className="mt-12 flex flex-col items-center gap-3">
      {/* Counter */}
      <p className="text-white/40 text-sm" style={{ fontFamily: "Inter, sans-serif" }}>
        Показано{" "}
        <span className="text-white/60">{from}–{to}</span>
        {" "}з{" "}
        <span className="text-white/60">{totalProducts}</span>
        {" "}товарів
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onChange(current - 1)}
          disabled={current === 1}
          className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
            current === 1
              ? "border-white/5 text-white/20 cursor-not-allowed"
              : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>

        {getPageRange(current, total).map((p, i) =>
          p === "…" ? (
            <span
              key={`ellipsis-${i}`}
              className="w-9 h-9 flex items-center justify-center text-white/25 text-sm select-none"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              ···
            </span>
          ) : (
            <motion.button
              key={p}
              whileTap={{ scale: 0.92 }}
              onClick={() => onChange(p as number)}
              className={`w-9 h-9 rounded-xl text-sm font-medium flex items-center justify-center border transition-all ${
                p === current
                  ? "bg-[#FFCC00] text-[#121212] border-transparent shadow-[0_0_18px_rgba(255,204,0,0.35)]"
                  : "border-white/10 bg-white/5 text-white/55 hover:bg-white/10 hover:text-white hover:border-white/20"
              }`}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {p}
            </motion.button>
          )
        )}

        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => onChange(current + 1)}
          disabled={current === total}
          className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${
            current === total
              ? "border-white/5 text-white/20 cursor-not-allowed"
              : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20"
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>

    </div>
  );
}
