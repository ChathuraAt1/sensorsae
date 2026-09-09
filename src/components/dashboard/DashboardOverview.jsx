import React from 'react';
import { 
  Sliders, Activity, Copy, Bot, AlertCircle, Eye, Crosshair 
} from 'lucide-react';
import { CLUSTER_METRICS } from '../../data/telemetryData';

export const DashboardOverview = ({
  averageHealth,
  assets,
  criticalCount,
  attentionCount,
  isoThresholdLimit,
  setIsoThresholdLimit,
  filteredAssets,
  categoryFilter,
  setCategoryFilter,
  selectedAsset,
  setSelectedAsset,
  handleCopy,
  handleInspectWithCopilot,
  hoveredHarmonicIdx,
  setHoveredHarmonicIdx,
  handleThermalClick,
  thermalCrosshair,
}) => {
  return (
    <div className="space-y-6">
      
      {/* Top High-Density Metric Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>OVERALL ASSET HEALTH</span>
            <span className="text-emerald-400 font-bold">Nominal</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            {averageHealth}%
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Calculated across {assets.length} edge-monitored assets
          </div>
        </div>

        <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1 relative overflow-hidden">
          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>ACTIVE ANOMALIES</span>
            <span className={`text-[10px] font-bold ${criticalCount > 0 ? 'text-red-400 animate-pulse' : 'text-blue-400'}`}>
              {criticalCount > 0 ? 'Action Needed' : 'Monitoring'}
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-baseline gap-2">
            <span className={criticalCount > 0 ? 'text-red-400' : 'text-white'}>{criticalCount + attentionCount}</span>
            <span className="text-xs text-slate-500 font-normal">({criticalCount} Critical, {attentionCount} Warning)</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Pinpointed 3–6 weeks before thermal breakdown
          </div>
        </div>

        <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>NVIDIA ORIN NX COMPUTE</span>
            <span className="text-cyan-400">275 TOPS</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
            3.64 ms
          </div>
          <div className="text-[10px] font-mono text-blue-400">
            51.6% GPU inference load • TensorRT INT8
          </div>
        </div>

        <div className="p-4.5 rounded-2xl bg-[#080d17] border border-blue-900/40 space-y-1">
          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>ESTIMATED DOWNTIME AVERTED</span>
            <span className="text-emerald-400 font-bold">Q3 YTD</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
            {CLUSTER_METRICS.preventedDowntimeYtd}
          </div>
          <div className="text-[10px] font-mono text-slate-500">
            Calculated via plant downtime financial baseline
          </div>
        </div>
      </div>

      {/* Interactive ISO 10816 Limit Slider Control Bar */}
      <div className="p-4 rounded-2xl bg-[#080d17] border border-blue-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-white font-bold">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span>Interactive ISO 10816 Velocity Limit Tester</span>
            <span className="px-2 py-0.2 rounded bg-blue-950 text-blue-300 text-[10px] border border-blue-800">
              LIVE THRESHOLD
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-sans">
            Drag slider to test tighter vibration tolerances. Assets dynamically adapt status between Optimal, Warning, and Critical.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-slate-400 text-xs">Threshold:</span>
          <input
            type="range"
            min="1.0"
            max="4.0"
            step="0.1"
            value={isoThresholdLimit}
            onChange={(e) => setIsoThresholdLimit(Number(e.target.value))}
            className="w-32 sm:w-44 accent-blue-500 cursor-pointer"
          />
          <span className="px-2.5 py-1 rounded-lg bg-[#06080d] border border-blue-500/40 text-blue-400 font-bold text-xs min-w-[70px] text-center">
            {isoThresholdLimit.toFixed(2)} mm/s
          </span>
        </div>
      </div>

      {/* Machinery Digital Twin Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span>Machine Digital Twin Readout ({filteredAssets.length} Assets)</span>
          </h2>

          <div className="flex items-center gap-1.5 text-xs font-mono flex-wrap">
            <span className="text-slate-500">Filter:</span>
            {['All', 'Pumps', 'Motors', 'Gearboxes', 'CNC Spindles', 'Compressors', 'Conveyors'].map(c => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  categoryFilter === c ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredAssets.map(mach => {
            const isSelected = selectedAsset.id === mach.id;
            const isCrit = mach.status === 'CRITICAL';
            const isWarn = mach.status === 'ATTENTION';

            return (
              <div
                key={mach.id}
                onClick={() => setSelectedAsset(mach)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#0f172a] border-blue-400 shadow-glow-sm'
                    : 'bg-[#080d17] border-blue-900/30 hover:border-blue-500/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-blue-400 font-bold">{mach.id}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleCopy(mach.id, mach.name); }}
                        title="Copy Asset ID"
                        className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-500 hover:text-blue-300 transition-opacity"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>

                    <span className={`font-mono text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      isCrit
                        ? 'bg-red-950 text-red-300 border border-red-500 animate-pulse'
                        : isWarn
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/50'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                    }`}>
                      {mach.status}
                    </span>
                  </div>

                  <div>
                    <div className="font-bold text-white text-sm truncate">{mach.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{mach.location}</div>
                  </div>

                  {/* Hover Mini Vibration Wave Sparkline */}
                  <div className="h-6 w-full opacity-30 group-hover:opacity-100 transition-opacity flex items-end justify-between gap-0.5 pt-1">
                    {[18, 35, 60, 42, 85, 30, 65, 90, 45, 55, 75, 40].map((v, sIdx) => (
                      <div
                        key={sIdx}
                        className="w-full rounded-t-sm"
                        style={{
                          height: `${(v * (mach.vibrationRms / 2.0)) % 100}%`,
                          backgroundColor: isCrit ? '#ef4444' : isWarn ? '#f59e0b' : '#3b82f6',
                        }}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-500 block text-[9px]">VIBRATION</span>
                      <span className={mach.vibrationRms > isoThresholdLimit ? 'text-red-400 font-bold' : 'text-slate-200'}>
                        {mach.vibrationRms} mm/s
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">TEMPERATURE</span>
                      <span className="text-slate-200">{mach.temperature} °C</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">HEALTH</span>
                      <span className="text-emerald-400 font-bold">{mach.healthScore}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">RUL EST.</span>
                      <span className="text-blue-300">{mach.rulHours} hrs</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-2 border-t border-slate-900 flex items-center justify-between">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleInspectWithCopilot(mach); }}
                    className="text-[10px] text-blue-400 hover:text-blue-300 font-mono font-bold flex items-center gap-1"
                  >
                    <Bot className="w-3 h-3" />
                    <span>Ask Copilot</span>
                  </button>
                  <span className="text-[9px] font-mono text-slate-500">{mach.lastReportTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Focused Asset Deep Dive Card */}
      <div className="rounded-3xl bg-[#080d17] border border-blue-500/40 p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest font-bold">
              <span>FOCUSED TELEMETRY INSPECTOR</span>
              <span>•</span>
              <span>{selectedAsset.edgeHubId}</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              {selectedAsset.name} ({selectedAsset.id})
            </h3>
            <p className="text-xs text-slate-400">
              {selectedAsset.location} • RPM: {selectedAsset.rpm} • Standard: {selectedAsset.isoStandard}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <button
              onClick={() => handleInspectWithCopilot(selectedAsset)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-sm transition-all"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Diagnose in AI Copilot</span>
            </button>
          </div>
        </div>

        {/* 3-Column Diagnostic Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Col 1: Primary Fault Diagnosis */}
          <div className="p-4.5 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-3 font-mono text-xs">
            <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>Root Cause Classification</span>
              </div>
              <button
                onClick={() => handleCopy(selectedAsset.primaryFault, 'Diagnosis')}
                className="text-slate-500 hover:text-white"
                title="Copy Diagnosis"
              >
                <Copy className="w-3 h-3" />
              </button>
            </div>
            <div className="text-slate-200 text-xs font-sans leading-relaxed">
              {selectedAsset.primaryFault}
            </div>
            <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-500/20 text-[11px] text-blue-300 font-sans">
              <strong>Prescribed Maintenance:</strong> {selectedAsset.recommendedAction}
            </div>
            <div className="text-[10px] text-slate-500">
              Monitoring Pods: {selectedAsset.podIds.join(', ')}
            </div>
          </div>

          {/* Col 2: FFT Harmonic Spectrum Peaks */}
          <div className="p-4.5 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-3 font-mono text-xs">
            <div className="text-[11px] text-blue-400 font-bold uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>192 kHz FFT Spectral Harmonics</span>
            </div>
            <div className="space-y-2">
              {selectedAsset.fftSpectrum.map((pk, idx) => (
                <div 
                  key={idx} 
                  onMouseEnter={() => setHoveredHarmonicIdx(idx)}
                  onMouseLeave={() => setHoveredHarmonicIdx(null)}
                  className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-colors cursor-pointer ${
                    hoveredHarmonicIdx === idx ? 'bg-blue-950/80 border border-blue-500/40' : 'hover:bg-slate-900'
                  }`}
                >
                  <span className="text-slate-400">{pk.freq}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold">{pk.amp} mm/s</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      pk.status === 'Optimal' || pk.status === 'Normal'
                        ? 'bg-blue-950 text-blue-300'
                        : 'bg-red-950 text-red-300'
                    }`}>
                      {pk.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Interactive Thermal Vision Spot-Picker */}
          <div className="p-4.5 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-3 font-mono text-xs">
            <div className="text-[11px] text-cyan-400 font-bold uppercase tracking-wider flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>Thermal Vision Guard (LWIR)</span>
              </div>
              <span className="text-[9px] text-slate-500">Click to Sample</span>
            </div>

            {/* Interactive Clickable Thermal Canvas */}
            <div 
              onClick={handleThermalClick}
              className="h-28 rounded-xl bg-gradient-to-tr from-blue-950 via-purple-900 to-amber-600 relative cursor-crosshair overflow-hidden border border-white/10"
              title="Click anywhere to inspect localized thermal gradient"
            >
              {/* Crosshair Target */}
              <div 
                className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-150 flex items-center justify-center"
                style={{ left: `${thermalCrosshair.x}%`, top: `${thermalCrosshair.y}%` }}
              >
                <Crosshair className="w-5 h-5 text-white drop-shadow-md animate-pulse" />
              </div>
              <div className="absolute bottom-1 right-2 text-[9px] bg-black/50 px-1.5 py-0.5 rounded text-white/80">
                Spot Temp: {(selectedAsset.temperature + thermalCrosshair.tempDelta).toFixed(1)}°C
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400">Baseline Delta-T:</span>
              <span className={selectedAsset.thermalDeltaT > 15 ? 'text-red-400 font-bold' : 'text-emerald-400'}>
                +{selectedAsset.thermalDeltaT} °C
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  selectedAsset.thermalDeltaT > 15 ? 'bg-red-500' : 'bg-blue-500'
                }`}
                style={{ width: `${Math.min(100, (selectedAsset.thermalDeltaT / 30) * 100)}%` }}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
