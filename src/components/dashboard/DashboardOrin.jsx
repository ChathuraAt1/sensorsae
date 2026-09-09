import React from 'react';

export const DashboardOrin = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-base font-extrabold text-white">Nvidia Jetson Orin™ Industrial Acceleration Stack</h2>
          <p className="text-xs text-slate-400 font-mono">
            275 TOPS local neural compute engine inside the Edge-X1 hardware cluster.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
          AIR-GAP AIRTIGHT: 0 EGRESS
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#080d17] border border-blue-900/40 space-y-4">
          <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
            TensorRT-LLM Ingestion
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">3.64 ms</div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Sub-millisecond sliding-window FFT transforms computed across 48 concurrent accelerometer streams without CPU bottlenecking.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            Model: INT8 TensorRT AWQ 14B
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#080d17] border border-blue-900/40 space-y-4">
          <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
            RAPIDS cuDF GPU Streaming
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 font-mono">184.2k /s</div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            GPU-accelerated dataframe pipelines aggregating rolling kurtosis, skewness, and crest factor time-series metrics.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            NVMe Buffer: 1.8 TB Ring Cache
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#080d17] border border-blue-900/40 space-y-4">
          <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
            Triton Multi-Model Server
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">100% NOMINAL</div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Zero dropped packets across 14 consecutive weeks of continuous uninterrupted factory floor runtime.
          </p>
          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-500">
            SIL-3 Rated Hardware Watchdog
          </div>
        </div>
      </div>
    </div>
  );
};
