import { motion } from 'framer-motion';
import { CheckCircle, Zap, Download, ArrowRight, Copy } from 'lucide-react';
import { useState } from 'react';

interface ConfirmationPageProps {
  onContinue: () => void;
}

function generateOrderId() {
  return 'VX-' + Math.random().toString(36).toUpperCase().slice(2, 10);
}

const orderId = generateOrderId();

export default function ConfirmationPage({ onContinue }: ConfirmationPageProps) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] flex items-center justify-center px-4 pt-24 pb-20">
      <div className="max-w-lg w-full">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <CheckCircle size={48} className="text-emerald-400" />
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -top-1 -right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center"
            >
              <Zap size={16} className="text-white fill-white" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-white font-black text-3xl mb-2">Order Confirmed! 🎉</h1>
          <p className="text-zinc-400 text-base leading-relaxed">
            Your payment was successful. Your digital items have been delivered to your email inbox.
          </p>
        </motion.div>

        {/* Order Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#18181c] border border-white/6 rounded-2xl p-6 mb-6 space-y-4"
        >
          {/* Order ID */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 text-sm">Order ID</span>
            <button
              onClick={copy}
              className="flex items-center gap-2 text-blue-400 font-mono text-sm font-semibold hover:text-blue-300 transition-colors"
            >
              {orderId}
              {copied ? (
                <CheckCircle size={13} className="text-emerald-400" />
              ) : (
                <Copy size={13} />
              )}
            </button>
          </div>

          <div className="border-t border-white/6" />

          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 text-sm">Status</span>
            <span className="flex items-center gap-1.5 text-emerald-400 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Delivered
            </span>
          </div>

          {/* Delivery */}
          <div className="flex items-center justify-between">
            <span className="text-zinc-500 text-sm">Delivery Method</span>
            <span className="flex items-center gap-1.5 text-zinc-300 text-sm font-medium">
              <Zap size={13} className="text-emerald-400" />
              Instant — Sent to Email
            </span>
          </div>

          <div className="border-t border-white/6" />

          {/* Next Steps */}
          <div>
            <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
              What's next?
            </p>
            <div className="space-y-2.5">
              {[
                { step: '1', text: 'Check your email inbox for your purchase receipt' },
                { step: '2', text: 'Follow the redemption instructions in the email' },
                { step: '3', text: 'Contact support if you have any issues' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {s.step}
                  </div>
                  <p className="text-zinc-400 text-sm leading-snug">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <button className="flex-1 flex items-center justify-center gap-2 bg-white/6 hover:bg-white/10 border border-white/8 text-white font-semibold py-3.5 rounded-xl transition-all text-sm">
            <Download size={16} />
            Download Receipt
          </button>
          <motion.button
            onClick={onContinue}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20 text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Continue Shopping
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>

        {/* Support */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-zinc-600 text-xs mt-6"
        >
          Need help? Email{' '}
          <a href="mailto:support@vexa.store" className="text-blue-400 hover:text-blue-300 transition-colors">
            support@vexa.store
          </a>{' '}
          — we respond within 1 hour.
        </motion.p>
      </div>
    </div>
  );
}
