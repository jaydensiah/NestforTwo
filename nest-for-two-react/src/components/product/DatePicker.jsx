import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
 * Check if current Singapore time is past 8pm cutoff
 */
const isPastCutoff = () => {
  const now = getSingaporeTime();
  return now.getHours() >= 20;
};

/**
 * Get minimum selectable date based on purchase type
 */
const getMinDate = (purchaseType) => {
  const today = getSingaporeToday();
  const pastCutoff = isPastCutoff();

  if (purchaseType === 'subscription') {
    // For subscriptions, find next valid Sunday
    const dayOfWeek = today.getDay();
    let daysUntilSunday = dayOfWeek === 0 ? 7 : 7 - dayOfWeek;

    // If past 8pm and tomorrow is Sunday, skip to next Sunday
    if (pastCutoff && daysUntilSunday === 1) {
      daysUntilSunday = 8;
    }

    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    return nextSunday;
  }

  // For one-time orders
  const minDate = new Date(today);
  if (pastCutoff) {
    // After 8pm: minimum is day after tomorrow
    minDate.setDate(today.getDate() + 2);
  } else {
    // Before 8pm: minimum is tomorrow
    minDate.setDate(today.getDate() + 1);
  }
  return minDate;
};

/**
 * Get maximum selectable date (60 days from today)
 */
const getMaxDate = () => {
  const today = getSingaporeToday();
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 60);
  return maxDate;
};

/**
 * Filter function to determine if a date is selectable
 */
const isDateSelectable = (date, purchaseType) => {
  const today = getSingaporeToday();
  const pastCutoff = isPastCutoff();

  // Block today
  if (date.toDateString() === today.toDateString()) {
    return false;
  }

  // Block past dates
  if (date < today) {
    return false;
  }

  // Block tomorrow if past 8pm
  if (pastCutoff) {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) {
      return false;
    }
  }

  // For subscriptions, only allow Sundays
  if (purchaseType === 'subscription') {
    return date.getDay() === 0; // 0 = Sunday
  }

  return true;
};

/**
 * Custom input component for the date picker
 */
const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
  <div
    onClick={onClick}
    ref={ref}
    className="w-full border border-[#d1d5db] px-4 py-2 font-source-sans bg-white cursor-pointer"
    style={{
      color: value ? '#636260' : '#9ca3af',
      minHeight: '44px',
      display: 'flex',
      alignItems: 'center'
    }}
  >
    {value || placeholder}
  </div>
));

CustomInput.displayName = 'CustomInput';

/**
 * DatePicker Component using react-datepicker
 * Renders a custom calendar that works on mobile
 */
const DatePicker = ({ purchaseType, value, onChange, required = true }) => {
  // Convert ISO string to Date object for react-datepicker
  const selectedDate = value ? new Date(value + 'T00:00:00') : null;

  const handleChange = (date) => {
    if (date) {
      // Convert Date object back to ISO string (YYYY-MM-DD)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-2 datepicker-container">
      <label className="block font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
        DELIVERY DATE
      </label>

      <div className="relative w-full">
        <ReactDatePicker
          selected={selectedDate}
          onChange={handleChange}
          minDate={getMinDate(purchaseType)}
          maxDate={getMaxDate()}
          filterDate={(date) => isDateSelectable(date, purchaseType)}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          customInput={<CustomInput />}
          required={required}
          isClearable={!!value}
          showPopperArrow={false}
          popperPlacement="bottom-start"
          popperModifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 4],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                boundary: 'viewport',
              },
            },
          ]}
        />
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
