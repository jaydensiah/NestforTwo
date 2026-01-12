import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { formatDateShort, isDateAllowed, getMinDate } from '../../utils/dateHelpers';

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
      setDisplayValue(formatDateShort(selectedDate));
    }
  };

  const handleClear = () => {
    onChange('');
    setDisplayValue('');
    setError('');
  };

  return (
    <div className="space-y-2">
      <label className="block font-nunito-regular text-wellness-dark">
        Delivery Date {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        <input
          type="date"
          min={getMinDate(purchaseType)}
          value={value}
          onChange={handleDateChange}
          className={`w-full border ${error ? 'border-red-500' : 'border-[#d1d5db]'} rounded px-4 py-2 font-source-sans focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-wellness-rose'}`}
          required={required}
        />

        {displayValue && (
          <div className="absolute top-full mt-1 text-sm font-source-sans text-wellness-text">
            Selected: {displayValue}
          </div>
        )}

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-wellness-text hover:text-wellness-dark"
            aria-label="Clear date"
          >
            ×
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-500 font-source-sans">{error}</p>
      )}

      {!error && (
        <p className="text-sm text-wellness-text font-source-sans">
          {purchaseType === 'subscription'
            ? 'Subscription deliveries are only available on Sundays'
            : 'Delivery requires at least 24 hours notice'}
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
