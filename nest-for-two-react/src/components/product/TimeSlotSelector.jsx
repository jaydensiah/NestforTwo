import React from 'react';
import PropTypes from 'prop-types';

/**
 * TimeSlotSelector Component
 * Radio button selector for delivery time slots
 *
 * @param {Object} props
 * @param {string} props.selected - Currently selected time slot
 * @param {Function} props.onChange - Callback function when time slot changes
 */
const TimeSlotSelector = ({ selected, onChange }) => {
  const timeSlots = ['1-5PM', '6-10PM'];

  return (
    <div className="space-y-2">
      <label className="block font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
        DELIVERY TIME SLOT
      </label>

      <div className="flex gap-4">
        {timeSlots.map(slot => (
          <label
            key={slot}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name="timeSlot"
              value={slot}
              checked={selected === slot}
              onChange={() => onChange(slot)}
              className="w-4 h-4 text-wellness-rose"
            />
            <span className="font-source-sans text-[12px] sm:text-[14px]" style={{ color: '#636260' }}>{slot}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

TimeSlotSelector.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default TimeSlotSelector;
