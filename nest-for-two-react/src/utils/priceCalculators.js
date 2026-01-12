/**
 * Price Calculator Functions
 * Utility functions for calculating prices, discounts, taxes, and totals
 */

import { PRICING, SUBSCRIPTION_PLANS } from '../config/businessRules.js';

/**
 * Format price with currency symbol
 * @param {number} amount - Price amount
 * @param {string} currency - Currency code (default: SGD)
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount, currency = PRICING.CURRENCY) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return `${PRICING.CURRENCY_SYMBOL}0.00`;
  }

  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format price without currency symbol
 * @param {number} amount - Price amount
 * @returns {string} Formatted price string without symbol
 */
export const formatPriceNumber = (amount) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0.00';
  }

  return amount.toFixed(2);
};

/**
 * Calculate subtotal for items
 * @param {Array} items - Array of items with price and quantity
 * @returns {number} Subtotal amount
 */
export const calculateSubtotal = (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    return 0;
  }

  return items.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseInt(item.quantity) || 0;
    return total + (price * quantity);
  }, 0);
};

/**
 * Calculate quantity-based discount
 * @param {number} subtotal - Subtotal amount
 * @param {number} quantity - Total quantity
 * @returns {Object} Discount information {amount, percentage, applied}
 */
export const calculateQuantityDiscount = (subtotal, quantity) => {
  const applicableDiscount = PRICING.QUANTITY_DISCOUNTS
    .filter(discount => quantity >= discount.minQuantity)
    .sort((a, b) => b.discount - a.discount)[0];

  if (!applicableDiscount) {
    return {
      amount: 0,
      percentage: 0,
      applied: false
    };
  }

  const discountAmount = subtotal * applicableDiscount.discount;

  return {
    amount: discountAmount,
    percentage: applicableDiscount.discount * 100,
    minQuantity: applicableDiscount.minQuantity,
    applied: true
  };
};

/**
 * Calculate subscription discount
 * @param {number} subtotal - Subtotal amount
 * @param {string} planId - Subscription plan ID
 * @returns {Object} Discount information {amount, percentage, applied}
 */
export const calculateSubscriptionDiscount = (subtotal, planId) => {
  if (!planId) {
    return {
      amount: 0,
      percentage: 0,
      applied: false
    };
  }

  const plan = Object.values(SUBSCRIPTION_PLANS).find(p => p.id === planId);

  if (!plan || plan.discount === 0) {
    return {
      amount: 0,
      percentage: 0,
      applied: false
    };
  }

  const discountAmount = subtotal * plan.discount;

  return {
    amount: discountAmount,
    percentage: plan.discount * 100,
    planName: plan.name,
    applied: true
  };
};

/**
 * Calculate delivery fee
 * @param {number} subtotal - Subtotal amount
 * @param {boolean} requiresDelivery - Whether delivery is required
 * @returns {Object} Delivery fee information {amount, waived}
 */
export const calculateDeliveryFee = (subtotal, requiresDelivery = true) => {
  if (!requiresDelivery) {
    return {
      amount: 0,
      waived: false,
      freeDeliveryApplied: false
    };
  }

  const waived = subtotal >= PRICING.FREE_DELIVERY_THRESHOLD;

  return {
    amount: waived ? 0 : PRICING.DELIVERY_FEE,
    waived: waived,
    freeDeliveryApplied: waived,
    threshold: PRICING.FREE_DELIVERY_THRESHOLD
  };
};

/**
 * Calculate tax amount
 * @param {number} amount - Amount to calculate tax on
 * @param {number} taxRate - Tax rate (default from config)
 * @returns {number} Tax amount
 */
export const calculateTax = (amount, taxRate = PRICING.TAX_RATE) => {
  if (typeof amount !== 'number' || amount <= 0) {
    return 0;
  }

  return amount * taxRate;
};

/**
 * Calculate order total with all discounts and fees
 * @param {Object} orderDetails - Order details object
 * @returns {Object} Complete price breakdown
 */
export const calculateOrderTotal = (orderDetails) => {
  const {
    items = [],
    subscriptionPlanId = null,
    requiresDelivery = true,
    applyTax = true
  } = orderDetails;

  // Calculate subtotal
  const subtotal = calculateSubtotal(items);

  // Calculate total quantity
  const totalQuantity = items.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);

  // Calculate discounts
  const quantityDiscount = calculateQuantityDiscount(subtotal, totalQuantity);
  const subscriptionDiscount = calculateSubscriptionDiscount(subtotal, subscriptionPlanId);

  // Total discounts
  const totalDiscounts = quantityDiscount.amount + subscriptionDiscount.amount;

  // Subtotal after discounts
  const subtotalAfterDiscounts = subtotal - totalDiscounts;

  // Calculate delivery fee
  const deliveryFee = calculateDeliveryFee(subtotalAfterDiscounts, requiresDelivery);

  // Calculate tax (on subtotal after discounts + delivery fee)
  const taxableAmount = subtotalAfterDiscounts + deliveryFee.amount;
  const tax = applyTax ? calculateTax(taxableAmount) : 0;

  // Calculate final total
  const total = subtotalAfterDiscounts + deliveryFee.amount + tax;

  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discounts: {
      quantity: quantityDiscount,
      subscription: subscriptionDiscount,
      total: parseFloat(totalDiscounts.toFixed(2))
    },
    subtotalAfterDiscounts: parseFloat(subtotalAfterDiscounts.toFixed(2)),
    deliveryFee: deliveryFee,
    tax: parseFloat(tax.toFixed(2)),
    taxRate: PRICING.TAX_RATE,
    total: parseFloat(total.toFixed(2)),
    totalQuantity: totalQuantity,
    currency: PRICING.CURRENCY
  };
};

