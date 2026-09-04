import React from 'react';
import { ArrowRight, ShieldCheck, Target } from 'lucide-react';

export const AboutCompany = ({ onRequestDemo }) => {
  return (
    <section id="about-company" className="py-24 bg-[#06080d] border-t border-b border-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden border border-blue-500/25 shadow-glow-sm bg-[#0b0f19]">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
                alt="Modern automated manufacturing plant" 
                className="w-full h-80 sm:h-96 object-cover object-center brightness-90"
              />
            </div>
          </div>

          {/* Right Column: Mission */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
              ABOUT SENSORSAE
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Built by factory engineers to end emergency breakdowns.
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              We started SENSORSAE on real assembly lines after experiencing the frustration of midnight bearing failures and halted shifts.
            </p>

            <p className="text-slate-400 text-base leading-relaxed">
              Our mission is simple: deliver rugged, plug-and-play sensor intelligence that alerts plant teams weeks ahead of failure—with 100% on-premise security and zero cloud risk.
            </p>

            <div className="pt-2">
              <button
                onClick={onRequestDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all group"
              >
                <span>Connect with our team</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
