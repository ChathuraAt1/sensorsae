import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Send, Sparkles, AlertCircle, CheckCircle2, RefreshCw, Cpu, Activity } from 'lucide-react';
import { copilotPresetQueries } from '../data/mockData';

export const TelemetryCopilot = () => {
  const [activeQueryIdx, setActiveQueryIdx] = useState(0);
  const [customInput, setCustomInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [currentResponse, setCurrentResponse] = useState(copilotPresetQueries[0].response);
  const terminalEndRef = useRef(null);

  // Trigger simulated streaming when activeQueryIdx changes
  useEffect(() => {
    const resp = copilotPresetQueries[activeQueryIdx].response;
    setCurrentResponse(resp);
    startTypingEffect(resp.summary);
  }, [activeQueryIdx]);

  const startTypingEffect = (text) => {
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 12);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    // Simulate intelligent answer for custom query
    const customSummary = `Synthesizing multi-variate telemetry for "${customInput}". Cross-referencing 148,000 real-time sensor streams with ISO 10816 vibrational envelopes. All edge gateways reporting zero harmonic deviation.`;
    
    const syntheticResp = {
      status: "NOMINAL EVALUATION",
      statusType: "nominal",
      confidence: "99.8%",
      headline: `Diagnostic report for custom query: "${customInput}"`,
      summary: customSummary,
      metrics: [
        { name: "FFT Spectral Drift", val: "< 0.04%", delta: "Nominal" },
        { name: "Harmonic Coherence", val: "0.998", delta: "Locked" },
        { name: "Node Thermal Margin", val: "+34.2°C", delta: "Optimal" },
        { name: "Predictive Degradation", val: "0.000%", delta: "Zero Fault" }
      ],
      recommendation: "Operational envelopes verified within normal manufacturing tolerance limits. Telemetry streaming remains stable."
    };

    setCurrentResponse(syntheticResp);
    startTypingEffect(customSummary);
    setCustomInput('');
  };

  return (
    <section id="copilot" className="relative py-28 bg-[#06080d] border-b border-blue-900/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
              INTERACTIVE AI TELEMETRY ENGINE
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
            Query Machine Sensors in Plain English.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Test the live simulated Telemetry Copilot. Ingesting raw vibrational frequencies, temperature gradients, and pressure differentials into actionable engineering diagnostics.
          </p>
        </div>

        {/* Preset Query Quick Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8 max-w-4xl mx-auto">
          <span className="font-mono text-xs text-slate-400 mr-2 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Preset Queries:</span>
          </span>
          {copilotPresetQueries.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveQueryIdx(idx)}
              className={`px-4 py-2 rounded-full font-mono text-xs font-medium transition-all duration-200 border ${
                activeQueryIdx === idx
                  ? 'bg-blue-600 text-white border-blue-400 shadow-glow-sm'
                  : 'bg-[#0b0f19] text-slate-300 border-blue-900/40 hover:border-blue-700 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Terminal Container */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#0b0f19] border border-blue-500/40 shadow-glow-md overflow-hidden font-mono">
          {/* Terminal Window Header Bar */}
          <div className="bg-[#06080d] px-6 py-4 border-b border-blue-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-900"></div>
              <div className="w-3 h-3 rounded-full bg-blue-800"></div>
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span className="ml-3 text-xs text-slate-400">
                sensorsae-copilot-agent@edge-x1-orin:~$
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              <span className="text-blue-400 font-semibold">TENSORRT-LLM 14B AWQ</span>
            </div>
          </div>

          {/* Terminal Content Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Active User Query Prompt */}
            <div className="flex items-start gap-3 text-sm">
              <span className="text-blue-400 font-bold select-none">&gt;</span>
              <span className="text-white font-medium">
                {copilotPresetQueries[activeQueryIdx]?.query || "Custom telemetry inspection"}
              </span>
            </div>

            {/* AI Copilot Response Card */}
            <div className="p-6 rounded-2xl bg-[#06080d]/90 border border-blue-900/50 space-y-5">
              {/* Diagnostic Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border flex items-center gap-2 ${
                      currentResponse.statusType === 'alert'
                        ? 'bg-blue-950 text-blue-200 border-blue-400 animate-pulse-rapid shadow-glow-alert'
                        : 'bg-blue-950/60 text-blue-300 border-blue-500/50'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    {currentResponse.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    Confidence: <span className="text-white font-semibold">{currentResponse.confidence}</span>
                  </span>
                </div>

                <span className="text-xs text-blue-400">
                  ISO 10816 & 20816 Telemetry Model
                </span>
              </div>

              {/* Headline */}
              <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
                {currentResponse.headline}
              </h4>

              {/* Streaming Summary Text */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans bg-blue-950/20 p-4 rounded-xl border border-blue-900/30">
                {displayedText}
                {isTyping && <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" />}
              </div>

              {/* Telemetry Metric Readouts Table */}
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-400 mb-2">
                  TELEMETRY SENSOR MATRIX:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentResponse.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-3 rounded-xl bg-[#0b0f19] border border-blue-900/40">
                      <div className="text-[11px] text-slate-400 truncate mb-0.5">{m.name}</div>
                      <div className="text-sm sm:text-base font-bold text-white">{m.val}</div>
                      <div className="text-[10px] text-blue-400 mt-0.5 font-medium">{m.delta}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actionable Engineering Recommendation */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-blue-400 font-bold mb-1 uppercase tracking-wider text-[11px]">
                  <Activity className="w-3.5 h-3.5" />
                  <span>ACTIONABLE REMEDIATION PROTOCOL</span>
                </div>
                <p className="text-slate-200 font-sans leading-relaxed">
                  {currentResponse.recommendation}
                </p>
              </div>
            </div>

            {/* Custom Query Input Field */}
            <form onSubmit={handleCustomSubmit} className="relative mt-4">
              <div className="relative flex items-center">
                <span className="absolute left-4 text-blue-400 font-bold select-none text-sm">&gt;</span>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Ask copilot anything (e.g., 'Check hydraulic line pressure in bay 3')..."
                  className="w-full bg-[#06080d] text-white pl-8 pr-28 py-3.5 rounded-2xl border border-blue-900/60 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 text-xs sm:text-sm placeholder:text-slate-600 transition-all"
                />
                <button
                  type="submit"
                  disabled={!customInput.trim()}
                  className="absolute right-2 px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <span>Query</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