/**
 * Calculate subscription recurring total
 * @param {Object} subscriptionDetails - Subscription details
 * @returns {Object} Recurring price breakdown
 */
export const calculateSubscriptionRecurring = (subscriptionDetails) => {
  const {
    items = [],
    planId,
    duration = 4 // weeks
  } = subscriptionDetails;

  const plan = Object.values(SUBSCRIPTION_PLANS).find(p => p.id === planId);

  if (!plan) {
    throw new Error('Invalid subscription plan');
  }

  // Calculate single delivery total
  const singleDelivery = calculateOrderTotal({
    items,
    subscriptionPlanId: planId,
    requiresDelivery: true,
    applyTax: true
  });

  // Calculate totals based on frequency
  const deliveriesPerWeek = plan.deliveriesPerWeek;
  const totalDeliveries = deliveriesPerWeek * duration;
  const weeklyTotal = singleDelivery.total * deliveriesPerWeek;
  const totalForPeriod = singleDelivery.total * totalDeliveries;

  return {
    perDelivery: singleDelivery,
    deliveriesPerWeek,
    weeklyTotal: parseFloat(weeklyTotal.toFixed(2)),
    totalDeliveries,
    duration,
    totalForPeriod: parseFloat(totalForPeriod.toFixed(2)),
    planName: plan.name,
    currency: PRICING.CURRENCY
  };
};

/**
 * Calculate savings compared to regular price
 * @param {number} regularPrice - Regular price without discounts
 * @param {number} discountedPrice - Price after discounts
 * @returns {Object} Savings information
 */
export const calculateSavings = (regularPrice, discountedPrice) => {
  if (regularPrice <= discountedPrice) {
    return {
      amount: 0,
      percentage: 0,
      hasSavings: false
    };
  }

  const savingsAmount = regularPrice - discountedPrice;
  const savingsPercentage = (savingsAmount / regularPrice) * 100;

  return {
    amount: parseFloat(savingsAmount.toFixed(2)),
    percentage: parseFloat(savingsPercentage.toFixed(2)),
    hasSavings: true
  };
};

/**
 * Calculate price per unit
 * @param {number} totalPrice - Total price
 * @param {number} quantity - Quantity
 * @returns {number} Price per unit
 */
export const calculatePricePerUnit = (totalPrice, quantity) => {
  if (quantity <= 0) {
    return 0;
  }

  return parseFloat((totalPrice / quantity).toFixed(2));
};

/**
 * Apply promo code discount
 * @param {number} subtotal - Subtotal amount
 * @param {Object} promoCode - Promo code object with discount details
 * @returns {Object} Discount information
 */
export const applyPromoCode = (subtotal, promoCode) => {
  if (!promoCode || !promoCode.active) {
    return {
      amount: 0,
      applied: false,
      error: 'Invalid or inactive promo code'
    };
  }

  // Check minimum purchase requirement
  if (promoCode.minPurchase && subtotal < promoCode.minPurchase) {
    return {
      amount: 0,
      applied: false,
      error: `Minimum purchase of ${formatPrice(promoCode.minPurchase)} required`
    };
  }

  let discountAmount = 0;

  // Calculate discount based on type
  if (promoCode.type === 'percentage') {
    discountAmount = subtotal * (promoCode.value / 100);

    // Apply max discount cap if exists
    if (promoCode.maxDiscount && discountAmount > promoCode.maxDiscount) {
      discountAmount = promoCode.maxDiscount;
    }
  } else if (promoCode.type === 'fixed') {
    discountAmount = Math.min(promoCode.value, subtotal);
  }

  return {
    amount: parseFloat(discountAmount.toFixed(2)),
    code: promoCode.code,
    type: promoCode.type,
    applied: true,
    error: null
  };
};

/**
 * Calculate amount needed for free delivery
 * @param {number} currentSubtotal - Current subtotal
 * @returns {Object} Free delivery threshold information
 */
export const calculateFreeDeliveryProgress = (currentSubtotal) => {
  const threshold = PRICING.FREE_DELIVERY_THRESHOLD;
  const remaining = Math.max(0, threshold - currentSubtotal);
  const percentage = Math.min(100, (currentSubtotal / threshold) * 100);

  return {
    threshold,
    current: currentSubtotal,
    remaining: parseFloat(remaining.toFixed(2)),
    percentage: parseFloat(percentage.toFixed(2)),
    qualified: remaining === 0
  };
};

/**
 * Round price to nearest cent
 * @param {number} amount - Amount to round
 * @returns {number} Rounded amount
 */
export const roundPrice = (amount) => {
  return Math.round(amount * 100) / 100;
};

/**
 * Parse price string to number
 * @param {string} priceString - Price string (e.g., "$100.00" or "100.00")
 * @returns {number} Parsed price number
 */
export const parsePrice = (priceString) => {
  if (typeof priceString === 'number') {
    return priceString;
  }

  const cleaned = String(priceString).replace(/[^0-9.-]/g, '');
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? 0 : parsed;
};

export default {
  formatPrice,
  formatPriceNumber,
  calculateSubtotal,
  calculateQuantityDiscount,
  calculateSubscriptionDiscount,
  calculateDeliveryFee,
  calculateTax,
  calculateOrderTotal,
  calculateSubscriptionRecurring,
  calculateSavings,
  calculatePricePerUnit,
  applyPromoCode,
  calculateFreeDeliveryProgress,
  roundPrice,
  parsePrice
};
