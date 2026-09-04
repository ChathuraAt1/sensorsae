import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCircle2, MapPin, Mail, Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAEnOVjqrpsm3StEA';

export const ConsultationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    equipmentType: 'Pumps, Motors & Compressors',
    machineCount: '5 Machines (Pilot Kit)',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const turnstileContainerRef = useRef(null);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    let intervalId = null;

    const renderWidget = () => {
      if (window.turnstile && turnstileContainerRef.current && widgetIdRef.current === null) {
        try {
          widgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            action: 'consultation',
            theme: 'dark',
            callback: (token) => {
              setTurnstileToken(token);
            },
            'expired-callback': () => {
              setTurnstileToken('');
            },
            'error-callback': () => {
              setTurnstileToken('');
            },
          });
        } catch (err) {
          console.warn('Turnstile render warning:', err);
        }
      }
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      intervalId = setInterval(() => {
        if (window.turnstile) {
          clearInterval(intervalId);
          renderWidget();
        }
      }, 200);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (_) {}
        widgetIdRef.current = null;
      }
    };
  }, [isSubmitted]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!turnstileToken) {
      alert('Please complete the verification check before submitting.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTurnstileToken('');
    }, 800);
  };

  return (
    <section id="consultation" className="py-24 bg-[#06080d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-400 font-semibold">
            GET IN TOUCH &amp; TRIAL HARDWARE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Claim Your 30-Day Trial Kit.
          </h2>
          <p className="text-slate-400 text-base">
            Test SENSORSAE on your 5 most critical machines with zero obligations.
          </p>
        </div>

        {/* 2-Column Wide Layout: Contact Details & Map (Left) + Booking Form (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Contact Details & Google Map Embed */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0b0f19] border border-blue-900/40 p-8 flex flex-col justify-between space-y-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase text-blue-400 font-semibold tracking-wider block mb-1">
                  GLOBAL HEADQUARTERS
                </span>
                <h3 className="text-2xl font-bold text-white">
                  SENSORSAE Technologies
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Industrial IoT &amp; Predictive Sensor Engineering Hub
                </p>
              </div>

              {/* Contact Information List */}
              <div className="space-y-4 text-sm font-sans text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Innovation Park</strong>
                    <span>4200 Industrial Parkway, Suite 300<br />San Jose, CA 95134</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 text-xs block">DIRECT INQUIRIES</span>
                    <a href="mailto:solutions@sensorsae.net" className="text-white hover:text-blue-400 font-mono transition-colors">
                      solutions@sensorsae.net
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 text-xs block">SUPPORT &amp; DISPATCH</span>
                    <span className="font-mono text-white">+1 (800) 492-7367</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 text-xs block">RESPONSE COMMITMENT</span>
                    <span className="text-slate-200">Engineer callback within 2 business hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="space-y-2 pt-4 border-t border-slate-800">
              <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                FACILITY LOCATION MAP:
              </span>
              <div className="rounded-2xl overflow-hidden border border-slate-800 h-52 w-full relative">
                <iframe
                  title="SENSORSAE Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101408.20455855734!2d-122.03099955355447!3d37.38747402809988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb596e9e188fd%3A0x3b0d8391510688f0!2sSan%20Jose%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Right Column: 30-Day Pilot Reservation Form */}
          <div className="lg:col-span-7 rounded-3xl bg-[#0b0f19] border border-blue-500/30 p-8 sm:p-12 flex flex-col justify-center shadow-glow-sm">
            {isSubmitted ? (
              <div className="py-10 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-blue-950 border border-blue-400 flex items-center justify-center mx-auto text-blue-400">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Trial Reservation Received!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. A SENSORSAE Deployment Engineer will review your setup for <strong className="text-white">{formData.company}</strong> and confirm shipment to <span className="font-mono text-blue-400">{formData.email}</span> within 2 hours.
                </p>
                <div className="p-4 rounded-xl bg-[#06080d] border border-slate-800 text-xs font-mono text-slate-300 max-w-sm mx-auto space-y-1 text-left">
                  <div>TARGET EQUIPMENT: <span className="text-blue-400">{formData.equipmentType}</span></div>
                  <div>SCOPE: <span className="text-blue-400">{formData.machineCount}</span></div>
                  <div>TERMS: <span className="text-blue-400">30-Day Risk-Free Trial</span></div>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-mono"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    Reserve Your Evaluation Unit
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Fill out your facility details to receive a complete 4-pod hardware pilot kit.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-[#06080d] text-white px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-400 focus:outline-none text-sm placeholder:text-slate-600 transition-all"
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
                      placeholder="e.g. alex@manufacturing-corp.com"
                      className="w-full bg-[#06080d] text-white px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-400 focus:outline-none text-sm placeholder:text-slate-600 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                      Plant / Company Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Precision Manufacturing Fab 2"
                      className="w-full bg-[#06080d] text-white px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-400 focus:outline-none text-sm placeholder:text-slate-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                      Primary Machinery
                    </label>
                    <select
                      value={formData.equipmentType}
                      onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                      className="w-full bg-[#06080d] text-white px-4 py-3 rounded-xl border border-slate-800 focus:border-blue-400 focus:outline-none text-sm font-mono transition-all"
                    >
                      <option value="Pumps, Motors & Compressors">Pumps, Motors &amp; Compressors</option>
                      <option value="CNC Spindles & Milling">CNC Spindles &amp; Milling</option>
                      <option value="Turbines & Generators">Turbines &amp; Generators</option>
                      <option value="Conveyors & Robotic Welders">Conveyors &amp; Robotic Welders</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                    Scope of Pilot
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['5 Machines (Pilot)', '15 Machines (Cell)', '50+ Machines (Plant)'].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, machineCount: opt })}
                        className={`p-3 rounded-xl text-xs font-mono border transition-all text-center ${
                          formData.machineCount === opt
                            ? 'bg-blue-600 text-white border-blue-400 shadow-glow-sm'
                            : 'bg-[#06080d] text-slate-400 border-slate-800 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cloudflare Turnstile Verification */}
                <div className="pt-2 flex flex-col items-center justify-center space-y-2">
                  <div 
                    ref={turnstileContainerRef} 
                    className="min-h-[65px] flex items-center justify-center"
                    data-action="consultation"
                  ></div>
                  <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !turnstileToken}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    !turnstileToken
                      ? 'bg-slate-800/80 text-slate-400 border border-slate-700 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-500 text-white shadow-glow-sm hover:shadow-glow-md'
                  }`}
                >
                  {isSubmitting ? (
                    <span>Processing Reservation...</span>
                  ) : !turnstileToken ? (
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-400" />
                      <span>Complete Verification Above to Reserve</span>
                    </span>
                  ) : (
                    <>
                      <span>Ship 30-Day Risk-Free Trial Kit</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-6 text-xs font-mono text-slate-500 pt-1">
                  <span>✓ 100% Free Shipping</span>
                  <span>✓ Remote Onboarding</span>
                  <span>✓ No Credit Card Needed</span>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
