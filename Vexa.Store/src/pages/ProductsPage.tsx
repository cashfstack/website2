import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';

interface ProductsPageProps {
  onProductClick: (product: Product) => void;
  searchQuery: string;
  onSearch: (q: string) => void;
  initialCategory?: string;
}

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name A–Z' },
];

export default function ProductsPage({
  onProductClick,
  searchQuery,
  onSearch,
  initialCategory,
}: ProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [sort, setSort] = useState<SortOption>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === (activeCategory as Category));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    result = result.filter((p) => (p.salePrice ?? p.price) <= maxPrice);

    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort((a, b) => {
          const aScore = (a.featured ? 3 : 0) + (a.bestseller ? 2 : 0) + (a.new ? 1 : 0);
          const bScore = (b.featured ? 3 : 0) + (b.bestseller ? 2 : 0) + (b.new ? 1 : 0);
          return bScore - aScore;
        });
    }

    return result;
  }, [activeCategory, searchQuery, sort, maxPrice]);

  const activeCategoryLabel = categories.find((c) => c.id === activeCategory)?.label || 'All';

  return (
    <div className="min-h-screen bg-[#0f0f11] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-white">
              {searchQuery ? `Results for "${searchQuery}"` : activeCategoryLabel}
            </h1>
            <p className="text-zinc-500 mt-1 text-sm">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-56 flex-shrink-0"
          >
            {/* Mobile filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden w-full flex items-center justify-between bg-[#18181c] border border-white/6 rounded-xl px-4 py-3 text-white text-sm font-medium mb-4"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal size={15} />
                Filters
              </span>
              <ChevronDown
                size={15}
                className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              {/* Categories */}
              <div className="bg-[#18181c] border border-white/6 rounded-2xl p-4">
                <h3 className="text-white font-semibold text-sm mb-3">Category</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                        activeCategory === cat.id
                          ? 'bg-blue-600/20 text-blue-300 font-medium'
                          : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{cat.icon}</span>
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-[#18181c] border border-white/6 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm">Max Price</h3>
                  <span className="text-blue-400 font-semibold text-sm">${maxPrice}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-zinc-600 text-xs mt-1">
                  <span>$5</span>
                  <span>$200</span>
                </div>
              </div>

              {/* Quick Filters */}
              <div className="bg-[#18181c] border border-white/6 rounded-2xl p-4">
                <h3 className="text-white font-semibold text-sm mb-3">Quick Filters</h3>
                <div className="space-y-1">
                  {[
                    { label: 'On Sale', fn: () => products.filter((p) => !!p.salePrice) },
                    { label: 'New Arrivals', fn: () => products.filter((p) => p.new) },
                    { label: 'Instant Delivery', fn: () => products.filter((p) => p.deliveryTime === 'Instant') },
                    { label: 'In Stock', fn: () => products.filter((p) => p.stock > 0) },
                  ].map((f) => (
                    <button
                      key={f.label}
                      className="w-full text-left px-3 py-2 text-zinc-400 hover:text-white text-sm rounded-lg hover:bg-white/5 transition-all"
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Search + Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full bg-[#18181c] border border-white/6 rounded-xl pl-9 pr-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="appearance-none bg-[#18181c] border border-white/6 rounded-xl px-4 py-2.5 pr-8 text-sm text-zinc-300 focus:outline-none focus:border-blue-500/50 cursor-pointer transition-all"
                >
                  {sortOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={14}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
                />
              </div>
            </div>

            {/* Product Grid */}
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="text-5xl mb-4">🔍</div>
                  <h3 className="text-white font-semibold text-lg">No products found</h3>
                  <p className="text-zinc-500 text-sm mt-2">
                    Try adjusting your filters or search terms
                  </p>
                  <button
                    onClick={() => { setActiveCategory('all'); onSearch(''); setMaxPrice(200); }}
                    className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
                >
                  {filtered.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <ProductCard
                        product={product}
                        onClick={() => onProductClick(product)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
