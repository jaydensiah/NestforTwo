import { useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-wellness-blush transition-colors"
        onClick={onClick}
      >
        <span className="font-nunito-regular text-wellness-dark text-base">
          {item.title}
        </span>
        <IoChevronDown
          className={`w-5 h-5 text-wellness-rose transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 text-wellness-text font-nunito-light">
          {item.content}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};

export default Accordion;
