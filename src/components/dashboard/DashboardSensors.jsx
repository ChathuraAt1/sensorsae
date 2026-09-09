import React from 'react';
import { Radio, ArrowUpRight } from 'lucide-react';

export const DashboardSensors = ({
  filteredAssets,
  severityFilter,
  setSeverityFilter,
  planCapabilities,
  isoThresholdLimit,
  setSelectedAsset,
  handleInspectWithCopilot,
  handleUpgrade,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-white">Edge-X1 Sensor Mesh Telemetry</h2>
          <p className="text-xs text-slate-400 font-mono">
            High-density data streaming across 48 physical sensor nodes and triaxial accelerometers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Severity:</span>
          {['All', 'OPTIMAL', 'ATTENTION', 'CRITICAL'].map(s => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                severityFilter === s ? 'bg-blue-600 text-white font-bold' : 'bg-[#080d17] text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Quota Status Banner */}
      <div className="p-3.5 rounded-2xl bg-[#080d17] border border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Radio className="w-4 h-4" />
          </div>
          <div>
            <span className="text-white font-bold text-xs block">
              Licensed Fleet: {planCapabilities.activeNodesCount} / {planCapabilities.nodeLimit === Infinity ? 'Unlimited' : planCapabilities.nodeLimit} Physical Sensor Nodes Active
            </span>
            <p className="text-slate-400 text-[11px] font-sans">
              {planCapabilities.name} Tier • {planCapabilities.pollingLabel} • {planCapabilities.historyDays === Infinity ? 'Unlimited Cold Storage' : `${planCapabilities.historyDays}-Day Telemetry Retention`}
            </p>
          </div>
        </div>

        {planCapabilities.nodeLimit !== Infinity && (
          <button
            onClick={() => handleUpgrade('enterprise-mesh')}
            className="px-3.5 py-1.5 rounded-xl bg-blue-950/60 hover:bg-blue-900 border border-blue-500/40 text-blue-300 hover:text-white font-mono text-xs transition-all flex items-center gap-1.5 shrink-0"
          >
            <span>Expand Fleet Limit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="rounded-2xl bg-[#080d17] border border-blue-900/40 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#06080d] text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Asset ID &amp; Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Health</th>
                <th className="py-3 px-4">Vibe (RMS)</th>
                <th className="py-3 px-4">Acc (g)</th>
                <th className="py-3 px-4">Temp (°C)</th>
                <th className="py-3 px-4">RUL</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredAssets.map((mach) => (
                <tr 
                  key={mach.id}
                  className="hover:bg-blue-950/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedAsset(mach)}
                >
                  <td className="py-3 px-4 font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400 font-mono">{mach.id}</span>
                      <span className="font-sans font-medium text-slate-200">{mach.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal">{mach.location}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{mach.category}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      mach.status === 'CRITICAL' 
                        ? 'bg-red-950 text-red-400 border border-red-500' 
                        : mach.status === 'ATTENTION'
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {mach.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{mach.healthScore}%</td>
                  <td className="py-3 px-4">
                    <span className={mach.vibrationRms > isoThresholdLimit ? 'text-red-400 font-bold' : 'text-slate-200'}>
                      {mach.vibrationRms}
                    </span>
                    <span className="text-slate-500 text-[10px]"> / {isoThresholdLimit}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{mach.peakAcceleration} g</td>
                  <td className="py-3 px-4 text-slate-300">{mach.temperature} °C</td>
                  <td className="py-3 px-4 text-blue-300">{mach.rulHours} hrs</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleInspectWithCopilot(mach); }}
                      className="px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-[10px] font-bold transition-all"
                    >
                      Copilot
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
