import { CommunityReview, ModerationReport } from "../types";

export const INITIAL_REVIEWS: CommunityReview[] = [
  {
    id: "rev-1",
    productId: "oura-ring-gen-3-horizon",
    productName: "Oura Ring Gen 3 Horizon",
    productImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    authorName: "Kev Martinez",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    authorRole: "Marathon Runner & Biohacker",
    rating: 5,
    title: "The sleep tracking is excellent, but keep expectations realistic on battery",
    content: "I've been using this ring for 3 months straight. The sleep staging matches my clinical polysomnography test remarkably well. The readiness score accurately prevented me from overtraining twice before my spring marathon. Battery averages about 5.5 days with all SpO2 sensing turned on. Super comfortable to sleep with compared to heavy watches.",
    timeUsed: "3 months",
    likes: 42,
    commentsCount: 3,
    date: "2 days ago",
    verifiedPurchase: true,
    pros: ["Finger artery signal is superior for sleep HRV", "Zero screen distractions", "Accurate temperature trend alerts"],
    cons: ["$5.99/mo subscription after first month", "Requires sizing kit wait"],
    comments: [
      {
        id: "comm-1",
        reviewId: "rev-1",
        authorName: "Elena Rostova",
        authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
        text: "Did you notice any scratching on the titanium finish during weight training?",
        date: "1 day ago",
        likes: 4
      },
      {
        id: "comm-2",
        reviewId: "rev-1",
        authorName: "Kev Martinez",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        text: "Yes, I recommend taking it off or using silicone ring guards when gripping knurled barbells!",
        date: "18 hours ago",
        likes: 9
      }
    ]
  },
  {
    id: "rev-2",
    productId: "garmin-fenix-8-solar",
    productName: "Garmin Fenix 8 Solar (51mm)",
    productImage: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
    authorName: "Marcus Vance",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    authorRole: "Ultra-Trail 100k Runner",
    rating: 5,
    title: "Real-Time Stamina metric completely changed my 50-mile race execution",
    content: "During a 50-mile mountain race, the Real-Time Stamina gauge on the Fenix 8 kept me from burning all my anaerobic reserves on early 15% gradient climbs. Finished with 18% stamina remaining without hitting the dreaded wall. Battery lasted the entire 12-hour race with multi-band GPS and top-tier maps running, dropping only 14%.",
    timeUsed: "5 months",
    likes: 88,
    commentsCount: 2,
    date: "1 week ago",
    verifiedPurchase: true,
    pros: ["Real-time stamina depletion percentage", "Solar sapphire lens virtually indestructible", "Unrivaled offline trail navigation"],
    cons: ["Large 51mm watch body takes getting used to on smaller wrists"],
    comments: [
      {
        id: "comm-3",
        reviewId: "rev-2",
        authorName: "Tyler Chen",
        authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        text: "Is the solar recharging noticeably extending battery under tree cover?",
        date: "4 days ago",
        likes: 6
      }
    ]
  },
  {
    id: "rev-3",
    productId: "ringconn-gen-2",
    productName: "RingConn Gen 2 Smart Ring",
    productImage: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    authorName: "Chloe Sterling",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    authorRole: "Physiotherapist & Yoga Instructor",
    rating: 5,
    title: "Zero subscription fee and 11 real days of battery life — a true winner",
    content: "I switched from Oura because I was tired of the ongoing monthly payment. RingConn Gen 2 gives me virtually identical sleep duration and HRV baseline data, but lasts nearly 2 full weeks between charges. The included charging case also holds 150 days of battery for travel.",
    timeUsed: "6 weeks",
    likes: 64,
    commentsCount: 1,
    date: "3 days ago",
    verifiedPurchase: true,
    pros: ["100% free app forever (no subscription)", "11-12 days real-world battery", "Charging case makes it best for traveling"],
    cons: ["App interface is functional but less playful than competitors"],
    comments: [
      {
        id: "comm-4",
        reviewId: "rev-3",
        authorName: "Dave Miller",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
        text: "How is the sleep apnea tracking? Does it give clear oxygen desaturation charts?",
        date: "2 days ago",
        likes: 3
      }
    ]
  },
  {
    id: "rev-4",
    productId: "polar-h10-chest-strap",
    productName: "Polar H10 Heart Rate Sensor",
    productImage: "https://images.unsplash.com/photo-1510519138161-58474eb7d79c?auto=format&fit=crop&w=800&q=80",
    authorName: "Dr. Andrew Novak",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
    authorRole: "Exercise Physiologist",
    rating: 5,
    title: "Still the benchmark sensor against which all wrist wearables are calibrated",
    content: "In our human performance laboratory, we use the Polar H10 as our reference standard for ECG heart rate and HRV R-R intervals. When you need absolute truth during high cadence sprints, kettlebell swings, or rowing where wrist optical sensors suffer motion artifacts, this is the only sensor you need.",
    timeUsed: "2 years",
    likes: 105,
    commentsCount: 0,
    date: "2 weeks ago",
    verifiedPurchase: true,
    pros: ["True electrical ECG fidelity", "Dual BLE + ANT+ simultaneously", "Unbreakable connection"],
    cons: ["Must moisten strap electrodes before use for best contact"],
    comments: []
  }
];

export const INITIAL_MODERATION_REPORTS: ModerationReport[] = [
  {
    id: "mod-1",
    targetType: "Review",
    targetId: "rev-spam-101",
    reporterEmail: "alex.f@example.com",
    reason: "Medical Misinformation",
    snippet: "Claimed this wrist device cured chronic hypertension in 2 days without doctor advice.",
    timestamp: "2026-08-12 14:22",
    status: "Pending"
  },
  {
    id: "mod-2",
    targetType: "Comment",
    targetId: "comm-spam-204",
    reporterEmail: "sara.k@example.com",
    reason: "Scam Link",
    snippet: "Click here to get 90% off free replica smartwatches at discount-wearables-fake.xyz",
    timestamp: "2026-08-11 09:15",
    status: "Pending"
  },
  {
    id: "mod-3",
    targetType: "Product Misinfo",
    targetId: "prod-spec-check",
    reporterEmail: "jake.runner@example.com",
    reason: "Misleading Spec",
    snippet: "Battery life listed as 14 days but manufacturer confirmed 7 days on standard GPS.",
    timestamp: "2026-08-10 18:40",
    status: "Reviewed"
  }
];
