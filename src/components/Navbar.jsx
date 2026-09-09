import React, { useState, useEffect } from 'react';
import { Cpu, Menu, X, ArrowRight, Package, User, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'features', label: 'Features' },
  { id: 'about-company', label: 'About Us' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'consultation', label: 'Contact' },
];

export const Navbar = ({ currentView, setCurrentView, onRequestDemo, onOpenAuth }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Track scroll state and active section in viewport
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentView !== 'home') {
        setActiveSection('');
        return;
      }

      // If at the very top (Hero section), no section pill is highlighted
      if (window.scrollY < 260) {
        setActiveSection('');
        return;
      }

      // Near page bottom, highlight contact
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollPosition < 120) {
        setActiveSection('consultation');
        return;
      }

      // Calculate which section currently sits beneath the top navigation offset
      const headerOffset = 160;
      let currentActive = '';

      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= headerOffset && rect.bottom > headerOffset) {
            currentActive = item.id;
            break;
          }
        }
      }

      // Fallback: closest section above header
      if (!currentActive) {
        for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
          const el = document.getElementById(NAV_ITEMS[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= headerOffset) {
              currentActive = NAV_ITEMS[i].id;
              break;
            }
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    setActiveSection(sectionId);
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#06080d]/90 backdrop-blur-xl border-b border-blue-900/40 shadow-glow-sm py-3.5' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => { 
            setCurrentView('home'); 
            setActiveSection('');
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-950/70 border border-blue-500/40 group-hover:border-blue-400 group-hover:shadow-glow-md transition-all duration-300">
            <Cpu className="w-5 h-5 text-blue-400 transition-transform group-hover:scale-110" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg sm:text-xl tracking-wider text-white flex items-center gap-1">
              SENSOR<span className="text-blue-500 font-black">SAE</span>
            </span>
            <span className="font-mono text-[9px] tracking-widest text-slate-400 uppercase -mt-1 flex items-center gap-1">
              <span>PREDICTIVE IOT</span>
              <span className="text-blue-500">•</span>
              <span className="text-blue-400">SENSOR INTELLIGENCE</span>
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links with Active Scroll Highlighting */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0b0f19]/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-blue-900/50 shadow-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = currentView === 'home' && activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 relative ${
                  isActive
                    ? 'text-white bg-blue-600 shadow-glow-sm font-bold scale-105 border border-blue-400/40'
                    : 'text-slate-300 hover:text-white hover:bg-blue-950/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* MAIN HEADER CTA & Auth Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-2 bg-[#0b0f19] border border-blue-900/60 rounded-full px-3 py-1 text-xs">
              <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-400 flex items-center justify-center text-blue-300">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono text-slate-200 text-xs font-semibold max-w-[110px] truncate">
                {user?.username || user?.email?.split('@')[0] || 'Operator'}
              </span>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-1 rounded-full text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors ml-1"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth && onOpenAuth('login')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0b0f19] hover:bg-blue-950/60 border border-blue-800/40 hover:border-blue-500/50 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-300"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-400" />
              <span>Sign In</span>
            </button>
          )}

          {currentView === 'home' ? (
            <button
              onClick={() => {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-glow-sm hover:shadow-glow-md transition-all duration-300 group"
            >
              <Package className="w-4 h-4" />
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-white text-xs font-bold border border-blue-500/30 hover:border-blue-400 shadow-glow-sm transition-all duration-300"
            >
              <span>← Back to Overview</span>
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => {
              if (currentView === 'home') {
                setCurrentView('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                setCurrentView('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="px-3.5 py-1.5 text-xs font-bold rounded-full bg-blue-600 text-white"
          >
            {currentView === 'home' ? 'Products' : 'Home'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white bg-blue-950/40 border border-blue-900/50 rounded-xl"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Active Highlighting */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#06080d]/98 border-b border-blue-900/60 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 font-medium text-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = currentView === 'home' && activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 px-3 rounded-xl transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-blue-950/80 border border-blue-500/40 text-blue-400 font-bold'
                      : 'text-slate-200 hover:text-blue-400'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 shadow-glow-sm"></span>
                  )}
                </button>
              );
            })}
            
            {/* Mobile Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-950/40 border border-blue-900/60 text-xs">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-mono">{user?.username || user?.email}</span>
                </div>
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAuth) onOpenAuth('login');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0b0f19] border border-blue-800/50 text-blue-400 font-bold text-xs flex items-center justify-center gap-2"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Operator Sign In</span>
              </button>
            )}

            {/* Primary Mobile CTA */}
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView === 'home') {
                  setCurrentView('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }} 
              className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-center text-sm shadow-glow-sm flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>{currentView === 'home' ? 'Explore Product Line' : 'Return to Overview'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
