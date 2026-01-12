import { createContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

const CART_STORAGE_KEY = 'nestfortwo_cart_id';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemCount, setItemCount] = useState(0);
  const [shopifyClient, setShopifyClient] = useState(null);

  // Initialize Shopify client
  useEffect(() => {
    const client = Client.buildClient({
      domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
      storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    });
    setShopifyClient(client);
  }, []);

  // Initialize cart on mount
  useEffect(() => {
    if (shopifyClient) {
      initializeCart();
    }
  }, [shopifyClient]);

  // Update item count whenever cart changes
  useEffect(() => {
    if (cart) {
      updateItemCount(cart);
    }
  }, [cart]);

  // Initialize or fetch existing cart
  const initializeCart = async () => {
    try {
      const existingCartId = localStorage.getItem(CART_STORAGE_KEY);

      if (existingCartId) {
        const existingCart = await shopifyClient.checkout.fetch(existingCartId);

        if (existingCart && !existingCart.completedAt) {
          setCart(existingCart);
        } else {
          await createNewCart();
        }
      } else {
        await createNewCart();
      }
    } catch (error) {
      console.error('Cart initialization error:', error);
      await createNewCart();
    } finally {
      setLoading(false);
    }
  };

  // Create new cart
  const createNewCart = async () => {
    try {
      const newCart = await shopifyClient.checkout.create();
      localStorage.setItem(CART_STORAGE_KEY, newCart.id);
      setCart(newCart);
      setItemCount(0);
    } catch (error) {
      console.error('Create cart error:', error);
    }
  };

  // Update item count
  const updateItemCount = (cartData) => {
    const count = cartData.lineItems.reduce((total, item) => total + item.quantity, 0);
    setItemCount(count);
  };

  // Add item to cart
  const addItem = async (variantId, quantity, customAttributes = []) => {
    try {
      if (!cart || !shopifyClient) {
        throw new Error('Cart not initialized');
      }

      const lineItem = {
        variantId,
        quantity,
        customAttributes
      };

      const updatedCart = await shopifyClient.checkout.addLineItems(cart.id, [lineItem]);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Add to cart error:', error);
      throw error;
    }
  };

  // Update quantity
  const updateQuantity = async (lineItemId, quantity) => {
    try {
      if (!cart || !shopifyClient) {
        throw new Error('Cart not initialized');
      }

      const lineItem = { id: lineItemId, quantity };
      const updatedCart = await shopifyClient.checkout.updateLineItems(cart.id, [lineItem]);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Update quantity error:', error);
      throw error;
    }
  };

  // Remove item
  const removeItem = async (lineItemId) => {
    try {
      if (!cart || !shopifyClient) {
        throw new Error('Cart not initialized');
      }

      const updatedCart = await shopifyClient.checkout.removeLineItems(cart.id, [lineItemId]);
      setCart(updatedCart);
      return updatedCart;
    } catch (error) {
      console.error('Remove item error:', error);
      throw error;
    }
  };

  // Checkout
  const checkout = () => {
    if (cart && cart.webUrl) {
      window.location.href = cart.webUrl;
    }
  };

  const value = {
    cart,
    loading,
    itemCount,
    addItem,
    updateQuantity,
    removeItem,
    checkout
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
