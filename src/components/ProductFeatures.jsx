import React from 'react';
import { ArrowRight } from 'lucide-react';

export const ProductFeatures = ({ onRequestDemo }) => {
  const features = [
    {
      kicker: "01 / VISIBILITY",
      title: "24/7 Machine Monitoring",
      description: "Continuous vibration and thermal tracking across all motors, pumps, and compressors on your plant floor.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
      reversed: false,
    },
    {
      kicker: "02 / PREVENTION",
      title: "30-Day Early Warning",
      description: "Ultrasonic sensors catch micro-wear weeks before parts seize, allowing planned maintenance on your schedule.",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80",
      reversed: true,
    },
    {
      kicker: "03 / SIMPLICITY",
      title: "Magnetic Snap-On Setup",
      description: "Install in 45 minutes with strong magnetic mounts. Zero drilling, zero downtime, and no plant rewiring required.",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80",
      reversed: false,
    },
    {
      kicker: "04 / CLARITY",
      title: "Plain-English Team Alerts",
      description: "Direct notifications to technicians' phones with clear repair steps instead of confusing waveform charts.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
      reversed: true,
    }
  ];

  return (
    <section id="features" className="py-24 bg-[#06080d]">
      <div className="max-w-6xl mx-auto px-6 space-y-28">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
            KEY CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for Real Plant Operations.
          </h2>
          <p className="text-slate-400 text-base">
            Simple, reliable tools to protect your most valuable production machinery.
          </p>
        </div>

        {/* 4 Clean Image Sections */}
        <div className="space-y-24">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center ${
                item.reversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-5 space-y-3 ${item.reversed ? 'lg:order-2' : 'lg:order-1'}`}>
                <span className="font-mono text-xs text-blue-400 font-semibold tracking-wider">
                  {item.kicker}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {item.title}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={onRequestDemo}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Request demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className={`lg:col-span-7 ${item.reversed ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="rounded-3xl overflow-hidden border border-blue-500/25 shadow-glow-sm bg-[#0b0f19]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-72 sm:h-80 object-cover object-center brightness-90 hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
