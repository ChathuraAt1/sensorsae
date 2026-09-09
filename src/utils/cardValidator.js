/**
 * Industrial Card Validation & Hashing Engine for SENSORSAE
 * Includes Luhn Checksum Algorithm, BIN Pattern Detection, and SHA-256 Hashing.
 */

// SHA-256 hashing to meet exact 64-character hex requirement of the backend API
export async function sha256Hex(plainText) {
  if (!plainText) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Luhn Algorithm (Mod 10 Checksum) to verify credit card numbers
export function validateLuhn(cardNumber) {
  const sanitized = (cardNumber || '').replace(/\D/g, '');
  if (!sanitized || sanitized.length < 13) return false;

  let sum = 0;
  let shouldDouble = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

// Card Brands metadata and IIN/BIN recognition regex
export const CARD_TYPES = {
  VISA: {
    name: 'Visa',
    type: 'visa',
    pattern: /^4/,
    lengths: [16, 19],
    cvcLength: 3,
    placeholder: '4000 1234 5678 9010',
    color: 'from-blue-600 to-indigo-800',
  },
  MASTERCARD: {
    name: 'Mastercard',
    type: 'mastercard',
    pattern: /^(5[1-5]|2[2-7])/,
    lengths: [16],
    cvcLength: 3,
    placeholder: '5412 7534 8912 3456',
    color: 'from-orange-600 via-red-600 to-amber-700',
  },
  AMEX: {
    name: 'American Express',
    type: 'amex',
    pattern: /^3[47]/,
    lengths: [15],
    cvcLength: 4,
    placeholder: '3782 822468 91006',
    color: 'from-emerald-700 to-teal-900',
  },
  DISCOVER: {
    name: 'Discover',
    type: 'discover',
    pattern: /^(6011|65|64[4-9]|622)/,
    lengths: [16],
    cvcLength: 3,
    placeholder: '6011 0009 9013 9424',
    color: 'from-amber-600 to-orange-800',
  },
  DINERS: {
    name: 'Diners Club',
    type: 'diners',
    pattern: /^3(0[0-5]|[68])/,
    lengths: [14],
    cvcLength: 3,
    placeholder: '3852 000000 0254',
    color: 'from-sky-700 to-blue-900',
  },
  JCB: {
    name: 'JCB',
    type: 'jcb',
    pattern: /^(2131|1800|35)/,
    lengths: [16],
    cvcLength: 3,
    placeholder: '3528 0000 0000 0000',
    color: 'from-cyan-700 to-blue-900',
  },
  UNIONPAY: {
    name: 'UnionPay',
    type: 'unionpay',
    pattern: /^62/,
    lengths: [16, 17, 18, 19],
    cvcLength: 3,
    placeholder: '6200 0000 0000 0000',
    color: 'from-red-800 to-rose-950',
  },
  UNKNOWN: {
    name: 'Credit Card',
    type: 'unknown',
    pattern: /.*/,
    lengths: [16],
    cvcLength: 3,
    placeholder: '•••• •••• •••• ••••',
    color: 'from-slate-800 via-slate-900 to-blue-950',
  },
};

// Real-time Card Brand Identification Algorithm
export function detectCardType(cardNumber) {
  const sanitized = (cardNumber || '').replace(/\D/g, '');
  if (!sanitized) return CARD_TYPES.UNKNOWN;

  for (const [key, card] of Object.entries(CARD_TYPES)) {
    if (key !== 'UNKNOWN' && card.pattern.test(sanitized)) {
      return card;
    }
  }

  return CARD_TYPES.UNKNOWN;
}

// Format card number with spaces (e.g. 4-4-4-4 or 4-6-5 for AMEX)
export function formatCardNumber(value) {
  const sanitized = (value || '').replace(/\D/g, '');
  const cardType = detectCardType(sanitized);

  if (cardType.type === 'amex') {
    // 4-6-5 format
    const part1 = sanitized.substring(0, 4);
    const part2 = sanitized.substring(4, 10);
    const part3 = sanitized.substring(10, 15);
    return [part1, part2, part3].filter(Boolean).join(' ');
  }

  // Standard 4-4-4-4 format
  const parts = [];
  for (let i = 0; i < sanitized.length && i < 19; i += 4) {
    parts.push(sanitized.substring(i, i + 4));
  }
  return parts.join(' ');
}

// Format Expiration Date (MM / YY)
export function formatExpiry(value) {
  const sanitized = (value || '').replace(/\D/g, '').slice(0, 4);
  if (sanitized.length >= 3) {
    return `${sanitized.slice(0, 2)} / ${sanitized.slice(2, 4)}`;
  }
  if (sanitized.length === 2 && !value.includes('/')) {
    return `${sanitized} / `;
  }
  return sanitized;
}

// Validate Expiration Date
export function validateExpiry(expiryStr) {
  const parts = expiryStr.split('/').map(p => p.trim());
  if (parts.length !== 2) return false;

  const month = parseInt(parts[0], 10);
  const year = parseInt(parts[1], 10);

  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) return false;

  const fullYear = 2000 + year;
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  if (fullYear < currentYear) return false;
  if (fullYear === currentYear && month < currentMonth) return false;
  if (fullYear > currentYear + 25) return false;

  return true;
}

// Format CVC
export function formatCVC(value, cardType) {
  const maxLen = cardType?.cvcLength || 3;
  return (value || '').replace(/\D/g, '').slice(0, maxLen);
}
