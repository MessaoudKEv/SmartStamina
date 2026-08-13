import React from "react";
import {
  Zap,
  Moon,
  Heart,
  BatteryCharging,
  Smile,
  Activity,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { GoalCategory, WearableProduct } from "../types";
import { GOAL_CATEGORIES } from "../data/goals";
import { ProductCard } from "./ProductCard";

interface GoalSectionProps {
  selectedGoalId: string | null;
  onSelectGoal: (goalId: string | null) => void;
  allProducts: WearableProduct[];
  savedIds: string[];
  comparisonIds: string[];
  onToggleSave: (productId: string) => void;
  onToggleComparison: (productId: string) => void;
  onOpenDetail: (product: WearableProduct) => void;
  onOpenShare: (product: WearableProduct) => void;
}

export const GoalSection: React.FC<GoalSectionProps> = ({
  selectedGoalId,
  onSelectGoal,
  allProducts,
  savedIds,
  comparisonIds,
  onToggleSave,
  onToggleComparison,
  onOpenDetail,
  onOpenShare,
}) => {
  const activeCategory = GOAL_CATEGORIES.find((g) => g.id === selectedGoalId) || GOAL_CATEGORIES[0];

  const matchedProducts = allProducts.filter((product) =>
    activeCategory.featuredProductIds.includes(product.id)
  );

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="w-6 h-6 text-amber-500" />;
      case "Moon":
        return <Moon className="w-6 h-6 text-indigo-500" />;
      case "BatteryCharging":
        return <BatteryCharging className="w-6 h-6 text-emerald-500" />;
      case "Heart":
        return <Heart className="w-6 h-6 text-rose-500" />;
      case "Smile":
        return <Smile className="w-6 h-6 text-teal-500" />;
      default:
        return <Activity className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>Physiological Goal Architecture</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explore Wearables by Human Performance Goal
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Select what your body needs most right now. SmartStamina curates top-tier lab-tested hardware tailored to your exact metabolic and cardiac targets.
        </p>
      </div>

      {/* Goal Cards Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {GOAL_CATEGORIES.map((cat) => {
          const isSelected = activeCategory.id === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectGoal(cat.id)}
              className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between min-h-[110px] ${
                isSelected
                  ? "border-emerald-600 bg-emerald-50/60 shadow-md scale-[1.02]"
                  : "border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50"
              }`}
              id={`goal-tab-${cat.id}`}
            >
              <div className="mb-2">{getIcon(cat.iconName)}</div>
              <div>
                <h3
                  className={`font-bold text-xs ${
                    isSelected ? "text-emerald-900" : "text-slate-900"
                  }`}
                >
                  {cat.title}
                </h3>
                <span className="text-[10px] text-slate-400 font-medium mt-0.5 block">
                  {cat.featuredProductIds.length} Curated
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Goal Deep Dive Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <div>{getIcon(activeCategory.iconName)}</div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Target Biometrics & Methodology
            </span>
          </div>

          <h3 className="font-display text-2xl font-bold text-white">
            {activeCategory.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeCategory.description}
          </p>

          {/* Key Metrics Tracked */}
          <div className="pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
              Key Biomarkers & Capabilities:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeCategory.keyBenefits.map((metric, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-emerald-300 border border-slate-700"
                >
                  ✓ {metric}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Matched Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-display text-xl font-bold text-slate-900">
              Top Ranked Devices for {activeCategory.title}
            </h3>
            <p className="text-xs text-slate-500">
              Ranked by sensor accuracy, software insight depth, and battery performance
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {matchedProducts.map((product) => (
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
      </div>
    </div>
  );
};
