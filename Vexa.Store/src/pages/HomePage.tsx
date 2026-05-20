import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Clock, Star, ChevronRight } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';

interface HomePageProps {
  onProductClick: (product: Product) => void;
  onNavigate: (page: string, category?: string) => void;
  onSearch: (q: string) => void;
}

const trustBadges = [
  {
    icon: Shield,
    title: 'Verified & Secure',
    desc: 'Every product is verified before listing. Your payment is protected by Stripe.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    icon: Zap,
    title: 'Instant Delivery',
    desc: 'Most orders delivered within seconds. Access your purchase the moment you pay.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    desc: 'Our support team is available around the clock to help with any issues.',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    icon: Star,
    title: '50,000+ Happy Customers',
    desc: 'Trusted by tens of thousands of gamers worldwide with a 4.9/5 average rating.',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
];

const stats = [
  { value: '50K+', label: 'Customers' },
  { value: '4.9★', label: 'Avg. Rating' },
  { value: '< 5s', label: 'Avg. Delivery' },
  { value: '99.8%', label: 'Success Rate' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage({ onProductClick, onNavigate }: HomePageProps) {
  const featured = products.filter((p) => p.featured);
  const bestsellers = products.filter((p) => p.bestseller);

  return (
    <div className="min-h-screen bg-[#0f0f11]">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f11]/60 via-[#0f0f11]/40 to-[#0f0f11]" />
          {/* Radial glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-violet-600/8 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            >
              <Zap size={12} className="fill-blue-400" />
              Instant Digital Delivery
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
            >
              The Premium
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Gaming Store.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-xl"
            >
              Game keys, premium accounts, boosts, and in-game currency — delivered
              instantly. Trusted by over 50,000 gamers worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <motion.button
                onClick={() => onNavigate('products')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/30"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Browse Store
                <ArrowRight size={16} />
              </motion.button>
              <motion.button
                onClick={() => onNavigate('products', 'accounts')}
                className="flex items-center gap-2 bg-white/6 hover:bg-white/10 border border-white/10 text-white font-semibold px-7 py-3.5 rounded-xl transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Accounts
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-16 flex flex-wrap gap-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-white font-bold text-2xl">{s.value}</div>
                  <div className="text-zinc-500 text-sm mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-[#0f0f11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-white font-bold text-3xl">Shop by Category</h2>
            <p className="text-zinc-500 mt-2">Find exactly what you're looking for</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {categories.slice(1).map((cat) => (
              <motion.button
                key={cat.id}
                variants={itemVariants}
                onClick={() => onNavigate('products', cat.id)}
                className="group bg-[#18181c] border border-white/6 hover:border-blue-500/30 rounded-2xl p-5 flex flex-col items-center gap-3 transition-all hover:bg-blue-500/5"
                whileHover={{ y: -3 }}
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-zinc-300 group-hover:text-white font-medium text-sm transition-colors">
                  {cat.label}
                </span>
                <ChevronRight size={14} className="text-zinc-600 group-hover:text-blue-400 transition-colors" />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <div className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">
                Curated Selection
              </div>
              <h2 className="text-white font-bold text-3xl">Featured Products</h2>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="hidden sm:flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm font-medium transition-colors"
            >
              View all <ArrowRight size={14} />
            </button>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {featured.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} onClick={() => onProductClick(product)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 bg-[#0f0f11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <div className="text-violet-400 text-xs font-semibold uppercase tracking-widest mb-2">
                Top Sellers
              </div>
              <h2 className="text-white font-bold text-3xl">Bestsellers</h2>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {bestsellers.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} onClick={() => onProductClick(product)} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-20 bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-white font-bold text-3xl">Why 50,000+ Gamers Choose Vexa</h2>
            <p className="text-zinc-500 mt-3">Built on trust, speed, and security</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {trustBadges.map((badge) => (
              <motion.div
                key={badge.title}
                variants={itemVariants}
                className="bg-[#18181c] border border-white/6 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className={`w-11 h-11 rounded-xl ${badge.bg} flex items-center justify-center`}>
                  <badge.icon size={20} className={badge.color} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">{badge.title}</h3>
                  <p className="text-zinc-500 text-sm mt-1.5 leading-relaxed">{badge.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-[#0f0f11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/20 rounded-3xl p-10 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-violet-600/5 rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/10 blur-3xl" />
            <div className="relative">
              <h2 className="text-white font-bold text-3xl sm:text-4xl">
                Ready to Level Up?
              </h2>
              <p className="text-zinc-400 mt-3 text-lg max-w-lg mx-auto">
                Join 50,000+ gamers who trust Vexa for fast, secure digital gaming purchases.
              </p>
              <motion.button
                onClick={() => onNavigate('products')}
                className="mt-8 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-xl shadow-blue-600/25"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Now <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/6 py-12 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Zap size={14} className="text-white fill-white" />
              </div>
              <span className="text-white font-bold">
                Vexa<span className="text-blue-400">.Store</span>
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-600">
              <span>© 2025 Vexa.Store</span>
              <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Support</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">Refund Policy</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/4 text-center">
            <p className="text-zinc-700 text-xs">
              Vexa.Store is not affiliated with any game publisher. All trademarks belong to their respective owners.
              Payments secured by Stripe. 256-bit SSL encryption.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
