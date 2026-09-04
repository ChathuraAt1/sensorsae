import React from 'react';
import { ShieldCheck, Target, Award, Users, ArrowRight } from 'lucide-react';

export const AboutCompany = ({ onRequestDemo }) => {
  return (
    <section id="about-company" className="py-24 bg-[#06080d] border-t border-b border-blue-900/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Industrial Overlay */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 shadow-glow-md group">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
                alt="Modern automated manufacturing plant" 
                className="w-full h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06080d] via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#0b0f19]/85 backdrop-blur-md border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
                    SAE
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Founded by Factory Engineers</h4>
                    <p className="text-slate-400 text-xs">Built on real assembly lines, not in an abstract software lab.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Mission */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              <span className="font-mono text-xs uppercase tracking-widest text-blue-300 font-semibold">
                ABOUT SENSORSAE
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              We Believe Unplanned Factory Downtime is Fully Preventable.
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              Every year, industrial manufacturing loses over $50 billion to surprise machine breakdowns. Bearings overheat, pumps seize, and assembly lines grind to an unexpected halt.
            </p>

            <p className="text-slate-400 text-base leading-relaxed">
              SENSORSAE was created to put an end to emergency firefighting. We combine rugged clamp-on hardware with intelligent software that listens to the earliest whispers of machine wear—giving plant leaders weeks to plan repairs on their own terms.
            </p>

            {/* 3 Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 font-sans text-sm">
              <div className="p-4 rounded-2xl bg-[#0b0f19] border border-blue-900/30 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
                  <Target className="w-4 h-4" />
                  <span>Practical Simplicity</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  No 6-month consulting projects. Sensors install in 45 minutes without halting lines.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0b0f19] border border-blue-900/30 space-y-1.5">
                <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Absolute Privacy</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  100% on-premises processing. Your factory data never leaves your building.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onRequestDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all group"
              >
                <span>Connect With Our Leadership Team</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
