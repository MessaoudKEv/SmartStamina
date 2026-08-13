import React, { useState } from "react";
import { Share2, Copy, Check, X, ExternalLink } from "lucide-react";
import { WearableProduct } from "../types";

interface ShareModalProps {
  product: WearableProduct | null;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ product, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!product) return null;

  const shareUrl = `${window.location.origin}/#product-${product.id}`;
  const shareText = `Check out the ${product.name} on SmartStamina — Discovery engine for human performance & stamina technology.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, "_blank");
  };

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `${shareText} ${shareUrl}`
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-emerald-600" />
            <span className="font-display font-bold text-base text-slate-900">
              Share Wearable Discovery
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 rounded-xl object-cover"
            />
            <div className="truncate">
              <span className="text-[10px] font-bold text-slate-400 uppercase">{product.brand}</span>
              <h4 className="font-bold text-xs text-slate-900 truncate">{product.name}</h4>
              <span className="text-xs font-bold font-mono-num text-emerald-600">
                ${product.price} • Stamina Score {product.staminaScore}/100
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Direct Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-mono select-all focus:outline-hidden"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 shrink-0 ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-900 hover:bg-slate-800 text-white"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={handleShareTwitter}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Share to X / Twitter</span>
            </button>
            <button
              onClick={handleShareWhatsApp}
              className="py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
