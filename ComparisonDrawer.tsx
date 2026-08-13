import React from "react";
import { Scale, X, ArrowRight, Trash2 } from "lucide-react";
import { WearableProduct } from "../types";

interface ComparisonDrawerProps {
  selectedProducts: WearableProduct[];
  onRemoveProduct: (productId: string) => void;
  onClearAll: () => void;
  onOpenComparison: () => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  selectedProducts,
  onRemoveProduct,
  onClearAll,
  onOpenComparison,
}) => {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4 animate-in slide-in-from-bottom-4 duration-300">
      <div className="rounded-2xl bg-slate-900 text-white p-3 sm:p-4 shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3">
        {/* Left item list */}
        <div className="flex items-center gap-3 overflow-x-auto py-1">
          <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-slate-700">
            <Scale className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold font-display">
              Compare ({selectedProducts.length}/4)
            </span>
          </div>

          <div className="flex items-center gap-2">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 bg-slate-800/90 pl-2 pr-1.5 py-1 rounded-xl border border-slate-700 text-xs shrink-0"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <div className="max-w-[100px] truncate">
                  <span className="font-bold text-white block truncate">{product.name}</span>
                  <span className="text-[10px] text-emerald-400 font-mono-num font-bold">
                    ${product.price}
                  </span>
                </div>
                <button
                  onClick={() => onRemoveProduct(product.id)}
                  className="p-1 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right action buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onClearAll}
            className="p-2 text-slate-400 hover:text-slate-200 text-xs transition-colors rounded-lg"
            title="Clear all"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenComparison}
            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all hover:scale-105"
            id="drawer-open-compare-btn"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
