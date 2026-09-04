import React, { useState } from 'react';
import { 
  Layers, Smartphone, TrendingUp, ShieldCheck, Sparkles, 
  Activity, Bell, CheckCircle2, ArrowRight, Zap, Eye, Cpu 
} from 'lucide-react';

export const MasonryBento = ({ onRequestDemo }) => {
  const [selectedMachine, setSelectedMachine] = useState(0);

  const plantMachines = [
    { name: "Pump Array B-04", status: "Optimal", health: "99.2%", alert: "Normal Operation" },
    { name: "Gas Turbine T-02", status: "Optimal", health: "98.8%", alert: "Normal Operation" },
    { name: "CNC Spindle 12", status: "Proactive Notice", health: "94.1%", alert: "Lubrication recommended in 48h" },
    { name: "Extruder Motor 08", status: "Optimal", health: "99.9%", alert: "Normal Operation" }
  ];

  return (
    <section id="bento" className="py-24 bg-[#06080d] border-t border-b border-blue-900/25 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 mb-4">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
              NEXT-GEN PLANT INTELLIGENCE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            Everything Your Operations Team Needs.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Engineered for high-performing plant managers and reliability teams who refuse to accept unplanned downtime as a cost of doing business.
          </p>
        </div>

        {/* ============================================================ */}
        {/* CREATIVE MASONRY / BENTO GRID */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* 1. LARGE BENTO CARD: Live Production Floor Digital Twin (Spans 2 columns on lg) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 shadow-glow-sm flex flex-col justify-between relative overflow-hidden group hover:border-blue-400/60 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-wider bg-blue-950/80 px-3 py-1 rounded-full border border-blue-900">
                  REAL-TIME VISIBILITY
                </span>
                <span className="font-mono text-xs text-white bg-blue-600 px-3 py-1 rounded-full font-semibold">
                  LIVE DIGITAL TWIN
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Live Plant Floor Heatmap
              </h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Monitor the real-time health of every critical motor, pump, and gearbox on a single interactive floor map. Click any machine to check its telemetry status.
              </p>

              {/* Interactive Machine Status Selector */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {plantMachines.map((mach, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedMachine(idx)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      selectedMachine === idx
                        ? 'bg-blue-950/60 border-blue-400 shadow-glow-sm'
                        : 'bg-[#06080d] border-blue-900/40 hover:border-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-bold text-white truncate">{mach.name}</span>
                      <span className="text-blue-400">{mach.health}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${mach.status === 'Optimal' ? 'bg-blue-400' : 'bg-blue-300 animate-pulse'}`}></span>
                      <span>{mach.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Machine Telemetry Insight Callout */}
              <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/50 font-mono text-xs">
                <div className="text-slate-400 uppercase text-[10px] mb-1">CURRENT DIAGNOSTIC:</div>
                <div className="text-blue-300 font-bold">{plantMachines[selectedMachine].name}: {plantMachines[selectedMachine].alert}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
              <span>Overall Factory Health: <strong className="text-white">98.2% Nominal</strong></span>
              <span className="text-blue-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping"></span>
                148k Streams Active
              </span>
            </div>
          </div>

          {/* 2. TALL BENTO CARD: Instant Mobile & WhatsApp Alerts */}
          <div className="md:col-span-1 lg:col-span-1 rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 shadow-glow-sm flex flex-col justify-between group hover:border-blue-400/60 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <Bell className="w-6 h-6 animate-pulse" />
              </div>

              <span className="font-mono text-xs text-blue-400 uppercase tracking-wider block mb-2 font-semibold">
                MOBILE DISPATCH
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Instant Phone Alerts
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Send plain-English alerts straight to your technicians' phones via SMS, Slack, or WhatsApp the second an anomaly brews.
              </p>

              {/* Visual Push Notification Card */}
              <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-500/40 font-mono text-xs space-y-2 shadow-sm">
                <div className="flex items-center justify-between text-slate-400 text-[10px]">
                  <span>SENSORSAE BOT</span>
                  <span>JUST NOW</span>
                </div>
                <div className="font-bold text-white text-[11px] leading-snug">
                  ⚠️ Line 4 Compressor: Air filter pressure drop detected.
                </div>
                <div className="text-blue-300 text-[10px]">
                  Tap to open 3-step cleaning checklist &rarr;
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-400">
              Zero alarms missed during shift handovers.
            </div>
          </div>

          {/* 3. TALL BENTO CARD: Air-Gapped Security Shield */}
          <div className="md:col-span-1 lg:col-span-1 rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 shadow-glow-sm flex flex-col justify-between group hover:border-blue-400/60 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>

              <span className="font-mono text-xs text-blue-400 uppercase tracking-wider block mb-2 font-semibold">
                100% AIR-GAPPED
              </span>
              <h3 className="text-xl font-bold text-white mb-2">
                Zero Cloud Risks
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                Engineered for defense, semiconductor, and petrochemical facilities. Sensor data never leaves your plant perimeter.
              </p>

              <div className="space-y-2 font-mono text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>No corporate WiFi needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>IEC 62443 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  <span>Immune to external outages</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800/80 text-xs font-mono text-blue-400">
              Your proprietary IP stays 100% private.
            </div>
          </div>

          {/* 4. MEDIUM BENTO CARD: High-ROI Economics (Spans 2 cols on md/lg) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 shadow-glow-sm flex flex-col justify-between group hover:border-blue-400/60 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-wider bg-blue-950/80 px-3 py-1 rounded-full border border-blue-900">
                  GUARANTEED RETURN ON INVESTMENT
                </span>
                <span className="font-mono text-xs text-white bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                  3.4x AVERAGE ROI
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                $14.2 Million in Prevented Losses
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Catching just <strong className="text-white">one catastrophic bearing seizure</strong> pays for the entire SENSORSAE installation for the next 5 years.
              </p>

              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 text-center font-mono">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">&lt; 90 Days</div>
                  <div className="text-[10px] text-slate-400 uppercase">Payback Period</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-blue-400">-78%</div>
                  <div className="text-[10px] text-slate-400 uppercase">Micro-Stoppages</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white">100%</div>
                  <div className="text-[10px] text-slate-400 uppercase">On-Time Orders</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400">Validated across 140+ manufacturing sites worldwide</span>
              <button
                onClick={onRequestDemo}
                className="text-blue-400 hover:text-white flex items-center gap-1 font-bold"
              >
                <span>Request Plant Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 5. MEDIUM BENTO CARD: AI Root Cause Explainer (Spans 2 cols on md/lg) */}
          <div className="md:col-span-2 lg:col-span-2 rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 shadow-glow-sm flex flex-col justify-between group hover:border-blue-400/60 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-blue-400 uppercase tracking-wider bg-blue-950/80 px-3 py-1 rounded-full border border-blue-900">
                  NO MORE GUESSWORK
                </span>
                <span className="font-mono text-xs text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                  ROOT CAUSE SYNTHESIS
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                From 100,000 Numbers to One Clear Sentence
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Most sensor platforms drown your operators in graphs they don't have time to analyze. SENSORSAE synthesizes vibration, heat, and acoustics into an exact action plan.
              </p>

              <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 font-mono text-xs space-y-2">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SYNTHESIZED MAINTENANCE RECOMMENDATION</span>
                </div>
                <p className="text-slate-200 font-sans text-xs sm:text-sm leading-relaxed">
                  "Line 2 Hydro-Pump: Suction pressure dropped 12% due to inlet debris. Open valve V-102 to clear blockage before impeller cavitates."
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Eliminates 3+ hours of daily diagnostic guesswork</span>
              <span className="text-blue-400 font-semibold">Zero Training Needed</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
