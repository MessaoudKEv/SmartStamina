import React, { useState } from "react";
import { Layers, Sparkles, ExternalLink, ShieldCheck, MapPin, Calendar, Award } from "lucide-react";
import { WearableProduct } from "../types";
import { BRANDS_DATA, BrandInfo } from "../data/brands";
import { ProductCard } from "./ProductCard";

interface BrandDirectoryProps {
  allProducts: WearableProduct[];
  savedIds: string[];
  comparisonIds: string[];
  onToggleSave: (productId: string) => void;
  onToggleComparison: (productId: string) => void;
  onOpenDetail: (product: WearableProduct) => void;
  onOpenShare: (product: WearableProduct) => void;
}

export const BrandDirectory: React.FC<BrandDirectoryProps> = ({
  allProducts,
  savedIds,
  comparisonIds,
  onToggleSave,
  onToggleComparison,
  onOpenDetail,
  onOpenShare,
}) => {
  const [selectedBrandId, setSelectedBrandId] = useState<string>("garmin");

  const selectedBrand = BRANDS_DATA.find((b) => b.id === selectedBrandId) || BRANDS_DATA[0];

  const brandProducts = allProducts.filter(
    (p) => p.brand.toLowerCase() === selectedBrand.name.toLowerCase()
  );

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
          <Layers className="w-3.5 h-3.5 text-emerald-600" />
          <span>Manufacturer Ecosystem Directory</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Pioneering Wearable Brands
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          From endurance sports titans to next-generation arterial smart rings, discover the distinct engineering philosophies behind each manufacturer.
        </p>
      </div>

      {/* Brand Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {BRANDS_DATA.map((brand) => {
          const isSelected = brand.id === selectedBrand.id;
          return (
            <button
              key={brand.id}
              onClick={() => setSelectedBrandId(brand.id)}
              className={`px-4 py-2.5 rounded-2xl border transition-all text-xs font-bold whitespace-nowrap flex items-center gap-2 shrink-0 ${
                isSelected
                  ? "border-emerald-600 bg-slate-900 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span>{brand.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Brand Hero Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Brand Profile & Heritage
            </span>
            <h3 className="font-display text-3xl font-extrabold text-white mt-1">
              {selectedBrand.name}
            </h3>
            <p className="text-sm text-emerald-300 font-medium">{selectedBrand.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{selectedBrand.origin}</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Est. {selectedBrand.founded}</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed">{selectedBrand.description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-slate-400 block font-semibold text-[11px]">Primary Specialty</span>
            <span className="font-bold text-white text-sm">{selectedBrand.specialty}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
            <span className="text-slate-400 block font-semibold text-[11px]">Flagship Hero Device</span>
            <span className="font-bold text-emerald-400 text-sm">{selectedBrand.heroProduct}</span>
          </div>
        </div>
      </div>

      {/* Brand Products Catalog */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-xl font-bold text-slate-900">
            Verified {selectedBrand.name} Wearables & Retail Deals ({brandProducts.length})
          </h3>
          <span className="text-xs text-slate-500">
            Real-time price tracking across authorized sellers
          </span>
        </div>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {brandProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isSaved={savedIds.includes(product.id)}
                isInComparison={comparisonIds.includes(product.id)}
                onToggleSave={onToggleSave}
                onToggleComparison={onToggleComparison}
                onOpenDetail={onOpenDetail}
                onOpenShare={onOpenShare}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-500">
              More {selectedBrand.name} models are being verified and added by our lab testing team.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
