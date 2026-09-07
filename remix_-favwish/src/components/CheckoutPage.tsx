import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Address, Order } from '../types';
import { ShieldCheck, Gift, Truck, CreditCard, ChevronRight, CheckCircle2, MapPin, Sparkles, AlertCircle } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    addresses,
    addAddress,
    placeOrder,
    setPage,
    promoApplied,
    currentUser
  } = useApp();

  // Address State Selection
  const defaultAddr = addresses.find(a => a.isDefault) || addresses[0];
  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultAddr?.id || 'new');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [placedOrderDetails, setPlacedOrderDetails] = useState<Order | null>(null);

  // New Address Form fields
  const [fullName, setFullName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phone, setPhone] = useState('');
  const [saveAsDefault, setSaveAsDefault] = useState(false);

  // Payment form states (fully mock)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = promoApplied ? (subtotal * promoApplied.discountPercentage) / 100 : 0;
  const shippingCost = subtotal >= 999 ? 0 : 99;
  const total = subtotal - discount + shippingCost;

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !streetAddress || !city || !state || !zipCode || !phone) return;

    const newAddr: Omit<Address, 'id'> = {
      name: fullName,
      street: streetAddress,
      city,
      state,
      zipCode,
      phone,
      isDefault: saveAsDefault
    };

    addAddress(newAddr);
    // Reset address form
    setFullName('');
    setStreetAddress('');
    setCity('');
    setState('');
    setZipCode('');
    setPhone('');
    setSaveAsDefault(false);
    
    // Auto select the newly added address (which will be the last one added)
    // To keep it simple, we can select the default or let it select itself.
  };

  const handlePlaceOrderSubmit = () => {
    let finalAddress = addresses.find(a => a.id === selectedAddressId);
    
    if (selectedAddressId === 'new') {
      if (!fullName || !streetAddress || !city || !state || !zipCode || !phone) {
        alert('Please complete the shipping address form first, or select a saved profile.');
        return;
      }
      // Implicitly add it
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        name: fullName,
        street: streetAddress,
        city,
        state,
        zipCode,
        phone,
        isDefault: false
      };
      finalAddress = newAddr;
    }

    if (!finalAddress) {
      alert('Please select or fill in a shipping address.');
      return;
    }

    const payMethodLabel = 
      paymentMethod === 'card' ? 'Visa •••• 4242' : 
      paymentMethod === 'upi' ? 'UPI (instant@couple)' : 'Cash on Delivery (COD)';

    const ord = placeOrder(finalAddress, payMethodLabel);
    setPlacedOrderDetails(ord);
  };

  // SUCCESS THANK YOU COMPONENT
  if (placedOrderDetails) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-fadeIn" id="success-screen">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-200 mx-auto mb-6 relative shadow-2xs">
          <CheckCircle2 size={40} className="stroke-2" />
          <span className="absolute -top-1 -right-1 text-lg text-rose-500 animate-pulse">🎁</span>
        </div>

        <h1 className="font-serif font-bold text-3xl text-gray-900 leading-tight">
          Your Love Story is Packaged!
        </h1>
        <p className="text-sm text-gray-500 max-w-lg mx-auto mt-2 leading-relaxed font-sans">
          Your order has been placed successfully. Our design artisans are hand-wrapping your customized gifts in luxury ribbons and preparing dispatch.
        </p>

        {/* Mock Delivery tracking dashboard */}
        <div className="mt-8 bg-white p-6 rounded-2xl border border-rose-100 shadow-2xs text-left max-w-xl mx-auto flex flex-col gap-4 font-sans text-xs">
          <div className="flex justify-between border-b border-gray-100 pb-3">
            <div>
              <span className="text-gray-400 font-semibold uppercase">Order Number</span>
              <strong className="block text-sm text-gray-900 mt-0.5">{placedOrderDetails.id}</strong>
            </div>
            <div className="text-right">
              <span className="text-gray-400 font-semibold uppercase">Tracking Number</span>
              <strong className="block text-sm text-rose-600 font-mono mt-0.5">{placedOrderDetails.trackingNumber}</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-400 font-semibold uppercase">Shipped To</span>
              <strong className="block text-gray-800 mt-1 leading-normal">
                {placedOrderDetails.address.name}<br />
                {placedOrderDetails.address.street}<br />
                {placedOrderDetails.address.city}, {placedOrderDetails.address.state} {placedOrderDetails.address.zipCode}
              </strong>
            </div>
            <div>
              <span className="text-gray-400 font-semibold uppercase">Estimated Arrival</span>
              <strong className="block text-emerald-600 text-sm font-bold mt-1">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </strong>
              <span className="text-[10px] text-gray-400 block mt-1">via Premium Insured Express Delivery</span>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 flex justify-between items-center bg-rose-50/50 p-3 rounded-lg border border-rose-100">
            <span className="text-gray-500 font-semibold flex items-center gap-1">
              <Truck size={14} className="text-rose-500" /> Status:
            </span>
            <span className="bg-rose-500 text-white font-bold py-0.5 px-2.5 rounded-full text-[10px] uppercase tracking-wide">
              {placedOrderDetails.status}
            </span>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-10">
          <button
            onClick={() => setPage('home')}
            className="bg-white hover:bg-rose-50 text-gray-800 font-bold text-xs px-6 py-3 rounded-xl border border-rose-200 transition-all uppercase tracking-wider cursor-pointer"
          >
            Back To Home
          </button>
          <button
            onClick={() => {
              setPage('account');
              setTimeout(() => {
                const el = document.getElementById('orders-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all uppercase tracking-wider cursor-pointer"
          >
            Track Order History
          </button>
        </div>
      </div>
    );
  }

  // EMPTY CHECKOUT PROTECTION
  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <AlertCircle size={48} className="text-rose-500 mx-auto mb-4" />
        <h2 className="font-serif font-bold text-2xl text-gray-900">Your Cart is Empty</h2>
        <p className="text-sm text-gray-500 mt-2 mb-6">You must select at least one romantic gift before checking out.</p>
        <button
          onClick={() => setPage('shop')}
          className="bg-rose-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-rose-600 transition-colors cursor-pointer"
        >
          Browse Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 font-sans" id="checkout-page-root">
      {/* Page Title */}
      <h1 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 mb-8 flex items-center gap-2">
        💝 Secure Romantic Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT CONFIGURATOR: Addresses, payments (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* STEP 1: SHIPPING ADDRESS */}
          <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-6 flex flex-col gap-4">
            <h2 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-sans font-bold">1</span>
              Shipping Registry Address
            </h2>

            {/* Pre-saved addresses radio grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
              {addresses.map(addr => (
                <label
                  key={addr.id}
                  className={`border p-4 rounded-xl cursor-pointer flex gap-3 transition-all relative ${selectedAddressId === addr.id ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-500' : 'border-gray-100 bg-gray-50/50 hover:border-rose-200'}`}
                >
                  <input
                    type="radio"
                    name="address-option"
                    checked={selectedAddressId === addr.id}
                    onChange={() => setSelectedAddressId(addr.id)}
                    className="mt-0.5 accent-rose-500 w-4 h-4"
                  />
                  <div className="text-xs text-gray-600 flex flex-col gap-0.5 leading-normal">
                    <span className="font-bold text-gray-900 text-sm flex items-center gap-1">
                      {addr.name}
                      {addr.isDefault && (
                        <span className="bg-amber-100/80 text-amber-800 text-[8px] px-1.5 py-0.2 rounded border border-amber-200 uppercase font-bold tracking-widest scale-90">
                          Default
                        </span>
                      )}
                    </span>
                    <span>{addr.street}</span>
                    <span>{addr.city}, {addr.state} {addr.zipCode}</span>
                    <span>Phone: {addr.phone}</span>
                  </div>
                </label>
              ))}

              {/* Radio card for typing a custom address */}
              <label
                className={`border p-4 rounded-xl cursor-pointer flex gap-3 transition-all ${selectedAddressId === 'new' ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-500' : 'border-gray-100 bg-gray-50/50 hover:border-rose-200'}`}
              >
                <input
                  type="radio"
                  name="address-option"
                  checked={selectedAddressId === 'new'}
                  onChange={() => setSelectedAddressId('new')}
                  className="mt-0.5 accent-rose-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-gray-900 text-sm block">Ship to a New Couple Address</span>
                  <span className="text-gray-400 mt-1 block">Add a different lover address below</span>
                </div>
              </label>
            </div>

            {/* New address form, only active/mandatory if 'new' is checked */}
            {selectedAddressId === 'new' && (
              <form onSubmit={handleAddNewAddress} className="border-t border-gray-100 pt-4 flex flex-col gap-3 animate-fadeIn text-xs">
                <h3 className="font-serif font-bold text-gray-900 text-xs uppercase tracking-wider">New Lover Address Fields</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 font-semibold uppercase text-[10px]">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Juliet Capulet"
                      className="px-3.5 py-2.5 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 font-semibold uppercase text-[10px]">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 786-1212"
                      className="px-3.5 py-2.5 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 font-mono"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 font-semibold uppercase text-[10px]">Street Address</label>
                  <input
                    type="text"
                    required
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. 14 Love Lane, Veronaville"
                    className="px-3.5 py-2.5 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 font-semibold uppercase text-[10px]">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Verona"
                      className="px-3.5 py-2.5 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 font-semibold uppercase text-[10px]">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="CA"
                      className="px-3.5 py-2.5 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 font-semibold uppercase text-[10px]">Zip Code</label>
                    <input
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="94103"
                      className="px-3.5 py-2.5 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 font-mono"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    checked={saveAsDefault}
                    onChange={(e) => setSaveAsDefault(e.target.checked)}
                    className="rounded text-rose-500 focus:ring-rose-500 w-4 h-4 border-rose-200 cursor-pointer accent-rose-500"
                    id="save-default-check"
                  />
                  <label htmlFor="save-default-check" className="text-xs text-gray-500 cursor-pointer">
                    Save this address to my Saved Profiles
                  </label>
                </div>

                <button
                  type="submit"
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 px-6 rounded-xl transition-colors cursor-pointer self-start shadow-2xs"
                >
                  Save Address Profile
                </button>
              </form>
            )}
          </div>

          {/* STEP 2: PAYMENT METHOD */}
          <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-6 flex flex-col gap-4">
            <h2 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center font-sans font-bold">2</span>
              Payment Settings (Simulated)
            </h2>

            <div className="flex flex-col gap-3">
              {/* Card option */}
              <label
                className={`border p-4 rounded-xl cursor-pointer flex items-start gap-3 transition-all ${paymentMethod === 'card' ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-500' : 'border-gray-100 bg-gray-50/50 hover:border-rose-200'}`}
              >
                <input
                  type="radio"
                  name="payment-option"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-1 accent-rose-500 w-4 h-4"
                />
                <div className="flex-1 text-xs">
                  <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    <CreditCard size={15} /> Credit / Debit Card
                  </span>
                  <span className="text-gray-400 block mt-0.5">Secure payment via instant mock gateway</span>

                  {/* Mock card input fields, expanded if card checked */}
                  {paymentMethod === 'card' && (
                    <div className="mt-4 grid grid-cols-3 gap-3 border-t border-rose-100 pt-4 animate-fadeIn">
                      <div className="col-span-3 flex flex-col gap-1">
                        <label className="text-[10px] text-gray-400 font-bold uppercase">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          className="px-3 py-2 border border-rose-200 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-400"
                        />
                      </div>
                      <div className="col-span-2 flex flex-col gap-1">
                        <label className="text-[10px] text-gray-400 font-bold uppercase">Expiry Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="px-3 py-2 border border-rose-200 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-400"
                        />
                      </div>
                      <div className="col-span-1 flex flex-col gap-1">
                        <label className="text-[10px] text-gray-400 font-bold uppercase">CVV</label>
                        <input
                          type="password"
                          maxLength={3}
                          required
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          className="px-3 py-2 border border-rose-200 rounded-lg text-xs font-mono focus:outline-none focus:border-rose-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>

              {/* UPI option */}
              <label
                className={`border p-4 rounded-xl cursor-pointer flex items-start gap-3 transition-all ${paymentMethod === 'upi' ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-500' : 'border-gray-100 bg-gray-50/50 hover:border-rose-200'}`}
              >
                <input
                  type="radio"
                  name="payment-option"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mt-1 accent-rose-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    📱 UPI (Instant QR Transfer)
                  </span>
                  <span className="text-gray-400 block mt-0.5">Pay instantly with any UPI app (Google Pay, Apple Pay)</span>
                  {paymentMethod === 'upi' && (
                    <div className="mt-3 text-[10px] bg-rose-50 border border-rose-200 text-gray-800 p-2.5 rounded-lg font-medium leading-normal animate-fadeIn">
                      ✓ Instant payment verification enabled. A QR code request will be dispatched to your mock UPI.
                    </div>
                  )}
                </div>
              </label>

              {/* COD option */}
              <label
                className={`border p-4 rounded-xl cursor-pointer flex items-start gap-3 transition-all ${paymentMethod === 'cod' ? 'border-rose-500 bg-rose-50/50 ring-1 ring-rose-500' : 'border-gray-100 bg-gray-50/50 hover:border-rose-200'}`}
              >
                <input
                  type="radio"
                  name="payment-option"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-rose-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    💵 Cash on Delivery (COD)
                  </span>
                  <span className="text-gray-400 block mt-0.5">Pay cash directly when our premium courier hands you the ribbon box</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT ORDER SUMMARY CONTAINER (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-6 flex flex-col gap-4 text-xs font-sans">
            <h3 className="font-serif font-bold text-base text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-1.5">
              Order Basket
            </h3>

            {/* List of items inside summary */}
            <div className="flex flex-col gap-3 max-h-56 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-2.5 items-center justify-between pb-2.5 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className="flex gap-2 items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded border border-gray-100" />
                    <div>
                      <strong className="block text-gray-900 line-clamp-1">{item.product.name}</strong>
                      <span className="text-[10px] text-gray-400 font-mono">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono text-gray-600 font-semibold shrink-0">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <hr className="border-gray-100" />

            <div className="flex justify-between text-gray-500 font-mono">
              <span>Registry Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-rose-600 font-mono">
                <span>Coupon ({promoApplied.code})</span>
                <span>-₹{Math.round(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-500 font-mono">
              <span>Standard Express Shipping</span>
              {shippingCost === 0 ? (
                <span className="text-emerald-600 font-bold font-sans">FREE</span>
              ) : (
                <span>₹{shippingCost}</span>
              )}
            </div>

            <hr className="border-gray-100" />

            <div className="flex justify-between text-sm font-bold text-gray-900 font-mono">
              <span>Grand Total</span>
              <span className="text-base text-rose-700">₹{Math.round(total)}</span>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrderSubmit}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-all text-center shadow-md uppercase tracking-wider mt-2 cursor-pointer"
            >
              Place Your Romantic Order 🎁
            </button>

            {/* Shield security information */}
            <div className="flex gap-2 items-start border-t border-gray-50 pt-4 mt-2 text-[10px] text-gray-400 leading-normal">
              <ShieldCheck size={16} className="text-amber-500 shrink-0 mt-0.5" />
              <span>
                By placing this order you acknowledge this is a fully simulated e-commerce application. No currency will be transacted. Enjoy this design experience!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
