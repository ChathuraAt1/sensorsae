import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const OAuthCallback = ({ onComplete }) => {
  const { handleOAuthCallback } = useAuth();
  const [status, setStatus] = useState('processing'); // 'processing' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const planSlug = params.get('plan_slug') || params.get('plan');
        const billingCycle = params.get('interval') || params.get('plan_interval') || params.get('billing_cycle');

        if (!token) {
          throw new Error('No authentication token received from OAuth provider.');
        }

        // Store token and update user profile
        await handleOAuthCallback(token);
        setStatus('success');

        // Allow user to see confirmation before transitioning
        setTimeout(() => {
          if (onComplete) {
            onComplete({ planSlug, billingCycle });
          }
        }, 1200);

      } catch (err) {
        console.error('OAuth Callback error:', err);
        setStatus('error');
        setErrorMessage(err.message || 'Failed to complete OAuth authentication.');
      }
    };

    processCallback();
  }, [handleOAuthCallback, onComplete]);

  return (
    <div className="min-h-screen bg-[#06080d] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0b0f19] border border-blue-900/50 rounded-3xl p-8 text-center space-y-5 shadow-2xl shadow-blue-500/10">
        {status === 'processing' && (
          <div className="space-y-4">
            <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto" />
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Completing Secure Authentication</h3>
              <p className="text-xs text-slate-400 font-mono">Synchronizing industrial credentials with dash.sensorsae.net...</p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Session Authenticated</h3>
              <p className="text-xs text-slate-400 font-mono">Redirecting to your industrial workspace...</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Authentication Halted</h3>
              <p className="text-xs text-red-400 font-mono">{errorMessage}</p>
            </div>
            <button
              onClick={() => { window.location.href = '/'; }}
              className="mt-4 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
            >
              Return to Homepage
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
