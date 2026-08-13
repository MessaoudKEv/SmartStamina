import React from "react";
import {
  Search,
  Sparkles,
  Zap,
  Heart,
  Moon,
  BatteryCharging,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Compass
} from "lucide-react";

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExecuteSearch: (queryOverride?: string) => void;
  onOpenWizard: () => void;
  onSelectGoal: (goalId: string) => void;
  onExploreDevices: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  onExecuteSearch,
  onOpenWizard,
  onSelectGoal,
  onExploreDevices,
}) => {
  const samplePrompts = [
    "I want something that tracks sleep and heart rate without a smartwatch screen",
    "I run 5 times a week and want accurate heart-rate tracking with long battery",
    "Best smart ring with zero monthly subscription fees",
    "Wearable with real-time stamina pacing for marathon endurance"
  ];

  return (
    <section className="relative overflow-hidden pt-8 pb-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-12 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-emerald-600/5 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-inner">
            <Zap className="w-3.5 h-3.5 fill-current animate-bounce text-emerald-400" />
            <span>Human Performance & Wearable Discovery Engine</span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Understand Your Body. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Improve Your Stamina.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Discover, compare, and find verified retailer deals on wearable technology for fitness,
            stamina, recovery, sleep, and physiological wellbeing.
          </p>

          {/* Instant CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenWizard}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center gap-2 transition-all hover:scale-[1.02]"
              id="hero-find-wearable-cta"
            >
              <Sparkles className="w-4 h-4 fill-current text-slate-950" />
              <span>Find My Wearable (60s Diagnostic)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExploreDevices}
              className="px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-all hover:border-slate-500"
              id="hero-explore-devices-cta"
            >
              <Compass className="w-4 h-4 text-emerald-400" />
              <span>Explore All Devices</span>
            </button>
          </div>
        </div>

        {/* The Killer Feature: Smart Search Bar */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="p-2 rounded-2xl bg-slate-800/80 backdrop-blur-md border border-slate-700/80 shadow-2xl">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onExecuteSearch();
              }}
              className="flex items-center gap-2"
            >
              <div className="relative flex-1 flex items-center pl-3">
                <Search className="w-5 h-5 text-emerald-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Describe your need... e.g. 'Tracks sleep & heart rate without a smartwatch'"
                  className="w-full bg-transparent px-3 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-hidden"
                  id="hero-smart-search-input"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shrink-0 shadow-md"
                id="hero-smart-search-submit"
              >
                <span>Smart Search</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Sample Prompts */}
            <div className="mt-2.5 pt-2.5 border-t border-slate-700/60 px-3 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Try Asking:
              </span>
              {samplePrompts.slice(0, 2).map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(prompt);
                    onExecuteSearch(prompt);
                  }}
                  className="text-[11px] text-slate-300 hover:text-emerald-300 bg-slate-700/60 hover:bg-slate-700 px-2.5 py-1 rounded-md transition-colors text-left truncate max-w-[280px]"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>

          {/* Quick Goal Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] mr-1">Browse by goal:</span>
            <button
              onClick={() => onSelectGoal("stamina")}
              className="px-3 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-colors font-medium flex items-center gap-1"
            >
              <Zap className="w-3 h-3 text-amber-400" /> Track Stamina
            </button>
            <button
              onClick={() => onSelectGoal("fitness")}
              className="px-3 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 transition-colors font-medium"
            >
              🏃 Improve Fitness
            </button>
            <button
              onClick={() => onSelectGoal("sleep")}
              className="px-3 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 transition-colors font-medium flex items-center gap-1"
            >
              <Moon className="w-3 h-3 text-indigo-400" /> Track Sleep
            </button>
            <button
              onClick={() => onSelectGoal("heart-rate")}
              className="px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors font-medium flex items-center gap-1"
            >
              <Heart className="w-3 h-3 text-rose-400" /> Monitor Heart Rate
            </button>
            <button
              onClick={() => onSelectGoal("recovery")}
              className="px-3 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-colors font-medium flex items-center gap-1"
            >
              <BatteryCharging className="w-3 h-3 text-emerald-400" /> Improve Recovery
            </button>
            <button
              onClick={() => onSelectGoal("wellbeing")}
              className="px-3 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 transition-colors font-medium"
            >
              🧠 Manage Stress
            </button>
          </div>
        </div>

        {/* Interactive Biometric Widgets Row */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stamina Widget (Signature) */}
          <div className="p-4 rounded-xl bg-gradient-to-b from-slate-800/90 to-slate-800/50 border border-amber-500/40 shadow-lg relative overflow-hidden group hover:border-amber-400 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-current text-amber-400" />
                Real-Time Stamina
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold">
                SmartStamina Index
              </span>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono-num text-white">82</span>
              <span className="text-xs font-semibold text-emerald-400 flex items-center">
                <TrendingUp className="w-3 h-3 mr-0.5" /> +12% this month
              </span>
            </div>
            <div className="mt-2 w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-emerald-400 h-2 rounded-full w-[82%]"></div>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Optimal aerobic reserve for endurance pacing
            </p>
          </div>

          {/* Heart Rate Widget */}
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 shadow-lg hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-current text-rose-400 animate-pulse" />
                Resting Heart Rate
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/15 text-rose-300 font-medium">
                Live Pulse
              </span>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono-num text-white">62</span>
              <span className="text-xs text-slate-300 font-medium">BPM</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Optimal athletic baseline range</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              Monitored via ECG chest & optical ring sensors
            </p>
          </div>

          {/* Sleep Widget */}
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 shadow-lg hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-indigo-400" />
                Sleep Architecture
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 font-medium">
                87% Score
              </span>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono-num text-white">7h 42m</span>
            </div>
            <div className="mt-2 flex items-center gap-1 font-mono-num text-xs text-indigo-300">
              <div className="flex gap-0.5 w-full">
                <div className="h-2 bg-indigo-500 rounded-xs w-[25%]" title="Deep Sleep (1h 55m)"></div>
                <div className="h-2 bg-indigo-400 rounded-xs w-[45%]" title="Light Sleep (3h 28m)"></div>
                <div className="h-2 bg-purple-400 rounded-xs w-[22%]" title="REM Sleep (1h 42m)"></div>
                <div className="h-2 bg-slate-600 rounded-xs w-[8%]" title="Awake (37m)"></div>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Deep & REM cycles restore central nervous system
            </p>
          </div>

          {/* Recovery Widget */}
          <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 shadow-lg hover:border-slate-600 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                Training Recovery
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                Ready
              </span>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold font-mono-num text-emerald-400">87%</span>
              <span className="text-xs text-slate-300 font-medium">HRV 68ms</span>
            </div>
            <div className="mt-2 w-full bg-slate-700/60 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-400 h-2 rounded-full w-[87%]"></div>
            </div>
            <p className="mt-2 text-[11px] text-slate-300 font-medium">
              Prime state to perform high-intensity workouts
            </p>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-8 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Independent wearable testing & retailer price comparison • We never sell counterfeit devices</span>
        </div>
      </div>
    </section>
  );
};
