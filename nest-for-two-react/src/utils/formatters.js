/**
 * Text Formatting Utility Functions
 * Functions for formatting text, strings, and display values
 */

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Title case string
 */
export const titleCase = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Convert string to uppercase
 * @param {string} str - String to convert
 * @returns {string} Uppercase string
 */
export const toUpperCase = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.toUpperCase();
};

/**
 * Convert string to lowercase
 * @param {string} str - String to convert
 * @returns {string} Lowercase string
 */
export const toLowerCase = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.toLowerCase();
};

/**
 * Truncate string to specified length with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated string
 */
export const truncate = (str, maxLength, suffix = '...') => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length <= maxLength) {
    return str;
  }

  return str.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Truncate string by word count
 * @param {string} str - String to truncate
 * @param {number} maxWords - Maximum number of words
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated string
 */
export const truncateWords = (str, maxWords, suffix = '...') => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const words = str.trim().split(/\s+/);

  if (words.length <= maxWords) {
    return str;
  }

  return words.slice(0, maxWords).join(' ') + suffix;
};

/**
 * Remove extra whitespace from string
 * @param {string} str - String to clean
 * @returns {string} Cleaned string
 */
export const removeExtraWhitespace = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.replace(/\s+/g, ' ').trim();
};

/**
 * Format phone number for display (Singapore format)
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as: +65 XXXX XXXX or XXXX XXXX
  if (cleaned.startsWith('65') && cleaned.length === 10) {
    return `+65 ${cleaned.substring(2, 6)} ${cleaned.substring(6)}`;
  } else if (cleaned.length === 8) {
    return `${cleaned.substring(0, 4)} ${cleaned.substring(4)}`;
  }

  return phone;
};

/**
 * Format postal code (Singapore format)
 * @param {string} postalCode - Postal code
 * @returns {string} Formatted postal code
 */
export const formatPostalCode = (postalCode) => {
  if (!postalCode || typeof postalCode !== 'string') {
    return '';
  }

  const cleaned = postalCode.replace(/\D/g, '');

  if (cleaned.length === 6) {
    return cleaned;
  }

  return postalCode;
};

/**
 * Format address for display
 * @param {Object} address - Address object
 * @returns {string} Formatted address string
 */
export const formatAddress = (address) => {
  if (!address || typeof address !== 'object') {
    return '';
  }

  const parts = [];

  if (address.addressLine1) parts.push(address.addressLine1);
  if (address.addressLine2) parts.push(address.addressLine2);
  if (address.postalCode) parts.push(`Singapore ${address.postalCode}`);

  return parts.join(', ');
};

/**
 * Format address for multiple lines
 * @param {Object} address - Address object
 * @returns {Array<string>} Array of address lines
 */
export const formatAddressMultiline = (address) => {
  if (!address || typeof address !== 'object') {
    return [];
  }

  const lines = [];

  if (address.recipientName) lines.push(address.recipientName);
  if (address.addressLine1) lines.push(address.addressLine1);
  if (address.addressLine2) lines.push(address.addressLine2);
  if (address.postalCode) lines.push(`Singapore ${address.postalCode}`);

  return lines;
};

/**
 * Slugify string for URL-friendly format
 * @param {string} str - String to slugify
 * @returns {string} Slugified string
 */
export const slugify = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Convert camelCase to Title Case
 * @param {string} str - camelCase string
 * @returns {string} Title Case string
 */
export const camelToTitle = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (char) => char.toUpperCase())
    .trim();
};

/**
 * Convert snake_case to Title Case
 * @param {string} str - snake_case string
 * @returns {string} Title Case string
 */
export const snakeToTitle = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .split('_')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Convert kebab-case to Title Case
 * @param {string} str - kebab-case string
 * @returns {string} Title Case string
 */
export const kebabToTitle = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Pluralize word based on count
 * @param {string} word - Word to pluralize
 * @param {number} count - Count
 * @param {string} pluralForm - Custom plural form (optional)
 * @returns {string} Pluralized word
 */
export const pluralize = (word, count, pluralForm = null) => {
  if (count === 1) {
    return word;
  }

  if (pluralForm) {
    return pluralForm;
  }

  // Simple English pluralization rules
  if (word.endsWith('y')) {
    return word.slice(0, -1) + 'ies';
  } else if (word.endsWith('s') || word.endsWith('x') || word.endsWith('ch') || word.endsWith('sh')) {
    return word + 'es';
  } else {
    return word + 's';
  }
};

