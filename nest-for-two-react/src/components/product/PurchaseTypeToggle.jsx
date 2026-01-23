import React from 'react';
import PropTypes from 'prop-types';

/**
 * PurchaseTypeToggle Component
 * Toggle button for selecting between one-time purchase and subscription
 *
 * @param {Object} props
 * @param {string} props.selected - Currently selected purchase type ('one-time' or 'subscription')
 * @param {Function} props.onChange - Callback function when purchase type changes
 */
const PurchaseTypeToggle = ({ selected, onChange }) => {
  return (
    <div className="border border-[#d1d5db] p-1 w-full flex">
      <button
        type="button"
        onClick={() => onChange('one-time')}
        className={`flex-1 py-2 font-source-sans text-sm transition-colors ${
          selected === 'one-time'
            ? 'bg-wellness-rose text-white'
            : 'bg-white text-wellness-dark'
        }`}
        aria-pressed={selected === 'one-time'}
      >
        One-time Purchase
      </button>
      <button
        type="button"
        onClick={() => onChange('subscription')}
        className={`flex-1 py-2 font-source-sans text-sm transition-colors ${
          selected === 'subscription'
            ? 'bg-wellness-rose text-white'
            : 'bg-white text-wellness-dark'
        }`}
        aria-pressed={selected === 'subscription'}
      >
        Monthly Subscription and Save 17%
      </button>
    </div>
  );
};

PurchaseTypeToggle.propTypes = {
  selected: PropTypes.oneOf(['one-time', 'subscription']).isRequired,
  onChange: PropTypes.func.isRequired
};

export default PurchaseTypeToggle;
