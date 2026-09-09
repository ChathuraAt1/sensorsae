import React from 'react';

export const DashboardThermal = ({ assets }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-white">Thermal Vision Guard (Radiometric LWIR)</h2>
          <p className="text-xs text-slate-400 font-mono">
            Continuous non-contact infrared thermal imaging calibrated from -40°C to +1,200°C.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
          METROPOLIS™ DEEPSTREAM POE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {assets.map(item => (
          <div key={item.id} className="rounded-3xl bg-[#080d17] border border-blue-900/40 overflow-hidden">
            {/* Simulated Thermal Heatmap Canvas */}
            <div className="h-44 bg-gradient-to-tr from-blue-950 via-purple-900 to-amber-600 relative p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center text-[10px] font-mono text-white/90 bg-black/40 backdrop-blur px-2 py-1 rounded-lg w-fit">
                <span>{item.id} • {item.thermalGuardZone}</span>
              </div>

              {/* Hotspot Target Crosshair */}
              <div className="self-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-red-400/80 border-dashed animate-spin flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-red-400"></span>
                </div>
                <span className="font-mono text-xs font-bold text-white drop-shadow-md mt-1">
                  MAX: {item.temperature}°C (+{item.thermalDeltaT}°C Δ)
                </span>
              </div>

              <div className="flex justify-between items-center text-[9px] font-mono text-white/80 bg-black/40 backdrop-blur px-2 py-0.5 rounded">
                <span>IR Range: 7.5 - 14 µm</span>
                <span className={item.thermalDeltaT > 15 ? 'text-red-300 font-bold' : 'text-emerald-300'}>
                  {item.thermalDeltaT > 15 ? 'HOTSPOT ALARM' : 'NOMINAL GRADIENT'}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <div className="font-bold text-white text-sm">{item.name}</div>
              <div className="text-xs text-slate-400">{item.location}</div>
              <div className="flex justify-between text-xs font-mono pt-2 border-t border-slate-800">
                <span className="text-slate-500">Optical Emissivity:</span>
                <span className="text-slate-200">ε = 0.95 (Machined Steel)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
