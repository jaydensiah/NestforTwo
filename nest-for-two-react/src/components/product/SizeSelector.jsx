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
  return (
    <div className="space-y-2">
      {options.map(option => (
        <label
          key={option.size}
          className="flex items-center justify-between border border-[#d1d5db] rounded p-4 cursor-pointer hover:border-wellness-rose transition-colors"
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
            <div>
              <div className="font-nunito-regular text-wellness-dark">
                {option.size}
              </div>
              {purchaseType === 'subscription' && option.savings && (
                <div className="font-source-sans text-sm text-wellness-rose">
                  Save {option.savings}
                </div>
              )}
            </div>
          </div>
          <div className="font-playfair-bold text-lg text-wellness-dark">
            ${option.price}
            {option.pricePerBottle && (
              <span className="font-source-sans text-sm text-wellness-text ml-2">
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
      pricePerBottle: PropTypes.number,
      savings: PropTypes.string
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  purchaseType: PropTypes.string
};

export default SizeSelector;
