import React, { useState } from "react";
import { BookOpen, Clock, ArrowRight, Award, CheckCircle2, Star, Sparkles } from "lucide-react";
import { EDITORIAL_GUIDES } from "../data/guides";
import { EditorialGuide, WearableProduct } from "../types";

interface EditorialGuidesProps {
  allProducts: WearableProduct[];
  onOpenDetail: (product: WearableProduct) => void;
}

export const EditorialGuides: React.FC<EditorialGuidesProps> = ({
  allProducts,
  onOpenDetail,
}) => {
  const [selectedGuide, setSelectedGuide] = useState<EditorialGuide>(EDITORIAL_GUIDES[0]);

  const topPick = allProducts.find((p) => p.id === selectedGuide.topPickId);
  const runnerUp = allProducts.find((p) => p.id === selectedGuide.runnerUpId);
  const bestValue = allProducts.find((p) => p.id === selectedGuide.bestValueId);

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
          <BookOpen className="w-3.5 h-3.5 text-amber-500" />
          <span>2026 Lab Tested Buyer's Guides</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Curated Wearable Field Tests & Editorial Picks
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Comprehensive physiological breakdowns and comparative lab analysis by exercise physiologists and endurance coaches.
        </p>
      </div>

      {/* Guide selector tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {EDITORIAL_GUIDES.map((guide) => {
          const isSelected = guide.id === selectedGuide.id;
          return (
            <button
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/50 shadow-md"
                  : "border-slate-200 hover:border-slate-300 bg-white"
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
                  {guide.badge}
                </span>
                <h4 className="font-bold text-xs text-slate-900 mt-2 line-clamp-2">
                  {guide.title}
                </h4>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                <Clock className="w-3 h-3" />
                <span>{guide.readTime}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Guide Article Presentation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            {selectedGuide.badge} • {selectedGuide.readTime}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
            {selectedGuide.title}
          </h3>
          <p className="text-sm text-slate-600">{selectedGuide.subtitle}</p>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-normal">
          {selectedGuide.description}
        </p>

        {/* Key Takeaways */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Key Testing Takeaways
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {selectedGuide.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The 3 Top Podiums: Top Pick, Runner Up, Best Value */}
        <div className="pt-2">
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4">
            Tested & Verified Recommendations
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Top Pick */}
            {topPick && (
              <div className="p-5 rounded-2xl bg-gradient-to-b from-amber-500/10 to-transparent border-2 border-amber-500/40 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-slate-950 uppercase tracking-wider">
                      ★ Top Overall Pick
                    </span>
                    <span className="text-xs font-bold text-amber-800 font-mono-num">
                      Score {topPick.staminaScore}/100
                    </span>
                  </div>

                  <img
                    src={topPick.image}
                    alt={topPick.name}
                    className="w-full h-32 rounded-xl object-cover mt-2 cursor-pointer"
                    onClick={() => onOpenDetail(topPick)}
                  />

                  <h5
                    onClick={() => onOpenDetail(topPick)}
                    className="font-bold text-sm text-slate-900 mt-2 hover:text-emerald-700 cursor-pointer"
                  >
                    {topPick.name}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{topPick.tagline}</p>
                </div>

                <div className="pt-2 border-t border-amber-500/20 flex items-center justify-between">
                  <span className="text-base font-extrabold font-mono-num text-slate-900">
                    ${topPick.price}
                  </span>
                  <button
                    onClick={() => onOpenDetail(topPick)}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            )}

            {/* Runner Up */}
            {runnerUp && (
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-800 uppercase tracking-wider">
                      Runner-Up
                    </span>
                    <span className="text-xs font-bold text-slate-600 font-mono-num">
                      Score {runnerUp.staminaScore}/100
                    </span>
                  </div>

                  <img
                    src={runnerUp.image}
                    alt={runnerUp.name}
                    className="w-full h-32 rounded-xl object-cover mt-2 cursor-pointer"
                    onClick={() => onOpenDetail(runnerUp)}
                  />

                  <h5
                    onClick={() => onOpenDetail(runnerUp)}
                    className="font-bold text-sm text-slate-900 mt-2 hover:text-emerald-700 cursor-pointer"
                  >
                    {runnerUp.name}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{runnerUp.tagline}</p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-base font-extrabold font-mono-num text-slate-900">
                    ${runnerUp.price}
                  </span>
                  <button
                    onClick={() => onOpenDetail(runnerUp)}
                    className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            )}

            {/* Best Value */}
            {bestValue && (
              <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wider">
                      Best Value Pick
                    </span>
                    <span className="text-xs font-bold text-emerald-800 font-mono-num">
                      Score {bestValue.staminaScore}/100
                    </span>
                  </div>

                  <img
                    src={bestValue.image}
                    alt={bestValue.name}
                    className="w-full h-32 rounded-xl object-cover mt-2 cursor-pointer"
                    onClick={() => onOpenDetail(bestValue)}
                  />

                  <h5
                    onClick={() => onOpenDetail(bestValue)}
                    className="font-bold text-sm text-slate-900 mt-2 hover:text-emerald-700 cursor-pointer"
                  >
                    {bestValue.name}
                  </h5>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{bestValue.tagline}</p>
                </div>

                <div className="pt-2 border-t border-emerald-200 flex items-center justify-between">
                  <span className="text-base font-extrabold font-mono-num text-slate-900">
                    ${bestValue.price}
                  </span>
                  <button
                    onClick={() => onOpenDetail(bestValue)}
                    className="px-3 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
                  >
                    View Specs
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
