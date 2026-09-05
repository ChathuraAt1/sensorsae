// SENSORSAE Marketing & Lead Generation Data

export const trustStats = [
  { value: "$14.2M+", label: "Unplanned Losses Prevented" },
  { value: "30 Days", label: "Average Failure Lead Time" },
  { value: "45 Mins", label: "Clamp-On Setup Time" },
  { value: "99.9%", label: "Downtime Prevention Rate" },
];

export const clientLogos = [
  "GLOBAL FOUNDRIES", "EUROCHEM ENERGY", "APEX AUTOMOTIVE", "TITAN METALS", "NORDIC PHARMA", "VORTEX TURBINES"
];

export const bentoFeatures = [
  {
    id: "heatmap",
    size: "large", // spans 2 cols
    category: "Real-Time Visibility",
    title: "Live Production Floor Heatmap",
    description: "See the exact health and vibration state of every pump, turbine, and motor across your plant on a single screen. Green means optimal, blue highlights proactive tune-ups.",
    badge: "Plant-Wide Digital Twin",
  },
  {
    id: "copilot",
    size: "tall",
    category: "AI Maintenance Copilot",
    title: "Ask Your Plant in Plain English",
    description: "Shift managers and technicians can type or talk to query equipment: 'Which pumps need attention this weekend?' and get plain-English maintenance steps.",
    badge: "Zero Training Required",
  },
  {
    id: "instant-alerts",
    size: "medium",
    category: "Proactive Notifications",
    title: "Instant Mobile & SMS Alerts",
    description: "Sends actionable notices directly to technicians' phones before minor friction escalates into a catastrophic line shutdown.",
    badge: "Slack, SMS & WhatsApp",
  },
  {
    id: "roi",
    size: "compact",
    category: "Proven Economics",
    title: "$4.2M Avg Savings",
    description: "Most plant operators recoup their entire investment in under 90 days by catching just one early gearbox failure.",
    badge: "3.4x Annual ROI",
  },
  {
    id: "airgap",
    size: "compact",
    category: "Plant Cyber Security",
    title: "100% Air-Gapped & Secure",
    description: "Your factory telemetry stays entirely inside your building. Zero cloud requirement, zero corporate network risks.",
    badge: "Bank-Grade On-Prem",
  },
];

export const marketingCaseStudies = [
  {
    id: "semiconductor",
    client: "Global Semiconductor Fab",
    location: "Dresden, Germany",
    headline: "Prevented cleanroom vacuum pump breakdown before peak production",
    story: "Two weeks before our biggest production run, SENSORSAE detected abnormal acoustic friction in our primary cleanroom exhaust pump. We scheduled a 30-minute bearing swap during planned shift change and avoided an unplanned shutdown.",
    author: "Marcus V.",
    role: "VP of Fab Operations",
    metric: "Zero Production Halts",
    badge: "High-Volume Silicon"
  },
  {
    id: "automotive",
    client: "Tier-1 Electric Vehicle Factory",
    location: "Austin, Texas",
    headline: "Reduced robotic welding micro-stoppages across assembly shifts",
    story: "Our welding line used to suffer unexplainable micro-halts every shift. SENSORSAE pinpointed the exact spindle wear causing thermal drift. Technicians love querying the AI copilot during shift handovers.",
    author: "Kenji T.",
    role: "Plant Modernization Lead",
    metric: "Predictable Shifts",
    badge: "Robotic Assembly"
  },
  {
    id: "energy",
    client: "North Sea Offshore Turbines",
    location: "Rotterdam, Netherlands",
    headline: "Eliminated emergency repair runs for remote turbine generators",
    story: "Emergency offshore maintenance dispatches are expensive and hazardous. With SENSORSAE giving us weeks of early warning, our maintenance team only sails for planned, batched overhauls.",
    author: "Elena R.",
    role: "Head of Turbine Reliability",
    metric: "Batch Maintenance",
    badge: "Continuous Energy"
  },
  {
    id: "petrochemical",
    client: "EuroChem Energy Refining",
    location: "Baton Rouge, Louisiana",
    headline: "Zero pump seal blowouts across 18 months of high-pressure cracking",
    story: "Automated cavitation suppression on our hydrocarbon feed pumps extended our mean time between rebuilds from 9 months to 34 months. The system paid for itself on our first scheduled turnaround.",
    author: "Robert H.",
    role: "Chief Reliability Engineer",
    metric: "+320% MTBF Extension",
    badge: "Petrochemical"
  }
];

