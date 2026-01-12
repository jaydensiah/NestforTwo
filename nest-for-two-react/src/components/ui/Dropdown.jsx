import { useState, useRef, useEffect } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const Dropdown = ({
  trigger,
  items,
  position = 'bottom-left',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const positionClasses = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      {/* Trigger */}
      <button
        className="inline-flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-wellness-rose focus:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
        <IoChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`absolute z-50 ${positionClasses[position]} min-w-full w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden`}
        >
          <div className="py-1">
            {items.map((item, index) => (
              <button
                key={index}
                className={`w-full text-left px-4 py-2 text-sm text-wellness-dark hover:bg-custom-dropdownHover transition-colors flex items-center gap-2 ${
                  item.disabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => !item.disabled && handleItemClick(item)}
                disabled={item.disabled}
              >
                {item.icon && <span className="text-lg">{item.icon}</span>}
                <span className="font-nunito-regular">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
