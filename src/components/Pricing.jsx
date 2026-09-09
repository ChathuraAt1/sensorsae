import React, { useState, useEffect } from 'react';
import { Check, Zap, Shield, Sparkles, ArrowRight, Activity, Server, Radio, HelpCircle, RefreshCw } from 'lucide-react';

// Default industrial plans used as immediate fallback or initial state while fetching from dash.sensorsae.net
const DEFAULT_PLANS = [
  {
    id: 1,
    name: "Starter Pilot",
    slug: "starter",
    monthlyPrice: 89,
    yearlyPrice: 69,
    description: "Ideal for single-machine diagnostics, pilot cells, and early facility evaluation.",
    features: [
      "Up to 10 Edge Sensor nodes & transmitters",
      "5-second vibration & thermal polling cycle",
      "Real-time anomaly alerts (Email & SMS)",
      "30-day continuous telemetry historical logs",
      "Standard Web & Tablet operator dashboard",
      "ISO 10816 vibration severity threshold matrix",
      "Standard email & community technical support"
    ],
    popular: false,
    currency: "USD",
    is_active: true,
    badge: "For Pilot Cells",
    ctaText: "Start 30-Day Pilot"
  },
  {
    id: 2,
    name: "Professional",
    slug: "professional",
    monthlyPrice: 149,
    yearlyPrice: 119,
    description: "Complete predictive intelligence suite for mission-critical automated production lines.",
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
    popular: true,
    currency: "USD",
    is_active: true,
    badge: "Most Popular",
    ctaText: "Launch Professional Plan"
  },
  {
    id: 3,
    name: "Enterprise Mesh",
    slug: "enterprise",
    monthlyPrice: 499,
    yearlyPrice: 399,
    description: "Maximum scale, 100% air-gapped security, and custom AI models for multi-facility operations.",
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
    popular: false,
    currency: "USD",
    is_active: true,
    badge: "Multi-Facility",
    ctaText: "Contact Enterprise Team"
  }
];

