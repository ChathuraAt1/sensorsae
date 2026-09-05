import React from 'react';
import { ArrowRight, Building2, MapPin, FileText } from 'lucide-react';

export const AboutCompany = ({ onRequestDemo }) => {
  const pillars = [
    {
      kicker: "OUR ORIGIN",
      title: "Born on the Assembly Line",
      description: "Founded by veteran plant maintenance engineers who experienced the frustration of midnight bearing seizures and halted production shifts. We built SENSORSAE to give operations leaders simple, early warnings before damage spreads.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      tag: "Engineered by Operators",
    },
    {
      kicker: "SECURITY POSTURE",
      title: "100% Air-Gapped & Sovereign",
      description: "Industrial telemetry belongs exclusively to the manufacturer. Our system operates entirely on-premises inside your OT network, with zero mandatory cloud uplinks and full air-gap compliance.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      tag: "Zero Cloud Exposure",
    },
    {
      kicker: "PRAGMATIC SIMPLICITY",
      title: "Plain English Work Orders",
      description: "You shouldn't need a specialist in vibration physics to maintain a motor. SENSORSAE automatically converts complex machine frequencies into clear, prioritized work orders sent directly to maintenance radios.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      tag: "Actionable Maintenance",
    }
  ];

  const facilities = [
    {
      city: "Austin, Texas",
      role: "Global Headquarters & Systems Software",
      detail: "Silicon Hills Engineering Campus",
    },
    {
      city: "Detroit, Michigan",
      role: "Acoustic & Heavy Industry R&D Lab",
      detail: "Automotive & Dyno Benchmark Facility",
    },
    {
      city: "San Jose, California",
      role: "Optics & Sensor Fusion Center",
      detail: "High-Speed Hardware Testing Lab",
    }
  ];

  return (
    <section id="about-company" className="py-20 bg-[#06080d] border-t border-b border-blue-950/40 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 space-y-16 relative">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 font-mono text-xs">
            <Building2 className="w-3.5 h-3.5" />
            <span>ABOUT SENSORSAE TECHNOLOGIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Founded on the Factory Floor.<br />
            Built to End Emergency Breakdowns.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            We are reliability engineers, hardware designers, and industrial technicians dedicated to making manufacturing machinery dependable, predictable, and simple to monitor.
          </p>
        </div>

        {/* 3 Core Pillars with Clean Photography */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="rounded-3xl bg-[#0b0f19] border border-slate-800 hover:border-blue-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#06080d]/80 backdrop-blur-md border border-blue-500/30 text-blue-400 font-mono text-[11px] font-semibold">
                  {pillar.tag}
                </div>
              </div>

              <div className="p-7 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="font-mono text-xs text-blue-400/80 uppercase font-semibold">
                    {pillar.kicker}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Facilities & Leadership Presence Card */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0b0f19] to-blue-950/40 border border-blue-500/30 p-8 sm:p-10 shadow-glow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            <div className="space-y-4 max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-bold">
                ENGINEERING FACILITIES &amp; LABS
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Designed, assembled, and supported in North America.
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                From high-speed acoustic test benches in Detroit to sensor engineering labs in Austin, our team supports continuous plant reliability across operating facilities.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all flex items-center gap-2"
                >
                  <span>Schedule Technical Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#download-factsheet"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('SENSORSAE Enterprise Factsheet is ready for download.');
                  }}
                  className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-mono text-xs border border-slate-800 transition-all flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Download Company Factsheet</span>
                </a>
              </div>
            </div>

            {/* Location List */}
            <div className="w-full lg:w-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 shrink-0">
              {facilities.map((fac, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-2xl bg-[#06080d]/80 border border-slate-800 space-y-1"
                >
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{fac.city}</span>
                  </div>
                  <div className="text-[11px] text-blue-300 font-medium">
                    {fac.role}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {fac.detail}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
