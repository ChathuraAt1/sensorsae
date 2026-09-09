import React from 'react';
import { Lock, ArrowUpRight } from 'lucide-react';

export const DashboardFft = ({
  selectedAsset,
  planCapabilities,
  isoThresholdLimit,
  hoveredHarmonicIdx,
  setHoveredHarmonicIdx,
  handleUpgrade,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-extrabold text-white">192 kHz Acoustic &amp; Triaxial FFT DSP Studio</h2>
        <p className="text-xs text-slate-400 font-mono">
          Spectral harmonic decomposition, PeakVue stress waves, and ISO 10816 velocity band validation.
        </p>
      </div>

      {/* Visualizer Card */}
      <div className="p-6 rounded-3xl bg-[#080d17] border border-blue-500/40 space-y-6">
        <div className="flex items-center justify-between font-mono text-xs">
          <div>
            <span className="text-slate-400">Target Asset:</span>{' '}
            <strong className="text-white">{selectedAsset.name} [{selectedAsset.id}]</strong>
          </div>
          <div className="text-blue-400 font-bold">
            Nyquist Bandwidth: 96,000 Hz
          </div>
        </div>

        {/* Animated Graphic Spectrum Waterfall Bars with Hover Harmonic Feedback & Tier Gating */}
        <div className="relative">
          <div className={`h-44 p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 flex items-end justify-between gap-1 transition-all ${
            !planCapabilities.fftEnabled ? 'filter blur-sm opacity-25 select-none pointer-events-none' : ''
          }`}>
            {[12, 28, 42, 65, 88, 54, 38, 22, 45, 95, 110, 48, 30, 68, 72, 85, 34, 45, 60, 28, 55, 78, 92, 40, 25, 48, 70, 85, 38, 52, 64, 98, 45, 30].map((val, idx) => {
              const isHarmonicMatch = (hoveredHarmonicIdx === 0 && (idx === 3 || idx === 4)) ||
                                      (hoveredHarmonicIdx === 1 && (idx === 7 || idx === 8)) ||
                                      (hoveredHarmonicIdx === 2 && (idx === 10 || idx === 11)) ||
                                      (hoveredHarmonicIdx === 3 && (idx === 30 || idx === 31));

              return (
                <div 
                  key={idx}
                  className="w-full rounded-t-sm transition-all duration-300"
                  style={{
                    height: `${(val * (selectedAsset.vibrationRms > isoThresholdLimit ? 1.25 : 0.7)) % 90 + 10}%`,
                    backgroundColor: isHarmonicMatch ? '#38bdf8' : (idx === 10 || idx === 31) && selectedAsset.vibrationRms > isoThresholdLimit ? '#ef4444' : '#3b82f6',
                    boxShadow: isHarmonicMatch ? '0 0 14px #38bdf8' : (idx === 10 || idx === 31) && selectedAsset.vibrationRms > isoThresholdLimit ? '0 0 10px #ef4444' : 'none'
                  }}
                />
              );
            })}
          </div>

          {/* Tier Upsell Overlay for Starter Tier */}
          {!planCapabilities.fftEnabled && (
            <div className="absolute inset-0 bg-[#06080d]/85 backdrop-blur-sm rounded-2xl border border-blue-500/30 flex flex-col items-center justify-center p-6 text-center space-y-3 z-10">
              <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1 max-w-md">
                <h4 className="text-white font-bold text-sm">192 kHz Sub-Second FFT Spectral Decomposition Locked</h4>
                <p className="text-slate-400 text-xs font-sans">
                  Sub-second high-frequency FFT transforms, acoustic envelope demodulation, and bearing fault frequency tracking (BPFO, BPFI) are features of the <strong>Professional</strong> and <strong>Enterprise Mesh</strong> plans.
                </p>
              </div>
              <button
                onClick={() => handleUpgrade('professional')}
                className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all flex items-center gap-1.5"
              >
                <span>Upgrade to Professional ($119/mo)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
          {[
            { label: "1X RUNNING SPEED", value: `${(selectedAsset.rpm / 60).toFixed(1)} Hz` },
            { label: "2X LINE HARMONIC", value: `${((selectedAsset.rpm / 60) * 2).toFixed(1)} Hz` },
            { label: "BEARING BPFO DEFECT", value: "1,240 Hz", alert: true },
            { label: "ULTRASONIC CAVITATION", value: "38 kHz Peak", alert: true },
          ].map((hItem, hIdx) => (
            <div 
              key={hIdx}
              onMouseEnter={() => setHoveredHarmonicIdx(hIdx)}
              onMouseLeave={() => setHoveredHarmonicIdx(null)}
              className={`p-3 rounded-xl bg-[#06080d] border transition-all cursor-pointer ${
                hoveredHarmonicIdx === hIdx ? 'border-blue-400 bg-blue-950/40 shadow-glow-sm' : 'border-slate-800'
              }`}
            >
              <div className="text-slate-500 text-[10px]">{hItem.label}</div>
              <div className={`font-bold mt-1 ${hItem.alert ? 'text-blue-400' : 'text-white'}`}>{hItem.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
