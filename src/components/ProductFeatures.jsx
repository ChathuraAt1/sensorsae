import React, { useState } from 'react';
import { ArrowRight, Activity, BrainCircuit, Eye, Zap, CheckCircle2, Sparkles, Shield, ChevronRight } from 'lucide-react';

export const ProductFeatures = ({ onRequestDemo, onExploreProducts }) => {
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      id: "ultrasonic",
      tabTitle: "24/7 Ultrasonic Mesh",
      icon: Activity,
      kicker: "01 / CONTINUOUS VISIBILITY",
      title: "High-Frequency Acoustic & Vibration Telemetry",
      tagline: "Hear micro-friction 30 days before parts overheat or seize.",
      description: "Standard vibration sensors only alert you after bearing damage causes heavy oscillations. SENSORSAE's 192 kHz ultrasonic listening arrays capture micro-acoustic friction at the earliest stage of lubrication breakdown, giving your team weeks of notice to schedule regular maintenance.",
      highlights: [
        "192 kHz / 24-bit high-resolution ultrasonic sampling",
        "Sub-micron precision displacement & harmonic tracking",
        "Tri-axial accelerometer + internal piezoelectric acoustic mic",
        "Automated ISO 10816 / 20816 velocity severity scoring"
      ],
      metric: "+30 Days",
      metricLabel: "Earliest Anomaly Warning Window",
      badge: "STREAMING: 192 kHz NOMINAL",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Ultrasonic vibration monitoring on precision machinery"
    },
    {
      id: "ai-copilot",
      tabTitle: "AI Root-Cause Copilot",
      icon: BrainCircuit,
      kicker: "02 / ROOT-CAUSE INTELLIGENCE",
      title: "Plain-English Diagnostics Instead of Complex Charts",
      tagline: "Translating 2.4 million sensor points into 1 clear repair action.",
      description: "Factory technicians shouldn't need a PhD in signal processing to understand machine alerts. SENSORSAE's edge neural models interpret harmonic spectrums locally and dispatch clear, actionable repair recommendations directly to maintenance radios and smartphones.",
      highlights: [
        "Zero raw waveform decoding required by field technicians",
        "Instant WhatsApp, SMS, Slack, and SAP CMMS dispatch",
        "Deterministic root cause: cavitation vs unbalance vs misalignment",
        "100% on-premise local inference with zero cloud dependency"
      ],
      metric: "99.98%",
      metricLabel: "Zero False-Alarm Confidence",
      badge: "LOCAL INFERENCE: < 3.8ms",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Technician reviewing plain-English alert on mobile tablet"
    },
    {
      id: "thermal-vision",
      tabTitle: "Thermal Vision Guard",
      icon: Eye,
      kicker: "03 / NON-CONTACT OPTICS",
      title: "Radiometric Hot-Spot & Thermal Boundary Inspection",
      tagline: "Safely monitor high-voltage lines and pump seals from 30 meters.",
      description: "Continuous long-wave infrared (LWIR) optical cameras detect overheating motor windings, loose electrical busbars, and pump seal leaks safely from a distance. Spatial AI automatically tracks regions of interest without requiring physical contact with hazardous machinery.",
      highlights: [
        "-40°C to +1,200°C calibrated radiometric temperature range",
        "±0.5°C thermal precision with differential delta thresholding",
        "Automated hot-spot bounding boxes & thermal runaway alerts",
        "ATEX Zone 2 hazardous environment rated enclosures"
      ],
      metric: "30 Meters",
      metricLabel: "Safe Non-Contact Standoff Distance",
      badge: "OPTICAL RADIOMETRY: CALIBRATED",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Radiometric thermal inspection of electrical and pump systems"
    },
    {
      id: "magnetic-pods",
      tabTitle: "Magnetic Edge Pods",
      icon: Zap,
      kicker: "04 / RAPID DEPLOYMENT",
      title: "Snap-On Deployment in 45 Minutes with Zero Downtime",
      tagline: "No conduit routing, no drilling, and no production line pauses.",
      description: "Engineered specifically for operating factory floors where halting a production line costs tens of thousands of dollars per minute. Neodymium magnetic bases snap firmly onto any cast iron or steel motor housing, immediately meshing with your plant network.",
      highlights: [
        "120 kg high-strength neodymium magnetic breakaway mount",
        "5+ Year field-replaceable lithium thionyl chloride battery",
        "IP67 sealed waterproof, chemical, and vibration-proof chassis",
        "Sub-GHz industrial wireless mesh with 1.2 km line-of-sight range"
      ],
      metric: "< 45 Min",
      metricLabel: "Turnkey Plant Setup Window",
      badge: "MESH LINK: 100% NOMINAL",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Industrial technician mounting magnetic edge sensor pod"
    }
  ];

  const current = capabilities[activeTab];
  const IconComponent = current.icon;

  return (
    <section id="features" className="py-24 bg-[#080c14] border-y border-blue-950/40 relative">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30">
            SYSTEM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineered for Zero Downtime.
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Explore the 4 core pillars that make SENSORSAE the industry standard for predictive plant reliability.
          </p>
        </div>

        {/* Interactive Capability Navigation Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
          {capabilities.map((cap, idx) => {
            const TabIcon = cap.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 relative group ${
                  isSelected
                    ? 'bg-blue-950/70 border-blue-400 shadow-glow-sm text-white'
                    : 'bg-[#0b0f19]/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-blue-900/60'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-glow-sm' 
                    : 'bg-slate-900 text-blue-400 group-hover:bg-blue-950/80'
                }`}>
                  <TabIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-blue-400/80 block font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold block leading-snug">
                    {cap.tabTitle}
                  </span>
                </div>
                {isSelected && (
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-400 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feature Interactive Showcase Console */}
        <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 lg:p-12 shadow-glow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-400 font-mono text-xs">
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{current.kicker}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  {current.title}
                </h3>
                <p className="text-blue-300 font-medium text-sm">
                  {current.tagline}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed pt-1">
                  {current.description}
                </p>
              </div>

              {/* Technical Highlights Checklist */}
              <div className="space-y-2.5 pt-2">
                {current.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Impact Metric Card & CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-slate-800">
                <div className="space-y-1">
                  <span className="text-3xl font-black text-white font-mono text-glow">
                    {current.metric}
                  </span>
                  <span className="text-xs text-slate-400 block font-mono">
                    {current.metricLabel}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={onRequestDemo}
                    className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Request Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  {onExploreProducts && (
                    <button
                      onClick={onExploreProducts}
                      className="px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 transition-all"
                    >
                      Specifications
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-[#06080d] group">
                <img 
                  src={current.image} 
                  alt={current.imageAlt}
                  className="w-full h-80 sm:h-[420px] object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080d]/90 via-[#06080d]/20 to-transparent pointer-events-none"></div>

                {/* Live Telemetry Floating Status Tag */}
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#06080d]/80 backdrop-blur-md border border-blue-500/40 text-slate-200 font-mono text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                  <span>{current.badge}</span>
                </div>

                {/* Bottom Quick Indicator Switcher */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#06080d]/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800 text-xs">
                  <span className="text-slate-400 font-mono text-[11px]">
                    Viewing capability <strong className="text-white">{activeTab + 1} of 4</strong>
                  </span>
                  <div className="flex items-center gap-1.5">
                    {capabilities.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setActiveTab(dotIdx)}
                        className={`h-1.5 rounded-full transition-all ${
                          activeTab === dotIdx ? 'w-6 bg-blue-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Switch to capability ${dotIdx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
