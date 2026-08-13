export interface BrandInfo {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  origin: string;
  founded: number;
  specialty: string;
  popularCategories: string[];
  productCount: number;
  heroProduct: string;
  description: string;
}

export const BRANDS_DATA: BrandInfo[] = [
  {
    id: "garmin",
    name: "Garmin",
    logo: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&q=80",
    tagline: "Beat Yesterday — The world leader in sports GPS and Stamina metrics",
    origin: "Olathe, Kansas, USA / Switzerland",
    founded: 1989,
    specialty: "Multisport GPS, Real-Time Stamina, Topo Maps, Solar Charging",
    popularCategories: ["Stamina & Endurance", "Smartwatch", "Cycling Computer", "Heart Rate Monitor"],
    productCount: 4,
    heroProduct: "Fenix 8 Solar",
    description: "Garmin sets the gold standard for endurance athletes and outdoor adventurers, featuring patented Real-Time Stamina tracking, multi-band GPS, and solar charging with zero subscription fees."
  },
  {
    id: "oura",
    name: "Oura",
    logo: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=200&q=80",
    tagline: "Know Why with Oura — Deep Sleep & Daily Readiness",
    origin: "Oulu, Finland",
    founded: 2013,
    specialty: "Finger-based arterial pulse, Sleep architecture, Daytime stress",
    popularCategories: ["Smart Ring", "Sleep Tracker", "Recovery & Breathing"],
    productCount: 1,
    heroProduct: "Oura Ring Gen 3 Horizon",
    description: "Pioneer in smart ring wellness tracking. By measuring arterial pulse from the finger, Oura delivers medical-grade sleep staging, nighttime HRV, and illness prediction."
  },
  {
    id: "whoop",
    name: "WHOOP",
    logo: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?auto=format&fit=crop&w=200&q=80",
    tagline: "Always On — 24/7 Human Performance & Recovery Coaching",
    origin: "Boston, Massachusetts, USA",
    founded: 2012,
    specialty: "Strain vs Recovery, HRV trends, Continuous Sleep Coach",
    popularCategories: ["Recovery & Breathing", "Fitness Band", "Stress & Wellbeing"],
    productCount: 1,
    heroProduct: "WHOOP 4.0",
    description: "The screen-free wearable chosen by NFL, NBA, and Olympic athletes. Continuous 24/7 physiological monitoring to quantify physical Strain against autonomic Recovery."
  },
  {
    id: "polar",
    name: "Polar",
    logo: "https://images.unsplash.com/photo-1510519138161-58474eb7d79c?auto=format&fit=crop&w=200&q=80",
    tagline: "Pioneers of Heart Rate Science since 1977",
    origin: "Kempele, Finland",
    founded: 1977,
    specialty: "ECG Heart Rate Chest Straps, Training Load Pro, Sleep Plus Stages",
    popularCategories: ["Heart Rate Monitor", "Smartwatch", "Fitness Band"],
    productCount: 1,
    heroProduct: "Polar H10",
    description: "Inventors of the world's first wireless heart rate monitor. Polar continues to lead sports cardiology with unmatched ECG chest strap accuracy and exercise physiology science."
  },
  {
    id: "ringconn",
    name: "RingConn",
    logo: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=200&q=80",
    tagline: "No Subscription. 12-Day Battery. Ultimate Ring Freedom.",
    origin: "Wilmington, Delaware, USA",
    founded: 2021,
    specialty: "Subscription-free smart rings, 12-day battery, Sleep Apnea monitoring",
    popularCategories: ["Smart Ring", "Sleep Tracker", "Health Wearable"],
    productCount: 1,
    heroProduct: "RingConn Gen 2",
    description: "RingConn revolutionized the smart ring market by pairing 12-day battery life and breakthrough sleep apnea risk screening with a 100% subscription-free guarantee."
  },
  {
    id: "coros",
    name: "COROS",
    logo: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=200&q=80",
    tagline: "Engineered for the Long Run — Marathon & Mountain GPS",
    origin: "Irvine, California, USA",
    founded: 2016,
    specialty: "Featherweight running watches, extreme GPS battery life, EvoLab Hub",
    popularCategories: ["Fitness Band", "Smartwatch", "Stamina & Endurance"],
    productCount: 1,
    heroProduct: "COROS Pace 3",
    description: "Preferred by world-record marathoners like Eliud Kipchoge. COROS creates high-performance, ultralight GPS watches with unmatched battery life and free training analytics."
  },
  {
    id: "withings",
    name: "Withings",
    logo: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=200&q=80",
    tagline: "Inspiring Health — Clinical Luxury Wearables & Connected Health",
    origin: "Issy-les-Moulineaux, France",
    founded: 2008,
    specialty: "Clinical ECG hybrid watches, Under-mattress sleep pads, Smart scales",
    popularCategories: ["Health Wearable", "Sleep Tracker", "Smartwatch"],
    productCount: 2,
    heroProduct: "ScanWatch 2 & Sleep Pad",
    description: "French connected health pioneer blending timeless analog watch elegance with clinical diagnostics like ECG Afib detection, continuous body temperature, and non-wearable sleep mats."
  },
  {
    id: "apple",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80",
    tagline: "Adventure awaits — Premium Health and Cellular Smartwatches",
    origin: "Cupertino, California, USA",
    founded: 1976,
    specialty: "watchOS, Dual-frequency GPS, ECG, Ocean diving, Ultra-bright OLED",
    popularCategories: ["Smartwatch", "Health Wearable", "Fitness Band"],
    productCount: 1,
    heroProduct: "Apple Watch Ultra 2",
    description: "Deep integration with iOS ecosystem, bright 3,000-nit displays, diving certifications, and cellular freedom."
  },
  {
    id: "ultrahuman",
    name: "Ultrahuman",
    logo: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=200&q=80",
    tagline: "Metabolism & Circadian Intelligence",
    origin: "Bangalore, India / London, UK",
    founded: 2020,
    specialty: "Circadian rhythm alignment, CGM glucose pairing, 2.4g titanium rings",
    popularCategories: ["Smart Ring", "Recovery & Breathing"],
    productCount: 1,
    heroProduct: "Ultrahuman Ring AIR",
    description: "Combines 2.4-gram titanium smart rings with metabolic biofeedback, sleep phase synchronization, and continuous glucose monitor pairing."
  }
];
