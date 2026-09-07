import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './Homepage';
import { Star, Grid, List, RefreshCw, X, SlidersHorizontal, Gift } from 'lucide-react';
import { CATEGORIES, OCCASIONS } from '../data/products';
import { Product } from '../types';

export const ProductListing: React.FC = () => {
  const {
    products,
    filters,
    activeSort,
    viewMode,
    updateFilters,
    resetFilters,
    setActiveSort,
    setViewMode,
    viewProduct
  } = useApp();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter products based on current active settings
  const filteredProducts = products.filter(product => {
    // 1. Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false;
    }
    // 2. Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    // 3. Rating filter
    if (filters.rating !== null && product.rating < filters.rating) {
      return false;
    }
    // 4. Occasion filter
    if (filters.occasions.length > 0) {
      const matchOccasion = filters.occasions.some(occ => {
        const targetOcc = occ.toLowerCase();
        const pOcc = product.occasion ? product.occasion.toLowerCase() : '';
        const inOcc = pOcc.includes(targetOcc) || targetOcc.includes(pOcc);
        const inCat = product.category ? product.category.toLowerCase().includes(targetOcc) : false;
        const inName = product.name ? product.name.toLowerCase().includes(targetOcc) : false;
        const inDesc = product.description ? product.description.toLowerCase().includes(targetOcc) : false;
        return inOcc || inCat || inName || inDesc;
      });
      if (!matchOccasion) return false;
    }
    // 5. Search query filter
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const inName = product.name.toLowerCase().includes(query);
      const inDesc = product.description.toLowerCase().includes(query);
      const inCat = product.category.toLowerCase().includes(query);
      const inOcc = product.occasion ? product.occasion.toLowerCase().includes(query) : false;
      if (!inName && !inDesc && !inCat && !inOcc) {
        return false;
      }
    }
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (activeSort === 'price-low') {
      return a.price - b.price;
    }
    if (activeSort === 'price-high') {
      return b.price - a.price;
    }
    if (activeSort === 'newest') {
      // simulate b.id - a.id or specific code since id might be string, b1 etc.
      return b.newArrival === a.newArrival ? 0 : b.newArrival ? 1 : -1;
    }
    // Default popularity / rating
    return b.rating - a.rating || b.reviewsCount - a.reviewsCount;
  });

  // Toggle category select
  const handleCategoryToggle = (cat: string) => {
    const isAlreadySelected = filters.categories.includes(cat);
    const newCategories = isAlreadySelected
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    updateFilters({ categories: newCategories });
  };

  // Toggle occasion select
  const handleOccasionToggle = (occ: string) => {
    const isAlreadySelected = filters.occasions.includes(occ);
    const newOccasions = isAlreadySelected
      ? filters.occasions.filter(o => o !== occ)
      : [...filters.occasions, occ];
    updateFilters({ occasions: newOccasions });
  };

  // Clear single category tag
  const removeCategoryTag = (cat: string) => {
    updateFilters({ categories: filters.categories.filter(c => c !== cat) });
  };

  // Clear single occasion tag
  const removeOccasionTag = (occ: string) => {
    updateFilters({ occasions: filters.occasions.filter(o => o !== occ) });
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.occasions.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 4000 ||
    filters.rating !== null ||
    filters.search !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 flex flex-col lg:flex-row gap-8" id="product-listing-page">
      {/* LEFT SIDEBAR FILTERS (DESKTOP) */}
      <aside className="hidden lg:block w-64 bg-white p-6 rounded-xl shadow-2xs border border-rose-100/80 shrink-0 h-fit self-start sticky top-32">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <h2 className="font-serif font-bold text-lg text-rose-900 flex items-center gap-1.5">
            <SlidersHorizontal size={16} className="text-rose-500" /> Filter Registry
          </h2>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
            >
              <RefreshCw size={10} /> Clear All
            </button>
          )}
        </div>

        {/* Categories Checkbox Filter */}
        <div className="mb-6">
          <h3 className="text-xs uppercase font-montserrat tracking-wider font-bold text-gray-800 mb-3">Departments</h3>
          <div className="flex flex-col gap-2.5">
            {CATEGORIES.map(cat => (
              <label key={cat} className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-rose-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                  className="rounded text-rose-500 focus:ring-rose-400 w-4 h-4 border-rose-200 cursor-pointer accent-rose-500"
                />
                <span className={filters.categories.includes(cat) ? 'font-semibold text-rose-700' : ''}>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Occasions Checkbox Filter */}
        <div className="mb-6">
          <h3 className="text-xs uppercase font-montserrat tracking-wider font-bold text-gray-800 mb-3">Love Occasions</h3>
          <div className="flex flex-col gap-2.5">
            {OCCASIONS.map(occ => (
              <label key={occ} className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-rose-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.occasions.includes(occ)}
                  onChange={() => handleOccasionToggle(occ)}
                  className="rounded text-rose-500 focus:ring-rose-400 w-4 h-4 border-rose-200 cursor-pointer accent-rose-500"
                />
                <span className={filters.occasions.includes(occ) ? 'font-semibold text-rose-700' : ''}>{occ}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Slider Filter */}
        <div className="mb-6 pb-6 border-b border-gray-100">
          <h3 className="text-xs uppercase font-montserrat tracking-wider font-bold text-gray-800 mb-3">Max Price</h3>
          <div className="flex flex-col gap-2">
            <input
              type="range"
              min="0"
              max="4000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilters({ priceRange: [filters.priceRange[0], parseFloat(e.target.value)] })}
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between items-center text-xs text-gray-500 font-mono mt-1">
              <span>₹0</span>
              <span className="text-rose-700 font-bold font-mono">₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating Stars Filter */}
        <div>
          <h3 className="text-xs uppercase font-montserrat tracking-wider font-bold text-gray-800 mb-3">Minimum Rating</h3>
          <div className="flex flex-col gap-2">
            {[4.5, 4.0, 3.5].map(rating => (
              <button
                key={rating}
                onClick={() => updateFilters({ rating: filters.rating === rating ? null : rating })}
                className={`flex items-center gap-1.5 text-xs text-left cursor-pointer transition-colors ${filters.rating === rating ? 'text-rose-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
              >
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={13}
                      className={i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <span>& Up ({rating})</span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* RIGHT PRODUCT DISPLAY SECTION */}
      <section className="flex-1 flex flex-col gap-4">
        {/* QUICK OCCASION FILTER BAR */}
        <div className="bg-white p-3 rounded-xl border border-brand-pink/15 shadow-sm flex items-center overflow-x-auto gap-2 scrollbar-none">
          <span className="text-[11px] font-bold text-brand-maroon uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Gift size={13} className="text-brand-rose" /> Quick Occasions:
          </span>
          <button
            onClick={() => updateFilters({ occasions: [], categories: [], search: '' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 ${filters.occasions.length === 0 ? 'bg-brand-maroon text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-brand-blush hover:text-brand-wine'}`}
          >
            All Occasions
          </button>
          <button
            onClick={() => {
              if (filters.occasions.includes('Birthday') && filters.occasions.length === 1) {
                updateFilters({ occasions: [] });
              } else {
                updateFilters({ occasions: ['Birthday'], categories: [], search: '' });
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 flex items-center gap-1 ${filters.occasions.includes('Birthday') ? 'bg-brand-rose text-white shadow-sm font-bold' : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200/60'}`}
          >
            🎂 Birthday
          </button>
          <button
            onClick={() => {
              if (filters.occasions.includes('Friendship Day') && filters.occasions.length === 1) {
                updateFilters({ occasions: [] });
              } else {
                updateFilters({ occasions: ['Friendship Day'], categories: [], search: '' });
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 flex items-center gap-1 ${filters.occasions.includes('Friendship Day') ? 'bg-brand-rose text-white shadow-sm font-bold' : 'bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200/60'}`}
          >
            🤝 Friendship Day
          </button>
          <button
            onClick={() => {
              if (filters.occasions.includes('Anniversary') && filters.occasions.length === 1) {
                updateFilters({ occasions: [] });
              } else {
                updateFilters({ occasions: ['Anniversary'], categories: [], search: '' });
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 flex items-center gap-1 ${filters.occasions.includes('Anniversary') ? 'bg-brand-rose text-white shadow-sm font-bold' : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200/60'}`}
          >
            💍 Anniversary
          </button>
          <button
            onClick={() => {
              if (filters.occasions.includes('Compliment Gifts') && filters.occasions.length === 1) {
                updateFilters({ occasions: [] });
              } else {
                updateFilters({ occasions: ['Compliment Gifts'], categories: [], search: '' });
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 flex items-center gap-1 ${filters.occasions.includes('Compliment Gifts') ? 'bg-brand-rose text-white shadow-sm font-bold' : 'bg-purple-50 text-purple-800 hover:bg-purple-100 border border-purple-200/60'}`}
          >
            💌 Compliment Gifts
          </button>
          <button
            onClick={() => {
              if (filters.occasions.includes('Long Distance') && filters.occasions.length === 1) {
                updateFilters({ occasions: [] });
              } else {
                updateFilters({ occasions: ['Long Distance'], categories: [], search: '' });
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 flex items-center gap-1 ${filters.occasions.includes('Long Distance') ? 'bg-brand-rose text-white shadow-sm font-bold' : 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60'}`}
          >
            ✈️ Long Distance
          </button>
          <button
            onClick={() => {
              if (filters.categories.includes('Teddy Bears') && filters.categories.length === 1) {
                updateFilters({ categories: [] });
              } else {
                updateFilters({ categories: ['Teddy Bears'], occasions: [], search: '' });
              }
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all shrink-0 flex items-center gap-1 ${filters.categories.includes('Teddy Bears') ? 'bg-brand-rose text-white shadow-sm font-bold' : 'bg-pink-50 text-pink-800 hover:bg-pink-100 border border-pink-200/60'}`}
          >
            🧸 Teddy Bears
          </button>
        </div>

        {/* TOP STATUS BAR: Results description, toggle, sorting */}
        <div className="bg-white p-4 rounded-xl border border-brand-pink/15 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-gray-500">
            {filters.search ? (
              <span>
                Showing <strong className="text-brand-maroon">{filteredProducts.length}</strong> results for "
                <strong className="text-brand-rose">{filters.search}</strong>"
              </span>
            ) : filters.categories.length > 0 ? (
              <span>
                Showing <strong className="text-brand-maroon">{filteredProducts.length}</strong> gifts in{' '}
                <strong className="text-brand-rose">{filters.categories.join(', ')}</strong>
              </span>
            ) : (
              <span>
                Showing <strong className="text-brand-maroon">{filteredProducts.length}</strong> luxurious romance gifts
              </span>
            )}
          </div>

          <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
            {/* Sorting Selection */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Sort:</span>
              <select
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value as any)}
                className="bg-brand-blush text-brand-dark text-xs px-3 py-1.5 rounded-lg border border-brand-pink/20 cursor-pointer font-medium focus:outline-none focus:ring-1 focus:ring-brand-rose"
              >
                <option value="popularity">Popularity / Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>

            {/* Grid vs List layout switcher */}
            <div className="h-6 w-[1px] bg-gray-200"></div>
            <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-white text-brand-wine shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                title="Grid View"
              >
                <Grid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-white text-brand-wine shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                title="List View"
              >
                <List size={15} />
              </button>
            </div>

            {/* Mobile Filters trigger (Floating button layout helper) */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-1 bg-brand-maroon text-white px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer"
            >
              <SlidersHorizontal size={12} /> Filters
            </button>
          </div>
        </div>

        {/* ACTIVE FILTER CHIPS (Tags that can be individually cleared) */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 items-center text-xs">
            <span className="text-gray-400 font-semibold">Active Tags:</span>
            {filters.search && (
              <span className="bg-brand-rose/10 border border-brand-rose/30 text-brand-rose px-2 py-0.5 rounded-md flex items-center gap-1 font-medium font-sans">
                Search: "{filters.search}"
                <X size={12} className="cursor-pointer hover:text-brand-maroon" onClick={() => updateFilters({ search: '' })} />
              </span>
            )}
            {filters.categories.map(cat => (
              <span key={cat} className="bg-brand-rose/10 border border-brand-rose/30 text-brand-rose px-2 py-0.5 rounded-md flex items-center gap-1 font-medium font-sans">
                {cat}
                <X size={12} className="cursor-pointer hover:text-brand-maroon" onClick={() => removeCategoryTag(cat)} />
              </span>
            ))}
            {filters.occasions.map(occ => (
              <span key={occ} className="bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-2 py-0.5 rounded-md flex items-center gap-1 font-medium font-sans">
                {occ}
                <X size={12} className="cursor-pointer hover:text-brand-maroon" onClick={() => removeOccasionTag(occ)} />
              </span>
            ))}
            {filters.priceRange[1] < 4000 && (
              <span className="bg-gray-100 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-md flex items-center gap-1 font-medium font-mono">
                Under ₹{filters.priceRange[1]}
                <X size={12} className="cursor-pointer hover:text-brand-maroon" onClick={() => updateFilters({ priceRange: [filters.priceRange[0], 4000] })} />
              </span>
            )}
            {filters.rating !== null && (
              <span className="bg-brand-gold/10 border border-brand-gold/30 text-brand-gold px-2 py-0.5 rounded-md flex items-center gap-1 font-medium font-mono">
                {filters.rating}+ Stars
                <X size={12} className="cursor-pointer hover:text-brand-maroon" onClick={() => updateFilters({ rating: null })} />
              </span>
            )}
            <button
              onClick={resetFilters}
              className="text-[11px] text-brand-rose hover:underline cursor-pointer font-bold ml-1"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* PRODUCTS RENDER (GRID vs LIST) */}
        {sortedProducts.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-brand-pink/15 text-center shadow-sm flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 bg-brand-blush text-brand-rose rounded-full flex items-center justify-center border border-brand-pink/30">
              <SlidersHorizontal size={24} />
            </div>
            <h3 className="font-serif font-bold text-lg text-brand-maroon">No Gifts Match Your Search</h3>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              We couldn't find any products matching your specific combinations. Try resetting filters or searching with a broader query.
            </p>
            <button
              onClick={resetFilters}
              className="bg-brand-maroon hover:bg-brand-rose text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow transition-colors cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 animate-fadeIn">
            {sortedProducts.map(product => (
              <ListCard key={product.id} product={product} onViewProduct={viewProduct} />
            ))}
          </div>
        )}
      </section>

      {/* MOBILE FILTERS DRAWER / SLIDE-OUT OVERLAY */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex" id="mobile-filter-drawer">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)}></div>
          
          {/* Content container */}
          <div className="relative bg-white w-80 max-w-full h-full p-6 flex flex-col overflow-y-auto shadow-2xl z-10 animate-slideRight">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
              <h2 className="font-serif font-bold text-lg text-brand-maroon flex items-center gap-1.5">
                Filter Registry
              </h2>
              <button onClick={() => setMobileFiltersOpen(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            {/* Departments checkbox filter */}
            <div className="mb-6">
              <h3 className="text-xs uppercase font-montserrat tracking-wider font-bold text-brand-maroon mb-3">Departments</h3>
              <div className="flex flex-col gap-2.5">
                {CATEGORIES.map(cat => (
                  <label key={cat} className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-brand-wine cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="rounded text-brand-rose focus:ring-brand-rose w-4 h-4 border-brand-pink/45 cursor-pointer accent-brand-rose"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasions checkbox filter */}
            <div className="mb-6">
              <h3 className="text-xs uppercase font-montserrat tracking-wider font-bold text-brand-maroon mb-3">Love Occasions</h3>
              <div className="flex flex-col gap-2.5">
                {OCCASIONS.map(occ => (
                  <label key={occ} className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-brand-wine cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.occasions.includes(occ)}
                      onChange={() => handleOccasionToggle(occ)}
                      className="rounded text-brand-rose focus:ring-brand-rose w-4 h-4 border-brand-pink/45 cursor-pointer accent-brand-rose"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Max price filter */}
            <div className="mb-6 pb-6 border-b border-gray-100">
              <h3 className="text-xs uppercase font-montserrat tracking-wider font-bold text-brand-maroon mb-3">Max Price</h3>
              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="0"
                  max="4000"
                  step="100"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilters({ priceRange: [filters.priceRange[0], parseFloat(e.target.value)] })}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-rose"
                />
                <div className="flex justify-between items-center text-xs text-gray-500 font-mono mt-1">
                  <span>₹0</span>
                  <span className="text-brand-wine font-bold font-mono">₹{filters.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating stars filter */}
            <div className="mb-8">
              <h3 className="text-xs uppercase font-montserrat tracking-wider font-bold text-brand-maroon mb-3">Minimum Rating</h3>
              <div className="flex flex-col gap-2">
                {[4.5, 4.0, 3.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => updateFilters({ rating: filters.rating === rating ? null : rating })}
                    className={`flex items-center gap-1.5 text-xs text-left cursor-pointer transition-colors ${filters.rating === rating ? 'text-brand-rose font-bold' : 'text-gray-500'}`}
                  >
                    <div className="flex text-brand-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={13}
                          className={i < Math.floor(rating) ? 'fill-brand-gold text-brand-gold' : 'text-gray-200'}
                        />
                      ))}
                    </div>
                    <span>& Up ({rating})</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="bg-brand-maroon text-white font-bold py-3 rounded-lg text-xs tracking-wider uppercase mt-auto cursor-pointer text-center"
            >
              Apply Filter Selections
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Extracted ListCard component for Amazon horizontal search list style
interface ListCardProps {
  product: Product;
  onViewProduct: (id: string) => void;
}

const ListCard: React.FC<ListCardProps> = ({ product, onViewProduct }) => {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-brand-pink/15 shadow-sm hover:shadow-md hover:border-brand-pink/35 p-4 flex flex-col sm:flex-row gap-5 transition-all">
      {/* Product Image section */}
      <div className="w-full sm:w-48 aspect-square shrink-0 relative bg-gray-50 rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform"
          onClick={() => onViewProduct(product.id)}
        />
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.bestSeller && (
            <span className="bg-brand-gold text-brand-maroon font-bold text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
              Bestseller
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white font-bold text-[8px] px-1.5 py-0.5 rounded shadow-sm">
              -{discountPercentage}%
            </span>
          )}
        </div>
      </div>

      {/* Product Information block */}
      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          {/* Category */}
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{product.category}</span>
          
          {/* Product Title */}
          <h3
            onClick={() => onViewProduct(product.id)}
            className="font-serif font-bold text-base md:text-lg text-brand-maroon hover:text-brand-rose transition-colors cursor-pointer leading-snug mt-0.5"
          >
            {product.name}
          </h3>

          {/* Star reviews */}
          <div className="flex items-center gap-1.5 mt-1 mb-2">
            <div className="flex text-brand-gold">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={i < Math.floor(product.rating) ? 'fill-brand-gold' : 'text-gray-200'}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-500 font-mono font-bold">
              {product.rating} ({product.reviewsCount} verified reviews)
            </span>
          </div>

          {/* Description line */}
          <p className="text-xs text-gray-500 line-clamp-2 md:line-clamp-3 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Pricing and Action row */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-50 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-brand-wine font-mono">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through font-mono">₹{product.originalPrice}</span>
            )}
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
              In Stock
            </span>
          </div>

          <div className="flex items-center gap-2">
            {product.engravingAvailable && (
              <span className="text-[10px] text-brand-gold bg-brand-blush border border-brand-pink/20 px-2 py-1 rounded font-semibold">
                ✐ Custom Engraving
              </span>
            )}
            <button
              onClick={() => onViewProduct(product.id)}
              className="bg-brand-maroon hover:bg-brand-rose text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Shop & Engrave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
