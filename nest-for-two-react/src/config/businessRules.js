/**
 * Business Rules Configuration
 * Contains all business logic constants, delivery rules, subscription rules, pricing, and validation rules
 */

// Delivery Schedule Configuration
export const DELIVERY_SCHEDULE = {
  // Delivery days (0 = Sunday, 6 = Saturday)
  AVAILABLE_DAYS: [2, 4, 6], // Tuesday, Thursday, Saturday
  DAY_NAMES: {
    2: 'Tuesday',
    4: 'Thursday',
    6: 'Saturday'
  },

  // Time slots for delivery
  TIME_SLOTS: [
    { value: '09:00-12:00', label: '9:00 AM - 12:00 PM' },
    { value: '12:00-15:00', label: '12:00 PM - 3:00 PM' },
    { value: '15:00-18:00', label: '3:00 PM - 6:00 PM' },
    { value: '18:00-21:00', label: '6:00 PM - 9:00 PM' }
  ],

  // Lead time for delivery (in days)
  MIN_LEAD_TIME_DAYS: 2,
  MAX_ADVANCE_DAYS: 30
};

// Subscription Plans Configuration
export const SUBSCRIPTION_PLANS = {
  WEEKLY: {
    id: 'weekly',
    name: 'Weekly Delivery',
    deliveriesPerWeek: 1,
    description: 'Fresh bird\'s nest delivered once a week',
    discount: 0, // No discount
    minDuration: 4, // weeks
    commitmentPeriod: '4 weeks'
  },
  BIWEEKLY: {
    id: 'biweekly',
    name: 'Bi-Weekly Delivery',
    deliveriesPerWeek: 2,
    description: 'Fresh bird\'s nest delivered twice a week',
    discount: 0.05, // 5% discount
    minDuration: 4, // weeks
    commitmentPeriod: '4 weeks'
  },
  TRIWEEKLY: {
    id: 'triweekly',
    name: 'Tri-Weekly Delivery',
    deliveriesPerWeek: 3,
    description: 'Fresh bird\'s nest delivered three times a week',
    discount: 0.10, // 10% discount
    minDuration: 4, // weeks
    commitmentPeriod: '4 weeks'
  }
};

// Product Types Configuration
export const PRODUCT_TYPES = {
  FRESH_BIRDS_NEST: {
    id: 'fresh-birds-nest',
    name: 'Fresh Bird\'s Nest',
    basePrice: 100.00,
    unit: 'bowl',
    minQuantity: 1,
    maxQuantity: 50,
    requiresDelivery: true,
    perishable: true
  },
  BIRD_NEST_GIFT_BOX: {
    id: 'bird-nest-gift-box',
    name: 'Bird\'s Nest Gift Box',
    basePrice: 200.00,
    unit: 'box',
    minQuantity: 1,
    maxQuantity: 20,
    requiresDelivery: true,
    perishable: false,
    allowsCustomization: true
  }
};

// Pricing Configuration
export const PRICING = {
  // Base prices
  BASE_PRICE_PER_BOWL: 100.00,
  GIFT_BOX_BASE_PRICE: 200.00,

  // Quantity discounts (applied to total order)
  QUANTITY_DISCOUNTS: [
    { minQuantity: 10, discount: 0.05 }, // 5% off for 10+ bowls
    { minQuantity: 20, discount: 0.10 }, // 10% off for 20+ bowls
    { minQuantity: 30, discount: 0.15 }  // 15% off for 30+ bowls
  ],

  // Delivery fees
  DELIVERY_FEE: 10.00,
  FREE_DELIVERY_THRESHOLD: 200.00,

  // Tax rate
  TAX_RATE: 0.08, // 8% tax

  // Currency
  CURRENCY: 'SGD',
  CURRENCY_SYMBOL: '$'
};

// Gift Card Customization Rules
export const GIFT_CARD_RULES = {
  // Message character limits
  MIN_MESSAGE_LENGTH: 1,
  MAX_MESSAGE_LENGTH: 200,

  // Word count for gift cards
  MIN_WORD_COUNT: 1,
  MAX_WORD_COUNT: 50,

  // Recipient information
  REQUIRE_RECIPIENT_NAME: true,
  REQUIRE_RECIPIENT_PHONE: false,
  REQUIRE_RECIPIENT_EMAIL: false,

  // Available occasions
  OCCASIONS: [
    { value: 'birthday', label: 'Birthday' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'congratulations', label: 'Congratulations' },
    { value: 'thank-you', label: 'Thank You' },
    { value: 'get-well', label: 'Get Well Soon' },
    { value: 'other', label: 'Other' }
  ]
};

