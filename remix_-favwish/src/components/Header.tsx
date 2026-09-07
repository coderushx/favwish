import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Search, User, Gift, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export const Header: React.FC = () => {
  const {
    cart,
    wishlist,
    setPage,
    searchQuery,
    setSearchQuery,
    updateFilters,
    currentUser,
    logout
  } = useApp();

  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [selectedCat, setSelectedCat] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      categories: selectedCat === 'All' ? [] : [selectedCat],
      search: localSearch
    });
    setSearchQuery(localSearch);
    setPage('shop');
  };

  const handleCategoryNavClick = (cat: string) => {
    updateFilters({
      categories: cat === 'All' ? [] : [cat],
      search: ''
    });
    setSearchQuery('');
    setLocalSearch('');
    setSelectedCat(cat === 'All' ? 'All' : cat);
    setPage('shop');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md text-gray-800 shadow-xs border-b border-rose-100/80" id="app-header">
      {/* Top Banner Alert Bar */}
      <div className="bg-rose-50 text-xs text-rose-900 py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-rose-100/80">
        <Sparkles size={13} className="animate-pulse text-amber-500" />
        <span>Meaningful Gifts Delivered Worldwide - Free Delivery on Orders Over ₹999! Use Code <strong className="text-rose-700 hover:underline cursor-pointer font-bold" onClick={() => { setPage('cart'); }}>GIFT20</strong> for 20% off</span>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          onClick={() => setPage('home')}
          className="flex items-center gap-2 cursor-pointer select-none group min-w-fit"
        >
          <div className="w-10 h-10 rounded-full bg-rose-100/80 flex items-center justify-center border border-rose-200 group-hover:bg-rose-200/80 transition-all shadow-2xs">
            <Gift className="text-rose-600 group-hover:scale-110 transition-transform duration-300" size={22} />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-extrabold tracking-tight bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 bg-clip-text text-transparent flex items-center gap-1">
              FavWish
              <span className="text-rose-500 text-lg inline-block animate-bounce">🎁</span>
            </h1>
            <span className="text-[10px] uppercase font-montserrat tracking-widest text-rose-500 block -mt-1 font-semibold">Shop. Gift. Smile.</span>
          </div>
        </div>

        {/* Dense Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-2xl bg-white rounded-xl overflow-hidden border-2 border-rose-200/90 shadow-2xs focus-within:ring-2 focus-within:ring-rose-400 focus-within:border-rose-400 transition-all">
          <div className="relative">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="bg-rose-50/70 text-gray-800 text-xs px-3 h-full pr-7 border-r border-rose-200 cursor-pointer font-medium focus:outline-none appearance-none hover:bg-rose-100/60"
            >
              <option value="All">All Departments</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-rose-600 pointer-events-none" />
          </div>
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search matching bracelets, customized mugs, keychains, teddy bears..."
            className="flex-1 px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
          />
          <button 
            type="submit" 
            className="bg-rose-500 hover:bg-rose-600 text-white px-5 flex items-center justify-center transition-colors cursor-pointer shadow-xs"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3 lg:gap-6 text-sm">
          {/* Account Info */}
          <div className="relative">
            <button
              onClick={() => {
                if (currentUser.loggedIn) {
                  setAccountMenuOpen(!accountMenuOpen);
                } else {
                  setPage('account');
                }
              }}
              className="hover:text-rose-600 text-gray-700 text-left transition-colors flex items-center gap-1.5 cursor-pointer py-1"
            >
              <User size={20} className="text-rose-500" />
              <div className="hidden sm:block text-xs">
                <span className="text-[10px] text-gray-500 block -mb-0.5 leading-none">
                  {currentUser.loggedIn ? `Hello, ${currentUser.name.split(' ')[0]}` : 'Sign In'}
                </span>
                <span className="font-semibold flex items-center leading-tight text-gray-800">
                  Account & Lists <ChevronDown size={11} className="ml-0.5 text-rose-500" />
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {accountMenuOpen && currentUser.loggedIn && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-xl py-2 border border-rose-100 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-semibold truncate text-rose-900">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    setAccountMenuOpen(false);
                    setPage('account');
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-rose-50 text-gray-700 hover:text-rose-600 flex items-center gap-2"
                >
                  My Profile & History
                </button>
                <button
                  onClick={() => {
                    setAccountMenuOpen(false);
                    updateFilters({ categories: [] });
                    setPage('shop');
                  }}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-rose-50 text-gray-700 hover:text-rose-600 flex items-center gap-2"
                >
                  Shop Best Gifts
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => {
                    setAccountMenuOpen(false);
                    logout();
                    setPage('home');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-medium flex items-center gap-2"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={() => {
              if (currentUser.loggedIn) {
                setPage('account');
                setTimeout(() => {
                  const el = document.getElementById('wishlist-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                setPage('account');
              }
            }}
            className="hover:text-rose-600 text-gray-700 transition-colors relative p-1.5 flex flex-col items-center cursor-pointer"
            title="Wishlist"
          >
            <Gift size={22} className={wishlistCount > 0 ? 'fill-rose-500 text-rose-500 animate-pulse' : 'text-gray-500'} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                {wishlistCount}
              </span>
            )}
            <span className="hidden lg:inline text-[10px] mt-0.5 text-gray-600">List</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setPage('cart')}
            className="hover:text-rose-600 text-gray-700 transition-colors relative p-1.5 flex flex-col items-center cursor-pointer"
            title="Cart"
          >
            <div className="relative">
              <ShoppingBag size={22} className="text-amber-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-5 h-5 px-1 flex items-center justify-center border border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden lg:inline text-[10px] mt-0.5 text-gray-600">Cart</span>
          </button>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden p-1 text-gray-700 hover:text-rose-600 cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Subnav Ribbon / Departments */}
      <div className="bg-rose-50/70 border-t border-rose-100/80 text-xs text-gray-700 font-medium px-4 md:px-6 py-1.5 flex items-center overflow-x-auto gap-3 scrollbar-none shadow-2xs">
        <button 
          onClick={() => handleCategoryNavClick('All')}
          className="flex items-center gap-1.5 font-bold hover:text-rose-700 cursor-pointer select-none py-1 shrink-0 bg-white border border-rose-200 px-3 rounded-lg text-rose-700 shadow-2xs"
        >
          <Menu size={14} /> Shop All
        </button>

        <div className="h-4 w-[1px] bg-rose-200 shrink-0"></div>

        {/* OCCASIONS FIRST */}
        <span className="text-[10px] uppercase font-bold text-amber-700 tracking-widest shrink-0 flex items-center gap-1">
          <Sparkles size={11} className="text-amber-500 animate-pulse" /> Occasions:
        </span>
        <button 
          onClick={() => {
            updateFilters({ occasions: ['Birthday'], categories: [], search: '' });
            setSearchQuery('');
            setPage('shop');
          }}
          className="hover:bg-white/80 hover:text-rose-600 text-gray-700 font-medium transition-colors cursor-pointer shrink-0 py-1 px-2 rounded-md flex items-center gap-1"
        >
          🎂 Birthday
        </button>
        <button 
          onClick={() => {
            updateFilters({ occasions: ['Friendship Day'], categories: [], search: '' });
            setSearchQuery('');
            setPage('shop');
          }}
          className="hover:bg-white/80 hover:text-rose-600 text-gray-700 font-medium transition-colors cursor-pointer shrink-0 py-1 px-2 rounded-md flex items-center gap-1"
        >
          🤝 Friendship Day
        </button>
        <button 
          onClick={() => {
            updateFilters({ occasions: ['Anniversary'], categories: [], search: '' });
            setSearchQuery('');
            setPage('shop');
          }}
          className="hover:bg-white/80 hover:text-rose-600 text-gray-700 font-medium transition-colors cursor-pointer shrink-0 py-1 px-2 rounded-md flex items-center gap-1"
        >
          💍 Anniversary
        </button>
        <button 
          onClick={() => {
            updateFilters({ occasions: ['Compliment Gifts'], categories: [], search: '' });
            setSearchQuery('');
            setPage('shop');
          }}
          className="hover:text-purple-700 text-purple-900 font-semibold transition-colors cursor-pointer shrink-0 py-1 flex items-center gap-1 bg-purple-100/70 px-2.5 rounded-md border border-purple-200/60 shadow-2xs"
        >
          💌 Compliment Gifts
        </button>
        <button 
          onClick={() => {
            updateFilters({ occasions: ["Valentine's Day"], categories: [], search: '' });
            setSearchQuery('');
            setPage('shop');
          }}
          className="hover:bg-white/80 hover:text-rose-600 text-gray-700 font-medium transition-colors cursor-pointer shrink-0 py-1 px-2 rounded-md flex items-center gap-1"
        >
          💖 Valentine's
        </button>
        <button 
          onClick={() => {
            updateFilters({ occasions: ['Long Distance'], categories: [], search: '' });
            setSearchQuery('');
            setPage('shop');
          }}
          className="hover:bg-white/80 hover:text-rose-600 text-gray-700 font-medium transition-colors cursor-pointer shrink-0 py-1 px-2 rounded-md flex items-center gap-1"
        >
          ✈️ Long Distance
        </button>
        <button 
          onClick={() => {
            updateFilters({ categories: ['Teddy Bears'], occasions: [], search: '' });
            setSearchQuery('');
            setPage('shop');
          }}
          className="hover:text-pink-800 font-bold transition-colors cursor-pointer shrink-0 py-1 flex items-center gap-1 bg-pink-100 text-pink-900 px-2.5 rounded-md border border-pink-200/80 shadow-2xs"
        >
          🧸 Teddy Bears
        </button>

        <div className="h-4 w-[1px] bg-rose-200 shrink-0"></div>

        {/* CATEGORIES AFTER */}
        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest shrink-0">Types:</span>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryNavClick(cat)}
            className="hover:text-rose-600 text-gray-600 cursor-pointer shrink-0 py-1 px-1.5 rounded"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Mobile Menu Slide */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-rose-200 p-4 flex flex-col gap-4 animate-fadeIn shadow-xl">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="flex bg-white rounded-xl overflow-hidden border-2 border-rose-200">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search meaningful gifts..."
              className="flex-1 px-3 py-2 text-xs text-gray-800 focus:outline-none"
            />
            <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white px-4 flex items-center justify-center">
              <Search size={14} />
            </button>
          </form>

          {/* Occasions & Departments Links */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-amber-700 uppercase tracking-wider font-bold flex items-center gap-1">
              <Sparkles size={11} /> Occasions & Collections
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button 
                onClick={() => {
                  updateFilters({ occasions: ['Birthday'], categories: [], search: '' });
                  setSearchQuery('');
                  setPage('shop');
                  setMobileMenuOpen(false);
                }} 
                className="text-left py-1 text-gray-800 hover:text-rose-600 flex items-center gap-1"
              >
                🎂 Birthday Gifts
              </button>
              <button 
                onClick={() => {
                  updateFilters({ categories: ['Teddy Bears'], occasions: [], search: '' });
                  setSearchQuery('');
                  setPage('shop');
                  setMobileMenuOpen(false);
                }} 
                className="text-left py-1 text-pink-800 hover:text-rose-600 flex items-center gap-1 font-semibold"
              >
                🧸 Teddy Bears
              </button>
              <button 
                onClick={() => {
                  updateFilters({ occasions: ['Anniversary'], categories: [], search: '' });
                  setSearchQuery('');
                  setPage('shop');
                  setMobileMenuOpen(false);
                }} 
                className="text-left py-1 text-gray-800 hover:text-rose-600 flex items-center gap-1"
              >
                💍 Anniversary
              </button>
              <button 
                onClick={() => {
                  updateFilters({ occasions: ['Friendship Day'], categories: [], search: '' });
                  setSearchQuery('');
                  setPage('shop');
                  setMobileMenuOpen(false);
                }} 
                className="text-left py-1 text-gray-800 hover:text-rose-600 flex items-center gap-1"
              >
                🤝 Friendship Day
              </button>
            </div>

            <span className="text-[10px] text-rose-500 uppercase tracking-wider font-bold mt-2">Departments</span>
            <button onClick={() => handleCategoryNavClick('All')} className="text-left py-1 text-sm text-rose-700 font-bold">All Products</button>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryNavClick(cat)}
                className="text-left py-1 text-xs text-gray-700 hover:text-rose-600"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="border-t border-rose-100 pt-2 flex flex-col gap-2">
            {currentUser.loggedIn ? (
              <>
                <span className="text-xs text-gray-600">Logged in as: <strong className="text-gray-900">{currentUser.name}</strong></span>
                <button onClick={() => { setPage('account'); setMobileMenuOpen(false); }} className="text-left text-xs text-rose-600 font-semibold">Go to Profile / Wishlist</button>
                <button onClick={() => { logout(); setPage('home'); setMobileMenuOpen(false); }} className="text-left text-xs text-red-500 font-semibold">Sign Out</button>
              </>
            ) : (
              <button onClick={() => { setPage('account'); setMobileMenuOpen(false); }} className="text-left text-xs font-bold text-rose-600">Sign In / Register</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
