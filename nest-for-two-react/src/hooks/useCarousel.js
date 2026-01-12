import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for carousel functionality with auto-play, navigation, and progress tracking
 *
 * @param {Object} options - Configuration options
 * @param {number} options.itemCount - Total number of items in carousel
 * @param {number} options.autoPlayInterval - Auto-play interval in milliseconds (default: 3000)
 * @param {boolean} options.autoPlay - Enable auto-play (default: false)
 * @param {boolean} options.loop - Enable looping (default: true)
 * @param {Function} options.onChange - Callback when current index changes
 * @returns {Object} Carousel state and controls
 */
const useCarousel = ({
  itemCount = 0,
  autoPlayInterval = 3000,
  autoPlay = false,
  loop = true,
  onChange = null,
} = {}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState('forward'); // 'forward' or 'backward'
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  // Clear all timers on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle auto-play
  useEffect(() => {
    if (isPlaying && itemCount > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= itemCount) {
            return loop ? 0 : prevIndex;
          }
          return nextIndex;
        });
        setDirection('forward');
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isPlaying, itemCount, autoPlayInterval, loop]);

  // Call onChange callback when index changes
  useEffect(() => {
    if (onChange && typeof onChange === 'function') {
      onChange(currentIndex);
    }
  }, [currentIndex, onChange]);

  // Navigate to next item
  const next = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex >= itemCount) {
        return loop ? 0 : prevIndex;
      }
      return nextIndex;
    });
    setDirection('forward');

    // Reset auto-play timer
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        next();
      }, autoPlayInterval);
    }
  }, [itemCount, loop, isPlaying, autoPlayInterval]);

  // Navigate to previous item
  const prev = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      if (nextIndex < 0) {
        return loop ? itemCount - 1 : prevIndex;
      }
      return nextIndex;
    });
    setDirection('backward');

    // Reset auto-play timer
    if (isPlaying && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        next();
      }, autoPlayInterval);
    }
  }, [itemCount, loop, isPlaying, autoPlayInterval, next]);

  // Go to specific index
  const goTo = useCallback((index) => {
    if (index >= 0 && index < itemCount) {
      setDirection(index > currentIndex ? 'forward' : 'backward');
      setCurrentIndex(index);

      // Reset auto-play timer
      if (isPlaying && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          next();
        }, autoPlayInterval);
      }
    }
  }, [itemCount, currentIndex, isPlaying, autoPlayInterval, next]);

  // Play carousel
  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  // Pause carousel
  const pause = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Reset to first item
  const reset = useCallback(() => {
    setCurrentIndex(0);
    setDirection('forward');
  }, []);

  // Calculate progress percentage
  const progress = itemCount > 0 ? ((currentIndex + 1) / itemCount) * 100 : 0;

  // Check if at first/last item
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === itemCount - 1;

  // Check if can go next/prev (respects loop setting)
  const canGoNext = loop || !isLast;
  const canGoPrev = loop || !isFirst;

  return {
    // State
    currentIndex,
    isPlaying,
    direction,
    progress,
    isFirst,
    isLast,
    canGoNext,
    canGoPrev,

    // Navigation methods
    next,
    prev,
    goTo,

    // Playback controls
    play,
    pause,
    togglePlay,
    reset,
  };
};

export default useCarousel;
