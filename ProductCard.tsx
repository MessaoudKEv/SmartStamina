import React from "react";
import {
  Heart,
  Scale,
  Share2,
  ExternalLink,
  Battery,
  Zap,
  Check,
  Star,
  Tag,
  Shield,
  Eye
} from "lucide-react";
import { WearableProduct } from "../types";

interface ProductCardProps {
  product: WearableProduct;
  isSaved: boolean;
  isInComparison: boolean;
  onToggleSave: (productId: string) => void;
  onToggleComparison: (productId: string) => void;
  onOpenDetail: (product: WearableProduct) => void;
  onOpenShare: (product: WearableProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isSaved,
  isInComparison,
  onToggleSave,
  onToggleComparison,
  onOpenDetail,
  onOpenShare,
}) => {
  const bestDeal = product.retailers.find((r) => r.isBestDeal) || product.retailers[0];
  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div
      className={`group relative rounded-2xl bg-white border transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:-translate-y-0.5 ${
        isInComparison
          ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md"
          : "border-slate-200/90 hover:border-slate-300"
      }`}
      id={`product-card-${product.id}`}
    >
      {/* Top badges & action buttons bar */}
      <div className="p-4 pb-0 flex items-start justify-between gap-2 z-10">
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-900 text-white">
            {product.brand}
          </span>
          <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700">
            {product.wearableType}
          </span>
          {discountPercent && (
            <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onOpenShare(product)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Share Wearable"
            id={`share-btn-${product.id}`}
          >
            <Share2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => onToggleSave(product.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isSaved
                ? "text-rose-600 bg-rose-50 hover:bg-rose-100"
                : "text-slate-400 hover:text-rose-600 hover:bg-slate-100"
            }`}
            title={isSaved ? "Saved to My SmartStamina" : "Save to My SmartStamina"}
            id={`save-btn-${product.id}`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Product Image & Stamina Gauge */}
      <div
        className="relative px-6 py-4 flex items-center justify-center cursor-pointer group/img"
        onClick={() => onOpenDetail(product)}
      >
        <div className="w-full h-44 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>

          {/* Quick view overlay pill */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 opacity-0 group-hover/img:opacity-100 transition-opacity bg-slate-900/90 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5" />
            <span>Full Specs & Reviews</span>
          </div>
        </div>

        {/* Stamina Score Badge */}
        <div className="absolute top-6 right-8 bg-white/95 backdrop-blur-xs border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-extrabold font-mono-num text-slate-900">
            {product.staminaScore}
          </span>
          <span className="text-[10px] text-slate-400 font-bold">/100</span>
        </div>
      </div>

      {/* Product Information */}
      <div className="px-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating and category */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-500 font-medium text-[11px] truncate">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-slate-800 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal text-[11px]">
                ({product.reviewsCount})
              </span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenDetail(product)}
            className="mt-1.5 font-display text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
          >
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {product.tagline}
          </p>

          {/* "Best For" tags */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.bestFor.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Battery & Subscription stats */}
          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <div className="flex items-center gap-1">
              <Battery className="w-3.5 h-3.5 text-emerald-600" />
              <span>{product.batteryLife}</span>
            </div>
            <div>
              {product.subscriptionRequired ? (
                <span className="text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded">
                  Sub: {product.subscriptionCost || "Required"}
                </span>
              ) : (
                <span className="text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
                  No Subscription
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pricing & Comparison footer */}
        <div className="mt-4 pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Best Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold font-mono-num text-slate-900">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-slate-400 line-through font-mono-num">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Compare toggle button */}
            <button
              onClick={() => onToggleComparison(product.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isInComparison
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
              id={`compare-toggle-${product.id}`}
            >
              {isInComparison ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Comparing</span>
                </>
              ) : (
                <>
                  <Scale className="w-3.5 h-3.5 text-slate-500" />
                  <span>Compare</span>
                </>
              )}
            </button>
          </div>

          {/* Action button rows: View Specs vs View Deal */}
          <div className="grid grid-cols-2 gap-2 pb-4">
            <button
              onClick={() => onOpenDetail(product)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1"
              id={`view-specs-btn-${product.id}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Full Details</span>
            </button>

            <a
              href={bestDeal.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-xs hover:shadow transition-all flex items-center justify-center gap-1"
              id={`view-deal-btn-${product.id}`}
              onClick={(e) => {
                // Inform user we're sending them to retailer
                // Allowed default link behavior
              }}
            >
              <span>View Deal</span>
              <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
            </a>
          </div>

          {/* Retailer indicator */}
          <div className="text-[10px] text-slate-400 text-center pb-2 flex items-center justify-center gap-1">
            <span>Sold via {bestDeal.retailerName}</span>
            {bestDeal.couponCode && (
              <span className="text-emerald-700 font-semibold bg-emerald-50 px-1 rounded">
                Code: {bestDeal.couponCode}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
