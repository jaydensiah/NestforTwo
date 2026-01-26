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
const CollapsibleSection = ({ title, children, defaultOpen = false, hideTopBorder = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={hideTopBorder ? '' : 'border-t border-[#d1d5db]'}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 font-source-sans text-left uppercase"
        style={{ fontSize: '14px' }}
      >
        <span>{title}</span>
        <span>
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="pb-4 font-source-sans" style={{ fontSize: '15px', color: '#636260' }}>
          {children}
        </div>
      )}
    </div>
  );
};

CollapsibleSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
  hideTopBorder: PropTypes.bool
};

export default CollapsibleSection;
