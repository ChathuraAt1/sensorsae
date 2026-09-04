import React, { useState } from 'react';
import { X, CheckCircle2, Cpu, HardDrive, ShieldCheck, Zap, ArrowRight, Download, Send } from 'lucide-react';

export const ProductDetailModal = ({ product, onClose, onRequestBuild }) => {
  const [requestSent, setRequestSent] = useState(false);

  if (!product) return null;

  const handleRequest = () => {
    setRequestSent(true);
    setTimeout(() => {
      if (onRequestBuild) onRequestBuild(product);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto bg-[#06080d]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-3xl bg-[#0b0f19] border border-blue-500/40 shadow-glow-lg overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-[#06080d] px-6 py-5 border-b border-blue-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
              {product.category}
            </span>
            <span className="font-mono text-xs text-slate-400 hidden sm:inline">
              REF: SENS-{product.id.toUpperCase()}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Title & Badge */}
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 mb-2 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              {product.badge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {product.name}
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Full description */}
          <div className="p-4 rounded-2xl bg-[#06080d]/80 border border-blue-900/30 text-sm text-slate-400 leading-relaxed font-sans">
            {product.description}
          </div>

          {/* Full Technical Specifications Grid */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 mb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>TECHNICAL DATASHEET & ARCHITECTURE</span>
            </h4>
            <div className="rounded-2xl border border-blue-900/40 bg-[#06080d] divide-y divide-slate-800/80 font-mono text-xs">
              {Object.entries(product.fullSpecs).map(([key, value], idx) => (
                <div key={idx} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-slate-400 uppercase tracking-wider text-[11px] sm:w-1/3">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="text-slate-200 font-semibold sm:w-2/3 sm:text-right">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Industrial Target Use Cases */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-widest text-slate-300 mb-3">
              PRIMARY FACTORY FLOOR APPLICATIONS
            </h4>
            <div className="space-y-2">
              {product.useCases.map((uc, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-blue-950/20 border border-blue-900/30 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>{uc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="bg-[#06080d] p-6 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Nvidia Certified Industrial Deployment</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono font-medium transition-colors"
            >
              Back to Catalog
            </button>

            {requestSent ? (
              <div className="px-6 py-2.5 rounded-full bg-blue-950 border border-blue-400 text-blue-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Evaluation Unit Requested</span>
              </div>
            ) : (
              <button
                onClick={handleRequest}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-glow-sm hover:shadow-glow-md flex items-center gap-2 transition-all w-full sm:w-auto justify-center"
              >
                <span>Request Evaluation Unit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
