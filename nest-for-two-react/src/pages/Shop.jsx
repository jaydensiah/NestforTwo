import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getAllShopProducts, getProductsBySeries } from '../config/products';
import { formatPrice } from '../utils/priceCalculators';

// Product slug mapping for navigation
const getProductSlug = (productKey, product) => {
  const slugMap = {
    'Freshly Cooked Birdnest with Honey': 'honey',
    'Freshly Cooked Birdnest with Zero Sugar': 'zero-sugar',
    'Freshly Cooked Birdnest with Rock Sugar': 'rock-sugar',
    'Freshly Cooked Bird\'s Nest Gift Box with Honey': 'gift-honey',
    'Freshly Cooked Bird\'s Nest Gift Box with Zero Sugar': 'gift-zero-sugar',
    'Freshly Cooked Bird\'s Nest Gift Box with Rock Sugar': 'gift-rock-sugar',
    'Nest for Two Premium Dried Bird\'s Nest | 50g': 'dried-50g',
    'Nest for Two Premium Dried Bird\'s Nest | 100g': 'dried-100g',
    'Nest for Two Premium Dried Bird\'s Nest | 250g': 'dried-250g',
    'Original Kue Lapis': 'original-kue-lapis',
    'Prune Kue Lapis': 'prune-kue-lapis'
  };
  return slugMap[product.name] || product.name.toLowerCase().replace(/\s+/g, '-');
};

