import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Shield,
  Zap,
  Tag,
  Check,
  CreditCard,
  ChevronDown,
  ChevronUp,
  X,
  Lock,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CheckoutPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

const VALID_PROMO_CODES: Record<string, number> = {
  VEXA10: 10,
  GAMING20: 20,
  WELCOME15: 15,
};

// Mock Stripe-like card form
export default function CheckoutPage({ onBack, onSuccess }: CheckoutPageProps) {
  const { state, subtotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const discount = promoApplied ? VALID_PROMO_CODES[promoApplied] : 0;
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (VALID_PROMO_CODES[code]) {
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try VEXA10, GAMING20, or WELCOME15.');
      setPromoApplied(null);
    }
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) return digits.slice(0, 2) + ' / ' + digits.slice(2);
    return digits;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email required';
    if (!cardName.trim()) newErrors.cardName = 'Cardholder name required';
    const rawCard = cardNumber.replace(/\s/g, '');
    if (rawCard.length < 16) newErrors.cardNumber = 'Valid 16-digit card number required';
    const rawExpiry = cardExpiry.replace(/\s\/\s/, '');
    if (rawExpiry.length < 4) newErrors.cardExpiry = 'Valid expiry required (MM/YY)';
    if (cardCvc.length < 3) newErrors.cardCvc = 'Valid CVC required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 2200));
    setLoading(false);
    clearCart();
    onSuccess();
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-white text-xl font-bold">Your cart is empty</h2>
          <button
            onClick={onBack}
            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
          >
            ← Go back to shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.button
          onClick={onBack}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-medium mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Store
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-white font-bold text-2xl flex items-center gap-2">
            <Lock size={20} className="text-blue-400" />
            Secure Checkout
          </h1>
          <p className="text-zinc-500 text-sm mt-1">
            Your payment is encrypted and secured by Stripe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Contact */}
              <div className="bg-[#18181c] border border-white/6 rounded-2xl p-5">
                <h2 className="text-white font-semibold text-sm mb-4">Contact Information</h2>
                <div>
                  <label className="block text-zinc-400 text-xs font-medium mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full bg-[#0f0f11] border rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors ${
                      errors.email
                        ? 'border-red-500/50 focus:border-red-500'
                        : 'border-white/8 focus:border-blue-500/50'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                  <p className="text-zinc-600 text-xs mt-1.5">
                    Your purchase confirmation and delivery will be sent here.
                  </p>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-[#18181c] border border-white/6 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-white font-semibold text-sm flex items-center gap-2">
                    <CreditCard size={16} className="text-blue-400" />
                    Payment Details
                  </h2>
                  <div className="flex items-center gap-1.5">
                    {['visa', 'mc', 'amex', 'paypal'].map((card) => (
                      <div
                        key={card}
                        className="bg-white/8 rounded px-2 py-0.5 text-[10px] font-bold text-zinc-400 uppercase"
                      >
                        {card === 'mc' ? 'MC' : card === 'amex' ? 'Amex' : card.charAt(0).toUpperCase() + card.slice(1)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Cardholder Name */}
                  <div>
                    <label className="block text-zinc-400 text-xs font-medium mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className={`w-full bg-[#0f0f11] border rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors ${
                        errors.cardName
                          ? 'border-red-500/50'
                          : 'border-white/8 focus:border-blue-500/50'
                      }`}
                    />
                    {errors.cardName && (
                      <p className="text-red-400 text-xs mt-1">{errors.cardName}</p>
                    )}
                  </div>

                  {/* Card Number */}
                  <div>
                    <label className="block text-zinc-400 text-xs font-medium mb-1.5">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        className={`w-full bg-[#0f0f11] border rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors pr-12 font-mono tracking-wider ${
                          errors.cardNumber
                            ? 'border-red-500/50'
                            : 'border-white/8 focus:border-blue-500/50'
                        }`}
                      />
                      <CreditCard
                        size={16}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                      />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-red-400 text-xs mt-1">{errors.cardNumber}</p>
                    )}
                  </div>

                  {/* Expiry + CVC */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 text-xs font-medium mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        className={`w-full bg-[#0f0f11] border rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors font-mono ${
                          errors.cardExpiry
                            ? 'border-red-500/50'
                            : 'border-white/8 focus:border-blue-500/50'
                        }`}
                      />
                      {errors.cardExpiry && (
                        <p className="text-red-400 text-xs mt-1">{errors.cardExpiry}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-xs font-medium mb-1.5">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className={`w-full bg-[#0f0f11] border rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none transition-colors font-mono ${
                          errors.cardCvc
                            ? 'border-red-500/50'
                            : 'border-white/8 focus:border-blue-500/50'
                        }`}
                      />
                      {errors.cardCvc && (
                        <p className="text-red-400 text-xs mt-1">{errors.cardCvc}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stripe badge */}
                <div className="mt-4 flex items-center gap-2 text-zinc-600 text-xs">
                  <Lock size={11} />
                  Payments are encrypted and processed securely via Stripe. We never store card details.
                </div>
              </div>

              {/* Promo Code */}
              <div className="bg-[#18181c] border border-white/6 rounded-2xl p-5">
                <h2 className="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <Tag size={15} className="text-violet-400" />
                  Promo Code
                </h2>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Enter code (e.g. VEXA10)"
                      value={promoCode}
                      onChange={(e) => { setPromoCode(e.target.value.toUpperCase()); setPromoError(''); }}
                      className="w-full bg-[#0f0f11] border border-white/8 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 transition-colors uppercase tracking-wider"
                    />
                    {promoApplied && (
                      <button
                        type="button"
                        onClick={() => { setPromoApplied(null); setPromoCode(''); }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={applyPromo}
                    disabled={!!promoApplied}
                    className="bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-700 text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors whitespace-nowrap"
                  >
                    {promoApplied ? <Check size={16} /> : 'Apply'}
                  </button>
                </div>
                {promoError && <p className="text-red-400 text-xs mt-2">{promoError}</p>}
                {promoApplied && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-xs mt-2 flex items-center gap-1"
                  >
                    <Check size={11} />
                    Code <strong>{promoApplied}</strong> applied — {discount}% off!
                  </motion.p>
                )}
                <p className="text-zinc-600 text-xs mt-2">
                  Test codes: VEXA10, GAMING20, WELCOME15
                </p>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/60 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 text-base"
                whileHover={{ scale: loading ? 1 : 1.01 }}
                whileTap={{ scale: loading ? 1 : 0.99 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock size={18} />
                    Pay ${total.toFixed(2)} — Instant Delivery
                    <Zap size={16} className="fill-white" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Right: Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#18181c] border border-white/6 rounded-2xl overflow-hidden sticky top-24">
              {/* Mobile collapse toggle */}
              <button
                className="lg:hidden w-full flex items-center justify-between px-5 py-4 border-b border-white/6"
                onClick={() => setShowOrderSummary(!showOrderSummary)}
              >
                <span className="text-white font-semibold text-sm">Order Summary</span>
                {showOrderSummary ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
              </button>

              <div className={`${showOrderSummary ? 'block' : 'hidden lg:block'}`}>
                <div className="p-5 border-b border-white/6">
                  <h2 className="text-white font-semibold text-sm hidden lg:block mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-12 h-12 rounded-lg object-cover bg-[#111]"
                          />
                          <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white text-[9px] font-bold w-4.5 h-4.5 w-[18px] h-[18px] rounded-full flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-200 text-xs font-medium leading-snug line-clamp-2">
                            {item.product.title}
                          </p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Zap size={9} className="text-emerald-400" />
                            <span className="text-emerald-400 text-[10px]">
                              {item.product.deliveryTime}
                            </span>
                          </div>
                        </div>
                        <span className="text-zinc-200 text-xs font-semibold flex-shrink-0">
                          ${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-zinc-200">${subtotal.toFixed(2)}</span>
                  </div>
                  {promoApplied && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-emerald-400 flex items-center gap-1">
                        <Tag size={11} />
                        Promo ({discount}% off)
                      </span>
                      <span className="text-emerald-400">-${discountAmount.toFixed(2)}</span>
                    </motion.div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Delivery</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Zap size={11} />
                      Free / Instant
                    </span>
                  </div>
                  <div className="border-t border-white/6 pt-3 flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-white font-black text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Trust */}
                <div className="px-5 pb-5 space-y-2">
                  {[
                    { icon: Shield, text: 'Secure SSL Checkout' },
                    { icon: Zap, text: 'Instant Delivery After Payment' },
                    { icon: Check, text: 'Money-Back Guarantee' },
                  ].map((t) => (
                    <div key={t.text} className="flex items-center gap-2 text-zinc-500 text-xs">
                      <t.icon size={12} className="text-emerald-400 flex-shrink-0" />
                      {t.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
