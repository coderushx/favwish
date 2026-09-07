import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Star, ShieldCheck, Gift, Truck, HelpCircle, ChevronRight, Minus, Plus, AlertCircle } from 'lucide-react';
import { ProductCard } from './Homepage';

export const ProductDetail: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setPage,
    viewProduct
  } = useApp();

  const product = products.find(p => p.id === selectedProductId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="text-brand-rose mx-auto mb-4" />
        <h2 className="font-serif font-bold text-2xl text-brand-maroon">Product Not Found</h2>
        <p className="text-sm text-gray-500 mt-2 mb-6">The requested love token was not found in our registry.</p>
        <button
          onClick={() => setPage('shop')}
          className="bg-brand-maroon text-white text-xs font-bold px-6 py-2.5 rounded-lg hover:bg-brand-rose transition-colors"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  // State managers
  const [activeImage, setActiveImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [engravingText, setEngravingText] = useState('');
  const [activeTab, setActiveTab] = useState<'desc' | 'specs' | 'shipping' | 'reviews'>('desc');
  const [localReviews, setLocalReviews] = useState(product.reviews);
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Sync state if product changes
  useEffect(() => {
    setActiveImage(product.image);
    setQuantity(1);
    setSelectedSize(product.sizes?.[0] || '');
    setSelectedColor(product.colors?.[0]?.name || '');
    setEngravingText('');
    setLocalReviews(product.reviews);
    setReviewSuccess(false);
  }, [product]);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const liked = isInWishlist(product.id);

  // Cart operations
  const handleAddToCart = () => {
    addToCart(product, quantity, {
      engravingText: product.engravingAvailable ? engravingText : undefined,
      selectedSize: product.sizeAvailable ? selectedSize : undefined,
      selectedColor: product.colorAvailable ? selectedColor : undefined
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setPage('checkout');
  };

  // Mock Review Submit
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      user: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      verified: true
    };

    setLocalReviews(prev => [newRev, ...prev]);
    setReviewName('');
    setReviewComment('');
    setReviewSuccess(true);
  };

  // Filter recommendations (from same category, excluding current product)
  const recommendations = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8" id="product-detail-page">
      {/* Breadcrumb row */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
        <span className="hover:text-brand-rose cursor-pointer" onClick={() => setPage('home')}>Home</span>
        <ChevronRight size={12} />
        <span className="hover:text-brand-rose cursor-pointer" onClick={() => setPage('shop')}>Registry Catalog</span>
        <ChevronRight size={12} />
        <span className="text-gray-900 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main product setup: Gallery left, Personalizer right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Gallery column (4 cols on lg) */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="aspect-square w-full rounded-2xl overflow-hidden border border-rose-100/90 bg-white relative">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white font-bold text-xs py-1 px-2.5 rounded shadow-2xs">
                Save {discountPercentage}%
              </span>
            )}
          </div>

          {/* Thumbnails row */}
          <div className="flex gap-3 justify-center">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${activeImage === img ? 'border-rose-500 shadow-xs' : 'border-transparent opacity-75 hover:opacity-100'}`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Configurations Column (7 cols on lg) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div>
            <span className="text-xs text-rose-700 font-bold uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80">
              {product.category}
            </span>
            <h1 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 mt-3 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & reviews counts */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 font-mono font-bold">
                {product.rating} ({localReviews.length} Love reviews)
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Standard Stock Ready
              </span>
            </div>
          </div>

          {/* Pricing Grid details */}
          <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-rose-700 font-mono">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through font-mono">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <span className="text-xs text-rose-600 font-bold bg-rose-100/80 border border-rose-200 py-1 px-2.5 rounded-lg animate-pulse">
                You Save ₹{product.originalPrice - product.price} ({discountPercentage}%)
              </span>
            )}
          </div>

          <p className="text-xs text-gray-600 leading-relaxed font-sans">
            {product.description}
          </p>

          <hr className="border-gray-100" />

          {/* CUSTOMIZABLE PERSONALIZATION BOX */}
          <div className="bg-white p-5 rounded-xl border border-rose-100 shadow-2xs flex flex-col gap-4">
            <h3 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-1">
              ✐ Personalize Your Love Token
            </h3>

            {/* Color selection circles */}
            {product.colorAvailable && product.colors && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex justify-between">
                  <span>1. Select Color Theme:</span>
                  <span className="text-rose-600 font-bold lowercase">{selectedColor}</span>
                </span>
                <div className="flex gap-2">
                  {product.colors.map(col => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer relative flex items-center justify-center ${selectedColor === col.name ? 'border-rose-500 scale-110 shadow-xs' : 'border-gray-200 hover:border-rose-300'}`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    >
                      {selectedColor === col.name && (
                        <span className="w-2 h-2 rounded-full bg-white shadow-2xs border border-black/10"></span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection chips */}
            {product.sizeAvailable && product.sizes && (
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex justify-between">
                  <span>2. Select Size Set:</span>
                  <span className="text-rose-600 font-bold lowercase">{selectedSize}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(sz => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${selectedSize === sz ? 'bg-rose-500 text-white border-rose-500 shadow-2xs' : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-rose-200'}`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Engraving Input Text */}
            {product.engravingAvailable && (
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex justify-between items-center">
                  <span>3. Custom Metal Engraving:</span>
                  <span className={`font-mono text-[10px] ${engravingText.length > 20 ? 'text-rose-600 font-bold' : 'text-gray-400'}`}>
                    {engravingText.length}/25 Chars
                  </span>
                </label>
                <input
                  type="text"
                  maxLength={25}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="e.g. Juliet & Romeo 07/26"
                  className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-rose-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 bg-rose-50/30 text-gray-900 font-semibold tracking-wide"
                />
                <span className="text-[10px] text-gray-400 leading-normal">
                  * Handcrafted precision mechanical diamond tipped engraving. Free tarnish-resistant service!
                </span>
              </div>
            )}
          </div>

          {/* QUANTITY & ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-rose-200 rounded-lg p-1 bg-white shadow-2xs w-full sm:w-auto shrink-0 justify-between">
              <button
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                className="p-2 text-gray-700 hover:text-rose-600 disabled:text-gray-300 cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="px-5 text-sm font-bold text-gray-900 font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity(prev => prev + 1)}
                className="p-2 text-gray-700 hover:text-rose-600 cursor-pointer"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Direct CTA Buttons */}
            <div className="flex gap-3 w-full">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-white hover:bg-rose-50 text-rose-700 font-bold text-xs py-3.5 rounded-xl border-2 border-rose-300 transition-all shadow-2xs cursor-pointer text-center uppercase tracking-wider"
              >
                Add To Cart
              </button>
              
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md cursor-pointer text-center uppercase tracking-wider"
              >
                Buy Now
              </button>
              
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3 rounded-lg border border-brand-pink/30 transition-all flex items-center justify-center cursor-pointer ${liked ? 'bg-brand-rose/10 text-brand-rose border-brand-rose/30' : 'bg-white text-gray-400 hover:text-brand-rose hover:bg-brand-blush'}`}
                title="Save to Wishlist"
              >
                <Gift size={18} className={liked ? 'fill-brand-rose' : ''} />
              </button>
            </div>
          </div>

          {/* Compact Trust Features */}
          <div className="grid grid-cols-3 gap-2 text-center mt-3 border-t border-gray-100 pt-4">
            <div className="flex flex-col items-center gap-1">
              <Truck size={16} className="text-brand-rose" />
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Free Shipping</span>
              <span className="text-[9px] text-gray-400">On Orders over ₹999</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-l border-r border-gray-100">
              <ShieldCheck size={16} className="text-brand-gold" />
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Lover Secure</span>
              <span className="text-[9px] text-gray-400">100% Fine Platings</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Star size={16} className="text-emerald-500 fill-emerald-500" />
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Top Vetted</span>
              <span className="text-[9px] text-gray-400">4.8+ Core Ratings</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS: Description, Specs, Shipping, reviews */}
      <section className="bg-white rounded-2xl border border-brand-pink/15 shadow-sm overflow-hidden mb-12" id="details-tabs">
        {/* Tab Headers */}
        <div className="flex border-b border-gray-100 bg-brand-cream/30 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('desc')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${activeTab === 'desc' ? 'border-brand-rose text-brand-wine bg-white' : 'border-transparent text-gray-400 hover:text-brand-wine'}`}
          >
            Romantic Story
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${activeTab === 'specs' ? 'border-brand-rose text-brand-wine bg-white' : 'border-transparent text-gray-400 hover:text-brand-wine'}`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('shipping')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${activeTab === 'shipping' ? 'border-brand-rose text-brand-wine bg-white' : 'border-transparent text-gray-400 hover:text-brand-wine'}`}
          >
            Gift Wrap & Delivery
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-xs font-bold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${activeTab === 'reviews' ? 'border-brand-rose text-brand-wine bg-white' : 'border-transparent text-gray-400 hover:text-brand-wine'}`}
          >
            Lover Reviews ({localReviews.length})
          </button>
        </div>

        {/* Tab contents */}
        <div className="p-6 md:p-8 text-xs leading-relaxed text-gray-600">
          {activeTab === 'desc' && (
            <div className="flex flex-col gap-4 max-w-3xl font-sans">
              <p className="text-sm italic font-serif text-brand-rose font-medium">"An exquisite, tangible narrative of matching hearts."</p>
              <p>Designed specifically to bind distance and time, {product.name} is one of our flagship handcrafted masterpieces. Ideal for anniversaries, engagements, weddings, long-distance relationships, or romantic "just because" milestones.</p>
              <p>We source only high-density, hypoallergenic alloys, high-fired, non-lead stoneware, or 24k gold leaf and real South American preserved flora, ensuring your premium gift retains its luster over decades. When customizing, our professional calligraphers use traditional diamond-point friction tips to etch names or dates with deep, enduring clarity.</p>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="max-w-2xl">
              <table className="w-full text-xs font-sans">
                <tbody>
                  {Object.entries(product.specifications).map(([key, val], index) => (
                    <tr key={key} className={index % 2 === 0 ? 'bg-brand-blush/25' : ''}>
                      <td className="py-2.5 px-4 font-bold text-brand-maroon w-1/3">{key}</td>
                      <td className="py-2.5 px-4 text-gray-600">{val}</td>
                    </tr>
                  ))}
                  <tr>
                    <td className="py-2.5 px-4 font-bold text-brand-maroon w-1/3">Plating Guarantee</td>
                    <td className="py-2.5 px-4 text-gray-600">Lifetime tarnish-free plating guarantee. Will not discolor skin.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'shipping' && (
            <div className="flex flex-col gap-4 max-w-3xl font-sans">
              <div className="flex items-center gap-2 text-brand-maroon font-bold text-sm">
                <Truck size={16} className="text-brand-rose" /> Swift Worldwide Premium Express
              </div>
              <p>We pack each item with extreme care inside a custom satin ribboned gift box lined with velvet and a beautiful blank romantic greeting card for you to write your words of affection.</p>
              <ul className="list-disc pl-5 flex flex-col gap-2 mt-2">
                <li><strong>India Domestic Delivery:</strong> 2-4 business days (Standard free over ₹999).</li>
                <li><strong>Worldwide Tracked Shipping:</strong> 5-9 business days (₹99 standard, free over ₹999).</li>
                <li><strong>Express Shipping Option:</strong> Next-day dispatch with 2-day delivery guarantee.</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
              {/* Summary Left */}
              <div className="lg:col-span-4 bg-brand-blush/30 p-5 rounded-xl border border-brand-pink/15 self-start flex flex-col gap-3">
                <h4 className="text-brand-maroon font-bold text-sm">Lover Rating</h4>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-brand-wine font-mono">{product.rating}</span>
                  <span className="text-xs text-gray-400">out of 5 stars</span>
                </div>
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 block mt-1">100% of these reviews have been verified through verified purchases.</span>
              </div>

              {/* List & Form Right */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Submit New Review */}
                <div className="bg-white p-4 rounded-xl border border-brand-pink/20 shadow-inner">
                  <h4 className="text-brand-maroon font-bold text-xs uppercase tracking-wider mb-3">✎ Add Your Couple Review</h4>
                  
                  {reviewSuccess ? (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3.5 rounded-lg text-center animate-fadeIn">
                      <span className="font-semibold block mb-0.5">Thank you! Your couple review is published!</span>
                      Your sweet testimonial has been posted in real-time.
                    </div>
                  ) : (
                    <form onSubmit={handleReviewSubmit} className="flex flex-col gap-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Your Names (e.g. Juliet & Romeo)</label>
                          <input
                            type="text"
                            required
                            value={reviewName}
                            onChange={(e) => setReviewName(e.target.value)}
                            placeholder="Alex & Sam"
                            className="text-xs px-3 py-2 border border-brand-pink/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-rose"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Lover Rating</label>
                          <select
                            value={reviewRating}
                            onChange={(e) => setReviewRating(parseInt(e.target.value))}
                            className="text-xs px-3 py-2 border border-brand-pink/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-rose bg-white"
                          >
                            <option value={5}>5 Stars (Excellent)</option>
                            <option value={4}>4 Stars (Very Good)</option>
                            <option value={3}>3 Stars (Good)</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Your Words of Joy</label>
                        <textarea
                          required
                          rows={3}
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          placeholder="How did this gift make you both feel? Tell your romantic experience..."
                          className="text-xs px-3 py-2 border border-brand-pink/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-rose"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-brand-maroon hover:bg-brand-rose text-white text-xs font-semibold py-2 px-5 rounded-lg transition-colors cursor-pointer self-end"
                      >
                        Publish Review 🎁
                      </button>
                    </form>
                  )}
                </div>

                {/* Reviews List */}
                <div className="flex flex-col gap-4">
                  {localReviews.map(rev => (
                    <div key={rev.id} className="pb-4 border-b border-gray-100 flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-brand-maroon text-xs">{rev.user}</span>
                        <span className="text-[10px] text-gray-400 font-mono font-bold">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex text-brand-gold">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              className={i < rev.rating ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}
                            />
                          ))}
                        </div>
                        {rev.verified && (
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                            ✓ Verified Couple
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* YOU MAY ALSO LIKE CAROUSEL */}
      {recommendations.length > 0 && (
        <section id="recommendations">
          <h2 className="font-serif font-bold text-xl md:text-2xl text-brand-maroon tracking-tight mb-6 flex items-center gap-1.5">
            🎁 Matching Pairs & Bundles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
