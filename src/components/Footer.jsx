import React from 'react';
import { Cpu, ShieldCheck, ArrowUp, LayoutDashboard } from 'lucide-react';

export const Footer = ({ onNavigate, onExploreProducts, onRequestDemo }) => {
  const protocols = ['OPC UA', 'Modbus TCP / RTU', 'MQTT Sparkplug B', 'Profinet IRT', 'CAN-FD / J1939', 'EtherCAT'];

  return (
    <footer className="bg-[#06080d] border-t border-blue-900/30 pt-16 pb-12 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Protocol Support Banner */}
        <div className="pb-12 mb-12 border-b border-slate-800/80">
          <div className="text-[11px] text-slate-500 uppercase tracking-widest mb-4 text-center sm:text-left">
            COMPATIBLE WITH STANDARD INDUSTRIAL PROTOCOLS:
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3">
            {protocols.map((proto, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-xl bg-[#0b0f19] border border-blue-900/30 text-slate-300 font-mono text-xs flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <span>{proto}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Brand & Status */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white">
                SENSOR<span className="text-blue-500 font-black">SAE</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Smart predictive monitoring platform for industrial manufacturing. Zero-downtime reliability powered by local Nvidia Orin AI.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/20 text-slate-300 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              <span>Plant Network: <strong className="text-blue-400">ONLINE</strong></span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4">
              Overview
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={() => onNavigate('about-company')} className="hover:text-blue-400 transition-colors">
                  About SENSORSAE
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-blue-400 transition-colors">
                  Product Features
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-blue-400 transition-colors">
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button onClick={onRequestDemo} className="hover:text-blue-400 transition-colors">
                  Request 30-Day Pilot
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hardware & AI Models */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4">
              Products
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button onClick={onExploreProducts} className="hover:text-blue-400 transition-colors">
                  Edge-X1 Smart Hub
                </button>
              </li>
              <li>
                <button onClick={onExploreProducts} className="hover:text-blue-400 transition-colors">
                  AI Plant Copilot
                </button>
              </li>
              <li>
                <button onClick={onExploreProducts} className="hover:text-blue-400 transition-colors">
                  Thermal Vision Guard
                </button>
              </li>
              <li>
                <button onClick={onExploreProducts} className="hover:text-blue-400 transition-colors">
                  Nvidia Orin™ Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Industrial Standards */}
          <div>
            <h4 className="text-white font-bold tracking-wider uppercase text-xs mb-4">
              Trust &amp; Security
            </h4>
            <ul className="space-y-2 text-slate-400 text-[11px]">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>100% Air-Gapped / No Cloud Risk</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>IEC 62443 Industrial Security</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>ISO 10816 Vibration Envelopes</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>IP67 Ruggedized Enclosure</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} SENSORSAE Technologies Inc. • sensorsae.net
          </div>
          <div className="flex items-center gap-6">
            <span>Silicon Partner: Nvidia Embedded</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
