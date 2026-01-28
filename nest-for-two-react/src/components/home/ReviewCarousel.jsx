import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar, FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import useCarousel from '../../hooks/useCarousel';
import useTouch from '../../hooks/useTouch';
import Modal from '../ui/Modal';

/**
 * ReviewCarousel Component
 * Displays customer reviews in a 3D carousel effect with touch/swipe support
 *
 * @param {Object} props
 * @param {Array} props.reviews - Array of review objects (optional, uses default if not provided)
 * @param {boolean} props.autoPlay - Enable auto-play (default: false)
 * @param {number} props.autoPlayInterval - Auto-play interval in ms (default: 5000)
 */
const ReviewCarousel = ({ reviews: customReviews, autoPlay = false, autoPlayInterval = 5000 }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Default reviews data
  const defaultReviews = [
    {
      id: 1,
      name: 'Sarah Tan',
      rating: 5,
      text: 'The best bird\'s nest I\'ve ever had! The texture is incredibly smooth and thick. My skin has been glowing since I started my subscription.',
      date: '2024-01-15',
      verified: true
    },
    {
      id: 2,
      name: 'Michelle Wong',
      rating: 5,
      text: 'Highly recommend the zero sugar variant for pregnant moms. It\'s been a lifesaver during my pregnancy. The quality is exceptional!',
      date: '2024-01-10',
      verified: true
    },
    {
      id: 3,
      name: 'David Chen',
      rating: 4,
      text: 'Great quality bird\'s nest. I got the honey variant for my daughter and she loves it. The delivery was prompt and packaging was excellent.',
      date: '2024-01-05',
      verified: true
    },
    {
      id: 4,
      name: 'Jennifer Lim',
      rating: 5,
      text: 'Will definitely buy again! The rock sugar variant is perfect for my elderly parents. They\'ve noticed improvements in their energy levels.',
      date: '2023-12-20',
      verified: true
    },
    {
      id: 5,
      name: 'Raymond Ng',
      rating: 5,
      text: 'Excellent service and premium quality. The subscription plan offers great value. I\'ve been a loyal customer for 6 months now.',
      date: '2023-12-15',
      verified: true
    },
    {
      id: 6,
      name: 'Amanda Lee',
      rating: 4,
      text: 'Very satisfied with the product quality and customer service. The bird\'s nest is fresh and the portions are generous.',
      date: '2023-12-10',
      verified: true
    }
  ];

  const reviews = customReviews || defaultReviews;

  const { currentIndex, next, prev, canGoNext, canGoPrev } = useCarousel({
    itemCount: reviews.length,
    autoPlay,
    autoPlayInterval,
    loop: true,
  });

  // Touch/swipe handlers
  const { handlers } = useTouch({
    onSwipeLeft: () => {
      if (canGoNext) next();
    },
    onSwipeRight: () => {
      if (canGoPrev) prev();
    },
    threshold: 50,
  });

  // Get position class for each card based on its position relative to current
  const getCardPosition = (index) => {
    const diff = index - currentIndex;
    const total = reviews.length;

    // Normalize difference to handle looping
    let normalizedDiff = diff;
    if (Math.abs(diff) > total / 2) {
      normalizedDiff = diff > 0 ? diff - total : diff + total;
    }

    if (normalizedDiff === 0) return 'center';
    if (normalizedDiff === -1) return 'left';
    if (normalizedDiff === 1) return 'right';
    return 'hidden';
  };

  // Get card styles based on position
  const getCardStyles = (position) => {
    const baseStyles = 'absolute top-0 transition-all duration-500 ease-out';

    switch (position) {
      case 'center':
        return `${baseStyles} left-1/2 -translate-x-1/2 scale-110 opacity-100 z-30`;
      case 'left':
        return `${baseStyles} left-[5%] md:left-[10%] scale-80 opacity-60 z-20`;
      case 'right':
        return `${baseStyles} right-[5%] md:right-[10%] scale-80 opacity-60 z-20`;
      case 'hidden':
      default:
        return `${baseStyles} left-1/2 -translate-x-1/2 scale-60 opacity-0 z-10`;
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1 justify-center mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="w-full">
      {/* Carousel Container */}
      <div
        className="relative w-full max-w-5xl mx-auto px-4 min-h-[280px] md:min-h-[400px]"
        {...handlers}
      >
        {/* Cards */}
        <div className="relative w-full h-full min-h-[280px] md:min-h-[400px]">
          {reviews.map((review, index) => {
            const position = getCardPosition(index);

            return (
              <div
                key={review.id}
                className={getCardStyles(position)}
                style={{ width: 'calc(100% - 2rem)', maxWidth: '400px' }}
              >
                <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 h-full">
                  {/* Rating */}
                  {renderStars(review.rating)}

                  {/* Review Text */}
                  <p className="font-source-sans text-wellness-text text-sm md:text-base text-center mb-6 line-clamp-6">
                    "{review.text}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="text-center border-t border-gray-200 pt-4">
                    <p className="font-nunito-regular font-semibold text-wellness-dark mb-1">
                      {review.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(review.date)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows - Desktop/Tablet only (hidden on mobile) */}
        <button
          onClick={prev}
          disabled={!canGoPrev}
          className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white text-wellness-rose p-4 rounded-full shadow-lg hover:bg-wellness-blush disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-40"
          aria-label="Previous review"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={next}
          disabled={!canGoNext}
          className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white text-wellness-rose p-4 rounded-full shadow-lg hover:bg-wellness-blush disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 z-40"
          aria-label="Next review"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile: Swipe instruction and bottom navigation */}
      <div className="md:hidden">
        {/* Swipe instruction label - close to card */}
        <div className="flex items-center justify-center gap-2 mt-2 mb-6">
          <FaLongArrowAltLeft className="w-4 h-4 text-wellness-text" />
          <span className="font-nunito-regular text-wellness-text" style={{ fontSize: '12px' }}>
            Swipe for more
          </span>
          <FaLongArrowAltRight className="w-4 h-4 text-wellness-text" />
        </div>

        {/* Bottom navigation arrows - more space from swipe text */}
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-white rounded-full shadow-lg overflow-hidden">
            <button
              onClick={prev}
              disabled={!canGoPrev}
              className="px-6 py-3 text-wellness-dark hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Previous review"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-200" />
            <button
              onClick={next}
              disabled={!canGoNext}
              className="px-6 py-3 text-wellness-dark hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              aria-label="Next review"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6 md:mt-8 mb-0 md:mb-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              // Navigate to specific review
              const diff = index - currentIndex;
              if (diff > 0) {
                for (let i = 0; i < diff; i++) next();
              } else if (diff < 0) {
                for (let i = 0; i < Math.abs(diff); i++) prev();
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-wellness-rose w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>

      {/* Leave a Review Button */}
      <div className="text-center mt-6 md:mt-8">
        <button
          onClick={() => setIsReviewModalOpen(true)}
          className="bg-wellness-rose text-white px-8 py-3 rounded-full font-nunito-regular text-sm uppercase tracking-wider hover:bg-wellness-rose/90 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          Leave a Review
        </button>
      </div>

      {/* Review Modal */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title="Leave a Review"
      >
        <div className="space-y-6">
          <p className="text-wellness-text font-source-sans">
            We'd love to hear about your experience with Nest for Two! Your feedback helps us serve you better.
          </p>

          <div>
            <label className="block text-sm font-nunito-regular text-wellness-dark mb-2">
              Your Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wellness-rose focus:border-transparent"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-nunito-regular text-wellness-dark mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <FaStar className="w-8 h-8" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-nunito-regular text-wellness-dark mb-2">
              Your Review
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-wellness-rose focus:border-transparent resize-none"
              rows="6"
              placeholder="Tell us about your experience..."
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-wellness-dark rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle review submission
                setIsReviewModalOpen(false);
                // Show success message
              }}
              className="flex-1 px-6 py-3 bg-wellness-rose text-white rounded-lg hover:bg-wellness-rose/90 transition-colors duration-200"
            >
              Submit Review
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewCarousel;
