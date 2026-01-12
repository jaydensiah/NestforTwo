import React from 'react';
import PropTypes from 'prop-types';

/**
 * QuantitySelector Component
 * Increment/decrement selector for product quantity
 *
 * @param {Object} props
 * @param {number} props.quantity - Current quantity value
 * @param {Function} props.onChange - Callback function when quantity changes
 * @param {number} props.min - Minimum quantity allowed (default: 1)
 */
const QuantitySelector = ({ quantity, onChange, min = 1 }) => {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="w-10 h-10 border border-[#d1d5db] flex items-center justify-center hover:border-wellness-rose disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="font-nunito-regular text-lg w-12 text-center">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="w-10 h-10 border border-[#d1d5db] flex items-center justify-center hover:border-wellness-rose transition-colors"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number
};

export default QuantitySelector;
