import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, ShieldCheck, User } from "lucide-react";
import { UserAccount } from "../types";

interface GoogleAuthModalProps {
  onClose: () => void;
  onSuccess: (user: UserAccount) => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({
  onClose,
  onSuccess,
}) => {
  const [customEmail, setCustomEmail] = useState("");
  const [customName, setCustomName] = useState("");
  const [loading, setLoading] = useState(false);

  const predefinedAccounts = [
    {
      id: "google-usr-1",
      name: "Alex Rivera",
      email: "alex.rivera.athlete@gmail.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "google-usr-2",
      name: "Sarah Jenkins",
      email: "sarah.j.runner@gmail.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "google-usr-3",
      name: "Marcus Vance",
      email: "marcus.vance.ultra@gmail.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    }
  ];

  const handleSelectPredefined = (acc: typeof predefinedAccounts[0]) => {
    setLoading(true);
    setTimeout(() => {
      onSuccess({
        id: acc.id,
        name: acc.name,
        email: acc.email,
        avatar: acc.avatar,
        savedProductIds: ["garmin-fenix-8-solar", "oura-ring-gen-3-horizon"],
        priceAlerts: [
          {
            id: "alt-init-1",
            productId: "oura-ring-gen-3-horizon",
            productName: "Oura Ring Gen 3 Horizon",
            productImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
            currentPrice: 349,
            targetPrice: 299,
            retailerName: "Oura Official",
            createdAt: "2026-08-10"
          }
        ],
        comparisonProductIds: ["garmin-fenix-8-solar", "coros-pace-3"],
        createdAt: new Date().toISOString()
      });
      setLoading(false);
      onClose();
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail.trim() || !customName.trim()) return;

    setLoading(true);
    setTimeout(() => {
      onSuccess({
        id: `google-${Date.now()}`,
        name: customName,
        email: customEmail,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(customName)}`,
        savedProductIds: [],
        priceAlerts: [],
        comparisonProductIds: [],
        createdAt: new Date().toISOString()
      });
      setLoading(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Google G Icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="font-display font-bold text-base text-slate-900">
              Sign in with Google
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="font-display text-lg font-bold text-slate-900">
              Welcome to SmartStamina
            </h3>
            <p className="text-xs text-slate-500">
              Create an account to save wearables, track retailer price drops, and manage device comparisons.
            </p>
          </div>

          {/* Quick 1-Click Profile selection */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Choose a Google Profile
            </span>
            {predefinedAccounts.map((acc) => (
              <button
                key={acc.id}
                onClick={() => handleSelectPredefined(acc)}
                disabled={loading}
                className="w-full p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-slate-50 transition-all flex items-center gap-3 text-left group"
              >
                <img
                  src={acc.avatar}
                  alt={acc.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div className="truncate flex-1">
                  <span className="font-bold text-xs text-slate-900 block group-hover:text-emerald-700">
                    {acc.name}
                  </span>
                  <span className="text-[11px] text-slate-500 block truncate">{acc.email}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-2 text-[11px] text-slate-400 uppercase font-semibold">
              or enter custom email
            </span>
          </div>

          {/* Custom Form */}
          <form onSubmit={handleCustomSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Your Full Name (e.g. David Ross)"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>
            <div>
              <input
                type="email"
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                placeholder="your.email@gmail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !customName || !customEmail}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              {loading ? "Connecting to Google..." : "Continue with Google Account"}
            </button>
          </form>

          {/* Trust badge */}
          <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure authentication. We never sell your personal data.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
