export type ProductCategory =
  | "Smartwatch"
  | "Smart Ring"
  | "Fitness Band"
  | "Heart Rate Monitor"
  | "Recovery & Breathing"
  | "Sleep Tracker"
  | "Cycling Computer"
  | "Fitness Sensor"
  | "Health Wearable"
  | "Stress & Wellbeing"
  | "Stamina & Endurance";

export type WearablePlacement =
  | "Wrist"
  | "Finger"
  | "Chest"
  | "Arm"
  | "Under-Mattress"
  | "Shoe/Foot"
  | "Clip-on"
  | "Ear";

export type OSCompatibility = "Both" | "Android" | "iPhone";

export type PrimaryGoalType =
  | "Stamina"
  | "Fitness"
  | "Running"
  | "Cycling"
  | "Strength"
  | "Sleep"
  | "Recovery"
  | "Heart Rate"
  | "Stress"
  | "Wellbeing"
  | "General Health";

export interface RetailerDeal {
  id: string;
  retailerName: string;
  price: number;
  originalPrice?: number;
  currency: string;
  couponCode?: string;
  inStock: boolean;
  shippingText: string;
  rating: number; // e.g. 4.9
  url: string;
  isBestDeal?: boolean;
  affiliateTag?: string;
}

export interface WearableProduct {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  wearableType: WearablePlacement;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  galleryImages?: string[];
  batteryLife: string; // e.g. "Up to 7 days"
  batteryLifeDays: number; // for numeric filtering e.g. 7
  staminaScore: number; // 0 - 100 SmartStamina Index
  sleepScore: number;
  recoveryScore: number;
  waterResistance: string; // e.g. "50m (5 ATM)"
  connectivity: string[]; // ["Bluetooth 5.3", "ANT+", "Wi-Fi", "GPS"]
  compatibility: OSCompatibility;
  sensors: string[];
  weightGrams: number;
  subscriptionRequired: boolean;
  subscriptionCost?: string;
  bestFor: string[];
  primaryGoals: PrimaryGoalType[];
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  specs: {
    display?: string;
    dimensions?: string;
    chargingTime?: string;
    appEcosystem?: string;
    warranty?: string;
    releaseYear?: number;
  };
  retailers: RetailerDeal[];
  featured?: boolean;
  trending?: boolean;
  hasGps: boolean;
  hasSpO2: boolean;
  hasHrv: boolean;
  hasTemp: boolean;
  hasEcg: boolean;
}

export interface GoalCategory {
  id: string;
  title: string;
  signature?: boolean;
  iconName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  keyBenefits: string[];
  recommendedCategory: ProductCategory;
  featuredProductIds: string[];
}

export interface ReviewComment {
  id: string;
  reviewId: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  date: string;
  likes: number;
}

export interface CommunityReview {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string; // e.g. "Marathon Runner", "Sleep Biohacker", "CrossFit Coach"
  rating: number;
  title: string;
  content: string;
  timeUsed: string; // e.g. "3 months"
  likes: number;
  userLiked?: boolean;
  commentsCount: number;
  comments: ReviewComment[];
  date: string;
  verifiedPurchase: boolean;
  pros: string[];
  cons: string[];
  reported?: boolean;
  reportReason?: string;
}

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  currentPrice: number;
  targetPrice: number;
  createdAt: string;
  triggered?: boolean;
  retailerName: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar: string;
  googleConnected: boolean;
  savedProductIds: string[];
  wishlistProductIds: string[];
  comparisonProductIds: string[];
  sharedProductIds: string[];
  priceAlerts: PriceAlert[];
  role: "user" | "admin";
}

export interface DiagnosticAnswers {
  primaryGoal: string;
  placement: string;
  activityTypes: string[];
  smartphoneOS: string;
  batteryPreference: string;
  budgetRange: [number, number];
}

export interface ModerationReport {
  id: string;
  targetType: "Review" | "Comment" | "Product Misinfo";
  targetId: string;
  reporterEmail: string;
  reason:
    | "Spam"
    | "Fake Review"
    | "Medical Misinformation"
    | "Offensive Content"
    | "Scam Link"
    | "Misleading Spec";
  snippet: string;
  timestamp: string;
  status: "Pending" | "Reviewed" | "Dismissed";
}

export interface EditorialGuide {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  badge: string;
  readTime: string;
  heroImage: string;
  category: string;
  topPickId: string;
  runnerUpId: string;
  bestValueId: string;
  description: string;
  keyTakeaways: string[];
}
