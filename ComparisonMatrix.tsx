import React, { useState } from "react";
import {
  Scale,
  X,
  Plus,
  Zap,
  Star,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Check,
  Minus,
  Share2,
  Bookmark,
  ChevronDown
} from "lucide-react";
import { WearableProduct, UserAccount } from "../types";

interface ComparisonMatrixProps {
  selectedProducts: WearableProduct[];
  allProducts: WearableProduct[];
  onRemoveProduct: (productId: string) => void;
  onAddProduct: (productId: string) => void;
  onOpenDetail: (product: WearableProduct) => void;
  user: UserAccount | null;
  onSaveComparison: () => void;
  onOpenShare: (product: WearableProduct) => void;
  onOpenAuthModal: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  selectedProducts,
  allProducts,
  onRemoveProduct,
  onAddProduct,
  onOpenDetail,
  user,
  onSaveComparison,
  onOpenShare,
  onOpenAuthModal,
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<{
    summaryVerdict?: string;
    staminaVerdict?: string;
    idealUserProfiles?: {
      id: string;
      bestForUser: string;
      mainAdvantage: string;
      tradeOff: string;
    }[];
    valuePick?: string;
  } | null>(null);

  const [selectorOpen, setSelectorOpen] = useState(false);
  const availableToAdd = allProducts.filter(
    (p) => !selectedProducts.some((sp) => sp.id === p.id)
  );

  const generateComparisonAnalysis = async () => {
    if (selectedProducts.length < 2) return;
    setAnalyzing(true);

    try {
      const res = await fetch("/api/advisor/compare-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: selectedProducts }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiAnalysis(data);
      } else {
        setAiAnalysis({
          summaryVerdict: `Comparing ${selectedProducts.map((p) => p.name).join(" vs ")}. Each wearable targets different athletic profiles.`,
          staminaVerdict: "Devices with dedicated physiological algorithms offer superior pacing during high-volume training.",
          idealUserProfiles: selectedProducts.map((p) => ({
            id: p.id,
            bestForUser: `Tailored for ${p.category} enthusiasts prioritizing ${p.bestFor[0]}.`,
            mainAdvantage: `${p.batteryLife} battery and ${p.wearableType} ergonomics.`,
            tradeOff: p.subscriptionRequired ? "Monthly subscription fee applies" : "Form factor considerations",
          })),
          valuePick: selectedProducts.sort((a, b) => a.price - b.price)[0]?.name || "Best value device",
        });
      }
    } catch (err) {
      console.error("Compare error:", err);
    } finally {
      setAnalyzing(false);
    }
  };

  React.useEffect(() => {
    if (selectedProducts.length >= 2) {
      generateComparisonAnalysis();
    } else {
      setAiAnalysis(null);
    }
  }, [selectedProducts.map((p) => p.id).join(",")]);

