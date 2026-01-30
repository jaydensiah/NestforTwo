import { useState } from 'react';

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-200">
      {/* Header */}
      <button
        className="w-full flex items-center justify-between py-6 text-left"
        onClick={onClick}
      >
        <span
          className="font-source-sans pr-4 text-sm md:text-base"
          style={{ color: '#636260' }}
        >
          {item.question || item.title}
        </span>
        <span
          className="font-source-sans flex-shrink-0 ml-4 w-5 h-5 flex items-center justify-center"
          style={{ color: '#B76E79', fontSize: '20px' }}
        >
          {isOpen ? '−' : '+'}
        </span>
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="pb-6 font-source-sans text-sm md:text-base"
          style={{ color: '#81775A' }}
        >
          {item.answer || item.content}
        </div>
      </div>
    </div>
  );
};

const Accordion = ({ items, defaultOpenIndex = null }) => {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
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
