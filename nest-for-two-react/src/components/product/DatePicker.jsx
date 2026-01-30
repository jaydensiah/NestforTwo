import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { isDateAllowed, getMinDate } from '../../utils/dateHelpers';

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
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const validation = isDateAllowed(selectedDate, purchaseType);

    if (!validation.allowed) {
      // Show popup alert for subscription non-Sunday selection
      if (purchaseType === 'subscription' && validation.error.includes('Sundays')) {
        alert('Subscription deliveries are only available on Sundays. Please select a Sunday.');
      }
      setError(validation.error);
      onChange('');
    } else {
      setError('');
      onChange(selectedDate);
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
    setError('');
  };

  return (
    <div className="space-y-2">
      <label className="block font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
        DELIVERY DATE
      </label>

      <div className="relative">
        {/* Hidden native date input */}
        <input
          ref={inputRef}
          type="date"
          min={getMinDate(purchaseType)}
          value={value}
          onChange={handleDateChange}
          required={required}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 1 }}
        />

        {/* Visible styled display */}
        <div
          onClick={handleClick}
          className={`w-full border ${error ? 'border-red-500' : 'border-[#d1d5db]'} px-4 py-2 font-source-sans cursor-pointer bg-white`}
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

      {error && (
        <p className="font-source-sans" style={{ fontSize: '12px', color: '#636260' }}>{error}</p>
      )}

      {!error && (
        <p className="font-source-sans" style={{ fontSize: '12px', color: '#636260' }}>
          {purchaseType === 'subscription'
            ? 'Delivery for Subscription orders are fixed on Sundays. *Today\'s date cannot be selected for delivery.'
            : 'We deliver Monday to Sunday *Today\'s date cannot be selected for delivery.'}
        </p>
      )}
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
