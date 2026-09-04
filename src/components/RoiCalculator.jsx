import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const RoiCalculator = ({ onRequestDemo }) => {
  const [machineCount, setMachineCount] = useState(18);
  const [downtimeCostPerHour, setDowntimeCostPerHour] = useState(24000);

  // Typical industrial metrics:
  // Average critical machine has 3.2 unplanned micro-failures per year without predictive AI (~18 hours total downtime/year/machine)
  // SENSORSAE prevents ~88% of unplanned failure downtime.
  const hoursSavedPerMachine = 14; 
  const totalHoursSaved = Math.round(machineCount * hoursSavedPerMachine);
  const annualSavings = Math.round(totalHoursSaved * downtimeCostPerHour);

  return (
    <section id="roi-calculator" className="py-24 bg-[#06080d] border-b border-blue-900/25 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 mb-3">
            <Calculator className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
              INTERACTIVE ROI ESTIMATOR
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Calculate Your Plant's Downtime Savings.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See how quickly SENSORSAE pays for itself based on your facility's critical machine count and hourly operational costs.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/40 p-8 sm:p-12 shadow-glow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Inputs */}
            <div className="lg:col-span-6 space-y-8">
              {/* Slider 1: Machine Count */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <span className="text-slate-300 uppercase tracking-wider font-semibold">
                    Number of Critical Machines
                  </span>
                  <span className="text-blue-400 font-bold text-base bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                    {machineCount} Machines
                  </span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="80"
                  step="2"
                  value={machineCount}
                  onChange={(e) => setMachineCount(Number(e.target.value))}
                  className="w-full h-2 bg-[#06080d] rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-2">
                  <span>4 Pilot Units</span>
                  <span>40 Plant Cell</span>
                  <span>80 Full Factory</span>
                </div>
              </div>

              {/* Slider 2: Hourly Downtime Cost */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs mb-3">
                  <span className="text-slate-300 uppercase tracking-wider font-semibold">
                    Average Cost per Hour of Downtime
                  </span>
                  <span className="text-blue-400 font-bold text-base bg-blue-950 px-3 py-1 rounded-full border border-blue-800">
                    ${downtimeCostPerHour.toLocaleString()} / hr
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="2500"
                  value={downtimeCostPerHour}
                  onChange={(e) => setDowntimeCostPerHour(Number(e.target.value))}
                  className="w-full h-2 bg-[#06080d] rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between font-mono text-[10px] text-slate-500 mt-2">
                  <span>$5,000 (Small Line)</span>
                  <span>$50,000 (Automotive)</span>
                  <span>$100,000+ (Chemical/Fab)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/30 text-xs font-mono text-slate-400 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Based on verified field data across 140+ industrial deployments.</span>
              </div>
            </div>

            {/* Right Output Box */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-950/50 via-[#06080d] to-[#06080d] border border-blue-500/50 text-center space-y-6">
                <div className="inline-flex items-center gap-1.5 font-mono text-xs text-blue-300 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  <span>PROJECTED ANNUAL RETURN</span>
                </div>

                <div>
                  <div className="font-mono text-4xl sm:text-5xl font-extrabold text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-blue-400">
                    ${(annualSavings / 1000000).toFixed(2)}M
                  </div>
                  <div className="font-mono text-xs text-slate-400 mt-1">
                    (${annualSavings.toLocaleString()} Annual Downtime Losses Prevented)
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-[#0b0f19] border border-blue-900/40">
                    <div className="text-slate-400 text-[10px] uppercase">Hours Saved</div>
                    <div className="text-lg font-bold text-white mt-0.5">{totalHoursSaved} hrs / yr</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0b0f19] border border-blue-900/40">
                    <div className="text-slate-400 text-[10px] uppercase">Est. Payback</div>
                    <div className="text-lg font-bold text-blue-400 mt-0.5">&lt; 38 Days</div>
                  </div>
                </div>

                <button
                  onClick={onRequestDemo}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Claim Your Custom Plant Savings Audit</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
