/**
 * Subscription Service
 * Fetches subscription plans and active plan details directly from dash.sensorsae.net backend API.
 * Infers industrial capabilities (node limits, polling rate, archive retention, etc.) from plan features.
 */

const API_BASE = 'https://dash.sensorsae.net';

// Default plans matching backend database for immediate fallback during network latency
export const FALLBACK_PLANS = [
  {
    id: 1,
    name: "Starter Pilot",
    slug: "starter-pilot",
    description: "Ideal for single-machine diagnostics, pilot production cells, and early facility evaluation.",
    monthly_price: "89.00",
    yearly_price: "69.00",
    price: "89.00",
    popular: false,
    currency: "USD",
    interval: "monthly",
    features: [
      "Up to 10 Edge Sensor nodes & transmitters",
      "5-second vibration & thermal polling cycle",
      "Real-time anomaly alerts (Email & SMS)",
      "30-day continuous telemetry historical logs",
      "Standard Web & Tablet operator dashboard",
      "ISO 10816 vibration severity threshold matrix",
      "Standard email & community technical support"
    ],
    is_active: true
  },
  {
    id: 2,
    name: "Professional",
    slug: "professional",
    description: "Complete predictive intelligence suite for mission-critical automated production lines.",
    monthly_price: "149.00",
    yearly_price: "119.00",
    price: "149.00",
    popular: true,
    currency: "USD",
    interval: "monthly",
    features: [
      "Up to 50 Edge Sensor nodes & Modbus/OPC-UA bridges",
      "Sub-second high-frequency FFT spectral analysis",
      "On-premise Nvidia Orin™ neural diagnostics & RUL",
      "Automated WhatsApp, SMS, Webhooks & Slack dispatch",
      "1-Year full-resolution telemetry archive & audit export",
      "Root-cause bearing failure & cavitation detection",
      "Priority 24/7 industrial engineering support",
      "REST & Webhook API integrations for SCADA / MES"
    ],
    is_active: true
  },
  {
    id: 3,
    name: "Enterprise Mesh",
    slug: "enterprise-mesh",
    description: "Maximum scale, 100% air-gapped security, and custom AI models for multi-facility operations.",
    monthly_price: "499.00",
    yearly_price: "399.00",
    price: "499.00",
    popular: false,
    currency: "USD",
    interval: "monthly",
    features: [
      "Unlimited sensor nodes, gateways & PLC bridges",
      "Sub-millisecond edge inferencing & custom digital twin",
      "100% Air-Gapped on-premise hardware deployment",
      "Unlimited historical telemetry retention with zero data egress",
      "Dedicated Industrial Reliability Engineer & 99.99% SLA",
      "Bespoke SCADA/ERP integration (Siemens, Rockwell, SAP)",
      "ATEX Zone 2 & IEC 62443 cyber-physical compliance audit",
      "Custom sensory neural model fine-tuning"
    ],
    is_active: true
  }
];

/**
 * Parses dynamic industrial capabilities from plan attributes and feature list.
 */
export const derivePlanCapabilities = (plan) => {
  if (!plan) return derivePlanCapabilities(FALLBACK_PLANS[1]); // Default to Professional

  const slug = (plan.slug || plan.name || '').toLowerCase();
  const features = Array.isArray(plan.features) ? plan.features : [];
  const joinedFeatures = features.join(' ').toLowerCase();

  // 1. Node Limit
  let nodeLimit = 50;
  if (slug.includes('starter') || joinedFeatures.includes('10 edge sensor') || joinedFeatures.includes('10 sensor')) {
    nodeLimit = 10;
  } else if (slug.includes('enterprise') || joinedFeatures.includes('unlimited sensor')) {
    nodeLimit = Infinity;
  } else if (slug.includes('pro') || joinedFeatures.includes('50 edge sensor') || joinedFeatures.includes('50 sensor')) {
    nodeLimit = 50;
  }

  // 2. Polling Cycle Interval
  let pollingIntervalSec = 0.5;
  let pollingLabel = '500ms High-Frequency Burst';
  if (slug.includes('starter') || joinedFeatures.includes('5-second')) {
    pollingIntervalSec = 5.0;
    pollingLabel = '5.0s Standard Polling Cycle';
  } else if (slug.includes('enterprise') || joinedFeatures.includes('sub-millisecond')) {
    pollingIntervalSec = 0.05;
    pollingLabel = 'Sub-Millisecond Realtime Stream';
  }

  // 3. Historical Telemetry Retention
  let historyDays = 365;
  let allowedHistoryRanges = ['Live', '24h', '7d', '30d', '90d', '1-Year'];
  if (slug.includes('starter') || joinedFeatures.includes('30-day')) {
    historyDays = 30;
    allowedHistoryRanges = ['Live', '24h', '7d', '30d'];
  } else if (slug.includes('enterprise') || joinedFeatures.includes('unlimited historical')) {
    historyDays = Infinity;
    allowedHistoryRanges = ['Live', '24h', '7d', '30d', '90d', '1-Year', 'Cold Archive'];
  }

  // 4. Allowed Facilities
  let allowedFacilities = ['austin-cell-4'];
  if (slug.includes('enterprise') || joinedFeatures.includes('multi-facility')) {
    allowedFacilities = ['austin-cell-4', 'detroit-stamping', 'rotterdam-marine'];
  }

  // 5. Spectral FFT Analysis
  const fftEnabled = !slug.includes('starter') || joinedFeatures.includes('fft');

  // 6. Neural AI RUL Diagnostics
  const aiRulEnabled = !slug.includes('starter') || joinedFeatures.includes('rul');

  // 7. Dispatch Alert Channels
  let dispatchChannels = ['Email', 'SMS', 'WhatsApp', 'Slack', 'Webhooks'];
  if (slug.includes('starter')) {
    dispatchChannels = ['Email', 'SMS'];
  } else if (slug.includes('enterprise')) {
    dispatchChannels = ['Email', 'SMS', 'WhatsApp', 'Slack', 'Webhooks', 'SAP PM', 'IBM Maximo'];
  }

  // 8. Air-Gapped on-premise mode
  const airGapped = slug.includes('enterprise') || joinedFeatures.includes('air-gapped');

  // 9. SAP / ERP Direct Sync
  const sapSync = slug.includes('enterprise') || joinedFeatures.includes('sap');

  return {
    ...plan,
    nodeLimit,
    activeNodesCount: nodeLimit === 10 ? 8 : nodeLimit === 50 ? 38 : 142,
    pollingIntervalSec,
    pollingLabel,
    historyDays,
    allowedHistoryRanges,
    allowedFacilities,
    fftEnabled,
    aiRulEnabled,
    dispatchChannels,
    airGapped,
    sapSync,
  };
};

