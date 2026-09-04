import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Sparkles, Package, Clock, PhoneCall } from 'lucide-react';

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    equipmentType: 'Pumps, Motors & Compressors',
    machineCount: '5 Machines (Pilot Kit)',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="consultation" className="py-24 bg-[#06080d] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-4xl bg-[#0b0f19] border border-blue-500/40 p-8 sm:p-12 shadow-glow-md relative overflow-hidden">
          {/* Subtle top glow line */}
          <div className="absolute top-0 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-blue-950 border border-blue-400 flex items-center justify-center mx-auto text-blue-400 shadow-glow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Your 30-Day Trial Kit is Reserved!
              </h3>
              <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                Thank you <strong className="text-white">{formData.name}</strong>. A SENSORSAE Deployment Specialist will review the setup for <strong className="text-white">{formData.company}</strong> and confirm shipment details to <span className="font-mono text-blue-400">{formData.email}</span> within 2 business hours.
              </p>
              <div className="p-4 rounded-2xl bg-[#06080d] border border-blue-900/40 max-w-md mx-auto font-mono text-xs text-left space-y-2">
                <div className="text-slate-400 uppercase text-[10px]">TRIAL RESERVATION SUMMARY:</div>
                <div className="text-slate-200">EQUIPMENT TARGET: <span className="text-blue-400 font-bold">{formData.equipmentType}</span></div>
                <div className="text-slate-200">PILOT BATCH: <span className="text-blue-400">{formData.machineCount}</span></div>
                <div className="text-slate-200">ESTIMATED SETUP: <span className="text-blue-400">45 minutes (Clamp-on)</span></div>
              </div>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800 text-xs font-mono font-medium hover:bg-blue-900 transition-colors"
              >
                Submit another plant facility
              </button>
            </div>
          ) : (
            <div>
              {/* Header */}
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 mb-3">
                  <Package className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono text-xs uppercase tracking-widest text-blue-300">
                    RISK-FREE 30-DAY PILOT
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                  Test SENSORSAE on Your 5 Most Critical Machines.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  We'll ship you an Edge Hub and snap-on sensor pods. If SENSORSAE doesn't prove its value and catch micro-wear within 30 days, send it back with zero obligations.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. David Miller"
                      className="w-full bg-[#06080d] text-white px-4 py-3 rounded-xl border border-blue-900/50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm placeholder:text-slate-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. d.miller@acme-industrial.com"
                      className="w-full bg-[#06080d] text-white px-4 py-3 rounded-xl border border-blue-900/50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm placeholder:text-slate-600 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                      Company or Facility Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Apex Precision Manufacturing"
                      className="w-full bg-[#06080d] text-white px-4 py-3 rounded-xl border border-blue-900/50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm placeholder:text-slate-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                      Primary Machinery to Protect
                    </label>
                    <select
                      value={formData.equipmentType}
                      onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                      className="w-full bg-[#06080d] text-white px-4 py-3 rounded-xl border border-blue-900/50 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm font-mono transition-all"
                    >
                      <option value="Pumps, Motors & Compressors">Pumps, Motors &amp; Compressors</option>
                      <option value="CNC Spindles & Milling">CNC Spindles &amp; Milling Machines</option>
                      <option value="Turbines & Generators">Gas / Steam Turbines &amp; Generators</option>
                      <option value="Conveyors & Robotic Cells">Conveyors &amp; Robotic Cells</option>
                      <option value="Extruders & Rolling Mills">Extruders &amp; Rolling Mills</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                    Scope of Evaluation
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['5 Machines (Pilot Kit)', '10 - 25 Machines (Cell)', '50+ Machines (Plant)'].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, machineCount: opt })}
                        className={`p-3 rounded-xl text-xs font-mono border transition-all text-center ${
                          formData.machineCount === opt
                            ? 'bg-blue-600 text-white border-blue-400 shadow-glow-sm'
                            : 'bg-[#06080d] text-slate-400 border-blue-900/40 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-base shadow-glow-md hover:shadow-glow-lg transition-all duration-300 flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span>Reserving Your Hardware Kit...</span>
                  ) : (
                    <>
                      <span>Ship My 30-Day Risk-Free Pilot Kit</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500 pt-2">
                  <span>✓ 100% Free Shipping</span>
                  <span>✓ 45-Min Remote Onboarding</span>
                  <span>✓ No Credit Card Required</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
