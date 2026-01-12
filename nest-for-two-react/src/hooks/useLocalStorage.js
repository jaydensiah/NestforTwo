import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for syncing state with localStorage
 * Automatically persists state to localStorage and syncs across tabs/windows
 *
 * @param {string} key - The localStorage key
 * @param {*} initialValue - Initial value if no value exists in localStorage
 * @param {Object} options - Configuration options
 * @param {Function} options.serializer - Custom serializer function (default: JSON.stringify)
 * @param {Function} options.deserializer - Custom deserializer function (default: JSON.parse)
 * @param {boolean} options.syncAcrossTabs - Sync state across tabs (default: true)
 * @returns {Array} [storedValue, setValue, removeValue] - Similar to useState
 */
const useLocalStorage = (key, initialValue, options = {}) => {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    syncAcrossTabs = true,
  } = options;

  // Keep track of the key in case it changes
  const keyRef = useRef(key);

  // Read value from localStorage
  const readValue = useCallback(() => {
    // Prevent build error "window is undefined"
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) {
        return initialValue;
      }
      return deserializer(item);
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue, deserializer]);

  // State to store our value
  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that persists to localStorage
  const setValue = useCallback((value) => {
    // Prevent build error "window is undefined"
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key "${key}" even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function like useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Save to state
      setStoredValue(valueToStore);

      // Save to localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serializer(valueToStore));

        // Dispatch custom event to sync across tabs
        if (syncAcrossTabs) {
          window.dispatchEvent(
            new CustomEvent('local-storage', {
              detail: { key, value: valueToStore },
            })
          );
        }
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue, serializer, syncAcrossTabs]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);

        // Dispatch custom event to sync across tabs
        if (syncAcrossTabs) {
          window.dispatchEvent(
            new CustomEvent('local-storage', {
              detail: { key, value: null },
            })
          );
        }
      }
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue, syncAcrossTabs]);

  // Listen for changes to localStorage from other tabs/windows
  useEffect(() => {
    if (!syncAcrossTabs) return;

    const handleStorageChange = (e) => {
      // Native storage event (from other tabs)
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(deserializer(e.newValue));
        } catch (error) {
          console.warn(`Error parsing localStorage value for key "${key}":`, error);
        }
      } else if (e.key === key && e.newValue === null) {
        setStoredValue(initialValue);
      }
    };

    const handleCustomStorageChange = (e) => {
      // Custom event (from current tab)
      if (e.detail.key === key) {
        setStoredValue(e.detail.value ?? initialValue);
      }
    };

    // Listen to storage event (from other tabs)
    window.addEventListener('storage', handleStorageChange);

    // Listen to custom event (from current tab)
    window.addEventListener('local-storage', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleCustomStorageChange);
    };
  }, [key, initialValue, deserializer, syncAcrossTabs]);

  // Update stored value if key changes
  useEffect(() => {
    if (keyRef.current !== key) {
      keyRef.current = key;
      setStoredValue(readValue());
    }
  }, [key, readValue]);

  // Sync with localStorage on mount (handles SSR)
  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  return [storedValue, setValue, removeValue];
};

export default useLocalStorage;
