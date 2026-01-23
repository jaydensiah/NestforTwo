import { useState, useContext } from 'react';
import ProductCarousel from '../../components/product/ProductCarousel';
import PurchaseTypeToggle from '../../components/product/PurchaseTypeToggle';
import SizeSelector from '../../components/product/SizeSelector';
import QuantitySelector from '../../components/product/QuantitySelector';
import DatePicker from '../../components/product/DatePicker';
import TimeSlotSelector from '../../components/product/TimeSlotSelector';
import InstructionsField from '../../components/product/InstructionsField';
import CollapsibleSection from '../../components/product/CollapsibleSection';
import { PRODUCTS } from '../../config/products';
import { CartContext } from '../../context/CartContext';

const ProductHoney = () => {
  const product = PRODUCTS.HONEY;
  const { addItem } = useContext(CartContext);

  const [purchaseType, setPurchaseType] = useState('one-time');
  const [size, setSize] = useState('50ml');
  const [oneTimeQuantity, setOneTimeQuantity] = useState(1);
  const [subscriptionQuantity, setSubscriptionQuantity] = useState(1);
  const [oneTimeDeliveryDate, setOneTimeDeliveryDate] = useState('');
  const [subscriptionDeliveryDate, setSubscriptionDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('3-5PM');
  const [instructions, setInstructions] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Get current quantity and delivery date based on purchase type
  const quantity = purchaseType === 'one-time' ? oneTimeQuantity : subscriptionQuantity;
  const setQuantity = purchaseType === 'one-time' ? setOneTimeQuantity : setSubscriptionQuantity;
  const deliveryDate = purchaseType === 'one-time' ? oneTimeDeliveryDate : subscriptionDeliveryDate;
  const setDeliveryDate = purchaseType === 'one-time' ? setOneTimeDeliveryDate : setSubscriptionDeliveryDate;

  // Get variant options based on purchase type
  const variantOptions = Object.values(product.variants).filter(
    v => v.type === purchaseType
  );

  const handlePurchaseTypeChange = (newType) => {
    setPurchaseType(newType);
  };

  // Get current variant - convert purchaseType to camelCase for key
  const variantKey = purchaseType === 'one-time'
    ? `oneTime${size}`
    : `${purchaseType}${size}`;
  const currentVariant = product.variants[variantKey];

  const handleAddToCart = async () => {
    // Validate delivery date
    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    setIsAdding(true);

    try {
      // Prepare custom attributes
      const customAttributes = [
        { key: 'Delivery Date', value: deliveryDate },
        { key: 'Time Slot', value: timeSlot }
      ];

      if (instructions) {
        customAttributes.push({ key: 'Instructions', value: instructions });
      }

      await addItem(currentVariant.id, quantity, customAttributes);

      // Show success message
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Add to cart error:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Carousel */}
          <div>
            <ProductCarousel images={product.images} autoPlay={true} />
          </div>

          {/* Right: Product Options */}
          <div className="space-y-6 bg-white pt-0 px-6 pb-6">
            <div>
              <h1 className="font-playfair-bold mb-2 text-wellness-dark" style={{ fontSize: '30px' }}>
                {product.name}
              </h1>
              {product.label && (
                <p className="mt-2 inline-block bg-wellness-rose text-white px-3 py-1 font-source-sans rounded-full" style={{ fontSize: '12px' }}>
                  {product.label}
                </p>
              )}
            </div>

            {/* Purchase Type */}
            <div>
              <label className="block font-source-sans mb-2 uppercase" style={{ fontSize: '14px', color: '#81775A' }}>
                Purchase Type
              </label>
              <PurchaseTypeToggle
                selected={purchaseType}
                onChange={handlePurchaseTypeChange}
              />
            </div>

            {/* Size Selection */}
            <div>
              <label className="block font-source-sans mb-3 uppercase" style={{ fontSize: '14px', color: '#81775A' }}>
                Size
              </label>
              <SizeSelector
                options={variantOptions}
                selected={size}
                onChange={setSize}
                purchaseType={purchaseType}
              />
            </div>

            {/* Quantity */}
            {purchaseType === 'subscription' ? (
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block font-source-sans mb-2 uppercase" style={{ fontSize: '14px', color: '#81775A' }}>
                    Delivery Frequency
                  </label>
                  <input
                    type="text"
                    value="3 times a month"
                    readOnly
                    className="w-full border border-[#d1d5db] px-4 py-2 font-source-sans bg-gray-50 cursor-not-allowed"
                    style={{ color: '#636260', height: '40px' }}
                  />
                </div>
                <div>
                  <label className="block font-source-sans mb-2 uppercase" style={{ fontSize: '14px', color: '#81775A' }}>
                    Quantity
                  </label>
                  <div className="w-full border border-[#d1d5db] flex items-center justify-between" style={{ height: '40px' }}>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      style={{ color: '#636260' }}
                    >
                      −
                    </button>
                    <span className="flex-1 font-source-sans text-lg text-center border-l border-r border-[#d1d5db] h-full flex items-center justify-center" style={{ color: '#636260' }}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="flex-1 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                      style={{ color: '#636260' }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <label className="block font-source-sans mb-2 uppercase" style={{ fontSize: '14px', color: '#81775A' }}>
                  Quantity
                </label>
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
            )}

            {/* Delivery Date */}
            <DatePicker
              purchaseType={purchaseType}
              value={deliveryDate}
              onChange={setDeliveryDate}
            />

            {/* Time Slot */}
            <TimeSlotSelector selected={timeSlot} onChange={setTimeSlot} />

            {/* Instructions */}
            <InstructionsField value={instructions} onChange={setInstructions} />

            {/* Price Summary */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-source-sans" style={{ color: '#636260' }}>
                  Subtotal:
                </span>
                <span className="font-source-sans text-2xl" style={{ color: '#B76E79' }}>
                  ${(currentVariant.price * quantity).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-wellness-rose text-white py-4 font-source-sans text-lg hover:bg-rose-gold-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
            >
              {isAdding ? 'Adding...' : (purchaseType === 'subscription' ? 'Add Subscription to Cart' : 'Add to Cart')}
            </button>

            {/* Collapsible Sections */}
            <div className="border-t border-gray-200 mt-6">
              <CollapsibleSection title="Description" defaultOpen={true}>
                <p className="mb-3">
                  Our Honey Sachet is specially crafted for children, combining the natural sweetness
                  of pure honey with premium Indonesian bird's nest. This gentle, naturally sweet
                  variety makes it easy for kids to enjoy the incredible health benefits of bird's nest.
                </p>
                <p className="mb-3">
                  Each bottle contains thick, authentic bird's nest strands - you can see and feel the
                  quality. No preservatives, no artificial additives, just pure goodness that supports
                  your child's growth and development.
                </p>
                <p>
                  Perfect for building strong immunity, supporting growth, and establishing healthy
                  wellness habits from a young age.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Storage & Consumption">
                <p className="mb-3">
                  <strong>Storage:</strong> Refrigerate immediately upon receiving at 4°C. Do not freeze.
                  Consume within 10-14 days for optimal freshness.
                </p>
                <p className="mb-3">
                  <strong>How to Consume:</strong> Ready to drink straight from the bottle! Enjoy chilled
                  for best taste, or warm gently if preferred.
                </p>
                <p>
                  <strong>Best Time:</strong> Morning on an empty stomach or before bed for optimal
                  nutrient absorption.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Delivery & Inclusions">
                <p className="mb-3">
                  <strong>One-Time Purchase:</strong> 6 bottles of 50ml or 100ml delivered on your
                  selected date.
                </p>
                <p className="mb-3">
                  <strong>Subscription:</strong> 30 bottles delivered over 3 months (10 bottles every
                  Sunday). Save 17% compared to one-time purchases!
                </p>
                <p className="mb-3">
                  <strong>Delivery:</strong> Island-wide across Singapore. Choose between 3-5PM or
                  7-9PM time slots. Free delivery for orders above $120.
                </p>
                <p>
                  <strong>Notice Period:</strong> Minimum 24 hours advance notice required for all
                  deliveries to ensure freshness.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Ingredients & Benefits">
                <p className="mb-3">
                  <strong>Ingredients:</strong> Premium Indonesian bird's nest, pure honey, purified water.
                  No preservatives, no artificial additives.
                </p>
                <p className="mb-3">
                  <strong>Benefits:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Strengthens immune system</li>
                  <li>Supports healthy growth and development</li>
                  <li>Improves respiratory health</li>
                  <li>Enhances skin health</li>
                  <li>Boosts energy and vitality</li>
                  <li>Easy for children to consume with natural honey sweetness</li>
                </ul>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHoney;