// Shop Product Card Component
const ShopProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const slug = getProductSlug(null, product);
  const productUrl = `/products/${slug}`;

  // Get display price
  const displayPrice = product.price || (product.variants?.oneTime50ml25?.price) || 0;
  const originalPrice = product.originalPrice;
  const savings = product.savings;

  return (
    <Link
      to={productUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex-shrink-0 w-[42%] min-w-[140px] md:w-full md:min-w-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container with Square Aspect Ratio */}
      <div className="relative w-full aspect-square overflow-hidden bg-wellness-cream">
        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = '/images/placeholder.png';
          }}
        />

        {/* Floating Label */}
        {product.label && (
          <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-wellness-rose text-white text-[7px] sm:text-[10px] md:text-[12px] px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full font-medium font-source-sans z-10 group-hover:opacity-0 transition-opacity duration-300">
            <span className="md:hidden">{product.labelShort || product.label}</span>
            <span className="hidden md:inline">{product.label}</span>
          </span>
        )}

        {/* Savings Badge - only show if no label (for Dried products) */}
        {savings && !product.label && (
          <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-wellness-rose text-white text-[7px] sm:text-[10px] md:text-[12px] px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full font-medium font-source-sans z-10 group-hover:opacity-0 transition-opacity duration-300">
            SAVE {savings}
          </span>
        )}

        {/* Add to Cart Button - Slides up from bottom on hover */}
        <div
          className={`absolute bottom-0 left-0 right-0 transition-transform duration-300 ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="w-full bg-wellness-rose text-white font-nunito-regular uppercase tracking-wider py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm text-center">
            View Product
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-2 sm:p-3 md:p-4">
        {/* Product Title */}
        <h3 className="font-playfair-bold text-xs sm:text-sm md:text-base lg:text-lg text-wellness-dark mb-1 sm:mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Product Price */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {originalPrice && (
            <span className="text-gray-400 font-source-sans text-xs sm:text-sm md:text-base line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          <span className="text-wellness-rose font-source-sans text-sm sm:text-base md:text-lg font-semibold">
            {formatPrice(displayPrice)}
          </span>
        </div>

      </div>
    </Link>
  );
};

// Filter Button Component
const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full font-source-sans text-sm transition-all duration-200 whitespace-nowrap ${
        isActive
          ? 'bg-wellness-rose text-white shadow-md'
          : 'bg-white text-wellness-dark border border-gray-200 hover:border-wellness-rose hover:text-wellness-rose'
      }`}
    >
      {label}
    </button>
  );
};

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Category configuration
  const categories = [
    { key: null, label: 'All' },
    { key: 'signature-bottle', label: 'Signature Bottle Series' },
    { key: 'signature-gift', label: 'Signature Gift Set Series' },
    { key: 'premium-dried', label: 'Premium Dried Series' },
    { key: 'kue-lapis', label: 'Traditional Kue Lapis Series' }
  ];

  // Load products based on category
  useEffect(() => {
    window.scrollTo(0, 0);
    if (category) {
      setProducts(getProductsBySeries(category));
    } else {
      setProducts(getAllShopProducts());
    }
  }, [category]);

  // Handle filter click
  const handleFilterClick = (categoryKey) => {
    if (categoryKey) {
      setSearchParams({ category: categoryKey });
    } else {
      setSearchParams({});
    }
  };

  // Get active category label
  const getActiveLabel = () => {
    const active = categories.find(cat => cat.key === category);
    return active ? active.label : 'All Products';
  };

  return (
    <div className="bg-wellness-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair-bold text-3xl sm:text-4xl text-wellness-dark mb-4">
            {category ? getActiveLabel() : 'All Products'}
          </h1>
          <p className="text-wellness-text font-source-sans text-base sm:text-lg">
            Discover our complete collection of premium bird's nest products
          </p>
        </div>

        {/* Filter Buttons - Desktop */}
        <div className="hidden md:block mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <FilterButton
                key={cat.key || 'all'}
                label={cat.label}
                isActive={category === cat.key}
                onClick={() => handleFilterClick(cat.key)}
              />
            ))}
          </div>
        </div>

        {/* Filter Dropdown - Mobile */}
        <div className="md:hidden mb-8">
          <div className="flex flex-col items-center gap-2">
            <label className="font-source-sans text-sm" style={{ color: '#636260' }}>
              FILTER BY CATEGORY
            </label>
            <div className="relative w-full max-w-xs" ref={dropdownRef}>
              {/* Dropdown Trigger */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full bg-white border border-gray-200 px-5 py-2.5 pr-10 font-source-sans text-sm text-wellness-dark text-left shadow-sm focus:outline-none transition-all duration-200 ${
                  isDropdownOpen
                    ? 'rounded-t-2xl border-b-0'
                    : 'rounded-full'
                }`}
              >
                {categories.find(cat => cat.key === category)?.label || 'All'}
              </button>
              {/* Dropdown Arrow */}
              <div className="pointer-events-none absolute top-0 right-0 h-[42px] flex items-center pr-4">
                <svg
                  className={`h-4 w-4 text-wellness-rose transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 border-t-0 rounded-b-2xl shadow-lg overflow-hidden z-50">
                  {categories.map((cat, index) => (
                    <button
                      key={cat.key || 'all'}
                      onClick={() => {
                        handleFilterClick(cat.key);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left font-source-sans text-sm transition-colors duration-150 ${
                        category === cat.key
                          ? 'bg-wellness-rose text-white'
                          : 'text-wellness-dark hover:bg-wellness-cream'
                      } ${index === categories.length - 1 ? 'rounded-b-2xl' : ''}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-wellness-text font-source-sans text-sm text-center">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Products Grid - 3 per row with horizontal scroll on mobile, grid on desktop */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Group products into rows of 3 */}
          {Array.from({ length: Math.ceil(products.length / 3) }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-3 sm:gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-2 md:pb-0 no-scrollbar md:grid md:grid-cols-3"
            >
              {products.slice(rowIndex * 3, rowIndex * 3 + 3).map((product, index) => (
                <ShopProductCard
                  key={`${product.name}-${rowIndex}-${index}`}
                  product={product}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-wellness-text font-source-sans text-lg">
              No products found in this category.
            </p>
            <button
              onClick={() => handleFilterClick(null)}
              className="mt-4 text-wellness-rose font-source-sans hover:underline"
            >
              View all products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
