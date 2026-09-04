import React from 'react';
import { ArrowRight, CheckCircle, LayoutDashboard, Sparkles, ShieldCheck } from 'lucide-react';
import { clientLogos } from '../data/mockData';

export const Hero = ({ onExploreProducts, onOpenDashboard, onRequestDemo }) => {
  return (
    <section className="relative min-h-[92vh] pt-32 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Background Industrial Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80" 
          alt="High-tech automated manufacturing facility" 
          className="w-full h-full object-cover object-center brightness-[0.22] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/80 to-[#06080d]/90"></div>
        <div className="absolute inset-0 bg-radial-gradient opacity-60"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-0"></div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/70 border border-blue-500/30 backdrop-blur-md mb-8 shadow-glow-sm">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="font-mono text-xs tracking-wider text-blue-300 uppercase font-semibold">
            SMART SENSOR INTELLIGENCE • NVIDIA ORIN™ POWERED
          </span>
        </div>

        {/* Big, Clear Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Stop Factory Downtime <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-500">
            Before It Costs Millions.
          </span>
        </h1>

        {/* Simple, Non-Techy Subheadline */}
        <p className="max-w-3xl mx-auto text-base sm:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          SENSORSAE listens to ultrasonic vibration and heat across your pumps, motors, and machines. Get automatic alerts <strong className="text-white">up to 30 days before bearings break</strong>—installed in 45 minutes with zero line stoppages.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto mb-12">
          <button
            onClick={onRequestDemo}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2.5 group"
          >
            <span>Claim 30-Day Risk-Free Trial</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
          </button>

          <button
            onClick={onOpenDashboard}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#0b0f19]/90 hover:bg-blue-950/60 text-blue-300 hover:text-white font-semibold text-base border border-blue-500/30 hover:border-blue-400 transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4 text-blue-400" />
            <span>Launch Live Dashboard</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>Zero Cloud Risk (100% On-Prem)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>Magnetic Snap-On Setup</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-blue-400" />
            <span>30-Day Money-Back Guarantee</span>
          </div>
        </div>

      </div>

      {/* Client Logo & Trust Marquee */}
      <div className="relative z-10 w-full border-t border-blue-900/30 bg-[#06080d]/80 backdrop-blur-md py-5 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-500 whitespace-nowrap">
              TRUSTED AT SCALE BY:
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 sm:gap-10 opacity-75">
              {clientLogos.map((logo, idx) => (
                <span key={idx} className="font-mono text-xs sm:text-sm font-bold text-slate-400 hover:text-white transition-colors tracking-wider">
                  {logo}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
