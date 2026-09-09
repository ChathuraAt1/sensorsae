import React, { useState } from 'react';
import { X, Lock, Mail, User, ArrowRight, AlertCircle, CheckCircle2, Shield, Cpu } from 'lucide-react';
import { FaGoogle, FaGithub } from 'react-icons/fa6';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login', planSlug = null, billingCycle = null, onSuccess }) => {
  const { login, register, forgotPassword, initiateSocialLogin } = useAuth();

  const [mode, setMode] = useState(initialMode); // 'login' | 'register' | 'forgot'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    lastName: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    const res = await login(formData.email, formData.password, planSlug, billingCycle);
    setIsLoading(false);

    if (res.success) {
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || 'Invalid credentials. Please verify your email and password.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify.');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    const res = await register({
      username: formData.username || formData.email.split('@')[0],
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      password: formData.password,
      plan_slug: planSlug,
      billing_cycle: billingCycle,
    });

    setIsLoading(false);

    if (res.success) {
      if (onSuccess) onSuccess(res.user);
      onClose();
    } else {
      setErrorMessage(res.error || 'Registration could not be completed.');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const res = await forgotPassword(formData.email);
    setIsLoading(false);

    if (res.success) {
      setSuccessMessage(res.message || 'Password reset link dispatched. Please check your inbox.');
    } else {
      setErrorMessage(res.error || 'Could not dispatch password reset link.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="w-full max-w-md bg-[#0b0f19] border border-blue-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-blue-500/10 relative overflow-hidden text-slate-100"
      >
        {/* Subtle top ambient glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-32 bg-blue-600/20 blur-3xl pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/40 text-blue-400 mb-1 shadow-glow-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === 'login' && 'Operator Login'}
            {mode === 'register' && 'Create Operator Account'}
            {mode === 'forgot' && 'Reset Access Password'}
          </h2>
          <p className="text-xs text-slate-400 font-sans">
            {mode === 'login' && 'Access industrial predictive telemetry & sensor diagnostics'}
            {mode === 'register' && 'Deploy on-premise AI models & edge sensor streams'}
            {mode === 'forgot' && 'Enter your verified work email to receive reset instructions'}
          </p>
        </div>

        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 1. LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@plant-domain.com"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => { setMode('forgot'); setErrorMessage(''); }}
                  className="text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
              ) : (
                <>
                  <span>Authenticate Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 2. REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Marcus"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Chen"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">Username</label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="m_chen_ops"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 pl-9 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                />
                <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-slate-300 mb-1">Work Email</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="marcus@facility.com"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 pl-9 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                />
                <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 8 chars"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
              ) : (
                <>
                  <span>Create SENSORSAE Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        )}

        {/* 3. FORGOT PASSWORD FORM */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Registered Work Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@plant-domain.com"
                  className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs shadow-glow-sm hover:shadow-glow-md transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
              ) : (
                <span>Dispatch Reset Instructions</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMessage(''); }}
              className="w-full text-center text-xs text-slate-400 hover:text-white pt-2"
            >
              ← Return to Login
            </button>
          </form>
        )}

        {/* Social Authentication Dividers & Buttons */}
        {mode !== 'forgot' && (
          <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-3">
            <div className="relative flex items-center justify-center">
              <span className="bg-[#0b0f19] px-2 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                Or Continue With
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => initiateSocialLogin('google', planSlug, billingCycle)}
                className="py-2.5 px-3 rounded-xl bg-[#06080d] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-2 group"
              >
                <FaGoogle className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
                <span>Google</span>
              </button>

              <button
                type="button"
                onClick={() => initiateSocialLogin('github', planSlug, billingCycle)}
                className="py-2.5 px-3 rounded-xl bg-[#06080d] hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-2 group"
              >
                <FaGithub className="w-3.5 h-3.5 text-slate-200 group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </button>
            </div>
          </div>
        )}

        {/* Mode Switch Footer */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {mode === 'login' ? (
            <p>
              New to SENSORSAE?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setErrorMessage(''); }}
                className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
              >
                Create an account
              </button>
            </p>
          ) : mode === 'register' ? (
            <p>
              Already registered?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setErrorMessage(''); }}
                className="text-blue-400 hover:text-blue-300 font-bold transition-colors"
              >
                Sign in here
              </button>
            </p>
          ) : null}
        </div>

      </div>
    </div>
  );
};
