import React from 'react';
import { Quote, Building2, TrendingUp, ShieldCheck, Star } from 'lucide-react';
import { marketingCaseStudies } from '../data/mockData';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#06080d] border-b border-blue-900/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 mb-4">
            <Star className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
              CUSTOMER SUCCESS STORIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Trusted by Leaders Who Cannot Afford Downtime.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            See how operations managers and plant engineers protect their manufacturing output with SENSORSAE.
          </p>
        </div>

        {/* 3 Case Study Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {marketingCaseStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 flex flex-col justify-between hover:border-blue-500/50 hover:shadow-glow-md transition-all duration-300"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider block mb-1">
                      {study.client}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      {study.location}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-blue-300 bg-blue-950 px-2.5 py-1 rounded-full border border-blue-900">
                    {study.badge}
                  </span>
                </div>

                {/* Headline */}
                <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                  "{study.headline}"
                </h3>

                {/* Story */}
                <p className="text-sm text-slate-300 leading-relaxed italic mb-8">
                  "{study.story}"
                </p>
              </div>

              <div>
                {/* Metric Badge */}
                <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/30 text-center mb-6">
                  <div className="font-mono text-2xl font-extrabold text-blue-400 tracking-tight">
                    {study.metric}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                    Verified Customer Outcome
                  </div>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold text-white">{study.author}</div>
                    <div className="text-xs text-slate-400 font-mono">{study.role}</div>
                  </div>
                  <div className="flex text-blue-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-blue-400" />
                    ))}
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
