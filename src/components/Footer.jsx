import React, { useState } from 'react';
import { Cpu, ArrowUp, Send, CheckCircle2, Building2, FileText, Download } from 'lucide-react';
import { FaLinkedinIn, FaXTwitter, FaYoutube, FaGithub } from 'react-icons/fa6';

export const Footer = ({ onNavigate, onExploreProducts, onRequestDemo }) => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailInput('');
    }, 2000);
  };

  return (
    <footer className="bg-[#05070a] border-t border-blue-900/30 pt-16 pb-12 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Custom Top Newsletter / Engineering Briefing Bar */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-950/40 via-[#0b0f19] to-blue-950/40 border border-blue-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow-sm">
          <div className="space-y-1 text-center md:text-left">
            <span className="font-mono text-[11px] uppercase tracking-widest text-blue-400 font-bold">
              INDUSTRIAL RELIABILITY DIGEST
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Get monthly predictive maintenance case studies.
            </h3>
            <p className="text-slate-400 text-xs">
              No spam. Just actionable root-cause teardowns and smart factory insights.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex items-center gap-2 max-w-md">
            {subscribed ? (
              <div className="px-6 py-3 rounded-full bg-blue-950 border border-blue-400 text-blue-300 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Subscribed! Check your inbox soon.</span>
              </div>
            ) : (
              <div className="flex w-full rounded-full bg-[#06080d] border border-slate-800 p-1 focus-within:border-blue-500 transition-all">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your work email..."
                  className="bg-transparent px-4 py-2 text-white placeholder:text-slate-600 focus:outline-none text-xs w-full"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>Subscribe</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Main Custom Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Mission Column (Spans 4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-blue-950 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-glow-sm">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-wider text-white">
                SENSOR<span className="text-blue-500 font-black">SAE</span>
              </span>
            </div>
            
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Sensor Intelligence &amp; Predictive Monitoring Platform. Zero-downtime manufacturing powered by local on-premises Nvidia Orin AI.
            </p>

            {/* Live Mesh Status Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/40 border border-blue-500/20 text-slate-300 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              <span>Global Industrial Mesh: <strong className="text-blue-400 font-semibold">100% NOMINAL</strong></span>
            </div>
          </div>

          {/* Navigation Column (Spans 2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('how-it-works')} className="hover:text-blue-400 transition-colors">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-blue-400 transition-colors">
                  Product Features
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('testimonials')} className="hover:text-blue-400 transition-colors">
                  Field Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about-company')} className="hover:text-blue-400 transition-colors">
                  About SENSORSAE
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faq')} className="hover:text-blue-400 transition-colors">
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Product Line Column (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Product Suite
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onExploreProducts} className="hover:text-blue-400 transition-colors text-left">
                  Edge-X1 Smart Sensor Hub
                </button>
              </li>
              <li>
                <button onClick={onExploreProducts} className="hover:text-blue-400 transition-colors text-left">
                  AI Plant Copilot &amp; Diagnostics
                </button>
              </li>
              <li>
                <button onClick={onExploreProducts} className="hover:text-blue-400 transition-colors text-left">
                  Thermal Vision Guard
                </button>
              </li>
              <li>
                <button onClick={onExploreProducts} className="hover:text-blue-400 transition-colors text-left">
                  Nvidia Orin™ Edge Compute Engine
                </button>
              </li>
              <li>
                <button onClick={onRequestDemo} className="text-blue-400 hover:text-blue-300 font-bold transition-colors">
                  → Request 30-Day Evaluation Kit
                </button>
              </li>
            </ul>
          </div>

          {/* Company Profile & Social Channels Column (Spans 3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Company Profile Section */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Company Profile
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button 
                    onClick={() => onNavigate('about-company')} 
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group text-left"
                  >
                    <Building2 className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
                    <span>Executive Overview &amp; Story</span>
                  </button>
                </li>
                <li>
                  <a 
                    href="#download-factsheet"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('SENSORSAE Enterprise Factsheet & Profile is being prepared for download.');
                    }}
                    className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group text-left"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform shrink-0" />
                    <span>Download Company Factsheet</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-blue-950 border border-blue-500/30 text-blue-400">PDF</span>
                  </a>
                </li>
                <li className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>HQ: Austin, TX • R&amp;D: Detroit, MI</span>
                </li>
              </ul>
            </div>

            {/* Social Channels Section */}
            <div className="space-y-3 pt-3 border-t border-slate-900">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Social Channels
              </h4>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SENSORSAE LinkedIn"
                  title="LinkedIn"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/60 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-200 group shadow-sm"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SENSORSAE X (Twitter)"
                  title="X (Twitter)"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/60 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-200 group shadow-sm"
                >
                  <FaXTwitter className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SENSORSAE YouTube"
                  title="YouTube"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/60 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-200 group shadow-sm"
                >
                  <FaYoutube className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SENSORSAE GitHub"
                  title="GitHub"
                  className="w-8 h-8 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-950/60 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-200 group shadow-sm"
                >
                  <FaGithub className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                </a>
              </div>
              <p className="text-[11px] text-slate-500">
                Engineering dispatches &amp; firmware updates.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} SENSORSAE Technologies Inc. • sensorsae.net • All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by Nvidia Orin™</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
