import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingCart,
  Zap,
  Star,
  Package,
  Shield,
  RefreshCw,
  Tag,
  Check,
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
  onCheckout: () => void;
}

const categoryLabels: Record<string, string> = {
  'game-keys': 'Game Key',
  accounts: 'Account',
  boosts: 'Boost',
  cosmetics: 'Cosmetic',
  currency: 'Currency',
};

const categoryColors: Record<string, string> = {
  'game-keys': 'bg-emerald-500/15 text-emerald-400',
  accounts: 'bg-blue-500/15 text-blue-400',
  boosts: 'bg-amber-500/15 text-amber-400',
  cosmetics: 'bg-pink-500/15 text-pink-400',
  currency: 'bg-violet-500/15 text-violet-400',
};

export default function ProductDetailPage({
  product,
  onBack,
  onCheckout,
}: ProductDetailPageProps) {
  const { addItem, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock === 0;
  const price = product.salePrice ?? product.price;

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    openCart();
  };

  const handleBuyNow = () => {
    addItem(product);
    onCheckout();
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#18181c] border border-white/6 aspect-[4/3]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.new && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    New
                  </span>
                )}
                {product.bestseller && (
                  <span className="bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    Bestseller
                  </span>
                )}
                {discount > 0 && (
                  <span className="bg-rose-600 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                    -{discount}%
                  </span>
                )}
              </div>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, text: 'Secure Payment', sub: 'Stripe Protected' },
                { icon: Zap, text: 'Instant Delivery', sub: product.deliveryTime },
                { icon: RefreshCw, text: 'Easy Refunds', sub: '7-Day Policy' },
              ].map((t) => (
                <div
                  key={t.text}
                  className="bg-[#18181c] border border-white/6 rounded-xl p-3 flex flex-col items-center gap-1.5 text-center"
                >
                  <t.icon size={16} className="text-blue-400" />
                  <span className="text-white text-xs font-medium">{t.text}</span>
                  <span className="text-zinc-600 text-[10px]">{t.sub}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Category + Platform */}
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                  categoryColors[product.category]
                }`}
              >
                {categoryLabels[product.category]}
              </span>
              {product.platform && (
                <span className="text-zinc-600 text-xs">{product.platform}</span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-white font-bold text-2xl sm:text-3xl leading-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.round(product.rating)
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-zinc-700'
                    }
                  />
                ))}
              </div>
              <span className="text-zinc-400 text-sm">
                <strong className="text-white">{product.rating}</strong> ·{' '}
                {product.reviewCount.toLocaleString()} reviews
              </span>
            </div>

            {/* Price */}
            <div className="bg-[#18181c] border border-white/6 rounded-2xl p-5">
              <div className="flex items-baseline gap-3">
                <span className="text-white font-black text-4xl">${price.toFixed(2)}</span>
                {product.salePrice && (
                  <>
                    <span className="text-zinc-600 text-xl line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="bg-rose-600/20 text-rose-400 text-sm font-semibold px-2 py-0.5 rounded-md">
                      Save ${(product.price - product.salePrice).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mt-3">
                <Package
                  size={13}
                  className={
                    isOutOfStock
                      ? 'text-red-400'
                      : isLowStock
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }
                />
                <span
                  className={`text-sm font-medium ${
                    isOutOfStock
                      ? 'text-red-400'
                      : isLowStock
                      ? 'text-amber-400'
                      : 'text-emerald-400'
                  }`}
                >
                  {isOutOfStock
                    ? 'Out of Stock'
                    : isLowStock
                    ? `Only ${product.stock} remaining`
                    : `${product.stock} in stock`}
                </span>
              </div>

              {/* CTAs */}
              <div className="flex gap-3 mt-5">
                <motion.button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Zap size={16} />
                  Buy Now
                </motion.button>
                <motion.button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="flex items-center gap-2 bg-white/6 hover:bg-white/10 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-3.5 rounded-xl transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {added ? <Check size={16} className="text-emerald-400" /> : <ShoppingCart size={16} />}
                </motion.button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-white font-semibold text-base mb-2">About This Product</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{product.longDescription}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 bg-white/4 border border-white/6 text-zinc-500 text-xs px-2.5 py-1 rounded-lg"
                >
                  <Tag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            {/* Guarantee */}
            <div className="bg-emerald-500/8 border border-emerald-500/15 rounded-xl p-4 flex items-start gap-3">
              <Shield size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-emerald-400 font-semibold text-sm">Vexa Purchase Guarantee</p>
                <p className="text-zinc-500 text-xs mt-1 leading-relaxed">
                  If your product doesn't work as described, we'll replace it or issue a full refund — no questions asked.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
