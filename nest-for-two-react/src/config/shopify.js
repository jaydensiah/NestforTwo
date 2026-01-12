/**
 * Shopify Client Configuration
 * Initializes the Shopify Buy SDK for storefront API access
 */

import Client from 'shopify-buy';

// Validate environment variables
const validateEnv = () => {
  const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
  const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    throw new Error(
      'Missing Shopify configuration. Please ensure VITE_SHOPIFY_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN are set in your .env file.'
    );
  }

  return { domain, token };
};

// Initialize Shopify client
let shopifyClient = null;

try {
  const { domain, token } = validateEnv();

  shopifyClient = Client.buildClient({
    domain,
    storefrontAccessToken: token,
    apiVersion: '2024-01'
  });
} catch (error) {
  console.error('Failed to initialize Shopify client:', error.message);
}

/**
 * Get the Shopify client instance
 * @returns {Object} Shopify client instance
 * @throws {Error} If client is not initialized
 */
export const getShopifyClient = () => {
  if (!shopifyClient) {
    throw new Error('Shopify client is not initialized. Check your environment configuration.');
  }
  return shopifyClient;
};

/**
 * Fetch all products from Shopify
 * @returns {Promise<Array>} Array of product objects
 */
export const fetchProducts = async () => {
  try {
    const client = getShopifyClient();
    const products = await client.product.fetchAll();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

/**
 * Fetch a single product by ID
 * @param {string} productId - Shopify product ID
 * @returns {Promise<Object>} Product object
 */
export const fetchProductById = async (productId) => {
  try {
    const client = getShopifyClient();
    const product = await client.product.fetch(productId);
    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

/**
 * Create a new checkout
 * @returns {Promise<Object>} Checkout object
 */
export const createCheckout = async () => {
  try {
    const client = getShopifyClient();
    const checkout = await client.checkout.create();
    return checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
};

/**
 * Add line items to checkout
 * @param {string} checkoutId - Checkout ID
 * @param {Array} lineItems - Array of line items to add
 * @returns {Promise<Object>} Updated checkout object
 */
export const addLineItems = async (checkoutId, lineItems) => {
  try {
    const client = getShopifyClient();
    const checkout = await client.checkout.addLineItems(checkoutId, lineItems);
    return checkout;
  } catch (error) {
    console.error('Error adding line items:', error);
    throw error;
  }
};

/**
 * Update line items in checkout
 * @param {string} checkoutId - Checkout ID
 * @param {Array} lineItems - Array of line items to update
 * @returns {Promise<Object>} Updated checkout object
 */
export const updateLineItems = async (checkoutId, lineItems) => {
  try {
    const client = getShopifyClient();
    const checkout = await client.checkout.updateLineItems(checkoutId, lineItems);
    return checkout;
  } catch (error) {
    console.error('Error updating line items:', error);
    throw error;
  }
};

/**
 * Remove line items from checkout
 * @param {string} checkoutId - Checkout ID
 * @param {Array} lineItemIds - Array of line item IDs to remove
 * @returns {Promise<Object>} Updated checkout object
 */
export const removeLineItems = async (checkoutId, lineItemIds) => {
  try {
    const client = getShopifyClient();
    const checkout = await client.checkout.removeLineItems(checkoutId, lineItemIds);
    return checkout;
  } catch (error) {
    console.error('Error removing line items:', error);
    throw error;
  }
};

export default shopifyClient;
