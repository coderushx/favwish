import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Address, Order, Page, SortOption, FilterOptions, Personalization } from '../types';
import { MOCK_PRODUCTS } from '../data/products';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser, signInWithPopup, updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { auth, db, googleAuthProvider } from '../lib/firebase';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Notice: ', JSON.stringify(errInfo));
}

interface AppContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  page: Page;
  selectedProductId: string | null;
  searchQuery: string;
  filters: FilterOptions;
  activeSort: SortOption;
  viewMode: 'grid' | 'list';
  addresses: Address[];
  orders: Order[];
  currentUser: { name: string; email: string; loggedIn: boolean; uid?: string; phone?: string };
  promoApplied: { code: string; discountPercentage: number } | null;
  
  // Navigation & UI Actions
  setPage: (page: Page) => void;
  viewProduct: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setActiveSort: (sort: SortOption) => void;

  // Cart Actions
  addToCart: (product: Product, quantity: number, personalization: Personalization) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  clearOrders: () => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Wishlist Actions
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Filter Actions
  updateFilters: (updates: Partial<FilterOptions>) => void;
  resetFilters: () => void;

  // Address Actions
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;

  // Order Actions
  placeOrder: (address: Address, paymentMethod: string) => Promise<Order>;

  // Auth Actions
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginAsDemo: () => void;
  logout: () => Promise<void>;
  updateUserProfile: (name: string, phone?: string) => Promise<void>;
}

const defaultFilters: FilterOptions = {
  categories: [],
  priceRange: [0, 4000],
  rating: null,
  occasions: [],
  search: ''
};

const defaultAddresses: Address[] = [
  {
    id: 'addr-1',
    name: 'Romeo Montague',
    street: '14 Love Lane, Veronaville',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    phone: '+1 (555) 786-1212',
    isDefault: true
  },
  {
    id: 'addr-2',
    name: 'Juliet Capulet',
    street: '88 Rose Garden Terrace',
    city: 'New York',
    state: 'NY',
    zipCode: '10014',
    phone: '+1 (555) 434-2121',
    isDefault: false
  }
];

