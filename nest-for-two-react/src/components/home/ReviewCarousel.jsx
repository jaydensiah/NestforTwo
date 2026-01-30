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
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [reviewFocused, setReviewFocused] = useState({
    name: false,
    email: false,
    message: false
  });
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewTouched, setReviewTouched] = useState({
    name: false,
    email: false,
    message: false,
    rating: false
  });
  const [reviewSubmitAttempted, setReviewSubmitAttempted] = useState(false);
  const [isReviewSubmitting, setIsReviewSubmitting] = useState(false);
  const [reviewSubmitStatus, setReviewSubmitStatus] = useState(null); // 'success' or 'error'

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReviewFocus = (field) => {
    setReviewFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleReviewBlur = (field) => {
    setReviewFocused(prev => ({ ...prev, [field]: false }));
    setReviewTouched(prev => ({ ...prev, [field]: true }));
  };

  const isReviewFieldActive = (field) => reviewFocused[field] || reviewFormData[field];

  const countReviewWords = (text) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  const reviewWordCount = countReviewWords(reviewFormData.message);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getReviewFieldError = (field) => {
    if (!reviewTouched[field] && !reviewSubmitAttempted) return '';

    switch (field) {
      case 'name':
        return !reviewFormData.name.trim() ? 'Name is required' : '';
      case 'email':
        if (!reviewFormData.email.trim()) return 'E-mail is required';
        if (!validateEmail(reviewFormData.email)) return 'Please enter a valid e-mail';
        return '';
      case 'message':
        return !reviewFormData.message.trim() ? 'Message is required' : '';
      case 'rating':
        return selectedRating === 0 ? 'Please select a rating' : '';
      default:
        return '';
    }
  };

  const isReviewFormValid = () => {
    return (
      reviewFormData.name.trim() &&
      reviewFormData.email.trim() &&
      validateEmail(reviewFormData.email) &&
      reviewFormData.message.trim() &&
      selectedRating > 0
    );
  };

  const handleReviewSubmit = async () => {
    setReviewSubmitAttempted(true);
    setReviewTouched({ name: true, email: true, message: true, rating: true });

    if (!isReviewFormValid()) {
      return;
    }

    setIsReviewSubmitting(true);
    setReviewSubmitStatus(null);

    try {
      const response = await fetch('https://formspree.io/f/mzzagkek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reviewFormData,
          rating: selectedRating,
        }),
      });

      if (response.ok) {
        setReviewSubmitStatus('success');
        // Reset form after short delay to show success message
        setTimeout(() => {
          setIsReviewModalOpen(false);
          setReviewFormData({ name: '', email: '', message: '' });
          setSelectedRating(0);
          setReviewTouched({ name: false, email: false, message: false, rating: false });
          setReviewSubmitAttempted(false);
          setReviewSubmitStatus(null);
        }, 2000);
      } else {
        setReviewSubmitStatus('error');
      }
    } catch (error) {
      setReviewSubmitStatus('error');
    } finally {
      setIsReviewSubmitting(false);
    }
  };

  // Default reviews data
  const defaultReviews = [
    {
      id: 1,
      name: 'En Qi Lim',
      rating: 5,
      text: 'I like the rock sugar flavour because it gives a simple, familiar taste without being too strong. Perfect for my parents who prefer something classic.',
      date: '2025-11-30',
      verified: true
    },
    {
      id: 2,
      name: 'Evina Goh',
      rating: 5,
      text: 'The zero sugar flavour is thoughtful. I can still get a light sweetness without worrying about sugar, which works well for me during pregnancy.',
      date: '2025-12-15',
      verified: true
    },
    {
      id: 3,
      name: 'David Chen',
      rating: 5,
      text: 'The premium dried series lets me prepare bird’s nest at home in the traditional style, which I really enjoy.',
      date: '2026-01-02',
      verified: true
    },
    {
      id: 4,
      name: 'Kelvin Tan',
      rating: 5,
      text: 'The packaging looks really premium and makes a nice gift.',
      date: '2025-12-13',
      verified: true
    },
    {
      id: 5,
      name: 'Raymond Ng',
      rating: 5,
      text: 'The honey sachet makes it easy to adjust the sweetness just right. My kids really enjoy it, and I appreciate that it’s freshly prepared each time.',
      date: '2026-01-14',
      verified: true
    },
    {
      id: 6,
      name: 'Amanda Lee',
      rating: 5,
      text: 'Very satisfied with the product quality and customer service. The bird\'s nest is fresh and the portions are generous.',
      date: '2026-01-30',
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
        className="relative w-full max-w-5xl mx-auto px-4 min-h-[240px] md:min-h-[340px]"
        {...handlers}
      >
        {/* Cards */}
        <div className="relative w-full h-full min-h-[240px] md:min-h-[340px]">
          {reviews.map((review, index) => {
            const position = getCardPosition(index);

            return (
              <div
                key={review.id}
                className={getCardStyles(position)}
                style={{ width: 'calc(100% - 2rem)', maxWidth: '400px' }}
              >
                <div className="bg-white rounded-xl shadow-xl p-5 md:p-8 h-[220px] md:h-[280px] flex flex-col">
                  {/* Rating */}
                  {renderStars(review.rating)}

                  {/* Review Text */}
                  <div className="flex-1 flex items-center">
                    <p className="font-source-sans text-wellness-text text-sm md:text-base text-center line-clamp-6">
                      "{review.text}"
                    </p>
                  </div>

                  {/* Reviewer Info */}
                  <div className="text-center border-t border-gray-200 pt-4 mt-4">
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
        {/* Swipe instruction label */}
        <div className="flex items-center justify-center gap-2 mt-6 mb-8">
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
          {/* Name Field */}
          <div>
            <div className="relative">
              <input
                type="text"
                name="name"
                id="review-name"
                value={reviewFormData.name}
                onChange={handleReviewChange}
                onFocus={() => handleReviewFocus('name')}
                onBlur={() => handleReviewBlur('name')}
                className="w-full px-4 py-4 font-source-sans rounded-xl border-2 outline-none transition-colors bg-white"
                style={{
                  color: '#636260',
                  borderColor: getReviewFieldError('name') ? '#ef4444' : isReviewFieldActive('name') ? '#81775A' : '#e5e5e5'
                }}
              />
              <label
                htmlFor="review-name"
                className="absolute left-4 transition-all duration-200 pointer-events-none font-source-sans bg-white px-1"
                style={{
                  color: getReviewFieldError('name') ? '#ef4444' : isReviewFieldActive('name') ? '#81775A' : '#9ca3af',
                  top: isReviewFieldActive('name') ? '-0.5rem' : '1rem',
                  fontSize: isReviewFieldActive('name') ? '0.75rem' : '1rem'
                }}
              >
                Name
              </label>
            </div>
            {getReviewFieldError('name') && (
              <p className="font-source-sans text-xs mt-1" style={{ color: '#ef4444' }}>
                {getReviewFieldError('name')}
              </p>
            )}
          </div>

          {/* Rating Field */}
          <div>
            <div className="relative">
              <div
                className="w-full px-4 py-4 rounded-xl border-2 bg-white"
                style={{ borderColor: getReviewFieldError('rating') ? '#ef4444' : '#e5e5e5' }}
              >
                <div className="flex gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => {
                        setSelectedRating(star);
                        setReviewTouched(prev => ({ ...prev, rating: true }));
                      }}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="transition-colors"
                    >
                      <FaStar
                        className="w-7 h-7"
                        style={{
                          color: star <= (hoveredRating || selectedRating) ? '#facc15' : '#d1d5db'
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <label
                className="absolute left-4 transition-all duration-200 pointer-events-none font-source-sans bg-white px-1"
                style={{
                  color: getReviewFieldError('rating') ? '#ef4444' : '#81775A',
                  top: '-0.5rem',
                  fontSize: '0.75rem'
                }}
              >
                Number of Stars
              </label>
            </div>
            {getReviewFieldError('rating') && (
              <p className="font-source-sans text-xs mt-1" style={{ color: '#ef4444' }}>
                {getReviewFieldError('rating')}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="review-email"
                value={reviewFormData.email}
                onChange={handleReviewChange}
                onFocus={() => handleReviewFocus('email')}
                onBlur={() => handleReviewBlur('email')}
                className="w-full px-4 py-4 font-source-sans rounded-xl border-2 outline-none transition-colors bg-white"
                style={{
                  color: '#636260',
                  borderColor: getReviewFieldError('email') ? '#ef4444' : isReviewFieldActive('email') ? '#81775A' : '#e5e5e5'
                }}
              />
              <label
                htmlFor="review-email"
                className="absolute left-4 transition-all duration-200 pointer-events-none font-source-sans bg-white px-1"
                style={{
                  color: getReviewFieldError('email') ? '#ef4444' : isReviewFieldActive('email') ? '#81775A' : '#9ca3af',
                  top: isReviewFieldActive('email') ? '-0.5rem' : '1rem',
                  fontSize: isReviewFieldActive('email') ? '0.75rem' : '1rem'
                }}
              >
                E-mail
              </label>
            </div>
            {getReviewFieldError('email') && (
              <p className="font-source-sans text-xs mt-1" style={{ color: '#ef4444' }}>
                {getReviewFieldError('email')}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <div className="relative">
              <textarea
                name="message"
                id="review-message"
                rows={6}
                value={reviewFormData.message}
                onChange={handleReviewChange}
                onFocus={() => handleReviewFocus('message')}
                onBlur={() => handleReviewBlur('message')}
                className="w-full px-4 py-4 font-source-sans rounded-xl border-2 outline-none transition-colors resize-none bg-white"
                style={{
                  color: '#636260',
                  borderColor: getReviewFieldError('message') ? '#ef4444' : isReviewFieldActive('message') ? '#81775A' : '#e5e5e5'
                }}
              />
              <label
                htmlFor="review-message"
                className="absolute left-4 transition-all duration-200 pointer-events-none font-source-sans bg-white px-1"
                style={{
                  color: getReviewFieldError('message') ? '#ef4444' : isReviewFieldActive('message') ? '#81775A' : '#9ca3af',
                  top: isReviewFieldActive('message') ? '-0.5rem' : '1rem',
                  fontSize: isReviewFieldActive('message') ? '0.75rem' : '1rem'
                }}
              >
                Message
              </label>
            </div>
            <div className="flex justify-between mt-1">
              {getReviewFieldError('message') ? (
                <p className="font-source-sans text-xs" style={{ color: '#ef4444' }}>
                  {getReviewFieldError('message')}
                </p>
              ) : (
                <span></span>
              )}
              <p
                className="font-source-sans text-xs"
                style={{ color: '#636260' }}
              >
                {reviewWordCount}/40 words
              </p>
            </div>
          </div>

          {/* Submit Status Messages */}
          {reviewSubmitStatus === 'success' && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <p className="font-source-sans text-green-700 text-center">
                Thank you! Your review has been submitted successfully.
              </p>
            </div>
          )}
          {reviewSubmitStatus === 'error' && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="font-source-sans text-red-700 text-center">
                Something went wrong. Please try again later.
              </p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => {
                setIsReviewModalOpen(false);
                // Reset validation state when canceling
                setReviewTouched({ name: false, email: false, message: false, rating: false });
                setReviewSubmitAttempted(false);
                setReviewSubmitStatus(null);
              }}
              disabled={isReviewSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-source-sans disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ color: '#636260' }}
            >
              Cancel
            </button>
            <button
              onClick={handleReviewSubmit}
              disabled={isReviewSubmitting || reviewSubmitStatus === 'success'}
              className="flex-1 px-6 py-3 bg-wellness-rose text-white rounded-lg hover:bg-wellness-rose/90 transition-colors duration-200 font-source-sans disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isReviewSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ReviewCarousel;
