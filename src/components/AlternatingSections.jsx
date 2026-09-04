import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const AlternatingSections = ({ onRequestDemo, onExploreProducts }) => {
  return (
    <section id="how-it-works" className="py-24 bg-[#06080d] space-y-28">
      <div className="max-w-6xl mx-auto px-6 space-y-28">
        
        {/* Story 1: Early Warnings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
              01 / PROACTIVE WARNINGS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Hear problems 30 days before they happen.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Standard sensors only alert you after parts overheat. SENSORSAE detects high-frequency micro-friction weeks earlier, giving you time to plan fixes during regular shift changes.
            </p>
            <div className="pt-2">
              <button
                onClick={onRequestDemo}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Learn how it detects wear</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-blue-500/25 shadow-glow-sm bg-[#0b0f19]">
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80" 
                alt="Precision Industrial Machinery" 
                className="w-full h-80 object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Story 2: Instant Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden border border-blue-500/25 shadow-glow-sm bg-[#0b0f19]">
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" 
                alt="Technician reviewing alerts on tablet" 
                className="w-full h-80 object-cover object-center"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
              02 / CLEAR COMMUNICATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Plain-English alerts sent to your team.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              No complex vibration graphs to decode. Technicians receive clear messages on their phones with the exact machine, root cause, and suggested maintenance steps.
            </p>
            <div className="pt-2">
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>See sample alerts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Story 3: Quick Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
              03 / EFFORTLESS DEPLOYMENT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Installed in 45 minutes with magnetic mounts.
            </h2>
            <p className="text-slate-400 text-base leading-relaxed">
              Snap our wireless sensor pods onto machine casings without drilling, welding, or halting assembly lines. The local edge hub connects in minutes.
            </p>
            <div className="pt-2">
              <button
                onClick={onRequestDemo}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span>Request a pilot kit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-blue-500/25 shadow-glow-sm bg-[#0b0f19]">
              <img 
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80" 
                alt="Automated industrial robotics" 
                className="w-full h-80 object-cover object-center"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
