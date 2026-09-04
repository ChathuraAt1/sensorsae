import React, { useState } from 'react';
import { Cpu, Server, Activity, ArrowRight, CheckCircle, Database, Network } from 'lucide-react';
import { nvidiaStack } from '../data/mockData';

export const NvidiaStack = () => {
  const [selectedTech, setSelectedTech] = useState(0);

  const pipelineSteps = [
    { label: "Physical Sensors", desc: "192kHz Acoustic & Thermal" },
    { label: "Nvidia Jetson Orin", desc: "Ruggedized Edge Gateways" },
    { label: "Nvidia RAPIDS", desc: "cuDF GPU Stream Acceleration" },
    { label: "Nvidia Triton", desc: "Concurrent Neural Inference" },
    { label: "Nvidia Metropolis", desc: "Spatial & Perceptual Fusion" }
  ];

  return (
    <section id="nvidia-stack" className="relative py-28 bg-[#06080d] border-b border-blue-900/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">TECHNOLOGY ECOSYSTEM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Powered by Nvidia Hardware & AI Runtimes.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Full-stack integration from silicon to distributed neural serving. Deploying zero-latency inference across plant floor environments.
          </p>
        </div>

        {/* Industrial Pipeline Data Flow Architecture Diagram */}
        <div className="mb-16 p-8 rounded-3xl bg-[#0b0f19]/80 border border-blue-900/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-semibold">
                END-TO-END INDUSTRIAL EDGE DATAFLOW
              </span>
            </div>
            <span className="font-mono text-xs text-blue-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              P99 LATENCY &lt; 3.84ms
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {pipelineSteps.map((step, idx) => (
              <div 
                key={idx}
                className={`relative p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  idx === selectedTech + 1 
                    ? 'bg-blue-950/40 border-blue-500 shadow-glow-sm' 
                    : 'bg-[#06080d] border-blue-900/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-blue-400">
                      STEP 0{idx + 1}
                    </span>
                    {idx < 4 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden md:block" />
                    )}
                  </div>
                  <div className="font-bold text-sm text-white mb-1">
                    {step.label}
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    {step.desc}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                  <span className="font-mono text-[10px] text-slate-500 uppercase">
                    Zero Host Copies
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Core Technology Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {nvidiaStack.map((tech, idx) => (
            <div
              key={tech.id}
              onClick={() => setSelectedTech(idx)}
              className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                selectedTech === idx 
                  ? 'bg-[#0b0f19] border-blue-500/60 shadow-glow-md' 
                  : 'bg-[#0b0f19]/60 border-blue-900/40 hover:border-blue-700/50 hover:bg-[#0b0f19]/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-900">
                    {tech.tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                    {tech.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {tech.name}
                </h3>
                <div className="text-xs font-mono text-blue-400 mb-4 font-medium">
                  {tech.role}
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {tech.description}
                </p>
              </div>

              {/* Feature bullets */}
              <div className="space-y-2 pt-4 border-t border-slate-800/80">
                {tech.features.slice(0, 3).map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-300 font-mono">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
