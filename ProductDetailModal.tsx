import React, { useState } from "react";
import {
  X,
  Star,
  Zap,
  Battery,
  Heart,
  Scale,
  Share2,
  ExternalLink,
  ShieldCheck,
  Check,
  Bell,
  MessageSquare,
  Sparkles,
  Info,
  ChevronRight,
  TrendingDown,
  Award,
  Layers,
  ThumbsUp,
  Flag
} from "lucide-react";
import { WearableProduct, CommunityReview, PriceAlert, UserAccount } from "../types";

interface ProductDetailModalProps {
  product: WearableProduct | null;
  onClose: () => void;
  isSaved: boolean;
  isInComparison: boolean;
  onToggleSave: (productId: string) => void;
  onToggleComparison: (productId: string) => void;
  onOpenShare: (product: WearableProduct) => void;
  reviews: CommunityReview[];
  onAddReview: (review: Partial<CommunityReview>) => void;
  onLikeReview: (reviewId: string) => void;
  onReportReview: (reviewId: string, reason: string) => void;
  user: UserAccount | null;
  onSetPriceAlert: (alert: Omit<PriceAlert, "id" | "createdAt">) => void;
  onOpenAuthModal: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isSaved,
  isInComparison,
  onToggleSave,
  onToggleComparison,
  onOpenShare,
  reviews,
  onAddReview,
  onLikeReview,
  onReportReview,
  user,
  onSetPriceAlert,
  onOpenAuthModal,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "prices" | "reviews">("overview");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [targetAlertPrice, setTargetAlertPrice] = useState<number>(0);
  const [alertSubmitted, setAlertSubmitted] = useState<boolean>(false);

  // New review state
  const [newRating, setNewRating] = useState<number>(5);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [newRole, setNewRole] = useState<string>("Fitness Enthusiast");
  const [newPros, setNewPros] = useState<string>("");
  const [newCons, setNewCons] = useState<string>("");
  const [reviewSuccess, setReviewSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setTargetAlertPrice(Math.round(product.price * 0.9)); // default 10% drop target
      setAlertSubmitted(false);
      setReviewSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const bestDeal = product.retailers.find((r) => r.isBestDeal) || product.retailers[0];

  const handlePriceAlertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuthModal();
      return;
    }
    onSetPriceAlert({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      currentPrice: product.price,
      targetPrice: targetAlertPrice,
      retailerName: bestDeal.retailerName,
    });
    setAlertSubmitted(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuthModal();
      return;
    }
    if (!newTitle.trim() || !newContent.trim()) return;

    onAddReview({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      authorName: user.name,
      authorAvatar: user.avatar,
      authorRole: newRole,
      rating: newRating,
      title: newTitle,
      content: newContent,
      timeUsed: "1 month",
      likes: 0,
      commentsCount: 0,
      comments: [],
      date: "Just now",
      verifiedPurchase: true,
      pros: newPros.split(",").map((p) => p.trim()).filter(Boolean),
      cons: newCons.split(",").map((c) => c.trim()).filter(Boolean),
    });

