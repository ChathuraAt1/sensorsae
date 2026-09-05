import React, { useState } from 'react';
import { ArrowRight, Activity, BrainCircuit, Eye, Zap, CheckCircle2 } from 'lucide-react';

export const ProductFeatures = ({ onRequestDemo, onExploreProducts }) => {
  const [activeTab, setActiveTab] = useState(0);

  const capabilities = [
    {
      id: "ultrasonic",
      tabTitle: "Acoustic & Vibration",
      icon: Activity,
      kicker: "01 / CONTINUOUS VISIBILITY",
      title: "High-Frequency Acoustic & Vibration Telemetry",
      tagline: "Detect micro-friction weeks before parts overheat or seize.",
      description: "Standard sensors only alert you after bearing damage causes heavy oscillations. SENSORSAE's high-frequency acoustic listening arrays capture micro-friction at early stages of lubrication breakdown, giving your team time to schedule maintenance during regular shift transitions.",
      highlights: [
        "High-resolution vibration and acoustic sampling",
        "Continuous displacement and harmonic frequency tracking",
        "Tri-axial accelerometer with integrated acoustic sensor",
        "Automated ISO 10816 / 20816 velocity severity guidelines"
      ],
      benefitSummary: "Tri-Axial Vibration • Acoustic Sensor • Early Wear Detection",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Vibration monitoring on precision industrial machinery"
    },
    {
      id: "ai-copilot",
      tabTitle: "Plain-English Alerts",
      icon: BrainCircuit,
      kicker: "02 / ACTIONABLE INTELLIGENCE",
      title: "Plain-English Diagnostics Instead of Complex Charts",
      tagline: "Translates complex frequency spectrums into clear work orders.",
      description: "Factory technicians shouldn't need a specialist in digital signal processing to understand machine alerts. SENSORSAE's local diagnostic engine interprets vibration signatures and dispatches clear, actionable repair recommendations directly to maintenance tablets and smartphones.",
      highlights: [
        "No manual waveform decoding required by field technicians",
        "Instant SMS, WhatsApp, Slack, and email notifications",
        "Clear fault isolation: cavitation, unbalance, or shaft misalignment",
        "100% on-premise evaluation with zero cloud dependence"
      ],
      benefitSummary: "Actionable Work Orders • Multi-Channel Dispatch • Zero Cloud Required",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Technician reviewing plain-English alert on mobile tablet"
    },
    {
      id: "thermal-vision",
      tabTitle: "Thermal Vision Guard",
      icon: Eye,
      kicker: "03 / NON-CONTACT OPTICS",
      title: "Radiometric Hot-Spot & Thermal Boundary Inspection",
      tagline: "Safely monitor high-voltage lines and pump seals from a distance.",
      description: "Continuous long-wave infrared (LWIR) optical cameras detect overheating motor windings, loose electrical busbars, and pump seal leaks safely from a standoff distance without requiring physical contact with dangerous or moving machinery.",
      highlights: [
        "Calibrated radiometric temperature tracking across wide operating ranges",
        "Continuous thermal delta and differential thresholding",
        "Automated hot-spot bounding boxes and temperature boundary alerts",
        "Designed for hazardous industrial plant environments"
      ],
      benefitSummary: "Non-Contact Stand-Off • Hot-Spot Tracking • Thermal Boundary Alerts",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Radiometric thermal inspection of electrical and pump systems"
    },
    {
      id: "magnetic-pods",
      tabTitle: "Magnetic Snap-On",
      icon: Zap,
      kicker: "04 / RAPID DEPLOYMENT",
      title: "Quick Snap-On Deployment with Zero Downtime",
      tagline: "No conduit routing, no drilling, and no production line pauses.",
      description: "Engineered specifically for operating factory floors where halting a production line is costly. High-strength magnetic bases attach securely onto cast iron or steel motor housings, communicating immediately with your local plant hub.",
      highlights: [
        "High-strength industrial magnetic breakaway mount",
        "Multi-year field-replaceable battery for untethered operation",
        "IP67 sealed waterproof, chemical, and vibration-resistant chassis",
        "Industrial wireless mesh with long-range plant coverage"
      ],
      benefitSummary: "Magnetic Mount • Multi-Year Battery • IP67 Industrial Chassis",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Industrial technician mounting magnetic edge sensor pod"
    }
  ];

  const current = capabilities[activeTab];
  const IconComponent = current.icon;

  return (
    <section id="features" className="py-20 bg-[#080c14] border-y border-blue-950/40 relative">
      <div className="max-w-7xl mx-auto px-6 space-y-12 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30">
            SYSTEM CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Practical Plant Operations.
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            Explore the core monitoring capabilities designed to keep factory equipment running smoothly.
          </p>
        </div>

        {/* Interactive Capability Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {capabilities.map((cap, idx) => {
            const TabIcon = cap.icon;
            const isSelected = activeTab === idx;
            return (
              <button
                key={cap.id}
                onClick={() => setActiveTab(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 relative group ${
                  isSelected
                    ? 'bg-blue-950/70 border-blue-400 shadow-glow-sm text-white'
                    : 'bg-[#0b0f19]/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-blue-900/60'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                  isSelected 
                    ? 'bg-blue-600 text-white shadow-glow-sm' 
                    : 'bg-slate-900 text-blue-400 group-hover:bg-blue-950/80'
                }`}>
                  <TabIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block leading-snug">
                    {cap.tabTitle}
                  </span>
                </div>
                {isSelected && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-blue-400 rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feature Presentation Console */}
        <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 lg:p-10 shadow-glow-sm overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2.5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-400 font-mono text-xs">
                  <IconComponent className="w-3.5 h-3.5" />
                  <span>{current.kicker}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {current.title}
                </h3>
                <p className="text-blue-300 font-medium text-sm">
                  {current.tagline}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-1">
                  {current.description}
                </p>
              </div>

              {/* Technical Highlights */}
              <div className="space-y-2 pt-1">
                {current.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Clean Benefit Summary & CTAs */}
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-800">
                <div className="font-mono text-xs text-slate-400">
                  {current.benefitSummary}
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
                  className="w-full h-72 sm:h-96 object-cover object-center brightness-95 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080d]/80 via-transparent to-transparent pointer-events-none"></div>

                {/* Bottom Quick Switcher */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#06080d]/85 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-800 text-xs">
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
