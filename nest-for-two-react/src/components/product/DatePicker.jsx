import { forwardRef, useState } from 'react';
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
  const [showCutoffInfo, setShowCutoffInfo] = useState(false);

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
      <div className="flex items-center gap-2">
        <label className="font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
          DELIVERY DATE
        </label>
        <button
          type="button"
          onClick={() => setShowCutoffInfo(true)}
          className="w-4 h-4 rounded-full bg-[#B76E79] text-white flex items-center justify-center hover:bg-[#a25d68] transition-colors text-[10px] font-bold"
          aria-label="Learn more about cut-off timing"
        >
          ?
        </button>
      </div>

      {/* Cut-off Timing Info Modal */}
      {showCutoffInfo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setShowCutoffInfo(false)}
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-playfair-bold text-lg" style={{ color: '#81775A' }}>
                About Cut-off Timing
              </h3>
              <button
                type="button"
                onClick={() => setShowCutoffInfo(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="font-source-sans text-[14px] leading-relaxed" style={{ color: '#636260' }}>
              <p>
                Our daily cut-off is 8:00pm; next-day delivery cannot be selected after this time.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowCutoffInfo(false)}
              className="mt-6 w-full bg-wellness-rose text-white py-2.5 font-source-sans rounded hover:bg-[#a25d68] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

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
