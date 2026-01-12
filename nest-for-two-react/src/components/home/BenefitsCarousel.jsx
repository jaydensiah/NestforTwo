import { useState, useRef } from 'react';
import { FaLongArrowAltLeft, FaLongArrowAltRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const benefits = [
  {
    id: 1,
    name: 'Muscle Recovery',
    icon: '/images/MuscleRecovery.svg',
  },
  {
    id: 2,
    name: 'Hormonal Harmony',
    icon: '/images/HormonalHarmony.svg',
  },
  {
    id: 3,
    name: 'Skin Renewal',
    icon: '/images/SkinRenewal.svg',
  },
  {
    id: 4,
    name: 'Stronger Immunity',
    icon: '/images/StrongerImmunity.svg',
  },
  {
    id: 5,
    name: 'Lasting Energy',
    icon: '/images/LastingEnergy.svg',
  },
  {
    id: 6,
    name: 'Better Digestion',
    icon: '/images/BetterDigestion.svg',
  },
];

const BenefitsCarousel = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Get visible benefits for a given page and visible count
  const getVisibleBenefits = (visibleCount, page) => {
    const startIndex = (page * visibleCount) % benefits.length;
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const index = (startIndex + i) % benefits.length;
      visible.push(benefits[index]);
    }
    return visible;
  };

  // Navigation handlers that jump by visible count with animation
  const handleNext = (visibleCount) => {
    setIsTransitioning(true);
    setTimeout(() => {
      const totalPages = Math.ceil(benefits.length / visibleCount);
      setCurrentPage((prev) => (prev + 1) % totalPages);
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrev = (visibleCount) => {
    setIsTransitioning(true);
    setTimeout(() => {
      const totalPages = Math.ceil(benefits.length / visibleCount);
      setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
      setIsTransitioning(false);
    }, 300);
  };

  // Touch event handlers for swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (visibleCount) => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swiped left, go to next
        handleNext(visibleCount);
      } else {
        // Swiped right, go to previous
        handlePrev(visibleCount);
      }
    }
  };

  return (
    <div className="w-full">
      {/* Desktop: All 6 visible in grid */}
      <div className="hidden lg:grid lg:grid-cols-6 gap-8">
        {benefits.map((benefit) => (
          <div
            key={benefit.id}
            className="flex flex-col items-center text-center"
          >
            <div className="w-20 h-20 mb-3 flex items-center justify-center">
              <img
                src={benefit.icon}
                alt={benefit.name}
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-sm font-nunito-regular text-wellness-dark">
              {benefit.name}
            </h3>
          </div>
        ))}
      </div>

      {/* Tablet: 3 visible with carousel */}
      <div className="hidden md:block lg:hidden">
        {/* Swipe instruction label */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaLongArrowAltLeft className="w-4 h-4 text-wellness-text" />
          <span className="font-nunito-regular text-wellness-text" style={{ fontSize: '12px' }}>
            Swipe for more
          </span>
          <FaLongArrowAltRight className="w-4 h-4 text-wellness-text" />
        </div>

        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => handleTouchEnd(3)}
        >
          <div className={`grid grid-cols-3 gap-6 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
            {getVisibleBenefits(3, currentPage).map((benefit, idx) => (
              <div
                key={`${benefit.id}-${idx}`}
                className="flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 mb-3 flex items-center justify-center">
                  <img
                    src={benefit.icon}
                    alt={benefit.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-sm font-nunito-regular text-wellness-dark">
                  {benefit.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Navigation arrows for tablet */}
          <button
            onClick={() => handlePrev(3)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-80 z-10"
            style={{ backgroundColor: '#F3F4F6' }}
            aria-label="Previous benefits"
          >
            <FaChevronLeft className="w-3 h-3 text-wellness-dark" />
          </button>
          <button
            onClick={() => handleNext(3)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-80 z-10"
            style={{ backgroundColor: '#F3F4F6' }}
            aria-label="Next benefits"
          >
            <FaChevronRight className="w-3 h-3 text-wellness-dark" />
          </button>
        </div>
      </div>

      {/* Mobile: 2 visible with carousel */}
      <div className="block md:hidden">
        {/* Swipe instruction label */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <FaLongArrowAltLeft className="w-4 h-4 text-wellness-text" />
          <span className="font-nunito-regular text-wellness-text" style={{ fontSize: '12px' }}>
            Swipe for more
          </span>
          <FaLongArrowAltRight className="w-4 h-4 text-wellness-text" />
        </div>

        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => handleTouchEnd(2)}
        >
          <div className={`grid grid-cols-2 gap-4 transition-all duration-300 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
            {getVisibleBenefits(2, currentPage).map((benefit, idx) => (
              <div
                key={`${benefit.id}-${idx}`}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 mb-3 flex items-center justify-center">
                  <img
                    src={benefit.icon}
                    alt={benefit.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xs font-nunito-regular text-wellness-dark">
                  {benefit.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Navigation arrows for mobile */}
          <button
            onClick={() => handlePrev(2)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-80 z-10"
            style={{ backgroundColor: '#F3F4F6' }}
            aria-label="Previous benefits"
          >
            <FaChevronLeft className="w-3 h-3 text-wellness-dark" />
          </button>
          <button
            onClick={() => handleNext(2)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200 hover:opacity-80 z-10"
            style={{ backgroundColor: '#F3F4F6' }}
            aria-label="Next benefits"
          >
            <FaChevronRight className="w-3 h-3 text-wellness-dark" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BenefitsCarousel;
