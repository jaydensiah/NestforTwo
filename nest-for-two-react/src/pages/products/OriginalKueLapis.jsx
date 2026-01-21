import { useState, useContext } from 'react';
import ProductCarousel from '../../components/product/ProductCarousel';
import QuantitySelector from '../../components/product/QuantitySelector';
import DatePicker from '../../components/product/DatePicker';
import TimeSlotSelector from '../../components/product/TimeSlotSelector';
import InstructionsField from '../../components/product/InstructionsField';
import CollapsibleSection from '../../components/product/CollapsibleSection';
import { PRODUCTS } from '../../config/products';
import { CartContext } from '../../context/CartContext';

const OriginalKueLapis = () => {
  const product = PRODUCTS.ORIGINAL_KUE_LAPIS;
  const { addItem } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('3-5PM');
  const [instructions, setInstructions] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    setIsAdding(true);

    try {
      const customAttributes = [
        { key: 'Delivery Date', value: deliveryDate },
        { key: 'Time Slot', value: timeSlot }
      ];

      if (instructions) {
        customAttributes.push({ key: 'Instructions', value: instructions });
      }

      await addItem(product.variant, quantity, customAttributes);
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

            {/* Product Info */}
            <div className="bg-wellness-cream p-4 rounded">
              <p className="font-source-sans text-wellness-text">
                Handcrafted traditional Indonesian Kue Lapis with authentic Original flavor.
                Each layer is carefully prepared using time-honored methods for the perfect
                texture and taste.
              </p>
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
                  Price per box:
                </span>
                <span className="font-playfair-bold text-xl text-wellness-rose">
                  ${product.price}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-source-sans text-wellness-dark font-semibold">
                  Subtotal:
                </span>
                <span className="font-playfair-bold text-2xl text-wellness-rose">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
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
                  Our Original Kue Lapis is a celebration of traditional Indonesian baking. Each layer
                  is meticulously crafted using authentic recipes passed down through generations,
                  creating the perfect balance of sweetness and texture.
                </p>
                <p className="mb-3">
                  Made with premium ingredients including quality flour, fresh eggs, butter, and
                  sugar, our Kue Lapis features the classic flavor that has made this cake a beloved
                  treat across Southeast Asia.
                </p>
                <p>
                  The layers are thin, moist, and delicately sweet - perfect for afternoon tea,
                  special occasions, or as a thoughtful gift. Each box measures 10x20cm, providing
                  generous portions to share with family and friends.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Ingredients & Preparation">
                <p className="mb-3">
                  <strong>Main Ingredients:</strong> Premium flour, fresh eggs, butter, sugar, coconut
                  milk, and pandan for that authentic aroma.
                </p>
                <p className="mb-3">
                  <strong>Preparation Method:</strong> Each layer is individually baked to perfection,
                  then carefully stacked to create the signature multi-layered appearance. This
                  traditional method requires patience and skill, resulting in superior taste and
                  texture.
                </p>
                <p>
                  <strong>No Preservatives:</strong> Made fresh with natural ingredients only. No
                  artificial colors, flavors, or preservatives.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Storage & Serving">
                <p className="mb-3">
                  <strong>Storage:</strong> Keep at room temperature in a cool, dry place. For extended
                  freshness, refrigerate in an airtight container.
                </p>
                <p className="mb-3">
                  <strong>Shelf Life:</strong> Best consumed within 7 days of delivery for optimal
                  freshness and taste. Can be refrigerated for up to 2 weeks.
                </p>
                <p className="mb-3">
                  <strong>Serving Suggestions:</strong> Serve at room temperature for the best flavor.
                  Pairs wonderfully with tea or coffee. Can also be enjoyed with our bird's nest
                  sachets for a complete wellness treat!
                </p>
                <p>
                  <strong>Portioning:</strong> Each 10x20cm box can be sliced into 10-15 servings,
                  making it perfect for sharing.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Delivery & Gift Options">
                <p className="mb-3">
                  <strong>Packaging:</strong> Carefully packaged to ensure it arrives in perfect
                  condition. Makes an excellent gift for any occasion.
                </p>
                <p className="mb-3">
                  <strong>Delivery:</strong> Island-wide across Singapore. Choose between 3-5PM or
                  7-9PM time slots. Free delivery for orders above $120.
                </p>
                <p>
                  <strong>Notice Period:</strong> Minimum 24 hours advance notice required as each
                  Kue Lapis is made fresh to order.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Why Choose Our Kue Lapis">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Handcrafted using traditional methods</li>
                  <li>Made fresh to order - no mass production</li>
                  <li>Premium quality ingredients</li>
                  <li>No artificial preservatives or additives</li>
                  <li>Authentic Indonesian recipe</li>
                  <li>Perfect for gifting or personal enjoyment</li>
                  <li>Generous 10x20cm size</li>
                  <li>Pairs beautifully with our bird's nest products</li>
                </ul>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OriginalKueLapis;
