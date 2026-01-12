/**
 * Validation Functions
 * Utility functions for validating user input, form data, and business rules
 */

import {
  EMAIL_REGEX,
  ADDRESS_RULES,
  GIFT_CARD_RULES,
  DELIVERY_SCHEDULE
} from '../config/businessRules.js';

/**
 * Validate email address
 * @param {string} email - Email address to validate
 * @returns {Object} Validation result {valid, error}
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return {
      valid: false,
      error: 'Email is required'
    };
  }

  const trimmedEmail = email.trim();

  if (trimmedEmail.length === 0) {
    return {
      valid: false,
      error: 'Email is required'
    };
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return {
      valid: false,
      error: 'Please enter a valid email address'
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate phone number (Singapore format)
 * @param {string} phone - Phone number to validate
 * @returns {Object} Validation result {valid, error}
 */
export const validatePhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return {
      valid: false,
      error: 'Phone number is required'
    };
  }

  const cleanedPhone = phone.replace(/\s+/g, '');

  if (cleanedPhone.length < ADDRESS_RULES.PHONE_MIN_LENGTH) {
    return {
      valid: false,
      error: `Phone number must be at least ${ADDRESS_RULES.PHONE_MIN_LENGTH} digits`
    };
  }

  if (cleanedPhone.length > ADDRESS_RULES.PHONE_MAX_LENGTH) {
    return {
      valid: false,
      error: `Phone number must not exceed ${ADDRESS_RULES.PHONE_MAX_LENGTH} digits`
    };
  }

  if (!ADDRESS_RULES.PHONE_REGEX.test(cleanedPhone)) {
    return {
      valid: false,
      error: 'Please enter a valid Singapore phone number'
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate postal code (Singapore format)
 * @param {string} postalCode - Postal code to validate
 * @returns {Object} Validation result {valid, error}
 */
export const validatePostalCode = (postalCode) => {
  if (!postalCode || typeof postalCode !== 'string') {
    return {
      valid: false,
      error: 'Postal code is required'
    };
  }

  const cleanedCode = postalCode.trim();

  if (cleanedCode.length !== ADDRESS_RULES.POSTAL_CODE_LENGTH) {
    return {
      valid: false,
      error: `Postal code must be ${ADDRESS_RULES.POSTAL_CODE_LENGTH} digits`
    };
  }

  if (!ADDRESS_RULES.POSTAL_CODE_REGEX.test(cleanedCode)) {
    return {
      valid: false,
      error: 'Please enter a valid 6-digit postal code'
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @param {string} fieldName - Name of the field
 * @returns {Object} Validation result {valid, error}
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || (typeof value === 'string' && value.trim().length === 0)) {
    return {
      valid: false,
      error: `${fieldName} is required`
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate text length
 * @param {string} text - Text to validate
 * @param {number} minLength - Minimum length
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Name of the field
 * @returns {Object} Validation result {valid, error}
 */
export const validateLength = (text, minLength, maxLength, fieldName = 'This field') => {
  if (!text || typeof text !== 'string') {
    return {
      valid: false,
      error: `${fieldName} is required`
    };
  }

  const trimmedText = text.trim();

  if (trimmedText.length < minLength) {
    return {
      valid: false,
      error: `${fieldName} must be at least ${minLength} characters`
    };
  }

  if (trimmedText.length > maxLength) {
    return {
      valid: false,
      error: `${fieldName} must not exceed ${maxLength} characters`
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate word count
 * @param {string} text - Text to validate
 * @param {number} minWords - Minimum word count
 * @param {number} maxWords - Maximum word count
 * @returns {Object} Validation result {valid, error, wordCount}
 */
export const validateWordCount = (text, minWords, maxWords) => {
  if (!text || typeof text !== 'string') {
    return {
      valid: false,
      error: 'Text is required',
      wordCount: 0
    };
  }

  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  if (wordCount < minWords) {
    return {
      valid: false,
      error: `Message must contain at least ${minWords} word${minWords > 1 ? 's' : ''}`,
      wordCount
    };
  }

  if (wordCount > maxWords) {
    return {
      valid: false,
      error: `Message must not exceed ${maxWords} words`,
      wordCount
    };
  }

  return {
    valid: true,
    error: null,
    wordCount
  };
};

/**
 * Validate gift card message
 * @param {string} message - Gift card message
 * @returns {Object} Validation result {valid, error, wordCount}
 */
export const validateGiftCardMessage = (message) => {
  // Validate length
  const lengthValidation = validateLength(
    message,
    GIFT_CARD_RULES.MIN_MESSAGE_LENGTH,
    GIFT_CARD_RULES.MAX_MESSAGE_LENGTH,
    'Gift card message'
  );

  if (!lengthValidation.valid) {
    return lengthValidation;
  }

  // Validate word count
  const wordCountValidation = validateWordCount(
    message,
    GIFT_CARD_RULES.MIN_WORD_COUNT,
    GIFT_CARD_RULES.MAX_WORD_COUNT
  );

  return wordCountValidation;
};

/**
 * Validate delivery address
 * @param {Object} address - Address object
 * @returns {Object} Validation result {valid, errors}
 */
export const validateAddress = (address) => {
  const errors = {};
  let isValid = true;

  // Validate recipient name
  if (!address.recipientName || address.recipientName.trim().length === 0) {
    errors.recipientName = 'Recipient name is required';
    isValid = false;
  } else if (address.recipientName.length > ADDRESS_RULES.MAX_RECIPIENT_NAME_LENGTH) {
    errors.recipientName = `Recipient name must not exceed ${ADDRESS_RULES.MAX_RECIPIENT_NAME_LENGTH} characters`;
    isValid = false;
  }

  // Validate address line 1
  if (!address.addressLine1 || address.addressLine1.trim().length === 0) {
    errors.addressLine1 = 'Address is required';
    isValid = false;
  } else if (address.addressLine1.length > ADDRESS_RULES.MAX_ADDRESS_LINE_LENGTH) {
    errors.addressLine1 = `Address must not exceed ${ADDRESS_RULES.MAX_ADDRESS_LINE_LENGTH} characters`;
    isValid = false;
  }

  // Validate address line 2 (optional, but check length if provided)
  if (address.addressLine2 && address.addressLine2.length > ADDRESS_RULES.MAX_ADDRESS_LINE_LENGTH) {
    errors.addressLine2 = `Address must not exceed ${ADDRESS_RULES.MAX_ADDRESS_LINE_LENGTH} characters`;
    isValid = false;
  }

  // Validate postal code
  const postalValidation = validatePostalCode(address.postalCode);
  if (!postalValidation.valid) {
    errors.postalCode = postalValidation.error;
    isValid = false;
  }

  // Validate phone
  const phoneValidation = validatePhone(address.phone);
  if (!phoneValidation.valid) {
    errors.phone = phoneValidation.error;
    isValid = false;
  }

  return {
    valid: isValid,
    errors: isValid ? null : errors
  };
};

/**
 * Validate quantity
 * @param {number} quantity - Quantity to validate
 * @param {number} min - Minimum quantity
 * @param {number} max - Maximum quantity
 * @returns {Object} Validation result {valid, error}
 */
export const validateQuantity = (quantity, min = 1, max = 999) => {
  const qty = parseInt(quantity);

  if (isNaN(qty)) {
    return {
      valid: false,
      error: 'Please enter a valid quantity'
    };
  }

  if (qty < min) {
    return {
      valid: false,
      error: `Quantity must be at least ${min}`
    };
  }

  if (qty > max) {
    return {
      valid: false,
      error: `Quantity cannot exceed ${max}`
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate delivery date
 * @param {Date|string} date - Date to validate
 * @returns {Object} Validation result {valid, error}
 */
export const validateDeliveryDate = (date) => {
  if (!date) {
    return {
      valid: false,
      error: 'Delivery date is required'
    };
  }

  const deliveryDate = typeof date === 'string' ? new Date(date) : date;

  if (!(deliveryDate instanceof Date) || isNaN(deliveryDate)) {
    return {
      valid: false,
      error: 'Invalid delivery date'
    };
  }

  // Check if date is in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  deliveryDate.setHours(0, 0, 0, 0);

  if (deliveryDate < today) {
    return {
      valid: false,
      error: 'Delivery date cannot be in the past'
    };
  }

  // Check minimum lead time
  const minDate = new Date(today);
  minDate.setDate(minDate.getDate() + DELIVERY_SCHEDULE.MIN_LEAD_TIME_DAYS);

  if (deliveryDate < minDate) {
    return {
      valid: false,
      error: `Delivery requires at least ${DELIVERY_SCHEDULE.MIN_LEAD_TIME_DAYS} days notice`
    };
  }

  // Check if it's a valid delivery day
  const dayOfWeek = deliveryDate.getDay();
  if (!DELIVERY_SCHEDULE.AVAILABLE_DAYS.includes(dayOfWeek)) {
    const availableDays = DELIVERY_SCHEDULE.AVAILABLE_DAYS
      .map(day => DELIVERY_SCHEDULE.DAY_NAMES[day])
      .join(', ');

    return {
      valid: false,
      error: `Delivery is only available on ${availableDays}`
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate time slot
 * @param {string} timeSlot - Time slot value
 * @returns {Object} Validation result {valid, error}
 */
export const validateTimeSlot = (timeSlot) => {
  if (!timeSlot) {
    return {
      valid: false,
      error: 'Please select a delivery time slot'
    };
  }

  const validSlots = DELIVERY_SCHEDULE.TIME_SLOTS.map(slot => slot.value);

  if (!validSlots.includes(timeSlot)) {
    return {
      valid: false,
      error: 'Invalid time slot selected'
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result {valid, error, strength}
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      valid: false,
      error: 'Password is required',
      strength: 'weak'
    };
  }

  if (password.length < 8) {
    return {
      valid: false,
      error: 'Password must be at least 8 characters',
      strength: 'weak'
    };
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const strength = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar]
    .filter(Boolean).length;

  if (strength < 3) {
    return {
      valid: false,
      error: 'Password must contain uppercase, lowercase, and numbers',
      strength: 'weak'
    };
  }

  return {
    valid: true,
    error: null,
    strength: strength === 4 ? 'strong' : 'medium'
  };
};

/**
 * Validate credit card number (basic Luhn algorithm)
 * @param {string} cardNumber - Credit card number
 * @returns {Object} Validation result {valid, error}
 */
export const validateCreditCard = (cardNumber) => {
  if (!cardNumber) {
    return {
      valid: false,
      error: 'Card number is required'
    };
  }

  const cleaned = cardNumber.replace(/\s+/g, '');

  if (!/^\d{13,19}$/.test(cleaned)) {
    return {
      valid: false,
      error: 'Invalid card number format'
    };
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i));

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  if (sum % 10 !== 0) {
    return {
      valid: false,
      error: 'Invalid card number'
    };
  }

  return {
    valid: true,
    error: null
  };
};

/**
 * Validate form data
 * @param {Object} formData - Form data object
 * @param {Object} validationRules - Validation rules object
 * @returns {Object} Validation result {valid, errors}
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach(field => {
    const rules = validationRules[field];
    const value = formData[field];

    if (rules.required) {
      const requiredValidation = validateRequired(value, rules.label || field);
      if (!requiredValidation.valid) {
        errors[field] = requiredValidation.error;
        isValid = false;
        return;
      }
    }

    if (rules.email && value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.valid) {
        errors[field] = emailValidation.error;
        isValid = false;
      }
    }

    if (rules.phone && value) {
      const phoneValidation = validatePhone(value);
      if (!phoneValidation.valid) {
        errors[field] = phoneValidation.error;
        isValid = false;
      }
    }

    if (rules.minLength || rules.maxLength) {
      const lengthValidation = validateLength(
        value,
        rules.minLength || 0,
        rules.maxLength || Infinity,
        rules.label || field
      );
      if (!lengthValidation.valid) {
        errors[field] = lengthValidation.error;
        isValid = false;
      }
    }

    if (rules.custom && typeof rules.custom === 'function') {
      const customValidation = rules.custom(value, formData);
      if (!customValidation.valid) {
        errors[field] = customValidation.error;
        isValid = false;
      }
    }
  });

  return {
    valid: isValid,
    errors: isValid ? null : errors
  };
};

/**
 * Check word count (simplified version for UI display)
 * @param {string} text - Text to check
 * @param {number} maxWords - Maximum word count
 * @returns {Object} Result object {count, isValid, remaining}
 */
export const checkWordCount = (text, maxWords = 100) => {
  if (!text || typeof text !== 'string') {
    return {
      count: 0,
      isValid: true,
      remaining: maxWords
    };
  }

  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const count = words.length;

  return {
    count,
    isValid: count <= maxWords,
    remaining: maxWords - count
  };
};

export default {
  validateEmail,
  validatePhone,
  validatePostalCode,
  validateRequired,
  validateLength,
  validateWordCount,
  checkWordCount,
  validateGiftCardMessage,
  validateAddress,
  validateQuantity,
  validateDeliveryDate,
  validateTimeSlot,
  validatePassword,
  validateCreditCard,
  validateForm
};
