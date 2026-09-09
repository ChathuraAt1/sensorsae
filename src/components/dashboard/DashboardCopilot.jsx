import React from 'react';
import { Bot, User, Copy, Send } from 'lucide-react';

export const DashboardCopilot = ({
  selectedAsset,
  setSelectedAsset,
  assets,
  chatMessages,
  setChatMessages,
  chatInput,
  setChatInput,
  isAiLoading,
  handleSendAiMessage,
  handleCopy,
  chatEndRef,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Column: Equipment Context Card (Spans 4 cols) */}
      <div className="lg:col-span-4 space-y-4">
        <div className="p-5 rounded-3xl bg-[#080d17] border border-blue-900/40 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-blue-400 uppercase font-bold tracking-widest">
              INJECTED SENSOR CONTEXT
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          <div className="space-y-1">
            <div className="text-sm font-bold text-white">{selectedAsset.name}</div>
            <div className="font-mono text-xs text-slate-400">{selectedAsset.id} • {selectedAsset.location}</div>
          </div>

          <div className="p-3 rounded-xl bg-[#06080d] border border-slate-800 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">RMS Velocity:</span>
              <span className="text-slate-200">{selectedAsset.vibrationRms} mm/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">ISO Standard:</span>
              <span className="text-slate-300 truncate max-w-[150px]">{selectedAsset.isoStandard}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Ultrasonic Acoustic:</span>
              <span className="text-slate-200">{selectedAsset.ultrasonicAcoustic} dB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Enclosure Temp:</span>
              <span className="text-slate-200">{selectedAsset.temperature} °C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">RUL Prognosis:</span>
              <span className="text-blue-400 font-bold">{selectedAsset.rulHours} Operating Hours</span>
            </div>
          </div>

          {/* Switch Asset Selector */}
          <div>
            <label className="block text-[11px] font-mono text-slate-400 mb-1">
              Change Target Equipment:
            </label>
            <select
              value={selectedAsset.id}
              onChange={(e) => setSelectedAsset(assets.find(a => a.id === e.target.value) || assets[0])}
              className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
            >
              {assets.map(a => (
                <option key={a.id} value={a.id}>{a.id} — {a.name}</option>
              ))}
            </select>
          </div>

          {/* Suggested Diagnostic Prompts */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <span className="text-[11px] font-mono text-slate-400 font-bold uppercase tracking-wider block">
              Quick Engineering Queries:
            </span>
            {[
              `Diagnose root cause for ${selectedAsset.id}`,
              `Is ${selectedAsset.vibrationRms} mm/s within ISO 10816 limit?`,
              `Draft shift handover work order for maintenance`,
              `Explain bearing frequencies (BPFO vs BPFI)`
            ].map((promptText, pIdx) => (
              <button
                key={pIdx}
                onClick={() => handleSendAiMessage(promptText)}
                disabled={isAiLoading}
                className="w-full text-left p-2 rounded-xl bg-[#06080d] hover:bg-blue-950/50 border border-slate-800 text-[11px] text-slate-300 hover:text-white transition-colors"
              >
                → {promptText}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Live Chat Workspace (Spans 8 cols) */}
      <div className="lg:col-span-8 rounded-3xl bg-[#080d17] border border-blue-500/30 flex flex-col h-[650px] overflow-hidden">
        
        {/* Chat Top Banner */}
        <div className="p-4 bg-[#06080d] border-b border-blue-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm flex items-center gap-2">
                <span>SENSORSAE Copilot Studio</span>
                <span className="px-1.5 py-0.2 rounded bg-blue-950 text-blue-400 font-mono text-[9px] border border-blue-800">
                  ON-PREMISES / CLOUD GATEWAY
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                POST dash.sensorsae.net/api/ai/generate (Default Groq/OpenAI Model)
              </div>
            </div>
          </div>

          <button
            onClick={() => setChatMessages([chatMessages[0]])}
            className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Clear History
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 font-sans text-xs">
          {chatMessages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-blue-950 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white shadow-glow-sm rounded-tr-none font-medium'
                    : 'bg-[#06080d] border border-blue-900/40 text-slate-200 rounded-tl-none font-normal'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
                <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10 text-[9px] font-mono text-slate-500">
                  <button
                    onClick={() => handleCopy(msg.content, 'Message')}
                    className="hover:text-blue-300 transition-colors flex items-center gap-1"
                  >
                    <Copy className="w-2.5 h-2.5" />
                    <span>Copy text</span>
                  </button>
                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isAiLoading && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-[#06080d] border border-blue-900/40 text-blue-300 text-xs font-mono w-fit">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              <span>Inferencing FFT vibration harmonics...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#06080d] border-t border-blue-900/40">
          <div className="flex items-center gap-2 bg-[#080d17] border border-slate-800 rounded-2xl p-2 focus-within:border-blue-500 transition-all">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSendAiMessage(); }}
              placeholder={`Query telemetry on ${selectedAsset.id} or ask plant maintenance procedures...`}
              className="w-full bg-transparent px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none"
            />
            <button
              onClick={() => handleSendAiMessage()}
              disabled={isAiLoading || !chatInput.trim()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
