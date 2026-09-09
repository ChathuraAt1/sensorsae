import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Shield, Lock, CheckCircle2, AlertCircle, 
  HelpCircle, Sparkles, Cpu, CreditCard, ChevronRight,
  ExternalLink, Building2
} from 'lucide-react';
import { 
  FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, 
  FaCcJcb, FaCcDinersClub, FaCreditCard, FaLock, FaShieldHalved 
} from 'react-icons/fa6';
import { 
  detectCardType, formatCardNumber, formatExpiry, 
  validateExpiry, formatCVC, validateLuhn 
} from '../utils/cardValidator';
import { useAuth } from '../context/AuthContext';

export const Checkout = ({ selectedPlan, billingCycle = 'yearly', onBack, onOpenAuth }) => {
  const { user, token, register, login, isAuthenticated } = useAuth();

  // Plan state
  const [cycle, setCycle] = useState(billingCycle);
  const plan = selectedPlan || {
    id: 2,
    name: 'Professional',
    slug: 'professional',
    monthlyPrice: 149,
    yearlyPrice: 119,
    description: 'Complete predictive intelligence suite for automated production lines.',
  };

  // Pricing calculations
  const pricePerMonth = cycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
  const billedAmount = cycle === 'yearly' ? plan.yearlyPrice * 12 : plan.monthlyPrice;
  const annualSavings = (plan.monthlyPrice - plan.yearlyPrice) * 12;

  // Form State
  const [email, setEmail] = useState(user?.email || '');
  const [createAccountPassword, setCreateAccountPassword] = useState('');
  const [cardHolder, setCardHolder] = useState(
    user?.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : ''
  );
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [billingAddress, setBillingAddress] = useState({
    street: '100 Industrial Parkway, Suite 400',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
    country: 'US',
  });

  // UI & Flow states
  const [cardType, setCardType] = useState(detectCardType(''));
  const [isLuhnValid, setIsLuhnValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successResult, setSuccessResult] = useState(null);

  // Sync user email if auth changes
  useEffect(() => {
    if (user?.email && !email) {
      setEmail(user.email);
    }
    if (user?.first_name && !cardHolder) {
      setCardHolder(`${user.first_name} ${user.last_name || ''}`.trim());
    }
  }, [user]);

  // Card Number change handler with algorithm detection
  const handleCardNumberChange = (e) => {
    const rawVal = e.target.value;
    const formatted = formatCardNumber(rawVal);
    setCardNumber(formatted);

    const cleanNum = rawVal.replace(/\D/g, '');
    const detected = detectCardType(cleanNum);
    setCardType(detected);

    // Run Luhn check once enough digits exist
    if (cleanNum.length >= 13) {
      setIsLuhnValid(validateLuhn(cleanNum));
    } else {
      setIsLuhnValid(false);
    }
  };

  // Expiry change handler
  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    setCardExpiry(formatted);
  };

  // CVC change handler
  const handleCvcChange = (e) => {
    const formatted = formatCVC(e.target.value, cardType);
    setCardCvc(formatted);
  };

  // Render proper card icon from react-icons based on detected algorithm
  const renderCardIcon = () => {
    switch (cardType.type) {
      case 'visa':
        return <FaCcVisa className="w-8 h-8 text-blue-400" title="Visa" />;
      case 'mastercard':
        return <FaCcMastercard className="w-8 h-8 text-amber-500" title="Mastercard" />;
      case 'amex':
        return <FaCcAmex className="w-8 h-8 text-emerald-400" title="American Express" />;
      case 'discover':
        return <FaCcDiscover className="w-8 h-8 text-orange-400" title="Discover" />;
      case 'jcb':
        return <FaCcJcb className="w-8 h-8 text-cyan-400" title="JCB" />;
      case 'diners':
        return <FaCcDinersClub className="w-8 h-8 text-sky-400" title="Diners Club" />;
      default:
        return <FaCreditCard className="w-7 h-7 text-slate-500" title="Credit Card" />;
    }
  };

  // Submit payment to backend API
  const handleSubmitPayment = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Field Validations
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    const cleanCard = cardNumber.replace(/\D/g, '');
    if (cleanCard.length < 13 || cleanCard.length > 19) {
      setErrorMessage('Please enter a valid card number (13-19 digits).');
      return;
    }

    if (!validateLuhn(cleanCard)) {
      setErrorMessage('Card number failed the Luhn checksum algorithm. Please double-check your card details.');
      return;
    }

    if (!validateExpiry(cardExpiry)) {
      setErrorMessage('Please enter a valid future expiration date (MM / YY).');
      return;
    }

    const requiredCvcLen = cardType.cvcLength || 3;
    if (cardCvc.length < requiredCvcLen) {
      setErrorMessage(`Please enter a valid ${requiredCvcLen}-digit CVC code.`);
      return;
    }

    if (!cardHolder.trim()) {
      setErrorMessage('Please enter the cardholder name as it appears on the card.');
      return;
    }

    setIsProcessing(true);

    try {
      let activeToken = token;

      // If user is not logged in, perform seamless auto-registration or login
      if (!activeToken) {
        const passwordToUse = createAccountPassword || `SensorsaE@${cleanCard.slice(-4)}${new Date().getFullYear()}`;
        
        // Attempt registration
        const regRes = await register({
          username: email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') + Math.floor(Math.random() * 1000),
          email: email.trim(),
          password: passwordToUse,
          plan_slug: plan.slug,
          billing_cycle: cycle,
        });

        if (regRes.success && regRes.token) {
          activeToken = regRes.token;
        } else {
          // If email is already registered, attempt login with provided password
          if (createAccountPassword) {
            const loginRes = await login(email.trim(), createAccountPassword, plan.slug, cycle);
            if (loginRes.success && loginRes.token) {
              activeToken = loginRes.token;
            } else {
              throw new Error(loginRes.error || 'This email is already registered. Please log in first or check your password.');
            }
          } else {
            throw new Error(regRes.error || 'Please provide a password to establish your SENSORSAE operator account.');
          }
        }
      }

      // Format expiry for backend (2-character MM and 2-character YY)
      const expiryParts = cardExpiry.split('/').map(s => s.trim());
      const expiryMonth = expiryParts[0].padStart(2, '0');
      const expiryYear = expiryParts[1].slice(-2);

      // Construct API payload matching backend contract: POST /api/subscriptions
      const payload = {
        plan_slug: plan.slug,
        billing_cycle: cycle,
        payment_method: {
          card_number: cleanCard,
          expiry_month: expiryMonth,
          expiry_year: expiryYear,
          cvv: cardCvc,
          card_holder: cardHolder.trim(),
        },
        billing_address: {
          street: billingAddress.street,
          city: billingAddress.city,
          state: billingAddress.state,
          zip: billingAddress.zip,
          country: billingAddress.country,
        },
      };

      const res = await fetch('https://dash.sensorsae.net/api/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${activeToken}`,
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || 'Payment processing failed on industrial gateway.');
      }

      // Success
      setSuccessResult({
        transactionId: responseData.payment?.transaction_id || `TXN_${Date.now()}_OK`,
        planName: plan.name,
        amount: billedAmount,
        billingCycle: cycle,
        date: new Date().toLocaleDateString('en-US', { dateStyle: 'long' }),
        email: email,
      });

    } catch (err) {
      console.error('Checkout processing error:', err);
      setErrorMessage(err.message || 'Payment communication error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // If order was successfully completed
  if (successResult) {
    return (
      <div className="min-h-screen bg-[#06080d] py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-[#0b0f19] border border-blue-500/50 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-blue-500/10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-blue-400 uppercase tracking-widest font-bold">
              SUBSCRIPTION ACTIVATED
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Industrial Telemetry Unlocked
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Your {successResult.planName} subscription is now active on the SENSORSAE edge mesh.
            </p>
          </div>

          {/* Receipt Card */}
          <div className="bg-[#06080d] border border-blue-900/40 rounded-2xl p-5 text-left font-mono text-xs space-y-3">
            <div className="flex justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-500">Transaction ID</span>
              <span className="text-blue-400 font-bold select-all">{successResult.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Subscribed Plan</span>
              <span className="text-slate-200 font-bold">{successResult.planName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Billing Interval</span>
              <span className="text-slate-200 capitalize">{successResult.billingCycle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Amount Charged</span>
              <span className="text-emerald-400 font-bold">${successResult.amount}.00 USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Receipt Dispatched To</span>
              <span className="text-slate-200 truncate max-w-[200px]">{successResult.email}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-800">
              <span className="text-slate-500">Gateway Status</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Completed (Nominal)
              </span>
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <a
              href="https://dash.sensorsae.net"
              className="w-full py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-glow-md transition-all"
            >
              <span>Launch Live Industrial Dashboard</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onBack}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Return to Website Overview
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Breadcrumb & Navigation */}
        <div className="flex items-center justify-between pb-4 border-b border-blue-900/30">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-blue-400" />
            <span>Back to Plans</span>
          </button>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <FaShieldHalved className="w-3.5 h-3.5 text-blue-400" />
            <span>256-Bit TLS • PCI-DSS Level 1 Gateway</span>
          </div>
        </div>

        {/* Header Title */}
        <div>
          <span className="font-mono text-xs text-blue-400 uppercase tracking-widest font-bold">
            SECURE SUBSCRIPTION CHECKOUT
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Complete your order for <span className="text-blue-400">{plan.name}</span>
          </h1>
        </div>

        {/* Main 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Form Details (Spans 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <form onSubmit={handleSubmitPayment} className="space-y-6">
              
              {/* Step 1: Customer Contact / Email ID */}
              <div className="bg-[#0b0f19] border border-blue-900/40 rounded-3xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">1</span>
                    <span>Customer Account &amp; Dispatch</span>
                  </h3>

                  {isAuthenticated ? (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Logged in: {user?.username || user?.email}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={onOpenAuth}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                    >
                      Already have an account? Sign in
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Work Email ID <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="engineer@plant-domain.com"
                      className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono"
                    />
                    <p className="text-[11px] text-slate-500 mt-1">
                      License key, telemetry webhook credentials, and invoices will be delivered here.
                    </p>
                  </div>

                  {!isAuthenticated && (
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Set Password (To access your new dashboard)
                      </label>
                      <input
                        type="password"
                        value={createAccountPassword}
                        onChange={(e) => setCreateAccountPassword(e.target.value)}
                        placeholder="Create a secure password (min. 8 chars)"
                        className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Credit Card Input Fields with Real-Time Detection */}
              <div className="bg-[#0b0f19] border border-blue-900/40 rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">2</span>
                    <span>Payment Method &amp; Card Details</span>
                  </h3>
                  
                  {/* Real-time detected brand badge */}
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#06080d] border border-slate-800 text-xs">
                    <span className="text-[11px] font-mono text-slate-400">Detected:</span>
                    <div className="flex items-center gap-1.5">
                      {renderCardIcon()}
                      <span className="font-mono text-[11px] text-white font-bold">{cardType.name}</span>
                    </div>
                  </div>
                </div>

                {/* Card Inputs Grid */}
                <div className="space-y-4">
                  {/* Card Number */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono text-slate-300">
                        Card Number <span className="text-blue-400">*</span>
                      </label>
                      {cardNumber && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isLuhnValid 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        }`}>
                          {isLuhnValid ? '✓ Luhn Algorithm Valid' : 'Checking Checksum...'}
                        </span>
                      )}
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        required
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder={cardType.placeholder || '•••• •••• •••• ••••'}
                        className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 pr-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono tracking-wider"
                      />
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        {renderCardIcon()}
                      </div>
                    </div>
                  </div>

                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Cardholder Full Name <span className="text-blue-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      autoComplete="cc-name"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="e.g. MARCUS A. CHEN"
                      className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono uppercase"
                    />
                  </div>

                  {/* Expiry and CVC 2-col */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">
                        Expiry Date <span className="text-blue-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="cc-exp"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        placeholder="MM / YY"
                        maxLength={7}
                        className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-mono text-slate-300">
                          CVC / CVV <span className="text-blue-400">*</span>
                        </label>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {cardType.type === 'amex' ? '4 digits' : '3 digits'}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type="password"
                          required
                          autoComplete="cc-csc"
                          value={cardCvc}
                          onChange={handleCvcChange}
                          placeholder={cardType.type === 'amex' ? '••••' : '•••'}
                          maxLength={cardType.cvcLength || 3}
                          className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all font-mono"
                        />
                        <FaLock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Billing Address */}
              <div className="bg-[#0b0f19] border border-blue-900/40 rounded-3xl p-6 sm:p-7 space-y-4">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-mono">3</span>
                  <span>Facility &amp; Billing Address</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">Street Address</label>
                    <input
                      type="text"
                      value={billingAddress.street}
                      onChange={(e) => setBillingAddress({ ...billingAddress, street: e.target.value })}
                      placeholder="123 Plant Road, Unit B"
                      className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">City</label>
                      <input
                        type="text"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress({ ...billingAddress, city: e.target.value })}
                        className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">State / Prov</label>
                      <input
                        type="text"
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress({ ...billingAddress, state: e.target.value })}
                        className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1.5">Postal / ZIP</label>
                      <input
                        type="text"
                        value={billingAddress.zip}
                        onChange={(e) => setBillingAddress({ ...billingAddress, zip: e.target.value })}
                        className="w-full bg-[#06080d] border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Transaction Blocked:</span>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-glow-md hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    <span>Processing with Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize &amp; Pay ${billedAmount}.00 USD</span>
                  </>
                )}
              </button>

              <div className="text-center space-y-1">
                <p className="text-[11px] text-slate-500 font-mono">
                  30-day money-back guarantee • Cancel or modify plan anytime from operator settings.
                </p>
                <p className="text-[10px] text-slate-600 font-mono">
                  Sandbox gateway handles card tokenization. No plain card data is retained on customer browser.
                </p>
              </div>

            </form>
          </div>

          {/* Right Column: Virtual Card Preview & Order Summary (Spans 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Interactive Virtual Card Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400 font-bold uppercase tracking-wider">
                  Live Virtual Card Preview
                </span>
                <span className="text-[11px] font-mono text-blue-400">
                  {cardType.name}
                </span>
              </div>

              {/* 3D Glassmorphic Card Container */}
              <div className={`relative h-56 rounded-3xl p-6 text-white shadow-2xl overflow-hidden transition-all duration-500 border border-white/10 bg-gradient-to-br ${cardType.color}`}>
                
                {/* Background circuit / hologram grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-40"></div>
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  {/* Top row: Chip and Brand Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Gold EMV Chip */}
                      <div className="w-11 h-8 rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 border border-amber-200/40 p-1 flex items-center justify-between shadow-inner">
                        <div className="w-full h-full border border-amber-900/40 rounded-sm"></div>
                      </div>
                      {/* Contactless Signal Wave */}
                      <span className="font-mono text-xs text-white/70 tracking-widest">
                        ))))
                      </span>
                    </div>

                    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10">
                      {renderCardIcon()}
                    </div>
                  </div>

                  {/* Middle row: Formatted Number */}
                  <div className="space-y-1">
                    <div className="font-mono text-lg sm:text-xl font-bold tracking-[0.2em] text-white/95 drop-shadow-md">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>
                  </div>

                  {/* Bottom row: Cardholder and Expiry */}
                  <div className="flex items-end justify-between font-mono text-xs">
                    <div className="space-y-0.5">
                      <div className="text-[9px] uppercase tracking-widest text-white/60">Cardholder</div>
                      <div className="font-bold tracking-wider uppercase text-white drop-shadow truncate max-w-[190px]">
                        {cardHolder || 'OPERATOR NAME'}
                      </div>
                    </div>

                    <div className="space-y-0.5 text-right">
                      <div className="text-[9px] uppercase tracking-widest text-white/60">Expires</div>
                      <div className="font-bold tracking-wider text-white drop-shadow">
                        {cardExpiry || 'MM / YY'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Plan Summary */}
            <div className="bg-[#0b0f19] border border-blue-900/40 rounded-3xl p-6 sm:p-7 space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Selected Subscription
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 font-mono text-xs border border-blue-500/30">
                  {plan.name}
                </span>
              </div>

              {/* Billing Cycle Switcher */}
              <div className="flex items-center justify-between bg-[#06080d] p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setCycle('monthly')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
                    cycle === 'monthly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly (${plan.monthlyPrice}/mo)
                </button>
                <button
                  type="button"
                  onClick={() => setCycle('yearly')}
                  className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                    cycle === 'yearly' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Yearly (${plan.yearlyPrice}/mo)</span>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-mono">
                    Save 20%
                  </span>
                </button>
              </div>

              {/* Price Line Items */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Base Plan ({plan.name})</span>
                  <span className="text-slate-200">${pricePerMonth}.00 / month</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Billing Cycle</span>
                  <span className="text-slate-200 capitalize">{cycle}</span>
                </div>

                {cycle === 'yearly' && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Annual Commitment Discount</span>
                    <span>-${annualSavings}.00 / year</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-400">
                  <span>Hardware Node Telemetry Sync</span>
                  <span className="text-emerald-400">Included (Free)</span>
                </div>

                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax / VAT</span>
                  <span className="text-slate-200">$0.00 (B2B Exemption)</span>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white font-sans">Total Due Today</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">${billedAmount}.00</span>
                    <span className="text-[10px] text-slate-500 block">USD (Billed {cycle})</span>
                  </div>
                </div>
              </div>

              {/* Features recap */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 block">
                  Plan Entitlements:
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>Continuous FFT anomaly &amp; cavitation detection</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>Modbus / OPC-UA / MQTT industrial bridge</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                    <span>Air-gapped on-premises or cloud telemetry</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
