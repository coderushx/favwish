import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, Gift, Star, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { Product } from '../types';

const HERO_SLIDES = [
  {
    id: 1,
    title: "The Magnetic Pull of Connection",
    subtitle: "MAGNETIC CONNECTION BRACELETS",
    description: "Adjustable hand-woven bracelets that attract each other automatically when you hold hands with your partner or best friend.",
    tagline: "Buy One Set, Get Second 40% Off!",
    cta: "Shop Bracelets",
    category: "Bracelets",
    bgImage: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Light Up Your Shared Melodies",
    subtitle: "CUSTOM SPOTIFY LIGHT PLAQUES",
    description: "Scan the acrylic base with your phone to automatically play your favorite shared melody.",
    tagline: "Engrave Your Names & Dates for Free",
    cta: "Design Yours Now",
    category: "Photo Frames",
    bgImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Ultimate Care Packages",
    subtitle: "CURATED GIFT HAMPERS",
    description: "Sandblasted crystal wine glasses, hand-crafted chocolates, and organic soy aromatherapy.",
    tagline: "VIP Gift Box Included",
    cta: "View Gift Hampers",
    category: "Combos",
    bgImage: "https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1200&auto=format&fit=crop"
  }
];

const CATEGORY_INFOS = [
  { name: 'Teddy Bears', type: 'category', count: '10+ Plush', img: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=350&auto=format&fit=crop', desc: 'Giant plush & magnetic couple bears', badge: 'Popular', icon: '🧸' },
  { name: 'Birthday', type: 'occasion', count: '15+ Gifts', img: 'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=350&auto=format&fit=crop', desc: 'Custom music frames & hampers', badge: 'Trending', icon: '🎂' },
  { name: 'Friendship Day', type: 'occasion', count: '12+ Gifts', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=350&auto=format&fit=crop', desc: 'Bestie charms & twin mugs', icon: '🤝' },
  { name: 'Anniversary', type: 'occasion', count: '18+ Gifts', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=350&auto=format&fit=crop', desc: 'Gold rose domes & coordinate cuffs', badge: 'Romantic', icon: '💍' },
  { name: 'Compliment Gifts', type: 'occasion', count: '10+ Gifts', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=350&auto=format&fit=crop', desc: '30-note jars & praise tokens', badge: 'New', icon: '💌' },
  { name: "Valentine's Day", type: 'occasion', count: '14+ Gifts', img: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=350&auto=format&fit=crop', desc: 'Couple teddy pairs & gold roses', badge: 'Loved', icon: '💖' },
  { name: 'Long Distance', type: 'occasion', count: '10+ Gifts', img: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=350&auto=format&fit=crop', desc: 'Pocket bears & heart keychains', icon: '✈️' },
  { name: 'Engagement', type: 'occasion', count: '9+ Gifts', img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=350&auto=format&fit=crop', desc: 'Celebration crates & couple keepsakes', icon: '🥂' }
];

const REVIEWS_TESTIMONIALS = [
  {
    id: 1,
    quote: "The Spotify acrylic frame is absolutely magical. The code scans instantly on Spotify and the warm LED glow on our nightstand is breathtaking.",
    user: "Charlotte & James",
    location: "Seattle, WA",
    date: "Anniversary Gift",
    rating: 5
  },
  {
    id: 2,
    quote: "The magnetic bracelets are wonderful for best friends. We live in different cities and when we reunited at the airport, hearing that little snap of the magnet was the most comforting sound ever.",
    user: "Maya (For her best friend)",
    location: "Austin, TX",
    date: "Long Distance Gift",
    rating: 5
  },
  {
    id: 3,
    quote: "Extremely fast delivery! The luxury gift hamper arrived looking like a royal box. The engraved crystalline glasses were absolutely beautiful and very high quality.",
    user: "Liam & Sophia",
    location: "Miami, FL",
    date: "Birthday Gift",
    rating: 5
  }
];

export const Homepage: React.FC = () => {
  const { products, viewProduct, toggleWishlist, isInWishlist, setPage, updateFilters, setSearchQuery } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const bestSellers = products.filter(p => p.bestSeller);
  const newArrivals = products.filter(p => p.newArrival);

  const handleCollectionClick = (item: { name: string; type?: string }) => {
    if (item.type === 'occasion' || ['Birthday', 'Friendship Day', 'Anniversary', 'Compliment Gifts', 'Long Distance'].includes(item.name)) {
      updateFilters({ occasions: [item.name], categories: [], search: '' });
    } else {
      updateFilters({ categories: [item.name], occasions: [], search: '' });
    }
    setSearchQuery('');
    setPage('shop');
  };

  const handleCtaClick = (category: string) => {
    updateFilters({ categories: [category], search: '' });
    setSearchQuery('');
    setPage('shop');
  };

  return (
    <div className="flex flex-col min-h-screen" id="homepage-root">
      {/* 1. Hero Banner Carousel with Smooth Motion */}
      <section className="relative h-[460px] md:h-[520px] w-full overflow-hidden bg-rose-50" id="hero-carousel">
        <AnimatePresence mode="wait">
          {HERO_SLIDES.map((slide, index) => {
            if (index !== currentSlide) return null;
            return (
              <motion.div
                key={slide.id}
                className="absolute inset-0 w-full h-full flex items-center"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Background Dim Image */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 scale-105"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, rgba(255, 241, 243, 0.97) 25%, rgba(255, 241, 243, 0.88) 55%, rgba(255, 241, 243, 0.45) 100%), url(${slide.bgImage})` 
                  }}
                />
                
                {/* Text Content overlay */}
                <div className="relative max-w-7xl mx-auto w-full px-4 md:px-12 z-10 flex flex-col items-start gap-4 text-gray-900">
                  <motion.span 
                    className="text-xs md:text-sm uppercase font-bold tracking-widest text-rose-700 bg-rose-100/90 px-3.5 py-1.5 rounded-full border border-rose-200/80 shadow-2xs"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {slide.subtitle}
                  </motion.span>
                  <motion.h2 
                    className="font-serif text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-2xl leading-tight text-gray-900"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p 
                    className="text-sm md:text-base text-gray-700 max-w-lg leading-relaxed font-sans font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {slide.description}
                  </motion.p>
                  
                  {/* Tagline Callout */}
                  <motion.div
                    className="flex items-center gap-2 text-amber-900 text-xs md:text-sm font-bold tracking-wide bg-amber-100/90 py-1.5 px-3.5 rounded-xl border border-amber-300/80 shadow-2xs"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Sparkles size={14} className="text-amber-600 animate-bounce" />
                    <span>{slide.tagline}</span>
                  </motion.div>

                  <motion.button
                    onClick={() => handleCtaClick(slide.category)}
                    className="mt-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs md:text-sm px-7 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg cursor-pointer"
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {slide.cta} →
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Manual Slides Navigation arrows */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 text-gray-700 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer z-20 shadow-sm"
        >
          <ArrowLeft size={18} />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 text-gray-700 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer z-20 shadow-sm"
        >
          <ArrowRight size={18} />
        </button>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-rose-500 w-6' : 'bg-gray-400/50'}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Beautiful Occasions & Categories Grid Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 w-full" id="categories-grid">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center gap-1.5 text-brand-rose font-semibold text-xs uppercase tracking-widest mb-1.5 bg-brand-blush px-3.5 py-1 rounded-full border border-brand-pink/20">
            <Gift size={13} />
            <span>Curated Gifting Occasions</span>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-brand-maroon tracking-tight">
            Shop Gifts by Occasion
          </h2>
          <p className="text-xs text-gray-500 max-w-lg mx-auto mt-2 font-sans">
            Explore handcrafted gifts specially curated for Birthdays, Friendship Day, Anniversaries, Compliment Gifts, Valentine's Day, and Long Distance surprises.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {CATEGORY_INFOS.map((cat, index) => (
            <motion.div
              key={cat.name}
              onClick={() => handleCollectionClick(cat)}
              className="group bg-white rounded-xl border border-brand-pink/20 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col relative"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <div className="h-32 overflow-hidden relative">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-maroon/10 group-hover:bg-brand-maroon/0 transition-colors" />
                {cat.badge && (
                  <span className="absolute top-2.5 right-2.5 bg-brand-rose text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                    {cat.badge}
                  </span>
                )}
              </div>
              <div className="p-3.5 flex-1 flex flex-col bg-brand-cream/10 border-t border-brand-pink/10">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-base text-brand-maroon group-hover:text-brand-rose transition-colors flex items-center gap-1.5">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </h3>
                </div>
                <span className="text-[10px] text-gray-400 mt-0.5 font-medium">{cat.count}</span>
                <span className="text-[11px] text-brand-rose/90 font-medium font-sans mt-2 pt-1 border-t border-dashed border-brand-pink/20">{cat.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2.5 SHOP BY OCCASION SECTION */}
      <section className="bg-gradient-to-b from-brand-blush/40 to-white py-12 border-t border-brand-pink/15" id="occasions-section">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-brand-rose font-bold text-xs uppercase tracking-widest bg-white px-3.5 py-1 rounded-full shadow-sm mb-1.5 border border-brand-pink/20">
              <Sparkles size={13} className="text-brand-gold animate-pulse" />
              <span>Gifting Made Thoughtful</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-brand-maroon tracking-tight">
              Shop Gifts by Occasion
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-1.5 font-sans">
              Find the perfect token crafted for every special moment, celebration, and heartfelt gesture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Birthday */}
            <motion.div
              onClick={() => {
                updateFilters({ occasions: ['Birthday'], categories: [], search: '' });
                setSearchQuery('');
                setPage('shop');
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-5 border border-brand-pink/20 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-100/60 to-transparent rounded-bl-full pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl mb-3 border border-amber-200 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  🎂
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-maroon group-hover:text-brand-rose transition-colors flex items-center gap-1">
                  Birthday Gifts
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-sans">
                  Custom music LED frames, magic heat-sensitive mugs, and birthday hampers to make their day extra special.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-rose group-hover:text-brand-maroon">
                <span>Explore Birthday Gifts</span>
                <span>→</span>
              </div>
            </motion.div>

            {/* Friendship Day */}
            <motion.div
              onClick={() => {
                updateFilters({ occasions: ['Friendship Day'], categories: [], search: '' });
                setSearchQuery('');
                setPage('shop');
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-5 border border-brand-pink/20 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-teal-100/60 to-transparent rounded-bl-full pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-2xl mb-3 border border-teal-200 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                  🤝
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-maroon group-hover:text-brand-rose transition-colors flex items-center gap-1">
                  Friendship Day
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-sans">
                  Interlocking bestie charm bracelets, matching pair keychains, and royal marble mug sets for your true ride-or-die.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-rose group-hover:text-brand-maroon">
                <span>Explore Bestie Gifts</span>
                <span>→</span>
              </div>
            </motion.div>

            {/* Anniversary */}
            <motion.div
              onClick={() => {
                updateFilters({ occasions: ['Anniversary'], categories: [], search: '' });
                setSearchQuery('');
                setPage('shop');
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-5 border border-brand-pink/20 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-rose-100/60 to-transparent rounded-bl-full pointer-events-none" />
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl mb-3 border border-rose-200 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                  💍
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-maroon group-hover:text-brand-rose transition-colors flex items-center gap-1">
                  Anniversary Gifts
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-sans">
                  24K gold preserved rose domes, engraved coordinate bracelets, and luxury wine & chocolate hampers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-rose group-hover:text-brand-maroon">
                <span>Explore Anniversary Gifts</span>
                <span>→</span>
              </div>
            </motion.div>

            {/* Compliment Gifts */}
            <motion.div
              onClick={() => {
                updateFilters({ occasions: ['Compliment Gifts'], categories: [], search: '' });
                setSearchQuery('');
                setPage('shop');
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-5 border border-brand-rose/30 shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden ring-2 ring-brand-gold/30"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-100/80 to-transparent rounded-bl-full pointer-events-none" />
              <div className="absolute top-3 right-3 bg-brand-gold text-brand-maroon text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Popular
              </div>
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mb-3 border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  💌
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-maroon group-hover:text-brand-rose transition-colors flex items-center gap-1">
                  Compliment Gifts
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-sans">
                  Heartwarming 30-note affirmation jars, personalized appreciation plaques, and cheerful mood-boosting tokens.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-brand-rose group-hover:text-brand-maroon">
                <span>Explore Compliment Gifts</span>
                <span>→</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Bestsellers Row */}
      <section className="bg-brand-blush/60 py-12 border-t border-b border-brand-pink/15" id="bestsellers-row">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="inline-flex items-center gap-1 text-brand-rose font-bold text-xs uppercase tracking-widest bg-white py-1 px-3 rounded-full shadow-sm mb-1">
                <Award size={12} className="text-brand-gold fill-brand-gold animate-spin-slow" />
                <span>Top Customer Loves</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-maroon tracking-tight">
                FavWish Bestsellers
              </h2>
            </div>
            <button
              onClick={() => {
                updateFilters({ categories: [] });
                setPage('shop');
              }}
              className="text-xs md:text-sm text-brand-rose hover:text-brand-wine font-semibold flex items-center gap-1 hover:underline cursor-pointer bg-white px-3.5 py-1.5 rounded-lg border border-brand-pink/20 shadow-sm"
            >
              See All Gifts →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Middle Connection Banner Accent */}
      <section className="w-full bg-gradient-to-r from-rose-100/90 via-pink-100/80 to-amber-50 text-gray-900 py-14 relative overflow-hidden border-y border-rose-200/80 shadow-2xs" id="countdown-banner">
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10 flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center border border-rose-200 shadow-sm">
            <Gift size={32} className="fill-rose-500 text-rose-500 animate-pulse" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-rose-950 tracking-tight leading-snug">
            Celebrate Your Timeless Connections
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-xl font-medium">
            Create completely custom coordinates bracelets, illuminated acrylic song bases, and gold preserved roses that stand the test of time. 
          </p>
          <div className="flex items-center gap-3 bg-white/90 py-3.5 px-6 rounded-2xl border border-rose-200 shadow-xs text-xs md:text-sm font-semibold text-gray-800">
            <span className="text-amber-700 font-bold">Use coupon:</span>
            <span className="bg-rose-500 text-white py-0.5 px-3 rounded-lg font-mono font-bold tracking-wider shadow-2xs">GIFT20</span>
            <span className="text-gray-600">for 20% off plus free elegant packaging!</span>
          </div>
          <button 
            onClick={() => {
              updateFilters({ categories: [] });
              setPage('shop');
            }}
            className="mt-2 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-7 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Create Your Custom Gift Now
          </button>
        </div>
      </section>

      {/* 4. New Arrivals Row */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 w-full" id="new-arrivals-row">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1 text-brand-rose font-bold text-xs uppercase tracking-widest bg-brand-blush py-1 px-3 rounded-full mb-1">
              <Sparkles size={12} className="text-brand-gold animate-pulse" />
              <span>Newly Unveiled Tokens</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-maroon tracking-tight">
              Fresh New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              updateFilters({ categories: [] });
              setPage('shop');
            }}
            className="text-xs md:text-sm text-brand-rose hover:text-brand-wine font-semibold flex items-center gap-1 hover:underline cursor-pointer bg-white px-3.5 py-1.5 rounded-lg border border-brand-pink/20 shadow-sm"
          >
            Explore What's New →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. Customer Testimonials & Reviews */}
      <section className="bg-brand-cream border-t border-brand-pink/15 py-14" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1 text-brand-rose font-bold text-xs uppercase tracking-widest bg-brand-blush px-3.5 py-1 rounded-full border border-brand-pink/20">
              <Gift size={14} />
              <span>Real Customer Stories</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-maroon tracking-tight mt-1.5">
              Loved by Friends & Families Everywhere
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto mt-1.5 font-sans">
              Thousands of special ones have found custom, beautiful tokens of their journey. Here is a glimpse of their joy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REVIEWS_TESTIMONIALS.map((t) => (
              <motion.div
                key={t.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-brand-pink/10 relative flex flex-col gap-3 justify-between"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex gap-0.5 text-brand-gold">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} className="fill-brand-gold" />
                  ))}
                </div>
                
                <p className="text-xs text-gray-600 italic leading-relaxed font-sans flex-1">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-brand-pink/20 flex items-center justify-center font-serif text-brand-rose font-bold text-xs">
                    {t.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-maroon leading-tight">{t.user}</h4>
                    <span className="text-[10px] text-gray-400 block">{t.location} • <strong className="text-brand-rose">{t.date}</strong></span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// Extracted reuseable ProductCard Component for Amazon styling but warmer premium aesthetics
export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { viewProduct, toggleWishlist, isInWishlist } = useApp();
  const liked = isInWishlist(product.id);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <motion.div
      className="group bg-white rounded-xl overflow-hidden border border-rose-100/90 shadow-2xs hover:shadow-md hover:border-rose-300 transition-all duration-300 flex flex-col justify-between"
      whileHover={{ scale: 1.015 }}
      id={`product-card-${product.id}`}
    >
      <div className="relative overflow-hidden aspect-square bg-gray-50">
        {/* Top Badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1.5">
          {product.bestSeller && (
            <span className="bg-amber-500 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
              Bestseller
            </span>
          )}
          {product.newArrival && (
            <span className="bg-rose-600 text-white font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
              New
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-rose-500 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-2xs">
              -{discountPercentage}% Off
            </span>
          )}
        </div>

        {/* Wishlist floating toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-400 hover:text-rose-500 transition-all shadow-2xs cursor-pointer"
        >
          <Gift size={16} className={liked ? 'fill-rose-500 text-rose-500' : ''} />
        </button>

        {/* Main Hover Scale Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          onClick={() => viewProduct(product.id)}
          loading="lazy"
        />

        {/* Personalized text indicator overlay */}
        {product.engravingAvailable && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-center">
            <span className="text-[10px] text-amber-200 font-semibold tracking-wide flex items-center justify-center gap-1">
              ✐ Free Custom Engraving Available
            </span>
          </div>
        )}
      </div>

      {/* Details Box */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold font-sans block mb-1">
            {product.category}
          </span>

          {/* Title */}
          <h3
            onClick={() => viewProduct(product.id)}
            className="font-serif font-bold text-sm text-gray-900 group-hover:text-rose-600 transition-colors line-clamp-2 cursor-pointer leading-tight h-10 mb-1"
          >
            {product.name}
          </h3>

          {/* Rating Stars */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-500 font-semibold font-mono">
              {product.rating} ({product.reviewsCount})
            </span>
          </div>
        </div>

        <div>
          {/* Price & original with strikethrough */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-base font-bold text-rose-700 font-mono">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through font-mono">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Direct CTA */}
          <button
            onClick={() => viewProduct(product.id)}
            className="w-full bg-rose-50 hover:bg-rose-500 text-rose-800 hover:text-white font-bold text-xs py-2 rounded-lg border border-rose-200/80 hover:border-rose-500 transition-all cursor-pointer text-center shadow-2xs"
          >
            Customize & Shop
          </button>
        </div>
      </div>
    </motion.div>
  );
};
