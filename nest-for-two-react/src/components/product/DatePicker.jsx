import { useRef } from 'react';
import PropTypes from 'prop-types';
import { isDateAllowed } from '../../utils/dateHelpers';

/**
 * Format date from YYYY-MM-DD to DD/MM/YYYY for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Date in DD/MM/YYYY format
 */
const formatDisplayDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

/**
 * Get current Singapore time
 */
const getSingaporeTime = () => {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "Asia/Singapore" }));
};

/**
 * Get Singapore date only (no time component)
 */
const getSingaporeToday = () => {
  const singaporeTime = getSingaporeTime();
  return new Date(singaporeTime.getFullYear(), singaporeTime.getMonth(), singaporeTime.getDate());
};

/**
 * Format date to YYYY-MM-DD for input min/max attributes
 * Avoids toISOString() to prevent timezone issues
 */
const formatDateForInput = (date) => {
  return date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0');
};

/**
 * Calculate minimum date based on current Singapore time and purchase type
 */
const calculateMinDate = (purchaseType) => {
  const now = getSingaporeTime();
  const currentHour = now.getHours();
  const today = getSingaporeToday();

  if (purchaseType === 'subscription') {
    // For subscriptions, find next Sunday
    const dayOfWeek = today.getDay();
    let daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;

    // If past 8pm and tomorrow is Sunday (today is Saturday), skip to next Sunday
    if (currentHour >= 20 && daysUntilSunday === 1) {
      daysUntilSunday = 8;
    }

    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return formatDateForInput(nextSunday);
  }

  // For one-time orders
  let minDeliveryDate = new Date(today);
  if (currentHour >= 20) {
    // After 8 PM: Block today + tomorrow
    minDeliveryDate.setDate(today.getDate() + 2);
  } else {
    // Before 8 PM: Block today only
    minDeliveryDate.setDate(today.getDate() + 1);
  }
  return formatDateForInput(minDeliveryDate);
};

/**
 * Calculate maximum date (60 days from today)
 */
const calculateMaxDate = () => {
  const today = getSingaporeToday();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 60);
  return formatDateForInput(maxDate);
};

/**
 * DatePicker Component
 * Date picker with 24hr advance notice and Sunday-only for subscriptions
 *
 * @param {Object} props
 * @param {string} props.purchaseType - Purchase type ('one-time' or 'subscription')
 * @param {string} props.value - Currently selected date in ISO format
 * @param {Function} props.onChange - Callback function when date changes
 * @param {boolean} props.required - Whether the field is required (default: true)
 */
const DatePicker = ({ purchaseType, value, onChange, required = true }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    const input = inputRef.current;
    if (!input) return;

    // CRITICAL: Set min/max RIGHT BEFORE opening picker - this makes mobile work!
    input.min = calculateMinDate(purchaseType);
    input.max = calculateMaxDate();

    // Temporarily make the input clickable and bring to front
    input.style.zIndex = '10';
    input.style.pointerEvents = 'auto';

    // Focus and open the picker
    input.focus();
    try {
      if (typeof input.showPicker === 'function') {
        input.showPicker();
      }
    } catch (error) {
      console.log('showPicker not supported');
    }

    // Hide the input again after a short delay
    setTimeout(() => {
      input.style.zIndex = '1';
      input.style.pointerEvents = 'none';
    }, 100);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    // Skip validation if no date selected (user cancelled or picker closed)
    if (!selectedDate) {
      return;
    }

    const validation = isDateAllowed(selectedDate, purchaseType);

    if (!validation.allowed) {
      // Silently reject today's date and past dates (no alert)
      // Only show alert for other validation errors (subscriptions, cutoff time, etc.)
      if (!validation.error.includes('Today') && !validation.error.includes('future date')) {
        alert(validation.error);
      }
      onChange('');
    } else {
      onChange(selectedDate);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div className="space-y-2">
      <label className="block font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
        DELIVERY DATE
      </label>

      <div className="relative" onClick={handleClick} style={{ cursor: 'pointer' }}>
        {/* Visible styled display */}
        <div
          className="w-full border border-[#d1d5db] px-4 py-2 font-source-sans bg-white"
          style={{ color: value ? '#636260' : '#9ca3af', minHeight: '44px', display: 'flex', alignItems: 'center' }}
        >
          {value ? formatDisplayDate(value) : 'DD/MM/YYYY'}
        </div>

        {/* Hidden native date input - positioned after div so inset-0 works */}
        <input
          ref={inputRef}
          type="date"
          value={value}
          onChange={handleDateChange}
          required={required}
          className="absolute inset-0 w-full h-full cursor-pointer"
          style={{ opacity: 0, pointerEvents: 'none', zIndex: 1 }}
        />

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-wellness-text hover:text-wellness-dark"
            style={{ zIndex: 2 }}
            aria-label="Clear date"
          >
            ×
          </button>
        )}
      </div>

      <p className="font-source-sans" style={{ fontSize: '12px', color: '#636260' }}>
        {purchaseType === 'subscription'
          ? 'Delivery for Subscription orders are fixed on Sundays. *Today\'s date cannot be selected for delivery.'
          : 'We deliver Monday to Sunday *Today\'s date cannot be selected for delivery.'}
      </p>
    </div>
  );
};

DatePicker.propTypes = {
  purchaseType: PropTypes.oneOf(['one-time', 'subscription']).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export default DatePicker;
