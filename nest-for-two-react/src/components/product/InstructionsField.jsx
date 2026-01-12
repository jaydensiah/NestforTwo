import React from 'react';
import PropTypes from 'prop-types';
import { checkWordCount } from '../../utils/validators';

/**
 * InstructionsField Component
 * Text area for delivery instructions with word count validation
 *
 * @param {Object} props
 * @param {string} props.value - Current instructions value
 * @param {Function} props.onChange - Callback function when instructions change
 * @param {number} props.maxWords - Maximum word count allowed (default: 100)
 */
const InstructionsField = ({ value, onChange, maxWords = 100 }) => {
  const wordCountResult = checkWordCount(value, maxWords);

  return (
    <div className="space-y-2">
      <label className="block font-nunito-regular text-wellness-dark">
        Delivery Instructions (Optional)
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Leave at door, Call upon arrival"
        rows={4}
        className="w-full border border-[#d1d5db] rounded px-4 py-2 font-source-sans resize-none focus:outline-none focus:ring-2 focus:ring-wellness-rose"
      />

      <div className={`text-sm font-source-sans ${wordCountResult.isValid ? 'text-wellness-text' : 'text-red-500'}`}>
        {wordCountResult.count} / {maxWords} words
      </div>
    </div>
  );
};

InstructionsField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  maxWords: PropTypes.number
};

export default InstructionsField;
