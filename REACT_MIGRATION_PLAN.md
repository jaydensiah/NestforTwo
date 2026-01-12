# Nest for Two - React + Vite Migration Plan

> Complete documentation for recreating the Nest for Two e-commerce website in React + Vite

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Design System](#design-system)
3. [Shopify Configuration](#shopify-configuration)
4. [Project Structure](#project-structure)
5. [Core Functionalities](#core-functionalities)
6. [Components Breakdown](#components-breakdown)
7. [Pages Breakdown](#pages-breakdown)
8. [Migration Steps](#migration-steps)
9. [Assets Checklist](#assets-checklist)

---

## Project Overview

**Project Name:** Nest for Two
**Description:** Premium bird's nest e-commerce platform in Singapore
**Current Tech Stack:** Vanilla HTML/CSS/JS with Tailwind CDN
**Target Tech Stack:** React 18 + Vite + Tailwind CSS + Shopify Storefront API

**Key Features:**
- 13 pages (homepage, 8 product pages, cart, about, contact, FAQ, partnerships)
- Shopify integration with persistent cart
- Subscription and one-time purchase options
- Custom date picker with delivery slot selection
- Image carousels with touch/swipe support
- Review system with modal form
- Mobile-responsive with hamburger navigation
- Social media integration

---

## Design System

### 1. Typography

#### Font Files to Copy
Located in `/mnt/c/Birdnest Visual Code/BirdNest/`:

1. **NunitoSans-Light.ttf** (94,092 bytes)
2. **NunitoSans-Regular.ttf** (95,760 bytes)
3. **PlayfairDisplay-Bold.ttf** (213,592 bytes)
4. **SourceSansPro-Regular.otf** (229,588 bytes)
5. **Didot.otf** (96,728 bytes)

#### Font Usage Mapping

```javascript
// Font family classes for React
const fontClasses = {
  brandName: 'font-didot',        // Didot - brand name only
  headings: 'font-playfair-bold',  // PlayfairDisplay-Bold - all headings
  body: 'font-source-sans',        // SourceSansPro-Regular - body text
  navigation: 'font-nunito-regular', // NunitoSans-Regular - nav links
  light: 'font-nunito-light'       // NunitoSans-Light - light text
};
```

#### Typography Scale

```javascript
// Typography configuration for Tailwind
const typography = {
  brandName: {
    desktop: 'text-xl md:text-2xl font-bold',  // 1.25rem - 1.5rem
    mobile: 'text-lg font-bold'                 // 1.125rem
  },
  pageHeader: {
    h1: 'text-3xl sm:text-4xl lg:text-5xl',   // 1.875rem - 3rem
    font: 'font-playfair-bold'
  },
  sectionHeader: {
    h2: 'text-3xl',                            // 1.875rem
    font: 'font-playfair-bold'
  },
  productTitle: {
    size: 'text-xl sm:text-2xl md:text-3xl',  // 1.25rem - 1.875rem
    font: 'font-playfair-bold'
  },
  navigation: {
    size: 'text-sm',                           // 0.875rem
    font: 'font-nunito-regular'
  },
  body: {
    regular: 'text-base font-source-sans',     // 1rem
    small: 'text-sm font-source-sans'          // 0.875rem
  },
  dropdown: {
    size: '0.875rem',                          // 14px
    font: 'font-nunito-regular'
  }
};
```

### 2. Color Palette

#### Tailwind Config Extension

```javascript
// tailwind.config.js colors extension
module.exports = {
  theme: {
    extend: {
      colors: {
        'rose-gold': {
          50: '#FAF9F7',   // off-white background
          100: '#F8E1E7',  // light blush
          200: '#F0C4CE',  // lighter rose gold
          300: '#E8A7B6',  // light rose gold
          400: '#DF8A9D',  // medium rose gold
          500: '#D66D85',  // medium rose gold
          600: '#B76E79',  // PRIMARY BRAND COLOR (main buttons, accents)
          700: '#9A5B68',  // darker rose gold (hover states)
          800: '#7D4857',  // dark rose gold
          900: '#603546'   // darkest rose gold
        },
        wellness: {
          cream: '#FAF9F7',    // main background color
          blush: '#F8E1E7',    // light backgrounds, hover states
          rose: '#B76E79',     // PRIMARY - buttons, links, accents
          text: '#81775a',     // soft body text color
          gold: '#81775a',     // gold accent (same as text)
          dark: '#636260'      // dark contrast - headings, navigation
        },
        gray: {
          // Default grays from Tailwind +
          150: '#F3F4F6',      // custom darker light grey
          200: '#E5E7EB'       // darker grey for selected states
        },
        custom: {
          announcementBar: '#f4ede7',
          footerBg: '#f4ede7',
          navUnderline: '#3d3c3a',
          border: '#d1d5db',
          dropdownHover: '#f9fafb'
        }
      }
    }
  }
}
```

#### Color Usage Guide

```javascript
// Component color mapping
const colorUsage = {
  backgrounds: {
    primary: 'bg-wellness-cream',           // #FAF9F7
    footer: 'bg-[#f4ede7]',                 // custom
    announcementBar: 'bg-[#f4ede7]',        // custom
    buttonPrimary: 'bg-wellness-rose',      // #B76E79
    buttonHover: 'bg-rose-gold-700',        // #9A5B68
    white: 'bg-white'
  },
  text: {
    primary: 'text-wellness-dark',          // #636260 (nav, headings)
    body: 'text-wellness-text',             // #81775a (paragraphs)
    accent: 'text-wellness-rose',           // #B76E79 (prices, links)
    white: 'text-white'
  },
  borders: {
    default: 'border-[#d1d5db]',
    underline: 'border-[#3d3c3a]'
  },
  hover: {
    dropdown: 'hover:bg-[#f9fafb]',
    button: 'hover:bg-rose-gold-700'
  }
};
```

### 3. Spacing & Layout

#### Container Configuration

```javascript
// Max widths for content containers
const containers = {
  main: 'max-w-7xl',        // 80rem / 1280px - default content
  cart: 'max-w-4xl',        // 56rem / 896px - cart, FAQ
  about: 'max-w-3xl',       // 48rem / 768px - about page
  text: 'max-w-2xl'         // 42rem / 672px - text-focused
};

// Standard padding
const padding = {
  section: 'py-16 md:py-20',              // 4rem - 5rem vertical
  container: 'px-4 sm:px-6 lg:px-8',      // responsive horizontal
  componentGap: 'gap-8',                  // 2rem
  smallGap: 'gap-4'                       // 1rem
};

// Fixed heights
const heights = {
  navigation: 'h-20',         // 5rem / 80px
  announcementBar: 'h-10'     // 2.5rem / 40px
};
```

#### Grid Layouts

```javascript
// Common grid configurations
const grids = {
  productGrid: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  benefitsDesktop: 'grid grid-cols-6',
  benefitsTablet: 'grid grid-cols-3',
  benefitsMobile: 'grid grid-cols-2'
};
```

#### Border Radius

```javascript
const borderRadius = {
  buttons: 'rounded-none',         // Sharp corners (0px)
  dropdown: 'rounded-lg',          // 0.5rem / 8px
  pills: 'rounded-full',           // 9999px
  badges: 'rounded-full'
};
```

### 4. Tailwind Font Configuration

```javascript
// tailwind.config.js fontFamily extension
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'didot': ['Didot', 'serif'],
        'playfair-bold': ['PlayfairDisplay-Bold', 'serif'],
        'source-sans': ['SourceSansPro-Regular', 'sans-serif'],
        'nunito-regular': ['NunitoSans-Regular', 'sans-serif'],
        'nunito-light': ['NunitoSans-Light', 'sans-serif']
      }
    }
  }
}
```

### 5. CSS Font-Face Declarations

```css
/* Add to index.css or App.css */
@font-face {
  font-family: 'NunitoSans-Light';
  src: url('/fonts/NunitoSans-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'NunitoSans-Regular';
  src: url('/fonts/NunitoSans-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'PlayfairDisplay-Bold';
  src: url('/fonts/PlayfairDisplay-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'SourceSansPro-Regular';
  src: url('/fonts/SourceSansPro-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Didot';
  src: url('/fonts/Didot.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}
```

---

## Shopify Configuration

### 1. Store Credentials

```javascript
// .env file (DO NOT commit to git)
VITE_SHOPIFY_DOMAIN=shop.nestfortwo.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=adc99c15957a96e09c044b00f78c7557
```

### 2. Shopify Client Initialization

```javascript
// src/config/shopify.js
import Client from 'shopify-buy';

export const shopifyClient = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
});

// LocalStorage key for cart persistence
export const CART_STORAGE_KEY = 'nestfortwo_cart_id';
```

### 3. Product Configuration

#### Freshly Cooked Bird's Nest Products

```javascript
// src/config/products.js

export const PRODUCTS = {
  ZERO_SUGAR: {
    id: 'gid://shopify/Product/7859390251089',
    name: 'Zero Sugar Sachet',
    category: 'Freshly Cooked Bird\'s Nest',
    label: 'FOR PREGNANT LADIES & DIABETICS',
    images: [
      '/images/ZeroSugar.png',
      '/images/ZeroSugar2.png',
      '/images/ZeroSugar3.png',
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
    name: 'Honey Sachet',
    category: 'Freshly Cooked Bird\'s Nest',
    label: 'FOR CHILDREN',
    images: [
      '/images/Honey.png',
      '/images/Honey2.png',
      '/images/Honey3.png',
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
    name: 'Rock Sugar Sachet',
    category: 'Freshly Cooked Bird\'s Nest',
    label: 'FOR ELDERLY',
    images: [
      '/images/RockSugar.png',
      '/images/RockSugar2.png',
      '/images/RockSugar3.png',
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
    images: [
      '/images/Prune1.png',
      '/images/Prune2.png',
      '/images/Prune3.png',
      '/images/PruneMeasure.png'
    ]
  }
};
```

### 4. Business Rules Configuration

```javascript
// src/config/businessRules.js

export const BUSINESS_RULES = {
  // Delivery
  delivery: {
    minimumNoticeHours: 24,
    freeDeliveryThreshold: 120,
    timeSlots: ['3-5PM', '7-9PM'],
    defaultTimeSlot: '3-5PM'
  },

  // Subscription
  subscription: {
    deliveryDay: 'Sunday',
    deliveriesPerMonth: 3,
    bottlesPerDelivery: 10,
    totalBottles: 30,
    orderCutoffDay: 'Saturday',
    orderCutoffTime: '22:00', // 10pm
    discount: '17%'
  },

  // Pricing
  pricing: {
    oneTime50ml: { bottles: 6, price: 72, perBottle: 12 },
    oneTime100ml: { bottles: 6, price: 144, perBottle: 24 },
    subscription50ml: { bottles: 30, price: 300, perBottle: 10 },
    subscription100ml: { bottles: 30, price: 600, perBottle: 20 }
  },

  // Validation
  validation: {
    maxInstructionWords: 100,
    allowedDateOffset: 1 // Cannot select today, minimum tomorrow
  }
};
```

---

## Project Structure

### Recommended Folder Structure

```
nest-for-two/
├── public/
│   ├── fonts/
│   │   ├── NunitoSans-Light.ttf
│   │   ├── NunitoSans-Regular.ttf
│   │   ├── PlayfairDisplay-Bold.ttf
│   │   ├── SourceSansPro-Regular.otf
│   │   └── Didot.otf
│   ├── images/
│   │   ├── products/
│   │   │   ├── Honey.png
│   │   │   ├── Honey2.png
│   │   │   ├── Honey3.png
│   │   │   ├── ZeroSugar.png
│   │   │   ├── ZeroSugar2.png
│   │   │   ├── ZeroSugar3.png
│   │   │   ├── RockSugar.png
│   │   │   ├── RockSugar2.png
│   │   │   ├── RockSugar3.png
│   │   │   ├── Dry1.png
│   │   │   ├── Dry2.png
│   │   │   ├── Dry3.png
│   │   │   ├── NestwKueh.png
│   │   │   ├── Original1.png
│   │   │   ├── Original2.png
│   │   │   ├── Original3.png
│   │   │   ├── OriginalMeasure.png
│   │   │   ├── Prune1.png
│   │   │   ├── Prune2.png
│   │   │   ├── Prune3.png
│   │   │   ├── PruneMeasure.png
│   │   │   ├── All_4.png
│   │   │   ├── All_5.png
│   │   │   └── All_6.png
│   │   ├── icons/
│   │   │   ├── MuscleRecovery.svg
│   │   │   ├── HormonalHarmony.svg
│   │   │   ├── SkinRenewal.svg
│   │   │   ├── StrongerImmunity.svg
│   │   │   ├── LastingEnergy.svg
│   │   │   ├── BetterDigestion.svg
│   │   │   ├── Lemon8.png
│   │   │   └── xiaohongshu.svg
│   │   ├── Birdnest Logo transparent.png
│   │   ├── logo.svg
│   │   ├── Main.png
│   │   ├── HeroAbout.png
│   │   ├── Collaborations.png
│   │   └── Favicon.png
│   └── favicon.ico
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── AnnouncementBar.jsx
│   │   │   └── MobileMenu.jsx
│   │   ├── product/
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductCarousel.jsx
│   │   │   ├── ProductOptions.jsx
│   │   │   ├── PurchaseTypeToggle.jsx
│   │   │   ├── SizeSelector.jsx
│   │   │   ├── QuantitySelector.jsx
│   │   │   ├── DatePicker.jsx
│   │   │   ├── TimeSlotSelector.jsx
│   │   │   ├── InstructionsField.jsx
│   │   │   └── CollapsibleSection.jsx
│   │   ├── cart/
│   │   │   ├── CartIcon.jsx
│   │   │   ├── CartItem.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── EmptyCart.jsx
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── BenefitsCarousel.jsx
│   │   │   ├── CategorySwitch.jsx
│   │   │   ├── ProductGrid.jsx
│   │   │   └── ReviewCarousel.jsx
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Tooltip.jsx
│   │   │   ├── Accordion.jsx
│   │   │   └── Dropdown.jsx
│   │   └── shared/
│   │       ├── WhatsAppButton.jsx
│   │       └── SocialLinks.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Cart.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── FAQ.jsx
│   │   ├── Partnerships.jsx
│   │   └── products/
│   │       ├── ProductHoney.jsx
│   │       ├── ProductZeroSugar.jsx
│   │       ├── ProductRockSugar.jsx
│   │       ├── ProductDried.jsx
│   │       ├── KueLapisNest.jsx
│   │       ├── OriginalKueLapis.jsx
│   │       └── PruneKueLapis.jsx
│   ├── hooks/
│   │   ├── useCart.js
│   │   ├── useCarousel.js
│   │   ├── useTouch.js
│   │   ├── useModal.js
│   │   └── useLocalStorage.js
│   ├── context/
│   │   ├── CartContext.jsx
│   │   └── ShopifyContext.jsx
│   ├── config/
│   │   ├── shopify.js
│   │   ├── products.js
│   │   └── businessRules.js
│   ├── utils/
│   │   ├── dateHelpers.js
│   │   ├── priceCalculators.js
│   │   ├── validators.js
│   │   └── formatters.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

---

## Core Functionalities

### 1. Cart Management

#### Cart State & Persistence

```javascript
// src/hooks/useCart.js - Core cart hook

import { useState, useEffect } from 'react';
import { shopifyClient, CART_STORAGE_KEY } from '../config/shopify';

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);

  // Initialize cart on mount
  useEffect(() => {
    initializeCart();
  }, []);

  // Initialize or fetch existing cart
  const initializeCart = async () => {
    try {
      const existingCartId = localStorage.getItem(CART_STORAGE_KEY);

      if (existingCartId) {
        const existingCart = await shopifyClient.checkout.fetch(existingCartId);

        if (existingCart && !existingCart.completedAt) {
          setCart(existingCart);
          updateItemCount(existingCart);
        } else {
          await createNewCart();
        }
      } else {
        await createNewCart();
      }
    } catch (error) {
      console.error('Cart initialization error:', error);
      await createNewCart();
    } finally {
      setLoading(false);
    }
  };

  // Create new cart
  const createNewCart = async () => {
    try {
      const newCart = await shopifyClient.checkout.create();
      localStorage.setItem(CART_STORAGE_KEY, newCart.id);
      setCart(newCart);
      setItemCount(0);
    } catch (error) {
      console.error('Create cart error:', error);
    }
  };

  // Update item count
  const updateItemCount = (cartData) => {
    const count = cartData.lineItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  };

  // Add item to cart
  const addItem = async (variantId, quantity, customAttributes = []) => {
    try {
      const lineItem = {
        variantId,
        quantity,
        customAttributes
      };

      const updatedCart = await shopifyClient.checkout.addLineItems(cart.id, [lineItem]);
      setCart(updatedCart);
      updateItemCount(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  };

  // Update quantity
  const updateQuantity = async (lineItemId, quantity) => {
    try {
      const lineItem = { id: lineItemId, quantity };
      const updatedCart = await shopifyClient.checkout.updateLineItems(cart.id, [lineItem]);
      setCart(updatedCart);
      updateItemCount(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Update quantity error:', error);
      throw error;
    }
  };

  // Remove item
  const removeItem = async (lineItemId) => {
    try {
      const updatedCart = await shopifyClient.checkout.removeLineItems(cart.id, [lineItemId]);
      setCart(updatedCart);
      updateItemCount(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Remove item error:', error);
      throw error;
    }
  };

  // Checkout
  const checkout = () => {
    if (cart && cart.webUrl) {
      window.location.href = cart.webUrl;
    }
  };

  return {
    cart,
    loading,
    itemCount,
    addItem,
    updateQuantity,
    removeItem,
    checkout
  };
};
```

### 2. Image Carousel

```javascript
// src/hooks/useCarousel.js

import { useState, useEffect, useRef } from 'react';

export const useCarousel = ({
  itemCount,
  autoPlayInterval = 5000,
  autoPlay = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef(null);
  const autoPlayTimeout = useRef(null);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      startAutoPlay();
    }
    return () => {
      clearAutoPlay();
    };
  }, [currentIndex, autoPlay]);

  const startAutoPlay = () => {
    clearAutoPlay();
    setProgress(0);

    // Progress bar animation
    const progressStep = 100 / (autoPlayInterval / 50);
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + progressStep;
      });
    }, 50);

    // Auto advance
    autoPlayTimeout.current = setTimeout(() => {
      next();
    }, autoPlayInterval);
  };

  const clearAutoPlay = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    if (autoPlayTimeout.current) {
      clearTimeout(autoPlayTimeout.current);
    }
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  };

  const goTo = (index) => {
    setCurrentIndex(index);
    if (autoPlay) {
      startAutoPlay();
    }
  };

  return {
    currentIndex,
    progress,
    next,
    prev,
    goTo
  };
};
```

### 3. Touch/Swipe Gestures

```javascript
// src/hooks/useTouch.js

import { useState, useRef } from 'react';

export const useTouch = ({ onSwipeLeft, onSwipeRight, threshold = 50 }) => {
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > threshold;
    const isRightSwipe = distance < -threshold;

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft();
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight();
    }
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};
```

### 4. Date Validation

```javascript
// src/utils/dateHelpers.js

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getTomorrowDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split('T')[0];
};

export const getNextSunday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;
  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  return nextSunday.toISOString().split('T')[0];
};

