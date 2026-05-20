import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import { Product } from './types';

type Page = 'home' | 'products' | 'product-detail' | 'checkout' | 'confirmation';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialCategory, setInitialCategory] = useState<string | undefined>(undefined);

  const navigate = useCallback((page: string, category?: string) => {
    setCurrentPage(page as Page);
    if (category) setInitialCategory(category);
    else setInitialCategory(undefined);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearchQuery(q);
    if (q && currentPage === 'home') {
      setCurrentPage('products');
    }
  }, [currentPage]);

  const handleCheckout = useCallback(() => {
    setCurrentPage('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBack = useCallback(() => {
    if (currentPage === 'product-detail') {
      setCurrentPage('products');
    } else if (currentPage === 'checkout') {
      setCurrentPage(selectedProduct ? 'product-detail' : 'products');
    } else {
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct]);

  const handleSuccess = useCallback(() => {
    setCurrentPage('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleContinue = useCallback(() => {
    setCurrentPage('home');
    setSelectedProduct(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0f0f11]">
      {/* Navbar — always visible */}
      {currentPage !== 'confirmation' && (
        <Navbar
          onSearch={handleSearch}
          searchQuery={searchQuery}
          onNavigate={navigate}
          currentPage={currentPage}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer onCheckout={handleCheckout} />

      {/* Pages */}
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <motion.div key="home" {...pageVariants}>
            <HomePage
              onProductClick={handleProductClick}
              onNavigate={navigate}
              onSearch={handleSearch}
            />
          </motion.div>
        )}

        {currentPage === 'products' && (
          <motion.div key="products" {...pageVariants}>
            <ProductsPage
              onProductClick={handleProductClick}
              searchQuery={searchQuery}
              onSearch={handleSearch}
              initialCategory={initialCategory}
            />
          </motion.div>
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <motion.div key="product-detail" {...pageVariants}>
            <ProductDetailPage
              product={selectedProduct}
              onBack={handleBack}
              onCheckout={handleCheckout}
            />
          </motion.div>
        )}

        {currentPage === 'checkout' && (
          <motion.div key="checkout" {...pageVariants}>
            <CheckoutPage onBack={handleBack} onSuccess={handleSuccess} />
          </motion.div>
        )}

        {currentPage === 'confirmation' && (
          <motion.div key="confirmation" {...pageVariants}>
            <ConfirmationPage onContinue={handleContinue} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
