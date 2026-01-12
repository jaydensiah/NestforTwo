import { useState, useEffect, useCallback } from 'react';
import Client from 'shopify-buy';

/**
 * Custom hook for managing Shopify cart functionality
 * Handles cart initialization, adding items, updating quantities, removing items, and checkout
 *
 * @param {Object} config - Shopify configuration object
 * @param {string} config.domain - Shopify store domain
 * @param {string} config.storefrontAccessToken - Shopify Storefront API access token
 * @returns {Object} Cart state and methods
 */
const useCart = (config) => {
  const [client, setClient] = useState(null);
  const [checkout, setCheckout] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Shopify client
  useEffect(() => {
    if (!config?.domain || !config?.storefrontAccessToken) {
      setError(new Error('Shopify configuration is required'));
      setIsLoading(false);
      return;
    }

    try {
      const shopifyClient = Client.buildClient({
        domain: config.domain,
        storefrontAccessToken: config.storefrontAccessToken,
      });
      setClient(shopifyClient);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  }, [config?.domain, config?.storefrontAccessToken]);

  // Initialize or fetch existing checkout
  useEffect(() => {
    if (!client) return;

    const initializeCheckout = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Check for existing checkout ID in localStorage
        const existingCheckoutId = localStorage.getItem('shopifyCheckoutId');

        let checkoutData;
        if (existingCheckoutId) {
          try {
            // Try to fetch existing checkout
            checkoutData = await client.checkout.fetch(existingCheckoutId);

            // If checkout is completed, create a new one
            if (checkoutData.completedAt) {
              localStorage.removeItem('shopifyCheckoutId');
              checkoutData = await client.checkout.create();
              localStorage.setItem('shopifyCheckoutId', checkoutData.id);
            }
          } catch (err) {
            // If fetch fails, create new checkout
            console.warn('Failed to fetch existing checkout, creating new one:', err);
            checkoutData = await client.checkout.create();
            localStorage.setItem('shopifyCheckoutId', checkoutData.id);
          }
        } else {
          // Create new checkout
          checkoutData = await client.checkout.create();
          localStorage.setItem('shopifyCheckoutId', checkoutData.id);
        }

        setCheckout(checkoutData);
      } catch (err) {
        setError(err);
        console.error('Error initializing checkout:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCheckout();
  }, [client]);

  // Add item to cart
  const addItem = useCallback(async (variantId, quantity = 1) => {
    if (!client || !checkout) {
      setError(new Error('Cart not initialized'));
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      const lineItemsToAdd = [
        {
          variantId,
          quantity: parseInt(quantity, 10),
        },
      ];

      const updatedCheckout = await client.checkout.addLineItems(
        checkout.id,
        lineItemsToAdd
      );

      setCheckout(updatedCheckout);
      return updatedCheckout;
    } catch (err) {
      setError(err);
      console.error('Error adding item to cart:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [client, checkout]);

  // Update item quantity
  const updateQuantity = useCallback(async (lineItemId, quantity) => {
    if (!client || !checkout) {
      setError(new Error('Cart not initialized'));
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      const lineItemsToUpdate = [
        {
          id: lineItemId,
          quantity: parseInt(quantity, 10),
        },
      ];

      const updatedCheckout = await client.checkout.updateLineItems(
        checkout.id,
        lineItemsToUpdate
      );

      setCheckout(updatedCheckout);
      return updatedCheckout;
    } catch (err) {
      setError(err);
      console.error('Error updating item quantity:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [client, checkout]);

  // Remove item from cart
  const removeItem = useCallback(async (lineItemId) => {
    if (!client || !checkout) {
      setError(new Error('Cart not initialized'));
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      const updatedCheckout = await client.checkout.removeLineItems(
        checkout.id,
        [lineItemId]
      );

      setCheckout(updatedCheckout);
      return updatedCheckout;
    } catch (err) {
      setError(err);
      console.error('Error removing item from cart:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [client, checkout]);

  // Clear entire cart
  const clearCart = useCallback(async () => {
    if (!client || !checkout) {
      setError(new Error('Cart not initialized'));
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      const lineItemIds = checkout.lineItems.map(item => item.id);

      if (lineItemIds.length > 0) {
        const updatedCheckout = await client.checkout.removeLineItems(
          checkout.id,
          lineItemIds
        );
        setCheckout(updatedCheckout);
        return updatedCheckout;
      }

      return checkout;
    } catch (err) {
      setError(err);
      console.error('Error clearing cart:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [client, checkout]);

  // Get checkout URL for redirecting to Shopify checkout
  const getCheckoutUrl = useCallback(() => {
    if (!checkout) {
      return null;
    }
    return checkout.webUrl;
  }, [checkout]);

  // Calculate cart totals
  const cartTotal = checkout?.totalPrice?.amount || 0;
  const cartCount = checkout?.lineItems?.reduce(
    (total, item) => total + item.quantity,
    0
  ) || 0;
  const cartItems = checkout?.lineItems || [];

  return {
    // State
    checkout,
    cartItems,
    cartCount,
    cartTotal,
    isLoading,
    error,

    // Methods
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    getCheckoutUrl,
  };
};

export default useCart;
