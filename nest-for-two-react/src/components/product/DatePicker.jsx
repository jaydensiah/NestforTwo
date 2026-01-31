import { useRef } from 'react';
import PropTypes from 'prop-types';
import { isDateAllowed } from '../../utils/dateHelpers';

/**
 * Format date from YYYY-MM-DD to DD/MM/YYYY for display
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
    const dayOfWeek = today.getDay();
    let daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;

    if (currentHour >= 20 && daysUntilSunday === 1) {
      daysUntilSunday = 8;
    }

    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return formatDateForInput(nextSunday);
  }

  let minDeliveryDate = new Date(today);
  if (currentHour >= 20) {
    minDeliveryDate.setDate(today.getDate() + 2);
  } else {
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
 * Simple approach: native date input is directly tappable
 */
const DatePicker = ({ purchaseType, value, onChange, required = true }) => {
  const inputRef = useRef(null);
  const minDate = calculateMinDate(purchaseType);
  const maxDate = calculateMaxDate();

  const handleContainerClick = () => {
    if (inputRef.current) {
      try {
        inputRef.current.showPicker();
      } catch {
        inputRef.current.focus();
      }
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    if (!selectedDate) {
      return;
    }

    const validation = isDateAllowed(selectedDate, purchaseType);

    if (!validation.allowed) {
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
    e.preventDefault();
    onChange('');
  };

  return (
    <div className="space-y-2">
      <label className="block font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
        DELIVERY DATE
      </label>

      <div className="relative" onClick={handleContainerClick} style={{ cursor: 'pointer' }}>
        {/* Hidden native date input */}
        <input
          ref={inputRef}
          type="date"
          min={minDate}
          max={maxDate}
          value={value}
          onChange={handleDateChange}
          required={required}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 1 }}
        />

        {/* Visible display box */}
        <div
          className="w-full border border-[#d1d5db] px-4 py-2 font-source-sans bg-white"
          style={{ color: value ? '#636260' : '#9ca3af', minHeight: '44px', display: 'flex', alignItems: 'center' }}
        >
          {value ? formatDisplayDate(value) : 'DD/MM/YYYY'}
        </div>

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