// Address Validation Rules
export const ADDRESS_RULES = {
  // Singapore postal code format
  POSTAL_CODE_REGEX: /^[0-9]{6}$/,
  POSTAL_CODE_LENGTH: 6,

  // Required fields
  REQUIRED_FIELDS: [
    'recipientName',
    'addressLine1',
    'postalCode',
    'phone'
  ],

  // Field lengths
  MAX_ADDRESS_LINE_LENGTH: 100,
  MAX_RECIPIENT_NAME_LENGTH: 100,

  // Phone validation (Singapore format)
  PHONE_REGEX: /^(\+65)?[689]\d{7}$/,
  PHONE_MIN_LENGTH: 8,
  PHONE_MAX_LENGTH: 12
};

// Order Status Configuration
export const ORDER_STATUS = {
  PENDING: {
    id: 'pending',
    label: 'Pending',
    description: 'Order received and awaiting processing',
    color: 'yellow'
  },
  CONFIRMED: {
    id: 'confirmed',
    label: 'Confirmed',
    description: 'Order confirmed and being prepared',
    color: 'blue'
  },
  PREPARING: {
    id: 'preparing',
    label: 'Preparing',
    description: 'Your fresh bird\'s nest is being prepared',
    color: 'orange'
  },
  OUT_FOR_DELIVERY: {
    id: 'out-for-delivery',
    label: 'Out for Delivery',
    description: 'Order is on the way',
    color: 'purple'
  },
  DELIVERED: {
    id: 'delivered',
    label: 'Delivered',
    description: 'Order has been delivered',
    color: 'green'
  },
  CANCELLED: {
    id: 'cancelled',
    label: 'Cancelled',
    description: 'Order has been cancelled',
    color: 'red'
  }
};

// Email Validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Notification Preferences
export const NOTIFICATION_PREFERENCES = {
  EMAIL: 'email',
  SMS: 'sms',
  WHATSAPP: 'whatsapp',
  ALL: 'all'
};

// Business Hours
export const BUSINESS_HOURS = {
  TIMEZONE: 'Asia/Singapore',
  OPERATING_HOURS: {
    start: '09:00',
    end: '21:00'
  },
  CLOSED_DAYS: [0], // Sunday (0 = Sunday)
  PUBLIC_HOLIDAYS: [] // To be populated with actual holiday dates
};

// Cancellation Policy
export const CANCELLATION_POLICY = {
  // Hours before delivery that cancellation is allowed
  MIN_HOURS_BEFORE_DELIVERY: 24,

  // Refund policy
  FULL_REFUND_HOURS: 48,
  PARTIAL_REFUND_HOURS: 24,
  PARTIAL_REFUND_PERCENTAGE: 0.50 // 50% refund
};

// Helper function to get subscription plan by ID
export const getSubscriptionPlan = (planId) => {
  return Object.values(SUBSCRIPTION_PLANS).find(plan => plan.id === planId);
};

// Helper function to calculate subscription discount
export const calculateSubscriptionDiscount = (planId, basePrice) => {
  const plan = getSubscriptionPlan(planId);
  if (!plan) return 0;
  return basePrice * plan.discount;
};

// Helper function to get quantity discount
export const getQuantityDiscount = (quantity) => {
  const applicableDiscount = PRICING.QUANTITY_DISCOUNTS
    .filter(discount => quantity >= discount.minQuantity)
    .sort((a, b) => b.discount - a.discount)[0];

  return applicableDiscount ? applicableDiscount.discount : 0;
};

// Helper function to check if delivery is available on a given date
export const isDeliveryAvailable = (date) => {
  const dayOfWeek = date.getDay();
  return DELIVERY_SCHEDULE.AVAILABLE_DAYS.includes(dayOfWeek);
};

// Helper function to get next available delivery date
export const getNextAvailableDeliveryDate = (fromDate = new Date()) => {
  const minDate = new Date(fromDate);
  minDate.setDate(minDate.getDate() + DELIVERY_SCHEDULE.MIN_LEAD_TIME_DAYS);

  // Find the next available delivery day
  for (let i = 0; i < 7; i++) {
    const checkDate = new Date(minDate);
    checkDate.setDate(checkDate.getDate() + i);

    if (isDeliveryAvailable(checkDate)) {
      return checkDate;
    }
  }

  return null;
};

// Export all configurations
export default {
  DELIVERY_SCHEDULE,
  SUBSCRIPTION_PLANS,
  PRODUCT_TYPES,
  PRICING,
  GIFT_CARD_RULES,
  ADDRESS_RULES,
  ORDER_STATUS,
  EMAIL_REGEX,
  NOTIFICATION_PREFERENCES,
  BUSINESS_HOURS,
  CANCELLATION_POLICY,
  // Helper functions
  getSubscriptionPlan,
  calculateSubscriptionDiscount,
  getQuantityDiscount,
  isDeliveryAvailable,
  getNextAvailableDeliveryDate
};
