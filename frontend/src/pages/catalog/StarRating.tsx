import {Star} from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${star <= Math.round(rating) ? "fill-[#FFCC00] text-[#FFCC00]" : "fill-white/20 text-white/20"}`}
        />
      ))}
    </div>
  );
}