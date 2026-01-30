// Product Configuration with Shopify IDs for Nest for Two
export const PRODUCTS = {
  // ============================================
  // SIGNATURE BOTTLE SERIES (3 products)
  // ============================================
  ZERO_SUGAR: {
    id: 'gid://shopify/Product/7859390251089',
    name: 'Freshly Cooked Birdnest with Zero Sugar',
    category: 'Freshly Cooked Bird\'s Nest',
    series: 'signature-bottle',
    label: 'FOR PREGNANT LADIES & DIABETICS',
    labelShort: 'FOR PREGNANT LADIES',
    images: [
      '/images/ZeroSugar.png',
      '/images/ZeroSugar2.png',
      '/images/All_4.png',
      '/images/All_5.png',
      '/images/All_6.png'
    ],
    variants: {
      // One-Time 50ml variants (4 sweetness levels)
      oneTime50ml25: {
        id: 'gid://shopify/ProductVariant/42912035045457',
        size: '50ml',
        sweetness: '25',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50ml50: {
        id: 'gid://shopify/ProductVariant/59013957550161',
        size: '50ml',
        sweetness: '50',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50ml100: {
        id: 'gid://shopify/ProductVariant/59013958729809',
        size: '50ml',
        sweetness: '100',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50mlSide: {
        id: 'gid://shopify/ProductVariant/59013959483473',
        size: '50ml',
        sweetness: 'side',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      // One-Time 100ml variants (4 sweetness levels)
      oneTime100ml25: {
        id: 'gid://shopify/ProductVariant/42912035078225',
        size: '100ml',
        sweetness: '25',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100ml50: {
        id: 'gid://shopify/ProductVariant/59013970919505',
        size: '100ml',
        sweetness: '50',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100ml100: {
        id: 'gid://shopify/ProductVariant/59013971869777',
        size: '100ml',
        sweetness: '100',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100mlSide: {
        id: 'gid://shopify/ProductVariant/59013972787281',
        size: '100ml',
        sweetness: 'side',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      // Subscription 50ml variants (4 sweetness levels)
      subscription50ml25: {
        id: 'gid://shopify/ProductVariant/42912035110993',
        size: '50ml',
        sweetness: '25',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50ml50: {
        id: 'gid://shopify/ProductVariant/59014014533713',
        size: '50ml',
        sweetness: '50',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50ml100: {
        id: 'gid://shopify/ProductVariant/59014015942737',
        size: '50ml',
        sweetness: '100',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50mlSide: {
        id: 'gid://shopify/ProductVariant/59014017056849',
        size: '50ml',
        sweetness: 'side',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      // Subscription 100ml variants (4 sweetness levels)
      subscription100ml25: {
        id: 'gid://shopify/ProductVariant/42912035143761',
        size: '100ml',
        sweetness: '25',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml50: {
        id: 'gid://shopify/ProductVariant/59014027903057',
        size: '100ml',
        sweetness: '50',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml100: {
        id: 'gid://shopify/ProductVariant/59014028460113',
        size: '100ml',
        sweetness: '100',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100mlSide: {
        id: 'gid://shopify/ProductVariant/59014029115473',
        size: '100ml',
        sweetness: 'side',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      }
    }
  },

  HONEY: {
    id: 'gid://shopify/Product/7859386613841',
    name: 'Freshly Cooked Birdnest with Honey',
    category: 'Freshly Cooked Bird\'s Nest',
    series: 'signature-bottle',
    label: 'FOR CHILDREN',
    images: [
      '/images/Honey.png',
      '/images/Honey2.png',
      '/images/All_4.png',
      '/images/All_5.png',
      '/images/All_6.png'
    ],
    variants: {
      // One-Time 50ml variants (4 sweetness levels)
      oneTime50ml25: {
        id: 'gid://shopify/ProductVariant/42912008405073',
        size: '50ml',
        sweetness: '25',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50ml50: {
        id: 'gid://shopify/ProductVariant/59014105170001',
        size: '50ml',
        sweetness: '50',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50ml100: {
        id: 'gid://shopify/ProductVariant/59014105694289',
        size: '50ml',
        sweetness: '100',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50mlSide: {
        id: 'gid://shopify/ProductVariant/59014106153041',
        size: '50ml',
        sweetness: 'side',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      // One-Time 100ml variants (4 sweetness levels)
      oneTime100ml25: {
        id: 'gid://shopify/ProductVariant/42912008437841',
        size: '100ml',
        sweetness: '25',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100ml50: {
        id: 'gid://shopify/ProductVariant/59014107037777',
        size: '100ml',
        sweetness: '50',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100ml100: {
        id: 'gid://shopify/ProductVariant/59014107398225',
        size: '100ml',
        sweetness: '100',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100mlSide: {
        id: 'gid://shopify/ProductVariant/59014107824209',
        size: '100ml',
        sweetness: 'side',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      // Subscription 50ml variants (4 sweetness levels)
      subscription50ml25: {
        id: 'gid://shopify/ProductVariant/42912008470609',
        size: '50ml',
        sweetness: '25',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50ml50: {
        id: 'gid://shopify/ProductVariant/59014109200465',
        size: '50ml',
        sweetness: '50',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50ml100: {
        id: 'gid://shopify/ProductVariant/59014109462609',
        size: '50ml',
        sweetness: '100',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50mlSide: {
        id: 'gid://shopify/ProductVariant/59014109888593',
        size: '50ml',
        sweetness: 'side',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      // Subscription 100ml variants (4 sweetness levels)
      subscription100ml25: {
        id: 'gid://shopify/ProductVariant/42912008503377',
        size: '100ml',
        sweetness: '25',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml50: {
        id: 'gid://shopify/ProductVariant/59014115033169',
        size: '100ml',
        sweetness: '50',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml100: {
        id: 'gid://shopify/ProductVariant/59014111526993',
        size: '100ml',
        sweetness: '100',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100mlSide: {
        id: 'gid://shopify/ProductVariant/59014112444497',
        size: '100ml',
        sweetness: 'side',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      }
    }
  },

  ROCK_SUGAR: {
    id: 'gid://shopify/Product/7859383992401',
    name: 'Freshly Cooked Birdnest with Rock Sugar',
    category: 'Freshly Cooked Bird\'s Nest',
    series: 'signature-bottle',
    label: 'FOR ELDERLY',
    images: [
      '/images/RockSugar.png',
      '/images/RockSugar2.png',
      '/images/All_4.png',
      '/images/All_5.png',
      '/images/All_6.png'
    ],
    variants: {
      // One-Time 50ml variants (4 sweetness levels)
      oneTime50ml25: {
        id: 'gid://shopify/ProductVariant/42911989563473',
        size: '50ml',
        sweetness: '25',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50ml50: {
        id: 'gid://shopify/ProductVariant/59014123651153',
        size: '50ml',
        sweetness: '50',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50ml100: {
        id: 'gid://shopify/ProductVariant/59014124109905',
        size: '50ml',
        sweetness: '100',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime50mlSide: {
        id: 'gid://shopify/ProductVariant/59014124437585',
        size: '50ml',
        sweetness: 'side',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      // One-Time 100ml variants (4 sweetness levels)
      oneTime100ml25: {
        id: 'gid://shopify/ProductVariant/42911989596241',
        size: '100ml',
        sweetness: '25',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100ml50: {
        id: 'gid://shopify/ProductVariant/59014125158481',
        size: '100ml',
        sweetness: '50',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100ml100: {
        id: 'gid://shopify/ProductVariant/59014133940305',
        size: '100ml',
        sweetness: '100',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      oneTime100mlSide: {
        id: 'gid://shopify/ProductVariant/59014134267985',
        size: '100ml',
        sweetness: 'side',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      // Subscription 50ml variants (4 sweetness levels)
      subscription50ml25: {
        id: 'gid://shopify/ProductVariant/42911991464017',
        size: '50ml',
        sweetness: '25',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50ml50: {
        id: 'gid://shopify/ProductVariant/59014135251025',
        size: '50ml',
        sweetness: '50',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50ml100: {
        id: 'gid://shopify/ProductVariant/59014135578705',
        size: '50ml',
        sweetness: '100',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription50mlSide: {
        id: 'gid://shopify/ProductVariant/59014135971921',
        size: '50ml',
        sweetness: 'side',
        quantity: 30,
        price: 300,
        originalPrice: 360,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      // Subscription 100ml variants (4 sweetness levels)
      subscription100ml25: {
        id: 'gid://shopify/ProductVariant/42911991496785',
        size: '100ml',
        sweetness: '25',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml50: {
        id: 'gid://shopify/ProductVariant/59014140297297',
        size: '100ml',
        sweetness: '50',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml100: {
        id: 'gid://shopify/ProductVariant/59014627164241',
        size: '100ml',
        sweetness: '100',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      },
      subscription100mlSide: {
        id: 'gid://shopify/ProductVariant/59014140657745',
        size: '100ml',
        sweetness: 'side',
        quantity: 30,
        price: 600,
        originalPrice: 720,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      }
    }
  },

  // ============================================
  // SIGNATURE GIFT SET SERIES (3 products)
  // ============================================
  GIFT_HONEY: {
    id: 'gid://shopify/Product/15681709146193',
    name: 'Freshly Cooked Bird\'s Nest Gift Box with Honey',
    category: 'Gift Set',
    series: 'signature-gift',
    label: 'FOR CHILDREN',
    price: 88,
    fixedSize: '250ml - Gift box with 1 x insulated tumbler',
    images: [
      '/images/Gift_Honey.png',
      '/images/Gift_All1.png',
      '/images/Gift_All2.png',
      '/images/Gift_All3.png',
      '/images/Gift_All4.png'
    ],
    variants: {
      // 4 sweetness levels (one-time only, no subscription)
      sweetness25: {
        id: 'gid://shopify/ProductVariant/59031296180305',
        sweetness: '25',
        price: 88
      },
      sweetness50: {
        id: 'gid://shopify/ProductVariant/59031296213073',
        sweetness: '50',
        price: 88
      },
      sweetness100: {
        id: 'gid://shopify/ProductVariant/59031296245841',
        sweetness: '100',
        price: 88
      },
      sweetnessSide: {
        id: 'gid://shopify/ProductVariant/59031296278609',
        sweetness: 'side',
        price: 88
      }
    }
  },

  GIFT_ZERO_SUGAR: {
    id: 'gid://shopify/Product/15681710620753',
    name: 'Freshly Cooked Bird\'s Nest Gift Box with Zero Sugar',
    category: 'Gift Set',
    series: 'signature-gift',
    label: 'FOR PREGNANT LADIES & DIABETICS',
    labelShort: 'FOR PREGNANT LADIES',
    price: 88,
    fixedSize: '250ml - Gift box with 1 x insulated tumbler',
    images: [
      '/images/Gift_ZeroSugar.png',
      '/images/Gift_All1.png',
      '/images/Gift_All2.png',
      '/images/Gift_All3.png',
      '/images/Gift_All4.png'
    ],
    variants: {
      sweetness25: {
        id: 'gid://shopify/ProductVariant/59031317807185',
        sweetness: '25',
        price: 88
      },
      sweetness50: {
        id: 'gid://shopify/ProductVariant/59031317839953',
        sweetness: '50',
        price: 88
      },
      sweetness100: {
        id: 'gid://shopify/ProductVariant/59031317872721',
        sweetness: '100',
        price: 88
      },
      sweetnessSide: {
        id: 'gid://shopify/ProductVariant/59031317905489',
        sweetness: 'side',
        price: 88
      }
    }
  },

  GIFT_ROCK_SUGAR: {
    id: 'gid://shopify/Product/15681709834321',
    name: 'Freshly Cooked Bird\'s Nest Gift Box with Rock Sugar',
    category: 'Gift Set',
    series: 'signature-gift',
    label: 'FOR ELDERLY',
    price: 88,
    fixedSize: '250ml - Gift box with 1 x insulated tumbler',
    images: [
      '/images/Gift_RockSugar.png',
      '/images/Gift_All1.png',
      '/images/Gift_All2.png',
      '/images/Gift_All3.png',
      '/images/Gift_All4.png'
    ],
    variants: {
      sweetness25: {
        id: 'gid://shopify/ProductVariant/59031304568913',
        sweetness: '25',
        price: 88
      },
      sweetness50: {
        id: 'gid://shopify/ProductVariant/59031304601681',
        sweetness: '50',
        price: 88
      },
      sweetness100: {
        id: 'gid://shopify/ProductVariant/59031304634449',
        sweetness: '100',
        price: 88
      },
      sweetnessSide: {
        id: 'gid://shopify/ProductVariant/59031304667217',
        sweetness: 'side',
        price: 88
      }
    }
  },

  // ============================================
  // PREMIUM DRIED SERIES (3 products)
  // ============================================
  DRIED_50G: {
    id: 'gid://shopify/Product/7859391234129',
    name: 'Nest for Two Premium Dried Bird\'s Nest | 50g',
    category: 'Dried Bird\'s Nest',
    series: 'premium-dried',
    label: null,
    price: 200,
    servings: 16,
    fixedSize: '50g - 16 servings',
    images: [
      '/images/Dried_50g.png'
    ],
    variant: {
      id: 'gid://shopify/ProductVariant/42912039108689',
      size: '50g',
      price: 200,
      servings: 16
    }
  },

  DRIED_100G: {
    id: 'gid://shopify/Product/7859391234129',
    name: 'Nest for Two Premium Dried Bird\'s Nest | 100g',
    category: 'Dried Bird\'s Nest',
    series: 'premium-dried',
    label: null,
    price: 360,
    originalPrice: 400,
    savings: '10%',
    servings: 33,
    fixedSize: '100g - 33 servings',
    images: [
      '/images/Dried_100g.png'
    ],
    variant: {
      id: 'gid://shopify/ProductVariant/42912039141457',
      size: '100g',
      price: 360,
      originalPrice: 400,
      servings: 33
    }
  },

  DRIED_250G: {
    id: 'gid://shopify/Product/7859391234129',
    name: 'Nest for Two Premium Dried Bird\'s Nest | 250g',
    category: 'Dried Bird\'s Nest',
    series: 'premium-dried',
    label: null,
    price: 800,
    originalPrice: 1000,
    savings: '20%',
    servings: 83,
    fixedSize: '250g - 83 servings',
    images: [
      '/images/Dried_250g.png'
    ],
    variant: {
      id: 'gid://shopify/ProductVariant/42912038715473',
      size: '250g',
      price: 800,
      originalPrice: 1000,
      servings: 83
    }
  },

  // ============================================
  // TRADITIONAL KUE LAPIS SERIES (2 products)
  // ============================================
  ORIGINAL_KUE_LAPIS: {
    id: 'gid://shopify/Product/15591856177233',
    name: 'Original Kue Lapis',
    category: 'Kue Lapis',
    series: 'kue-lapis',
    label: null,
    price: 40,
    fixedSize: '1 Box of Kue Lapis (20 x 10cm)',
    variant: 'gid://shopify/ProductVariant/58347016781905',
    images: [
      '/images/Original_1.png',
      '/images/Original_2.png',
      '/images/Original_3.png'
    ]
  },

  PRUNE_KUE_LAPIS: {
    id: 'gid://shopify/Product/15591856308305',
    name: 'Prune Kue Lapis',
    category: 'Kue Lapis',
    series: 'kue-lapis',
    label: null,
    price: 50,
    fixedSize: '1 Box of Kue Lapis (20 x 10cm)',
    variant: 'gid://shopify/ProductVariant/58347020353617',
    images: [
      '/images/Prune_1.png',
      '/images/Prune_2.png',
      '/images/Prune_3.png'
    ]
  },

  
};

// Helper function to get product by key
export const getProduct = (key) => {
  return PRODUCTS[key] || null;
};

// Get Signature Bottle Series products
export const getSignatureBottleProducts = () => {
  return [PRODUCTS.HONEY, PRODUCTS.ZERO_SUGAR, PRODUCTS.ROCK_SUGAR];
};

// Get Signature Gift Set Series products
export const getSignatureGiftProducts = () => {
  return [PRODUCTS.GIFT_HONEY, PRODUCTS.GIFT_ZERO_SUGAR, PRODUCTS.GIFT_ROCK_SUGAR];
};

// Get Premium Dried Series products
export const getPremiumDriedProducts = () => {
  return [PRODUCTS.DRIED_50G, PRODUCTS.DRIED_100G, PRODUCTS.DRIED_250G];
};

// Get Traditional Kue Lapis Series products
export const getKueLapisProducts = () => {
  return [PRODUCTS.ORIGINAL_KUE_LAPIS, PRODUCTS.PRUNE_KUE_LAPIS];
};

// Get all freshly cooked products (backwards compatibility)
export const getFreshlyCookedProducts = () => {
  return [PRODUCTS.HONEY, PRODUCTS.ZERO_SUGAR, PRODUCTS.ROCK_SUGAR];
};

// Get all dried products (backwards compatibility)
export const getDriedProducts = () => {
  return [PRODUCTS.DRIED_50G, PRODUCTS.DRIED_100G, PRODUCTS.DRIED_250G];
};

// Get all products for shop page
export const getAllShopProducts = () => {
  return [
    // Signature Bottle Series
    PRODUCTS.HONEY,
    PRODUCTS.ZERO_SUGAR,
    PRODUCTS.ROCK_SUGAR,
    // Signature Gift Set Series
    PRODUCTS.GIFT_HONEY,
    PRODUCTS.GIFT_ZERO_SUGAR,
    PRODUCTS.GIFT_ROCK_SUGAR,
    // Premium Dried Series
    PRODUCTS.DRIED_50G,
    PRODUCTS.DRIED_100G,
    PRODUCTS.DRIED_250G,
    // Traditional Kue Lapis Series
    PRODUCTS.ORIGINAL_KUE_LAPIS,
    PRODUCTS.PRUNE_KUE_LAPIS
  ];
};

// Get products by series
export const getProductsBySeries = (series) => {
  switch (series) {
    case 'signature-bottle':
      return getSignatureBottleProducts();
    case 'signature-gift':
      return getSignatureGiftProducts();
    case 'premium-dried':
      return getPremiumDriedProducts();
    case 'kue-lapis':
      return getKueLapisProducts();
    default:
      return getAllShopProducts();
  }
};

// Get all products including legacy (backwards compatibility)
export const getAllProducts = () => {
  return Object.values(PRODUCTS);
};
