import React from 'react';
import { 
  ArrowLeft, Cpu, Zap, Shield, ArrowRight, Activity, 
  Package, CheckCircle2, Eye, HardDrive, LayoutDashboard, Terminal 
} from 'lucide-react';

export const ProductsPage = ({ onBackToHome, onOpenDashboard, onRequestDemo }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#06080d] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* ============================================================ */}
        {/* SECTION 1: HERO & PRODUCT OVERVIEW */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b0f19] border border-blue-900/40 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all font-mono text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Overview</span>
            </button>

            {/* Link to Dashboard */}
            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold shadow-glow-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Launch Live Dashboard (/dashboard)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30">
              <Package className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
                INDUSTRIAL PRODUCT LINE &amp; ARCHITECTURE
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Predictive Hardware &amp; AI Stack.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore our complete industrial lineup. From magnetic ultrasonic sensor pods to local Nvidia Orin gateways and plain-English AI assistants.
            </p>
          </div>

          {/* Quick Jump Anchors */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { label: "1. Edge-X1 Smart Hub", id: "prod-edge-x1" },
              { label: "2. AI Plant Copilot", id: "prod-copilot" },
              { label: "3. Thermal Vision Guard", id: "prod-thermal" },
              { label: "4. Nvidia Orin™ Engine", id: "prod-orin" },
              { label: "5. Technical Comparison", id: "prod-comparison" }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-xl bg-[#0b0f19] hover:bg-blue-950/50 border border-blue-900/40 hover:border-blue-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 2: EDGE-X1 SMART SENSOR HUB */}
        {/* ============================================================ */}
        <section id="prod-edge-x1" className="scroll-mt-36 rounded-4xl bg-[#0b0f19] border border-blue-500/30 p-8 sm:p-12 shadow-glow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-blue-500/30">
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80" 
                alt="Edge-X1 Smart Sensor Hub" 
                className="w-full h-[400px] object-cover object-center brightness-90"
              />
              <div className="absolute top-4 left-4 font-mono text-xs bg-blue-950/90 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
                HARDWARE GATEWAY
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-900 uppercase">
                  NVIDIA ORIN™ POWERED
                </span>
                <span className="font-mono text-xs text-slate-400">MODEL: SENS-X1-HUB</span>
              </div>

              <h2 className="text-3xl font-bold text-white">
                Edge-X1 Smart Sensor Hub
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                The rugged on-premise compute hub that ingests, filters, and analyzes vibration, acoustic sound, and heat directly inside machine panels. Enclosed in a fanless aircraft-grade aluminum chassis with zero moving parts.
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">CHASSIS RATING</span>
                  <span className="text-white font-bold">IP67 Waterproof &amp; Dust</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">OPERATING TEMP</span>
                  <span className="text-white font-bold">-40°C to +85°C Fanless</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">CAPACITY</span>
                  <span className="text-white font-bold">Up to 32 Wireless Sensors</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">SECURITY</span>
                  <span className="text-white font-bold">100% Air-Gapped Local</span>
                </div>
              </div>

              {/* Included in Box */}
              <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/30 text-xs font-mono text-slate-400">
                <span className="text-slate-500 uppercase text-[10px] block mb-1">IN THE BOX:</span>
                <span>Edge-X1 Hub, 4x Magnetic Wireless Sensor Pods, DIN-Rail Mount Kit, Heavy-Duty Power Supply</span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all"
                >
                  Request Edge-X1 Evaluation Unit
                </button>
                <button
                  onClick={onOpenDashboard}
                  className="px-5 py-3 rounded-full bg-[#06080d] hover:bg-blue-950 text-blue-400 text-xs font-mono border border-blue-900/50 hover:border-blue-500 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>View in Dashboard (/dashboard)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: AI COPILOT & DIAGNOSTICS SUITE */}
        {/* ============================================================ */}
        <section id="prod-copilot" className="scroll-mt-36 rounded-4xl bg-[#0b0f19] border border-blue-500/30 p-8 sm:p-12 shadow-glow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Details */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-900 uppercase">
                  CONVERSATIONAL INTELLIGENCE
                </span>
                <span className="font-mono text-xs text-slate-400">AI SOFTWARE</span>
              </div>

              <h2 className="text-3xl font-bold text-white">
                AI Plant Copilot &amp; Diagnostics
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Transform millions of raw sensor samples into conversational, plain-English answers. Technicians can chat with any piece of equipment from their smartphone, tablet, or central kiosk.
              </p>

              <div className="space-y-3 font-sans text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Ask anything: "Which pumps need lubrication before Friday?"</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Automated shift handover reports generated in 1 click (PDF / SAP export)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Provides exact wrench sizes, torque ratings, and replacement part numbers</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/30 text-xs font-mono text-slate-400">
                <span className="text-slate-500 uppercase text-[10px] block mb-1">TECHNICAL SPEC:</span>
                <span>Optimized via Nvidia TensorRT-LLM • Sub-150ms inference • Works offline on-premise</span>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all"
                >
                  Try Copilot on Your Machinery
                </button>
                <button
                  onClick={onOpenDashboard}
                  className="px-5 py-3 rounded-full bg-[#06080d] hover:bg-blue-950 text-blue-400 text-xs font-mono border border-blue-900/50 hover:border-blue-500 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open Copilot in Dashboard (/dashboard)</span>
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-blue-500/30 order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" 
                alt="AI Plant Copilot tablet interface" 
                className="w-full h-[400px] object-cover object-center brightness-90"
              />
              <div className="absolute top-4 right-4 font-mono text-xs bg-blue-950/90 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
                TABLET &amp; MOBILE PWA
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: THERMAL VISION GUARD */}
        {/* ============================================================ */}
        <section id="prod-thermal" className="scroll-mt-36 rounded-4xl bg-[#0b0f19] border border-blue-500/30 p-8 sm:p-12 shadow-glow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Image */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-blue-500/30">
              <img 
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80" 
                alt="Thermal Vision Guard industrial camera" 
                className="w-full h-[400px] object-cover object-center brightness-90"
              />
              <div className="absolute top-4 left-4 font-mono text-xs bg-blue-950/90 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
                RADIOMETRIC THERMAL AI
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-900 uppercase">
                  NON-CONTACT VISION
                </span>
                <span className="font-mono text-xs text-slate-400">PERCEPTION ENGINE</span>
              </div>

              <h2 className="text-3xl font-bold text-white">
                Thermal Vision Guard
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                Continuous non-contact infrared thermal vision module designed for hazardous or fast-moving areas where physical sensors cannot touch—such as electrical switchgear, conveyor belts, furnaces, and automated welding lines.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">TEMPERATURE RANGE</span>
                  <span className="text-white font-bold">-40°C to +1,200°C</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">ACCURACY</span>
                  <span className="text-white font-bold">± 0.2°C Calibrated</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">STREAM SPEED</span>
                  <span className="text-white font-bold">120 FPS Real-Time</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">SDK ENGINE</span>
                  <span className="text-white font-bold">Nvidia Metropolis™</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all"
                >
                  Request Thermal Evaluation Unit
                </button>
                <button
                  onClick={onOpenDashboard}
                  className="px-5 py-3 rounded-full bg-[#06080d] hover:bg-blue-950 text-blue-400 text-xs font-mono border border-blue-900/50 hover:border-blue-500 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Inspect in Dashboard (/dashboard)</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5: NVIDIA ORIN INDUSTRIAL ENGINE */}
        {/* ============================================================ */}
        <section id="prod-orin" className="scroll-mt-36 rounded-4xl bg-[#0b0f19] border border-blue-500/30 p-8 sm:p-12 shadow-glow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Details */}
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-full border border-blue-900 uppercase">
                  SILICON PARTNERSHIP
                </span>
                <span className="font-mono text-xs text-slate-400">EDGE ACCELERATION</span>
              </div>

              <h2 className="text-3xl font-bold text-white">
                Nvidia Orin™ Edge Compute Architecture
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed">
                By integrating Nvidia Jetson Orin silicon directly into our hardware, SENSORSAE processes gigabytes of high-frequency sensor streams on-site. There is zero delay, zero cloud dependency, and complete resilience against external network failures.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">AI COMPUTE POWER</span>
                  <span className="text-white font-bold">275 TOPS INT8</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">CUDA CORES</span>
                  <span className="text-white font-bold">2,048 Ampere Architecture</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">LATENCY</span>
                  <span className="text-white font-bold">&lt; 3.84ms Deterministic</span>
                </div>
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40">
                  <span className="text-slate-500 text-[10px] block">INTEGRATION</span>
                  <span className="text-white font-bold">RAPIDS + Triton Server</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all"
                >
                  Consult an Nvidia Solution Architect
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-blue-500/30 order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" 
                alt="Nvidia Orin processor and circuit board" 
                className="w-full h-[400px] object-cover object-center brightness-90"
              />
              <div className="absolute top-4 right-4 font-mono text-xs bg-blue-950/90 text-blue-300 px-3 py-1 rounded-full border border-blue-800">
                275 TOPS ON-PREM AI
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 6: TECHNICAL COMPARISON MATRIX */}
        {/* ============================================================ */}
        <section id="prod-comparison" className="scroll-mt-36 rounded-4xl bg-[#0b0f19] border border-blue-500/30 p-8 sm:p-12 shadow-glow-md">
          <div className="max-w-3xl mb-8">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider block mb-2">
              TECHNICAL COMPARISON
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Product Specifications Matrix
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Review technical specifications across our edge hardware and AI software modules.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-4 px-4">Feature / Specification</th>
                  <th className="py-4 px-4 text-blue-400">Edge-X1 Smart Hub</th>
                  <th className="py-4 px-4 text-blue-400">AI Copilot Suite</th>
                  <th className="py-4 px-4 text-blue-400">Thermal Vision Guard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Primary Role</td>
                  <td className="py-3 px-4">Machine vibration &amp; acoustic gateway</td>
                  <td className="py-3 px-4">Conversational shift diagnosis &amp; work orders</td>
                  <td className="py-3 px-4">Non-contact continuous thermal hotspot inspection</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Installation Time</td>
                  <td className="py-3 px-4">45 Minutes (DIN-rail or magnetic mount)</td>
                  <td className="py-3 px-4">Instant (Pre-loaded on Edge Hub)</td>
                  <td className="py-3 px-4">30 Minutes (Overhead clamp mount)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Cloud Requirement</td>
                  <td className="py-3 px-4">Zero (100% Air-Gapped)</td>
                  <td className="py-3 px-4">Zero (Local TensorRT-LLM)</td>
                  <td className="py-3 px-4">Zero (Local DeepStream inference)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Nvidia Acceleration</td>
                  <td className="py-3 px-4">Jetson Orin™ Dual SOM</td>
                  <td className="py-3 px-4">TensorRT-LLM 14B AWQ</td>
                  <td className="py-3 px-4">Metropolis™ DeepStream</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-white">Enclosure Protection</td>
                  <td className="py-3 px-4">IP67 Sealed M12 Aircraft Aluminum</td>
                  <td className="py-3 px-4">N/A (Software)</td>
                  <td className="py-3 px-4">IP66 Sealed Aluminum Casing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 7: CALL TO ACTION BANNER TO DASHBOARD (/dashboard) */}
        {/* ============================================================ */}
        <section className="rounded-4xl bg-gradient-to-r from-blue-950 via-[#0b0f19] to-blue-950 border border-blue-500/50 p-10 sm:p-14 text-center space-y-6 shadow-glow-lg">
          <div className="w-16 h-16 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center mx-auto text-blue-400 shadow-glow-md">
            <LayoutDashboard className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Ready to See Live Machines Streaming in Real-Time?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Experience our simulated telemetry dashboard to explore how SENSORSAE detects early micro-vibrations across production cells.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-glow-md hover:shadow-glow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <span>Launch Live Telemetry Dashboard (/dashboard)</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onRequestDemo}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-[#06080d] hover:bg-blue-950 text-slate-200 hover:text-white font-semibold text-sm border border-blue-500/30 hover:border-blue-400 transition-all"
            >
              <span>Request 30-Day Plant Pilot</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
