import React from "react";
import {
  Activity,
  Heart,
  Scale,
  Sparkles,
  Search,
  User,
  ShieldAlert,
  Zap,
  Bookmark,
  Bell,
  LogOut,
  ChevronDown,
  Compass,
  Layers,
  Flame,
  Award,
  BookOpen
} from "lucide-react";
import { UserAccount } from "../types";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  savedCount: number;
  comparisonCount: number;
  user: UserAccount | null;
  onOpenAuthModal: () => void;
  onOpenDashboard: () => void;
  onOpenWizard: () => void;
  onOpenModeration: () => void;
  onOpenComparison: () => void;
  onSearchFocus: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  savedCount,
  comparisonCount,
  user,
  onOpenAuthModal,
  onOpenDashboard,
  onOpenWizard,
  onOpenModeration,
  onOpenComparison,
  onSearchFocus,
  onSignOut,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-xs">
      {/* Top micro-bar with affiliate & medical disclaimer reminder */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Price Comparison
            </span>
            <span className="hidden sm:inline text-slate-400">
              Discover & compare human performance wearables — we find the best retailer deals.
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setActiveTab("guides")}
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3 h-3 text-amber-400" />
              2026 Buying Guides
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenWizard}
              className="text-emerald-300 hover:text-emerald-200 font-semibold flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Find My Wearable Diagnostic
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab("discover")}
              className="flex items-center gap-2.5 text-left group"
              id="nav-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Zap className="w-5 h-5 fill-current text-white" />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1">
                  SMART<span className="text-emerald-600">STAMINA</span>
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-600">
                  Performance Tech Discovery
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button
                onClick={() => setActiveTab("discover")}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "discover"
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
                id="nav-discover-btn"
              >
                <Compass className="w-4 h-4" />
                Discover
              </button>

              <button
                onClick={() => setActiveTab("goals")}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "goals"
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
                id="nav-goals-btn"
              >
                <Activity className="w-4 h-4 text-emerald-600" />
                By Goal
              </button>

              <button
                onClick={() => setActiveTab("compare")}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "compare"
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
                id="nav-compare-btn"
              >
                <Scale className="w-4 h-4" />
                Compare
                {comparisonCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-xs bg-emerald-600 text-white font-bold">
                    {comparisonCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("deals")}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "deals"
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
                id="nav-deals-btn"
              >
                <Flame className="w-4 h-4 text-orange-500" />
                Deals
              </button>

              <button
                onClick={() => setActiveTab("brands")}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "brands"
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
                id="nav-brands-btn"
              >
                <Layers className="w-4 h-4" />
                Brands
              </button>

              <button
                onClick={() => setActiveTab("community")}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  activeTab === "community"
                    ? "bg-emerald-50 text-emerald-800"
                    : "text-slate-700 hover:text-slate-950 hover:bg-slate-100"
                }`}
                id="nav-community-btn"
              >
                <Award className="w-4 h-4" />
                Community
              </button>
            </nav>
          </div>

          {/* Right Action Icons & Auth */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Trigger */}
            <button
              onClick={onSearchFocus}
              className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-500 rounded-lg text-xs font-medium transition-colors border border-slate-200"
              title="Search wearables or ask Smart Advisor"
              id="nav-search-input-trigger"
            >
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <span>Ask Smart Advisor...</span>
              <kbd className="px-1.5 py-0.5 bg-white rounded border border-slate-300 text-[10px] text-slate-500">
                ⌘K
              </kbd>
            </button>

            {/* Find My Wearable button */}
            <button
              onClick={onOpenWizard}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-lg text-xs font-bold tracking-wide shadow-xs hover:shadow transition-all"
              id="nav-find-wearable-btn"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Find My Wearable</span>
            </button>

            {/* Saved Items Button */}
            <button
              onClick={onOpenDashboard}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="View Saved & Wishlist"
              id="nav-saved-btn"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Compare Drawer Quick Button */}
            <button
              onClick={onOpenComparison}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Open Device Comparison"
              id="nav-comparison-tray-btn"
            >
              <Scale className="w-5 h-5" />
              {comparisonCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </button>

            {/* Google User Sign-In / Account Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
                  id="user-account-menu-btn"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-emerald-500"
                  />
                  <span className="hidden md:inline text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-700 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Google Connected
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenDashboard();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      id="dropdown-my-stamina-btn"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
                      My SmartStamina Hub
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setActiveTab("compare");
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Scale className="w-3.5 h-3.5 text-slate-500" />
                      Saved Comparisons ({user.comparisonProductIds.length})
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenDashboard();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Bell className="w-3.5 h-3.5 text-amber-500" />
                      Price Drop Alerts ({user.priceAlerts.length})
                    </button>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenModeration();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                      id="dropdown-moderation-btn"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
                      Trust & Moderation Portal
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onSignOut();
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                      id="dropdown-signout-btn"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                id="nav-google-signin-btn"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
