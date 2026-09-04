import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export const Faq = ({ onRequestDemo }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How long does installation take?",
      a: "Under 45 minutes. Sensor pods use industrial magnetic mounts that snap directly onto motor casings without drilling or line stoppages."
    },
    {
      q: "Does this work with older, legacy machinery?",
      a: "Yes. SENSORSAE monitors external casing vibration and acoustics directly, requiring zero modifications to your machine's internal PLC or software."
    },
    {
      q: "Does our factory data go to the cloud?",
      a: "No. SENSORSAE runs 100% on-premises with air-gapped security. All processing occurs locally on your factory floor."
    },
    {
      q: "How does the 30-day pilot trial work?",
      a: "We ship a complete starter kit with 4 sensor pods and an Edge Hub. You test it on your critical equipment for 30 days risk-free."
    },
    {
      q: "What format do maintenance alerts come in?",
      a: "Technicians receive clear, plain-English notifications via SMS, Slack, or email stating the exact machine and recommended fix."
    },
    {
      q: "Can we export reports to SAP or work order systems?",
      a: "Yes. SENSORSAE generates 1-click PDF shift handover summaries and standard maintenance tickets compatible with SAP PM and Maximo."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#06080d] border-b border-slate-900">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Common Questions.
          </h2>
          <p className="text-slate-400 text-base">
            Everything you need to know about predictive sensor monitoring.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'bg-[#0b0f19] border-blue-500/50 shadow-glow-sm' 
                    : 'bg-[#0b0f19]/40 border-slate-900 hover:border-slate-800'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className={`font-bold text-base transition-colors ${
                    isOpen ? 'text-white' : 'text-slate-200'
                  }`}>
                    {item.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                    isOpen 
                      ? 'bg-blue-600 text-white border-blue-400 rotate-180' 
                      : 'bg-[#06080d] text-slate-400 border-slate-800'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
