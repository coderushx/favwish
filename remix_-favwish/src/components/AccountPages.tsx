import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Trash2, Gift, ShoppingBag, MapPin, Sparkles, LogIn, Key, UserCheck, Clock, ShieldCheck, Mail, User, Phone, ShieldAlert, Eye, EyeOff } from 'lucide-react';
import { Address, Product } from '../types';
import { auth, db } from '../lib/firebase';
import { sendPasswordResetEmail, ActionCodeSettings } from 'firebase/auth';

export const AccountPages: React.FC = () => {
  const {
    currentUser,
    orders,
    addresses,
    wishlist,
    login,
    signup,
    loginWithGoogle,
    loginAsDemo,
    logout,
    updateUserProfile,
    deleteAddress,
    addAddress,
    toggleWishlist,
    addToCart,
    viewProduct,
    setPage,
    clearOrders
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('profile');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Form Fields for Login/Signup
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  // Profile Edit fields
  const [editingProfile, setEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser.name || '');
  const [editPhone, setEditPhone] = useState(currentUser.phone || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Form Fields for Address adding inside account
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [addressPhone, setAddressPhone] = useState('');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);
    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password;
    try {
      if (authMode === 'login') {
        await login(cleanEmail, cleanPassword);
      } else if (authMode === 'signup') {
        try {
          await signup(cleanEmail, cleanPassword, name.trim() || cleanEmail.split('@')[0] || 'Valued Lover');
        } catch (signupErr: any) {
          if (signupErr.code === 'auth/email-already-in-use') {
            // The account already exists. Check if the password they typed matches their existing account!
            try {
              await login(cleanEmail, cleanPassword);
              setPage('home');
              return;
            } catch {
              // Password did not match existing account, switch cleanly to login mode with helpful guidance
              setAuthMode('login');
              setAuthError(`This email (${cleanEmail}) is already registered! Please enter your password to Sign In, or click "Reset Password" below to receive a reset link.`);
              return;
            }
          }
          throw signupErr;
        }
      }
      setPage('home');
    } catch (error: any) {
      console.warn("Auth response:", error.code || error.message);
      let message = 'Authentication failed. Please check your credentials and try again.';
      switch (error.code) {
        case 'auth/invalid-api-key':
        case 'auth/api-key-not-valid':
          message = 'Firebase API Key is currently unconfigured (using placeholder config).\n\n' +
            '💡 Click "Log In as Demo User" below for instant 1-click access!';
          break;
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
        case 'auth/invalid-login-credentials':
          if (authMode === 'login') {
            message = 'Incorrect email or password. If you do not have an account yet, please click "Create New Account (Register)" below to register.';
          } else {
            message = 'Invalid credentials provided. Please check your email and password.';
          }
          break;
        case 'auth/user-not-found':
          message = 'No account registered with this email yet. Click "Create New Account (Register)" below to create your account.';
          break;
        case 'auth/email-already-in-use':
          setAuthMode('login');
          message = `This email (${cleanEmail}) is already registered! Please enter your password to Sign In, or click "Reset Password" below to receive a reset link.`;
          break;
        case 'auth/invalid-email':
          message = 'Please enter a valid email address (e.g. name@example.com).';
          break;
        case 'auth/unauthorized-domain':
          message = 'This domain is not yet on Firebase\'s Authorized Domains list for OAuth.\n\n💡 Please use Email/Password sign-in or click "Log In as Demo User" below for instant access!';
          break;
        case 'auth/operation-not-allowed':
          message = 'This sign-in method is currently disabled in your Firebase project console.\n\n💡 You can log in immediately using 1-click Demo User below!';
          break;
        case 'auth/weak-password':
          message = 'Password should be at least 6 characters long.';
          break;
        case 'auth/cancelled-popup-request':
        case 'auth/popup-closed-by-user':
          message = 'The sign-in popup was closed before completing.';
          break;
        case 'auth/popup-blocked':
          message = 'The sign-in popup was blocked by your browser. Please allow popups or use Email/Password sign-in.';
          break;
        default:
          message = error.message || message;
      }
      setAuthError(message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setAuthError('Please enter your email address above to receive a password reset link.');
      return;
    }
    setSendingReset(true);
    setAuthError(null);
    setResetSent(false);

    try {
      await sendPasswordResetEmail(auth, cleanEmail);
      setResetSent(true);
    } catch (err: any) {
      console.warn("Password reset error:", err.code || err.message);
      setAuthError("Failed to send password reset link: " + (err.message || 'Please check email address.'));
    } finally {
      setSendingReset(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    setProfileSaving(true);
    try {
      await updateUserProfile(editName.trim(), editPhone.trim());
      setProfileSaved(true);
      setEditingProfile(false);
      setTimeout(() => setProfileSaved(false), 3000);
    } catch (err) {
      console.error("Profile save error:", err);
    } finally {
      setProfileSaving(false);
    }
  };

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !streetAddress || !city || !state || !zipCode || !addressPhone) return;

    addAddress({
      name: fullName,
      street: streetAddress,
      city,
      state,
      zipCode,
      phone: addressPhone,
      isDefault: addresses.length === 0
    });

    // Reset Form
    setFullName('');
    setStreetAddress('');
    setCity('');
    setState('');
    setZipCode('');
    setAddressPhone('');
    setAddressFormOpen(false);
  };


  const handleWishlistAddToCart = (prod: Product) => {
    addToCart(prod, 1, {});
    alert(`${prod.name} added to your Cart!`);
  };

  // IF GUEST (NOT LOGGED IN), DISPLAY AUTH FORMS
  if (!currentUser.loggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 font-sans" id="auth-forms">
        <div className="bg-white rounded-2xl border border-rose-100 p-8 shadow-xl flex flex-col gap-6 relative overflow-hidden">
          {/* Romance decorative accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-rose-300 via-rose-500 to-amber-400"></div>

          <div className="text-center">
            <h2 className="font-serif font-bold text-2xl text-gray-900 tracking-tight">
              {authMode === 'login' ? 'Welcome to FavWish Registry' : 'Create Account'}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {authMode === 'login' ? 'Sign in to access your saved gifts, track delivery, and compile your wishlist.' : 'Register to unlock tarnish-free plating guarantees and save address profiles.'}
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-gray-100 p-1 rounded-xl text-xs font-semibold text-gray-600">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setAuthError(null); }}
              className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${authMode === 'login' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'hover:text-gray-900'}`}
            >
              <Mail size={13} /> Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setAuthError(null); }}
              className={`py-2 px-1 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${authMode === 'signup' ? 'bg-white text-gray-900 shadow-2xs font-bold' : 'hover:text-gray-900'}`}
            >
              <User size={13} /> Register
            </button>
          </div>

          {authError && (
            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-lg flex flex-col gap-2.5 text-xs text-rose-800 leading-relaxed whitespace-pre-line shadow-2xs animate-fadeIn">
              <div className="font-bold flex items-center gap-1.5 text-rose-900">
                <ShieldAlert size={14} className="shrink-0 text-rose-600" /> Authentication Notice
              </div>
              <p>{authError}</p>
              
              <div className="border-t border-rose-200/50 pt-2.5 mt-1 flex flex-col gap-2">
                <p className="text-[10px] text-rose-700 font-medium">Quick Actions:</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  {authMode === 'login' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => {
                          setAuthError(null);
                          setAuthMode('signup');
                          if (!name && email) {
                            const suggestedName = email.split('@')[0];
                            setName(suggestedName.charAt(0).toUpperCase() + suggestedName.slice(1));
                          }
                        }}
                        className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-semibold py-1.5 px-3 rounded text-[11px] transition-colors cursor-pointer text-center"
                      >
                        → Create New Account (Register)
                      </button>
                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        disabled={sendingReset}
                        className="flex-1 bg-white border border-rose-300 text-rose-600 hover:bg-rose-50 font-semibold py-1.5 px-3 rounded text-[11px] transition-colors cursor-pointer text-center"
                      >
                        {sendingReset ? 'Sending...' : 'Reset Password'}
                      </button>
                    </>
                  ) : authMode === 'signup' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setAuthError(null);
                        setAuthMode('login');
                      }}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-1.5 px-3 rounded text-[11px] transition-colors cursor-pointer text-center"
                    >
                      → Switch to Sign In
                    </button>
                  ) : null}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setAuthError(null);
                    loginAsDemo();
                    setPage('home');
                  }}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-3 rounded-lg transition-colors text-xs flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer mt-1"
                >
                  <Sparkles size={13} className="animate-pulse" />
                  <span>Log In as Demo User (Instant Access)</span>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 text-xs animate-fadeIn">
              {authMode === 'signup' && (
                <div className="flex flex-col gap-1">
                  <label className="text-gray-400 font-semibold uppercase text-[10px]">Your Name / Registry Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah & Alex"
                      className="w-full px-3.5 py-2.5 pl-9 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400"
                    />
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-gray-400 font-semibold uppercase text-[10px]">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="love@favwish.com"
                    className="w-full px-3.5 py-2.5 pl-9 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 font-mono"
                  />
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label className="text-gray-400 font-semibold uppercase text-[10px]">Password</label>
                  {authMode === 'login' && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={sendingReset}
                      className="text-[10px] text-rose-600 hover:text-rose-800 underline cursor-pointer font-medium"
                    >
                      {sendingReset ? 'Sending reset link...' : 'Forgot password?'}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 pl-9 pr-10 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400"
                  />
                  <Key size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-300" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer p-1 rounded-md focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {resetSent && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-lg text-xs flex flex-col gap-1 animate-fadeIn">
                  <span className="font-bold flex items-center gap-1">
                    <ShieldCheck size={14} className="text-emerald-600" /> Password Reset Email Sent!
                  </span>
                  <span>We sent a password reset link to <strong>{email}</strong>. Please check your email inbox (and spam folder) to set a new password.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-400 text-white font-bold py-3 rounded-xl transition-colors shadow-md mt-2 cursor-pointer text-center uppercase tracking-wider flex items-center justify-center gap-2"
              >
                {authLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{authMode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
                )}
              </button>
            </form>

          {/* Google Authentication & Demo Option */}
          <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 mt-2 animate-fadeIn">
            <div className="text-center text-[10px] text-gray-400 font-semibold uppercase tracking-widest">
              — Or Connect Instantly —
            </div>
            
            <button
              type="button"
              onClick={async () => {
                try {
                  setAuthError(null);
                  await loginWithGoogle();
                  setPage('home');
                } catch (err: any) {
                  console.warn("Google auth response:", err.code || err.message);
                  if (err.code === 'auth/popup-closed-by-user' || err.code === 'auth/cancelled-popup-request') {
                    setAuthError('Google sign-in popup was closed or cancelled.');
                  } else if (err.code === 'auth/popup-blocked') {
                    setAuthError('Google sign-in popup was blocked by browser. Please allow popups or use Demo Sign-In.');
                  } else if (err.code === 'auth/operation-not-allowed') {
                    setAuthError('Google Sign-In is pending activation in Firebase Console. Click "Log In as Demo User" below to continue instantly!');
                  } else if (err.code === 'auth/unauthorized-domain') {
                    setAuthError('This domain is not on Firebase\'s Authorized Domains list for Google OAuth.\n\n💡 Please use Email/Password sign-in or click "Log In as Demo User" below for instant access!');
                  } else if (err.code === 'auth/invalid-api-key' || err.message?.includes('API key not valid')) {
                    setAuthError('Firebase API Key is currently unconfigured (using placeholder config).\n\n💡 Click "Log In as Demo User" below for instant 1-click access!');
                  } else {
                    setAuthError("Google Sign-In notice: " + (err.message || 'Please try again or use Demo Sign-In.'));
                  }
                }
              }}
              className="w-full flex items-center justify-center gap-2.5 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold py-2.5 rounded-xl transition-colors shadow-2xs cursor-pointer text-xs"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.62-.62-1.05-1.37-1.42-2.17z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthError(null);
                loginAsDemo();
                setPage('home');
              }}
              className="w-full flex items-center justify-center gap-2 bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 font-bold py-2.5 rounded-xl transition-all shadow-2xs cursor-pointer text-xs"
            >
              <Sparkles size={14} className="text-rose-500" />
              <span>Log In as Demo User (Instant Access)</span>
            </button>
          </div>

          {/* Form switcher toggle link */}
          <div className="text-center text-xs text-gray-500 border-t border-gray-100 pt-4 mt-2">
            {authMode === 'login' ? (
              <span>
                New to FavWish?{' '}
                <button
                  onClick={() => { setAuthMode('signup'); setAuthError(null); }}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have a profile?{' '}
                <button
                  onClick={() => { setAuthMode('login'); setAuthError(null); }}
                  className="text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // LOGGED IN VIEW WITH PROFILE DASHBOARDS
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 font-sans" id="account-dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left menu navigation bar (3 cols on lg) */}
        <div className="lg:col-span-3 bg-white p-6 rounded-xl border border-rose-100 shadow-2xs h-fit self-start flex flex-col gap-4">
          <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-serif text-lg font-bold">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <strong className="block text-gray-900 text-sm leading-snug">{currentUser.name}</strong>
              <span className="text-[10px] text-gray-400 block leading-none">{currentUser.email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs">
            <button
              onClick={() => setActiveSubTab('profile')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold cursor-pointer transition-all flex items-center gap-2 ${activeSubTab === 'profile' ? 'bg-rose-500 text-white shadow-2xs' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700'}`}
            >
              <UserCheck size={14} /> My Registry Profile
            </button>
            <button
              onClick={() => setActiveSubTab('orders')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold cursor-pointer transition-all flex items-center gap-2 ${activeSubTab === 'orders' ? 'bg-rose-500 text-white shadow-2xs' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700'}`}
              id="orders-tab"
            >
              <Clock size={14} /> Gift Order History ({orders.length})
            </button>
            <button
              onClick={() => setActiveSubTab('addresses')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold cursor-pointer transition-all flex items-center gap-2 ${activeSubTab === 'addresses' ? 'bg-rose-500 text-white shadow-2xs' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700'}`}
            >
              <MapPin size={14} /> Saved Delivery Addresses ({addresses.length})
            </button>
            <button
              onClick={() => setActiveSubTab('wishlist')}
              className={`w-full text-left px-3 py-2.5 rounded-xl font-bold cursor-pointer transition-all flex items-center gap-2 ${activeSubTab === 'wishlist' ? 'bg-rose-500 text-white shadow-2xs' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700'}`}
              id="wishlist-tab"
            >
              <Gift size={14} /> Gifting Wishlist ({wishlist.length})
            </button>
          </div>

          <button
            onClick={() => {
              logout();
              setPage('home');
            }}
            className="w-full text-center border border-red-200 text-red-600 hover:bg-red-50 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors mt-4"
          >
            Sign Out Profile
          </button>
        </div>

        {/* Right workspace panels (9 cols on lg) */}
        <div className="lg:col-span-9 flex flex-col gap-6">
          {/* TAB 1: PROFILE SUMMARY */}
          {activeSubTab === 'profile' && (
            <div className="bg-white rounded-xl border border-brand-pink/15 shadow-sm p-6 flex flex-col gap-5 animate-fadeIn" id="profile-section">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h2 className="font-serif font-bold text-lg text-gray-900 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500 animate-pulse" /> Your Special Ones Registry Profile
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setEditName(currentUser.name || '');
                    setEditPhone(currentUser.phone || '');
                    setEditingProfile(!editingProfile);
                  }}
                  className="text-xs font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer"
                >
                  {editingProfile ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {profileSaved && (
                <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold p-2.5 rounded-lg border border-emerald-200 animate-fadeIn">
                  ✓ Profile updated successfully!
                </div>
              )}

              {editingProfile ? (
                <form onSubmit={handleSaveProfile} className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex flex-col gap-3 text-xs">
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-500 font-bold uppercase text-[10px]">Your Name / Registry Name</label>
                    <input
                      type="text"
                      required
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="px-3.5 py-2 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-gray-500 font-bold uppercase text-[10px]">Phone Number</label>
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="px-3.5 py-2 border border-rose-200 rounded-lg focus:outline-none focus:border-rose-400 bg-white font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={profileSaving}
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-5 rounded-xl self-start transition-colors cursor-pointer mt-1 shadow-2xs"
                  >
                    {profileSaving ? 'Saving...' : 'Save Profile Changes'}
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-gray-500 leading-normal">
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Registry Name</span>
                      <strong className="block text-gray-900 text-sm font-semibold mt-0.5">{currentUser.name}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Primary Contact / Email</span>
                      <strong className="block text-gray-900 text-sm font-semibold mt-0.5">{currentUser.email || 'Phone verified profile'}</strong>
                    </div>
                    {currentUser.phone && (
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase">Phone Number</span>
                        <strong className="block text-gray-900 text-sm font-semibold font-mono mt-0.5">{currentUser.phone}</strong>
                      </div>
                    )}
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">Registry Status</span>
                      <strong className="block text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
                        <ShieldCheck size={14} className="text-emerald-600" /> VIP Special Ones Member ({currentUser.uid === 'demo-user-id' ? 'Demo Mode' : 'Verified'})
                      </strong>
                    </div>
                  </div>

                  <div className="bg-rose-50/50 p-4 rounded-xl border border-rose-100 flex flex-col gap-3">
                    <h4 className="font-serif font-bold text-gray-900 text-xs flex items-center gap-1">
                      💝 Your VIP Perks
                    </h4>
                    <ul className="list-disc pl-4 flex flex-col gap-2 text-gray-600">
                      <li>Lifetime tarnish-free plating exchange guarantees.</li>
                      <li>Free diamond-point manual calligraphy engraving.</li>
                      <li>Priority custom box wrapping on all seasonal dispatch.</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ORDER HISTORY */}
          {activeSubTab === 'orders' && (
            <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-6 flex flex-col gap-5 animate-fadeIn" id="orders-section">
              <h2 className="font-serif font-bold text-lg text-gray-900 border-b border-gray-100 pb-3 flex justify-between items-center">
                <span>🎁 Gift Order History</span>
                <button
                  onClick={clearOrders}
                  className="text-[10px] bg-red-50 text-red-600 hover:bg-red-100 font-bold px-3 py-1 rounded-full cursor-pointer"
                >
                  Clear History
                </button>
              </h2>

              {orders.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center justify-center gap-3">
                  <Clock size={36} className="text-gray-300" />
                  <p className="text-xs text-gray-500">You haven't placed any gift orders yet.</p>
                  <button
                    onClick={() => setPage('shop')}
                    className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Shop Bestsellers
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {orders.map(ord => (
                    <div key={ord.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-2xs">
                      {/* Top ribbon stats */}
                      <div className="bg-rose-50/50 p-3 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Ordered on</span>
                            <span className="font-semibold text-gray-900">{ord.date}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Total Price</span>
                            <span className="font-semibold text-rose-700 font-mono">₹{ord.total.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-gray-400 font-bold uppercase block">Shipped To</span>
                            <span className="font-semibold text-gray-900 truncate max-w-xs block">{ord.address.name}</span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] text-gray-400 font-bold uppercase block text-right">Order ID</span>
                          <span className="font-mono font-bold text-rose-600">{ord.id}</span>
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="p-4 flex flex-col gap-3 bg-white text-xs text-gray-600">
                        {ord.items.map((item, idx) => (
                          <div key={idx} className="flex gap-3 justify-between items-center pb-3 last:pb-0 last:border-0 border-b border-gray-50">
                            <div className="flex gap-3 items-center">
                              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded border border-gray-100" />
                              <div className="max-w-md">
                                <strong className="block text-gray-900 font-serif text-sm leading-snug">{item.name}</strong>
                                <span className="text-[10px] text-gray-400 block mt-0.5">Quantity: {item.quantity}</span>
                                {item.personalizationText && (
                                  <span className="text-[10px] text-rose-600 block font-semibold mt-0.5">✐ {item.personalizationText}</span>
                                )}
                              </div>
                            </div>
                            <span className="font-semibold font-mono text-gray-600 shrink-0">₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Bottom shipping tracker */}
                      <div className="bg-gray-50/50 p-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-1.5 text-gray-500 font-mono">
                          <span>Tracker:</span>
                          <strong className="text-gray-900">{ord.trackingNumber}</strong>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 uppercase font-bold">Courier Status</span>
                          <span className="bg-rose-500 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeSubTab === 'addresses' && (
            <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-6 flex flex-col gap-5 animate-fadeIn" id="addresses-section">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h2 className="font-serif font-bold text-lg text-gray-900">
                  📍 Saved Lover Address Profiles
                </h2>
                <button
                  onClick={() => setAddressFormOpen(!addressFormOpen)}
                  className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold py-1.5 px-4 rounded-xl cursor-pointer transition-colors shadow-2xs"
                >
                  {addressFormOpen ? 'Cancel' : '+ Add Address'}
                </button>
              </div>

              {/* Add address Form */}
              {addressFormOpen && (
                <form onSubmit={handleCreateAddress} className="bg-rose-50/50 p-5 rounded-xl border border-rose-100 flex flex-col gap-3 text-xs">
                  <h3 className="font-serif font-semibold text-gray-900 text-xs uppercase tracking-wider">New Saved Address Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 font-bold uppercase text-[9px]">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Juliet Capulet"
                        className="px-3.5 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-400"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 font-bold uppercase text-[9px]">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={addressPhone}
                        onChange={(e) => setAddressPhone(e.target.value)}
                        placeholder="+1 (555) 786-1212"
                        className="px-3.5 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-gray-400 font-bold uppercase text-[9px]">Street Address</label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="88 Rose Garden Terrace"
                      className="px-3.5 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-400"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 font-bold uppercase text-[9px]">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New York"
                        className="px-3.5 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-400"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 font-bold uppercase text-[9px]">State</label>
                      <input
                        type="text"
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="NY"
                        className="px-3.5 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-400"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-gray-400 font-bold uppercase text-[9px]">Zip Code</label>
                      <input
                        type="text"
                        required
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="10014"
                        className="px-3.5 py-2 border border-rose-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-rose-400 font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-5 rounded-xl transition-colors cursor-pointer self-start shadow-2xs"
                  >
                    Save Address Profile
                  </button>
                </form>
              )}

              {/* Grid of addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map(addr => (
                  <div
                    key={addr.id}
                    className="border border-gray-100 p-4 rounded-xl relative flex flex-col justify-between"
                  >
                    <div className="text-xs text-gray-500 leading-normal flex flex-col gap-0.5">
                      <span className="font-bold text-gray-900 text-sm flex items-center gap-1.5 mb-1">
                        {addr.name}
                        {addr.isDefault && (
                          <span className="bg-amber-100/80 text-amber-800 text-[8px] px-1.5 py-0.2 rounded border border-amber-200 uppercase font-bold tracking-wider">
                            Default
                          </span>
                        )}
                      </span>
                      <span>{addr.street}</span>
                      <span>{addr.city}, {addr.state} {addr.zipCode}</span>
                      <span>Phone: {addr.phone}</span>
                    </div>

                    <div className="border-t border-gray-50 pt-3 mt-3 flex justify-end">
                      <button
                        onClick={() => deleteAddress(addr.id)}
                        className="text-[11px] text-red-600 hover:text-red-800 font-bold flex items-center gap-1 cursor-pointer"
                        title="Delete address profile"
                      >
                        <Trash2 size={13} /> Delete Address
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WISHLIST */}
          {activeSubTab === 'wishlist' && (
            <div className="bg-white rounded-xl border border-rose-100 shadow-2xs p-6 flex flex-col gap-5 animate-fadeIn" id="wishlist-section">
              <h2 className="font-serif font-bold text-lg text-gray-900 border-b border-gray-100 pb-3">
                🎁 Your Saved Gifting Wishlist
              </h2>

              {wishlist.length === 0 ? (
                <div className="text-center py-10 flex flex-col items-center justify-center gap-3">
                  <Gift size={36} className="text-gray-300" />
                  <p className="text-xs text-gray-500">Your love wishlist is currently empty.</p>
                  <button
                    onClick={() => setPage('shop')}
                    className="bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer"
                  >
                    Find Beautiful Gifts
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlist.map(product => (
                    <div
                      key={product.id}
                      className="border border-rose-100 rounded-xl overflow-hidden p-3 bg-white flex flex-col justify-between"
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover cursor-pointer"
                          onClick={() => viewProduct(product.id)}
                        />
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white text-rose-500 transition-all shadow-2xs cursor-pointer"
                          title="Remove from list"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>

                      <div className="mt-3 text-xs flex-1 flex flex-col justify-between gap-2">
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold block">{product.category}</span>
                          <strong
                            onClick={() => viewProduct(product.id)}
                            className="font-serif block text-gray-900 hover:text-rose-600 mt-0.5 font-bold cursor-pointer leading-snug line-clamp-2 h-9"
                          >
                            {product.name}
                          </strong>
                        </div>

                        <div className="flex flex-col gap-2">
                          <span className="font-mono text-rose-700 font-bold text-sm block">₹{product.price.toFixed(2)}</span>
                          <button
                            onClick={() => handleWishlistAddToCart(product)}
                            className="w-full bg-rose-50 hover:bg-rose-500 text-rose-700 hover:text-white font-bold py-2 rounded-xl border border-rose-200 transition-colors cursor-pointer text-center"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
