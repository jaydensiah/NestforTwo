// Product Configuration with Shopify IDs
export const PRODUCTS = {
  ZERO_SUGAR: {
    id: 'gid://shopify/Product/7859390251089',
    name: 'Freshly Cooked Birdnest with Zero Sugar',
    category: 'Freshly Cooked Bird\'s Nest',
    label: 'FOR PREGNANT LADIES & DIABETICS',
    images: [
      '/images/ZeroSugar.png',
      '/images/ZeroSugar2.png',
      '/images/All_4.png',
      '/images/All_5.png',
      '/images/All_6.png'
    ],
    variants: {
      oneTime50ml: {
        id: 'gid://shopify/ProductVariant/42912035045457',
        size: '50ml',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime100ml: {
        id: 'gid://shopify/ProductVariant/42912035078225',
        size: '100ml',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      subscription50ml: {
        id: 'gid://shopify/ProductVariant/42912035110993',
        size: '50ml',
        quantity: 30,
        price: 300,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml: {
        id: 'gid://shopify/ProductVariant/42912035143761',
        size: '100ml',
        quantity: 30,
        price: 600,
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
    label: 'FOR CHILDREN',
    images: [
      '/images/Honey.png',
      '/images/Honey2.png',
      '/images/All_4.png',
      '/images/All_5.png',
      '/images/All_6.png'
    ],
    variants: {
      oneTime50ml: {
        id: 'gid://shopify/ProductVariant/42912008405073',
        size: '50ml',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime100ml: {
        id: 'gid://shopify/ProductVariant/42912008437841',
        size: '100ml',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      subscription50ml: {
        id: 'gid://shopify/ProductVariant/42912008470609',
        size: '50ml',
        quantity: 30,
        price: 300,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml: {
        id: 'gid://shopify/ProductVariant/42912008503377',
        size: '100ml',
        quantity: 30,
        price: 600,
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
    label: 'FOR ELDERLY',
    images: [
      '/images/RockSugar.png',
      '/images/RockSugar2.png',
      '/images/All_4.png',
      '/images/All_5.png',
      '/images/All_6.png'
    ],
    variants: {
      oneTime50ml: {
        id: 'gid://shopify/ProductVariant/42911989563473',
        size: '50ml',
        quantity: 6,
        price: 72,
        pricePerBottle: 12,
        type: 'one-time'
      },
      oneTime100ml: {
        id: 'gid://shopify/ProductVariant/42911989596241',
        size: '100ml',
        quantity: 6,
        price: 144,
        pricePerBottle: 24,
        type: 'one-time'
      },
      subscription50ml: {
        id: 'gid://shopify/ProductVariant/42911991464017',
        size: '50ml',
        quantity: 30,
        price: 300,
        pricePerBottle: 10,
        type: 'subscription',
        savings: '17%'
      },
      subscription100ml: {
        id: 'gid://shopify/ProductVariant/42911991496785',
        size: '100ml',
        quantity: 30,
        price: 600,
        pricePerBottle: 20,
        type: 'subscription',
        savings: '17%'
      }
    }
  },

  DRIED: {
    id: 'gid://shopify/Product/7859391234129',
    name: 'Pure Dry Selection',
    category: 'Dried Bird\'s Nest',
    label: null,
    images: [
      '/images/Dry1.png',
      '/images/Dry2.png',
      '/images/Dry3.png'
    ],
    variants: {
      '50g': {
        id: 'gid://shopify/ProductVariant/42912039108689',
        size: '50g',
        price: 150,
        pricePerGram: 3.00
      },
      '100g': {
        id: 'gid://shopify/ProductVariant/42912039141457',
        size: '100g',
        price: 360,
        pricePerGram: 3.60
      },
      '250g': {
        id: 'gid://shopify/ProductVariant/42912038715473',
        size: '250g',
        price: 800,
        pricePerGram: 3.20
      },
      '1000g': {
        id: 'gid://shopify/ProductVariant/42912038748241',
        size: '1000g',
        price: 3000,
        pricePerGram: 3.00
      }
    }
  },

  KUE_LAPIS_NEST: {
    id: 'gid://shopify/Product/15591388151889',
    name: 'Kue Lapis with Bird\'s Nest',
    category: 'Kue Lapis',
    price: 95,
    fixedSize: '6 x 50ml bottles + 1 box Kue Lapis (10x20cm)',
    images: [
      '/images/NestwKueh.png',
      '/images/Original1.png',
      '/images/Original2.png',
      '/images/OriginalMeasure.png',
      '/images/Prune1.png'
    ],
    flavours: {
      original: {
        images: ['/images/Original1.png', '/images/Original2.png', '/images/Original3.png', '/images/OriginalMeasure.png']
      },
      prune: {
        images: ['/images/Prune1.png', '/images/Prune2.png', '/images/Prune3.png', '/images/PruneMeasure.png']
      }
    },
    variants: {
      originalHoney: 'gid://shopify/ProductVariant/58344489287761',
      originalRockSugar: 'gid://shopify/ProductVariant/58344489320529',
      originalZeroSugar: 'gid://shopify/ProductVariant/58344489353297',
      pruneHoney: 'gid://shopify/ProductVariant/58344489386065',
      pruneRockSugar: 'gid://shopify/ProductVariant/58344489418833',
      pruneZeroSugar: 'gid://shopify/ProductVariant/58344489451601'
    }
  },

  ORIGINAL_KUE_LAPIS: {
    id: 'gid://shopify/Product/15591856177233',
    name: 'Original Kue Lapis',
    category: 'Kue Lapis',
    variant: 'gid://shopify/ProductVariant/58347016781905',
    price: 30,
    images: [
      '/images/Original1.png',
      '/images/Original2.png',
      '/images/Original3.png',
      '/images/OriginalMeasure.png'
    ]
  },

  PRUNE_KUE_LAPIS: {
    id: 'gid://shopify/Product/15591856308305',
    name: 'Prune Kue Lapis',
    category: 'Kue Lapis',
    variant: 'gid://shopify/ProductVariant/58347020353617',
    price: 30,
    images: [
      '/images/Prune1.png',
      '/images/Prune2.png',
      '/images/Prune3.png',
      '/images/PruneMeasure.png'
    ]
  }
};

// Helper function to get product by key
export const getProduct = (key) => {
  return PRODUCTS[key] || null;
};

// Get all freshly cooked products
export const getFreshlyCookedProducts = () => {
  return [PRODUCTS.HONEY, PRODUCTS.ZERO_SUGAR, PRODUCTS.ROCK_SUGAR];
};

// Get all dried products
export const getDriedProducts = () => {
  return [PRODUCTS.DRIED];
};

// Get all Kue Lapis products
export const getKueLapisProducts = () => {
  return [PRODUCTS.KUE_LAPIS_NEST, PRODUCTS.ORIGINAL_KUE_LAPIS, PRODUCTS.PRUNE_KUE_LAPIS];
};

// Get all products for homepage
export const getAllProducts = () => {
  return Object.values(PRODUCTS);
};
