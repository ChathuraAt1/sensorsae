import React, { useState } from "react";
import { ChevronDown, ArrowRight, HelpCircle } from "lucide-react";

export const Faq = ({ onRequestDemo }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "How long does installation take?",
      a: "Installation typically takes under 45 minutes on compatible equipment.",
    },
    {
      q: "Does this work with older, legacy machinery?",
      a: "Yes. It monitors external signals without modifying internal systems.",
    },
    {
      q: "Does our factory data go to the cloud?",
      a: "No. Data is processed within the approved local infrastructure.",
    },
    {
      q: "How does the 30-day pilot trial work?",
      a: "The pilot includes four sensor pods and an edge hub for selected equipment.",
    },
    {
      q: "How are maintenance alerts delivered?",
      a: "Alerts are delivered through configured channels such as SMS, email, or Slack.",
    },
    {
      q: "Can reports be exported to maintenance systems?",
      a: "Yes. Reports can be exported to supported systems, including SAP PM and IBM Maximo.",
    },
    {
      q: "What sensors are included in each pod?",
      a: "Each pod includes vibration, acoustic, and surface-temperature sensors.",
    },
    {
      q: "Is specialized staff training required?",
      a: "No specialized training is required, and onboarding support is available.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-[#06080d] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Sensor Monitoring Answers
          </h2>
          <p className="text-slate-400 text-base">
            Find answers about installation, deployment, alerts, integrations,
            and sensor capabilities.
          </p>
        </div>

        {/* 2-Column Wide FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-[#0b0f19] border-blue-500/50 shadow-glow-sm"
                    : "bg-[#0b0f19]/50 border-slate-800/80 hover:border-slate-700"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <span
                    className={`font-bold text-base transition-colors ${
                      isOpen ? "text-white" : "text-slate-200"
                    }`}
                  >
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isOpen
                        ? "bg-blue-600 text-white border-blue-400 rotate-180"
                        : "bg-[#06080d] text-slate-400 border-slate-800"
                    }`}
                  >
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

        {/* Bottom Contact Help Link */}
        <div className="text-center pt-4">
          <p className="text-slate-400 text-sm">
            Have a question about specific plant machinery?{" "}
            <button
              onClick={onRequestDemo}
              className="text-blue-400 hover:text-blue-300 font-semibold underline underline-offset-4"
            >
              Talk to Our Engineer &rarr;
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
