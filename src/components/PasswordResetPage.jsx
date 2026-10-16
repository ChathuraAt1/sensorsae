import React, { useState } from 'react';
import { AlertCircle, ArrowLeft, CheckCircle2, Lock, Mail, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

const getResetLinkDetails = () => {
  const params = new URLSearchParams(window.location.search);
  const pathToken = window.location.pathname.match(/\/(?:reset-password|password\/reset)\/([^/]+)/)?.[1] || '';
  let decodedPathToken = pathToken;
  try { decodedPathToken = decodeURIComponent(pathToken); } catch {}
  return { email: params.get('email') || '', token: params.get('token') || decodedPathToken };
};

export const PasswordResetPage = ({ onBackToHome, onOpenLogin }) => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState(() => getResetLinkDetails().email);
  const [token, setToken] = useState(() => getResetLinkDetails().token);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password.length < 8) {
      setErrorMessage('Choose a password with at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('The passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    const result = await resetPassword({ email, token, password });
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage(result.message);
      setPassword('');
      setConfirmPassword('');
    } else {
      setErrorMessage(result.error || 'Could not reset your password. Request a new reset link and try again.');
    }
  };

  return (
    <section className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-blue-900/50 bg-[#0b0f19] p-6 sm:p-8 shadow-2xl shadow-blue-950/30">
        <button onClick={onBackToHome} className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
          <ArrowLeft className="h-4 w-4 text-blue-400" /> Back to home
        </button>
        <div className="mb-6 flex justify-center"><Logo size="lg" /></div>
        <h1 className="text-center text-2xl font-bold text-white">Set a new password</h1>
        <p className="mt-2 text-center text-sm text-slate-400">Use the email address and reset token from your password reset email.</p>

        {errorMessage && (
          <div role="alert" className="mt-5 flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-950/50 p-3 text-xs text-red-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />{errorMessage}
          </div>
        )}
        {successMessage && (
          <div role="status" className="mt-5 flex items-start gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/50 p-3 text-xs text-emerald-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />{successMessage}
          </div>
        )}

        {!successMessage ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <label className="block text-xs font-mono text-slate-300">
              Email address
              <span className="relative mt-1.5 block">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="w-full rounded-xl border border-slate-800 bg-[#06080d] py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none" />
              </span>
            </label>
            <label className="block text-xs font-mono text-slate-300">
              Reset token
              <span className="relative mt-1.5 block">
                <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input required value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste the token from your email" className="w-full rounded-xl border border-slate-800 bg-[#06080d] py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none" />
              </span>
            </label>
            <label className="block text-xs font-mono text-slate-300">
              New password
              <span className="relative mt-1.5 block">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input required minLength={8} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" className="w-full rounded-xl border border-slate-800 bg-[#06080d] py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none" />
              </span>
            </label>
            <label className="block text-xs font-mono text-slate-300">
              Confirm new password
              <span className="relative mt-1.5 block">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                <input required minLength={8} type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your new password" className="w-full rounded-xl border border-slate-800 bg-[#06080d] py-3 pl-10 pr-3 text-sm text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none" />
              </span>
            </label>
            <button disabled={isSubmitting} className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500 disabled:opacity-50">
              {isSubmitting ? 'Updating password…' : 'Update password'}
            </button>
          </form>
        ) : (
          <button onClick={onOpenLogin} className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-500">Return to sign in</button>
        )}
      </div>
    </section>
  );
};
