import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * CategorySwitch Component
 * Toggle between product categories with arrow navigation
 *
 * @param {Object} props
 * @param {Function} props.onCategoryChange - Callback function when category changes
 * @param {string} props.defaultCategory - Default category to display (default: 'freshly-cooked')
 */
const CategorySwitch = ({ onCategoryChange, defaultCategory = 'freshly-cooked' }) => {
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const categories = [
    {
      id: 'freshly-cooked',
      label: 'Freshly Cooked Bird\'s Nest',
      description: 'Our premium freshly cooked bird\'s nest sachets, available in honey, rock sugar, and zero sugar variants.'
    },
    {
      id: 'dried',
      label: 'Dried Bird\'s Nest',
      description: 'Pure dried bird\'s nest selection for those who prefer to prepare their own.'
    }
  ];

  const currentIndex = categories.findIndex(cat => cat.id === activeCategory);
  const currentCategory = categories[currentIndex];

  const handleSwitch = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange && typeof onCategoryChange === 'function') {
      onCategoryChange(categoryId);
    }
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    handleSwitch(categories[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    handleSwitch(categories[nextIndex].id);
  };

  return (
    <div className="mb-12">
      {/* Category Toggle Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleSwitch(category.id)}
            className={`px-6 py-3 font-nunito-regular text-sm sm:text-base uppercase tracking-wider rounded-full transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-wellness-rose text-white shadow-md hover:bg-wellness-rose/90'
                : 'bg-white text-wellness-dark border border-gray-300 hover:border-wellness-rose'
            }`}
            aria-pressed={activeCategory === category.id}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Arrow Navigation (Mobile-friendly) */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={handlePrevious}
          className="p-2 bg-white text-wellness-rose rounded-full shadow-md hover:bg-wellness-blush transition-colors duration-200"
          aria-label="Previous category"
        >
          <FaChevronLeft className="w-5 h-5" />
        </button>

        <div className="text-center flex-1 max-w-2xl">
          <h3 className="font-playfair-bold text-xl sm:text-2xl text-wellness-dark mb-2">
            {currentCategory.label}
          </h3>
          <p className="font-source-sans text-sm sm:text-base text-wellness-text">
            {currentCategory.description}
          </p>
        </div>

        <button
          onClick={handleNext}
          className="p-2 bg-white text-wellness-rose rounded-full shadow-md hover:bg-wellness-blush transition-colors duration-200"
          aria-label="Next category"
        >
          <FaChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default CategorySwitch;
