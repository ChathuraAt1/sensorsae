import React from 'react';
import { Cpu, Activity, Lock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const About = () => {
  const pillars = [
    {
      icon: Cpu,
      title: "Custom Edge Models",
      tag: "MICRO-QUANTIZED",
      desc: "Pre-trained on industrial dynamics and compiled to INT8 TensorRT for execution inside noisy plant enclosures. Delivers sub-5ms anomaly classification with zero dependency on external cloud links.",
      specs: ["TensorRT INT8 acceleration", "Sub-5ms deterministic cycle", "Under-60W power profile"]
    },
    {
      icon: Activity,
      title: "Generative Telemetry",
      tag: "SYNTHETIC TWIN",
      desc: "Our diffusion-based telemetry engine generates synthetic physical failure waveforms, allowing maintenance teams to stress-test safety thresholds and simulate edge-case cavitation scenarios safely.",
      specs: ["Time-series diffusion synthesis", "Predictive RUL forecasting", "What-if failure stress modeling"]
    },
    {
      icon: Lock,
      title: "On-Premises Security",
      tag: "AIR-GAPPED ZERO TRUST",
      desc: "Engineered specifically for critical infrastructure. Sensor packets never leave the plant VLAN. Integrated hardware TPM 2.0 cryptoprocessors guarantee immutable telemetry telemetry integrity.",
      specs: ["100% Air-gapped execution", "TPM 2.0 root of trust", "Compliant with IEC 62443"]
    }
  ];

  return (
    <section id="about" className="relative py-28 bg-[#06080d] border-b border-blue-900/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-blue-300">About SENSORSAE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Bridging Physical Sensors <br />
              with Deterministic AI.
            </h2>
          </div>
          <p className="max-w-md text-slate-400 text-sm sm:text-base leading-relaxed">
            Legacy SCADA historians alert you after a bearing has warped. SENSORSAE analyzes ultrasonic acoustic vibrations and raw waveforms at microsecond granularity to eliminate downtime permanently.
          </p>
        </div>

        {/* 3 Minimalist Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl bg-[#0b0f19]/70 backdrop-blur-xl border border-blue-900/40 hover:border-blue-500/40 p-8 transition-all duration-300 hover:shadow-glow-md flex flex-col justify-between"
              >
                {/* Subtle top glow bar */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-blue-950/60 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:border-blue-400 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[11px] tracking-wider uppercase text-blue-400/90 bg-blue-950/50 px-2.5 py-1 rounded-full border border-blue-900/50">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>

                {/* Specs List */}
                <div className="pt-6 border-t border-slate-800/80 space-y-2.5">
                  {pillar.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
