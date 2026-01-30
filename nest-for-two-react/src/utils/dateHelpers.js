/**
 * Date Helper Functions
 * Utility functions for date formatting, validation, and business logic
 */

import { DELIVERY_SCHEDULE, BUSINESS_HOURS } from '../config/businessRules.js';

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    throw new Error('Invalid date provided');
  }

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: BUSINESS_HOURS.TIMEZONE,
    ...options
  };

  return new Intl.DateTimeFormat('en-SG', defaultOptions).format(dateObj);
};

/**
 * Format date for Shopify display (e.g., "9 Feb 2026")
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateForShopify = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    throw new Error('Invalid date provided');
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}-${month}-${year}`;
};

/**
 * Format date to short format (DD/MM/YYYY)
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDateShort = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    throw new Error('Invalid date provided');
  }

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();

  return `${day}/${month}/${year}`;
};

/**
 * Format date to ISO string (YYYY-MM-DD)
 * @param {Date|string} date - Date to format
 * @returns {string} ISO formatted date string
 */
export const formatDateISO = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    throw new Error('Invalid date provided');
  }

  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Format time to readable string
 * @param {Date|string} date - Date object or time string
 * @returns {string} Formatted time string (HH:MM AM/PM)
 */
export const formatTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    throw new Error('Invalid date provided');
  }

  return new Intl.DateTimeFormat('en-SG', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: BUSINESS_HOURS.TIMEZONE
  }).format(dateObj);
};

/**
 * Format date and time together
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    throw new Error('Invalid date provided');
  }

  return new Intl.DateTimeFormat('en-SG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: BUSINESS_HOURS.TIMEZONE
  }).format(dateObj);
};

/**
 * Get day of week name
 * @param {Date|string} date - Date object
 * @returns {string} Day name (e.g., 'Monday')
 */
export const getDayName = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  if (!(dateObj instanceof Date) || isNaN(dateObj)) {
    throw new Error('Invalid date provided');
  }

  return new Intl.DateTimeFormat('en-SG', {
    weekday: 'long',
    timeZone: BUSINESS_HOURS.TIMEZONE
  }).format(dateObj);
};

/**
 * Check if a date is in the past
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is in the past
 */
export const isPastDate = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);

  return dateObj < today;
};

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();

  return dateObj.toDateString() === today.toDateString();
};

/**
 * Check if a date is a weekend (Saturday or Sunday)
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is a weekend
 */
export const isWeekend = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dayOfWeek = dateObj.getDay();

  return dayOfWeek === 0 || dayOfWeek === 6;
};

/**
 * Check if delivery is available on a specific date
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if delivery is available
 */
export const isDeliveryDay = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const dayOfWeek = dateObj.getDay();

  return DELIVERY_SCHEDULE.AVAILABLE_DAYS.includes(dayOfWeek);
};

/**
 * Get the next available delivery date from a given date
 * @param {Date|string} fromDate - Starting date (defaults to today)
 * @returns {Date|null} Next available delivery date or null if none found
 */
export const getNextDeliveryDate = (fromDate = new Date()) => {
  const startDate = typeof fromDate === 'string' ? new Date(fromDate) : new Date(fromDate);
  const minDate = new Date(startDate);
  minDate.setDate(minDate.getDate() + DELIVERY_SCHEDULE.MIN_LEAD_TIME_DAYS);

  // Search for the next 14 days
  for (let i = 0; i < 14; i++) {
    const checkDate = new Date(minDate);
    checkDate.setDate(checkDate.getDate() + i);

    if (isDeliveryDay(checkDate)) {
      return checkDate;
    }
  }

  return null;
};

/**
 * Get all available delivery dates within a date range
 * @param {Date|string} startDate - Start date
 * @param {Date|string} endDate - End date
 * @returns {Array<Date>} Array of available delivery dates
 */
export const getAvailableDeliveryDates = (startDate, endDate) => {
  const start = typeof startDate === 'string' ? new Date(startDate) : new Date(startDate);
  const end = typeof endDate === 'string' ? new Date(endDate) : new Date(endDate);
  const dates = [];

  const currentDate = new Date(start);
  while (currentDate <= end) {
    if (isDeliveryDay(currentDate)) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

/**
 * Get available delivery dates for the next N days
 * @param {number} days - Number of days to look ahead (default 30)
 * @returns {Array<Date>} Array of available delivery dates
 */
export const getNextAvailableDeliveryDates = (days = 30) => {
  const today = new Date();
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + DELIVERY_SCHEDULE.MIN_LEAD_TIME_DAYS);

  const endDate = new Date(minDate);
  endDate.setDate(endDate.getDate() + days);

  return getAvailableDeliveryDates(minDate, endDate);
};

/**
 * Calculate days between two dates
 * @param {Date|string} date1 - First date
 * @param {Date|string} date2 - Second date
 * @returns {number} Number of days between dates
 */
export const daysBetween = (date1, date2) => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : new Date(date1);
  const d2 = typeof date2 === 'string' ? new Date(date2) : new Date(date2);

  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/**
 * Add days to a date
 * @param {Date|string} date - Starting date
 * @param {number} days - Number of days to add
 * @returns {Date} New date with days added
 */
export const addDays = (date, days) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setDate(dateObj.getDate() + days);
  return dateObj;
};

/**
 * Subtract days from a date
 * @param {Date|string} date - Starting date
 * @param {number} days - Number of days to subtract
 * @returns {Date} New date with days subtracted
 */
export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Check if date is within cancellation window
 * @param {Date|string} deliveryDate - Scheduled delivery date
 * @param {number} hoursRequired - Hours required before delivery
 * @returns {boolean} True if cancellation is allowed
 */
