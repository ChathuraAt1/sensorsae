import React, { useState } from 'react';
import { 
  Cpu, Activity, ArrowLeft, Radio, AlertCircle, CheckCircle2, 
  TrendingUp, BarChart2, ShieldCheck, RefreshCw, Zap, Bell 
} from 'lucide-react';

export const DashboardPlaceholder = ({ onBackToHome }) => {
  const [selectedFeed, setSelectedFeed] = useState(0);

  const mockMachines = [
    { id: "PUMP-04", name: "Inlet Feed Pump 04", location: "Sector B", status: "Attention Needed", health: 91, vibration: "2.4 mm/s", temp: "68°C" },
    { id: "TURB-02", name: "Gas Turbine T-02", location: "Sector A", status: "Optimal", health: 99, vibration: "0.6 mm/s", temp: "84°C" },
    { id: "CNC-12", name: "5-Axis Milling Spindle", location: "Cell 3", status: "Optimal", health: 98, vibration: "0.9 mm/s", temp: "42°C" },
    { id: "COMP-01", name: "Screw Compressor 01", location: "Utility Bay", status: "Optimal", health: 97, vibration: "1.1 mm/s", temp: "55°C" },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 bg-[#06080d] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-blue-900/30">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b0f19] border border-blue-900/40 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all font-mono text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Main Site</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping"></span>
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                LIVE MACHINE DASHBOARD (/dashboard)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
              CLUSTER: ONLINE (4 NODES)
            </span>
            <span className="text-slate-400">DEMO SIMULATOR v2.4</span>
          </div>
        </div>

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-blue-900/40">
            <div className="text-xs font-mono text-slate-400 mb-1">TOTAL CONNECTED SENSORS</div>
            <div className="text-2xl sm:text-3xl font-bold text-white">48 Pods</div>
            <div className="text-[11px] font-mono text-blue-400 mt-1">100% Signal Strength</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-blue-900/40">
            <div className="text-xs font-mono text-slate-400 mb-1">AVERAGE PLANT HEALTH</div>
            <div className="text-2xl sm:text-3xl font-bold text-white">98.4%</div>
            <div className="text-[11px] font-mono text-blue-400 mt-1">Normal Operating State</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-blue-900/40">
            <div className="text-xs font-mono text-slate-400 mb-1">PREVENTED ANOMALIES</div>
            <div className="text-2xl sm:text-3xl font-bold text-white">12 This Quarter</div>
            <div className="text-[11px] font-mono text-blue-400 mt-1">Est. $184,000 Saved</div>
          </div>
          <div className="p-5 rounded-2xl bg-[#0b0f19] border border-blue-900/40">
            <div className="text-xs font-mono text-slate-400 mb-1">SECURITY STATUS</div>
            <div className="text-2xl sm:text-3xl font-bold text-white">Air-Gapped</div>
            <div className="text-[11px] font-mono text-blue-400 mt-1">0 External Egress Packets</div>
          </div>
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Machine List (Left) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">
              ACTIVE MACHINE TELEMETRY FEEDS
            </h3>
            {mockMachines.map((mach, idx) => (
              <div
                key={mach.id}
                onClick={() => setSelectedFeed(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedFeed === idx
                    ? 'bg-blue-950/60 border-blue-400 shadow-glow-sm'
                    : 'bg-[#0b0f19] border-blue-900/30 hover:border-blue-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-mono text-xs text-blue-400 font-bold">{mach.id}</span>
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full ${
                    mach.status === 'Optimal' 
                      ? 'bg-blue-950 text-blue-300 border border-blue-800' 
                      : 'bg-blue-900 text-blue-200 border border-blue-400 animate-pulse'
                  }`}>
                    {mach.status}
                  </span>
                </div>
                <div className="font-bold text-white text-sm">{mach.name}</div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mt-3 pt-2 border-t border-slate-800/80">
                  <span>Vibe: {mach.vibration}</span>
                  <span>Temp: {mach.temp}</span>
                  <span className="text-white font-bold">{mach.health}% Health</span>
                </div>
              </div>
            ))}
          </div>

          {/* Machine Deep Inspection (Right) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="font-mono text-xs text-blue-400 uppercase">
                    {mockMachines[selectedFeed].id} • {mockMachines[selectedFeed].location}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    {mockMachines[selectedFeed].name}
                  </h2>
                </div>
                <div className="text-right font-mono">
                  <div className="text-xs text-slate-400">HEALTH SCORE</div>
                  <div className="text-2xl font-bold text-blue-400">
                    {mockMachines[selectedFeed].health}%
                  </div>
                </div>
              </div>

              {/* Simulated Live Vibration Waveform */}
              <div className="p-5 rounded-2xl bg-[#06080d] border border-blue-900/40 font-mono">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span>LIVE TRIAXIAL VIBRATION (ACCELEROMETER STREAM)</span>
                  <span className="text-blue-400">STREAMING • 48 kHz</span>
                </div>
                {/* Waveform graphic bars */}
                <div className="h-24 flex items-end justify-between gap-1 py-2">
                  {[24, 38, 45, 60, 32, 70, 85, 48, 30, 52, 68, 92, 45, 30, 55, 78, 35, 60, 80, 42, 33, 65, 88, 40].map((val, i) => (
                    <div 
                      key={i} 
                      className="w-full rounded-t-sm transition-all duration-300"
                      style={{
                        height: `${(val * (selectedFeed + 1) * 31) % 85 + 15}%`,
                        backgroundColor: selectedFeed === 0 && (i === 11 || i === 12) ? '#93c5fd' : '#3b82f6',
                        boxShadow: selectedFeed === 0 && (i === 11 || i === 12) ? '0 0 8px #93c5fd' : 'none'
                      }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                  <span>Baseline Harmonic</span>
                  <span>Harmonic Peak</span>
                  <span>ISO 10816 Limit: Safe</span>
                </div>
              </div>

              {/* Diagnostic AI Insight */}
              <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-xs sm:text-sm font-sans space-y-1">
                <div className="font-mono text-[11px] text-blue-400 font-bold uppercase tracking-wider">
                  AI PREDICTIVE SUMMARY
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {selectedFeed === 0 
                    ? "Inlet Feed Pump 04 shows early 1.2 kHz harmonics characteristic of suction cavitation. Recommended maintenance: Check inlet strainer during tomorrow's shift change."
                    : "Equipment running within normal kinematic envelopes. No maintenance action required."}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Last Calibrated: 2 hours ago</span>
                <span className="text-blue-400">Nvidia Orin Processed Locally</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
