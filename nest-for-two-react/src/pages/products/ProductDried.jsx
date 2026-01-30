import { useState, useContext } from 'react';
import ProductCarousel from '../../components/product/ProductCarousel';
import QuantitySelector from '../../components/product/QuantitySelector';
import DatePicker from '../../components/product/DatePicker';
import TimeSlotSelector from '../../components/product/TimeSlotSelector';
import InstructionsField from '../../components/product/InstructionsField';
import CollapsibleSection from '../../components/product/CollapsibleSection';
import { PRODUCTS } from '../../config/products';
import { CartContext } from '../../context/CartContext';
import { formatDateForShopify } from '../../utils/dateHelpers';

const ProductDried = () => {
  const product = PRODUCTS.DRIED;
  const { addItem } = useContext(CartContext);

  const [selectedSize, setSelectedSize] = useState('50g');
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('3-5PM');
  const [instructions, setInstructions] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const sizeOptions = Object.values(product.variants);
  const currentVariant = product.variants[selectedSize];

  const handleAddToCart = async () => {
    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    setIsAdding(true);

    try {
      const customAttributes = [
        { key: 'Delivery Date', value: formatDateForShopify(deliveryDate) },
        { key: 'Time Slot', value: timeSlot }
      ];

      if (instructions) {
        customAttributes.push({ key: 'Instructions', value: instructions });
      }

      await addItem(currentVariant.id, quantity, customAttributes);
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
          <div>
            <ProductCarousel images={product.images} autoPlay={true} />
          </div>

          <div className="space-y-6 bg-white pt-0 px-6 pb-6">
            <div>
              <h1 className="font-playfair-bold mb-2 text-wellness-dark" style={{ fontSize: '30px' }}>
                {product.name}
              </h1>
              <p className="font-source-sans text-wellness-text text-sm uppercase tracking-wide">
                {product.category}
              </p>
            </div>

            {/* Size Selection - Radio Buttons */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark text-sm mb-3">
                Select Weight
              </label>
              <div className="space-y-2">
                {sizeOptions.map((option) => (
                  <label
                    key={option.size}
                    className={`flex items-center justify-between border-2 p-4 cursor-pointer transition-all ${
                      selectedSize === option.size
                        ? 'border-wellness-rose bg-wellness-blush'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="size"
                        value={option.size}
                        checked={selectedSize === option.size}
                        onChange={() => setSelectedSize(option.size)}
                        className="w-4 h-4 text-wellness-rose"
                      />
                      <div>
                        <div className="font-nunito-regular text-wellness-dark font-semibold">
                          {option.size}
                        </div>
                        <div className="font-source-sans text-xs text-wellness-text">
                          ${option.pricePerGram.toFixed(2)}/gram
                        </div>
                      </div>
                    </div>
                    <div className="font-playfair-bold text-xl text-wellness-rose">
                      ${option.price}
                    </div>
                  </label>
                ))}
              </div>
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
              purchaseType="one-time"
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
              <p className="text-sm font-source-sans text-wellness-text">
                {currentVariant.size} × ${currentVariant.pricePerGram.toFixed(2)}/gram
              </p>
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
                  Our Pure Dry Selection offers premium Indonesian bird's nest in its natural dried form.
                  Perfect for those who prefer to prepare their own bird's nest at home, our dried bird's
                  nest maintains all the nutritional benefits and allows you to customize your preparation.
                </p>
                <p className="mb-3">
                  Each piece is carefully selected and cleaned, ensuring you receive only the finest
                  quality. The dried form has a longer shelf life while retaining all the beneficial
                  nutrients, making it ideal for regular consumption and traditional preparations.
                </p>
                <p>
                  Available in multiple weights from 50g to 1000g, you can choose the perfect amount
                  for your needs.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Preparation Instructions">
                <p className="mb-3">
                  <strong>Soaking:</strong> Soak the dried bird's nest in cold water for 4-6 hours until
                  soft. Change the water 2-3 times during soaking.
                </p>
                <p className="mb-3">
                  <strong>Cleaning:</strong> Gently remove any feathers or impurities. The bird's nest
                  will expand significantly when soaked.
                </p>
                <p className="mb-3">
                  <strong>Cooking:</strong> Double-boil the soaked bird's nest in water for 30-45 minutes.
                  You can add rock sugar, honey, or other sweeteners according to taste.
                </p>
                <p>
                  <strong>Serving:</strong> Serve warm or chilled. Can be combined with other ingredients
                  like ginseng, red dates, or wolfberries for enhanced benefits.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Storage & Shelf Life">
                <p className="mb-3">
                  <strong>Storage:</strong> Keep in a cool, dry place away from direct sunlight. Store in
                  an airtight container to maintain freshness.
                </p>
                <p className="mb-3">
                  <strong>Shelf Life:</strong> Our dried bird's nest can be stored for up to 2 years when
                  kept properly in optimal conditions.
                </p>
                <p>
                  <strong>After Soaking:</strong> Once soaked, refrigerate and consume within 24 hours for
                  best quality.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Delivery & Inclusions">
                <p className="mb-3">
                  <strong>Package Size:</strong> Choose from 50g, 100g, 250g, or 1000g packages.
                </p>
                <p className="mb-3">
                  <strong>Delivery:</strong> Island-wide across Singapore. Choose between 3-5PM or
                  7-9PM time slots. Free delivery for orders above $120.
                </p>
                <p>
                  <strong>Notice Period:</strong> Minimum 24 hours advance notice required for delivery.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Benefits & Quality">
                <p className="mb-3">
                  <strong>Origin:</strong> Premium Indonesian bird's nest, carefully sourced from
                  sustainable farms.
                </p>
                <p className="mb-3">
                  <strong>Benefits:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Boosts immune system</li>
                  <li>Promotes skin renewal and anti-aging</li>
                  <li>Improves respiratory health</li>
                  <li>Natural collagen source</li>
                  <li>Supports overall wellness</li>
                  <li>Longer shelf life for convenient storage</li>
                  <li>Customizable preparation to your taste</li>
                </ul>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDried;