  if (selectedProducts.length === 0) {
    return (
      <div className="py-16 text-center max-w-xl mx-auto px-4">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900">
          No Devices in Comparison Tray
        </h2>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Select 2 to 4 wearable devices across our catalog to perform side-by-side capability benchmarking and AI stamina analysis.
        </p>

        {/* Quick Suggestion buttons */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {allProducts.slice(0, 3).map((p) => (
            <button
              key={p.id}
              onClick={() => onAddProduct(p.id)}
              className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:border-emerald-500 hover:text-emerald-700 transition-colors shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add {p.name}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-emerald-600" />
            <h1 className="font-display text-2xl font-extrabold text-slate-900">
              Wearable Capability Matrix
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {selectedProducts.length} Selected (Max 4)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare biometric fidelity, battery life, stamina scoring, and price across authorized retailers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {selectedProducts.length < 4 && (
            <div className="relative">
              <button
                onClick={() => setSelectorOpen(!selectorOpen)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
                id="add-device-to-compare-btn"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Device to Compare</span>
                <ChevronDown className="w-3 h-3 ml-1" />
              </button>

              {selectorOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-30 max-h-72 overflow-y-auto">
                  <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select a wearable
                  </div>
                  {availableToAdd.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onAddProduct(p.id);
                        setSelectorOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 text-xs flex items-center justify-between text-slate-800"
                    >
                      <div className="truncate mr-2">
                        <span className="font-bold">{p.brand}</span> {p.name}
                      </div>
                      <span className="font-mono-num text-emerald-600 font-bold shrink-0">
                        ${p.price}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => {
              if (!user) onOpenAuthModal();
              else onSaveComparison();
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
            <span>Save Comparison</span>
          </button>
        </div>
      </div>

      {/* AI Comparison Analysis Box */}
      {selectedProducts.length >= 2 && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-emerald-500/40 shadow-xl space-y-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">
                SmartStamina AI Comparative Verdict
              </h3>
            </div>

            <button
              onClick={generateComparisonAnalysis}
              disabled={analyzing}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${analyzing ? "animate-spin" : ""}`} />
              <span>Regenerate Insights</span>
            </button>
          </div>

          {analyzing ? (
            <div className="py-6 flex items-center justify-center gap-2 text-xs text-emerald-300">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
              <span>Analyzing multi-metric biometric differences...</span>
            </div>
          ) : aiAnalysis ? (
            <div className="space-y-4">
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {aiAnalysis.summaryVerdict}
              </p>

              {aiAnalysis.staminaVerdict && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-medium">
                  <strong>⚡ Stamina & Endurance Analysis: </strong>
                  {aiAnalysis.staminaVerdict}
                </div>
              )}

              {aiAnalysis.idealUserProfiles && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                  {aiAnalysis.idealUserProfiles.map((prof) => {
                    const matchedProduct = selectedProducts.find((p) => p.id === prof.id);
                    return (
                      <div
                        key={prof.id}
                        className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1.5"
                      >
                        <span className="font-bold text-emerald-400 block truncate">
                          {matchedProduct?.name || prof.id}
                        </span>
                        <p className="text-slate-300 font-medium">
                          <strong>Best for:</strong> {prof.bestForUser}
                        </p>
                        <p className="text-emerald-300 text-[11px]">
                          <strong>Advantage:</strong> {prof.mainAdvantage}
                        </p>
                        <p className="text-slate-400 text-[11px]">
                          <strong>Trade-off:</strong> {prof.tradeOff}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}

      {/* Main Side-by-Side Comparison Table */}
      <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          {/* Header Row with Product Cards */}
          <thead>
            <tr className="border-b border-slate-200">
              <th className="p-4 sm:p-6 w-48 min-w-44 bg-slate-50/80 font-bold uppercase tracking-wider text-[11px] text-slate-500 align-top">
                Device Overview
              </th>
              {selectedProducts.map((p) => (
                <th key={p.id} className="p-4 sm:p-6 min-w-64 w-72 align-top">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white">
                        {p.brand}
                      </span>
                      <button
                        onClick={() => onRemoveProduct(p.id)}
                        className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Remove from compare"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div
                      className="h-32 rounded-xl overflow-hidden bg-slate-100 relative cursor-pointer"
                      onClick={() => onOpenDetail(p)}
                    >
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>

                    <div>
                      <h4
                        onClick={() => onOpenDetail(p)}
                        className="font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors cursor-pointer line-clamp-1"
                      >
                        {p.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 block">{p.category}</span>
                    </div>

                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-xl font-extrabold font-mono-num text-slate-900">
                          ${p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="ml-1 text-xs text-slate-400 line-through font-mono-num">
                            ${p.originalPrice}
                          </span>
                        )}
                      </div>
                      <a
                        href={p.retailers[0]?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1"
                      >
                        <span>View Deal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
            {/* Stamina & Performance Row */}
            <tr className="bg-amber-50/40">
              <td className="p-4 font-bold text-amber-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Stamina Index</span>
              </td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-extrabold font-mono-num text-amber-900">
                      {p.staminaScore}/100
                    </span>
                    <div className="flex-1 max-w-[120px] bg-amber-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${p.staminaScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              ))}
            </tr>

            {/* Sleep Score */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Sleep Score</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4 font-bold text-indigo-700 font-mono-num">
                  {p.sleepScore > 0 ? `${p.sleepScore}/100` : "Non-sleep device"}
                </td>
              ))}
            </tr>

            {/* Recovery Score */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Recovery Score</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4 font-bold text-emerald-700 font-mono-num">
                  {p.recoveryScore}/100
                </td>
              ))}
            </tr>

            {/* Battery Life */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Battery Life</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4 font-bold text-slate-900">
                  {p.batteryLife}
                </td>
              ))}
            </tr>

            {/* Wearable Form Factor */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Form Factor</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4 font-medium text-slate-800">
                  {p.wearableType} ({p.weightGrams}g)
                </td>
              ))}
            </tr>

            {/* GPS Capability */}
            <tr>
              <td className="p-4 font-bold text-slate-900">GPS / Satellite</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  {p.hasGps ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Standalone GNSS
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Minus className="w-3.5 h-3.5" /> Phone GPS Only
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Heart Rate / ECG */}
            <tr>
              <td className="p-4 font-bold text-slate-900">ECG & Heart Rate</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  {p.hasEcg ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> ECG + Continuous HR
                    </span>
                  ) : (
                    <span className="text-slate-700">Continuous Optical HR</span>
                  )}
                </td>
              ))}
            </tr>

            {/* SpO2 Blood Oxygen */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Blood Oxygen (SpO2)</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  {p.hasSpO2 ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Yes
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Minus className="w-3.5 h-3.5" /> No
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Temperature Sensor */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Temperature Sensor</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  {p.hasTemp ? (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Skin Temp Variance
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Minus className="w-3.5 h-3.5" /> No
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Water Resistance */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Water Resistance</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4 text-slate-800">
                  {p.waterResistance}
                </td>
              ))}
            </tr>

            {/* OS Compatibility */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Smartphone OS</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4 text-slate-800">
                  {p.compatibility === "Both" ? "iOS & Android" : p.compatibility}
                </td>
              ))}
            </tr>

            {/* Subscription Requirement */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Subscription Required</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  {p.subscriptionRequired ? (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 text-amber-800">
                      {p.subscriptionCost || "Membership Required"}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                      100% Free Lifetime
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Best For Summary */}
            <tr>
              <td className="p-4 font-bold text-slate-900">Best Suited For</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  <div className="flex flex-wrap gap-1">
                    {p.bestFor.map((bf, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700"
                      >
                        {bf}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* Bottom Final Purchase Links */}
            <tr className="bg-slate-50">
              <td className="p-4 font-bold text-slate-900">Retailer Purchase</td>
              {selectedProducts.map((p) => (
                <td key={p.id} className="p-4">
                  <a
                    href={p.retailers[0]?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Buy at {p.retailers[0]?.retailerName} (${p.price})</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
