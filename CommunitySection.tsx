import React, { useState } from "react";
import {
  MessageSquare,
  Star,
  ThumbsUp,
  Flag,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Send,
  Plus,
  Share2,
  Filter
} from "lucide-react";
import { CommunityReview, UserAccount, WearableProduct } from "../types";

interface CommunitySectionProps {
  reviews: CommunityReview[];
  allProducts: WearableProduct[];
  user: UserAccount | null;
  onLikeReview: (reviewId: string) => void;
  onReportReview: (reviewId: string, reason: string) => void;
  onAddReview: (review: Partial<CommunityReview>) => void;
  onAddComment: (reviewId: string, commentText: string) => void;
  onOpenAuthModal: () => void;
  onOpenDetail: (product: WearableProduct) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  reviews,
  allProducts,
  user,
  onLikeReview,
  onReportReview,
  onAddReview,
  onAddComment,
  onOpenAuthModal,
  onOpenDetail,
}) => {
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [showReviewForm, setShowReviewForm] = useState(false);

  // New review form states
  const [selectedProductId, setSelectedProductId] = useState<string>(allProducts[0]?.id || "");
  const [rating, setRating] = useState<number>(5);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [role, setRole] = useState<string>("Marathon Runner");
  const [prosText, setProsText] = useState<string>("");
  const [consText, setConsText] = useState<string>("");

  const filteredReviews = filterRating
    ? reviews.filter((r) => r.rating === filterRating)
    : reviews;

  const handlePostReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuthModal();
      return;
    }

    const prod = allProducts.find((p) => p.id === selectedProductId);
    if (!prod) return;

    onAddReview({
      productId: prod.id,
      productName: prod.name,
      productImage: prod.image,
      authorName: user.name,
      authorAvatar: user.avatar,
      authorRole: role,
      rating,
      title,
      content,
      timeUsed: "1-3 months",
      likes: 0,
      commentsCount: 0,
      comments: [],
      date: "Just now",
      verifiedPurchase: true,
      pros: prosText.split(",").map((p) => p.trim()).filter(Boolean),
      cons: consText.split(",").map((c) => c.trim()).filter(Boolean),
    });

    setShowReviewForm(false);
    setTitle("");
    setContent("");
    setProsText("");
    setConsText("");
  };

  const handleSendComment = (reviewId: string) => {
    const text = commentInputs[reviewId];
    if (!text || !text.trim()) return;
    if (!user) {
      onOpenAuthModal();
      return;
    }
    onAddComment(reviewId, text);
    setCommentInputs({ ...commentInputs, [reviewId]: "" });
  };

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
          <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
          <span>Verified Athlete Community</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Real-World Human Performance Reviews
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Honest feedback from endurance athletes, biohackers, and sleep enthusiasts testing battery longevity, GPS tracking, and real-time stamina metrics.
        </p>
      </div>

      {/* Action and Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
        {/* Rating filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setFilterRating(null)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
              filterRating === null
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          {[5, 4, 3].map((stars) => (
            <button
              key={stars}
              onClick={() => setFilterRating(stars)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                filterRating === stars
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{stars} Stars</span>
            </button>
          ))}
        </div>

        {/* Post review button */}
        <button
          onClick={() => {
            if (!user) onOpenAuthModal();
            else setShowReviewForm(!showReviewForm);
          }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Write Device Review</span>
        </button>
      </div>

      {/* Review Submission Form Popup */}
      {showReviewForm && (
        <div className="p-6 rounded-3xl bg-slate-900 text-white border border-emerald-500/40 shadow-xl space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Share Your Wearable Experience</span>
            </h3>
            <button
              onClick={() => setShowReviewForm(false)}
              className="text-slate-400 hover:text-white text-xs"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handlePostReview} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Wearable Device
                </label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-white"
                >
                  {allProducts.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.brand} — {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs font-bold text-amber-400"
                >
                  <option value={5}>★★★★★ (5/5) Outstanding</option>
                  <option value={4}>★★★★☆ (4/5) Great</option>
                  <option value={3}>★★★☆☆ (3/5) Average</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Your Primary Athletic Role
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="e.g. Marathoner, Cyclist, Biohacker"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Headline Summary
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Real-Time Stamina metric is game-changing for mountain races"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                Detailed Review
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Discuss battery life, sleep tracking accuracy, heart rate lag, and comfort during workouts..."
                rows={3}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Standout Pros (comma separated)
                </label>
                <input
                  type="text"
                  value={prosText}
                  onChange={(e) => setProsText(e.target.value)}
                  placeholder="e.g. 12 day battery, No subscription"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Trade-offs / Cons (comma separated)
                </label>
                <input
                  type="text"
                  value={consText}
                  onChange={(e) => setConsText(e.target.value)}
                  placeholder="e.g. Requires sizing kit"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-md"
            >
              Publish Verified Review
            </button>
          </form>
        </div>
      )}

      {/* Community Review Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => {
          const matchedProd = allProducts.find((p) => p.id === rev.productId);
          return (
            <div
              key={rev.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow space-y-4"
            >
              <div>
                {/* Author row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.authorAvatar}
                      alt={rev.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-900">{rev.authorName}</span>
                        {rev.verifiedPurchase && (
                          <span className="px-1.5 py-0.2 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            Verified Athlete
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">
                        {rev.authorRole} • Used {rev.timeUsed}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating ? "fill-amber-400" : "text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Attached Device Header */}
                <div
                  onClick={() => matchedProd && onOpenDetail(matchedProd)}
                  className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <img
                      src={rev.productImage}
                      alt={rev.productName}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {rev.productName}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold shrink-0">
                    View Specs →
                  </span>
                </div>

                {/* Review Text */}
                <h4 className="font-display font-bold text-base text-slate-900 mt-3">
                  {rev.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">{rev.content}</p>

                {/* Pros and Cons tags */}
                {rev.pros.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
                    {rev.pros.map((pro, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/50"
                      >
                        + {pro}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments Thread */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                {rev.comments && rev.comments.length > 0 && (
                  <div className="space-y-2 bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Community Discussion ({rev.comments.length})
                    </span>
                    {rev.comments.map((comm) => (
                      <div key={comm.id} className="text-xs space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-800">{comm.authorName}</span>
                          <span className="text-[10px] text-slate-400">{comm.date}</span>
                        </div>
                        <p className="text-slate-600 text-[11px]">{comm.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comment Input */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={commentInputs[rev.id] || ""}
                    onChange={(e) =>
                      setCommentInputs({ ...commentInputs, [rev.id]: e.target.value })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSendComment(rev.id);
                    }}
                    placeholder="Ask author a question..."
                    className="flex-1 bg-slate-100 rounded-xl px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleSendComment(rev.id)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <button
                    onClick={() => onLikeReview(rev.id)}
                    className="flex items-center gap-1 text-slate-600 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.likes})</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">{rev.date}</span>
                    <button
                      onClick={() => {
                        const reason = prompt(
                          "Why are you reporting this review? (Spam, Medical Misinformation, Harassment, Scam)"
                        );
                        if (reason) onReportReview(rev.id, reason);
                      }}
                      className="text-slate-400 hover:text-rose-600 text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Flag className="w-3 h-3" />
                      <span>Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
