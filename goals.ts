import { GoalCategory } from "../types";

export const GOAL_CATEGORIES: GoalCategory[] = [
  {
    id: "stamina",
    title: "⚡ Stamina & Endurance",
    signature: true,
    iconName: "Zap",
    color: "from-amber-500 to-orange-600",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    description: "Wearables engineered to help athletes understand pacing, aerobic reserves, training load, and physiological readiness to prevent premature exhaustion.",
    keyBenefits: [
      "Real-Time Stamina reserve calculation during workouts",
      "Lactate threshold & aerobic capacity modeling",
      "Training load balance & endurance progression tracking",
      "Real-time pacing guidance against headwind and hills"
    ],
    recommendedCategory: "Stamina & Endurance",
    featuredProductIds: ["garmin-fenix-8-solar", "coros-pace-3", "stryd-next-gen-footpod", "garmin-edge-840-solar"]
  },
  {
    id: "sleep",
    title: "😴 Sleep & Circadian Health",
    signature: false,
    iconName: "Moon",
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-500/10",
    borderColor: "border-indigo-500/30",
    description: "Discover non-invasive smart rings, sleep pads, and bands that decode deep sleep architecture, REM cycles, and nighttime temperature fluctuations.",
    keyBenefits: [
      "Sleep stage accuracy (Deep, Light, REM, Awake)",
      "Breathing disturbance and sleep apnea risk indexing",
      "Nighttime skin temperature deviations for illness prediction",
      "Circadian rhythm optimization & ideal bedtime windows"
    ],
    recommendedCategory: "Sleep Tracker",
    featuredProductIds: ["oura-ring-gen-3-horizon", "ringconn-gen-2", "withings-sleep-tracking-pad", "ultrahuman-ring-air"]
  },
  {
    id: "recovery",
    title: "🔋 Recovery & Physiological Strain",
    signature: false,
    iconName: "BatteryCharging",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    description: "Monitor Heart Rate Variability (HRV) and autonomic balance to know precisely when to push hard in training and when to take restorative rest.",
    keyBenefits: [
      "Daily Readiness and Strain scores based on HRV baseline",
      "Autonomic nervous system (parasympathetic) recovery tracking",
      "Muscular strain and central nervous system fatigue gauges",
      "Guided breathwork and recovery intervention reminders"
    ],
    recommendedCategory: "Recovery & Breathing",
    featuredProductIds: ["whoop-4", "oura-ring-gen-3-horizon", "ultrahuman-ring-air", "coros-pace-3"]
  },
  {
    id: "heart-rate",
    title: "❤️ Heart Rate & Cardiac Precision",
    signature: false,
    iconName: "HeartPulse",
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    description: "From laboratory-grade ECG chest straps to multi-spectral optical wrist arrays for HIIT, threshold intervals, and continuous cardiac monitoring.",
    keyBenefits: [
      "Gold-standard millisecond ECG accuracy during high-intensity intervals",
      "Zone 2 endurance training alerts and lactate threshold detection",
      "Arrhythmia and resting heart rate trend monitoring",
      "Broadcasting live HR to gym equipment and cycling apps"
    ],
    recommendedCategory: "Heart Rate Monitor",
    featuredProductIds: ["polar-h10-chest-strap", "garmin-hrm-pro-plus", "apple-watch-ultra-2", "withings-scanwatch-2"]
  },
  {
    id: "fitness",
    title: "🏃 Fitness & Multi-Sport Performance",
    signature: false,
    iconName: "Activity",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    description: "GPS sports watches and biometric multisport computers built to track pace, elevation, power wattage, and cadence across running, cycling, and swimming.",
    keyBenefits: [
      "Multi-band dual frequency satellite GPS pinpoint mapping",
      "Running power in watts without external pods",
      "Waterproof ratings up to 100m for open water swimming and diving",
      "Automated workout tracking and structured interval coaching"
    ],
    recommendedCategory: "Smartwatch",
    featuredProductIds: ["garmin-fenix-8-solar", "coros-pace-3", "apple-watch-ultra-2", "garmin-edge-840-solar"]
  },
  {
    id: "wellbeing",
    title: "🧠 Stress & Mental Wellbeing",
    signature: false,
    iconName: "Smile",
    color: "from-violet-500 to-fuchsia-600",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    description: "Wearables that soothe the nervous system through silent haptic touch or track all-day galvanic skin response and cognitive load.",
    keyBenefits: [
      "Vagus nerve and somatic nervous system stimulation",
      "Continuous electrodermal activity (cEDA) stress logging",
      "Real-time mindfulness prompts when acute stress spikes",
      "Clinical anxiety relief and daytime focus enhancement"
    ],
    recommendedCategory: "Stress & Wellbeing",
    featuredProductIds: ["apollo-neuro-band", "oura-ring-gen-3-horizon", "whoop-4", "withings-scanwatch-2"]
  },
  {
    id: "health",
    title: "🩺 Health & Vital Monitoring",
    signature: false,
    iconName: "ShieldCheck",
    color: "from-teal-500 to-emerald-600",
    bgColor: "bg-teal-500/10",
    borderColor: "border-teal-500/30",
    description: "Consumer technology providing preventive vitals tracking: ECG, SpO2 blood oxygen, continuous baseline temperature, and arterial pulse.",
    keyBenefits: [
      "On-demand medical-grade ECG for atrial fibrillation detection",
      "Continuous night and daytime blood oxygen saturation (SpO2)",
      "Continuous skin temperature fluctuation analysis",
      "Long-term wellness reporting exportable to physicians"
    ],
    recommendedCategory: "Health Wearable",
    featuredProductIds: ["withings-scanwatch-2", "apple-watch-ultra-2", "ringconn-gen-2", "oura-ring-gen-3-horizon"]
  }
];
