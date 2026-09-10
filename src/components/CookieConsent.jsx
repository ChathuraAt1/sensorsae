import React, { useState, useEffect } from 'react';
import { Shield, Cookie, Check, X, ExternalLink } from 'lucide-react';

export const CookieConsent = ({ onNavigateLegal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already responded to consent
    const consent = localStorage.getItem('sensorsae_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('sensorsae_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('sensorsae_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#0b0f19]/95 backdrop-blur-xl border border-blue-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-blue-950/60 text-slate-200 text-xs space-y-4">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 shadow-glow-sm">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Industrial Privacy &amp; Cookies</h4>
              <span className="text-[10px] font-mono text-blue-400">IEC 62443 COMPLIANT TELEMETRY</span>
            </div>
          </div>

          <button
            onClick={handleAcceptEssential}
            className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Dismiss cookie notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs leading-relaxed">
          SENSORSAE uses essential session tokens and encrypted telemetry cookies to maintain operator authentication, secure live sensor feeds, and prevent cyber-physical anomalies.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1 font-mono text-xs">
          <button
            onClick={handleAcceptAll}
            className="w-full sm:w-auto flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-glow-sm flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept All</span>
          </button>

          <button
            onClick={handleAcceptEssential}
            className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-[#06080d] hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-semibold transition-all cursor-pointer"
          >
            Essential Only
          </button>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-900">
          <button
            onClick={() => onNavigateLegal ? onNavigateLegal('cookies') : (window.location.href = '/cookies')}
            className="text-blue-400 hover:underline cursor-pointer"
          >
            Read Cookie Policy →
          </button>
          <span className="text-slate-400">ISO 27001 / IEC 62443</span>
        </div>

      </div>
    </div>
  );
};
