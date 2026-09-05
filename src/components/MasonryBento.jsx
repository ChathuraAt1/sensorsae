import React from 'react';
import { Layers, Smartphone, ShieldCheck, TrendingUp, Bell } from 'lucide-react';

export const MasonryBento = () => {
  return (
    <section id="bento" className="py-24 bg-[#06080d] border-t border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
            PLATFORM HIGHLIGHTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for High Reliability.
          </h2>
          <p className="text-slate-400 text-base">
            Everything your operations team needs to eliminate surprise equipment breakdowns.
          </p>
        </div>

        {/* Clean, Uncluttered Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Floor Heatmap (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 flex flex-col justify-between space-y-6 hover:border-blue-500/40 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Live Production Floor Heatmap
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                See the real-time health and status of every machine across your facility on a single interactive map. Green indicates peak operation; blue indicates scheduled maintenance windows.
              </p>
            </div>

            {/* Clean Status Pill Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800/80 font-mono text-xs">
              <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800">
                <span className="text-slate-400 block text-[10px]">FEED PUMPS</span>
                <span className="text-white font-bold">100% Normal</span>
              </div>
              <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800">
                <span className="text-slate-400 block text-[10px]">TURBINES</span>
                <span className="text-white font-bold">Optimal</span>
              </div>
              <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800">
                <span className="text-slate-400 block text-[10px]">CNC CELLS</span>
                <span className="text-white font-bold">All Active</span>
              </div>
              <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800">
                <span className="text-slate-400 block text-[10px]">COMPRESSORS</span>
                <span className="text-blue-400 font-bold">Balanced</span>
              </div>
            </div>
          </div>

          {/* Card 2: Instant Alerts */}
          <div className="rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 flex flex-col justify-between space-y-6 hover:border-blue-500/40 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Bell className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Mobile Phone Alerts
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Direct SMS, Slack, or email notifications sent the moment an anomaly starts brewing—not after damage has already occurred.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/30 font-mono text-xs text-blue-300">
              <span className="text-[10px] text-slate-500 uppercase block mb-1">SAMPLE ALERT:</span>
              <span>"Line 4 Motor: Early bearing friction. Inspect at shift pause."</span>
            </div>
          </div>

          {/* Card 3: Air-Gapped Security */}
          <div className="rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 flex flex-col justify-between space-y-6 hover:border-blue-500/40 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                100% On-Premise
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Air-gapped architecture designed for defense and cleanroom standards. Your telemetry never leaves your factory network.
              </p>
            </div>

            <div className="font-mono text-xs text-slate-400 pt-4 border-t border-slate-800">
              Zero cloud exposure • Bank-grade encryption
            </div>
          </div>

          {/* Card 4: Economic ROI (Spans 2 cols on lg) */}
          {/* Card 4: Practical Operational Value (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 flex flex-col justify-between space-y-6 hover:border-blue-500/40 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Protect Critical Drive Trains &amp; Spindles
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
                Preventing a single unexpected machine seizure protects production schedules and pays for your monitoring hardware during your very first maintenance cycle.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800/80 font-mono text-center">
              <div>
                <div className="text-sm font-bold text-white">Fast Deployment</div>
                <div className="text-[10px] text-slate-400 uppercase">Magnetic Mount</div>
              </div>
              <div>
                <div className="text-sm font-bold text-blue-400">Early Warning</div>
                <div className="text-[10px] text-slate-400 uppercase">Acoustic Triaxial</div>
              </div>
              <div>
                <div className="text-sm font-bold text-white">Zero Cloud</div>
                <div className="text-[10px] text-slate-400 uppercase">Local On-Prem</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
