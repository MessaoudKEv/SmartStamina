import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Zap,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  X
} from "lucide-react";
import { WearableProduct } from "../types";
import { ProductCard } from "./ProductCard";

interface SmartSearchAdvisorProps {
  initialQuery?: string;
  allProducts: WearableProduct[];
  savedIds: string[];
  comparisonIds: string[];
  onToggleSave: (productId: string) => void;
  onToggleComparison: (productId: string) => void;
  onOpenDetail: (product: WearableProduct) => void;
  onOpenShare: (product: WearableProduct) => void;
  onClose?: () => void;
}

export const SmartSearchAdvisor: React.FC<SmartSearchAdvisorProps> = ({
  initialQuery = "",
  allProducts,
  savedIds,
  comparisonIds,
  onToggleSave,
  onToggleComparison,
  onOpenDetail,
  onOpenShare,
  onClose,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    interpretation?: string;
    matchedCategory?: string;
    keyAttributes?: string[];
    reasoning?: string;
    recommendedProductIds?: string[];
    highlightFeature?: string;
  } | null>(null);

  const presets = [
    {
      label: "Sleep & HR without a smartwatch",
      query: "I want something that tracks my sleep and heart rate but I don't want a smartwatch screen.",
    },
    {
      label: "Accurate Heart-Rate for 5x/week Running",
      query: "I run 5 times a week and want accurate heart-rate tracking and pacing metrics.",
    },
    {
      label: "Zero Subscription Smart Ring",
      query: "I want a lightweight smart ring for sleep with no monthly subscription fees.",
    },
    {
      label: "Real-Time Stamina for Marathon & Cycling",
      query: "Looking for a device with real-time stamina reserve pacing for long distance endurance.",
    },
    {
      label: "Effortless Under-Mattress Sleep Tracking",
      query: "I hate wearing anything on my body while sleeping but want deep sleep analysis.",
    }
  ];

  const handleSearch = async (searchPrompt: string) => {
    if (!searchPrompt.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/advisor/smart-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchPrompt,
          availableProducts: allProducts,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setResult(data);
      } else {
        // Fallback local matching
        const q = searchPrompt.toLowerCase();
        let matched = allProducts;

        if (q.includes("ring") || q.includes("without a smartwatch") || q.includes("screenless")) {
          matched = allProducts.filter(
            (p) => p.category === "Smart Ring" || p.category === "Recovery & Breathing"
          );
        } else if (q.includes("chest") || q.includes("heart rate") || q.includes("accurate")) {
          matched = allProducts.filter((p) => p.category === "Heart Rate Monitor" || p.hasHrv);
        } else if (q.includes("stamina") || q.includes("marathon") || q.includes("running")) {
          matched = allProducts.filter(
            (p) => p.category === "Stamina & Endurance" || p.primaryGoals.includes("Running")
          );
        }

        setResult({
          interpretation: `Analyzed physical performance needs for "${searchPrompt}"`,
          matchedCategory: matched[0]?.category || "Smart Wearable",
          keyAttributes: ["Precision Sensors", "Recovery Readiness", "Long Battery"],
          reasoning:
            "Matched devices prioritizing optimal sensor location, battery longevity, and physiological fidelity.",
          recommendedProductIds: matched.slice(0, 4).map((p) => p.id),
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSearch(initialQuery);
    }
  }, [initialQuery]);

  const recommendedProducts = (result?.recommendedProductIds || [])
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as WearableProduct[];

  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative overflow-hidden mb-12">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                SmartStamina AI Wearable Advisor
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Natural Language Matching
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Describe your training routine, biometric goals, or form factor preferences in plain English.
              </p>
            </div>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Input search box */}
        <div className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(query);
            }}
            className="flex flex-col sm:flex-row items-stretch gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. 'I want something for recovery and HRV without wearing a screen on my wrist'"
                className="w-full bg-slate-800/90 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all placeholder:text-slate-500"
                id="advisor-search-input"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:opacity-50 text-slate-950 font-bold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              id="advisor-ask-btn"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Analyzing Biometrics...</span>
                </>
              ) : (
                <>
                  <span>Consult Advisor</span>
                  <Sparkles className="w-4 h-4 fill-current" />
                </>
              )}
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Popular Inquiries:
            </span>
            {presets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setQuery(preset.query);
                  handleSearch(preset.query);
                }}
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Presentation */}
        {result && (
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            {/* AI Analysis Summary Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-800/90 to-slate-800/40 border border-emerald-500/40 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Recommended Category: {result.matchedCategory}
                  </span>
                </div>
                {result.keyAttributes && (
                  <div className="flex flex-wrap gap-1.5">
                    {result.keyAttributes.map((attr, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      >
                        {attr}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {result.interpretation && (
                <p className="text-sm font-semibold text-white">
                  "{result.interpretation}"
                </p>
              )}

              {result.reasoning && (
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {result.reasoning}
                </p>
              )}
            </div>

            {/* Recommended Products Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Top Wearable Recommendations ({recommendedProducts.length})</span>
                </h3>
                <span className="text-xs text-slate-400">
                  Ranked by athletic fit & price-to-performance
                </span>
              </div>

              {recommendedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {recommendedProducts.map((product) => (
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
                <p className="text-xs text-slate-400 italic">
                  No exact device match found in catalog. Try broadening your criteria.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