    setReviewSuccess(true);
    setNewTitle("");
    setNewContent("");
    setNewPros("");
    setNewCons("");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/50 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-slate-900 text-white">
              {product.brand}
            </span>
            <span className="text-xs font-semibold text-slate-500">{product.category}</span>
            <span className="hidden sm:inline-flex text-xs px-2 py-0.5 rounded-md bg-slate-200/70 text-slate-700 font-medium">
              {product.wearableType}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenShare(product)}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200/60 rounded-xl transition-colors"
              title="Share Device"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleSave(product.id)}
              className={`p-2 rounded-xl transition-colors ${
                isSaved
                  ? "text-rose-600 bg-rose-50 hover:bg-rose-100"
                  : "text-slate-500 hover:text-rose-600 hover:bg-slate-200/60"
              }`}
              title={isSaved ? "Saved" : "Save"}
            >
              <Heart className={`w-4 h-4 ${isSaved ? "fill-rose-600" : ""}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
              id="close-product-modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body with scrolling */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Top Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Image Column */}
            <div className="md:col-span-5 space-y-3">
              <div className="h-64 rounded-2xl bg-slate-100 overflow-hidden relative flex items-center justify-center border border-slate-200/80">
                <img
                  src={selectedImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/90 text-white text-[11px] font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Stamina Index {product.staminaScore}/100</span>
                </div>
              </div>

              {/* Gallery Thumbnails if available */}
              {product.galleryImages && product.galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === img ? "border-emerald-600 scale-105" : "border-slate-200 opacity-70"
                      }`}
                    >
                      <img src={img} alt="thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Column */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "fill-amber-400" : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-slate-800">{product.rating}</span>
                  <span className="text-xs text-slate-500">
                    ({product.reviewsCount} customer reviews)
                  </span>
                </div>

                <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {product.name}
                </h1>

                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{product.description}</p>

                {/* Best For Pills */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {product.bestFor.map((bf, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                    >
                      {bf}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price & Primary Purchase Card */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3 shadow-lg">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium">Best Available Deal:</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-extrabold font-mono-num text-emerald-400">
                        ${product.price}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-slate-400 line-through font-mono-num">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-xs text-slate-300 font-medium">
                        at {bestDeal.retailerName}
                      </span>
                    </div>
                  </div>

                  <div className="text-right text-xs">
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold">
                      {bestDeal.shippingText}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={bestDeal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-md flex items-center justify-center gap-1.5 transition-all"
                    id="modal-retailer-view-deal-btn"
                  >
                    <span>View Deal at {bestDeal.retailerName}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => onToggleComparison(product.id)}
                    className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isInComparison
                        ? "bg-emerald-700 text-white"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
                    }`}
                  >
                    <Scale className="w-4 h-4" />
                    <span>{isInComparison ? "In Comparison" : "Add to Compare"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs for Deep Inspection */}
          <div className="border-b border-slate-200 flex items-center gap-4 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-3 transition-colors relative ${
                activeTab === "overview"
                  ? "text-emerald-700 font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Overview & Capabilities
              {activeTab === "overview" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("prices")}
              className={`pb-3 transition-colors relative flex items-center gap-1 ${
                activeTab === "prices"
                  ? "text-emerald-700 font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Where to Buy ({product.retailers.length})</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Deals
              </span>
              {activeTab === "prices" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("specs")}
              className={`pb-3 transition-colors relative ${
                activeTab === "specs"
                  ? "text-emerald-700 font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              Technical Specs
              {activeTab === "specs" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-3 transition-colors relative flex items-center gap-1 ${
                activeTab === "reviews"
                  ? "text-emerald-700 font-bold"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              <span>Community Reviews ({productReviews.length})</span>
              {activeTab === "reviews" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600"></div>
              )}
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Biometric Scores Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      ⚡ Stamina Score
                    </span>
                    <span className="text-xl font-extrabold font-mono-num text-amber-900">
                      {product.staminaScore}/100
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-amber-800">
                    High accuracy for aerobic pacing, real-time endurance management, and glycogen depletion.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-800 uppercase tracking-wider">
                      😴 Sleep Score
                    </span>
                    <span className="text-xl font-extrabold font-mono-num text-indigo-900">
                      {product.sleepScore}/100
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-indigo-800">
                    Sleep staging fidelity, HRV nighttime tracking, and breathing disturbance detection.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                      🔋 Recovery Score
                    </span>
                    <span className="text-xl font-extrabold font-mono-num text-emerald-900">
                      {product.recoveryScore}/100
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-emerald-800">
                    Autonomic nervous balance and physiological readiness to execute training.
                  </p>
                </div>
              </div>

              {/* Capabilities Check Matrix */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-3">
                  Key Built-in Capabilities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Heart Rate & HRV</span>
                    <span className="font-bold text-emerald-600">✓ Included</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">GPS Tracking</span>
                    <span className={`font-bold ${product.hasGps ? "text-emerald-600" : "text-slate-400"}`}>
                      {product.hasGps ? "✓ Onboard" : "— Phone GPS"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Blood Oxygen (SpO2)</span>
                    <span className={`font-bold ${product.hasSpO2 ? "text-emerald-600" : "text-slate-400"}`}>
                      {product.hasSpO2 ? "✓ Continuous" : "— None"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">ECG Electrocardiogram</span>
                    <span className={`font-bold ${product.hasEcg ? "text-emerald-600" : "text-slate-400"}`}>
                      {product.hasEcg ? "✓ Medical ECG" : "— None"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Temperature Sensor</span>
                    <span className={`font-bold ${product.hasTemp ? "text-emerald-600" : "text-slate-400"}`}>
                      {product.hasTemp ? "✓ Skin Temp" : "— None"}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Water Resistance</span>
                    <span className="font-bold text-slate-800">{product.waterResistance}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Battery Duration</span>
                    <span className="font-bold text-slate-800">{product.batteryLife}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Weight</span>
                    <span className="font-bold text-slate-800">{product.weightGrams}g</span>
                  </div>
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Why You'll Love It (Pros)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-950 font-normal">
                    {product.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-slate-600" />
                    Things to Consider (Trade-offs)
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-normal">
                    {product.cons.map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-slate-500 font-bold">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Where to Buy (Retailer Matrix & Price Alert) */}
          {activeTab === "prices" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
                  Live Price Comparison across Authorized Retailers
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  We track legitimate authorized retailers in real time to find the lowest available price.
                </p>

                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-3.5">Retailer</th>
                        <th className="p-3.5">Price</th>
                        <th className="p-3.5">Shipping</th>
                        <th className="p-3.5">Rating</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {product.retailers.map((deal) => (
                        <tr key={deal.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5">
                            <div className="font-bold text-slate-900 flex items-center gap-2">
                              <span>{deal.retailerName}</span>
                              {deal.isBestDeal && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                                  Best Deal
                                </span>
                              )}
                            </div>
                            {deal.couponCode && (
                              <span className="text-[10px] text-emerald-700 font-mono">
                                Use code: <strong>{deal.couponCode}</strong>
                              </span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <div className="flex items-baseline gap-1.5">
                              <span className="text-base font-extrabold font-mono-num text-slate-900">
                                ${deal.price}
                              </span>
                              {deal.originalPrice && (
                                <span className="text-[11px] text-slate-400 line-through font-mono-num">
                                  ${deal.originalPrice}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-3.5 text-slate-600">{deal.shippingText}</td>
                          <td className="p-3.5">
                            <div className="flex items-center gap-1 text-slate-800 font-bold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{deal.rating}</span>
                            </div>
                          </td>
                          <td className="p-3.5 text-right">
                            <a
                              href={deal.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-all"
                            >
                              <span>View Deal</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Price Alert Subscription Box */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-400" />
                  <h4 className="text-sm font-bold text-white">
                    Set a SmartStamina Price Drop Alert
                  </h4>
                </div>
                <p className="text-xs text-slate-300">
                  We'll monitor prices 24/7 across all retailers and notify your Google account the instant the price drops below your target.
                </p>

                {alertSubmitted ? (
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Price alert set for ${targetAlertPrice}! We'll notify you via your account.</span>
                  </div>
                ) : (
                  <form onSubmit={handlePriceAlertSubmit} className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                      <span className="text-xs text-slate-400">Target Price: $</span>
                      <input
                        type="number"
                        min="1"
                        max={product.price - 1}
                        value={targetAlertPrice}
                        onChange={(e) => setTargetAlertPrice(Number(e.target.value))}
                        className="w-20 bg-transparent text-sm font-bold text-white focus:outline-hidden font-mono-num"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Notify Me on Drop</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: Technical Specs */}
          {activeTab === "specs" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Detailed Hardware & System Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Display Type</span>
                  <span className="font-bold text-slate-900">{product.specs.display || "Screenless form factor"}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Dimensions</span>
                  <span className="font-bold text-slate-900">{product.specs.dimensions || "Standard ergonomic sizing"}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Charging Speed</span>
                  <span className="font-bold text-slate-900">{product.specs.chargingTime || "Standard magnetic"}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">App Ecosystem</span>
                  <span className="font-bold text-slate-900">{product.specs.appEcosystem || "iOS & Android"}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Sensors Embedded</span>
                  <span className="font-bold text-slate-900">{product.sensors.join(", ")}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Wireless Connectivity</span>
                  <span className="font-bold text-slate-900">{product.connectivity.join(" • ")}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Manufacturer Warranty</span>
                  <span className="font-bold text-slate-900">{product.specs.warranty || "1 Year Limited"}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Hardware Release Year</span>
                  <span className="font-bold text-slate-900">{product.specs.releaseYear || 2024}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Community Reviews & Discussion */}
          {activeTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                    Community Reviews & Real-World Experiences
                  </h3>
                  <p className="text-xs text-slate-500">
                    Read genuine endurance feedback from athletes and biohackers using this device.
                  </p>
                </div>
              </div>

              {/* Review Submission Form */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Write a Community Review for {product.name}
                </h4>

                {reviewSuccess ? (
                  <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>Your review has been published to the SmartStamina community!</span>
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Your Rating
                        </label>
                        <select
                          value={newRating}
                          onChange={(e) => setNewRating(Number(e.target.value))}
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs font-bold text-slate-800"
                        >
                          <option value={5}>★★★★★ (5/5) Outstanding</option>
                          <option value={4}>★★★★☆ (4/5) Very Good</option>
                          <option value={3}>★★★☆☆ (3/5) Average</option>
                          <option value={2}>★★☆☆☆ (2/5) Below Expectations</option>
                          <option value={1}>★☆☆☆☆ (1/5) Poor</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Your Athletic Profile
                        </label>
                        <input
                          type="text"
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          placeholder="e.g. Marathoner, Cyclist, Biohacker"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Review Title
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Battery life exceeds expectations during 50k runs"
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                        Your Detailed Experience
                      </label>
                      <textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        placeholder="Share your experience regarding stamina metrics, sleep tracking, battery life, and comfort..."
                        rows={3}
                        className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Standout Pros (comma separated)
                        </label>
                        <input
                          type="text"
                          value={newPros}
                          onChange={(e) => setNewPros(e.target.value)}
                          placeholder="e.g. Light 5g weight, High HRV accuracy"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          Cons / Downsides (comma separated)
                        </label>
                        <input
                          type="text"
                          value={newCons}
                          onChange={(e) => setNewCons(e.target.value)}
                          placeholder="e.g. Subscription fee, Sizing wait"
                          className="w-full bg-white border border-slate-200 rounded-lg p-2 text-xs text-slate-800"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                    >
                      Publish Review
                    </button>
                  </form>
                )}
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={rev.authorAvatar}
                            alt={rev.authorName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-slate-900">{rev.authorName}</span>
                              {rev.verifiedPurchase && (
                                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                                  Verified Device
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500">{rev.authorRole} • Used {rev.timeUsed}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3.5 h-3.5 ${
                                  i < rev.rating ? "fill-amber-400" : "text-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[11px] text-slate-400">{rev.date}</span>
                        </div>
                      </div>

                      <h5 className="font-bold text-sm text-slate-900">{rev.title}</h5>
                      <p className="text-xs text-slate-600 leading-relaxed">{rev.content}</p>

                      {rev.pros.length > 0 && (
                        <div className="flex flex-wrap gap-1 text-[11px]">
                          {rev.pros.map((p, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                              + {p}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Interaction footer */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <button
                          onClick={() => onLikeReview(rev.id)}
                          className="flex items-center gap-1 text-slate-600 hover:text-emerald-700 font-semibold transition-colors"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Helpful ({rev.likes})</span>
                        </button>

                        <button
                          onClick={() => {
                            const reason = prompt("Select reason to report: Spam, Medical Misinformation, Fake Review, Scam Link");
                            if (reason) onReportReview(rev.id, reason);
                          }}
                          className="flex items-center gap-1 text-slate-400 hover:text-rose-600 text-[11px] transition-colors"
                        >
                          <Flag className="w-3 h-3" />
                          <span>Report</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic py-4 text-center">
                    Be the first endurance athlete to review {product.name}!
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Medical Disclaimer Reminder */}
        <div className="p-3 px-6 bg-slate-100 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              Consumer Technology Discovery: Wearable measurements provide fitness guidance and do not constitute medical diagnoses.
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-700 hover:text-slate-900 shrink-0 ml-4"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
