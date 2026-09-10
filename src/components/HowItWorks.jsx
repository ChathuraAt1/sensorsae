import React, { useState } from 'react';
import { 
  Radio, 
  Activity, 
  Cpu, 
  BellRing, 
  Wrench, 
  ArrowRight, 
  Sparkles,
  Zap
} from 'lucide-react';

export const HowItWorks = ({ onRequestDemo, onExploreProducts, onOpenDashboard }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      tag: "STEP 01",
      title: "INSTALL SENSORS",
      description: "Install sensors that are compatible with selected industrial machinery.",
      detail: "Quick magnetic or stud-mount sensor pods snap securely onto cast iron or alloy bearing housings without drilling, welding, or interrupting active plant production.",
      icon: Radio,
      badge: "Plug & Play",
      metric: "45 Min Deployment",
      subtext: "Triaxial Accelerometer • Acoustic Ultrasound • Surface Temp",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80"
    },
    {
      number: "02",
      tag: "STEP 02",
      title: "MONITOR CONDITIONS",
      description: "Gather data related to vibration, noise, and temperature from these sensors.",
      detail: "Continuous edge data acquisition streams high-frequency vibration, ultrasonic acoustic emissions, and thermal gradients around the clock.",
      icon: Activity,
      badge: "Real-Time Telemetry",
      metric: "192 kHz Acoustic Sampling",
      subtext: "ISO 10816 Velocity • Acceleration Peak-to-Peak • Infrared LWIR",
      image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80"
    },
    {
      number: "03",
      tag: "STEP 03",
      title: "IDENTIFY CHANGES",
      description: "Analyze the collected data and detect any changes in the working condition of equipment",
      detail: "Embedded Nvidia Jetson Orin AI cores run cuDF FFT transforms and spectral anomaly detection on-premise, flagging early sub-surface cavitation, imbalance, and bearing raceway spalling.",
      icon: Cpu,
      badge: "Neural DSP Engine",
      metric: "3.64 ms Inference Latency",
      subtext: "BPFO / BPFI Harmonics • FFT Order Tracking • Degradation Curve",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80"
    },
    {
      number: "04",
      tag: "STEP 04",
      title: "SEND ALERTS",
      description: "Generate alerts on any unusual data analysis results.",
      detail: "Multi-channel dispatch broadcasts clear, plain-English notifications directly to operators via SMS, WhatsApp, Slack, email, and plant SCADA webhooks with precise root cause diagnostics.",
      icon: BellRing,
      badge: "Instant Dispatch",
      metric: "< 200 ms Notification Speed",
      subtext: "Multi-Channel Broadcast • WhatsApp / SMS / Slack • Root Cause Summary",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
    },
    {
      number: "05",
      tag: "STEP 05",
      title: "REVIEW AND RESPOND",
      description: "Evaluate the situation and take necessary actions.",
      detail: "Maintenance teams review component failure recommendations, auto-generate work orders for SAP PM or IBM Maximo, and perform targeted service during scheduled shift transitions before catastrophic failure.",
      icon: Wrench,
      badge: "Actionable Maintenance",
      metric: "Zero Unplanned Outages",
      subtext: "Automated Work Order Drafts • Step-by-Step Fixes • Downtime Averted",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const currentStep = steps[activeStep];

  const handleExplore = () => {
    if (onExploreProducts) {
      onExploreProducts();
    } else {
      const el = document.getElementById('features') || document.getElementById('capabilities');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-24 bg-[#06080d] relative overflow-hidden border-t border-blue-900/30">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-blue-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-10 right-10 w-80 h-80 bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-wider uppercase shadow-glow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>HOW IT WORKS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase">
            FROM SENSOR DATA TO MAINTENANCE ACTION
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            An end-to-end industrial intelligence workflow designed to monitor critical plant machinery, detect micro-anomalies early, and direct targeted maintenance before downtime occurs.
          </p>

          <div className="pt-2">
            <button
              onClick={handleExplore}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-md hover:shadow-glow-lg transition-all"
            >
              <span>EXPLORE THE PROCESS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5-Step Process Timeline / Stepper Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'bg-[#0b0f19] border-blue-400 shadow-glow-md ring-1 ring-blue-500/50'
                    : 'bg-[#0b0f19]/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-blue-900/60 hover:bg-[#0b0f19]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-3">
                  <span className={`font-mono text-xs font-bold tracking-widest ${
                    isSelected ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'
                  }`}>
                    {step.number}
                  </span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-glow-sm'
                      : 'bg-[#06080d] text-slate-400 border border-slate-800 group-hover:text-blue-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className={`font-bold text-xs tracking-wider uppercase line-clamp-1 ${
                    isSelected ? 'text-white' : 'text-slate-300'
                  }`}>
                    {step.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-tight">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-800/50 flex items-center justify-between text-[10px] font-mono">
                  <span className={isSelected ? 'text-blue-300' : 'text-slate-500'}>
                    {step.badge}
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-blue-400 animate-ping' : 'bg-slate-700'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Focused Step Deep-Dive Display Card */}
        <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-6 sm:p-10 shadow-glow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Step Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                {currentStep.tag}
              </span>
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                STAGE {activeStep + 1} OF 5
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
                {currentStep.number} — {currentStep.title}
              </h3>
              <p className="text-base text-blue-300 font-medium leading-snug">
                {currentStep.description}
              </p>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed">
              {currentStep.detail}
            </p>

            {/* Industrial Spec Badges */}
            <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">OPERATIONAL METRIC</span>
                <span className="text-emerald-400 font-bold">{currentStep.metric}</span>
              </div>
              <div className="text-xs font-mono text-slate-300 flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{currentStep.subtext}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRequestDemo}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-glow-sm hover:shadow-glow-md transition-all flex items-center gap-2"
              >
                <span>Request Trial Kit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenDashboard ? onOpenDashboard() : handleExplore()}
                className="px-6 py-3 rounded-xl bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-800 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                View in Dashboard
              </button>
            </div>
          </div>

          {/* Right: Technical Visualizer & Photography */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-blue-500/30 bg-[#06080d] shadow-2xl">
              <img 
                src={currentStep.image} 
                alt={currentStep.title}
                className="w-full h-72 sm:h-80 object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay HUD Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#06080d]/85 backdrop-blur-md border border-blue-500/40 text-xs font-mono text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>STEP {currentStep.number} ACTIVE</span>
              </div>

              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-[#06080d]/85 backdrop-blur-md border border-blue-500/40 text-xs font-mono text-blue-400">
                <span>{currentStep.badge}</span>
              </div>
            </div>

            {/* Step navigation pills */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    aria-label={`Go to step ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeStep === idx 
                        ? 'w-8 bg-blue-500' 
                        : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <span className="text-xs font-mono text-slate-500">
                Click any stage card above to inspect telemetry flow
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
