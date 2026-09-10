import React, { createContext, useContext, useState, useEffect } from 'react';
import { sha256Hex } from '../utils/cardValidator';

const API_BASE = 'https://dash.sensorsae.net';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('sensorsae_token') || null);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('sensorsae_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Validate or fetch current user on mount if token exists
  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const res = await fetch(`${API_BASE}/api/user`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          });
          if (res.ok) {
            const data = await res.json();
            if (data.data) {
              setUser(data.data);
              localStorage.setItem('sensorsae_user', JSON.stringify(data.data));
            }
          } else if (res.status === 401) {
            // Token expired or invalid
            logoutLocal();
          }
        } catch (err) {
          console.warn('Could not refresh user session:', err.message);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const refreshUser = async () => {
    const activeToken = token || localStorage.getItem('sensorsae_token');
    if (!activeToken) return null;
    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        headers: {
          'Authorization': `Bearer ${activeToken}`,
          'Accept': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setUser(data.data);
          localStorage.setItem('sensorsae_user', JSON.stringify(data.data));
          return data.data;
        }
      }
    } catch (err) {
      console.warn('Could not refresh user:', err.message);
    }
    return null;
  };

  const logoutLocal = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sensorsae_token');
    localStorage.removeItem('sensorsae_user');
  };

  // Login via API with SHA-256 hashed password
  const login = async (email, password, planSlug = null, billingCycle = null) => {
    try {
      const passwordHash = await sha256Hex(password);
      const payload = {
        email,
        password_hash: passwordHash,
      };
      if (planSlug) payload.plan_slug = planSlug;
      if (billingCycle) payload.billing_cycle = billingCycle;

      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.message || 'Invalid credentials',
          errors: data.errors,
        };
      }

      const receivedToken = data.data?.token;
      const receivedUser = data.data?.user;

      if (receivedToken) {
        setToken(receivedToken);
        localStorage.setItem('sensorsae_token', receivedToken);
      }
      if (receivedUser) {
        setUser(receivedUser);
        localStorage.setItem('sensorsae_user', JSON.stringify(receivedUser));
      }

      return {
        success: true,
        user: receivedUser,
        token: receivedToken,
        plan: data.data?.plan,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Network error during login',
      };
    }
  };

  // Register via API with SHA-256 hashed password & confirmation
  const register = async ({
    username,
    first_name,
    last_name,
    email,
    password,
    plan_slug = null,
    billing_cycle = null,
    turnstile_token = null,
  }) => {
    try {
      const passwordHash = await sha256Hex(password);
      const payload = {
        username: username || email.split('@')[0],
        first_name: first_name || '',
        last_name: last_name || '',
        email,
        password_hash: passwordHash,
        password_hash_confirmation: passwordHash,
      };

      if (plan_slug) payload.plan_slug = plan_slug;
      if (billing_cycle) payload.billing_cycle = billing_cycle;
      if (turnstile_token) payload.turnstile_token = turnstile_token;

      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          error: data.message || 'Registration failed',
          errors: data.errors,
        };
      }

      const receivedToken = data.data?.token;
      const receivedUser = data.data?.user;

      if (receivedToken) {
        setToken(receivedToken);
        localStorage.setItem('sensorsae_token', receivedToken);
      }
      if (receivedUser) {
        setUser(receivedUser);
        localStorage.setItem('sensorsae_user', JSON.stringify(receivedUser));
      }

      return {
        success: true,
        user: receivedUser,
        token: receivedToken,
        message: data.message,
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Network error during registration',
      };
    }
  };

  // Request password reset link
  const forgotPassword = async (email, turnstileToken = null) => {
    try {
      const payload = { email };
      if (turnstileToken) payload.turnstile_token = turnstileToken;

      const res = await fetch(`${API_BASE}/api/auth/password/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return {
        success: res.ok,
        message: data.message || 'Password reset link sent if account exists',
      };
    } catch (err) {
      return {
        success: false,
        error: err.message || 'Could not send reset request',
      };
    }
  };

  // Logout from server & local state
  const logout = async () => {
    if (token) {
      try {
        await fetch(`${API_BASE}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });
      } catch (err) {
        console.warn('Error notifying server of logout:', err);
      }
    }
    logoutLocal();
  };

  // Trigger Google or GitHub Social OAuth redirect
  const initiateSocialLogin = (provider, planSlug = null, billingCycle = null) => {
    const params = new URLSearchParams();
    if (planSlug) params.append('plan_slug', planSlug);
    if (billingCycle) params.append('billing_cycle', billingCycle);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    window.location.href = `${API_BASE}/api/auth/${provider}/redirect${queryString}`;
  };

  // Handle OAuth callback token received from /auth/complete
  const handleOAuthCallback = async (newToken) => {
    if (!newToken) return;
    setToken(newToken);
    localStorage.setItem('sensorsae_token', newToken);

    try {
      const res = await fetch(`${API_BASE}/api/user`, {
        headers: {
          'Authorization': `Bearer ${newToken}`,
          'Accept': 'application/json',
        },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.data) {
          setUser(data.data);
          localStorage.setItem('sensorsae_user', JSON.stringify(data.data));
        }
      }
    } catch (err) {
      console.error('Error fetching user after OAuth:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: Boolean(token),
        login,
        register,
        logout,
        forgotPassword,
        initiateSocialLogin,
        handleOAuthCallback,
        refreshUser,
        apiBase: API_BASE,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
