import React from "react";
import { Zap, ShieldCheck, HeartHandshake, Award, Activity, ExternalLink } from "lucide-react";

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenWizard: () => void;
  onOpenModeration: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenWizard,
  onOpenModeration,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <span className="font-display font-extrabold text-xl tracking-tight text-white">
                SMART<span className="text-emerald-400">STAMINA</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The independent discovery, comparison, and recommendation platform for human
              performance technology. Helping you understand your biometrics, track stamina reserves,
              and find verified retailer deals.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Lab Verified Data
              </span>
              <span>•</span>
              <span>Authorized Retailer Deals</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Wearable Discovery
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab("discover")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  All Devices & Smartwatches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("goals")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Browse by Performance Goal
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("compare")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Side-by-Side Matrix
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenWizard}
                  className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors flex items-center gap-1"
                >
                  Find My Wearable Diagnostic
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("deals")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Price Drops & Promo Codes
                </button>
              </li>
            </ul>
          </div>

          {/* Brand & Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Manufacturers & Ecosystems
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab("brands")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Garmin Ecosystem & Stamina
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("brands")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Oura & Arterial Pulse Rings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("brands")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Polar ECG Heart Rate Sensors
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("brands")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  RingConn Subscription-Free
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("brands")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  WHOOP Continuous Recovery
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Community */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Trust & Community
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab("community")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Athlete Reviews & Feedback
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab("guides")}
                  className="hover:text-emerald-400 transition-colors"
                >
                  2026 Buying Guides
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenModeration}
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Trust & Moderation Portal
                </button>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">
                  FCC & CE Measurement Standards
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Consumer Health & Affiliate Disclosure Box */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 text-[11px] leading-relaxed text-slate-400">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Consumer Technology & Health Discovery Platform Notice</span>
          </div>
          <p>
            <strong>Disclaimer:</strong> SmartStamina is a consumer technology discovery, education,
            and price comparison engine. Wearable devices, smart rings, and sensors listed on this
            website are intended for general fitness, athletic performance, stamina monitoring, sleep
            tracking, and wellness optimization. They do not constitute medical devices unless explicitly
            certified as such, and are not intended to diagnose, treat, cure, or prevent any medical disease.
            Always consult a licensed medical professional before beginning strenuous athletic training.
          </p>

          <p>
            <strong>Affiliate Disclosure:</strong> SmartStamina participates in authorized affiliate
            marketing programs. When you click our retailer links (e.g. to Amazon, Garmin, Oura, Best Buy)
            and make a purchase, SmartStamina may earn an affiliate commission at zero additional cost to you.
            Our editorial ratings, Stamina Scores, and AI advisor recommendations remain strictly independent.
          </p>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SmartStamina. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Affiliate Disclosure</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
