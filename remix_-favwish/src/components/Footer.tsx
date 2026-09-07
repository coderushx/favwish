import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Gift, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setPage, updateFilters, setSearchQuery } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleQuickCategory = (cat: string) => {
    updateFilters({ categories: [cat], search: '' });
    setSearchQuery('');
    setPage('shop');
  };

  return (
    <footer className="bg-gradient-to-b from-rose-50/60 via-pink-50/40 to-rose-100/30 text-gray-700 pt-12 pb-6 border-t border-rose-200/80 mt-auto" id="app-footer">
      {/* Guarantees Section (Value Prop) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-10 border-b border-rose-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-xl border border-rose-100/80 shadow-2xs">
          <div className="p-2.5 rounded-lg bg-rose-100 text-rose-600 border border-rose-200 shrink-0">
            <Gift size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 text-sm font-bold tracking-wide">Elegant Gift Wrapping</h4>
            <p className="text-xs text-gray-500 mt-1">Every order includes standard premium velvet pouches or luxury box liners.</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-xl border border-rose-100/80 shadow-2xs">
          <div className="p-2.5 rounded-lg bg-rose-100 text-rose-600 border border-rose-200 shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 text-sm font-bold tracking-wide">Swift Safe Shipping</h4>
            <p className="text-xs text-gray-500 mt-1">Free delivery worldwide for orders over ₹999. Secure trackable transit.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-xl border border-rose-100/80 shadow-2xs">
          <div className="p-2.5 rounded-lg bg-rose-100 text-rose-600 border border-rose-200 shrink-0">
            <RefreshCw size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 text-sm font-bold tracking-wide">30-Day Happiness Guarantee</h4>
            <p className="text-xs text-gray-500 mt-1">Not perfect for your loved one? Enjoy stress-free 30-day returns or replacements.</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-white/80 p-3.5 rounded-xl border border-rose-100/80 shadow-2xs">
          <div className="p-2.5 rounded-lg bg-rose-100 text-rose-600 border border-rose-200 shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-gray-900 text-sm font-bold tracking-wide">100% Secure Checkout</h4>
            <p className="text-xs text-gray-500 mt-1">End-to-end tarnish-free plating guarantee and highly vetted craftsmanship.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-2xl font-extrabold text-gray-900 tracking-tight flex items-center gap-1">
              FavWish<span className="text-rose-500">🎁</span>
            </h3>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Crafting premium, tarnish-resistant, and beautifully custom-engraved tokens of appreciation. Because your special bonds deserve nothing less than physical poetry.
          </p>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-amber-700 font-semibold bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-lg w-fit shadow-2xs">
            <Gift size={12} className="fill-amber-500 text-amber-600 animate-pulse" />
            <span>Celebrating 100,000+ Happy Customers</span>
          </div>
        </div>

        {/* Quick Shop Links */}
        <div>
          <h4 className="text-rose-900 text-xs font-extrabold tracking-wider uppercase mb-3">Shop Collections</h4>
          <ul className="flex flex-col gap-2 text-xs text-gray-600">
            <li><button onClick={() => handleQuickCategory('Bracelets')} className="hover:text-rose-600 transition-colors text-left cursor-pointer">Magnetic Couples Bracelets</button></li>
            <li><button onClick={() => handleQuickCategory('Mugs')} className="hover:text-rose-600 transition-colors text-left cursor-pointer">Royal Marble Tea & Coffee Mugs</button></li>
            <li><button onClick={() => handleQuickCategory('Keychains')} className="hover:text-rose-600 transition-colors text-left cursor-pointer">Interlocking Couples Keychains</button></li>
            <li><button onClick={() => handleQuickCategory('Photo Frames')} className="hover:text-rose-600 transition-colors text-left cursor-pointer">LED Light & Spotify Plaques</button></li>
            <li><button onClick={() => handleQuickCategory('Combos')} className="hover:text-rose-600 transition-colors text-left cursor-pointer">Intimate Gifting Hampers</button></li>
            <li><button onClick={() => handleQuickCategory('Anniversary Gifts')} className="hover:text-rose-600 transition-colors text-left cursor-pointer">Eternal Gold Roses & Memory Books</button></li>
          </ul>
        </div>

        {/* Support & Care */}
        <div>
          <h4 className="text-rose-900 text-xs font-extrabold tracking-wider uppercase mb-3">Customer Care & Info</h4>
          <ul className="flex flex-col gap-2 text-xs text-gray-600">
            <li><button onClick={() => setPage('account')} className="hover:text-rose-600 transition-colors text-left cursor-pointer">Track Your Order</button></li>
            <li><button onClick={() => setPage('shop')} className="hover:text-rose-600 transition-colors text-left cursor-pointer">Bestselling Gifts</button></li>
            <li><button className="hover:text-rose-600 transition-colors text-left cursor-pointer">Custom Engraving Instructions</button></li>
            <li><button className="hover:text-rose-600 transition-colors text-left cursor-pointer">Tarnish-Resistance Guide</button></li>
            <li><button className="hover:text-rose-600 transition-colors text-left cursor-pointer">Our Story & Ethics</button></li>
          </ul>
        </div>

        {/* Newsletter Signup Column */}
        <div className="bg-white p-5 rounded-2xl border border-rose-200/80 shadow-xs">
          <h4 className="text-gray-900 text-xs font-extrabold tracking-wider uppercase mb-2">Subscribe & Save 20%</h4>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Join our registry to unlock secret discounts, gift suggestions, and early access to new product drops.
          </p>
          
          {subscribed ? (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs animate-fadeIn text-center">
              <span className="font-bold block mb-1">🎁 Welcome to the Registry!</span>
              We have sent a 20% off code directly to your email. Check your inbox!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-rose-50/60 text-gray-800 text-xs px-3.5 py-2 pl-8 rounded-lg border border-rose-200/80 placeholder:text-gray-400 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                />
                <Mail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="submit"
                className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Legal & Credits Row */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-5 border-t border-rose-200/60 flex flex-col md:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
        <span>© 2026 FavWish Gifting Registry. All Rights Reserved. Co-designed with premium care.</span>
        <div className="flex items-center gap-3">
          <span className="hover:text-rose-600 cursor-pointer">Terms of Service</span>
          <span>•</span>
          <span className="hover:text-rose-600 cursor-pointer">Privacy Policy</span>
          <span>•</span>
          <span className="hover:text-rose-600 cursor-pointer">Sitemap</span>
        </div>
      </div>
    </footer>
  );
};
