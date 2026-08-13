import React from "react";
import { Flame, Tag, ExternalLink, TrendingDown, Clock, ShieldCheck, Star } from "lucide-react";
import { WearableProduct } from "../types";

interface DealsSectionProps {
  products: WearableProduct[];
  onOpenDetail: (product: WearableProduct) => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ products, onOpenDetail }) => {
  // Find products that have a discount or coupon
  const dealProducts = products.filter(
    (p) =>
      (p.originalPrice && p.originalPrice > p.price) ||
      p.retailers.some((r) => r.couponCode)
  );

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-800 text-xs font-bold border border-orange-200">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span>Live Retailer Price Drops</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Trending Wearable Deals & Verified Coupon Codes
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          SmartStamina tracks verified authorized distributors and official brand storefronts hourly. Click through to lock in the lowest historical price.
        </p>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dealProducts.map((product) => {
          const bestDeal = product.retailers.find((r) => r.isBestDeal) || product.retailers[0];
          const discountAmt = product.originalPrice ? product.originalPrice - product.price : 0;
          const discountPct = product.originalPrice
            ? Math.round((discountAmt / product.originalPrice) * 100)
            : null;

          return (
            <div
              key={product.id}
              className="rounded-3xl bg-white border border-slate-200 hover:border-orange-300 overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Image and discount badge */}
                <div className="relative h-48 bg-slate-100 flex items-center justify-center overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {discountPct && (
                    <div className="absolute top-3 left-3 bg-rose-600 text-white font-extrabold text-xs px-3 py-1 rounded-xl shadow-md flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>SAVE {discountPct}% (${discountAmt})</span>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                    {bestDeal.retailerName}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-bold text-slate-700">{product.brand}</span>
                    <span className="flex items-center gap-1 text-slate-700 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {product.rating}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenDetail(product)}
                    className="font-display font-bold text-base text-slate-900 hover:text-emerald-700 cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  {bestDeal.couponCode && (
                    <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center justify-between">
                      <span>Promo Code:</span>
                      <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border border-emerald-300">
                        {bestDeal.couponCode}
                      </span>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 line-clamp-2">{product.tagline}</p>
                </div>
              </div>

              {/* Price & View Deal */}
              <div className="p-5 pt-0">
                <div className="flex items-baseline justify-between mb-3 border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">
                      Current Low Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-extrabold font-mono-num text-slate-900">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-400 line-through font-mono-num">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    {bestDeal.shippingText}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onOpenDetail(product)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
                  >
                    Full Specs
                  </button>
                  <a
                    href={bestDeal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>View Deal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
