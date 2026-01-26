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
      <label className="block font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
        INSTRUCTIONS
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Any special delivery instructions or comments for your order..."
        rows={4}
        className="w-full border border-[#d1d5db] px-4 py-2 font-source-sans resize-none focus:outline-none focus:ring-2 focus:ring-wellness-rose"
      />

      <div className="font-source-sans" style={{ fontSize: '12px', color: wordCountResult.isValid ? '#636260' : '#ef4444' }}>
        {wordCountResult.count}/{maxWords} words
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