/**
 * Format count with pluralized word
 * @param {number} count - Count
 * @param {string} singular - Singular form
 * @param {string} plural - Plural form (optional)
 * @returns {string} Formatted count with word
 */
export const formatCount = (count, singular, plural = null) => {
  const word = count === 1 ? singular : (plural || pluralize(singular, count));
  return `${count} ${word}`;
};

/**
 * Format percentage
 * @param {number} value - Percentage value (0-100 or 0-1)
 * @param {boolean} isDecimal - Whether value is decimal (0-1)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, isDecimal = false, decimals = 0) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%';
  }

  const percentage = isDecimal ? value * 100 : value;
  return `${percentage.toFixed(decimals)}%`;
};

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format number with thousand separators
 * @param {number} num - Number to format
 * @param {string} separator - Separator character (default: ',')
 * @returns {string} Formatted number
 */
export const formatNumber = (num, separator = ',') => {
  if (typeof num !== 'number' || isNaN(num)) {
    return '0';
  }

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

/**
 * Format order status for display
 * @param {string} status - Order status
 * @returns {string} Formatted status
 */
export const formatOrderStatus = (status) => {
  if (!status || typeof status !== 'string') {
    return '';
  }

  return status
    .split('-')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Format time slot for display
 * @param {string} timeSlot - Time slot (e.g., '09:00-12:00')
 * @returns {string} Formatted time slot
 */
export const formatTimeSlot = (timeSlot) => {
  if (!timeSlot || typeof timeSlot !== 'string') {
    return '';
  }

  const [start, end] = timeSlot.split('-');

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return `${formatTime(start)} - ${formatTime(end)}`;
};

/**
 * Mask sensitive information (e.g., email, phone)
 * @param {string} str - String to mask
 * @param {number} visibleStart - Number of visible characters at start
 * @param {number} visibleEnd - Number of visible characters at end
 * @param {string} maskChar - Character to use for masking
 * @returns {string} Masked string
 */
export const maskString = (str, visibleStart = 2, visibleEnd = 2, maskChar = '*') => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  if (str.length <= visibleStart + visibleEnd) {
    return str;
  }

  const start = str.substring(0, visibleStart);
  const end = str.substring(str.length - visibleEnd);
  const maskLength = str.length - visibleStart - visibleEnd;
  const mask = maskChar.repeat(maskLength);

  return start + mask + end;
};

/**
 * Mask email address
 * @param {string} email - Email address
 * @returns {string} Masked email
 */
export const maskEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return '';
  }

  const [localPart, domain] = email.split('@');

  if (!domain) {
    return email;
  }

  const maskedLocal = maskString(localPart, 2, 1);
  return `${maskedLocal}@${domain}`;
};

/**
 * Mask phone number
 * @param {string} phone - Phone number
 * @returns {string} Masked phone number
 */
export const maskPhone = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return '';
  }

  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length < 4) {
    return phone;
  }

  return maskString(cleaned, 2, 2);
};

/**
 * Extract initials from name
 * @param {string} name - Full name
 * @param {number} maxInitials - Maximum number of initials
 * @returns {string} Initials
 */
export const getInitials = (name, maxInitials = 2) => {
  if (!name || typeof name !== 'string') {
    return '';
  }

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, maxInitials)
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return initials;
};

/**
 * Generate a random ID
 * @param {number} length - Length of ID
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

/**
 * Escape HTML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export const escapeHtml = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  const htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  };

  return str.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
};

/**
 * Strip HTML tags from string
 * @param {string} str - String with HTML
 * @returns {string} String without HTML tags
 */
export const stripHtml = (str) => {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.replace(/<[^>]*>/g, '');
};

export default {
  capitalize,
  titleCase,
  toUpperCase,
  toLowerCase,
  truncate,
  truncateWords,
  removeExtraWhitespace,
  formatPhoneNumber,
  formatPostalCode,
  formatAddress,
  formatAddressMultiline,
  slugify,
  camelToTitle,
  snakeToTitle,
  kebabToTitle,
  pluralize,
  formatCount,
  formatPercentage,
  formatFileSize,
  formatNumber,
  formatOrderStatus,
  formatTimeSlot,
  maskString,
  maskEmail,
  maskPhone,
  getInitials,
  generateId,
  escapeHtml,
  stripHtml
};
