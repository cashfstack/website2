import { motion } from 'framer-motion';
import { ShoppingCart, Zap, Star, Package } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const categoryColors: Record<string, string> = {
  'game-keys': 'bg-emerald-500/15 text-emerald-400',
  accounts: 'bg-blue-500/15 text-blue-400',
  boosts: 'bg-amber-500/15 text-amber-400',
  cosmetics: 'bg-pink-500/15 text-pink-400',
  currency: 'bg-violet-500/15 text-violet-400',
};

const categoryLabels: Record<string, string> = {
  'game-keys': 'Game Key',
  accounts: 'Account',
  boosts: 'Boost',
  cosmetics: 'Cosmetic',
  currency: 'Currency',
};

export default function ProductCard({ product, onClick }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const discount = product.salePrice
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    openCart();
  };

  const isLowStock = product.stock > 0 && product.stock <= 15;
  const isOutOfStock = product.stock === 0;

  return (
    <motion.div
      onClick={onClick}
      className="group relative bg-[#18181c] border border-white/6 rounded-2xl overflow-hidden cursor-pointer flex flex-col"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      layout
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.new && (
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            New
          </span>
        )}
        {product.bestseller && (
          <span className="bg-violet-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
            Bestseller
          </span>
        )}
        {discount > 0 && (
          <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
            -{discount}%
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative h-44 bg-[#111114] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181c] via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Category + Delivery */}
        <div className="flex items-center justify-between">
          <span
            className={`text-[10px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider ${
              categoryColors[product.category]
            }`}
          >
            {categoryLabels[product.category]}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
            <Zap size={10} className="text-emerald-400" />
            {product.deliveryTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < Math.round(product.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-zinc-700'
                }
              />
            ))}
          </div>
          <span className="text-[11px] text-zinc-500">
            {product.rating} ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-1.5">
          <Package size={11} className={isLowStock ? 'text-amber-400' : isOutOfStock ? 'text-red-400' : 'text-emerald-400'} />
          <span
            className={`text-[11px] font-medium ${
              isOutOfStock
                ? 'text-red-400'
                : isLowStock
                ? 'text-amber-400'
                : 'text-emerald-400'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : isLowStock ? `Only ${product.stock} left` : 'In Stock'}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-1">
          <div>
            {product.salePrice ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-white font-bold text-lg">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-zinc-600 text-sm line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-white font-bold text-lg">${product.price.toFixed(2)}</span>
            )}
          </div>
          <motion.button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={12} />
            Add
          </motion.button>
        </div>
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/20 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}
