import React, { useState } from 'react';
import { Activity, Zap, Eye, Check, ChevronRight, BarChart2, Radio, Sliders } from 'lucide-react';
import { capabilities } from '../data/mockData';

export const Capabilities = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Icon mapping
  const iconMap = {
    Activity: Activity,
    Zap: Zap,
    Eye: Eye,
  };

  return (
    <section id="capabilities" className="relative py-28 bg-[#06080d] border-b border-blue-900/25 overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">CORE CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Telemetry Processing at Industrial Extremes.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Engineered to process massive high-bandwidth physical sensor feeds directly where data originates.
          </p>
        </div>

        {/* Feature Grid & Interactive Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Capability Selector Cards */}
          <div className="lg:col-span-6 space-y-4">
            {capabilities.map((item, idx) => {
              const Icon = iconMap[item.icon] || Activity;
              const isSelected = activeTab === idx;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border ${
                    isSelected 
                      ? 'bg-[#0b0f19] border-blue-500/50 shadow-glow-md' 
                      : 'bg-[#0b0f19]/50 border-blue-900/30 hover:border-blue-700/50 hover:bg-[#0b0f19]/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'bg-blue-600 text-white shadow-glow-sm' 
                          : 'bg-blue-950/40 text-blue-400 border border-blue-900/50'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {item.title}
                          </h3>
                        </div>
                        <span className="font-mono text-xs text-blue-400 font-medium">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-500/20 text-blue-300">
                      {item.metric}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Telemetry Visualizer & Technical Specs */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="h-full rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 flex flex-col justify-between shadow-glow-sm">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></div>
                    <span className="font-mono text-xs tracking-wider uppercase text-slate-300 font-semibold">
                      TELEMETRY BUS: {capabilities[activeTab].badge}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800">
                    CHANNEL ACTIVE
                  </span>
                </div>

                {/* Simulated Telemetry Waveform / FFT Canvas display */}
                <div className="mt-6 p-5 rounded-2xl bg-[#06080d] border border-blue-900/40 font-mono">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                    <span>LIVE HARMONICS (FFT SPECTRUM)</span>
                    <span className="text-blue-400">192 kHz SAMPLING</span>
                  </div>

                  {/* Simulated Waveform Bars */}
                  <div className="h-28 flex items-end justify-between gap-1 pt-4 pb-1">
                    {[38, 45, 62, 28, 75, 92, 54, 30, 48, 88, 65, 42, 50, 78, 35, 60, 82, 49, 31, 70, 95, 44, 25, 58].map((val, i) => (
                      <div key={i} className="w-full flex flex-col items-center gap-1 group relative">
                        <div 
                          className="w-full rounded-t-sm transition-all duration-500 group-hover:brightness-125"
                          style={{
                            height: `${((val * (activeTab + 1) * 37) % 90) + 10}%`,
                            backgroundColor: i === 12 || i === 20 ? '#93c5fd' : '#3b82f6',
                            boxShadow: i === 12 || i === 20 ? '0 0 10px #93c5fd' : '0 0 4px rgba(59, 130, 246, 0.4)'
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                    <span>0 Hz (Fundamental)</span>
                    <span>48 kHz (1st Harmonic)</span>
                    <span>96 kHz (Nyquist Peak)</span>
                  </div>
                </div>

                {/* Technical Specifications for Selected Capability */}
                <div className="mt-8 space-y-4">
                  <h4 className="font-mono text-xs uppercase tracking-widest text-slate-400">
                    BENCHMARK HARDWARE SPECIFICATIONS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {capabilities[activeTab].specs.map((s, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-900/40">
                        <div className="text-[11px] font-mono text-slate-400 mb-1">{s.label}</div>
                        <div className="text-sm font-mono font-bold text-white">{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Status Readout */}
              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-400">STATUS:</span>
                <span className="text-blue-400 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  STREAM SYNCHRONIZED (JITTER &lt; 400ns)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
