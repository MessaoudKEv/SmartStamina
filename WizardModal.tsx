import React, { useState } from "react";
import {
  Sparkles,
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Zap,
  Star,
  ExternalLink,
  RefreshCw,
  Heart,
  Scale,
  Award,
  ChevronRight
} from "lucide-react";
import { WearableProduct } from "../types";

interface WizardModalProps {
  onClose: () => void;
  allProducts: WearableProduct[];
  onOpenDetail: (product: WearableProduct) => void;
  onToggleComparison: (productId: string) => void;
}

export const WizardModal: React.FC<WizardModalProps> = ({
  onClose,
  allProducts,
  onOpenDetail,
  onToggleComparison,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;

  // Answers State
  const [goal, setGoal] = useState("Improve Stamina & Endurance");
  const [formFactor, setFormFactor] = useState("Smart Ring (Screen-free)");
  const [activityLevel, setActivityLevel] = useState("Athletic (4-6 sessions/week)");
  const [subscriptionPref, setSubscriptionPref] = useState("Zero Subscriptions Only (100% Free app)");
  const [phoneOs, setPhoneOs] = useState("iOS (iPhone)");
  const [budget, setBudget] = useState("$200 - $400 (Mid-to-High Performance)");

  // Result state
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    primaryMatchId?: string;
    matchScore?: number;
    matchReasoning?: string;
    standoutFeature?: string;
    runnerUpId?: string;
    budgetAlternativeId?: string;
  } | null>(null);

  const handleFinishWizard = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/advisor/wizard-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: {
            primaryGoal: goal,
            formFactor,
            activityLevel,
            subscriptionPref,
            phoneOs,
            budget,
          },
          availableProducts: allProducts,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setRecommendation(data);
      } else {
        // Fallback matching logic
        let match = allProducts[0];
        if (formFactor.includes("Ring")) {
          match = allProducts.find((p) => p.category === "Smart Ring") || allProducts[0];
        } else if (goal.includes("Stamina") || goal.includes("Endurance")) {
          match = allProducts.find((p) => p.category === "Stamina & Endurance") || allProducts[0];
        } else if (goal.includes("Heart Rate")) {
          match = allProducts.find((p) => p.category === "Heart Rate Monitor") || allProducts[0];
        }

        setRecommendation({
          primaryMatchId: match.id,
          matchScore: 96,
          matchReasoning: `Perfect alignment with your desire for ${goal} and your ${formFactor} preference.`,
          standoutFeature: `${match.batteryLife} battery life and precision physiological algorithms.`,
          runnerUpId: allProducts.find((p) => p.id !== match.id)?.id,
          budgetAlternativeId: allProducts.find((p) => p.price < match.price)?.id,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const primaryProduct = allProducts.find((p) => p.id === recommendation?.primaryMatchId);
  const runnerUpProduct = allProducts.find((p) => p.id === recommendation?.runnerUpId);
  const budgetProduct = allProducts.find((p) => p.id === recommendation?.budgetAlternativeId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header with progress */}
        <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-emerald-500/20">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white">
                Find My Wearable Diagnostic
              </h2>
              <p className="text-xs text-slate-300">
                Step {currentStep} of {totalSteps} • Physiological Compatibility Engine
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-gradient-to-r from-emerald-400 to-teal-400 h-1 transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {!recommendation && !loading ? (
            <div className="space-y-6">
              {/* Step 1: Primary Goal */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Step 1 • Performance Objective
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    What is your #1 physiological goal?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Different sensors specialize in distinct biometric domains.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { title: "Improve Stamina & Endurance", desc: "Marathon pacing, real-time energy reserve & VO2 max", icon: "⚡" },
                      { title: "Deep Sleep & Nighttime HRV", desc: "Sleep staging, recovery scores & autonomic balance", icon: "😴" },
                      { title: "Precision Heart Rate & ECG", desc: "Zero lag during high-intensity intervals & sprints", icon: "❤️" },
                      { title: "Holistic Health & Stress", desc: "Temperature trends, respiratory rate, daytime stress", icon: "🧘" },
                      { title: "Weight Loss & Daily Steps", desc: "Caloric expenditure, active minutes, body composition", icon: "🏃" },
                      { title: "Multisport Trail & Mountain", desc: "Topo maps, barometric altitude, solar battery", icon: "⛰️" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setGoal(item.title)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          goal === item.title
                            ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <span className="text-2xl mb-1 block">{item.icon}</span>
                        <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Form Factor */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Step 2 • Form Factor & Ergonomics
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    Where do you prefer wearing your device?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Choose what feels most comfortable 24/7 or during intense movement.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { title: "Smart Ring (Screen-free)", desc: "Featherweight on finger, best sleep comfort, zero screen notifications" },
                      { title: "GPS Multisport Smartwatch", desc: "Full wrist display for real-time pacing, maps & notifications" },
                      { title: "Screenless Fabric Band", desc: "Discreet wrist or bicep strap focusing purely on strain & recovery" },
                      { title: "Chest Strap Heart Monitor", desc: "Maximum ECG electrical precision for intervals & cycling" },
                      { title: "Under-Mattress Sleep Sensor", desc: "Zero wearables on body — seamless sleep lab under your mattress" },
                      { title: "No Preference / Open to All", desc: "Show me whatever delivers the highest biometric accuracy" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setFormFactor(item.title)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          formFactor === item.title
                            ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Activity Level */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Step 3 • Training Frequency
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    How often do you train or exercise?
                  </h3>

                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {[
                      { title: "Athletic & Endurance (4-6 sessions/week)", desc: "Need rugged hardware, deep training load balance, and long GPS battery" },
                      { title: "Active Fitness (2-3 workouts/week)", desc: "Balanced cardio, strength tracking, and recovery readiness" },
                      { title: "Wellness & Sleep Focused (Daily Health)", desc: "Primarily monitoring sleep quality, resting HR, and stress reduction" },
                      { title: "Elite / Race Competitor (Marathons/Triathlons)", desc: "Require dual-band GNSS, power meters, and real-time stamina metrics" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivityLevel(item.title)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                          activityLevel === item.title
                            ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        {activityLevel === item.title && (
                          <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Subscriptions */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Step 4 • Subscription Model
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    How do you feel about recurring monthly fees?
                  </h3>

                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {[
                      { title: "Zero Subscriptions Only (100% Free app)", desc: "I want to buy the hardware once and keep all features forever (e.g. Garmin, RingConn, Polar)" },
                      { title: "Open to Subscription if Coaching is Superb", desc: "Willing to pay $5 - $30/mo for elite AI coaching and continuous updates (e.g. Oura, WHOOP)" },
                      { title: "No Preference", desc: "Focus strictly on hardware performance and metric reliability" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSubscriptionPref(item.title)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${
                          subscriptionPref === item.title
                            ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </div>
                        {subscriptionPref === item.title && (
                          <Check className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Phone OS */}
              {currentStep === 5 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Step 5 • Smartphone Compatibility
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    What phone do you use?
                  </h3>

                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {[
                      { title: "iOS (iPhone)", icon: "🍎" },
                      { title: "Android", icon: "🤖" },
                      { title: "Both / Cross-platform", icon: "📱" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPhoneOs(item.title)}
                        className={`p-4 rounded-2xl border-2 text-center transition-all ${
                          phoneOs === item.title
                            ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <span className="text-2xl mb-1 block">{item.icon}</span>
                        <h4 className="font-bold text-xs text-slate-900">{item.title}</h4>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 6: Budget */}
              {currentStep === 6 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Step 6 • Target Budget
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                    What is your target investment range?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {[
                      { title: "Under $150 (Affordable & Dedicated)", desc: "Chest straps, sleep pads, and lightweight trackers" },
                      { title: "$150 - $300 (Sweet Spot Performance)", desc: "Premium running watches and entry smart rings" },
                      { title: "$300 - $600 (High-End & Smart Rings)", desc: "Titanium rings, advanced multisport GPS, ECG hybrids" },
                      { title: "$600+ (Ultra-Endurance & Titanium Luxury)", desc: "Solar sapphire GPS watches and dive computers" }
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setBudget(item.title)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          budget === item.title
                            ? "border-emerald-600 bg-emerald-50/60 shadow-xs"
                            : "border-slate-200 hover:border-slate-300 bg-white"
                        }`}
                      >
                        <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : loading ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto text-emerald-600 shadow-inner animate-pulse">
                <RefreshCw className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Analyzing Biometric Alignment...
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Comparing physiological fidelity, form factors, and retailer pricing across all verified devices.
              </p>
            </div>
          ) : recommendation && primaryProduct ? (
            /* Results View */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 border border-emerald-500/40 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Your AI Match Result
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-extrabold text-xs">
                    {recommendation.matchScore || 96}% Biometric Compatibility
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <img
                    src={primaryProduct.image}
                    alt={primaryProduct.name}
                    className="w-24 h-24 rounded-2xl object-cover border border-slate-700"
                  />
                  <div className="space-y-1 text-center sm:text-left">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-800 text-slate-300">
                      {primaryProduct.brand}
                    </span>
                    <h3 className="font-display text-xl font-extrabold text-white">
                      {primaryProduct.name}
                    </h3>
                    <p className="text-xs text-slate-300">{primaryProduct.tagline}</p>
                    <div className="flex items-baseline gap-2 pt-1 justify-center sm:justify-start">
                      <span className="text-xl font-extrabold font-mono-num text-emerald-400">
                        ${primaryProduct.price}
                      </span>
                      <span className="text-xs text-slate-400">
                        via {primaryProduct.retailers[0]?.retailerName}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs space-y-1 text-slate-200">
                  <p>
                    <strong>Why this fits you: </strong>
                    {recommendation.matchReasoning}
                  </p>
                  {recommendation.standoutFeature && (
                    <p className="text-emerald-300 font-medium pt-1">
                      <strong>Standout edge: </strong>
                      {recommendation.standoutFeature}
                    </p>
                  )}
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  <a
                    href={primaryProduct.retailers[0]?.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>View Deal at {primaryProduct.retailers[0]?.retailerName}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => {
                      onOpenDetail(primaryProduct);
                      onClose();
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-700"
                  >
                    <span>Inspect Full Specs & Reviews</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Alternative Recommendations */}
              {(runnerUpProduct || budgetProduct) && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Also Recommended For Your Profile
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {runnerUpProduct && (
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                        <div className="truncate">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            Runner-Up Alternative
                          </span>
                          <h5 className="font-bold text-xs text-slate-900 truncate">
                            {runnerUpProduct.name}
                          </h5>
                          <span className="text-xs font-bold font-mono-num text-emerald-600">
                            ${runnerUpProduct.price}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            onOpenDetail(runnerUpProduct);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 shrink-0"
                        >
                          View
                        </button>
                      </div>
                    )}

                    {budgetProduct && (
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3">
                        <div className="truncate">
                          <span className="text-[10px] font-bold text-emerald-600 uppercase">
                            Best Value Pick
                          </span>
                          <h5 className="font-bold text-xs text-slate-900 truncate">
                            {budgetProduct.name}
                          </h5>
                          <span className="text-xs font-bold font-mono-num text-emerald-600">
                            ${budgetProduct.price}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            onOpenDetail(budgetProduct);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-100 shrink-0"
                        >
                          View
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {!recommendation ? (
            <>
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-30 transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              {currentStep < totalSteps ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleFinishWizard}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Reveal My Best Wearable</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                </button>
              )}
            </>
          ) : (
            <button
              onClick={() => {
                setRecommendation(null);
                setCurrentStep(1);
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