export const isDateAllowed = (dateString, purchaseType) => {
  const selectedDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Cannot select today (24hr notice rule)
  if (selectedDate <= today) {
    return {
      allowed: false,
      error: 'Please select a date at least 24 hours in advance'
    };
  }

  // Subscription: Must be Sunday
  if (purchaseType === 'subscription') {
    if (selectedDate.getDay() !== 0) {
      return {
        allowed: false,
        error: 'Subscription deliveries are only available on Sundays'
      };
    }

    // Check if it's past Saturday 10pm for next Sunday
    const now = new Date();
    if (now.getDay() === 6 && now.getHours() >= 22) {
      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + 1);
      nextSunday.setHours(0, 0, 0, 0);

      if (selectedDate.getTime() === nextSunday.getTime()) {
        return {
          allowed: false,
          error: 'Orders for tomorrow must be placed before Saturday 10pm'
        };
      }
    }
  }

  return { allowed: true };
};

export const getMinDate = (purchaseType) => {
  if (purchaseType === 'subscription') {
    return getNextSunday();
  }
  return getTomorrowDate();
};
```

### 5. Price Calculation

```javascript
// src/utils/priceCalculators.js

export const calculateTotal = ({
  basePrice,
  quantity,
  purchaseType
}) => {
  const subtotal = basePrice * quantity;
  return subtotal;
};

