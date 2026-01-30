import { useRef } from 'react';
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
  const inputRef = useRef(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.showPicker?.();
      inputRef.current.focus();
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;

    // Skip validation if no date selected (user cancelled or picker closed)
    if (!selectedDate) {
      return;
    }

    const validation = isDateAllowed(selectedDate, purchaseType);

    if (!validation.allowed) {
      // Show popup alert for all validation errors
      alert(validation.error);
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
          min={getMinDate(purchaseType)}
          value={value}
          onChange={handleDateChange}
          required={required}
          className="absolute inset-0 w-full h-full cursor-pointer"
          style={{ opacity: 0 }}
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