const defaultOrders: Order[] = [
  {
    id: 'ORD-849204',
    date: '2026-06-15',
    items: [
      {
        id: 'b1-red',
        name: 'Eternal Bond Magnetic Cord Bracelets (Set of 2)',
        price: 499,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop',
        personalizationText: 'Red & Black Set, engraved: "A & S"'
      }
    ],
    subtotal: 499,
    discount: 0,
    shipping: 0,
    total: 499,
    address: defaultAddresses[0],
    paymentMethod: 'Card Payment',
    status: 'Delivered',
    trackingNumber: 'TRK-983192042'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Global States
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fc_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('fc_wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [page, setPageState] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [searchQuery, setSearchQueryState] = useState('');
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [activeSort, setActiveSort] = useState<SortOption>('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [promoApplied, setPromoApplied] = useState<{ code: string; discountPercentage: number } | null>(null);

  // User States
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('fc_addresses');
    return saved ? JSON.parse(saved) : defaultAddresses;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('fc_orders');
    return saved ? JSON.parse(saved) : defaultOrders;
  });
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string; loggedIn: boolean; uid?: string; phone?: string }>(() => {
    const isDemo = localStorage.getItem('fc_demo_user') === 'true';
    if (isDemo) {
      return {
        name: 'Lovely Guest (Demo Mode)',
        email: 'demo@favwish.com',
        loggedIn: true,
        uid: 'demo-user-id'
      };
    }
    return { name: '', email: '', loggedIn: false };
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('fc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('fc_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('fc_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('fc_orders', JSON.stringify(orders));
  }, [orders]);

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User logged in via Firebase Auth
        localStorage.removeItem('fc_demo_user');
        
        let customName = user.displayName;
        let customPhone = user.phoneNumber;

        // Set loggedIn state IMMEDIATELY so the user is signed in with 0 delay!
        setCurrentUser({
          name: customName || user.email?.split('@')[0] || 'Valued Lover',
          email: user.email || (customPhone ? `phone:${customPhone}` : ''),
          loggedIn: true,
          uid: user.uid,
          phone: customPhone || ''
        });

        // Fetch additional profile data and orders in background asynchronously without blocking login
        (async () => {
          try {
            const userDocPromise = getDoc(doc(db, 'users', user.uid));
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 1500));
            const userDocSnap = await Promise.race([userDocPromise, timeoutPromise]) as any;

            if (userDocSnap && userDocSnap.exists()) {
              const data = userDocSnap.data();
              if (data.name) customName = data.name;
              if (data.phone) customPhone = data.phone;
              setCurrentUser(prev => ({
                ...prev,
                name: customName || prev.name,
                phone: customPhone || prev.phone
              }));
            }
          } catch (e) {
            console.warn("Could not fetch user profile doc from Firestore:", e);
          }

          try {
            const ordersRef = collection(db, 'users', user.uid, 'orders');
            const ordersPromise = getDocs(ordersRef);
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Firestore timeout')), 1500));
            const querySnapshot = await Promise.race([ordersPromise, timeoutPromise]) as any;

            const fetchedOrders: Order[] = [];
            if (querySnapshot && querySnapshot.forEach) {
              querySnapshot.forEach((doc: any) => {
                fetchedOrders.push(doc.data() as Order);
              });
            }
            if (fetchedOrders.length > 0) {
              setOrders(fetchedOrders);
            }
          } catch (error) {
            console.warn("Failed to fetch user orders from Firestore. Using local storage.", error);
          }
        })();
      } else {
        // User logged out of Firebase Auth
        const isDemo = localStorage.getItem('fc_demo_user') === 'true';
        if (isDemo) {
          setCurrentUser({
            name: 'Lovely Guest (Demo Mode)',
            email: 'demo@favwish.com',
            loggedIn: true,
            uid: 'demo-user-id'
          });
        } else {
          setCurrentUser({
            name: '',
            email: '',
            loggedIn: false
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Page Routing (Scroll to top on transition)
  const setPage = (newPage: Page) => {
    setPageState(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const viewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setPage('product');
  };

  const setSearchQuery = (query: string) => {
    setSearchQueryState(query);
    setFilters(prev => ({ ...prev, search: query }));
  };

  // Cart Management
  const addToCart = (product: Product, quantity: number, personalization: Personalization) => {
    setCart(prevCart => {
      // Create a unique key for the item based on ID and customization options
      const colorPart = personalization.selectedColor ? personalization.selectedColor : '';
      const sizePart = personalization.selectedSize ? personalization.selectedSize : '';
      const textPart = personalization.engravingText ? personalization.engravingText : '';
      const itemId = `${product.id}-${colorPart}-${sizePart}-${textPart}`;

      const existingIndex = prevCart.findIndex(item => item.id === itemId);

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      } else {
        return [...prevCart, {
          id: itemId,
          product,
          quantity,
          personalization
        }];
      }
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item => item.id === itemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
    setPromoApplied(null);
  };

  const clearOrders = () => {
    setOrders([]);
  };

  const applyPromo = (code: string) => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'COUPLE20') {
      setPromoApplied({ code: 'COUPLE20', discountPercentage: 20 });
      return { success: true, message: 'COUPLE20 code applied! Enjoy 20% off your entire order.' };
    }
    if (formatted === 'FIRSTKISS') {
      setPromoApplied({ code: 'FIRSTKISS', discountPercentage: 15 });
      return { success: true, message: 'FIRSTKISS code applied! Enjoy 15% off.' };
    }
    return { success: false, message: 'Invalid coupon code. Try COUPLE20 or FIRSTKISS.' };
  };

  const removePromo = () => {
    setPromoApplied(null);
  };

  // Wishlist Management
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  // Filters Management
  const updateFilters = (updates: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSearchQueryState('');
  };

  // Addresses Management
  const addAddress = (addr: Omit<Address, 'id'>) => {
    const id = `addr-${Date.now()}`;
    const newAddress: Address = { ...addr, id };
    
    setAddresses(prev => {
      if (newAddress.isDefault) {
        return prev.map(a => ({ ...a, isDefault: false })).concat(newAddress);
      }
      return [...prev, newAddress];
    });
  };

  const updateAddress = (updated: Address) => {
    setAddresses(prev => {
      let current = prev.map(a => a.id === updated.id ? updated : a);
      if (updated.isDefault) {
        current = current.map(a => a.id === updated.id ? a : { ...a, isDefault: false });
      }
      return current;
    });
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => {
      const filtered = prev.filter(a => a.id !== id);
      // If deleted default, set another as default
      if (filtered.length > 0 && !filtered.some(a => a.isDefault)) {
        filtered[0].isDefault = true;
      }
      return filtered;
    });
  };

  // Order Placement
  const placeOrder = async (address: Address, paymentMethod: string) => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const discount = promoApplied ? (subtotal * promoApplied.discountPercentage) / 100 : 0;
    const shipping = subtotal >= 999 ? 0 : 99;
    const total = subtotal - discount + shipping;

    const itemsOrdered = cart.map(item => {
      const p = item.personalization;
      const opts: string[] = [];
      if (p.selectedColor) opts.push(`Color: ${p.selectedColor}`);
      if (p.selectedSize) opts.push(`Size: ${p.selectedSize}`);
      if (p.engravingText) opts.push(`Engraving: "${p.engravingText}"`);

      return {
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
        personalizationText: opts.join(', ')
      };
    });

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      items: itemsOrdered,
      subtotal,
      discount,
      shipping,
      total,
      address,
      paymentMethod,
      status: 'Processing',
      trackingNumber: `TRK-${Math.floor(100000000 + Math.random() * 900000000)}`
    };

    // Save to Firestore if user is logged in
    if (currentUser.uid && currentUser.uid !== 'demo-user-id') {
      setDoc(doc(db, 'users', currentUser.uid, 'orders', newOrder.id), newOrder)
        .catch(error => console.warn("Could not sync order to Firestore:", error));
    }

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  // Auth Operations
  const login = async (email: string, password: string) => {
    localStorage.removeItem('fc_demo_user');
    const cleanEmail = email.trim().toLowerCase();
    await signInWithEmailAndPassword(auth, cleanEmail, password);
  };

  const signup = async (email: string, password: string, name: string) => {
    localStorage.removeItem('fc_demo_user');
    const cleanEmail = email.trim().toLowerCase();
    const displayName = (name || cleanEmail.split('@')[0] || 'Valued Lover').trim();
    const userCredential = await createUserWithEmailAndPassword(auth, cleanEmail, password);
    if (userCredential.user) {
      // Fire and forget background tasks so sign up completes instantly
      updateProfile(userCredential.user, { displayName }).catch(e => console.warn(e));
      setDoc(doc(db, 'users', userCredential.user.uid), {
        name: displayName,
        email: cleanEmail,
        createdAt: new Date().toISOString()
      }, { merge: true }).catch(e => console.warn(e));
    }
  };

  const loginWithGoogle = async () => {
    localStorage.removeItem('fc_demo_user');
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    if (userCredential.user) {
      setDoc(doc(db, 'users', userCredential.user.uid), {
        name: userCredential.user.displayName || 'Valued Lover',
        email: userCredential.user.email || ''
      }, { merge: true }).catch(e => console.warn(e));
    }
  };

  const loginAsDemo = () => {
    localStorage.setItem('fc_demo_user', 'true');
    setCurrentUser({
      name: 'Lovely Guest (Demo Mode)',
      email: 'demo@favwish.com',
      loggedIn: true,
      uid: 'demo-user-id'
    });
    setOrders(prev => prev.length > 0 ? prev : defaultOrders);
    setAddresses(prev => prev.length > 0 ? prev : defaultAddresses);
  };

  const logout = async () => {
    localStorage.removeItem('fc_demo_user');
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("Sign Out notice:", err);
    }
    setCurrentUser({
      name: '',
      email: '',
      loggedIn: false
    });
  };

  const updateUserProfile = async (newName: string, newPhone?: string) => {
    setCurrentUser(prev => ({
      ...prev,
      name: newName,
      ...(newPhone ? { phone: newPhone } : {})
    }));

    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, { displayName: newName });
      } catch (e) {
        console.warn("Could not update auth profile display name:", e);
      }
      try {
        await setDoc(doc(db, 'users', auth.currentUser.uid), {
          name: newName,
          ...(newPhone ? { phone: newPhone } : {})
        }, { merge: true });
      } catch (e) {
        console.warn("Could not update firestore user profile doc:", e);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        cart,
        wishlist,
        page,
        selectedProductId,
        searchQuery,
        filters,
        activeSort,
        viewMode,
        addresses,
        orders,
        currentUser,
        promoApplied,
        
        setPage,
        viewProduct,
        setSearchQuery,
        setViewMode,
        setActiveSort,
        
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        clearOrders,
        applyPromo,
        removePromo,
        
        toggleWishlist,
        isInWishlist,
        
        updateFilters,
        resetFilters,
        
        addAddress,
        updateAddress,
        deleteAddress,
        
        placeOrder,
        
        login,
        signup,
        loginWithGoogle,
        loginAsDemo,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
