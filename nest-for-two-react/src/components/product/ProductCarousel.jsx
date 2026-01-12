import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useCarousel from '../../hooks/useCarousel';
import useTouch from '../../hooks/useTouch';

/**
 * ProductCarousel Component
 * Image carousel with auto-rotation, touch/swipe support, arrow navigation, and indicators
 *
 * @param {Object} props
 * @param {Array} props.images - Array of image URLs or objects with {url, alt}
 * @param {number} props.autoPlayInterval - Auto-play interval in milliseconds (default: 5000)
 * @param {boolean} props.autoPlay - Enable auto-play (default: true)
 * @param {string} props.className - Additional CSS classes
 */
const ProductCarousel = ({
  images = [],
  autoPlayInterval = 5000,
  autoPlay = true,
  className = ''
}) => {
  const [progress, setProgress] = useState(0);

  // Initialize carousel hook
  const carousel = useCarousel({
    itemCount: images.length,
    autoPlayInterval,
    autoPlay,
    loop: true,
  });

  // Initialize touch/swipe hook
  const touch = useTouch({
    threshold: 50,
    onSwipeLeft: () => carousel.next(),
    onSwipeRight: () => carousel.prev(),
  });

  // Update progress bar animation
  useEffect(() => {
    if (!carousel.isPlaying || images.length <= 1) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0;
        return prev + (100 / (autoPlayInterval / 100));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [carousel.currentIndex, carousel.isPlaying, autoPlayInterval, images.length]);

  // Handle thumbnail click
  const handleThumbnailClick = (index) => {
    carousel.goTo(index);
    if (carousel.isPlaying) {
      carousel.pause();
      setTimeout(() => carousel.play(), 100);
    }
  };

  // Get image URL from image object or string
  const getImageUrl = (image) => {
    return typeof image === 'string' ? image : image.url;
  };

  // Get image alt text
  const getImageAlt = (image, index) => {
    if (typeof image === 'string') return `Product image ${index + 1}`;
    return image.alt || `Product image ${index + 1}`;
  };

  // Don't render if no images
  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-wellness-cream flex items-center justify-center">
        <p className="text-wellness-text">No images available</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Main Carousel Container */}
      <div className="relative w-full aspect-square bg-wellness-cream overflow-hidden group">
        {/* Images */}
        <div
          {...touch.handlers}
          className="relative w-full h-full"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === carousel.currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={getImageUrl(image)}
                alt={getImageAlt(image, index)}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Show only if more than 1 image */}
        {images.length > 1 && (
          <>
            <button
              onClick={carousel.prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-wellness-dark rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Previous image"
            >
              <FaChevronLeft className="text-lg" />
            </button>

            <button
              onClick={carousel.next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-wellness-dark rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Next image"
            >
              <FaChevronRight className="text-lg" />
            </button>
          </>
        )}

        {/* Progress Bar - Show only if auto-playing */}
        {carousel.isPlaying && images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
            <div
              className="h-full bg-wellness-rose transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Mobile: Dot Indicators */}
        {images.length > 1 && (
          <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center items-center space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === carousel.currentIndex
                    ? 'bg-wellness-rose w-6'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Thumbnail Grid */}
      {images.length > 1 && (
        <div className="hidden md:grid grid-cols-4 gap-2 mt-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`aspect-square overflow-hidden rounded-md border-2 transition-all duration-200 ${
                index === carousel.currentIndex
                  ? 'border-wellness-rose'
                  : 'border-gray-200 hover:border-wellness-rose/50'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <img
                src={getImageUrl(image)}
                alt={getImageAlt(image, index)}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCarousel;
