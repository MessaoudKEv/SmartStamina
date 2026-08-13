import React, { useState, useEffect } from "react";
import {
  Compass,
  Activity,
  Scale,
  Flame,
  Layers,
  Award,
  BookOpen,
  Filter,
  SlidersHorizontal,
  Search,
  Sparkles,
  Zap,
  Check,
  ChevronDown,
  X,
  RefreshCw,
  Heart,
  Grid,
  ListFilter
} from "lucide-react";

import {
  WearableProduct,
  UserAccount,
  CommunityReview,
  ModerationReport,
  PriceAlert
} from "./types";
import { PRODUCTS_DATA } from "./data/products";
import { INITIAL_REVIEWS, INITIAL_MODERATION_REPORTS } from "./data/community";

// Sub-components
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SmartSearchAdvisor } from "./components/SmartSearchAdvisor";
import { ProductCard } from "./components/ProductCard";
import { ProductDetailModal } from "./components/ProductDetailModal";
import { ComparisonMatrix } from "./components/ComparisonMatrix";
import { ComparisonDrawer } from "./components/ComparisonDrawer";
import { WizardModal } from "./components/WizardModal";
import { GoalSection } from "./components/GoalSection";
import { BrandDirectory } from "./components/BrandDirectory";
import { CommunitySection } from "./components/CommunitySection";
import { ModerationDashboard } from "./components/ModerationDashboard";
import { UserDashboardModal } from "./components/UserDashboardModal";
import { GoogleAuthModal } from "./components/GoogleAuthModal";
import { ShareModal } from "./components/ShareModal";
import { DealsSection } from "./components/DealsSection";
import { EditorialGuides } from "./components/EditorialGuides";
import { Footer } from "./components/Footer";

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<string>("discover");

  // Data state
  const [products] = useState<WearableProduct[]>(PRODUCTS_DATA);
  const [reviews, setReviews] = useState<CommunityReview[]>(() => {
    const local = localStorage.getItem("smartstamina_reviews");
    return local ? JSON.parse(local) : INITIAL_REVIEWS;
  });
  const [moderationReports, setModerationReports] = useState<ModerationReport[]>(() => {
    const local = localStorage.getItem("smartstamina_moderation");
    return local ? JSON.parse(local) : INITIAL_MODERATION_REPORTS;
  });

  // User State
  const [user, setUser] = useState<UserAccount | null>(() => {
    const local = localStorage.getItem("smartstamina_user");
    return local ? JSON.parse(local) : null;
  });

  // User Saved & Comparison state
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const local = localStorage.getItem("smartstamina_saved");
    return local ? JSON.parse(local) : ["garmin-fenix-8-solar", "oura-ring-gen-3-horizon"];
  });

  const [comparisonIds, setComparisonIds] = useState<string[]>(() => {
    const local = localStorage.getItem("smartstamina_compare");
    return local ? JSON.parse(local) : ["garmin-fenix-8-solar", "coros-pace-3"];
  });

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSmartAdvisorQuery, setActiveSmartAdvisorQuery] = useState<string | null>(null);
  const [showSmartAdvisor, setShowSmartAdvisor] = useState(false);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedFormFactor, setSelectedFormFactor] = useState<string>("All");
  const [filterSubscriptionFree, setFilterSubscriptionFree] = useState(false);
  const [filterHasGps, setFilterHasGps] = useState(false);
  const [filterHasEcg, setFilterHasEcg] = useState(false);
  const [filterHasHrv, setFilterHasHrv] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sortBy, setSortBy] = useState<string>("staminaScore"); // 'staminaScore', 'rating', 'priceAsc', 'priceDesc'

  // Selected Goal for GoalSection
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>("stamina");

  // Modals
  const [detailProduct, setDetailProduct] = useState<WearableProduct | null>(null);
  const [shareProduct, setShareProduct] = useState<WearableProduct | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showModeration, setShowModeration] = useState(false);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Local storage syncing
  useEffect(() => {
    localStorage.setItem("smartstamina_saved", JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem("smartstamina_compare", JSON.stringify(comparisonIds));
  }, [comparisonIds]);

  useEffect(() => {
    localStorage.setItem("smartstamina_reviews", JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem("smartstamina_moderation", JSON.stringify(moderationReports));
  }, [moderationReports]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("smartstamina_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("smartstamina_user");
    }
  }, [user]);

  // Actions
  const handleToggleSave = (productId: string) => {
    if (savedIds.includes(productId)) {
      setSavedIds(savedIds.filter((id) => id !== productId));
      triggerToast("Removed from saved wearables");
    } else {
      setSavedIds([...savedIds, productId]);
      triggerToast("Saved to My SmartStamina");
    }
  };

  const handleToggleComparison = (productId: string) => {
    if (comparisonIds.includes(productId)) {
      setComparisonIds(comparisonIds.filter((id) => id !== productId));
      triggerToast("Removed from comparison tray");
    } else {
      if (comparisonIds.length >= 4) {
        triggerToast("Maximum 4 wearables can be compared simultaneously");
        return;
      }
      setComparisonIds([...comparisonIds, productId]);
      triggerToast("Added to device comparison");
    }
  };

  const handleRemoveFromCompare = (productId: string) => {
    setComparisonIds(comparisonIds.filter((id) => id !== productId));
  };

  const handleClearCompare = () => {
    setComparisonIds([]);
    triggerToast("Comparison tray cleared");
  };

  const handleGoogleAuthSuccess = (authenticatedUser: UserAccount) => {
    setUser(authenticatedUser);
    triggerToast(`Welcome, ${authenticatedUser.name}! Signed in via Google.`);
  };

  const handleSignOut = () => {
    setUser(null);
    triggerToast("Signed out successfully");
  };

  const handleAddReview = (newRev: Partial<CommunityReview>) => {
    const fullRev: CommunityReview = {
      id: `rev-${Date.now()}`,
      productId: newRev.productId || "",
      productName: newRev.productName || "",
      productImage: newRev.productImage || "",
      authorName: newRev.authorName || "Anonymous Athlete",
      authorAvatar: newRev.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      authorRole: newRev.authorRole || "Fitness Enthusiast",
      rating: newRev.rating || 5,
      title: newRev.title || "",
      content: newRev.content || "",
      timeUsed: newRev.timeUsed || "1 month",
      likes: 0,
      commentsCount: 0,
      comments: [],
      date: "Just now",
      verifiedPurchase: true,
      pros: newRev.pros || [],
      cons: newRev.cons || [],
    };
    setReviews([fullRev, ...reviews]);
    triggerToast("Thank you! Your verified review has been published.");
  };

  const handleLikeReview = (reviewId: string) => {
    setReviews(
      reviews.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
    triggerToast("Marked review as helpful");
  };

  const handleAddComment = (reviewId: string, commentText: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const newComment = {
      id: `comm-${Date.now()}`,
      reviewId,
      authorName: user.name,
      authorAvatar: user.avatar,
      text: commentText,
      date: "Just now",
      likes: 0,
    };

    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              commentsCount: (r.commentsCount || 0) + 1,
              comments: [...(r.comments || []), newComment],
            }
          : r
      )
    );
    triggerToast("Comment added to community discussion");
  };

  const handleReportReview = (reviewId: string, reason: string) => {
    const targetRev = reviews.find((r) => r.id === reviewId);
    const newReport: ModerationReport = {
      id: `mod-${Date.now()}`,
      targetType: "Review",
      targetId: reviewId,
      reporterEmail: user?.email || "anonymous.athlete@smartstamina.com",
      reason: (reason as ModerationReport["reason"]) || "Spam",
      snippet: targetRev?.content.slice(0, 80) || "Reported community submission",
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "Pending",
    };
    setModerationReports([newReport, ...moderationReports]);
    triggerToast("Report submitted to SmartStamina Trust & Moderation team.");
  };

  const handleResolveReport = (reportId: string, action: "Approved" | "Removed") => {
    setModerationReports(
      moderationReports.map((rep) =>
        rep.id === reportId ? { ...rep, status: "Reviewed" } : rep
      )
    );
    if (action === "Removed") {
      const rep = moderationReports.find((r) => r.id === reportId);
      if (rep && rep.targetType === "Review") {
        setReviews(reviews.filter((r) => r.id !== rep.targetId));
      }
    }
    triggerToast(`Report resolved (${action})`);
  };

  const handleSetPriceAlert = (alertData: Omit<PriceAlert, "id" | "createdAt">) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const newAlert: PriceAlert = {
      ...alertData,
      id: `alert-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const updatedUser = {
      ...user,
      priceAlerts: [...user.priceAlerts, newAlert],
    };
    setUser(updatedUser);
    triggerToast(`Price drop alert set for $${alertData.targetPrice}!`);
  };

  const handleDeletePriceAlert = (alertId: string) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      priceAlerts: user.priceAlerts.filter((a) => a.id !== alertId),
    };
    setUser(updatedUser);
    triggerToast("Price alert removed");
  };

  const handleSaveComparisonSet = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const updatedUser = {
      ...user,
      comparisonProductIds: comparisonIds,
    };
    setUser(updatedUser);
    triggerToast("Comparison set saved to your Google account.");
  };

  // Filtering products
  const filteredProducts = products
    .filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;
      if (selectedFormFactor !== "All" && p.wearableType !== selectedFormFactor) return false;
      if (filterSubscriptionFree && p.subscriptionRequired) return false;
      if (filterHasGps && !p.hasGps) return false;
      if (filterHasEcg && !p.hasEcg) return false;
      if (filterHasHrv && !p.hasHrv) return false;
      if (p.price > maxPrice) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesTagline = p.tagline.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesBestFor = p.bestFor.some((bf) => bf.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesTagline && !matchesCategory && !matchesBestFor) {
          return false;
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "staminaScore") return b.staminaScore - a.staminaScore;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "priceAsc") return a.price - b.price;
      if (sortBy === "priceDesc") return b.price - a.price;
      return 0;
    });

  // Selected comparison products
  const selectedComparisonProducts = comparisonIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as WearableProduct[];

  // Execute Search Handler
  const handleExecuteSearch = (queryOverride?: string) => {
    const q = queryOverride !== undefined ? queryOverride : searchQuery;
    if (!q.trim()) return;
    setActiveSmartAdvisorQuery(q);
    setShowSmartAdvisor(true);
    setActiveTab("discover");
  };

  const handleSelectGoal = (goalId: string | null) => {
    setSelectedGoalId(goalId);
    setActiveTab("goals");
  };

  const handleExploreDevices = () => {
    setActiveTab("discover");
    // Scroll down to products grid
    const el = document.getElementById("catalog-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={savedIds.length}
        comparisonCount={comparisonIds.length}
        user={user}
        onOpenAuthModal={() => setShowAuthModal(true)}
        onOpenDashboard={() => setShowDashboard(true)}
        onOpenWizard={() => setShowWizard(true)}
        onOpenModeration={() => setShowModeration(true)}
        onOpenComparison={() => setActiveTab("compare")}
        onSearchFocus={() => {
          setShowSmartAdvisor(true);
          const input = document.getElementById("hero-smart-search-input");
          if (input) input.focus();
        }}
        onSignOut={handleSignOut}
      />

      {/* Hero Header on Discover Tab */}
      {activeTab === "discover" && (
        <Hero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onExecuteSearch={handleExecuteSearch}
          onOpenWizard={() => setShowWizard(true)}
          onSelectGoal={handleSelectGoal}
          onExploreDevices={handleExploreDevices}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Smart Advisor Section */}
        {showSmartAdvisor && (
          <SmartSearchAdvisor
            initialQuery={activeSmartAdvisorQuery || searchQuery}
            allProducts={products}
            savedIds={savedIds}
            comparisonIds={comparisonIds}
            onToggleSave={handleToggleSave}
            onToggleComparison={handleToggleComparison}
            onOpenDetail={(p) => setDetailProduct(p)}
            onOpenShare={(p) => setShareProduct(p)}
            onClose={() => setShowSmartAdvisor(false)}
          />
        )}

        {/* Tab 1: Discover / All Devices Catalog */}
        {activeTab === "discover" && (
          <div id="catalog-section" className="space-y-8">
            {/* Header & Filter Controls Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-slate-900 flex items-center gap-2">
                    <span>Performance Wearables Catalog</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      {filteredProducts.length} Devices
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Verified battery benchmarks, stamina index scores, and real-time retailer deals
                  </p>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-hidden focus:border-emerald-500"
                    id="sort-select"
                  >
                    <option value="staminaScore">⚡ Highest Stamina Score</option>
                    <option value="rating">★ Highest Customer Rating</option>
                    <option value="priceAsc">$ Lowest Price First</option>
                    <option value="priceDesc">$$$ Highest Price First</option>
                  </select>
                </div>
              </div>

              {/* Form Factor Quick Filter Tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {[
                  "All",
                  "Smart Ring",
                  "Smartwatch",
                  "Heart Rate Monitor",
                  "Recovery & Breathing",
                  "Sleep Tracker",
                  "Cycling Computer",
                  "Fitness Band"
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Advanced Filter Toggles */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setFilterSubscriptionFree(!filterSubscriptionFree)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors flex items-center gap-1 ${
                      filterSubscriptionFree
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {filterSubscriptionFree && <Check className="w-3.5 h-3.5" />}
                    <span>No Subscription Required</span>
                  </button>

                  <button
                    onClick={() => setFilterHasGps(!filterHasGps)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors flex items-center gap-1 ${
                      filterHasGps
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {filterHasGps && <Check className="w-3.5 h-3.5" />}
                    <span>Standalone GPS</span>
                  </button>

                  <button
                    onClick={() => setFilterHasEcg(!filterHasEcg)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors flex items-center gap-1 ${
                      filterHasEcg
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {filterHasEcg && <Check className="w-3.5 h-3.5" />}
                    <span>ECG Electrocardiogram</span>
                  </button>

                  <button
                    onClick={() => setFilterHasHrv(!filterHasHrv)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors flex items-center gap-1 ${
                      filterHasHrv
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {filterHasHrv && <Check className="w-3.5 h-3.5" />}
                    <span>HRV Recovery Tracking</span>
                  </button>
                </div>

                {/* Max price slider */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-semibold">Max Price:</span>
                  <span className="font-bold text-slate-900 font-mono-num">${maxPrice}</span>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-28 accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSaved={savedIds.includes(product.id)}
                    isInComparison={comparisonIds.includes(product.id)}
                    onToggleSave={handleToggleSave}
                    onToggleComparison={handleToggleComparison}
                    onOpenDetail={(p) => setDetailProduct(p)}
                    onOpenShare={(p) => setShareProduct(p)}
                  />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
                <Search className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-display text-xl font-bold text-slate-900">
                  No Wearables Match Your Exact Filters
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Try adjusting the price slider, clearing the subscription-free filter, or asking the Smart Advisor.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedBrand("All");
                    setSelectedFormFactor("All");
                    setFilterSubscriptionFree(false);
                    setFilterHasGps(false);
                    setFilterHasEcg(false);
                    setFilterHasHrv(false);
                    setMaxPrice(1000);
                    setSearchQuery("");
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Goal Section */}
        {activeTab === "goals" && (
          <GoalSection
            selectedGoalId={selectedGoalId}
            onSelectGoal={setSelectedGoalId}
            allProducts={products}
            savedIds={savedIds}
            comparisonIds={comparisonIds}
            onToggleSave={handleToggleSave}
            onToggleComparison={handleToggleComparison}
            onOpenDetail={(p) => setDetailProduct(p)}
            onOpenShare={(p) => setShareProduct(p)}
          />
        )}

        {/* Tab 3: Comparison Matrix */}
        {activeTab === "compare" && (
          <ComparisonMatrix
            selectedProducts={selectedComparisonProducts}
            allProducts={products}
            onRemoveProduct={handleRemoveFromCompare}
            onAddProduct={(id) => handleToggleComparison(id)}
            onOpenDetail={(p) => setDetailProduct(p)}
            user={user}
            onSaveComparison={handleSaveComparisonSet}
            onOpenShare={(p) => setShareProduct(p)}
            onOpenAuthModal={() => setShowAuthModal(true)}
          />
        )}

        {/* Tab 4: Deals Section */}
        {activeTab === "deals" && (
          <DealsSection
            products={products}
            onOpenDetail={(p) => setDetailProduct(p)}
          />
        )}

        {/* Tab 5: Brands Directory */}
        {activeTab === "brands" && (
          <BrandDirectory
            allProducts={products}
            savedIds={savedIds}
            comparisonIds={comparisonIds}
            onToggleSave={handleToggleSave}
            onToggleComparison={handleToggleComparison}
            onOpenDetail={(p) => setDetailProduct(p)}
            onOpenShare={(p) => setShareProduct(p)}
          />
        )}

        {/* Tab 6: Community Section */}
        {activeTab === "community" && (
          <CommunitySection
            reviews={reviews}
            allProducts={products}
            user={user}
            onLikeReview={handleLikeReview}
            onReportReview={handleReportReview}
            onAddReview={handleAddReview}
            onAddComment={handleAddComment}
            onOpenAuthModal={() => setShowAuthModal(true)}
            onOpenDetail={(p) => setDetailProduct(p)}
          />
        )}

        {/* Tab 7: Editorial Guides */}
        {activeTab === "guides" && (
          <EditorialGuides
            allProducts={products}
            onOpenDetail={(p) => setDetailProduct(p)}
          />
        )}
      </main>

      {/* Floating Comparison Drawer when devices are in tray */}
      {comparisonIds.length > 0 && activeTab !== "compare" && (
        <ComparisonDrawer
          selectedProducts={selectedComparisonProducts}
          onRemoveProduct={handleRemoveFromCompare}
          onClearAll={handleClearCompare}
          onOpenComparison={() => setActiveTab("compare")}
        />
      )}

      {/* Modals */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          isSaved={savedIds.includes(detailProduct.id)}
          isInComparison={comparisonIds.includes(detailProduct.id)}
          onToggleSave={handleToggleSave}
          onToggleComparison={handleToggleComparison}
          onOpenShare={(p) => setShareProduct(p)}
          reviews={reviews}
          onAddReview={handleAddReview}
          onLikeReview={handleLikeReview}
          onReportReview={handleReportReview}
          user={user}
          onSetPriceAlert={handleSetPriceAlert}
          onOpenAuthModal={() => setShowAuthModal(true)}
        />
      )}

      {showWizard && (
        <WizardModal
          onClose={() => setShowWizard(false)}
          allProducts={products}
          onOpenDetail={(p) => setDetailProduct(p)}
          onToggleComparison={handleToggleComparison}
        />
      )}

      {showAuthModal && (
        <GoogleAuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={handleGoogleAuthSuccess}
        />
      )}

      {showDashboard && (
        <UserDashboardModal
          user={user}
          allProducts={products}
          onClose={() => setShowDashboard(false)}
          onRemoveSaved={handleToggleSave}
          onOpenDetail={(p) => setDetailProduct(p)}
          onOpenComparison={() => {
            setShowDashboard(false);
            setActiveTab("compare");
          }}
          onDeletePriceAlert={handleDeletePriceAlert}
          onSignOut={handleSignOut}
          onOpenAuthModal={() => setShowAuthModal(true)}
        />
      )}

      {shareProduct && (
        <ShareModal
          product={shareProduct}
          onClose={() => setShareProduct(null)}
        />
      )}

      {showModeration && (
        <ModerationDashboard
          reports={moderationReports}
          onResolveReport={handleResolveReport}
          onClose={() => setShowModeration(false)}
        />
      )}

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenWizard={() => setShowWizard(true)}
        onOpenModeration={() => setShowModeration(true)}
      />
    </div>
  );
}
