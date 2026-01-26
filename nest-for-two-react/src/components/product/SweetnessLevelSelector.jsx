import React from 'react';
import PropTypes from 'prop-types';

/**
 * SweetnessLevelSelector Component
 * Pill-style selector for sweetness levels
 *
 * @param {Object} props
 * @param {string} props.selected - Currently selected sweetness level
 * @param {Function} props.onChange - Callback function when sweetness changes
 * @param {string} props.sideLabel - Custom label for the "side" option (default: "Sugar on the Side")
 */
const SweetnessLevelSelector = ({ selected, onChange, sideLabel = 'Sugar on the Side' }) => {
  const options = [
    { value: '25', label: '25%' },
    { value: '50', label: '50%' },
    { value: '100', label: '100%' },
    { value: 'side', label: sideLabel }
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {options.map(option => {
        const isSelected = selected === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`
              px-4 sm:px-5 py-2 sm:py-2.5
              rounded-full
              font-source-sans
              text-[13px] sm:text-[14px]
              transition-all duration-200
              border-2
              ${isSelected
                ? 'bg-wellness-rose text-white border-wellness-rose shadow-md'
                : 'bg-white text-[#636260] border-[#d1d5db] hover:border-wellness-rose hover:text-wellness-rose'
              }
            `}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

SweetnessLevelSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  sideLabel: PropTypes.string
};

export default SweetnessLevelSelector;
