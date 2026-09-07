import { Product } from '../types';

export const CATEGORIES = [
  'Teddy Bears',
  'Bracelets',
  'Mugs',
  'Keychains',
  'Photo Frames',
  'Combos',
  'Anniversary Gifts'
];

export const OCCASIONS = [
  'Birthday',
  'Friendship Day',
  'Anniversary',
  'Compliment Gifts',
  'Valentine\'s Day',
  'Just Because',
  'Engagement',
  'Long Distance',
  'Family'
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'b1',
    name: 'Eternal Bond Magnetic Cord Bracelets (Set of 2)',
    description: 'Each bracelet features a beautiful magnetic half-sphere that snaps together when your hands are close, symbolizing the mutual attraction of your bond. Hand-woven with premium marine rope, they are fully adjustable to fit any wrist comfortably. Perfect for partners or best friends.',
    category: 'Bracelets',
    price: 499,
    originalPrice: 899,
    rating: 4.8,
    reviewsCount: 320,
    image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Valentine\'s Day',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Material': 'Nylon marine rope, Magnetic Stainless Steel',
      'Adjustability': 'Slide knot style (6.3" to 10.2")',
      'Set Includes': '2 x Matching Magnetic Bracelets, 1 x Luxury Velvet Pouch',
      'Hypoallergenic': 'Yes, Lead-free and Nickel-free'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: 'Classic Black & Scarlet Red', hex: '#111111' },
      { name: 'Soft Gray & Blush Pink', hex: '#b2b2b2' },
      { name: 'Ocean Navy & Sand Gold', hex: '#1e3a8a' }
    ],
    reviews: [
      { id: 'r1', user: 'Alex M.', rating: 5, comment: 'Absolutely adorable. The magnetic snap is very satisfying. My girlfriend wears it every single day. Highly recommend!', date: 'June 14, 2026', verified: true },
      { id: 'r2', user: 'Sophia K.', rating: 4, comment: 'Super cute concept for long distance. High quality cord that does not fray in water.', date: 'May 28, 2026', verified: true }
    ]
  },
  {
    id: 'b2',
    name: 'Personalized Engraved Silver Bar Coordinates Bracelets',
    description: 'Keep your special place close to your heart. Engrave the exact latitude and longitude coordinates of where you first met, had your favorite trip, or grew up. Handcrafted in high-grade sterling silver finish.',
    category: 'Bracelets',
    price: 699,
    originalPrice: 1199,
    rating: 4.9,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Material': '316L Surgical Grade Stainless Steel / Sterling Silver Plating',
      'Engraving Range': 'Up to 25 characters (Coordinates, Name, Date)',
      'Chain Length': 'Men: 7.5" + 2" ext; Women: 6.5" + 2" ext',
      'Waterproof': 'Yes, tarnish resistant'
    },
    engravingAvailable: true,
    sizeAvailable: true,
    sizes: ['Women Standard (6.5")', 'Men Standard (7.5")', 'Custom Adjusted Set'],
    colorAvailable: true,
    colors: [
      { name: 'Classic Silver', hex: '#d1d5db' },
      { name: 'Rose Gold & Black Set', hex: '#fda4af' },
      { name: 'Luxury 18K Yellow Gold', hex: '#ca8a04' }
    ],
    reviews: [
      { id: 'r3', user: 'Daniel G.', rating: 5, comment: 'We engraved our wedding coordinates. The silver looks brilliant, and the font is perfectly readable. Fast shipping too!', date: 'July 2, 2026', verified: true }
    ]
  },
  {
    id: 'm1',
    name: 'His & Hers / Besties Royal Ceramic Marble Mug Set',
    description: 'Sip your morning brew in luxury. This set features elegant matching mugs with premium gold-leaf lettering, wrapped in a textured pastel pink and ocean blue marble pattern. Includes matching gold-plated crown spoons.',
    category: 'Mugs',
    price: 899,
    originalPrice: 1499,
    rating: 4.7,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Engagement',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Material': 'High-Fired Premium Stoneware, 10K Gold Trim',
      'Capacity': '14 oz (410 ml)',
      'Included': '1 x Pink "Hers" Mug, 1 x Grey "His" Mug, 2 x Gold Crown Spoons',
      'Microwave Safe': 'No (due to metallic gold-leaf design)'
    },
    engravingAvailable: false,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'r4', user: 'Jessica L.', rating: 5, comment: 'Bought this for my brother\'s bridal shower. They are beautiful! High quality, thick ceramic, and packaged beautifully in a silk-lined box.', date: 'May 15, 2026', verified: true }
    ]
  },
  {
    id: 'm2',
    name: 'Magic Color Changing "You Complete Me" Heat Sensitive Mugs',
    description: 'Pour hot coffee or tea and watch the magic happen! As the mug heats up, a playful hidden message and a gorgeous full-color hearts background bloom right before your eyes. Perfect for slow weekend mornings together.',
    category: 'Mugs',
    price: 499,
    originalPrice: 799,
    rating: 4.5,
    reviewsCount: 190,
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Birthday',
    bestSeller: false,
    newArrival: false,
    specifications: {
      'Material': 'Thermo-chromic Premium Ceramic',
      'Capacity': '11 oz (325 ml)',
      'Care': 'Hand wash only, do not scratch the surface'
    },
    engravingAvailable: false,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'r5', user: 'Tyler R.', rating: 4, comment: 'Super fun gift. My girlfriend laughed and loved it when she saw the design reveal. Good quality.', date: 'April 10, 2026', verified: true }
    ]
  },
  {
    id: 'k1',
    name: 'Interlocking Heart & Key Metal Couple Keychains',
    description: 'Keep a constant reminder of who holds the key to your heart. When brought together, the polished key unlocks the miniature padlock heart perfectly. Engrave yours and your partner\'s initials on each part.',
    category: 'Keychains',
    price: 299,
    originalPrice: 499,
    rating: 4.6,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Just Because',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Material': 'High-density zinc alloy, mirror polish',
      'Engraving': 'Max 3 characters per piece (e.g., A+S)',
      'Dimensions': 'Key: 1.5", Heart: 1.3"'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: 'Rose Gold & Gunmetal Black', hex: '#fda4af' },
      { name: 'Gold & Classic Chrome', hex: '#ca8a04' }
    ],
    reviews: [
      { id: 'r6', user: 'Liam B.', rating: 5, comment: 'Amazing little token. It has a heavy, expensive weight to it. The engraving is beautiful.', date: 'June 30, 2026', verified: true }
    ]
  },
  {
    id: 'k2',
    name: 'Long-Distance "No Matter Where" Engraved Map Keychains',
    description: 'Perfect for loved ones separated by miles but united by heart. This dual keychain set features engraved state or country maps of your choice, connected with a delicate dotted path and the heartwarming script: "No matter where, our hearts beat as one."',
    category: 'Keychains',
    price: 399,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 92,
    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Long Distance',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Material': 'Brushed Stainless Steel',
      'Includes': '2 x Keychains, custom country outlines',
      'Weight': '15g each'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'r7', user: 'Sarah W.', rating: 5, comment: 'My boyfriend is in Texas and I am in Boston. These keychains made him tear up. Very thoughtful, high quality!', date: 'July 1, 2026', verified: false }
    ]
  },
  {
    id: 'f1',
    name: 'LED Spotify Plaque Framed Night Light',
    description: 'Freeze your favorite memory and song in time. Upload a picture of you and your loved one, and we will generate a working scannable Spotify code of your favorite shared song. Mounted on a premium warm wooden base with soft glowing LED lights.',
    category: 'Photo Frames',
    price: 1199,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 512,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Material': 'Optically clear premium Acrylic, Solid Beechwood base',
      'Light Color': 'Soft Warm White (LED)',
      'Dimensions': 'Acrylic Plaque: 6" x 8.5" x 0.2"',
      'Power Source': 'USB cable with on/off switch'
    },
    engravingAvailable: true, // Used for Custom Song Name & Artist
    sizeAvailable: true,
    sizes: ['Standard 6" x 8"', 'Large Deluxe 8" x 10"'],
    colorAvailable: false,
    reviews: [
      { id: 'r8', user: 'Noah V.', rating: 5, comment: 'This is the most romantic thing I have bought. The Spotify code actually scans instantly on the phone and starts playing our song! Wood base is high quality.', date: 'June 20, 2026', verified: true }
    ]
  },
  {
    id: 'f2',
    name: 'Rustic Solid Wood Floating Collage Frame',
    description: 'Tell your shared timeline with three beautiful polaroid-style photos. Designed with distressed natural pine wood and featuring rustic copper heart pegs to suspend your memory snapshots elegantly in mid-air.',
    category: 'Photo Frames',
    price: 799,
    originalPrice: 1299,
    rating: 4.6,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Birthday',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Material': '100% Reclamation Pine Wood',
      'Capacity': 'Holds 3 standard 4x4" photos',
      'Hanging': 'Dual back hooks for Wall hanging or Desktop stand'
    },
    engravingAvailable: true, // Used for Custom Footer Message on Wood
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: 'Rustic Vintage Oak', hex: '#78350f' },
      { name: 'Driftwood Gray', hex: '#6b7280' },
      { name: 'Whitewashed Cream', hex: '#f3f4f6' }
    ],
    reviews: [
      { id: 'r9', user: 'Chloe P.', rating: 5, comment: 'Super charming rustic vibe. Sent this to my husband with three of our honeymoon pictures. He absolutely loved it.', date: 'May 3, 2026', verified: true }
    ]
  },
  {
    id: 'c1',
    name: '"Midnight Connections" Luxury Wine & Chocolate Hamper',
    description: 'A curated sensory experience for a special evening. Includes a bottle of award-winning non-alcoholic premium sparkling rose wine, dual personalized engraved crystalline wine glasses, hand-crafted Belgian sea-salt dark chocolates, and an organic soy scented candle (Lavender & Vanilla).',
    category: 'Combos',
    price: 2499,
    originalPrice: 3999,
    rating: 4.9,
    reviewsCount: 380,
    image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Gift Packaging': 'Luxury silk-ribboned handwoven magnetic box',
      'Glass Customization': 'Name sandblasted permanently (e.g. Juliet / Romeo)',
      'Candle Burn Time': 'Up to 35 hours (organic soy)'
    },
    engravingAvailable: true, // For glassware name custom
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'r10', user: 'Evelyn T.', rating: 5, comment: 'Worth every single penny. The wine glasses are beautiful, thin and sound high quality. The chocolate melted in our mouths. Best anniversary night ever.', date: 'July 10, 2026', verified: true }
    ]
  },
  {
    id: 'c2',
    name: 'Symphony of Care Rose Quartz & Chocolate Combo',
    description: 'Surprise your loved one with this elegant harmony combo. Includes a pristine therapeutic grade polished Rose Quartz Healing Crystal Tree, a delicate velvet rose gift wrap, and a premium box of luxury heart truffles.',
    category: 'Combos',
    price: 1299,
    originalPrice: 1999,
    rating: 4.7,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Just Because',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Crystal Material': '100% Authentic Natural Madagascan Rose Quartz',
      'Hamper Includes': '1 x Crystal Tree (7" tall), 12 x Heart Chocolate Truffles, Premium Satin Box'
    },
    engravingAvailable: false,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'r11', user: 'Mason J.', rating: 5, comment: 'The rose quartz tree looks gorgeous under living room lights. Chocolates were incredibly rich. Perfect random weekday surprise!', date: 'June 25, 2026', verified: true }
    ]
  },
  {
    id: 'a1',
    name: 'Eternal 24K Gold-Plated Preserved Red Rose in Glass Dome',
    description: 'A genuine premium red rose, freshly picked at the peak of perfection and preserved through non-toxic organic resin, finished with a handmade delicate border dip in pure 24-karat gold. Shelled inside a heavy borosilicate glass bell dome with ambient starry LED lights.',
    category: 'Anniversary Gifts',
    price: 1499,
    originalPrice: 2499,
    rating: 4.9,
    reviewsCount: 650,
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Rose Type': '100% Real Preserved South American Premium Red Rose',
      'Gold Border Plating': '24K Liquid Gold Electrophoresis',
      'Dome Features': 'High Clarity Borosilicate Glass, Solid Dark Oak Base',
      'LED Power': '3 x AAA Batteries (included)'
    },
    engravingAvailable: true, // Wood engraving
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: 'Royal Velvet Red', hex: '#ef4444' },
      { name: 'Mystic Midnight Blue', hex: '#1e3a8a' },
      { name: 'Ethereal Blush Pink', hex: '#f472b6' }
    ],
    reviews: [
      { id: 'r12', user: 'Isabella C.', rating: 5, comment: 'This looks straight out of Beauty and the Beast. At night with the LED lights on, it is breathtaking. Best gift my partner ever bought me!', date: 'July 5, 2026', verified: true }
    ]
  },
  {
    id: 'a2',
    name: 'The Shared Memories Custom Bound Hardcover Book',
    description: 'Compile your favorite memories into a library-grade custom hardcover book. Our editorial layout prompts you to fill in details of your shared adventure, with spacious mock templates for photo collages, hand-written letters, and key dates lists.',
    category: 'Anniversary Gifts',
    price: 999,
    originalPrice: 1599,
    rating: 4.8,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1562240020-ce31ccb0fa7d?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Page Count': '64 Heavyweight Textured Ivory Pages (200gsm)',
      'Dimensions': '8.5" x 11.2" Portrait format',
      'Cover material': 'Premium blush linen cloth with gold-foil debossed lettering'
    },
    engravingAvailable: true, // Book title
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: 'Romantic Blush Linen', hex: '#fbcbcb' },
      { name: 'Elegant Wine Maroon', hex: '#5c0612' },
      { name: 'Midnight Obsidian Gold', hex: '#111111' }
    ],
    reviews: [
      { id: 'r13', user: 'James H.', rating: 5, comment: 'The linen feel of this book is incredible. We enjoy filling out the prompts on our anniversaries. This will be a family heirloom!', date: 'June 18, 2026', verified: true }
    ]
  },
  {
    id: 'a3',
    name: 'Intertwined Twin Heart Sterling Silver Pendant Necklace',
    description: 'Keep your hearts perfectly aligned. Hand-crafted in 925 Sterling Silver, these double hearts interlink seamlessly. One heart is polished high-gloss white gold, while the other sparkles with ethical hand-set cubic zirconia accents.',
    category: 'Anniversary Gifts',
    price: 1299,
    originalPrice: 2199,
    rating: 4.8,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop', // fallback to silver jewellery
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Material': '925 Sterling Silver, Platinum Electroscopic anti-oxidation coating',
      'Gems': 'Grade 5A Hearts & Arrows cubic zirconia',
      'Chain': '16" with 2" adjustment extension, lobster clasp'
    },
    engravingAvailable: false,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'r14', user: 'Oliver D.', rating: 5, comment: 'Looks beautiful and shines like a real diamond. The presentation box with a little light inside is a very smart touch.', date: 'May 12, 2026', verified: true }
    ]
  },
  {
    id: 'm3',
    name: 'Satin Kiss Couple Pillowcases & Couples Tea Mug',
    description: 'Perfect together! This package includes our signature standard size 100% mulberry silk pillowcases featuring elegant embroidered minimalist line-art special ones Kiss, paired with our cozy double-curve cuddle mug.',
    category: 'Mugs',
    price: 1199,
    originalPrice: 1799,
    rating: 4.4,
    reviewsCount: 74,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Just Because',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Pillow Material': '100% Mulberry Silk, 19 Momme Threadcount',
      'Mug Capacity': '12 oz Ceramic',
      'Includes': '2 x Standard Pillowcases, 1 x Cuddle Mug'
    },
    engravingAvailable: false,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'r15', user: 'Maya S.', rating: 4, comment: 'The pillowcases are extremely smooth, great for hair and skin. Mug is incredibly cozy to hold in cold weather.', date: 'July 8, 2026', verified: true }
    ]
  },
  {
    id: 'cg1',
    name: '30 Reasons You Are Amazing - Daily Compliment Jar Gift Box',
    description: 'A handcrafted vintage glass jar filled with 30 capsule notes, each containing a unique heartwarming compliment and affirmation. Give the gift of daily encouragement and love to someone who brightens your life.',
    category: 'Combos',
    price: 599,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Compliment Gifts',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Jar Material': 'Amber glass with cork stopper & satin bow',
      'Capsules': '30 color-coded message capsules with gold ring seals',
      'Customization': 'Option to write 10 custom personalized notes'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rcg1', user: 'Ananya S.', rating: 5, comment: 'I gave this compliment jar to my coworker and she actually cried happy tears! The notes inside are so uplifting.', date: 'July 18, 2026', verified: true }
    ]
  },
  {
    id: 'fd1',
    name: 'Besties Forever Interlocking Charm Bracelets (Set of 2)',
    description: 'Celebrate unbreakable friendship! These matching woven cord bracelets feature a silver infinity charm that interlocks with a lotus star emblem when together. Water-resistant, adjustable, and hypoallergenic.',
    category: 'Bracelets',
    price: 449,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Friendship Day',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Material': 'Sterling Silver Plated Zinc Alloy, Braided Marine Cord',
      'Set Includes': '2 x Matching Bestie Bracelets, 1 x Friendship Card'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: 'Pink & Mint Green', hex: '#f472b6' },
      { name: 'Classic Black & White', hex: '#111111' }
    ],
    reviews: [
      { id: 'rfd1', user: 'Rohan P.', rating: 5, comment: 'Perfect Friendship Day surprise for my childhood best friend. Great quality and looks stylish!', date: 'July 24, 2026', verified: true }
    ]
  },
  {
    id: 'bd1',
    name: 'Custom Birthday Wishes LED Photo Frame with Music Code',
    description: 'Make their birthday unforgettable with a customized illuminated acrylic frame featuring their favorite birthday photograph and a scannable song or birthday anthem of your choice.',
    category: 'Photo Frames',
    price: 899,
    originalPrice: 1499,
    rating: 4.9,
    reviewsCount: 180,
    image: 'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Birthday',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Material': 'High Clarity Acrylic, Warm LED Wooden Stand',
      'Included': 'Free Birthday Greeting Card & Gift Box'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rbd1', user: 'Meera K.', rating: 5, comment: 'Came on time for my sister’s birthday party. The glowing light and photo quality were top notch!', date: 'July 27, 2026', verified: true }
    ]
  },
  {
    id: 'bd2',
    name: 'Luxury Birthday Celebration Gourmet Gift Hamper Box',
    description: 'A lavish birthday gift crate packed with artisanal roasted nuts, gold-dusted Belgian pralines, a scented lavender soy wax candle, and a handcrafted wooden "Happy Birthday" bookmark.',
    category: 'Combos',
    price: 1499,
    originalPrice: 2299,
    rating: 4.9,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Birthday',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Crate Material': 'Reusable Pine Wood Keepsake Box',
      'Contents': 'Belgian Truffles (200g), Lavender Candle, Greeting Card & Roasted Almonds'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rbd2', user: 'Karan M.', rating: 5, comment: 'Bought this for my mom’s 50th birthday. Premium packaging and delicious treats!', date: 'July 25, 2026', verified: true }
    ]
  },
  {
    id: 'bd3',
    name: 'Personalized Name & Zodiac Star Constellation Pendant',
    description: 'Celebrate their unique birthday star map! Hand-engraved with custom name and birth zodiac constellation, cast in tarnish-free 18K gold or rose gold plating.',
    category: 'Birthday Gifts',
    price: 799,
    originalPrice: 1299,
    rating: 4.8,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Birthday',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Plating': '18K Gold Plated / Rose Gold Plated Stainless Steel',
      'Chain Length': '18 inches + 2 inch adjustable extension'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: '18K Yellow Gold', hex: '#eab308' },
      { name: 'Romantic Rose Gold', hex: '#f43f5e' },
      { name: 'Platinum Silver', hex: '#94a3b8' }
    ],
    reviews: [
      { id: 'rbd3', user: 'Sneha R.', rating: 5, comment: 'The constellation engraving is so delicate and clear. My friend loved her Virgo birthday necklace!', date: 'July 20, 2026', verified: true }
    ]
  },
  {
    id: 'an1',
    name: '24K Gold Preserved Rose in Enchanted Glass Dome with LED',
    description: 'A symbol of everlasting love that never fades. A real hand-selected rose dipped in 24K gold foil, protected under a crystal glass dome surrounded by warm fairy lights.',
    category: 'Anniversary Gifts',
    price: 1399,
    originalPrice: 2199,
    rating: 5.0,
    reviewsCount: 340,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Base': 'Natural Walnut Wood with USB/Battery LED power',
      'Dome': 'High Borosilicate Clarity Glass'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: 'Royal Crimson Gold', hex: '#9f1239' },
      { name: 'Sapphire Midnight Blue', hex: '#1e3a8a' },
      { name: 'Blush Pearl Pink', hex: '#f472b6' }
    ],
    reviews: [
      { id: 'ran1', user: 'Vikram T.', rating: 5, comment: 'Gave this to my wife for our 5th wedding anniversary. She keeps it on her bedside table every night!', date: 'July 15, 2026', verified: true }
    ]
  },
  {
    id: 'an2',
    name: 'Engraved Anniversary Coordinates & Special Date Cuff Bracelets',
    description: 'Keep the exact GPS location of where you first met or tied the knot engraved on sleek matching minimalist stainless steel cuffs.',
    category: 'Bracelets',
    price: 899,
    originalPrice: 1599,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Finish': 'Brushed Matte Black & Polished Rose Gold',
      'Material': 'Medical Grade 316L Stainless Steel'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'ran2', user: 'Pooja V.', rating: 5, comment: 'Super crisp laser engraving of our marriage coordinates. Fits comfortably on both of us.', date: 'July 22, 2026', verified: true }
    ]
  },
  {
    id: 'cg2',
    name: 'You Are Pure Sunshine - Engraved Wooden Desk Motivation Plaque',
    description: 'Brighten their workspace with a cheerful laser-etched natural beechwood plaque that reads: "Thank you for being the sunshine in every room you walk into."',
    category: 'Compliment Gifts',
    price: 399,
    originalPrice: 699,
    rating: 4.8,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Compliment Gifts',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Wood': 'Sustainable German Beechwood',
      'Size': '5 x 5 inches with Brass Table Stand'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rcg2', user: 'Divya N.', rating: 5, comment: 'A sweet random compliment gift for my mentor. Made her day!', date: 'July 26, 2026', verified: true }
    ]
  },
  {
    id: 'cg3',
    name: 'Pocket Hug Token & Heartfelt Praise Stainless Steel Keepsake',
    description: 'A pocket-sized double-sided engraved coin to remind a special friend, mentor, or family member how appreciated and capable they are wherever they go.',
    category: 'Compliment Gifts',
    price: 299,
    originalPrice: 499,
    rating: 4.9,
    reviewsCount: 115,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Compliment Gifts',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Coin Diameter': '30 mm heavy weighted stainless steel',
      'Includes': 'Leatherette Keychain Pouch & Gift Envelope'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rcg3', user: 'Siddharth M.', rating: 5, comment: 'Cute token of appreciation. High quality weight and finish!', date: 'July 28, 2026', verified: true }
    ]
  },
  {
    id: 'fd2',
    name: 'Partners in Crime Dual Personalized Ceramic Mug Pair',
    description: 'Double the laughter! A pair of high-gloss ceramic mugs printed with funny custom caricatures and "Partners in Crime since [Year]" text.',
    category: 'Mugs',
    price: 649,
    originalPrice: 999,
    rating: 4.8,
    reviewsCount: 205,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Friendship Day',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Capacity': '325 ml each (Set of 2)',
      'Feature': 'Microwave & Dishwasher Safe, Scratch-proof print'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rfd2', user: 'Rahul G.', rating: 5, comment: 'Ordered for me and my college buddy. We drink our morning coffee together over video call with these!', date: 'July 21, 2026', verified: true }
    ]
  },
  {
    id: 'tb1',
    name: 'Giant Plush Velvet Huggable Teddy Bear with Personalised Ribbon',
    description: 'Super-soft 3-foot giant plush velvet teddy bear wearing a silk satin ribbon custom embroidered with your loved one’s name or special birthday message. Incredibly soft, fluffy, and perfect for warm squeezes!',
    category: 'Teddy Bears',
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviewsCount: 280,
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Birthday',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Height': '3 Feet (90 cm)',
      'Material': 'Hypoallergenic Ultra-Soft Micro-Plush Fiber',
      'Personalization': 'Custom Satin Ribbon Embroidery included'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: true,
    colors: [
      { name: 'Classic Caramel Brown', hex: '#b45309' },
      { name: 'Blush Powder Pink', hex: '#f472b6' },
      { name: 'Snow White', hex: '#f8fafc' }
    ],
    reviews: [
      { id: 'rtb1', user: 'Ananya S.', rating: 5, comment: 'So huge and soft! The ribbon embroidery came out beautifully. Best birthday surprise ever!', date: 'July 29, 2026', verified: true }
    ]
  },
  {
    id: 'tb2',
    name: 'Romantic Couple Teddy Bears Pair with Magnetic Hearts',
    description: 'An endearing pair of plush teddy bears dressed in matching cozy hand-knit sweaters. Their paws hold magnetic heart halves that snap together when placed side by side!',
    category: 'Teddy Bears',
    price: 899,
    originalPrice: 1499,
    rating: 5.0,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Valentine\'s Day',
    bestSeller: true,
    newArrival: false,
    specifications: {
      'Set Includes': '2 x Sweater Bears (Boy & Girl Bear)',
      'Feature': 'Internal Paws Magnet Mechanism'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rtb2', user: 'Rohan K.', rating: 5, comment: 'Gave one bear to my wife and kept one. When we put them together they snap hands! Super cute idea.', date: 'July 24, 2026', verified: true }
    ]
  },
  {
    id: 'tb3',
    name: 'Pocket Teddy Bear Keepsake with Engraved Wooden Heart Tag',
    description: 'An adorable miniature fluffy teddy bear tucked inside a velvet drawstring pouch, accompanied by a custom laser-engraved wooden heart tag that reads: "Sending you a warm hug across the miles."',
    category: 'Teddy Bears',
    price: 449,
    originalPrice: 799,
    rating: 4.8,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Long Distance',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Bear Size': '15 cm compact cuddle size',
      'Includes': 'Custom Engraved Wooden Heart & Velvet Gift Bag'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rtb3', user: 'Simran B.', rating: 5, comment: 'My boyfriend carries this cute bear on his desk in another city. Helps with long distance!', date: 'July 26, 2026', verified: true }
    ]
  },
  {
    id: 'tb4',
    name: 'Best Friends Forever Teddy Bear with Gold Friendship Coin',
    description: 'Fluffy cream-white plush teddy bear holding an 18K gold-plated double-sided friendship token engraved with "Besties Forever & Always".',
    category: 'Teddy Bears',
    price: 699,
    originalPrice: 1099,
    rating: 4.9,
    reviewsCount: 120,
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Friendship Day',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Coin': 'Heavyweight Brass with 18K Gold Finish',
      'Bear Size': '25 cm fluffy seating pose'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rtb4', user: 'Priya N.', rating: 5, comment: 'High quality plush teddy and the coin is heavy and shiny. Loved it!', date: 'July 28, 2026', verified: true }
    ]
  },
  {
    id: 'tb5',
    name: 'You Are Pure Sunshine Sweet Compliment Teddy Bear',
    description: 'Cuddly fluffy plush teddy bear holding a soft velvet embroidered heart that reads: "Thank you for being my sunshine & favorite person!"',
    category: 'Teddy Bears',
    price: 599,
    originalPrice: 999,
    rating: 4.9,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Compliment Gifts',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Heart Embroidered': 'Yellow Sunshine Sparkle motif',
      'Bear Size': '28 cm cuddle plush'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rtb5', user: 'Tanvi M.', rating: 5, comment: 'Put a huge smile on my sister’s face when she opened it!', date: 'July 27, 2026', verified: true }
    ]
  },
  {
    id: 'tb6',
    name: 'Luxury Rose & Teddy Bear Gourmet Celebration Hamper',
    description: 'A lavish gift crate packed with a plush teddy bear, a 24K gold-plated eternal preserved rose, Belgian pralines box, and a scented lavender candle.',
    category: 'Combos',
    price: 1699,
    originalPrice: 2499,
    rating: 5.0,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Anniversary',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Crate Material': 'Reusable Solid Wood Gift Trunk',
      'Includes': 'Teddy Bear, Gold Foil Rose, Chocolates & Greeting Card'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rtb6', user: 'Akash V.', rating: 5, comment: 'Ordered for our 1st anniversary. The bear and rose presentation was breathtaking!', date: 'July 29, 2026', verified: true }
    ]
  },
  {
    id: 'bd4',
    name: 'Happy Birthday Personalised Rotating Wooden Musical Box',
    description: 'A charming hand-crafted solid beechwood music box that plays "Happy Birthday to You" when wound up. Engraved with custom name and birth date on the polished wooden lid.',
    category: 'Combos',
    price: 799,
    originalPrice: 1299,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Birthday',
    bestSeller: true,
    newArrival: true,
    specifications: {
      'Material': '100% Solid Natural Beechwood, Japanese Sankyo Movement',
      'Tune': 'Happy Birthday Melody (No battery required, mechanical wind-up)'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rbd4', user: 'Sonia T.', rating: 5, comment: 'The chime sound is crisp and lovely. The custom name engraving on top is flawless!', date: 'July 28, 2026', verified: true }
    ]
  },
  {
    id: 'bd5',
    name: '3D Birthday Balloon & Name Illusion LED Night Desk Lamp',
    description: 'An mesmerizing acrylic 3D optical illusion lamp featuring floating birthday party balloons and your loved one’s name glowing in 7 vibrant LED colors.',
    category: 'Photo Frames',
    price: 649,
    originalPrice: 1099,
    rating: 4.8,
    reviewsCount: 200,
    image: 'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=600&auto=format&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1544273677-c433136021d4?q=80&w=600&auto=format&fit=crop'
    ],
    occasion: 'Birthday',
    bestSeller: false,
    newArrival: true,
    specifications: {
      'Lighting': '7 Color Touch Control & Smart Remote',
      'Power': 'USB Cable / 3x AA Batteries'
    },
    engravingAvailable: true,
    sizeAvailable: false,
    colorAvailable: false,
    reviews: [
      { id: 'rbd5', user: 'Manish P.', rating: 5, comment: 'Kids and adults both love this! Changes colors with a touch switch.', date: 'July 29, 2026', verified: true }
    ]
  }
];
