import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

export const Faq = ({ onRequestDemo }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How difficult is it to install on our existing factory floor?",
      a: "Installation takes under 45 minutes and requires zero line stoppages. Our sensor pods feature powerful industrial magnetic bases that snap directly onto motor and bearing casings. There is no drilling, welding, or plant rewiring required."
    },
    {
      q: "Will SENSORSAE work with our older, legacy machinery?",
      a: "Yes! SENSORSAE does not need to connect to your machine's internal PLC or software. Because our sensors measure external physical vibration, acoustics, and temperature directly from the equipment casing, they work seamlessly on both 40-year-old pumps and brand-new CNC stations."
    },
    {
      q: "Does our factory data have to leave our plant network or go to the cloud?",
      a: "No. SENSORSAE is built for critical infrastructure with a 100% on-premises, air-gapped architecture. All AI processing happens locally inside the Edge Hub on your plant floor. No data ever leaves your facility."
    },
    {
      q: "How does the 30-Day Risk-Free Pilot Kit work?",
      a: "We ship a complete pilot kit containing an Edge Hub and 4 magnetic sensor pods directly to your plant. Our team assists with a 30-minute remote setup call. You evaluate the live insights on your 5 most critical machines for a month. If it doesn't immediately prove value, return it with zero obligation."
    },
    {
      q: "What kind of alerts do technicians receive when an issue is detected?",
      a: "Instead of cryptic charts or raw numbers, technicians receive clear, plain-English messages on their phones via SMS, Slack, or email—such as: 'Pump Array 2 showing early bearing friction. Recommend inspection during tomorrow's shift change.'"
    },
    {
      q: "Can SENSORSAE connect with our existing SAP or CMMS maintenance software?",
      a: "Yes. SENSORSAE can generate standard 1-click work orders and PDF shift handover briefs that integrate smoothly into SAP PM, IBM Maximo, or your internal maintenance log system."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#06080d] border-b border-blue-900/25">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Common Questions from Plant Leaders.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Everything you need to know about getting started with predictive sensor monitoring.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-[#0b0f19] border-blue-500/50 shadow-glow-sm' 
                    : 'bg-[#0b0f19]/60 border-blue-900/40 hover:border-blue-700/60'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className={`font-bold text-base sm:text-lg transition-colors ${
                    isOpen ? 'text-white' : 'text-slate-200'
                  }`}>
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                    isOpen 
                      ? 'bg-blue-600 text-white border-blue-400 rotate-180' 
                      : 'bg-slate-900 text-slate-400 border-slate-800'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 font-sans animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-14 p-6 rounded-2xl bg-[#0b0f19] border border-blue-500/30 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-white font-bold text-sm">Have a custom question about your equipment?</h4>
            <p className="text-slate-400 text-xs">Our engineering team is happy to review your plant floor specs.</p>
          </div>
          <button
            onClick={onRequestDemo}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 transition-all flex items-center gap-1.5"
          >
            <span>Ask an Engineer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
