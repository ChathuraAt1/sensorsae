import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Building2, Quote, CheckCircle2 } from 'lucide-react';
import { marketingCaseStudies } from '../data/mockData';

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? marketingCaseStudies.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === marketingCaseStudies.length - 1 ? 0 : prev + 1));
  };

  const current = marketingCaseStudies[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#06080d] border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
              INTERACTIVE FIELD STORIES
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Proven in the World's Toughest Plants.
            </h2>
            <p className="text-slate-400 text-base">
              Explore verified case studies from operational leaders across different manufacturing sectors.
            </p>
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-[#0b0f19] hover:bg-blue-950 border border-slate-800 hover:border-blue-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-slate-400">
              0{activeIndex + 1} / 0{marketingCaseStudies.length}
            </span>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-[#0b0f19] hover:bg-blue-950 border border-slate-800 hover:border-blue-500/50 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Industry Selector Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {marketingCaseStudies.map((study, idx) => (
            <button
              key={study.id}
              onClick={() => setActiveIndex(idx)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs font-semibold whitespace-nowrap transition-all border ${
                activeIndex === idx
                  ? 'bg-blue-600 text-white border-blue-400 shadow-glow-sm'
                  : 'bg-[#0b0f19] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {study.badge}
            </button>
          ))}
        </div>

        {/* Interactive Main Story Card */}
        <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 sm:p-12 shadow-glow-md relative overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Quote and Customer Story */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="flex text-blue-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-blue-400" />
                  ))}
                </div>
                <span className="font-mono text-xs text-slate-400">
                  {current.client} • {current.location}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                "{current.headline}"
              </h3>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed italic">
                "{current.story}"
              </p>

              <div className="pt-2 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold font-mono text-xs">
                  {current.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{current.author}</div>
                  <div className="text-xs text-slate-400 font-mono">{current.role}</div>
                </div>
              </div>
            </div>

            {/* Right Column: Key Metric Highlight Card */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="p-8 rounded-2xl bg-[#06080d] border border-blue-500/30 text-center space-y-3 shadow-sm">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-widest block">
                  VERIFIED OUTCOME
                </span>
                <div className="font-mono text-3xl sm:text-4xl font-extrabold text-blue-400 tracking-tight">
                  {current.metric}
                </div>
                <div className="text-xs text-slate-400 font-sans">
                  Measured across {current.client} production facilities.
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-center gap-1.5 text-[11px] font-mono text-blue-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Zero Unplanned Outages</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