export const calculateSubscriptionTotal = ({
  pricePerBottle,
  bottlesPerDelivery = 10,
  deliveries = 3,
  quantity
}) => {
  const totalBottles = bottlesPerDelivery * deliveries * quantity;
  const total = totalBottles * pricePerBottle;
  return {
    totalBottles,
    total,
    perDelivery: pricePerBottle * bottlesPerDelivery * quantity
  };
};

export const formatPrice = (amount) => {
  return `$${amount.toFixed(2)}`;
};

export const calculateSavings = (oneTimePrice, subscriptionPrice) => {
  const savings = oneTimePrice - subscriptionPrice;
  const percentage = ((savings / oneTimePrice) * 100).toFixed(0);
  return {
    amount: savings,
    percentage: `${percentage}%`
  };
};
```

### 6. Word Count Validation

```javascript
// src/utils/validators.js

export const checkWordCount = (text, maxWords = 100) => {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const count = words.length;

  return {
    count,
    isValid: count <= maxWords,
    remaining: maxWords - count
  };
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};
```

---

## Components Breakdown

### 1. Layout Components

#### Navbar Component

```jsx
// src/components/layout/Navbar.jsx

import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartIcon from '../cart/CartIcon';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Announcement Bar */}
      <div className="fixed top-0 left-0 right-0 bg-[#f4ede7] h-10 flex items-center justify-center z-50 font-nunito-light text-sm">
        FREE DELIVERY for orders above $120
      </div>

      {/* Main Navigation */}
      <nav className="fixed top-10 left-0 right-0 bg-white h-20 border-b border-[#d1d5db] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden"
          >
            {/* Hamburger Icon */}
          </button>

          {/* Logo */}
          <Link to="/" className="font-didot text-xl md:text-2xl font-bold text-wellness-dark">
            NEST FOR TWO
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 font-nunito-regular text-sm">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="text-wellness-dark hover:border-b-2 hover:border-[#3d3c3a] transition-all duration-300">
                PRODUCTS
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg py-2 w-64">
                  <Link to="/products/freshly-cooked" className="block px-4 py-2 hover:bg-[#f9fafb]">
                    Freshly Cooked Bird's Nest
                  </Link>
                  <Link to="/products/dried" className="block px-4 py-2 hover:bg-[#f9fafb]">
                    Dried Bird's Nest
                  </Link>
                  <Link to="/products/kue-lapis" className="block px-4 py-2 hover:bg-[#f9fafb]">
                    Kue Lapis
                  </Link>
                </div>
              )}
            </div>

            <Link to="/about" className="hover:border-b-2 hover:border-[#3d3c3a] transition-all duration-300">
              ABOUT
            </Link>
            <Link to="/partnerships" className="hover:border-b-2 hover:border-[#3d3c3a] transition-all duration-300">
              COLLABORATIONS
            </Link>
            <Link to="/faq" className="hover:border-b-2 hover:border-[#3d3c3a] transition-all duration-300">
              FAQS
            </Link>
            <Link to="/contact" className="hover:border-b-2 hover:border-[#3d3c3a] transition-all duration-300">
              CONTACT
            </Link>
          </div>

          {/* Cart Icon */}
          <CartIcon />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
```

**Key Features:**
- Fixed positioning with announcement bar (total 120px from top)
- Desktop: Horizontal navigation with hover underline animation
- Mobile: Hamburger menu
- Products dropdown (hover on desktop, click on mobile)
- Cart icon with item count badge
- Z-index: 50 to stay above content

#### Footer Component

```jsx
// src/components/layout/Footer.jsx

import SocialLinks from '../shared/SocialLinks';

