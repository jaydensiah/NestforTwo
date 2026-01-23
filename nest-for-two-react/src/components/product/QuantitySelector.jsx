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
    <div className="inline-flex items-center border border-[#d1d5db]">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        style={{ color: '#636260' }}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="font-source-sans text-lg w-12 text-center border-l border-r border-[#d1d5db]" style={{ color: '#636260', lineHeight: '40px' }}>
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(quantity + 1)}
        className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
        style={{ color: '#636260' }}
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
