import React from 'react';
import PropTypes from 'prop-types';

/**
 * SizeSelector Component
 * Radio button selector for product sizes with pricing information
 *
 * @param {Object} props
 * @param {Array} props.options - Array of size options
 * @param {string} props.selected - Currently selected size
 * @param {Function} props.onChange - Callback function when size changes
 * @param {string} props.purchaseType - Purchase type to filter options
 */
const SizeSelector = ({ options, selected, onChange, purchaseType }) => {
  const getSizeLabel = (size, type) => {
    if (type === 'subscription') {
      return `${size} - Monthly Subscription (30 bottles)`;
    }
    return `${size} - Box of 6 bottles`;
  };

  return (
    <div className="space-y-2">
      {options.map(option => (
        <label
          key={option.size}
          className="flex items-center justify-between border border-[#d1d5db] p-3 sm:p-4 cursor-pointer hover:border-wellness-rose transition-colors"
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="size"
              value={option.size}
              checked={selected === option.size}
              onChange={() => onChange(option.size)}
              className="w-4 h-4 text-wellness-rose"
            />
            <div className="font-source-sans text-wellness-dark text-[14px] sm:text-base">
              {getSizeLabel(option.size, purchaseType)}
            </div>
          </div>
          <div className="font-source-sans text-base sm:text-lg flex items-center gap-2">
            {option.originalPrice && (
              <span className="text-[13px] sm:text-[14px] line-through" style={{ color: '#9ca3af' }}>
                ${option.originalPrice.toFixed(2)}
              </span>
            )}
            <span style={{ color: '#B76E79' }}>${option.price}</span>
            {option.pricePerBottle && (
              <span className="font-source-sans text-[12px] sm:text-sm" style={{ color: '#636260' }}>
                (${option.pricePerBottle}/bottle)
              </span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
};

SizeSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      pricePerBottle: PropTypes.number,
      savings: PropTypes.string
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  purchaseType: PropTypes.string
};

export default SizeSelector;
