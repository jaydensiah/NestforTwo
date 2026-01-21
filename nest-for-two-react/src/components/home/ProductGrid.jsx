import { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { getFreshlyCookedProducts, getDriedProducts } from '../../config/products';

/**
 * ProductGrid Component
 * Displays a grid of product cards based on selected category
 *
 * @param {Object} props
 * @param {string} props.category - Category to display ('freshly-cooked' or 'dried')
 * @param {Function} props.onAddToCart - Callback function when add to cart is clicked
 * @param {string} props.className - Additional CSS classes
 */
const ProductGrid = ({ category = 'freshly-cooked', onAddToCart, className = '' }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading state for smooth transitions
    setIsLoading(true);

    const timer = setTimeout(() => {
      // Get products based on category
      let categoryProducts = [];

      if (category === 'freshly-cooked') {
        categoryProducts = getFreshlyCookedProducts();
      } else if (category === 'dried') {
        categoryProducts = getDriedProducts();
      }

      // Transform products to format expected by ProductCard
      const transformedProducts = categoryProducts.map((product) => {
        // For freshly cooked products, use the first one-time variant for display
        let displayPrice = product.price;

        if (product.variants) {
          // Get the first one-time variant for display price
          const oneTimeVariant = Object.values(product.variants).find(
            v => v.type === 'one-time'
          );
          if (oneTimeVariant) {
            displayPrice = oneTimeVariant.price;
          }
        }

        // Map product names to route slugs
        const getRouteSlug = (name) => {
          const slugMap = {
            'Freshly Cooked Birdnest with Honey': 'honey',
            'Freshly Cooked Birdnest with Zero Sugar': 'zero-sugar',
            'Freshly Cooked Birdnest with Rock Sugar': 'rock-sugar',
            'Pure Dry Selection': 'dried'
          };
          return slugMap[name] || name.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '');
        };

        const slug = getRouteSlug(product.name);

        return {
          id: product.id,
          name: product.name,
          image: product.images?.[0] || '/images/placeholder.png',
          price: displayPrice,
          category: product.label || product.category,
          slug: slug,
          originalProduct: product
        };
      });

      setProducts(transformedProducts);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [category]);

  const handleAddToCart = (product) => {
    if (onAddToCart && typeof onAddToCart === 'function') {
      onAddToCart(product);
    } else {
      // If no onAddToCart provided, could show a notification or handle differently
      console.log('Add to cart:', product);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wellness-rose"></div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="font-source-sans text-wellness-text text-lg">
          No products available in this category.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
          className="animate-fadeIn"
        />
      ))}
    </div>
  );
};

export default ProductGrid;
