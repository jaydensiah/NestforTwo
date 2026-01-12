import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * CollapsibleSection Component
 * Accordion/collapsible section for product details
 *
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {React.ReactNode} props.children - Section content
 * @param {boolean} props.defaultOpen - Whether section is open by default (default: false)
 */
const CollapsibleSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-t border-[#d1d5db]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 font-nunito-regular text-left"
      >
        <span className="text-lg">{title}</span>
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="pb-4 font-source-sans text-wellness-text">
          {children}
        </div>
      )}
    </div>
  );
};

CollapsibleSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool
};

export default CollapsibleSection;