export const marketingProducts = [
  {
    id: "edge-x1",
    name: "Edge-X1 Smart Sensor Hub",
    tagline: "The rugged AI brain for your factory floor.",
    idealFor: "Pumps, compressors, CNC spindles & gearboxes",
    category: "Hardware",
    badge: "Most Popular for Pilots",
    nvidiaBadge: "Nvidia Orin™ Powered",
    description: "A compact, heavy-duty aluminum gateway that mounts directly onto machine panels in 15 minutes. Ingests vibration, acoustic sound, and heat, running predictive AI locally with zero cloud lag.",
    highlights: [
      "Plug & Play: Connects up to 16 wireless or wired sensors",
      "Built for Harsh Plants: Waterproof, dustproof (IP67), drops and heat resistant",
      "Local AI Brain: Powered by Nvidia Jetson Orin for instant on-site diagnostics",
      "No Cloud Needed: Works completely inside your local plant network"
    ],
    inTheBox: "Edge-X1 Gateway, 4x Magnetic Triaxial Vibration Sensors, M12 Power Cable, DIN-rail Bracket"
  },
  {
    id: "plant-copilot",
    name: "AI Plant Copilot",
    tagline: "Conversational intelligence for your entire maintenance team.",
    idealFor: "Shift managers, reliability engineers & plant operators",
    category: "AI Software",
    badge: "Instant Setup",
    nvidiaBadge: "Nvidia TensorRT™ Accelerated",
    description: "Turn hours of confusing sensor waveforms into plain-English answers. Technicians can ask questions from any smartphone or tablet to get instant diagnosis and parts recommendations.",
    highlights: [
      "Plain English Answers: 'Is Pump 3 healthy?' produces simple, clear status",
      "Automated Shift Handover: Generates 1-click summary reports for incoming crews",
      "Preventive Action Steps: Recommends exact wrench size, lubrication, or part replacement",
      "Works on Any Device: Mobile tablet, phone, or plant floor kiosk"
    ],
    inTheBox: "Copilot Web App, Mobile Assistant PWA, Unlimited Team Seats, Integration Guides"
  },
  {
    id: "thermal-vision",
    name: "Thermal Vision Guard",
    tagline: "Thermal anomaly detection that spots hot spots before sparks fly.",
    idealFor: "Electrical switchgears, conveyor belts, furnaces & welding stations",
    category: "Perception",
    badge: "Zero Contact",
    nvidiaBadge: "Nvidia Metropolis™ Vision",
    description: "An intelligent infrared vision camera module that monitors continuous heat signatures across your equipment. Alerts immediately if bearings, motors, or transformers exceed normal temperature zones.",
    highlights: [
      "Continuous Non-Contact Monitoring: No need for manual thermal gun inspections",
      "Visual Hotspot Heatmaps: Live color-coded heat distribution maps",
      "Automated Warning Thresholds: Flags gradual overheating weeks before smoke or fire",
      "Easy Overhead Mount: Magnetic and clamp mounting options for rafters and cages"
    ],
    inTheBox: "Radiometric Infrared Camera, Adjustable Articulating Mount, High-Speed POE Injector"
  },
  {
    id: "enterprise-mesh",
    name: "Complete Plant Pilot Kit",
    tagline: "Everything you need to protect your 10 most critical machines.",
    idealFor: "Operations directors looking to prove ROI in 30 days",
    category: "Bundles",
    badge: "30-Day Risk-Free Trial",
    nvidiaBadge: "Full Nvidia Stack Bundle",
    description: "The complete starter package designed to validate predictive maintenance on your facility's high-value bottleneck equipment. Pre-configured and operational within 1 hour.",
    highlights: [
      "2x Edge-X1 Industrial Hubs (Dual Nvidia Orin compute)",
      "12x Magnetic Ultrasonic & Vibration Sensor Pods",
      "Full AI Copilot & Live Floor Heatmap software included",
      "Dedicated SENSORSAE Deployment Engineer support for 30 days"
    ],
    inTheBox: "2x Edge-X1 Hubs, 12x Wireless Sensor Pods, Pre-loaded Software, Hard Pelican Travel Case"
  }
];
