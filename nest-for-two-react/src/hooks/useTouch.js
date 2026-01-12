import { useRef, useEffect, useCallback } from 'react';

/**
 * Custom hook for detecting touch and swipe gestures
 *
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Minimum distance for swipe detection in pixels (default: 50)
 * @param {Function} options.onSwipeLeft - Callback for swipe left gesture
 * @param {Function} options.onSwipeRight - Callback for swipe right gesture
 * @param {Function} options.onSwipeUp - Callback for swipe up gesture
 * @param {Function} options.onSwipeDown - Callback for swipe down gesture
 * @param {Function} options.onTouchStart - Callback for touch start
 * @param {Function} options.onTouchMove - Callback for touch move
 * @param {Function} options.onTouchEnd - Callback for touch end
 * @param {number} options.velocityThreshold - Minimum velocity for swipe in px/ms (default: 0.3)
 * @returns {Object} Touch event handlers and touch state
 */
const useTouch = ({
  threshold = 50,
  onSwipeLeft = null,
  onSwipeRight = null,
  onSwipeUp = null,
  onSwipeDown = null,
  onTouchStart = null,
  onTouchMove = null,
  onTouchEnd = null,
  velocityThreshold = 0.3,
} = {}) => {
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const touchEndRef = useRef({ x: 0, y: 0, time: 0 });
  const isTouchingRef = useRef(false);
  const elementRef = useRef(null);

  // Handle touch start
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
    isTouchingRef.current = true;

    if (onTouchStart && typeof onTouchStart === 'function') {
      onTouchStart(e, {
        x: touch.clientX,
        y: touch.clientY,
      });
    }
  }, [onTouchStart]);

  // Handle touch move
  const handleTouchMove = useCallback((e) => {
    if (!isTouchingRef.current) return;

    const touch = e.touches[0];

    if (onTouchMove && typeof onTouchMove === 'function') {
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      onTouchMove(e, {
        x: touch.clientX,
        y: touch.clientY,
        deltaX,
        deltaY,
      });
    }
  }, [onTouchMove]);

  // Handle touch end
  const handleTouchEnd = useCallback((e) => {
    if (!isTouchingRef.current) return;

    const touch = e.changedTouches[0];
    touchEndRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };

    const deltaX = touchEndRef.current.x - touchStartRef.current.x;
    const deltaY = touchEndRef.current.y - touchStartRef.current.y;
    const deltaTime = touchEndRef.current.time - touchStartRef.current.time;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // Calculate velocity (px/ms)
    const velocityX = absX / deltaTime;
    const velocityY = absY / deltaTime;

    // Determine swipe direction
    if (absX > absY) {
      // Horizontal swipe
      if (absX > threshold || velocityX > velocityThreshold) {
        if (deltaX > 0) {
          // Swipe right
          if (onSwipeRight && typeof onSwipeRight === 'function') {
            onSwipeRight(e, {
              distance: absX,
              velocity: velocityX,
              duration: deltaTime,
            });
          }
        } else {
          // Swipe left
          if (onSwipeLeft && typeof onSwipeLeft === 'function') {
            onSwipeLeft(e, {
              distance: absX,
              velocity: velocityX,
              duration: deltaTime,
            });
          }
        }
      }
    } else {
      // Vertical swipe
      if (absY > threshold || velocityY > velocityThreshold) {
        if (deltaY > 0) {
          // Swipe down
          if (onSwipeDown && typeof onSwipeDown === 'function') {
            onSwipeDown(e, {
              distance: absY,
              velocity: velocityY,
              duration: deltaTime,
            });
          }
        } else {
          // Swipe up
          if (onSwipeUp && typeof onSwipeUp === 'function') {
            onSwipeUp(e, {
              distance: absY,
              velocity: velocityY,
              duration: deltaTime,
            });
          }
        }
      }
    }

    if (onTouchEnd && typeof onTouchEnd === 'function') {
      onTouchEnd(e, {
        x: touch.clientX,
        y: touch.clientY,
        deltaX,
        deltaY,
        duration: deltaTime,
      });
    }

    isTouchingRef.current = false;
  }, [
    threshold,
    velocityThreshold,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onTouchEnd,
  ]);

  // Bind touch handlers to element
  const bind = useCallback(() => {
    return {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      ref: elementRef,
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Add passive event listeners for better performance
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const options = { passive: true };

    element.addEventListener('touchstart', handleTouchStart, options);
    element.addEventListener('touchmove', handleTouchMove, options);
    element.addEventListener('touchend', handleTouchEnd, options);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  return {
    // Ref to attach to element
    ref: elementRef,

    // Touch event handlers (can be spread onto element)
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },

    // Bind function for spreading all handlers at once
    bind,

    // Current touch state
    isTouching: isTouchingRef.current,
  };
};

export default useTouch;
