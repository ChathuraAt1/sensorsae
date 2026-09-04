import React from 'react';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, LayoutDashboard 
} from 'lucide-react';

export const ProductsPage = ({ onBackToHome, onOpenDashboard, onRequestDemo }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#06080d] text-slate-100">
      <div className="max-w-6xl mx-auto px-6 space-y-28">
        
        {/* ============================================================ */}
        {/* SECTION 1: HERO & PRODUCT OVERVIEW */}
        {/* ============================================================ */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={onBackToHome}
              className="self-start flex items-center gap-2 px-4 py-2 rounded-full bg-[#0b0f19] border border-slate-800 text-slate-300 hover:text-white hover:border-blue-500/50 transition-all font-mono text-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Overview</span>
            </button>

            {/* Link to Dashboard */}
            <button
              onClick={onOpenDashboard}
              className="self-start sm:self-auto flex items-center gap-2 px-5 py-2 rounded-full bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold shadow-glow-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Launch Live Dashboard (/dashboard)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
              INDUSTRIAL PRODUCT LINE
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Predictive Hardware &amp; Software.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Rugged sensor gateways, on-premise Nvidia edge compute, and plain-English AI assistants.
            </p>
          </div>

          {/* Quick Jump Anchors */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { label: "Edge-X1 Hub", id: "prod-edge-x1" },
              { label: "AI Copilot", id: "prod-copilot" },
              { label: "Thermal Guard", id: "prod-thermal" },
              { label: "Nvidia Orin Engine", id: "prod-orin" },
              { label: "Comparison Matrix", id: "prod-comparison" }
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-1.5 rounded-full bg-[#0b0f19] hover:bg-blue-950/50 border border-slate-800 hover:border-blue-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 2: EDGE-X1 SMART SENSOR HUB */}
        {/* ============================================================ */}
        <section id="prod-edge-x1" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/25">
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80" 
                alt="Edge-X1 Smart Sensor Hub" 
                className="w-full h-80 object-cover object-center brightness-90"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase">
                HARDWARE GATEWAY • NVIDIA POWERED
              </span>
              <h2 className="text-3xl font-bold text-white">
                Edge-X1 Smart Sensor Hub
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                A rugged on-premise compute gateway that ingests and analyzes high-frequency vibration and acoustic sound directly at the machine face.
              </p>

              <div className="space-y-2 text-xs text-slate-300 font-sans pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>IP67 waterproof and fanless convection chassis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Connects up to 32 wireless magnetic sensor pods</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>100% on-premise processing with zero cloud lag</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Request Evaluation Unit
                </button>
                <button
                  onClick={onOpenDashboard}
                  className="px-5 py-2.5 rounded-full bg-[#06080d] hover:bg-blue-950 text-blue-300 text-xs font-mono border border-slate-800 hover:border-blue-500 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>View in Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: AI COPILOT & DIAGNOSTICS SUITE */}
        {/* ============================================================ */}
        <section id="prod-copilot" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase">
                CONVERSATIONAL AI SOFTWARE
              </span>
              <h2 className="text-3xl font-bold text-white">
                AI Plant Copilot &amp; Diagnostics
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ask your factory questions in plain English from any phone, tablet, or kiosk to receive instant diagnosis and suggested fixes.
              </p>

              <div className="space-y-2 text-xs text-slate-300 font-sans pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Plain-English queries: "Which pumps need inspection?"</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>1-click shift handover reports exported to PDF or SAP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Provides exact wrench sizes, torque ratings, and part numbers</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Try Copilot on Your Machinery
                </button>
                <button
                  onClick={onOpenDashboard}
                  className="px-5 py-2.5 rounded-full bg-[#06080d] hover:bg-blue-950 text-blue-300 text-xs font-mono border border-slate-800 hover:border-blue-500 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Open Copilot in Dashboard</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/25 order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" 
                alt="AI Plant Copilot tablet interface" 
                className="w-full h-80 object-cover object-center brightness-90"
              />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: THERMAL VISION GUARD */}
        {/* ============================================================ */}
        <section id="prod-thermal" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/25">
              <img 
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80" 
                alt="Thermal Vision Guard industrial camera" 
                className="w-full h-80 object-cover object-center brightness-90"
              />
            </div>

            <div className="lg:col-span-6 space-y-4">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase">
                RADIOMETRIC THERMAL AI
              </span>
              <h2 className="text-3xl font-bold text-white">
                Thermal Vision Guard
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Non-contact infrared camera module monitoring dangerous or fast-moving equipment such as electrical switchgears, conveyor lines, and automated weld cells.
              </p>

              <div className="space-y-2 text-xs text-slate-300 font-sans pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Wide measurement range: -40°C to +1,200°C</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Automated alerts if temperatures exceed custom thresholds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Real-time 120 FPS radiometric thermal stream</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Request Thermal Evaluation Unit
                </button>
                <button
                  onClick={onOpenDashboard}
                  className="px-5 py-2.5 rounded-full bg-[#06080d] hover:bg-blue-950 text-blue-300 text-xs font-mono border border-slate-800 hover:border-blue-500 transition-all flex items-center gap-2"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Inspect in Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5: NVIDIA ORIN INDUSTRIAL ENGINE */}
        {/* ============================================================ */}
        <section id="prod-orin" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4 order-2 lg:order-1">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase">
                SILICON COMPUTE PARTNERSHIP
              </span>
              <h2 className="text-3xl font-bold text-white">
                Nvidia Orin™ Industrial Acceleration
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                By integrating Nvidia Jetson Orin compute modules directly into our hardware, all machine intelligence runs locally without cloud dependence.
              </p>

              <div className="space-y-2 text-xs text-slate-300 font-sans pt-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>275 TOPS INT8 local AI compute</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Sub-4ms real-time deterministic intervention</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>-40°C to +85°C wide industrial operating temperature</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Consult an Nvidia Solution Engineer
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/25 order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" 
                alt="Nvidia Orin processor and circuit board" 
                className="w-full h-80 object-cover object-center brightness-90"
              />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 6: TECHNICAL COMPARISON MATRIX */}
        {/* ============================================================ */}
        <section id="prod-comparison" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12">
          <div className="max-w-2xl mb-6 space-y-2">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase">
              SPECIFICATIONS MATRIX
            </span>
            <h2 className="text-2xl font-bold text-white">
              Technical Comparison
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-3">Specification</th>
                  <th className="py-3 px-3 text-blue-400">Edge-X1 Hub</th>
                  <th className="py-3 px-3 text-blue-400">AI Copilot Suite</th>
                  <th className="py-3 px-3 text-blue-400">Thermal Guard</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Primary Role</td>
                  <td className="py-3 px-3">Vibration &amp; acoustic gateway</td>
                  <td className="py-3 px-3">Conversational maintenance triage</td>
                  <td className="py-3 px-3">Non-contact thermal tracking</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Setup Time</td>
                  <td className="py-3 px-3">45 Minutes (Magnetic / DIN)</td>
                  <td className="py-3 px-3">Instant (Pre-loaded)</td>
                  <td className="py-3 px-3">30 Minutes (Clamp mount)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Cloud Dependency</td>
                  <td className="py-3 px-3">Zero (100% Air-Gapped)</td>
                  <td className="py-3 px-3">Zero (Local execution)</td>
                  <td className="py-3 px-3">Zero (Local DeepStream)</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 font-bold text-white">Hardware Protection</td>
                  <td className="py-3 px-3">IP67 Waterproof Aluminum</td>
                  <td className="py-3 px-3">Software</td>
                  <td className="py-3 px-3">IP66 Sealed Enclosure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 7: PROMINENT CALL TO ACTION BANNER TO DASHBOARD */}
        {/* ============================================================ */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#0b0f19] to-blue-950/60 border border-blue-500/40 p-10 sm:p-14 text-center space-y-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400 flex items-center justify-center mx-auto text-blue-400">
            <LayoutDashboard className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See Live Machines in the Telemetry Dashboard.
          </h2>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Experience our simulated plant floor dashboard to inspect live vibration signals, temperatures, and status indicators.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Launch Live Dashboard (/dashboard)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onRequestDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#06080d] hover:bg-blue-950 text-slate-200 hover:text-white font-semibold text-xs border border-slate-800 hover:border-blue-500 transition-all"
            >
              <span>Request 30-Day Plant Pilot</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