export const canCancelOrder = (deliveryDate, hoursRequired = 24) => {
  const delivery = typeof deliveryDate === 'string' ? new Date(deliveryDate) : deliveryDate;
  const now = new Date();
  const hoursUntilDelivery = (delivery - now) / (1000 * 60 * 60);

  return hoursUntilDelivery >= hoursRequired;
};

/**
 * Parse date string in various formats
 * @param {string} dateString - Date string to parse
 * @returns {Date|null} Parsed date or null if invalid
 */
export const parseDate = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);
  return isNaN(date) ? null : date;
};

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = dateObj - now;
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);
  const diffDay = Math.round(diffHour / 24);

  if (Math.abs(diffSec) < 60) {
    return 'just now';
  } else if (Math.abs(diffMin) < 60) {
    return diffMin > 0 ? `in ${diffMin} minutes` : `${Math.abs(diffMin)} minutes ago`;
  } else if (Math.abs(diffHour) < 24) {
    return diffHour > 0 ? `in ${diffHour} hours` : `${Math.abs(diffHour)} hours ago`;
  } else {
    return diffDay > 0 ? `in ${diffDay} days` : `${Math.abs(diffDay)} days ago`;
  }
};

/**
 * Get start of day (00:00:00)
 * @param {Date|string} date - Date object
 * @returns {Date} Date set to start of day
 */
export const startOfDay = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setHours(0, 0, 0, 0);
  return dateObj;
};

/**
 * Get end of day (23:59:59)
 * @param {Date|string} date - Date object
 * @returns {Date} Date set to end of day
 */
export const endOfDay = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : new Date(date);
  dateObj.setHours(23, 59, 59, 999);
  return dateObj;
};

/**
 * Check if current time is past the cutoff hour (8pm)
 * @returns {boolean} True if past 8pm
 */
export const isPastCutoffTime = () => {
  const now = new Date();
  return now.getHours() >= 20; // 8pm = 20:00
};

/**
 * Get tomorrow's date in ISO format (YYYY-MM-DD)
 * If past 8pm, returns day after tomorrow
 * @returns {string} Tomorrow's date in ISO format
 */
export const getTomorrowDate = () => {
  const tomorrow = new Date();
  // If past 8pm, minimum is day after tomorrow
  const daysToAdd = isPastCutoffTime() ? 2 : 1;
  tomorrow.setDate(tomorrow.getDate() + daysToAdd);
  return formatDateISO(tomorrow);
};

/**
 * Get next Sunday's date in ISO format (YYYY-MM-DD)
 * If past 8pm and tomorrow is Sunday, returns the Sunday after
 * @returns {string} Next Sunday's date in ISO format
 */
export const getNextSunday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  let daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;

  // If past 8pm and tomorrow is Sunday (today is Saturday), skip to next Sunday
  if (isPastCutoffTime() && daysUntilSunday === 1) {
    daysUntilSunday = 8;
  }

  const nextSunday = new Date(today);
  nextSunday.setDate(today.getDate() + daysUntilSunday);
  return formatDateISO(nextSunday);
};

/**
 * Check if a date is allowed based on purchase type
 * @param {string} dateString - Date string to validate
 * @param {string} purchaseType - Purchase type ('one-time' or 'subscription')
 * @returns {Object} Validation result {allowed, error}
 */
export const isDateAllowed = (dateString, purchaseType) => {
  if (!dateString) {
    return {
      allowed: false,
      error: 'Please select a date'
    };
  }

  // Parse date string as local date (YYYY-MM-DD) to avoid timezone issues
  const [year, month, day] = dateString.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day); // month is 0-indexed

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  selectedDate.setHours(0, 0, 0, 0);

  // Cannot select today
  if (selectedDate.getTime() === today.getTime()) {
    return {
      allowed: false,
      error: 'Today\'s date cannot be selected for delivery'
    };
  }

  // Cannot select tomorrow if it's past 8pm
  if (isPastCutoffTime() && selectedDate.getTime() === tomorrow.getTime()) {
    return {
      allowed: false,
      error: 'Orders placed after 8pm cannot be delivered the next day. Please select a later date.'
    };
  }

  // Cannot select past dates
  if (selectedDate < today) {
    return {
      allowed: false,
      error: 'Please select a future date'
    };
  }

  // For subscriptions, only Sunday is allowed
  if (purchaseType === 'subscription') {
    const dayOfWeek = selectedDate.getDay();
    if (dayOfWeek !== 0) {
      return {
        allowed: false,
        error: 'Subscription deliveries are only available on Sundays'
      };
    }

    // Must be at least next Sunday (not today if today is Sunday)
    const nextSunday = new Date(getNextSunday());
    nextSunday.setHours(0, 0, 0, 0);
    if (selectedDate < nextSunday) {
      return {
        allowed: false,
        error: 'Please select next Sunday or later'
      };
    }
  }

  return { allowed: true };
};

/**
 * Get minimum allowed date based on purchase type
 * @param {string} purchaseType - Purchase type ('one-time' or 'subscription')
 * @returns {string} Minimum date in ISO format
 */
export const getMinDate = (purchaseType) => {
  if (purchaseType === 'subscription') {
    return getNextSunday();
  }
  return getTomorrowDate();
};

export default {
  formatDate,
  formatDateForShopify,
  formatDateShort,
  formatDateISO,
  formatTime,
  formatDateTime,
  getDayName,
  isPastDate,
  isToday,
  isWeekend,
  isDeliveryDay,
  getNextDeliveryDate,
  getAvailableDeliveryDates,
  getNextAvailableDeliveryDates,
  daysBetween,
  addDays,
  subtractDays,
  canCancelOrder,
  parseDate,
  getRelativeTime,
  startOfDay,
  endOfDay,
  getTomorrowDate,
  getNextSunday,
  isDateAllowed,
  getMinDate
};