export const Pricing = ({ onRequestDemo }) => {
  const [billingCycle, setBillingCycle] = useState('yearly'); // 'monthly' | 'yearly'
  const [plans, setPlans] = useState(DEFAULT_PLANS);
  const [isLoading, setIsLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [syncMessage, setSyncMessage] = useState('Syncing with dash.sensorsae.net...');

  useEffect(() => {
    let isMounted = true;
    const fetchPlans = async () => {
      try {
        const res = await fetch('https://dash.sensorsae.net/api/subscription-plans', {
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (!res.ok) {
          throw new Error(`API responded with status ${res.status}`);
        }
        
        const json = await res.json();
        
        if (isMounted) {
          // Check if backend returned plans array in json.data
          const incomingPlans = Array.isArray(json.data) ? json.data : (Array.isArray(json) ? json : []);
          
          if (incomingPlans.length > 0) {
            // Normalize backend plan models (handle both camelCase and snake_case)
            const normalized = incomingPlans.map((p, idx) => ({
              id: p.id || idx + 1,
              name: p.name || 'Industrial Plan',
              slug: p.slug || p.name?.toLowerCase().replace(/\s+/g, '-') || `plan-${idx}`,
              monthlyPrice: Number(p.monthlyPrice ?? p.monthly_price ?? p.price ?? 99),
              yearlyPrice: Number(p.yearlyPrice ?? p.yearly_price ?? (p.price ? p.price * 0.8 : 79)),
              description: p.description || p.desc || 'Industrial monitoring tier',
              features: Array.isArray(p.features) ? p.features : (typeof p.features === 'string' ? JSON.parse(p.features || '[]') : []),
              popular: Boolean(p.popular ?? p.is_popular),
              currency: p.currency || 'USD',
              is_active: p.is_active !== undefined ? Boolean(p.is_active) : true,
              badge: (p.popular || p.is_popular) ? "Most Popular" : (idx === 0 ? "Starter" : "Enterprise"),
              ctaText: p.name?.toLowerCase().includes('enterprise') ? "Contact Enterprise" : "Select Plan"
            }));
            setPlans(normalized.filter(p => p.is_active));
            setIsBackendConnected(true);
            setSyncMessage('Live plans synchronized with dash.sensorsae.net');
          } else {
            // Backend is reachable but database plans array is currently empty
            setPlans(DEFAULT_PLANS);
            setIsBackendConnected(true);
            setSyncMessage('Live backend connected (showing catalog defaults until plans are seeded)');
          }
        }
      } catch (err) {
        console.warn('Backend plan sync notice (using high-availability defaults):', err.message);
        if (isMounted) {
          setPlans(DEFAULT_PLANS);
          setIsBackendConnected(false);
          setSyncMessage('Using calibrated industrial catalog defaults');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPlans();
    return () => { isMounted = false; };
  }, []);

  const handlePlanAction = (plan) => {
    // If it's the enterprise tier, route to consultation / demo
    if (plan.slug === 'enterprise' || plan.name?.toLowerCase().includes('enterprise')) {
      if (onRequestDemo) {
        onRequestDemo();
      } else {
        const el = document.getElementById('consultation');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    // Direct redirect to live registered subscription flow on dash.sensorsae.net
    const checkoutUrl = `https://dash.sensorsae.net/register?plan_slug=${encodeURIComponent(plan.slug)}&billing_cycle=${encodeURIComponent(billingCycle)}`;
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pricing" className="py-24 bg-[#06080d] relative overflow-hidden border-t border-blue-900/30">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-blue-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -top-10 right-10 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-wider uppercase shadow-glow-sm">
            <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>TRANSPARENT INDUSTRIAL PRICING</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Predictable ROI. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-200">
              Zero Unplanned Downtime.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Deploy on-premises edge sensor intelligence with flexible monthly or annual billing. 
            All tiers include industrial sensor connectivity and sub-second anomaly detection.
          </p>

          {/* Live Sync Status Indicator */}
          <div className="inline-flex items-center gap-2 text-[11px] font-mono text-slate-500 pt-1">
            <span className={`w-2 h-2 rounded-full ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-blue-400'}`}></span>
            <span>API: <strong className="text-slate-300">dash.sensorsae.net</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{syncMessage}</span>
          </div>

          {/* Billing Cycle Switcher Toggle */}
          <div className="pt-6 flex items-center justify-center">
            <div className="bg-[#0c1220] p-1.5 rounded-full border border-blue-900/60 shadow-inner flex items-center gap-1">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-blue-600 text-white shadow-glow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 flex items-center gap-2 ${
                  billingCycle === 'yearly'
                    ? 'bg-blue-600 text-white shadow-glow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono uppercase tracking-wider border border-emerald-500/30">
                  Save ~20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const isPopular = plan.popular;
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            const savings = plan.monthlyPrice > plan.yearlyPrice 
              ? Math.round(((plan.monthlyPrice - plan.yearlyPrice) / plan.monthlyPrice) * 100) 
              : 20;

            return (
              <div
                key={plan.id || plan.slug}
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  isPopular
                    ? 'bg-gradient-to-b from-[#0e1628] via-[#0b1220] to-[#070b14] border-2 border-blue-500 shadow-2xl shadow-blue-500/20 lg:-translate-y-2'
                    : 'bg-[#080d17] border border-blue-900/40 hover:border-blue-500/40 hover:shadow-xl'
                }`}
              >
                {/* Popular Ribbon / Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[11px] font-black uppercase tracking-wider shadow-glow-md">
                      <Sparkles className="w-3 h-3 text-cyan-200" />
                      <span>{plan.badge || 'Most Popular Choice'}</span>
                    </span>
                  </div>
                )}

                <div className="p-8 sm:p-9 space-y-6 flex-1">
                  {/* Plan Name & Tagline */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {plan.name}
                      </h3>
                      {!isPopular && plan.badge && (
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-950/80 border border-blue-500/20 text-blue-300 font-mono text-[10px]">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="pt-4 pb-2 border-y border-slate-800/80">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                        ${price}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-slate-400 text-xs font-medium">/ month</span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {billingCycle === 'yearly' ? 'billed annually' : 'billed monthly'}
                        </span>
                      </div>
                    </div>

                    {billingCycle === 'yearly' && plan.monthlyPrice > plan.yearlyPrice && (
                      <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                        <Zap className="w-3 h-3" />
                        <span>Save ${ (plan.monthlyPrice - plan.yearlyPrice) * 12 }/yr ({savings}% discount)</span>
                      </div>
                    )}
                  </div>

                  {/* Features Bullet List */}
                  <div className="space-y-3 pt-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-slate-300 block">
                      Everything Included:
                    </span>
                    <ul className="space-y-3 text-xs text-slate-300">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <div className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                            isPopular ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-blue-400'
                          }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="leading-snug">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer CTA Button */}
                <div className="p-8 sm:p-9 pt-0">
                  <button
                    onClick={() => handlePlanAction(plan)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 group ${
                      isPopular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-glow-md hover:shadow-glow-lg'
                        : 'bg-[#101827] hover:bg-blue-950/80 text-blue-300 hover:text-white border border-blue-800/40 hover:border-blue-500/50'
                    }`}
                  >
                    <span>{plan.ctaText || 'Get Started Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-2.5 font-mono">
                    Instant activation • No setup fee • 30-day money back
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Industrial Guarantees & Trust Signals Bar */}
        <div className="mt-16 rounded-3xl bg-[#090d16] border border-blue-900/40 p-6 sm:p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">IEC 62443 Security</div>
              <div className="text-[11px] text-slate-400">Air-gapped isolation & encrypted telemetry</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Zero Cloud Lock-In</div>
              <div className="text-[11px] text-slate-400">Runs 100% on your local plant LAN/MES</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">30-Day Risk-Free Trial</div>
              <div className="text-[11px] text-slate-400">Full refund if downtime isn't reduced</div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Industrial Hardware Kit</div>
              <div className="text-[11px] text-slate-400">Plug-and-play magnetic mount sensors</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
