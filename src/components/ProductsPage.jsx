import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, LayoutDashboard, 
  Cpu, Layers, ShieldCheck, Eye, Activity, Zap, Radio, Box, Network, HardDrive, Terminal,
  Sliders, Wrench, Settings, AlertTriangle, FileText, Check, RotateCcw, Compass, Server, Workflow,
  Thermometer, Volume2, HelpCircle
} from 'lucide-react';

export const ProductsPage = ({ onBackToHome, onOpenDashboard, onRequestDemo }) => {
  const [activeAppIndex, setActiveAppIndex] = useState(0);
  const [pilotMachines, setPilotMachines] = useState(5);
  const [pilotEquipment, setPilotEquipment] = useState('Pumps & Motors');
  const [expandedFaq, setExpandedFaq] = useState(null);

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
    { label: "Signal DSP & Physics", id: "prod-dsp" },
    { label: "Target Machinery", id: "prod-applications" },
    { label: "Installation Flow", id: "prod-installation" },
    { label: "Protocols & SCADA", id: "prod-protocols" },
    { label: "Cybersecurity", id: "prod-security" },
    { label: "Environmental Specs", id: "prod-environmental" },
    { label: "Evaluation Kit", id: "prod-starter-kit" },
    { label: "Pilot Sizing Tool", id: "prod-calculator" },
    { label: "Specifications", id: "prod-comparison" },
    { label: "Engineering FAQ", id: "prod-faq" }
  ];

  const machineApplications = [
    {
      id: "pumps",
      name: "Centrifugal & Slurry Pumps",
      category: "Fluid Handling",
      failureModes: "Impeller cavitation, seal friction, shaft deflection, bearing race fatigue.",
      earlySymptom: "High-frequency ultrasonic noise spikes (20 kHz–80 kHz) indicative of micro-bubble collapse 3–6 weeks before thermal rise.",
      sensorSetup: "2x Wireless Magnetic Pods (drive-end & non-drive-end bearings) + 1x Thermal Guard camera pointed at mechanical seal gland.",
      photo: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "motors",
      name: "AC Induction Motors & VFDs",
      category: "Rotary Power",
      failureModes: "Stator winding hotspots, rotor bar cracking, phase unbalance, electrical bearing fluting.",
      earlySymptom: "Sideband harmonic modulation around 2x line frequency (120 Hz) and high-frequency EDM discharge signatures.",
      sensorSetup: "1x Wireless Magnetic Pod on motor drive-end casing + integration with motor drive current telemetry over Modbus TCP.",
      photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "gearboxes",
      name: "Helical & Planetary Gearboxes",
      category: "Power Transmission",
      failureModes: "Gear tooth micro-pitting, gear backlash, shaft misalignment, lubricating oil breakdown.",
      earlySymptom: "Gear mesh frequency (GMF) sideband energy elevation and high crest factor time-waveform peaks.",
      sensorSetup: "2x Wireless Magnetic Pods positioned orthogonal to gear mesh plane + 1x Pt100 RTD oil sump probe.",
      photo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "cnc",
      name: "CNC High-Speed Spindles",
      category: "Precision Machining",
      failureModes: "Ceramic hybrid ball bearing spalling, toolholder runout, drawbar spring degradation.",
      earlySymptom: "Sub-harmonic vibration emergence in 5 kHz–15 kHz band causing micro-chatter on finished surface tolerances.",
      sensorSetup: "1x Hardwired IEPE accelerometer on spindle nose + 1x Thermal Guard inspecting tool changer collets.",
      photo: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "compressors",
      name: "Screw & Reciprocating Compressors",
      category: "Gas & Air Compression",
      failureModes: "Rotor lobe wear, valve plate flutter, cylinder lubrication starvation, stage pressure surge.",
      earlySymptom: "Transient acoustic emission clicks during intake stroke prior to discharge temperature rise.",
      sensorSetup: "4x Wireless Magnetic Pods monitoring both compression stages and motor bearings.",
      photo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "conveyors",
      name: "Conveyors & Overhead Monorails",
      category: "Material Logistics",
      failureModes: "Idler roller seizure, drive sprocket tooth wear, carrier bearing overheating.",
      earlySymptom: "Localized thermal friction delta-T above 15°C detected by automated optical patrol camera.",
      sensorSetup: "Thermal Vision Guard with continuous multi-point region-of-interest (ROI) monitoring.",
      photo: "https://images.unsplash.com/photo-158109226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const engineeringFaqs = [
    {
      q: "How does SENSORSAE handle Variable Frequency Drives (VFD) where motor speed changes continuously?",
      a: "Standard vibration systems fail on VFDs because fixed frequency bins smear across speeds. SENSORSAE's edge algorithms compute automated order tracking, normalizing vibration frequencies relative to real-time rotational speed (1X, 2X, 3X running speed). Whether your motor operates at 400 RPM or 3,600 RPM, baseline anomaly thresholds automatically adjust."
    },
    {
      q: "Can SENSORSAE monitor slow-speed rotating machinery (under 60 RPM)?",
      a: "Yes. For slow-speed equipment such as kiln drives, clarifiers, and slew rings, conventional velocity metrics produce low energy signals. SENSORSAE utilizes high-frequency acoustic demodulation (PeakVue / stress wave detection up to 192 kHz) to detect the micro-shocks of metal-on-metal impact long before low-frequency vibration emerges."
    },
    {
      q: "What happens during a plant power failure or temporary network outage?",
      a: "The Edge-X1 Hub contains an industrial solid-state NVMe ring buffer and onboard supercapacitor backup. If network connectivity to the plant SCADA or local LAN is lost, the hub continues ingesting, timestamping, and processing all wireless pod streams autonomously for up to 90 days. When network connectivity restores, all historical logs synchronize seamlessly."
    },
    {
      q: "Does any machine telemetry ever leave our physical plant network?",
      a: "No. The entire system is engineered for 100% on-premises, air-gapped security. All neural model inferences, FFT transformations, and LLM Copilot reasoning run directly on the local Nvidia Jetson Orin silicon inside the Edge-X1 hardware. There are zero mandatory outbound ports, zero cloud sync requirements, and zero third-party telemetry exposure."
    },
    {
      q: "How difficult is it to integrate with our existing SAP PM or IBM Maximo CMMS?",
      a: "SENSORSAE includes native REST and webhook connectors for major maintenance software including SAP Plant Maintenance (PM), IBM Maximo, eMaint, and MaintainX. When a verified failure threshold is breached, SENSORSAE automatically generates a draft work order containing the equipment ID, fault classification, suggested replacement part numbers, and severity level."
    }
  ];

  const currentApp = machineApplications[activeAppIndex];

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
                className="px-3.5 py-1.5 rounded-full bg-[#0b0f19] hover:bg-blue-950/60 border border-slate-800 hover:border-blue-500/40 text-xs font-mono text-slate-300 hover:text-white transition-all"
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
        {/* SECTION 6: SIGNAL DSP & VIBRATION PHYSICS (NEW) */}
        {/* ============================================================ */}
        <section id="prod-dsp" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
              MATHEMATICAL &amp; PHYSICAL METHODOLOGY
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Acoustic Demodulation &amp; Harmonic Order DSP
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              How SENSORSAE isolates sub-surface fatigue weeks before conventional vibration sensors notice bulk oscillations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-sans text-xs">
            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-2.5">
              <Volume2 className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">Envelope Demodulation</h3>
              <p className="text-slate-400 leading-relaxed">
                Filters out low-frequency structural machine noise, isolating repetitive micro-impacts generated by rolling elements striking microscopic race fissures.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-2.5">
              <Activity className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">ISO 10816 / 20816 Scoring</h3>
              <p className="text-slate-400 leading-relaxed">
                Calculates true root-mean-square (RMS) vibration velocity (mm/s and in/s) against ISO severity charts for Class I, II, III, and IV machinery.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-2.5">
              <Compass className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">Automated Order Tracking</h3>
              <p className="text-slate-400 leading-relaxed">
                Normalizes dynamic machine speed variations on VFDs into exact shaft rotational multiples (1X unbalance, 2X misalignment, GMF gear mesh).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-2.5">
              <Sliders className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white text-sm">Kurtosis &amp; Crest Factor</h3>
              <p className="text-slate-400 leading-relaxed">
                Statistical wave-shape analysis calculating peak-to-RMS ratios to distinguish sharp cavitation impacts from normal background motor hum.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 7: TARGET MACHINERY DIRECTORY (NEW) */}
        {/* ============================================================ */}
        <section id="prod-applications" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                APPLICATION DIRECTORY
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight">
                Engineered for Critical Factory Equipment
              </h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Select an equipment family below to explore typical failure modes and recommended sensor deployment.
              </p>
            </div>

            <span className="font-mono text-xs text-blue-400 shrink-0">
              {activeAppIndex + 1} of {machineApplications.length} Equipment Types
            </span>
          </div>

          {/* Machine Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {machineApplications.map((app, idx) => (
              <button
                key={app.id}
                onClick={() => setActiveAppIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all border shrink-0 ${
                  activeAppIndex === idx
                    ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-glow-sm'
                    : 'bg-[#06080d] text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {app.name}
              </button>
            ))}
          </div>

          {/* Active Equipment Deep Dive Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-[#06080d] border border-slate-800 p-6 sm:p-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950 text-blue-300 font-mono text-[11px] border border-blue-500/30">
                <span>CATEGORY: {currentApp.category}</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {currentApp.name}
              </h3>
              
              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 font-mono block text-[10px] uppercase">PRIMARY FAILURE MODES:</span>
                  <p className="text-slate-200 mt-0.5">{currentApp.failureModes}</p>
                </div>

                <div>
                  <span className="text-blue-400 font-mono block text-[10px] uppercase">EARLIEST DETECTABLE SYMPTOM:</span>
                  <p className="text-slate-300 mt-0.5">{currentApp.earlySymptom}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#0b0f19] border border-slate-800">
                  <span className="text-slate-400 font-mono block text-[10px] uppercase">RECOMMENDED SENSOR ARCHITECTURE:</span>
                  <p className="text-white font-medium mt-1">{currentApp.sensorSetup}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl overflow-hidden border border-slate-800 h-64 sm:h-72">
              <img 
                src={currentApp.photo} 
                alt={currentApp.name} 
                className="w-full h-full object-cover object-center brightness-90"
              />
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 8: STEP-BY-STEP RETROFIT WORKFLOW (NEW) */}
        {/* ============================================================ */}
        <section id="prod-installation" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
              ZERO-DOWNTIME COMMISSIONING
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              From Unboxing to First Telemetry in 45 Minutes
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              No cable pulling, no drilling into machine casings, and no production line shutdowns required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400 font-mono font-bold text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-white text-sm">Magnetic Snap-On</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Wipe the cast iron casing clean, apply acoustic couplant, and snap the 120 kg neodymium pod base firmly into place.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400 font-mono font-bold text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-white text-sm">NFC Tap Pairing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tap the pod with the setup tablet to assign equipment tags (e.g. Pump 4B) and establish secure encrypted sub-GHz mesh link.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400 font-mono font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-white text-sm">Autonomous Baseline</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The local hub monitors the machine across 72 hours of operating cycles, learning normal running frequencies and baseline heat signatures.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#06080d] border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-full bg-blue-950 border border-blue-500/40 text-blue-400 font-mono font-bold text-xs flex items-center justify-center">
                04
              </div>
              <h3 className="font-bold text-white text-sm">Live Work Orders</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Connect your team's WhatsApp, SMS, or SAP PM endpoints to receive plain-English shift work orders the moment wear is isolated.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 9: INDUSTRIAL PROTOCOLS & SCADA INTEGRATION */}
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
        {/* SECTION 10: CYBERSECURITY & AIR-GAP POSTURE */}
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
        {/* SECTION 11: ENVIRONMENTAL & STRESS CERTIFICATIONS (NEW) */}
        {/* ============================================================ */}
        <section id="prod-environmental" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
              RUGGEDIZATION &amp; COMPLIANCE
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Tested for Heavy Industrial Environments
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every sensor enclosure and compute chassis is built and independently certified for continuous exposure to vibration, caustic chemicals, and extreme temperatures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1.5">
              <span className="text-blue-400 font-bold block text-sm">IP67 Waterproof</span>
              <p className="text-slate-400 text-[11px] font-sans">Hermetically sealed against high-pressure washdown and caustic CIP spray.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1.5">
              <span className="text-white font-bold block text-sm">ATEX Zone 2</span>
              <p className="text-slate-400 text-[11px] font-sans">Certified for hazardous atmospheres with potential flammable vapors or dust.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1.5">
              <span className="text-blue-400 font-bold block text-sm">MIL-STD-810H</span>
              <p className="text-slate-400 text-[11px] font-sans">Tested to endure 50g operational shock and continuous random chassis vibration.</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#06080d] border border-slate-800 space-y-1.5">
              <span className="text-white font-bold block text-sm">EN 61000-6-2</span>
              <p className="text-slate-400 text-[11px] font-sans">Heavy industrial electromagnetic immunity protecting against arc welding spikes.</p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 12: 30-DAY STARTER EVALUATION KIT */}
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
        {/* SECTION 13: INTERACTIVE PILOT SIZING TOOL (NEW) */}
        {/* ============================================================ */}
        <section id="prod-calculator" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
              PILOT CONFIGURATOR
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Estimate Your Pilot Deployment Scope
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Calculate the recommended hardware configuration for your machine bay or production line.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl bg-[#06080d] border border-slate-800 p-6 sm:p-8">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                  Number of Target Machines to Monitor: <span className="text-blue-400 font-bold text-sm">{pilotMachines} Machines</span>
                </label>
                <input 
                  type="range" 
                  min="2" 
                  max="30" 
                  value={pilotMachines} 
                  onChange={(e) => setPilotMachines(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                  <span>2 Machines (Single Cell)</span>
                  <span>15 Machines (Bay)</span>
                  <span>30 Machines (Plant Wing)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
                  Primary Equipment Class:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                  {['Pumps & Motors', 'Gearboxes', 'CNC Spindles', 'Compressors', 'Conveyors'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPilotEquipment(type)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        pilotEquipment === type
                          ? 'bg-blue-600 text-white border-blue-400 font-bold shadow-glow-sm'
                          : 'bg-[#0b0f19] text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0b0f19] border border-blue-900/50 space-y-4 font-mono text-xs">
              <div className="text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800 pb-2">
                RECOMMENDED PILOT SPECIFICATION
              </div>

              <div className="space-y-2 text-slate-300">
                <div className="flex items-center justify-between">
                  <span>Edge-X1 Hubs:</span>
                  <span className="text-white font-bold">{Math.max(1, Math.ceil(pilotMachines / 20))} Unit</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Wireless Magnetic Pods:</span>
                  <span className="text-blue-400 font-bold">{pilotMachines * 2} Pods (Dual-Bearing)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Thermal Vision Guard:</span>
                  <span className="text-white font-bold">{Math.max(1, Math.ceil(pilotMachines / 8))} Camera</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Est. Setup Time:</span>
                  <span className="text-emerald-400 font-bold">&lt; {pilotMachines * 8} Minutes Total</span>
                </div>
              </div>

              <button
                onClick={onRequestDemo}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-glow-sm transition-all text-center block"
              >
                Reserve Sized Evaluation Kit
              </button>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 15: ENGINEERING & TECHNICAL FAQ (NEW) */}
        {/* ============================================================ */}
        <section id="prod-faq" className="scroll-mt-36 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 sm:p-12 space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
              ENGINEERING Q&amp;A
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Technical Questions
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {engineeringFaqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl bg-[#06080d] border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-blue-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="font-mono text-xs text-blue-400 shrink-0">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>
                  {isExpanded && (
                    <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-900 pt-3 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* SECTION 16: PROMINENT CTA BANNER TO LIVE DASHBOARD */}
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
