import React from 'react';
import { ArrowRight, LayoutDashboard } from 'lucide-react';
import { clientLogos } from '../data/mockData';

export const Hero = ({ onExploreProducts, onOpenDashboard, onRequestDemo }) => {
  return (
    <section className="relative min-h-[88vh] pt-36 pb-20 flex flex-col justify-between overflow-hidden bg-[#06080d]">
      {/* Background Image with Dark Moody Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80" 
          alt="Smart Factory Floor" 
          className="w-full h-full object-cover object-center brightness-[0.18] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/70 to-[#06080d]/90"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center my-auto space-y-8">
        {/* Simple Pill Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/50 border border-blue-500/25 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          <span className="font-mono text-xs tracking-widest text-blue-300 uppercase">
            INDUSTRIAL EQUIPMENT INTELLIGENCE
          </span>
        </div>

        {/* Big Clean Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.12]">
          Detect Equipment Issues <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">
            Before They Disrup Operations
          </span>
        </h1>

        {/* Minimalist Subtext (2 lines only) */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
          Sensorsae monitors vibration and temperature data to help teams identify potential equipment issues and plan maintenance earlier.
        </p>

        {/* Clean CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onExploreProducts}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2 group"
          >
            <span>Explore SensorGuard S.1</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={onRequestDemo}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#0b0f19] hover:bg-blue-950/60 text-slate-200 hover:text-white font-semibold text-xs border border-blue-900/60 hover:border-blue-500/50 transition-all flex items-center justify-center gap-2"
          >
            <span>Request a Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onOpenDashboard && onOpenDashboard({ tab: 'overview' })}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-blue-300 hover:text-white font-semibold text-xs border border-blue-500/30 hover:border-blue-400 shadow-glow-sm transition-all flex items-center justify-center gap-2 font-mono"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
            <span>Launch Dashboard (/dashboard)</span>
          </button>
        </div>
      </div>

      {/* Client Logos Bar */}
      <div className="relative z-10 w-full border-t border-slate-900 bg-[#06080d]/80 backdrop-blur-sm py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60">
          {clientLogos.map((logo, idx) => (
            <span key={idx} className="font-mono text-xs sm:text-sm tracking-wider font-semibold text-slate-400">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
