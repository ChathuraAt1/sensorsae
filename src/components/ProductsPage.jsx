import React from 'react';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, LayoutDashboard, 
  Cpu, Layers, ShieldCheck, Eye, Activity, Zap, Radio, Box, Network, HardDrive, Terminal
} from 'lucide-react';

export const ProductsPage = ({ onBackToHome, onOpenDashboard, onRequestDemo }) => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navAnchors = [
    { label: "Edge-X1 Hub", id: "prod-edge-x1" },
    { label: "Wireless Pods", id: "prod-pods" },
    { label: "AI Copilot", id: "prod-copilot" },
    { label: "Thermal Guard", id: "prod-thermal" },
    { label: "Nvidia Orin Stack", id: "prod-orin" },
    { label: "Protocols & SCADA", id: "prod-protocols" },
    { label: "Cybersecurity", id: "prod-security" },
    { label: "Evaluation Kit", id: "prod-starter-kit" },
    { label: "Specifications", id: "prod-comparison" }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#06080d] text-slate-100 font-sans">
      <div className="max-w-6xl mx-auto px-6 space-y-28">
        
        {/* ============================================================ */}
        {/* HERO & QUICK JUMP NAVIGATION */}
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

            {/* Direct Link to Dashboard */}
            <button
              onClick={onOpenDashboard}
              className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-950 hover:bg-blue-900 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold shadow-glow-sm transition-all"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Launch Live Dashboard (/dashboard)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-400 font-mono text-xs">
              <Cpu className="w-3.5 h-3.5" />
              <span>HARDWARE, SOFTWARE &amp; SILICON ARCHITECTURE</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Industrial Sensor Intelligence.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Rugged edge gateways, magnetic wireless pods, and on-premises Nvidia Orin™ neural engines built to eliminate unplanned manufacturing downtime.
            </p>
          </div>

          {/* Quick Jump Anchors */}
          <div className="flex flex-wrap gap-2 pt-2">
            {navAnchors.map((item, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-1.5 rounded-full bg-[#0b0f19] hover:bg-blue-950/60 border border-slate-800 hover:border-blue-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ============================================================ */}
        {/* SECTION 1: EDGE-X1 SMART SENSOR HUB */}
        {/* ============================================================ */}
        <section id="prod-edge-x1" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/25 bg-[#06080d]">
              <img 
                src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80" 
                alt="Edge-X1 Smart Sensor Hub" 
                className="w-full h-80 sm:h-96 object-cover object-center brightness-90"
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                COMPUTE GATEWAY • LOCAL INGESTION
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Edge-X1 Industrial Sensor Hub
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                The rugged central computing station installed on plant floor walls or DIN rails. It aggregates high-frequency vibration, acoustics, and temperature telemetry directly at the machine face, running neural models locally with zero cloud lag.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 font-sans pt-1">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>IP67 waterproof, dustproof, and fanless convection aluminum chassis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Aggregates up to 32 wireless magnetic pods with 1.2 km line-of-sight range</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>4x IEPE/ICP analog ports for high-bandwidth hardwired accelerometers</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Isolated dual 24V DC industrial power input with reverse polarity protection</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Request Hub Evaluation Unit
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

          {/* Sub-Feature Grid for Edge-X1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80">
            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1">
              <span className="font-mono text-xs text-blue-400 font-bold block">PORTS &amp; I/O</span>
              <p className="text-xs text-slate-300">Dual Gigabit Ethernet, RS-485 Modbus RTU, USB-C diagnostic console, and external SMA sub-GHz antenna.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1">
              <span className="font-mono text-xs text-blue-400 font-bold block">OPERATING TEMP</span>
              <p className="text-xs text-slate-300">-40°C to +85°C rated for unconditioned factory environments, foundry floors, and boiler rooms.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1">
              <span className="font-mono text-xs text-blue-400 font-bold block">ONBOARD STORAGE</span>
              <p className="text-xs text-slate-300">512 GB industrial NVMe storage for raw uncompressed spectrum logging and offline telemetry recall.</p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 2: WIRELESS MAGNETIC SNAP-ON PODS */}
        {/* ============================================================ */}
        <section id="prod-pods" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                WIRELESS SENSING PODS • ZERO CABLING
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Snap-On Magnetic Sensor Pods
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Untethered, battery-operated vibration and acoustic pods built for fast machine retrofitting. Deploy across motors, pumps, and gearboxes in minutes without conduit wiring, drilling, or production halts.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 font-sans pt-1">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>120 kg neodymium magnetic breakaway base locks securely onto curved cast iron</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Tri-axial accelerometer + ultrasonic acoustic microphone (up to 192 kHz)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>5-Year field-replaceable lithium battery with smart sleep/wake duty cycling</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Sub-GHz wireless mesh penetrates heavy reinforced concrete and steel enclosures</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Order 4-Pod Pilot Starter Pack
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/25 bg-[#06080d] order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80" 
                alt="Wireless Magnetic Sensor Pod" 
                className="w-full h-80 sm:h-96 object-cover object-center brightness-90"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800">
              <span className="text-slate-500 block text-[11px]">SAMPLING BANDWIDTH</span>
              <span className="text-white font-bold text-sm">10 Hz to 192,000 Hz</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800">
              <span className="text-slate-500 block text-[11px]">BATTERY LIFESPAN</span>
              <span className="text-blue-400 font-bold text-sm">5+ Years Continuous</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800">
              <span className="text-slate-500 block text-[11px]">CERTIFICATIONS</span>
              <span className="text-white font-bold text-sm">IP67 &amp; ATEX Zone 2</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 3: AI COPILOT & DIAGNOSTICS SUITE */}
        {/* ============================================================ */}
        <section id="prod-copilot" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/25 bg-[#06080d]">
              <img 
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80" 
                alt="AI Plant Copilot tablet interface" 
                className="w-full h-80 sm:h-96 object-cover object-center brightness-90"
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                NATURAL LANGUAGE MAINTENANCE ASSISTANT
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                AI Plant Copilot &amp; Diagnostics
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Empower your plant maintenance technicians with plain-English conversational triage. Instead of staring at dense Fourier transform charts, technicians ask questions from any browser, tablet, or phone.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 font-sans pt-1">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Ask in natural language: "Which machines need lubrication before Monday shift?"</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Automated ISO 10816/20816 vibration severity categorization and root-cause breakdown</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Generates step-by-step repair checklists, part numbers, and torque specifications</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>1-Click work order synchronization to SAP PM, IBM Maximo, or printable shift PDF</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Schedule Copilot Demo
                </button>
                <button
                  onClick={onOpenDashboard}
                  className="px-5 py-2.5 rounded-full bg-[#06080d] hover:bg-blue-950 text-blue-300 text-xs font-mono border border-slate-800 hover:border-blue-500 transition-all flex items-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Try Simulator in Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 4: THERMAL VISION GUARD */}
        {/* ============================================================ */}
        <section id="prod-thermal" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5 order-2 lg:order-1">
              <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-wider">
                NON-CONTACT OPTICS • RADIOMETRIC LWIR
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Thermal Vision Guard
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Continuous non-contact infrared thermal imaging designed for hazardous, high-voltage, or fast-moving plant machinery. Stand off up to 30 meters away to detect overheating electrical busbars, loose terminations, and bearing hot-spots safely.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 font-sans pt-1">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Calibrated radiometric measurement range: -40°C to +1,200°C</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>±0.5°C thermal precision with differential delta threshold alarms</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Automated AI hot-spot bounding boxes track moving components across field of view</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Eliminates hazardous manual thermal gun inspections near 480V switchgear</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Request Thermal Evaluation Unit
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/25 bg-[#06080d] order-1 lg:order-2">
              <img 
                src="https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80" 
                alt="Thermal Vision Guard industrial camera" 
                className="w-full h-80 sm:h-96 object-cover object-center brightness-90"
              />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 5: NVIDIA ORIN INDUSTRIAL ACCELERATION STACK */}
        {/* ============================================================ */}
        <section id="prod-orin" className="scroll-mt-36 rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0b0f19] to-blue-950/40 border border-blue-500/40 p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-blue-500/30 bg-[#06080d]">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80" 
                alt="Nvidia Jetson Orin Industrial Compute Module" 
                className="w-full h-80 sm:h-96 object-cover object-center brightness-90"
              />
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 border border-blue-500/30 text-blue-400 font-mono text-xs">
                <Cpu className="w-3.5 h-3.5" />
                <span>NVIDIA JETSON ORIN™ SILICON ARCHITECTURE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Nvidia Orin™ Industrial Edge Compute
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                By integrating Nvidia Jetson Orin compute modules directly inside our Edge-X1 hardware, all heavy vibration transforms and AI inferences execute right at the machine face. No cloud latency, no subscription egress bills, and zero security risk.
              </p>

              <div className="space-y-3 pt-1 font-mono text-xs">
                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">275 TOPS INT8 Local AI Processing</strong>
                    <span className="text-slate-400 font-sans text-[11px]">Enables real-time FFT frequency transforms and concurrent multi-sensor evaluation.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Nvidia TensorRT™ &amp; Triton™ Inference Server</strong>
                    <span className="text-slate-400 font-sans text-[11px]">Micro-quantized models serve acoustic diagnostics and thermal bounding concurrently.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#06080d] border border-blue-900/40 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-sans">Nvidia DeepStream™ Vision Pipeline</strong>
                    <span className="text-slate-400 font-sans text-[11px]">Hardware-accelerated processing of radiometric infrared video at up to 120 FPS.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={onRequestDemo}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all"
                >
                  Consult an Nvidia Solution Engineer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 6: INDUSTRIAL PROTOCOLS & SCADA INTEGRATION */}
        {/* ============================================================ */}
        <section id="prod-protocols" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
              INTEROPERABILITY &amp; INTEGRATION
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Native Connectivity for Your Existing OT Stack
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              SENSORSAE is designed to slip seamlessly into existing plant control architectures without requiring expensive PLC programming or proprietary software lock-in.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#06080d] border border-slate-800 space-y-3">
              <Network className="w-6 h-6 text-blue-400" />
              <h3 className="text-base font-bold text-white">Industrial Protocols</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Native out-of-the-box support for OPC UA, Modbus TCP/RTU, MQTT Sparkplug B, Profinet, and EtherCAT to stream health tags directly into PLCs.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#06080d] border border-slate-800 space-y-3">
              <Layers className="w-6 h-6 text-blue-400" />
              <h3 className="text-base font-bold text-white">SCADA &amp; Historians</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct connectors for Rockwell FactoryTalk, Siemens WinCC, Ignition SCADA, AVEVA PI System, and Wonderware without middleware bloat.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#06080d] border border-slate-800 space-y-3">
              <HardDrive className="w-6 h-6 text-blue-400" />
              <h3 className="text-base font-bold text-white">CMMS &amp; Work Orders</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automated work order creation in SAP Plant Maintenance (PM), IBM Maximo, eMaint, and MaintainX when vibration thresholds exceed ISO norms.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 7: CYBERSECURITY & AIR-GAP POSTURE */}
        {/* ============================================================ */}
        <section id="prod-security" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                DEFENSE-GRADE CYBERSECURITY
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                100% Air-Gapped. Zero Cloud Exposure.
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Critical manufacturing facilities cannot gamble with cloud uptime or third-party data breaches. SENSORSAE's entire inference and storage pipeline runs strictly within your physical perimeter.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>IEC 62443 Industrial Cybersecurity Compliant</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Dedicated TPM 2.0 Hardware Cryptoprocessor</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>AES-256 Encrypted Local NVMe Storage</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Cryptographically Signed Firmware &amp; Model Updates</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#06080d] border border-blue-500/25 space-y-3 font-mono text-xs">
              <div className="text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800 pb-2">
                NETWORK TOPOLOGY &amp; FIREWALL
              </div>
              <div className="space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Sensor Pods:</span>
                  <span className="text-blue-400">Sub-GHz Wireless Mesh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Edge-X1 Hub:</span>
                  <span className="text-white">Isolated OT VLAN</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Cloud Uplink:</span>
                  <span className="text-emerald-400">0% Mandatory (Air-Gapped)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>User Interface:</span>
                  <span className="text-white">Local HTTPS / TLS 1.3</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 8: 30-DAY STARTER EVALUATION KIT */}
        {/* ============================================================ */}
        <section id="prod-starter-kit" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                PILOT DEPLOYMENT PACK
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                What's in the 30-Day Evaluation Kit
              </h2>
            </div>
            <button
              onClick={onRequestDemo}
              className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all shrink-0"
            >
              Reserve Evaluation Kit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-2.5">
              <Box className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">1x Edge-X1 Hub</h3>
              <p className="text-xs text-slate-400">Pre-configured with Nvidia Jetson Orin compute, internal antennas, and power supply.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-2.5">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">4x Magnetic Pods</h3>
              <p className="text-xs text-slate-400">Wireless tri-axial vibration and acoustic sensors with 120 kg neodymium magnetic mounts.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-2.5">
              <Eye className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">1x Thermal Guard</h3>
              <p className="text-xs text-slate-400">Radiometric LWIR infrared camera module with universal clamp bracket.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-2.5">
              <Terminal className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">AI Copilot License</h3>
              <p className="text-xs text-slate-400">Pre-installed software runtime, quick-start guide, and engineer phone onboarding.</p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 9: TECHNICAL COMPARISON MATRIX */}
        {/* ============================================================ */}
        <section id="prod-comparison" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
              SPECIFICATIONS MATRIX
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              System Hardware &amp; Software Specifications
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3.5 px-3">Specification</th>
                  <th className="py-3.5 px-3 text-blue-400">Edge-X1 Hub</th>
                  <th className="py-3.5 px-3 text-blue-400">Magnetic Pods</th>
                  <th className="py-3.5 px-3 text-blue-400">Thermal Guard</th>
                  <th className="py-3.5 px-3 text-blue-400">AI Copilot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="py-3.5 px-3 font-bold text-white">Primary Function</td>
                  <td className="py-3.5 px-3">Edge compute gateway</td>
                  <td className="py-3.5 px-3">Vibration &amp; acoustic sensing</td>
                  <td className="py-3.5 px-3">Radiometric thermal vision</td>
                  <td className="py-3.5 px-3">Conversational diagnostics</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-white">Silicon &amp; Compute</td>
                  <td className="py-3.5 px-3">Nvidia Jetson Orin™ (275 TOPS)</td>
                  <td className="py-3.5 px-3">Ultra-low power Cortex M4</td>
                  <td className="py-3.5 px-3">Hardware ISP + DeepStream</td>
                  <td className="py-3.5 px-3">Local TensorRT Runtime</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-white">Sampling Bandwidth</td>
                  <td className="py-3.5 px-3">Up to 192 kHz IEPE / 24-bit</td>
                  <td className="py-3.5 px-3">10 Hz to 192,000 Hz</td>
                  <td className="py-3.5 px-3">30 FPS continuous stream</td>
                  <td className="py-3.5 px-3">Continuous event trigger</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-white">Mounting Style</td>
                  <td className="py-3.5 px-3">DIN Rail / Wall bracket</td>
                  <td className="py-3.5 px-3">120 kg Neodymium magnet</td>
                  <td className="py-3.5 px-3">Adjustable ball-head clamp</td>
                  <td className="py-3.5 px-3">Browser / Tablet Web UI</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-white">Operating Temp</td>
                  <td className="py-3.5 px-3">-40°C to +85°C</td>
                  <td className="py-3.5 px-3">-40°C to +85°C</td>
                  <td className="py-3.5 px-3">-20°C to +65°C</td>
                  <td className="py-3.5 px-3">N/A (Software)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-white">Cloud Requirement</td>
                  <td className="py-3.5 px-3">Zero (Air-gapped)</td>
                  <td className="py-3.5 px-3">Zero (Sub-GHz mesh)</td>
                  <td className="py-3.5 px-3">Zero (Local RTSP/TCP)</td>
                  <td className="py-3.5 px-3">Zero (Local LLM/SLM)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-3 font-bold text-white">Ingress Protection</td>
                  <td className="py-3.5 px-3">IP67 Enclosure</td>
                  <td className="py-3.5 px-3">IP67 Waterproof</td>
                  <td className="py-3.5 px-3">IP66 Sealed Aluminum</td>
                  <td className="py-3.5 px-3">N/A</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 10: PROMINENT CTA BANNER TO LIVE DASHBOARD */}
        {/* ============================================================ */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-950/60 via-[#0b0f19] to-blue-950/60 border border-blue-500/40 p-10 sm:p-14 text-center space-y-5 shadow-glow-sm">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400 flex items-center justify-center mx-auto text-blue-400">
            <LayoutDashboard className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            See Live Fleet Telemetry in Action.
          </h2>

          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            Experience our simulated plant floor dashboard to inspect live machine frequencies, thermal feeds, and automated diagnostic shift briefs.
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
              <span>Request 30-Day Evaluation Kit</span>
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};