/**
 * Fetch all available subscription plans from backend API
 */
export const fetchBackendPlans = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/subscription-plans`, {
      headers: { 'Accept': 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
  } catch (err) {
    console.warn('Using fallback subscription plans:', err.message);
  }
  return FALLBACK_PLANS;
};

/**
 * Fetch user's active/last plan from backend API with Bearer token
 */
export const fetchUserActivePlan = async (token, user = null) => {
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/api/payments/last-plan`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
        },
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.plan) {
          return json.data.plan;
        }
      }
    } catch (err) {
      console.warn('Could not fetch last plan from payments API:', err.message);
    }
  }

  // Fallback to user object's current_plan / plan_slug / plan property
  if (user?.current_plan || user?.plan_slug || user?.plan) {
    const planIdentifier = user.current_plan || user.plan_slug || user.plan;
    return typeof planIdentifier === 'object' ? planIdentifier : { slug: planIdentifier };
  }

  // Check localStorage if previously selected during checkout
  const savedPlan = localStorage.getItem('sensorsae_subscribed_plan');
  if (savedPlan) {
    try {
      return JSON.parse(savedPlan);
    } catch {
      return { slug: savedPlan };
    }
  }

  // Default to Professional plan
  return FALLBACK_PLANS[1];
};

/**
 * Calculates trial status for a user based on registration date (14-day evaluation period).
 * Gated: If 14 days elapsed and no paid subscription, isExpired = true.
 */
export const calculateTrialStatus = (user = null, hasPaidPlan = false) => {
  // If user has paid for an active subscription, they are fully licensed (not trial)
  if (hasPaidPlan) {
    return {
      isTrial: false,
      isExpired: false,
      remainingDays: 0,
      totalTrialDays: 14,
      daysElapsed: 14,
      percentRemaining: 0,
      registrationDate: user?.created_at ? new Date(user.created_at) : new Date(),
    };
  }

  // Developer/testing override to simulate expired trial
  const isForceExpired = localStorage.getItem('sensorsae_force_trial_expired') === 'true';

  // Determine user registration date (from backend created_at or persisted local session)
  let regDate = null;
  if (user?.created_at) {
    regDate = new Date(user.created_at);
  } else {
    const storedStart = localStorage.getItem('sensorsae_trial_start');
    if (storedStart) {
      regDate = new Date(storedStart);
    } else {
      regDate = new Date();
      localStorage.setItem('sensorsae_trial_start', regDate.toISOString());
    }
  }

  const TRIAL_DAYS = 14;
  const trialDurationMs = TRIAL_DAYS * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const elapsedMs = Math.max(0, now - regDate.getTime());
  const remainingMs = trialDurationMs - elapsedMs;

  const remainingDays = isForceExpired ? 0 : Math.max(0, Math.ceil(remainingMs / (24 * 60 * 60 * 1000)));
  const daysElapsed = isForceExpired ? 14 : Math.min(TRIAL_DAYS, Math.floor(elapsedMs / (24 * 60 * 60 * 1000)));
  const isExpired = isForceExpired || remainingMs <= 0;

  return {
    isTrial: true,
    isExpired,
    remainingDays,
    totalTrialDays: TRIAL_DAYS,
    daysElapsed,
    percentRemaining: isExpired ? 0 : Math.max(0, Math.min(100, Math.round((remainingMs / trialDurationMs) * 100))),
    registrationDate: regDate,
  };
};

