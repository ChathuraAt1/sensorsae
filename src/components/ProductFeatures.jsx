import React from 'react';
import { Activity, Bell, Radio, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProductFeatures = ({ onRequestDemo, onExploreProducts }) => {
  const featureList = [
    {
      id: "continuous-monitoring",
      tag: "FEATURE 01 • REAL-TIME VISIBILITY",
      title: "24/7 Machine Health at a Glance",
      description: "Stop relying on occasional manual walk-arounds with handheld vibration pens. SENSORSAE continuously monitors every motor, pump, and compressor across your plant, giving you total peace of mind around the clock.",
      bullets: [
        "Continuous 24/7 vibration and temperature tracking",
        "Clear color-coded status (Normal, Needs Attention, Critical)",
        "Works across legacy machines and brand new equipment"
      ],
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Plant engineer monitoring factory health on a tablet",
      reversed: false,
    },
    {
      id: "early-warnings",
      tag: "FEATURE 02 • PROACTIVE ALERTS",
      title: "Warnings Weeks Before Breakdowns Occur",
      description: "When a bearing starts to wear down, it emits microscopic high-frequency vibrations long before it generates heat or smoke. SENSORSAE flags these early signs up to 30 days in advance so you can schedule repairs during regular shift breaks.",
      bullets: [
        "Receive alerts up to 30 days before catastrophic failure",
        "Notifications sent directly to your phone via SMS, Slack, or email",
        "Zero false alarms: AI filters out standard factory background noise"
      ],
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Robotic industrial automation and machinery",
      reversed: true,
    },
    {
      id: "clamp-on-setup",
      tag: "FEATURE 03 • ZERO DOWNTIME INSTALL",
      title: "Snap-On Magnetic Installation in 45 Minutes",
      description: "You don't need to halt your production lines or hire specialized contractors. Our rugged sensor pods feature ultra-strong industrial magnetic bases that snap firmly onto existing motor casings in minutes.",
      bullets: [
        "100% non-invasive: no drilling, welding, or warranty voids",
        "Completely wireless communication to the central hub",
        "Waterproof, dustproof, and built for oily, vibrating environments"
      ],
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "Close-up of industrial machinery and precision equipment",
      reversed: false,
    },
    {
      id: "automated-reports",
      tag: "FEATURE 04 • ACTIONABLE REPORTING",
      title: "Simple Shift Reports in Plain English",
      description: "Say goodbye to complex charts and confusing waveform squiggles. SENSORSAE generates simple 1-page shift summaries and plain-English work orders so every technician knows exactly what needs attention.",
      bullets: [
        "Instant 1-click shift handover reports for team leads",
        "Plain-English diagnostic summaries (e.g. 'Lubricate pump bearing B')",
        "Exportable PDF work orders compatible with your existing maintenance workflow"
      ],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      imageAlt: "High-tech operations control room with status displays",
      reversed: true,
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#06080d] space-y-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 mb-4">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
              CORE CAPABILITIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Designed for Everyday Factory Operations.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            No complex engineering degrees required. Simple, reliable tools that keep your machines running smoothly.
          </p>
        </div>

        {/* Alternating Feature Sections */}
        <div className="space-y-28">
          {featureList.map((feat, idx) => (
            <div 
              key={feat.id} 
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
                feat.reversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Column */}
              <div className={`lg:col-span-6 space-y-6 ${feat.reversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider block">
                  {feat.tag}
                </span>
                <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
                  {feat.title}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  {feat.description}
                </p>

                {/* Bullet List */}
                <div className="space-y-3 pt-2">
                  {feat.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={onRequestDemo}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0b0f19] hover:bg-blue-950/60 text-blue-400 hover:text-white font-semibold text-sm border border-blue-500/30 hover:border-blue-400 transition-all group"
                  >
                    <span>Request Feature Demo</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Image Column */}
              <div className={`lg:col-span-6 ${feat.reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 shadow-glow-md group">
                  <img 
                    src={feat.image} 
                    alt={feat.imageAlt} 
                    className="w-full h-[400px] object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06080d]/80 via-transparent to-transparent pointer-events-none"></div>

                  {/* Feature Floating Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#0b0f19]/90 backdrop-blur-md border border-blue-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-200">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                      <span className="font-bold text-white">Live Factory Ready</span>
                    </div>
                    <span className="text-[11px] font-mono text-blue-400 uppercase">Plug &amp; Play</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
