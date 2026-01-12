import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook for modal state management
 *
 * @param {Object} options - Configuration options
 * @param {boolean} options.initialOpen - Initial open state (default: false)
 * @param {Function} options.onOpen - Callback when modal opens
 * @param {Function} options.onClose - Callback when modal closes
 * @param {boolean} options.closeOnEscape - Close modal on Escape key (default: true)
 * @param {boolean} options.closeOnOutsideClick - Close modal on outside click (default: true)
 * @param {boolean} options.preventScroll - Prevent body scroll when modal is open (default: true)
 * @returns {Object} Modal state and controls
 */
const useModal = ({
  initialOpen = false,
  onOpen = null,
  onClose = null,
  closeOnEscape = true,
  closeOnOutsideClick = true,
  preventScroll = true,
} = {}) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Open modal
  const open = useCallback(() => {
    setIsOpen(true);
    previousActiveElement.current = document.activeElement;

    if (onOpen && typeof onOpen === 'function') {
      onOpen();
    }
  }, [onOpen]);

  // Close modal
  const close = useCallback(() => {
    setIsOpen(false);

    // Restore focus to previous element
    if (previousActiveElement.current && previousActiveElement.current.focus) {
      previousActiveElement.current.focus();
    }

    if (onClose && typeof onClose === 'function') {
      onClose();
    }
  }, [onClose]);

  // Toggle modal
  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, close]);

  // Handle outside click
  useEffect(() => {
    if (!closeOnOutsideClick || !isOpen) return;

    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        close();
      }
    };

    // Use capture phase to ensure this runs before other handlers
    document.addEventListener('mousedown', handleOutsideClick, true);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick, true);
    };
  }, [isOpen, closeOnOutsideClick, close]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!preventScroll || !isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen, preventScroll]);

  // Focus trap - keep focus within modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modalElement = modalRef.current;
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modalElement.addEventListener('keydown', handleTabKey);

    // Focus first element on mount
    if (firstElement) {
      firstElement.focus();
    }

    return () => {
      modalElement.removeEventListener('keydown', handleTabKey);
    };
  }, [isOpen]);

  // Get props for modal container
  const getModalProps = useCallback(() => {
    return {
      ref: modalRef,
      role: 'dialog',
      'aria-modal': 'true',
      'aria-hidden': !isOpen,
    };
  }, [isOpen]);

  // Get props for backdrop/overlay
  const getBackdropProps = useCallback(() => {
    return {
      onClick: closeOnOutsideClick ? close : undefined,
      'aria-hidden': 'true',
    };
  }, [closeOnOutsideClick, close]);

  return {
    // State
    isOpen,
    modalRef,

    // Controls
    open,
    close,
    toggle,

    // Helper functions
    getModalProps,
    getBackdropProps,
  };
};

export default useModal;
