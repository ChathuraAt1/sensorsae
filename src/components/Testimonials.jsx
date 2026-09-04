import React from 'react';
import { Star } from 'lucide-react';
import { marketingCaseStudies } from '../data/mockData';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#06080d] border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
            CUSTOMER PROOF
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Plant Leaders.
          </h2>
          <p className="text-slate-400 text-base">
            Proven inside fabs, refineries, and automotive gigafactories.
          </p>
        </div>

        {/* 3 Clean Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketingCaseStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 flex flex-col justify-between space-y-6 hover:border-blue-500/40 transition-all"
            >
              <div className="space-y-4">
                <div className="flex text-blue-400 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-blue-400" />
                  ))}
                </div>
                <h3 className="text-base font-bold text-white leading-snug">
                  "{study.headline}"
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{study.story}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">{study.author}</div>
                  <div className="text-[11px] text-slate-400">{study.role}</div>
                </div>
                <span className="text-xs font-mono font-bold text-blue-400">
                  {study.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
