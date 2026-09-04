import React, { useState } from 'react';
import { 
  Clock, ShieldCheck, Zap, ArrowRight, MessageSquare, CheckCircle, 
  Smartphone, Wrench, AlertTriangle, Sparkles, Activity, Layers, Radio 
} from 'lucide-react';

export const AlternatingSections = ({ onRequestDemo, onExploreProducts }) => {
  const [activeCopilotTab, setActiveCopilotTab] = useState(0);

  const copilotChatDemos = [
    {
      question: "Which machines need attention before this weekend?",
      answer: "Pump Array B-04 shows early cavitation friction (+14%). Recommend swapping the suction gasket during tomorrow's 2 PM scheduled pause. All other 23 machines are operating in peak condition.",
      machine: "Pump B-04 (Suction Housing)",
      action: "Order Gasket #SK-409 • 15 min fix"
    },
    {
      question: "Why did CNC Spindle 07 trigger a warning yesterday?",
      answer: "A micro-vibration spike occurred when cutting high-tensile alloy at 14,000 RPM. The spindle tool holder has 0.04mm excessive play. Re-torque collet to 85 Nm to prevent part scrap.",
      machine: "CNC Spindle 07 (Axis Z)",
      action: "Re-torque collet • Prevented $8,200 scrap"
    },
    {
      question: "Generate the shift handover report for Line 2.",
      answer: "Shift handover ready: 148,000 data cycles verified. 100% uptime achieved. Turbine 02 lubrication optimal. Next inspection due in 14 days. Zero safety flags.",
      machine: "Line 2 (All 8 Stations)",
      action: "1-Click PDF Report Exported"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#06080d] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-64 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 -right-64 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
              PREDICTIVE SIMPLICITY
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4">
            How SENSORSAE Protects Your Plant.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Eliminate reactive firefighting. From magnetic snap-on sensors to plain-English smartphone alerts, we make predictive maintenance effortless.
          </p>
        </div>

        {/* ============================================================ */}
        {/* STORY 1: 2-Column (Text Left, Visual Comparison Right) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-400 uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              STEP 01 • PROACTIVE DETECTION
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Hear what human ears and standard sensors miss.
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Standard sensors only sound the alarm when equipment is already burning hot or shaking violently—giving you mere minutes to stop an expensive disaster.
            </p>
            <p className="text-slate-300 text-base leading-relaxed font-medium">
              SENSORSAE’s ultrasonic acoustic AI listens to high-frequency micro-friction inside metal bearings up to <strong className="text-blue-400">30 days before heat or noise ever appear</strong>.
            </p>

            {/* Feature checklist */}
            <div className="pt-4 space-y-3 font-mono text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Catches bearing spalls, cavitation, and shaft imbalance early</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Zero false alarms: AI filters out background plant noise</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Fix machines during scheduled downtime, never during production</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onRequestDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all group"
              >
                <span>See Early Detection in Action</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right: Visual Timeline Comparison Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-6 sm:p-8 shadow-glow-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                  FAILURE TIMELINE COMPARISON
                </span>
                <span className="font-mono text-xs text-blue-400 bg-blue-950 px-2.5 py-1 rounded-full border border-blue-800">
                  30-DAY ADVANTAGE
                </span>
              </div>

              {/* SENSORSAE Timeline */}
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/50 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-blue-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                      SENSORSAE PREDICTIVE AI
                    </span>
                    <span className="font-mono text-xs text-white font-semibold bg-blue-600 px-2 py-0.5 rounded">
                      DAY 1 OF DEFECT
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base mb-1">
                    Ultrasonic Micro-Friction Detected (30 Days Ahead)
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Automated gentle alert sent to maintenance team. Bearing ordered for $250. Replaced during regular changeover in 20 minutes.
                  </p>
                  <div className="mt-3 pt-3 border-t border-blue-800/60 flex items-center justify-between text-xs font-mono text-blue-300">
                    <span>DOWNTIME IMPACT: 0 MINUTES</span>
                    <span className="text-white font-bold">SAVED: $140,000</span>
                  </div>
                </div>

                {/* Legacy SCADA Timeline */}
                <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 relative opacity-75">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                      TRADITIONAL SCADA &amp; THERMOCOUPLES
                    </span>
                    <span className="font-mono text-xs text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      DAY 30 (CRISIS)
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-200 text-base mb-1">
                    Emergency High-Temp Alarm (2 Hours Before Fire)
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Bearing has already seized and damaged the motor shaft. Assembly line forced to stop. Emergency overtime crew dispatched.
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>DOWNTIME IMPACT: 14 HOURS</span>
                    <span>LOSS: $185,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STORY 2: 2-Column (Visual Left, Text Right) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Interactive Tablet AI Copilot Mockup */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-6 sm:p-8 shadow-glow-md relative">
              {/* Tablet Frame Header */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="font-mono text-xs text-slate-300 font-semibold">
                    SENSORSAE COPILOT • MOBILE ASSISTANT
                  </span>
                </div>
                <span className="font-mono text-[11px] text-blue-400 bg-blue-950 px-2.5 py-0.5 rounded-full border border-blue-800">
                  ONLINE
                </span>
              </div>

              {/* Sample Queries Tab Switcher */}
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {copilotChatDemos.map((demo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveCopilotTab(idx)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] transition-all shrink-0 border ${
                      activeCopilotTab === idx
                        ? 'bg-blue-600 text-white border-blue-400'
                        : 'bg-[#06080d] text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    Scenario 0{idx + 1}
                  </button>
                ))}
              </div>

              {/* Chat Conversation Card */}
              <div className="space-y-4 font-sans text-sm">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3.5 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
                    {copilotChatDemos[activeCopilotTab].question}
                  </div>
                </div>

                {/* AI Copilot Answer */}
                <div className="flex justify-start">
                  <div className="bg-[#06080d] border border-blue-900/50 text-slate-200 p-4 rounded-2xl rounded-tl-sm max-w-[95%] space-y-3">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-blue-400 font-semibold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{copilotChatDemos[activeCopilotTab].machine}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {copilotChatDemos[activeCopilotTab].answer}
                    </p>
                    <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/30 flex items-center justify-between text-xs font-mono text-blue-300">
                      <span>RECOMMENDED ACTION:</span>
                      <span className="font-bold text-white">{copilotChatDemos[activeCopilotTab].action}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-400 uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              STEP 02 • ZERO-CONFUSION AI
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Ask your factory anything in plain English.
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Never decipher a confusing vibration graph or scroll through 10,000 raw telemetry numbers again.
            </p>
            <p className="text-slate-300 text-base leading-relaxed font-medium">
              Technicians and operators can chat with the SENSORSAE Copilot on any phone, tablet, or workstation. Ask about machine health, get root causes, and export 1-click shift handover reports.
            </p>

            {/* Bullets */}
            <div className="pt-4 space-y-3 font-mono text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Smartphone className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Empowers junior technicians to troubleshoot like 30-year veteran engineers</span>
              </div>
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Provides exact wrench sizes, torque ratings, and replacement part numbers</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Cuts daily shift handover meetings from 45 minutes to 8 minutes</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-blue-400 border border-blue-500/30 hover:border-blue-400 font-semibold text-sm transition-all"
              >
                <span>Explore AI Software</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STORY 3: 2-Column (Text Left, Visual Hardware Right) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-blue-400 uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              STEP 03 • RAPID ROLLOUT
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Up and running in 45 minutes. Zero line stoppages.
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              Traditional industrial monitoring projects require months of IT approvals, structural conduit drilling, and halted assembly lines.
            </p>
            <p className="text-slate-300 text-base leading-relaxed font-medium">
              SENSORSAE uses ultra-strong industrial magnetic sensor pods that snap directly onto existing motor and pump casings. Connect the Edge Hub, and your plant is protected before lunchtime.
            </p>

            <div className="pt-4 space-y-3 font-mono text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Snap-on magnetic mounts: no welding, drilling, or warranty voids</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                <span>IP67 waterproof, oil-proof, and rated for extreme plant vibration</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-blue-400 shrink-0" />
                <span>Pre-configured with Nvidia Orin AI: runs locally out of the box</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onRequestDemo}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all group"
              >
                <span>Request a Risk-Free 30-Day Pilot Kit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right: Hardware Mockup Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 shadow-glow-md relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800 font-mono text-xs">
                <span className="text-slate-400">HARDWARE ARCHITECTURE</span>
                <span className="text-blue-400 flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  PLUG &amp; PLAY KIT
                </span>
              </div>

              {/* Hardware visual showcase */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#06080d] border border-blue-900/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Magnetic Sensor Pods</h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Snap onto bearing housings. Triaxial vibration + ultrasonic acoustic.
                  </p>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 font-mono text-[10px] border border-blue-800">
                    IP67 Sealed
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-[#06080d] border border-blue-900/40 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Edge-X1 AI Hub</h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Nvidia Orin compute engine. Local intelligence, zero cloud lag.
                  </p>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 font-mono text-[10px] border border-blue-800">
                    Nvidia Inside
                  </span>
                </div>
              </div>

              {/* Bottom deployment status banner */}
              <div className="mt-6 p-4 rounded-2xl bg-blue-950/30 border border-blue-500/30 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">AVERAGE SETUP DURATION:</span>
                <span className="text-white font-bold bg-blue-600 px-3 py-1 rounded-full">
                  42 MINUTES TOTAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