const Footer = () => {
  return (
    <footer className="bg-[#f4ede7] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 mb-8 font-nunito-regular text-sm">
          <a href="/shipping" className="text-wellness-dark hover:text-wellness-rose">
            SHIPPING
          </a>
          <a href="/faq" className="text-wellness-dark hover:text-wellness-rose">
            FAQ
          </a>
          <a href="/partnerships" className="text-wellness-dark hover:text-wellness-rose">
            COLLABORATIONS
          </a>
          <a href="/contact" className="text-wellness-dark hover:text-wellness-rose">
            CONTACT US
          </a>
        </div>

        {/* Social Media Icons */}
        <SocialLinks />

        {/* Email */}
        <div className="text-center mb-4 font-source-sans text-wellness-text">
          <a href="mailto:contact@nestfortwo.com" className="hover:text-wellness-rose">
            contact@nestfortwo.com
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm font-source-sans text-wellness-text">
          © 2025 Nest for Two. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

#### Social Links Component

```jsx
// src/components/shared/SocialLinks.jsx

const SocialLinks = () => {
  const socials = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/nestfortwo.sg',
      icon: 'instagram-icon' // Use react-icons or custom SVG
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/nestfortwo',
      icon: 'facebook-icon'
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@nestfortwo',
      icon: 'tiktok-icon'
    },
    {
      name: 'Lemon8',
      url: 'https://lemon8-app.com/@nestfortwo',
      icon: '/images/icons/Lemon8.png'
    },
    {
      name: 'Xiaohongshu',
      url: 'https://www.xiaohongshu.com/user/profile/68a03186000000001900d5ff',
      icon: '/images/icons/xiaohongshu.svg'
    }
  ];

  return (
    <div className="flex justify-center gap-6 mb-6">
      {socials.map(social => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-wellness-blush transition-colors"
        >
          {/* Icon component */}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
```

#### WhatsApp Sticky Button

```jsx
// src/components/shared/WhatsAppButton.jsx

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/+6580336503"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-40"
    >
      {/* WhatsApp Icon (white) */}
      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
        {/* WhatsApp SVG path */}
      </svg>
    </a>
  );
};

export default WhatsAppButton;
```

**Position:** Fixed bottom-right (24px from edges), z-index 40
**Style:** Green circle (#25D366), white icon, scale on hover
**Note:** Hidden on cart.html page

### 2. Product Components

#### Product Card (Homepage)

```jsx
// src/components/product/ProductCard.jsx

import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={product.link}
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Floating Label (top-right) */}
        {product.label && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1 text-xs font-nunito-regular">
            {product.label}
          </div>
        )}

        {/* Add to Cart Button (slides up on hover) */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-wellness-rose text-white py-3 text-center font-nunito-regular transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          ADD TO CART
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4">
        <h3 className="font-playfair-bold text-lg text-wellness-dark">
          {product.name}
        </h3>
        <p className="font-source-sans text-wellness-rose mt-1">
          From ${product.startingPrice}
        </p>
      </div>
    </Link>
  );
};

export default ProductCard;
```

**Features:**
- Square aspect ratio image
- Floating label (top-right): "FOR CHILDREN", "FOR PREGNANT LADIES & DIABETICS", "FOR ELDERLY"
- "ADD TO CART" button slides up from bottom on hover
- Product title in PlayfairDisplay-Bold
- Price in wellness-rose color

#### Product Carousel

```jsx
// src/components/product/ProductCarousel.jsx

import { useCarousel } from '../../hooks/useCarousel';
import { useTouch } from '../../hooks/useTouch';

const ProductCarousel = ({ images, autoPlay = true }) => {
  const { currentIndex, progress, next, prev, goTo } = useCarousel({
    itemCount: images.length,
    autoPlayInterval: 5000,
    autoPlay
  });

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouch({
    onSwipeLeft: next,
    onSwipeRight: prev
  });

  return (
    <div className="relative">
      {/* Progress Bar (auto-play only) */}
      {autoPlay && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-10">
          <div
            className="h-full bg-wellness-rose transition-all duration-50"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Main Image */}
      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-full flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
      >
        ←
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white"
      >
        →
      </button>

      {/* Thumbnail Navigation (Desktop) or Dots (Mobile) */}
      <div className="mt-4">
        {/* Desktop: Thumbnails */}
        <div className="hidden md:grid grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`border-2 ${
                index === currentIndex ? 'border-wellness-rose' : 'border-gray-200'
              }`}
            >
              <img src={image} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>

        {/* Mobile: Dots */}
        <div className="flex md:hidden justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentIndex ? 'bg-wellness-rose' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
```

**Features:**
- Auto-rotating carousel (5 seconds per slide) with progress bar
- Touch/swipe gestures (50px threshold)
- Arrow navigation buttons
- Desktop: Thumbnail grid (6 for honey/zero/rock, 3 for dried)
- Mobile: Dot navigation

#### Purchase Type Toggle

```jsx
// src/components/product/PurchaseTypeToggle.jsx

const PurchaseTypeToggle = ({ selected, onChange }) => {
  return (
    <div className="border border-[#d1d5db] rounded-lg p-1 inline-flex">
      <button
        onClick={() => onChange('one-time')}
        className={`px-6 py-2 rounded font-nunito-regular text-sm transition-colors ${
          selected === 'one-time'
            ? 'bg-wellness-rose text-white'
            : 'bg-white text-wellness-dark'
        }`}
      >
        One-time Purchase
      </button>
      <button
        onClick={() => onChange('subscription')}
        className={`px-6 py-2 rounded font-nunito-regular text-sm transition-colors ${
          selected === 'subscription'
            ? 'bg-wellness-rose text-white'
            : 'bg-white text-wellness-dark'
        }`}
      >
        Monthly Subscription
        <span className="ml-2 text-xs">(17% OFF)</span>
      </button>
    </div>
  );
};

export default PurchaseTypeToggle;
```

#### Size Selector (Radio Buttons)

```jsx
// src/components/product/SizeSelector.jsx

const SizeSelector = ({ options, selected, onChange, purchaseType }) => {
  return (
    <div className="space-y-2">
      {options.map(option => (
        <label
          key={option.size}
          className="flex items-center justify-between border border-[#d1d5db] rounded p-4 cursor-pointer hover:border-wellness-rose"
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="size"
              value={option.size}
              checked={selected === option.size}
              onChange={() => onChange(option.size)}
              className="w-4 h-4 text-wellness-rose"
            />
            <div>
              <div className="font-nunito-regular">
                {option.size} {purchaseType === 'one-time' ? '(6 bottles)' : '(30 bottles)'}
              </div>
              <div className="text-sm text-wellness-text">
                ${option.pricePerBottle}/bottle
              </div>
            </div>
          </div>
          <div className="font-playfair-bold text-xl text-wellness-rose">
            ${option.price}
          </div>
        </label>
      ))}
    </div>
  );
};

export default SizeSelector;
```

#### Quantity Selector

```jsx
// src/components/product/QuantitySelector.jsx

const QuantitySelector = ({ quantity, onChange, min = 1 }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="w-10 h-10 border border-[#d1d5db] flex items-center justify-center hover:border-wellness-rose disabled:opacity-50"
      >
        −
      </button>
      <span className="font-nunito-regular text-lg w-12 text-center">
        {quantity}
      </span>
      <button
        onClick={() => onChange(quantity + 1)}
        className="w-10 h-10 border border-[#d1d5db] flex items-center justify-center hover:border-wellness-rose"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
```

#### Date Picker

```jsx
// src/components/product/DatePicker.jsx

import { useState } from 'react';
import { formatDate, isDateAllowed, getMinDate } from '../../utils/dateHelpers';

const DatePicker = ({ purchaseType, value, onChange, required = true }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [error, setError] = useState('');

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const validation = isDateAllowed(selectedDate, purchaseType);

    if (!validation.allowed) {
      setError(validation.error);
      onChange('');
      setDisplayValue('');
    } else {
      setError('');
      onChange(selectedDate);
      setDisplayValue(formatDate(selectedDate));
    }
  };

  const clearDate = () => {
    onChange('');
    setDisplayValue('');
    setError('');
  };

  return (
    <div className="space-y-2">
      <label className="block font-nunito-regular text-wellness-dark">
        Preferred Delivery Date {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="date"
          min={getMinDate(purchaseType)}
          value={value}
          onChange={handleDateChange}
          className="w-full border border-[#d1d5db] rounded px-4 py-2 font-source-sans"
          required={required}
        />

        {displayValue && (
          <div className="absolute top-full mt-1 text-sm font-source-sans text-wellness-text">
            Selected: {displayValue}
          </div>
        )}

        {displayValue && (
          <button
            onClick={clearDate}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-wellness-text hover:text-wellness-rose"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-500 font-source-sans">
          {error}
        </div>
      )}

      <div className="text-xs text-wellness-text font-source-sans">
        {purchaseType === 'subscription'
          ? 'Deliveries are every Sunday for 3 weeks'
          : 'Delivery requires 24 hours advance notice'}
      </div>
    </div>
  );
};

export default DatePicker;
```

**Features:**
- Native date input with custom validation
- Format display: DD/MM/YYYY
- Min date: tomorrow (one-time) or next Sunday (subscription)
- Validation: 24hr notice, Sunday-only for subscription
- Clear button when date is selected

#### Time Slot Selector

```jsx
// src/components/product/TimeSlotSelector.jsx

const TimeSlotSelector = ({ selected, onChange }) => {
  const timeSlots = ['3-5PM', '7-9PM'];

  return (
    <div className="space-y-2">
      <label className="block font-nunito-regular text-wellness-dark">
        Delivery Time Slot <span className="text-red-500">*</span>
      </label>

      <div className="flex gap-4">
        {timeSlots.map(slot => (
          <label
            key={slot}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="timeSlot"
              value={slot}
              checked={selected === slot}
              onChange={() => onChange(slot)}
              className="w-4 h-4 text-wellness-rose"
            />
            <span className="font-source-sans">{slot}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
```

**Default:** 3-5PM

#### Instructions Field

```jsx
// src/components/product/InstructionsField.jsx

import { useState } from 'react';
import { checkWordCount } from '../../utils/validators';

const InstructionsField = ({ value, onChange, maxWords = 100 }) => {
  const wordCountResult = checkWordCount(value, maxWords);

  return (
    <div className="space-y-2">
      <label className="block font-nunito-regular text-wellness-dark">
        Delivery Instructions (Optional)
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Leave at door, Call upon arrival"
        rows={4}
        className="w-full border border-[#d1d5db] rounded px-4 py-2 font-source-sans resize-none"
      />

      <div className={`text-sm text-right ${
        wordCountResult.isValid ? 'text-wellness-text' : 'text-red-500'
      }`}>
        {wordCountResult.count} / {maxWords} words
      </div>
    </div>
  );
};

export default InstructionsField;
```

**Features:**
- Textarea with word counter
- Max 100 words
- Real-time validation
- Changes color to red when limit exceeded

#### Collapsible Section (Accordion)

```jsx
// src/components/product/CollapsibleSection.jsx

import { useState } from 'react';

const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-[#d1d5db]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 font-nunito-regular text-left"
      >
        <span className="text-lg">{title}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="pb-4 font-source-sans text-wellness-text">
          {children}
        </div>
      )}
    </div>
  );
};

export default CollapsibleSection;
```

**Usage on Product Pages:**
- Description (default open)
- Storage & Consumption
- Delivery & Inclusions

**Behavior:** Only one section open at a time (accordion style)

### 3. Cart Components

#### Cart Icon with Badge

```jsx
// src/components/cart/CartIcon.jsx

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

const CartIcon = () => {
  const { itemCount } = useContext(CartContext);

  return (
    <Link to="/cart" className="relative">
      {/* Cart SVG Icon */}
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* Cart icon path */}
      </svg>

      {/* Badge */}
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-wellness-rose text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-nunito-regular">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
```

**Features:**
- Displays cart item count
- Badge hidden when count = 0
- Synced between desktop and mobile nav
- Updates in real-time

#### Cart Item

```jsx
// src/components/cart/CartItem.jsx

import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import QuantitySelector from '../product/QuantitySelector';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useContext(CartContext);

  const customAttributes = item.customAttributes || [];
  const deliveryDate = customAttributes.find(attr => attr.key === 'Delivery Date')?.value;
  const timeSlot = customAttributes.find(attr => attr.key === 'Time Slot')?.value;

  return (
    <div className="flex gap-4 border-b border-[#d1d5db] py-4">
      {/* Product Image */}
      <img
        src={item.variant.image.src}
        alt={item.title}
        className="w-24 h-24 object-cover"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-playfair-bold text-lg">{item.title}</h3>
        <p className="text-sm text-wellness-text font-source-sans">
          {item.variant.title}
        </p>

        {deliveryDate && (
          <p className="text-sm text-wellness-text font-source-sans">
            Delivery: {deliveryDate} ({timeSlot})
          </p>
        )}

        <p className="font-source-sans text-wellness-rose mt-2">
          ${item.variant.price.amount}
        </p>

        <div className="flex items-center gap-4 mt-2">
          <QuantitySelector
            quantity={item.quantity}
            onChange={(newQty) => updateQuantity(item.id, newQty)}
          />

          <button
            onClick={() => removeItem(item.id)}
            className="text-sm text-red-500 hover:text-red-700 font-source-sans"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Line Total */}
      <div className="font-playfair-bold text-xl text-wellness-dark">
        ${(item.variant.price.amount * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
```

**Features:**
- Product thumbnail image
- Variant details (size, purchase type)
- Custom attributes (delivery date, time slot)
- Quantity adjustment
- Remove button
- Line item total

#### Cart Summary

```jsx
// src/components/cart/CartSummary.jsx

import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const CartSummary = () => {
  const { cart, checkout } = useContext(CartContext);

  if (!cart) return null;

  const subtotal = cart.lineItems.reduce(
    (total, item) => total + (item.variant.price.amount * item.quantity),
    0
  );

  const freeDeliveryThreshold = 120;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;

  return (
    <div className="border-t border-[#d1d5db] pt-6 space-y-4">
      <div className="flex justify-between font-source-sans">
        <span>Subtotal:</span>
        <span className="font-playfair-bold text-xl">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-source-sans text-sm">
        <span>Delivery:</span>
        <span className="text-wellness-rose">
          {isFreeDelivery ? 'FREE' : 'Calculated at checkout'}
        </span>
      </div>

      {!isFreeDelivery && (
        <div className="text-sm text-wellness-text font-source-sans">
          Add ${(freeDeliveryThreshold - subtotal).toFixed(2)} more for free delivery
        </div>
      )}

      <button
        onClick={checkout}
        className="w-full bg-wellness-rose text-white py-3 font-nunito-regular hover:bg-rose-gold-700 transition-colors"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
```

**Features:**
- Subtotal calculation
- Free delivery indicator (orders > $120)
- "Add $X more" message if below threshold
- Checkout button redirects to Shopify checkout URL

#### Empty Cart State

```jsx
// src/components/cart/EmptyCart.jsx

import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="text-center py-16">
      <h2 className="font-playfair-bold text-3xl mb-4 text-wellness-dark">
        Your cart is empty
      </h2>
      <p className="font-source-sans text-wellness-text mb-8">
        Add some products to get started!
      </p>
      <Link
        to="/"
        className="inline-block bg-wellness-rose text-white px-8 py-3 font-nunito-regular hover:bg-rose-gold-700 transition-colors"
      >
        Shop Products
      </Link>
    </div>
  );
};

export default EmptyCart;
```

### 4. Home Page Components

#### Hero Section

```jsx
// src/components/home/HeroSection.jsx

import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative w-full" style={{ aspectRatio: '16/9' }}>
      <img
        src="/images/Main.png"
        alt="Nest for Two Hero"
        className="w-full h-full object-cover"
      />

      {/* Shop Now Button (positioned in left white space) */}
      <div className="absolute left-8 md:left-16 bottom-8 md:bottom-16">
        <Link
          to="/products"
          className="inline-block bg-wellness-rose text-white px-8 py-3 rounded-lg font-nunito-regular hover:bg-rose-gold-700 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
```

**Aspect Ratio:** 16:9
**Button Position:** Left side in white space area

#### Benefits Carousel

```jsx
// src/components/home/BenefitsCarousel.jsx

import { useState } from 'react';

const BenefitsCarousel = () => {
  const benefits = [
    { icon: '/images/icons/MuscleRecovery.svg', label: 'Muscle Recovery' },
    { icon: '/images/icons/HormonalHarmony.svg', label: 'Hormonal Harmony' },
    { icon: '/images/icons/SkinRenewal.svg', label: 'Skin Renewal' },
    { icon: '/images/icons/StrongerImmunity.svg', label: 'Stronger Immunity' },
    { icon: '/images/icons/LastingEnergy.svg', label: 'Lasting Energy' },
    { icon: '/images/icons/BetterDigestion.svg', label: 'Better Digestion' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Desktop: Show all 6
  // Tablet (md): Show 3, carousel
  // Mobile: Show 2, carousel

  return (
    <>
      {/* Desktop: All visible */}
      <div className="hidden lg:grid grid-cols-6 gap-4">
        {benefits.map((benefit, idx) => (
          <div key={idx} className="text-center">
            <img src={benefit.icon} alt={benefit.label} className="w-16 h-16 mx-auto mb-2" />
            <p className="font-source-sans text-sm">{benefit.label}</p>
          </div>
        ))}
      </div>

      {/* Tablet: 3 per view */}
      <div className="hidden md:block lg:hidden relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {benefits.map((benefit, idx) => (
              <div key={idx} className="w-1/3 flex-shrink-0 text-center px-2">
                <img src={benefit.icon} alt={benefit.label} className="w-16 h-16 mx-auto mb-2" />
                <p className="font-source-sans text-sm">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Arrow buttons */}
      </div>

      {/* Mobile: 2 per view */}
      <div className="block md:hidden relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 50}%)` }}
          >
            {benefits.map((benefit, idx) => (
              <div key={idx} className="w-1/2 flex-shrink-0 text-center px-2">
                <img src={benefit.icon} alt={benefit.label} className="w-12 h-12 mx-auto mb-2" />
                <p className="font-source-sans text-xs">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Arrow buttons */}
      </div>
    </>
  );
};

export default BenefitsCarousel;
```

**Icons:** 6 total (Muscle Recovery, Hormonal Harmony, Skin Renewal, Stronger Immunity, Lasting Energy, Better Digestion)
**Desktop:** All 6 visible in grid
**Tablet:** 3 visible, arrow navigation
**Mobile:** 2 visible, arrow navigation

#### Category Switch

```jsx
// src/components/home/CategorySwitch.jsx

import { useState } from 'react';

const CategorySwitch = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState('freshly-cooked');

  const categories = [
    { id: 'freshly-cooked', label: 'Freshly Cooked Bird\'s Nest' },
    { id: 'dried', label: 'Dried Bird\'s Nest' }
  ];

  const handleSwitch = (categoryId) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="flex justify-center gap-4 mb-8">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleSwitch(category.id)}
          className={`px-6 py-2 font-nunito-regular transition-all ${
            activeCategory === category.id
              ? 'bg-wellness-rose text-white'
              : 'bg-white text-wellness-dark border border-[#d1d5db] hover:border-wellness-rose'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategorySwitch;
```

**Features:**
- Switches between Freshly Cooked and Dried product grids
- Arrow buttons for navigation
- Updates category description text

#### Review Carousel

```jsx
// src/components/home/ReviewCarousel.jsx

import { useState } from 'react';

const ReviewCarousel = () => {
  const reviews = [
    { name: 'Customer 1', rating: 5, text: 'Amazing product!', date: '2024-01-15' },
    { name: 'Customer 2', rating: 5, text: 'Highly recommend', date: '2024-01-10' },
    { name: 'Customer 3', rating: 4, text: 'Great quality', date: '2024-01-05' },
    { name: 'Customer 4', rating: 5, text: 'Will buy again', date: '2023-12-20' },
    { name: 'Customer 5', rating: 5, text: 'Excellent service', date: '2023-12-15' },
    { name: 'Customer 6', rating: 4, text: 'Very satisfied', date: '2023-12-10' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // 3D carousel: center card scale(1.1), side cards scale(0.8)
  // Only 3 cards visible at a time (prev, current, next)

  return (
    <div className="relative h-96 perspective-1000">
      <div className="relative h-full flex items-center justify-center">
        {reviews.map((review, idx) => {
          const offset = idx - currentIndex;
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 1;

          return (
            <div
              key={idx}
              className={`absolute transition-all duration-300 ${
                !isVisible && 'opacity-0 pointer-events-none'
              }`}
              style={{
                transform: `translateX(${offset * 120}%) scale(${isCenter ? 1.1 : 0.8})`,
                opacity: isCenter ? 1 : 0.6,
                zIndex: isCenter ? 3 : 1
              }}
            >
              {/* Review Card */}
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="font-source-sans text-wellness-text mb-4">{review.text}</p>
                <div className="font-nunito-regular text-sm text-wellness-dark">{review.name}</div>
                <div className="font-source-sans text-xs text-wellness-text">{review.date}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + reviews.length) % reviews.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg"
      >
        ←
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % reviews.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg"
      >
        →
      </button>

      {/* Leave Review Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => {/* Open review modal */}}
          className="bg-wellness-rose text-white px-6 py-2 font-nunito-regular hover:bg-rose-gold-700"
        >
          Leave a Review
        </button>
      </div>
    </div>
  );
};

export default ReviewCarousel;
```

**Features:**
- 6 review cards total
- 3D perspective carousel
- Center card: scale(1.1), opacity 1, z-index 3
- Side cards: scale(0.8), opacity 0.6, z-index 1
- Left/Right arrow navigation
- Touch/swipe gestures
- "Leave a Review" button opens modal

### 5. UI Components

#### Modal

```jsx
// src/components/ui/Modal.jsx

import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#d1d5db]">
          <h2 className="font-playfair-bold text-2xl">{title}</h2>
          <button
            onClick={onClose}
            className="text-2xl text-wellness-text hover:text-wellness-dark"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
```

**Features:**
- Overlay background (50% black opacity)
- Prevents body scroll when open
- Click outside to close
- Close button (X) in header
- Max width 2xl, max height 90vh

#### Tooltip

```jsx
// src/components/ui/Tooltip.jsx

import { useState } from 'react';

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-wellness-text text-xs text-wellness-text hover:border-wellness-rose hover:text-wellness-rose"
      >
        i
      </button>

      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 bg-wellness-dark text-white p-3 rounded text-sm font-source-sans z-10">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-wellness-dark" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
```

**Usage:** Info tooltips for size, frequency, quantity on product pages

#### Accordion

```jsx
// src/components/ui/Accordion.jsx

import { useState } from 'react';

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => (
        <div key={index} className="border-b border-[#d1d5db]">
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between py-4 text-left"
            aria-expanded={openIndex === index}
          >
            <span className="font-nunito-regular text-lg">{item.question}</span>
            <span className={`transform transition-transform ${
              openIndex === index ? 'rotate-180' : ''
            }`}>
              {openIndex === index ? '−' : '+'}
            </span>
          </button>

          {openIndex === index && (
            <div className="pb-4 font-source-sans text-wellness-text">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
```

**Usage:** FAQ page accordion

---

## Pages Breakdown

### 1. Home Page (Index.jsx)

```jsx
// src/pages/Home.jsx

import HeroSection from '../components/home/HeroSection';
import BenefitsCarousel from '../components/home/BenefitsCarousel';
import CategorySwitch from '../components/home/CategorySwitch';
import ProductGrid from '../components/home/ProductGrid';
import ReviewCarousel from '../components/home/ReviewCarousel';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('freshly-cooked');

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Welcome Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-playfair-bold text-3xl sm:text-4xl lg:text-5xl mb-6">
            Welcome to Nest for Two
          </h1>
          <p className="font-source-sans text-wellness-text max-w-3xl mx-auto">
            Singapore's Thickest, Freshest Bird's Nest
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-wellness-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair-bold text-3xl text-center mb-12">
            Why Bird's Nest?
          </h2>
          <BenefitsCarousel />
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair-bold text-3xl text-center mb-8">
            OUR COLLECTIONS
          </h2>

          <CategorySwitch onCategoryChange={setActiveCategory} />

          <ProductGrid category={activeCategory} />
        </div>
      </section>

      {/* Latest Additions (Kue Lapis) */}
      <section className="py-16 bg-wellness-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-playfair-bold text-3xl text-center mb-12">
            Latest Additions
          </h2>
          {/* Kue Lapis Product Cards */}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-playfair-bold text-3xl text-center mb-12">
            What Our Customers Say
          </h2>
          <ReviewCarousel />
        </div>
      </section>
    </div>
  );
};

export default Home;
```

**Sections:**
1. Hero with "Shop Now" button
2. Welcome text
3. Benefits carousel (6 icons)
4. Category switch (Freshly Cooked / Dried)
5. Product grid (3 columns)
6. Latest additions (Kue Lapis products)
7. Review carousel (6 reviews)

### 2. Product Pages

#### Freshly Cooked Product Page Template

```jsx
// src/pages/products/ProductHoney.jsx (example)

import ProductCarousel from '../../components/product/ProductCarousel';
import PurchaseTypeToggle from '../../components/product/PurchaseTypeToggle';
import SizeSelector from '../../components/product/SizeSelector';
import QuantitySelector from '../../components/product/QuantitySelector';
import DatePicker from '../../components/product/DatePicker';
import TimeSlotSelector from '../../components/product/TimeSlotSelector';
import InstructionsField from '../../components/product/InstructionsField';
import CollapsibleSection from '../../components/product/CollapsibleSection';
import { PRODUCTS } from '../../config/products';
import { useCart } from '../../hooks/useCart';

const ProductHoney = () => {
  const product = PRODUCTS.HONEY;
  const { addItem } = useCart();

  const [purchaseType, setPurchaseType] = useState('one-time');
  const [size, setSize] = useState('50ml');
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('3-5PM');
  const [instructions, setInstructions] = useState('');

  const handleAddToCart = async () => {
    // Validate delivery date
    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    // Get selected variant ID
    const variantKey = `${purchaseType}${size}`;
    const variant = product.variants[variantKey];

    // Prepare custom attributes
    const customAttributes = [
      { key: 'Delivery Date', value: deliveryDate },
      { key: 'Time Slot', value: timeSlot }
    ];

    if (instructions) {
      customAttributes.push({ key: 'Instructions', value: instructions });
    }

    try {
      await addItem(variant.id, quantity, customAttributes);
      alert('Added to cart!');
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left: Carousel */}
          <ProductCarousel images={product.images} autoPlay={true} />

          {/* Right: Product Options */}
          <div className="space-y-6">
            <div>
              <h1 className="font-playfair-bold text-3xl mb-2">{product.name}</h1>
              <p className="font-source-sans text-wellness-text">{product.category}</p>
            </div>

            {/* Purchase Type */}
            <PurchaseTypeToggle
              selected={purchaseType}
              onChange={setPurchaseType}
            />

            {/* Size Selection */}
            <SizeSelector
              options={Object.values(product.variants).filter(v => v.type === purchaseType)}
              selected={size}
              onChange={setSize}
              purchaseType={purchaseType}
            />

            {/* Quantity */}
            <div>
              <label className="block font-nunito-regular mb-2">Quantity</label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            {/* Delivery Date */}
            <DatePicker
              purchaseType={purchaseType}
              value={deliveryDate}
              onChange={setDeliveryDate}
            />

            {/* Time Slot */}
            <TimeSlotSelector selected={timeSlot} onChange={setTimeSlot} />

            {/* Instructions */}
            <InstructionsField value={instructions} onChange={setInstructions} />

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-wellness-rose text-white py-3 font-nunito-regular hover:bg-rose-gold-700 transition-colors"
            >
              Add to Cart
            </button>

            {/* Collapsible Sections */}
            <div className="space-y-0">
              <CollapsibleSection title="Description" defaultOpen={true}>
                <p>Product description here...</p>
              </CollapsibleSection>

              <CollapsibleSection title="Storage & Consumption">
                <p>Storage instructions...</p>
              </CollapsibleSection>

              <CollapsibleSection title="Delivery & Inclusions">
                <p>Delivery details...</p>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHoney;
```

**Same template for:**
- ProductZeroSugar.jsx
- ProductRockSugar.jsx

**Differences:** Only product data from PRODUCTS config

#### Dried Product Page

```jsx
// src/pages/products/ProductDried.jsx

// Similar structure, but:
// - No purchase type toggle (one-time only)
// - Size options: 50g, 100g, 250g, 1000g (radio buttons)
// - Only 3 images in carousel
// - Different pricing display (per gram)
```

#### Kue Lapis Product Page

```jsx
// src/pages/products/KueLapisNest.jsx

// Unique features:
// - Flavour selector: Original or Prune (radio buttons)
// - Sachet type dropdown: Honey, Rock Sugar, Zero Sugar
// - Fixed size: 6 x 50ml + 1 box Kue Lapis
// - Fixed price: $95
// - No subscription option
// - Variant ID determined by: flavour + sachet type combination
```

### 3. Cart Page

```jsx
// src/pages/Cart.jsx

import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = () => {
  const { cart, loading } = useContext(CartContext);

  if (loading) {
    return <div className="pt-32 pb-20 text-center">Loading...</div>;
  }

  const hasItems = cart && cart.lineItems.length > 0;

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair-bold text-4xl mb-8 text-center">Shopping Cart</h1>

        {hasItems ? (
          <>
            <div className="space-y-4">
              {cart.lineItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <CartSummary />
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
```

**Features:**
- Displays cart items with images
- Quantity adjustment
- Remove item buttons
- Subtotal calculation
- Free delivery indicator
- Checkout button
- Empty cart state with "Shop Products" CTA

### 4. About Page

```jsx
// src/pages/About.jsx

const About = () => {
  return (
    <div className="pt-32 pb-20">
      {/* Hero Image */}
      <div className="w-full" style={{ aspectRatio: '16/9' }}>
        <img
          src="/images/HeroAbout.png"
          alt="About Nest for Two"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="font-playfair-bold text-4xl mb-8 text-center">
          Our Story
        </h1>

        <div className="font-source-sans text-wellness-text space-y-6">
          <p>
            Nest for Two was born from a simple belief: that wellness should be both accessible and authentic...
          </p>
          {/* Additional paragraphs */}
        </div>
      </div>
    </div>
  );
};

export default About;
```

### 5. FAQ Page

```jsx
// src/pages/FAQ.jsx

import Accordion from '../components/ui/Accordion';

const FAQ = () => {
  const faqs = [
    {
      question: 'Does your bird\'s nest contain any preservatives or additives?',
      answer: 'No, our bird\'s nest is 100% natural with no preservatives or additives.'
    },
    {
      question: 'What flavours are available?',
      answer: 'We offer three flavours: Honey, Rock Sugar, and Zero Sugar.'
    },
    {
      question: 'How do I consume the bird\'s nest?',
      answer: 'Our bird\'s nest is ready to consume. Simply refrigerate and enjoy chilled, or warm it up if preferred.'
    },
    {
      question: 'How long can I store the bird\'s nest?',
      answer: 'Once received, please refrigerate and consume within 10-14 days for optimal freshness.'
    },
    {
      question: 'Is it safe to consume during pregnancy?',
      answer: 'Yes, bird\'s nest is traditionally consumed during pregnancy for its nutritional benefits. However, please consult your doctor if you have any concerns.'
    },
    {
      question: 'How should I store the bird\'s nest?',
      answer: 'Store in the refrigerator at 4°C immediately upon receiving. Do not freeze.'
    },
    {
      question: 'How far in advance should I place my order?',
      answer: 'We require at least 24 hours notice for all deliveries to ensure freshness.'
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair-bold text-4xl mb-8 text-center">
          Frequently Asked Questions
        </h1>

        <Accordion items={faqs} />
      </div>
    </div>
  );
};

export default FAQ;
```

**Features:**
- Accordion component
- Plus/Minus icon toggle
- One section open at a time
- Smooth transitions

### 6. Contact Page

```jsx
// src/pages/Contact.jsx

import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
    console.log('Contact form:', formData);
  };

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-playfair-bold text-4xl mb-8 text-center">
          Get in Touch
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-nunito-regular mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border border-[#d1d5db] rounded px-4 py-2 font-source-sans"
            />
          </div>

          <div>
            <label className="block font-nunito-regular mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border border-[#d1d5db] rounded px-4 py-2 font-source-sans"
            />
          </div>

          <div>
            <label className="block font-nunito-regular mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={6}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full border border-[#d1d5db] rounded px-4 py-2 font-source-sans resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-wellness-rose text-white py-3 font-nunito-regular hover:bg-rose-gold-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
```

### 7. Partnerships Page

```jsx
// src/pages/Partnerships.jsx

const Partnerships = () => {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair-bold text-4xl mb-8 text-center">
          Collaborations
        </h1>

        <div className="mb-12">
          <img
            src="/images/Collaborations.png"
            alt="Collaborations"
            className="w-full rounded-lg"
          />
        </div>

        <div className="font-source-sans text-wellness-text space-y-6">
          <p>
            We're always looking for exciting partnership opportunities...
          </p>
          {/* Additional content */}
        </div>
      </div>
    </div>
  );
};

export default Partnerships;
```

---

## Migration Steps

### Phase 1: Project Setup (Day 1)

1. **Initialize Vite + React Project**
   ```bash
   npm create vite@latest nest-for-two -- --template react
   cd nest-for-two
   npm install
   ```

2. **Install Dependencies**
   ```bash
   # Core dependencies
   npm install react-router-dom shopify-buy

   # Tailwind CSS
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

   # Optional: UI libraries
   npm install react-icons
   ```

3. **Configure Tailwind CSS**
   - Copy tailwind.config.js from design system section
   - Add font-face declarations to index.css
   - Add Tailwind directives to index.css

4. **Copy Assets**
   - Copy all 5 font files to `public/fonts/`
   - Copy all 39 images to `public/images/`
   - Copy icons to `public/images/icons/`

5. **Environment Setup**
   - Create `.env` file with Shopify credentials
   - Add `.env` to `.gitignore`

### Phase 2: Core Setup (Day 2-3)

6. **Create Configuration Files**
   - `src/config/shopify.js` - Shopify client initialization
   - `src/config/products.js` - All product data with IDs
   - `src/config/businessRules.js` - Business logic constants

7. **Create Context Providers**
   - `src/context/CartContext.jsx` - Global cart state
   - Wrap App with CartContext.Provider

8. **Create Custom Hooks**
   - `src/hooks/useCart.js` - Cart operations
   - `src/hooks/useCarousel.js` - Carousel logic
   - `src/hooks/useTouch.js` - Touch gesture handling
   - `src/hooks/useModal.js` - Modal state management

9. **Create Utility Functions**
   - `src/utils/dateHelpers.js` - Date validation & formatting
   - `src/utils/priceCalculators.js` - Price calculations
   - `src/utils/validators.js` - Form validations
   - `src/utils/formatters.js` - Data formatting

### Phase 3: Layout Components (Day 4-5)

10. **Build Layout Components**
    - `src/components/layout/Navbar.jsx`
    - `src/components/layout/Footer.jsx`
    - `src/components/layout/AnnouncementBar.jsx`
    - `src/components/layout/MobileMenu.jsx`
    - `src/components/shared/WhatsAppButton.jsx`
    - `src/components/shared/SocialLinks.jsx`

11. **Create Layout Container**
    - Create `src/components/layout/Layout.jsx` wrapping Navbar + Footer
    - Test responsive behavior

### Phase 4: UI Components (Day 6-7)

12. **Build Reusable UI Components**
    - `src/components/ui/Button.jsx`
    - `src/components/ui/Modal.jsx`
    - `src/components/ui/Tooltip.jsx`
    - `src/components/ui/Accordion.jsx`
    - `src/components/ui/Dropdown.jsx`

13. **Test UI Components**
    - Create Storybook or test pages for each component
    - Ensure accessibility (ARIA labels, keyboard navigation)

### Phase 5: Product Components (Day 8-10)

14. **Build Product Components**
    - `src/components/product/ProductCard.jsx`
    - `src/components/product/ProductCarousel.jsx`
    - `src/components/product/PurchaseTypeToggle.jsx`
    - `src/components/product/SizeSelector.jsx`
    - `src/components/product/QuantitySelector.jsx`
    - `src/components/product/DatePicker.jsx`
    - `src/components/product/TimeSlotSelector.jsx`
    - `src/components/product/InstructionsField.jsx`
    - `src/components/product/CollapsibleSection.jsx`

15. **Test Product Components**
    - Test carousel auto-play and navigation
    - Test touch gestures on mobile
    - Validate date picker logic (24hr rule, Sunday-only for subscriptions)

### Phase 6: Cart Components (Day 11-12)

16. **Build Cart Components**
    - `src/components/cart/CartIcon.jsx`
    - `src/components/cart/CartItem.jsx`
    - `src/components/cart/CartSummary.jsx`
    - `src/components/cart/EmptyCart.jsx`

17. **Test Cart Functionality**
    - Test adding items to cart
    - Test quantity updates
    - Test item removal
    - Test cart persistence (localStorage)
    - Test checkout redirect

### Phase 7: Home Page Components (Day 13-14)

18. **Build Home Page Components**
    - `src/components/home/HeroSection.jsx`
    - `src/components/home/BenefitsCarousel.jsx`
    - `src/components/home/CategorySwitch.jsx`
    - `src/components/home/ProductGrid.jsx`
    - `src/components/home/ReviewCarousel.jsx`

19. **Test Home Page**
    - Test category switching
    - Test review carousel 3D effect
    - Test benefits carousel on mobile/tablet/desktop

### Phase 8: Pages (Day 15-18)

20. **Create All Pages**
    - `src/pages/Home.jsx`
    - `src/pages/Cart.jsx`
    - `src/pages/About.jsx`
    - `src/pages/Contact.jsx`
    - `src/pages/FAQ.jsx`
    - `src/pages/Partnerships.jsx`
    - `src/pages/products/ProductHoney.jsx`
    - `src/pages/products/ProductZeroSugar.jsx`
    - `src/pages/products/ProductRockSugar.jsx`
    - `src/pages/products/ProductDried.jsx`
    - `src/pages/products/KueLapisNest.jsx`
    - `src/pages/products/OriginalKueLapis.jsx`
    - `src/pages/products/PruneKueLapis.jsx`

21. **Setup React Router**
    ```jsx
    // src/App.jsx
    import { BrowserRouter, Routes, Route } from 'react-router-dom';
    import Layout from './components/layout/Layout';
    import Home from './pages/Home';
    // ... other imports

    function App() {
      return (
        <BrowserRouter>
          <CartProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/partnerships" element={<Partnerships />} />
                <Route path="/products/honey" element={<ProductHoney />} />
                {/* ... other routes */}
              </Routes>
            </Layout>
          </CartProvider>
        </BrowserRouter>
      );
    }
    ```

### Phase 9: Testing & Refinement (Day 19-21)

22. **Cross-Browser Testing**
    - Test on Chrome, Safari, Firefox, Edge
    - Test on iOS Safari, Android Chrome

23. **Responsive Testing**
    - Test all breakpoints (mobile, tablet, desktop)
    - Test touch gestures on mobile devices
    - Test hamburger menu behavior

24. **Shopify Integration Testing**
    - Test adding products to cart
    - Test cart persistence across page refreshes
    - Test custom attributes (delivery date, time slot, instructions)
    - Test checkout redirect to Shopify
    - Test subscription variants vs one-time variants

25. **Performance Optimization**
    - Optimize images (compress PNGs, consider WebP)
    - Implement lazy loading for images
    - Code splitting for routes
    - Add React.memo() to heavy components

26. **Accessibility Audit**
    - Run Lighthouse audit
    - Test keyboard navigation
    - Ensure proper ARIA labels
    - Test screen reader compatibility

### Phase 10: Deployment (Day 22-23)

27. **Build for Production**
    ```bash
    npm run build
    ```

28. **Deploy to Hosting**
    - Options: Vercel, Netlify, AWS S3 + CloudFront
    - Configure environment variables on hosting platform
    - Set up custom domain

29. **Post-Deployment Testing**
    - Test all functionality on production site
    - Test Shopify checkout flow end-to-end
    - Monitor for errors

### Phase 11: Documentation & Handoff (Day 24-25)

30. **Create Documentation**
    - Component documentation
    - API/Hook documentation
    - Deployment instructions
    - Maintenance guide

31. **Final Checklist**
    - [ ] All 13 pages functional
    - [ ] Cart persistence working
    - [ ] Shopify checkout working
    - [ ] All product variants correct
    - [ ] Mobile responsive
    - [ ] Fonts loading correctly
    - [ ] Images optimized
    - [ ] SEO meta tags added
    - [ ] Analytics integrated (Google Analytics, if needed)
    - [ ] Error boundaries implemented

---

## Assets Checklist

### Fonts (5 files)
- [ ] NunitoSans-Light.ttf (94 KB)
- [ ] NunitoSans-Regular.ttf (95 KB)
- [ ] PlayfairDisplay-Bold.ttf (213 KB)
- [ ] SourceSansPro-Regular.otf (229 KB)
- [ ] Didot.otf (96 KB)

### Product Images (28 files)
**Honey Sachet (3):**
- [ ] Honey.png
- [ ] Honey2.png
- [ ] Honey3.png

**Zero Sugar (3):**
- [ ] ZeroSugar.png
- [ ] ZeroSugar2.png
- [ ] ZeroSugar3.png

**Rock Sugar (3):**
- [ ] RockSugar.png
- [ ] RockSugar2.png
- [ ] RockSugar3.png

**Dried (3):**
- [ ] Dry1.png
- [ ] Dry2.png
- [ ] Dry3.png

**Kue Lapis (13):**
- [ ] NestwKueh.png
- [ ] Original1.png
- [ ] Original2.png
- [ ] Original3.png
- [ ] OriginalMeasure.png
- [ ] Prune1.png
- [ ] Prune2.png
- [ ] Prune3.png
- [ ] PruneMeasure.png

**Combined Shots (3):**
- [ ] All_4.png
- [ ] All_5.png
- [ ] All_6.png

### UI Images (7 files)
- [ ] Main.png (hero image)
- [ ] Birdnest Logo transparent.png
- [ ] logo.svg
- [ ] Favicon.png
- [ ] HeroAbout.png
- [ ] Collaborations.png
- [ ] B76E79.png (color reference)

### Icons (8 files)
**Benefits (6):**
- [ ] MuscleRecovery.svg
- [ ] HormonalHarmony.svg
- [ ] SkinRenewal.svg
- [ ] StrongerImmunity.svg
- [ ] LastingEnergy.svg
- [ ] BetterDigestion.svg

**Social (2):**
- [ ] Lemon8.png
- [ ] xiaohongshu.svg

---

## Additional Considerations

### 1. SEO Optimization

```jsx
// Install react-helmet-async
npm install react-helmet-async

// src/components/SEO.jsx
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image }) => (
  <Helmet>
    <title>{title} | Nest for Two</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    {/* Add more meta tags */}
  </Helmet>
);
```

### 2. Analytics Integration

```jsx
// Install react-ga4
npm install react-ga4

// src/utils/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-XXXXXXXXXX');
};

export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({ category, action, label });
};
```

### 3. Error Boundaries

```jsx
// src/components/ErrorBoundary.jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-20">
          <h1 className="font-playfair-bold text-3xl mb-4">Something went wrong</h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-wellness-rose text-white px-6 py-2"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### 4. Loading States

```jsx
// src/components/ui/LoadingSpinner.jsx
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wellness-rose" />
  </div>
);
```

### 5. Image Optimization

```bash
# Install sharp for image optimization
npm install -D sharp

