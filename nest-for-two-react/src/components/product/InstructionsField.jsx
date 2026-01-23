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
      <label className="block font-source-sans uppercase" style={{ fontSize: '14px', color: '#81775A' }}>
        DELIVERY INSTRUCTIONS <span className="normal-case font-normal">(Optional)</span>
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g., Leave at door, Call upon arrival"
        rows={4}
        className="w-full border border-[#d1d5db] px-4 py-2 font-source-sans resize-none focus:outline-none focus:ring-2 focus:ring-wellness-rose"
      />

      <div className="font-source-sans" style={{ fontSize: '12px', color: wordCountResult.isValid ? '#636260' : '#ef4444' }}>
        {wordCountResult.count}/{maxWords}
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
