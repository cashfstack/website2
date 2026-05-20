import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { state, closeCart, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <AnimatePresence>
      {state.isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#13131a] border-l border-white/6 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/6">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-blue-400" />
                <h2 className="text-white font-semibold text-base">
                  Your Cart
                  {totalItems > 0 && (
                    <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                      {totalItems}
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={closeCart}
                className="text-zinc-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence>
                {state.items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-full gap-4 py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                      <ShoppingBag size={28} className="text-zinc-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-zinc-400 font-medium">Your cart is empty</p>
                      <p className="text-zinc-600 text-sm mt-1">Add some items to get started</p>
                    </div>
                  </motion.div>
                ) : (
                  state.items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-white/4 border border-white/6 rounded-xl p-3 flex gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0 bg-[#1e1e24]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium leading-snug line-clamp-2">
                          {item.product.title}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          <Zap size={10} className="text-emerald-400" />
                          <span className="text-emerald-400 text-[11px]">{item.product.deliveryTime}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 bg-white/5 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-white text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, Math.min(item.quantity + 1, item.product.stock))
                              }
                              className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm">
                              ${((item.product.salePrice ?? item.product.price) * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-zinc-600 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {state.items.length > 0 && (
              <div className="border-t border-white/6 p-5 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Subtotal</span>
                    <span className="text-zinc-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Delivery</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-1">
                      <Zap size={11} />
                      Instant
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/6 pt-2 mt-2">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-white font-bold text-xl">${subtotal.toFixed(2)}</span>
                  </div>
                </div>
                <motion.button
                  onClick={() => { closeCart(); onCheckout(); }}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Checkout
                  <ArrowRight size={16} />
                </motion.button>
                <p className="text-center text-zinc-600 text-xs">
                  🔒 Secure SSL checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
