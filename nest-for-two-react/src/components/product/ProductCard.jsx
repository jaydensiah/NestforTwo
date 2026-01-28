import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/priceCalculators';

/**
 * ProductCard Component
 * Displays a product card with image, floating label, title, price, and add to cart button
 *
 * @param {Object} props
 * @param {Object} props.product - Product object
 * @param {string} props.product.id - Product ID
 * @param {string} props.product.name - Product name
 * @param {string} props.product.image - Product image URL
 * @param {number} props.product.price - Product price
 * @param {string} props.product.category - Product category (FOR CHILDREN, FOR PREGNANT LADIES & DIABETICS, FOR ELDERLY)
 * @param {string} props.product.slug - Product slug for routing
 * @param {Function} props.onAddToCart - Callback function when add to cart is clicked
 * @param {string} props.className - Additional CSS classes
 */
const ProductCard = ({ product, onAddToCart, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productUrl = `/products/${product.slug}`;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  // Label style - consistent for all categories (reduced size on mobile)
  const labelStyle = 'absolute top-1 right-1 sm:top-2 sm:right-2 bg-wellness-rose text-white text-[7px] sm:text-[10px] md:text-[12px] px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full font-medium font-source-sans z-10 group-hover:opacity-0 transition-opacity duration-300';

  return (
    <Link
      to={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Square Aspect Ratio */}
      <div className="relative w-full aspect-square overflow-hidden bg-wellness-cream">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Floating Label */}
        {(product.label || product.category) && (
          <span className={labelStyle}>
            <span className="md:hidden">{product.labelShort || product.label || product.category}</span>
            <span className="hidden md:inline">{product.label || product.category}</span>
          </span>
        )}

        {/* Add to Cart Button - Slides up from bottom on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <button
            onClick={handleAddToCart}
            className="w-full bg-wellness-rose hover:bg-wellness-rose/90 text-white font-nunito-regular uppercase tracking-wider py-3 px-4 text-sm transition-colors duration-200"
            aria-label={`Add ${product.name} to cart`}
          >
            View Product
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="font-playfair-bold text-lg text-wellness-dark mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Product Price */}
        <p className="text-wellness-rose font-source-sans text-base font-semibold">
          {formatPrice(product.price)}
        </p>

        {/* Optional: Display price per unit if available */}
        {product.pricePerUnit && (
          <p className="text-wellness-text text-sm mt-1">
            {formatPrice(product.pricePerUnit)} per {product.unit || 'bottle'}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
