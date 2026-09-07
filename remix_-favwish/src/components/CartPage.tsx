import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, ShoppingBag, ArrowLeft, Tag, ShieldCheck, Gift } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    setPage,
    viewProduct,
    promoApplied,
    applyPromo,
    removePromo
  } = useApp();

  const [promoCode, setPromoCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = promoApplied ? (subtotal * promoApplied.discountPercentage) / 100 : 0;
  
  // Free delivery over ₹999
  const shippingThreshold = 999;
  const shippingCost = subtotal >= shippingThreshold ? 0 : 99;
  const total = subtotal - discount + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const res = applyPromo(promoCode);
    setPromoFeedback(res);
    if (res.success) {
      setPromoCode('');
    }
  };

  const handleQtyChange = (itemId: string, change: number, currentQty: number) => {
    updateCartQuantity(itemId, currentQty + change);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center gap-6" id="empty-cart">
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center border border-rose-200 relative shadow-2xs">
          <ShoppingBag size={32} />
          <span className="absolute -top-1 -right-1 text-base text-rose-500 animate-bounce">🎁</span>
        </div>
        <div>
          <h2 className="font-serif font-bold text-2xl text-gray-900">Your Gifting Cart is Empty</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto mt-2 leading-relaxed font-sans">
            It looks like you haven't chosen any tokens of affection yet. Start exploring our personalized collections to surprise your favorite partner.
          </p>
        </div>
        <button
          onClick={() => setPage('shop')}
          className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold px-7 py-3 rounded-xl shadow-md transition-colors uppercase tracking-wider cursor-pointer"
        >
          Explore Gift Registry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8" id="cart-page-root">
      <h1 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 mb-8 flex items-center gap-2">
        🛒 Your Selected Gifts of Love
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: LIST OF CART ITEMS (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-4 md:p-6 flex flex-col gap-4">
            {cart.map(item => {
              const p = item.personalization;
              const hasOptions = p.selectedColor || p.selectedSize || p.engravingText;

              return (
                <div key={item.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0 flex flex-col sm:flex-row gap-4 justify-between">
                  {/* Left Block: Image & details */}
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-rose-100 cursor-pointer hover:opacity-90 shrink-0"
                      onClick={() => viewProduct(item.product.id)}
                    />
                    <div className="flex flex-col gap-1 max-w-md">
                      <h3
                        onClick={() => viewProduct(item.product.id)}
                        className="font-serif font-bold text-sm text-gray-900 hover:text-rose-600 cursor-pointer leading-snug line-clamp-2"
                      >
                        {item.product.name}
                      </h3>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">{item.product.category}</span>
                      
                      {/* Personalizations summaries */}
                      {hasOptions && (
                        <div className="mt-1.5 p-2 bg-rose-50/60 rounded-lg border border-rose-100 text-[11px] font-sans text-gray-800 flex flex-col gap-1">
                          {p.selectedColor && (
                            <span className="flex items-center gap-1">
                              <strong>Color Variant:</strong> {p.selectedColor}
                            </span>
                          )}
                          {p.selectedSize && (
                            <span>
                              <strong>Set Size:</strong> {p.selectedSize}
                            </span>
                          )}
                          {p.engravingText && (
                            <span className="text-rose-700 font-medium">
                              <strong>✐ Engraving:</strong> "{p.engravingText}"
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Block: Quantities & absolute price */}
                  <div className="flex sm:flex-col justify-between items-end gap-3 shrink-0">
                    <span className="text-sm font-bold text-rose-700 font-mono">
                      ₹{item.product.price * item.quantity}
                    </span>
                    
                    {/* Qty selectors */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 p-0.5">
                        <button
                          onClick={() => handleQtyChange(item.id, -1, item.quantity)}
                          className="p-1.5 text-gray-500 hover:text-rose-600 disabled:text-gray-300 cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-bold text-gray-900 font-mono">{item.quantity}</span>
                        <button
                          onClick={() => handleQtyChange(item.id, 1, item.quantity)}
                          className="p-1.5 text-gray-500 hover:text-rose-600 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Trash can delete */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Remove gift"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continue shopping trigger */}
          <button
            onClick={() => setPage('shop')}
            className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-bold self-start mt-2 hover:underline cursor-pointer bg-white px-4 py-2 rounded-lg border border-rose-200 shadow-2xs"
          >
            <ArrowLeft size={14} /> Continue Selecting Gifts
          </button>
        </div>

        {/* RIGHT COLUMN: PRICE BREAKDOWN & COUPON (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Coupon codes box */}
          <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-5 flex flex-col gap-3">
            <h3 className="font-serif font-bold text-sm text-gray-900 flex items-center gap-1">
              <Tag size={14} className="text-amber-500" /> Have a Coupon Registry?
            </h3>
            
            {promoApplied ? (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-xs flex items-center justify-between animate-fadeIn">
                <div className="text-gray-800">
                  <span className="font-bold block text-rose-600">{promoApplied.code} Applied</span>
                  Enjoying {promoApplied.discountPercentage}% entire discount.
                </div>
                <button
                  onClick={removePromo}
                  className="text-gray-400 hover:text-red-500 text-[11px] font-bold underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="e.g. COUPLE20"
                  className="flex-1 text-xs px-3 py-2 border border-rose-200 rounded-lg uppercase tracking-wider focus:outline-none focus:border-rose-400 font-mono"
                />
                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-2xs"
                >
                  Apply
                </button>
              </form>
            )}

            {promoFeedback && (
              <div className={`text-[10px] p-2 rounded-md ${promoFeedback.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                {promoFeedback.message}
              </div>
            )}
            <div className="text-[10px] text-gray-400">
              * Try <strong className="text-rose-600 font-mono">COUPLE20</strong> (20% off) or <strong className="text-rose-600 font-mono">FIRSTKISS</strong> (15% off).
            </div>
          </div>

          {/* Pricing summary totals breakdown */}
          <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-6 flex flex-col gap-4 text-xs font-sans">
            <h3 className="font-serif font-bold text-base text-gray-900 border-b border-gray-100 pb-3">
              Order Summary
            </h3>

            <div className="flex justify-between text-gray-500 font-mono">
              <span>Gift Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-rose-600 font-mono">
                <span>Lover Coupon Discount ({promoApplied.discountPercentage}%)</span>
                <span>-₹{Math.round(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-500 font-mono">
              <span>Standard Insured Delivery</span>
              {shippingCost === 0 ? (
                <span className="text-emerald-600 font-bold font-sans">FREE</span>
              ) : (
                <span>₹{shippingCost}</span>
              )}
            </div>

            {shippingCost > 0 && (
              <div className="bg-rose-50 border border-rose-200 p-2 rounded-lg text-[10px] text-rose-900 leading-relaxed font-sans">
                💡 Add <strong>₹{shippingThreshold - subtotal}</strong> more to your cart to unlock <strong>FREE WORLDWIDE SHIPPING!</strong>
              </div>
            )}

            <hr className="border-gray-100" />

            <div className="flex justify-between text-sm font-bold text-gray-900 font-mono">
              <span>Estimated Order Total</span>
              <span className="text-base text-rose-700">₹{Math.round(total)}</span>
            </div>

            <button
              onClick={() => setPage('checkout')}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-colors text-center shadow-md uppercase tracking-wider mt-2 cursor-pointer"
            >
              Proceed to Secure Checkout
            </button>

            {/* Guarantees column badges */}
            <div className="flex flex-col gap-2 border-t border-gray-50 pt-4 mt-2 text-[10px] text-gray-400 leading-normal">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-brand-gold shrink-0" />
                No real payments: fully simulated client-side sandbox
              </span>
              <span className="flex items-center gap-1.5">
                <Gift size={14} className="text-brand-rose shrink-0" />
                Includes free red ribbons & custom velvet envelope
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
