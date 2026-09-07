import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Homepage } from './components/Homepage';
import { ProductListing } from './components/ProductListing';
import { ProductDetail } from './components/ProductDetail';
import { CartPage } from './components/CartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountPages } from './components/AccountPages';
import { motion, AnimatePresence } from 'motion/react';
import { Gift } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { page } = useApp();

  // Route selector
  const renderPage = () => {
    switch (page) {
      case 'home':
        return <Homepage />;
      case 'shop':
        return <ProductListing />;
      case 'product':
        return <ProductDetail />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'account':
        return <AccountPages />;
      default:
        return <Homepage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream/40" id="main-layout">
      {/* Sticky Top Header Navigation */}
      <Header />

      {/* Main Page Area with Route transitions */}
      <main className="flex-grow max-w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="w-full h-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer navigation */}
      <Footer />
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds loading screen
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading-screen"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-brand-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Gift className="w-16 h-16 text-brand-maroon mb-4" fill="currentColor" />
                </motion.div>
                <motion.div 
                  className="absolute inset-0 text-brand-rose blur-md opacity-50"
                  animate={{ 
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ 
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Gift className="w-16 h-16" fill="currentColor" />
                </motion.div>
              </div>
              <h1 className="font-serif text-3xl font-bold text-brand-maroon tracking-tight">
                FavWish
              </h1>
              <p className="text-sm font-medium text-brand-rose tracking-widest uppercase mt-2">
                A Registry of Love & Friendship
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <MainLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </AppProvider>
  );
}
