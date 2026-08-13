import React, { useState } from "react";
import {
  Bookmark,
  Heart,
  Scale,
  Bell,
  Trash2,
  ExternalLink,
  Zap,
  Check,
  User,
  X,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { UserAccount, WearableProduct } from "../types";

interface UserDashboardModalProps {
  user: UserAccount | null;
  allProducts: WearableProduct[];
  onClose: () => void;
  onRemoveSaved: (productId: string) => void;
  onOpenDetail: (product: WearableProduct) => void;
  onOpenComparison: () => void;
  onDeletePriceAlert: (alertId: string) => void;
  onSignOut: () => void;
  onOpenAuthModal: () => void;
}

export const UserDashboardModal: React.FC<UserDashboardModalProps> = ({
  user,
  allProducts,
  onClose,
  onRemoveSaved,
  onOpenDetail,
  onOpenComparison,
  onDeletePriceAlert,
  onSignOut,
  onOpenAuthModal,
}) => {
  const [activeTab, setActiveTab] = useState<"saved" | "alerts" | "comparisons">("saved");

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-2xl border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <User className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-slate-900">
            Sign In to Access My SmartStamina
          </h3>
          <p className="text-xs text-slate-600">
            Save your favorite wearables, set price drop notifications, and sync comparisons across devices with your Google account.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenAuthModal();
              }}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Connect with Google</span>
            </button>
            <button
              onClick={onClose}
              className="w-full py-2.5 text-slate-500 hover:text-slate-800 font-semibold text-xs"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    );
  }

  const savedProducts = user.savedProductIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter(Boolean) as WearableProduct[];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-slate-900 text-white flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400"
            />
            <div>
              <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                {user.name}
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Google Account
                </span>
              </h2>
              <p className="text-xs text-slate-300">{user.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="px-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab("saved")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "saved"
                ? "border-emerald-600 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Saved Wearables ({savedProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("alerts")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "alerts"
                ? "border-emerald-600 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Price Drop Alerts ({user.priceAlerts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("comparisons")}
            className={`py-3.5 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === "comparisons"
                ? "border-emerald-600 text-emerald-800"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Saved Comparisons ({user.comparisonProductIds.length})</span>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Saved Tab */}
          {activeTab === "saved" && (
            <div className="space-y-4">
              {savedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedProducts.map((p) => (
                    <div
                      key={p.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 shadow-xs flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0 cursor-pointer"
                          onClick={() => {
                            onOpenDetail(p);
                            onClose();
                          }}
                        />
                        <div className="truncate flex-1">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">
                            {p.brand}
                          </span>
                          <h4
                            className="font-bold text-sm text-slate-900 truncate cursor-pointer hover:text-emerald-700"
                            onClick={() => {
                              onOpenDetail(p);
                              onClose();
                            }}
                          >
                            {p.name}
                          </h4>
                          <span className="text-xs font-bold font-mono-num text-emerald-600 block">
                            ${p.price}
                          </span>
                        </div>
                        <button
                          onClick={() => onRemoveSaved(p.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            onOpenDetail(p);
                            onClose();
                          }}
                          className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
                        >
                          View Specs
                        </button>
                        <a
                          href={p.retailers[0]?.url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1"
                        >
                          <span>Buy Deal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <Heart className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs">You haven't saved any wearables yet.</p>
                </div>
              )}
            </div>
          )}

          {/* Alerts Tab */}
          {activeTab === "alerts" && (
            <div className="space-y-4">
              {user.priceAlerts.length > 0 ? (
                <div className="space-y-3">
                  {user.priceAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={alert.productImage}
                          alt={alert.productName}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{alert.productName}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>Current: ${alert.currentPrice}</span>
                            <span>•</span>
                            <span className="font-bold text-emerald-600">
                              Alert Target: ${alert.targetPrice}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          Monitoring 24/7
                        </span>
                        <button
                          onClick={() => onDeletePriceAlert(alert.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500 space-y-2">
                  <Bell className="w-8 h-8 mx-auto text-slate-300" />
                  <p className="text-xs">No active price drop alerts.</p>
                  <p className="text-[11px] text-slate-400">
                    Open any wearable card to set a custom target price.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Comparisons Tab */}
          {activeTab === "comparisons" && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-emerald-900">
                    Your Active Comparison Set
                  </h4>
                  <p className="text-[11px] text-emerald-700">
                    {user.comparisonProductIds.length} wearable devices currently queued
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenComparison();
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>Open Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => {
              onSignOut();
              onClose();
            }}
            className="text-xs font-bold text-rose-600 hover:text-rose-700"
          >
            Sign Out of SmartStamina
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