# Create script to optimize images
# scripts/optimizeImages.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images';
const outputDir = 'public/images/optimized';

// Process all PNG images
fs.readdirSync(inputDir)
  .filter(file => file.endsWith('.png'))
  .forEach(file => {
    sharp(path.join(inputDir, file))
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(path.join(outputDir, file.replace('.png', '.webp')));
  });
```

---

## Summary

This migration plan provides a complete roadmap for recreating the Nest for Two e-commerce website in React + Vite. The plan includes:

- **Complete design system** with all fonts, colors, typography, and spacing
- **All Shopify credentials** including store domain, access token, and every product/variant ID
- **Detailed component breakdown** with code examples
- **Step-by-step migration plan** (25 days estimated)
- **Assets checklist** for all 39 images and 5 fonts
- **Business logic** including pricing, delivery rules, and validation

**Key Features Preserved:**
- Shopify Storefront API integration with persistent cart
- Subscription and one-time purchase options
- Custom date picker with 24hr validation
- Image carousels with auto-play and touch gestures
- Mobile-responsive design with hamburger menu
- Review system with 3D carousel
- Accordion FAQ page
- Kue Lapis products with flavor/sachet selection

**Estimated Timeline:** 25 working days (5 weeks)

**Next Steps:**
1. Review this plan and adjust timeline as needed
2. Set up development environment
3. Begin Phase 1 (Project Setup)
4. Follow phases sequentially for best results

---

*Generated on: 2026-01-06*
*Repository Location: `/mnt/c/Birdnest Visual Code/BirdNest/`*
*Target Framework: React 18 + Vite + Tailwind CSS*
