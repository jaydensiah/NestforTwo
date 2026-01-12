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
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('3-5PM');
  const [instructions, setInstructions] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Get variant options based on purchase type
  const variantOptions = Object.values(product.variants).filter(
    v => v.type === purchaseType
  );

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
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-wellness-cream min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Carousel */}
          <div>
            <ProductCarousel images={product.images} autoPlay={true} />
          </div>

          {/* Right: Product Options */}
          <div className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div>
              <h1 className="font-playfair-bold text-3xl md:text-4xl mb-2 text-wellness-dark">
                {product.name}
              </h1>
              <p className="font-source-sans text-wellness-text text-sm uppercase tracking-wide">
                {product.category}
              </p>
              {product.label && (
                <p className="mt-2 inline-block bg-wellness-rose text-white px-3 py-1 text-xs font-nunito-regular rounded-full">
                  {product.label}
                </p>
              )}
            </div>

            {/* Purchase Type */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark text-sm mb-2">
                Purchase Type
              </label>
              <PurchaseTypeToggle
                selected={purchaseType}
                onChange={setPurchaseType}
              />
            </div>

            {/* Size Selection */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark text-sm mb-3">
                Select Size
              </label>
              <SizeSelector
                options={variantOptions}
                selected={size}
                onChange={setSize}
                purchaseType={purchaseType}
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark text-sm mb-2">
                Quantity
              </label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

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
              <div className="flex justify-between items-center mb-2">
                <span className="font-source-sans text-wellness-text">
                  Subtotal:
                </span>
                <span className="font-playfair-bold text-2xl text-wellness-rose">
                  ${(currentVariant.price * quantity).toFixed(2)}
                </span>
              </div>
              {currentVariant.quantity && (
                <p className="text-sm font-source-sans text-wellness-text">
                  {currentVariant.quantity} bottles × ${currentVariant.pricePerBottle}/bottle
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-wellness-rose text-white py-4 font-nunito-regular font-semibold text-lg hover:bg-rose-gold-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
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
