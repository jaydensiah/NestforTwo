import { useState, useContext } from 'react';
import ProductCarousel from '../../components/product/ProductCarousel';
import QuantitySelector from '../../components/product/QuantitySelector';
import DatePicker from '../../components/product/DatePicker';
import TimeSlotSelector from '../../components/product/TimeSlotSelector';
import InstructionsField from '../../components/product/InstructionsField';
import CollapsibleSection from '../../components/product/CollapsibleSection';
import { PRODUCTS } from '../../config/products';
import { CartContext } from '../../context/CartContext';

const KueLapisNest = () => {
  const product = PRODUCTS.KUE_LAPIS_NEST;
  const { addItem } = useContext(CartContext);

  const [flavour, setFlavour] = useState('original');
  const [sachetType, setSachetType] = useState('Honey');
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('3-5PM');
  const [instructions, setInstructions] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Get variant ID based on flavour and sachet type
  const getVariantId = () => {
    const variantKey = `${flavour}${sachetType}`;
    return product.variants[variantKey];
  };

  // Get images based on selected flavour
  const getCurrentImages = () => {
    if (flavour === 'original') {
      return product.flavours.original.images;
    } else {
      return product.flavours.prune.images;
    }
  };

  const handleAddToCart = async () => {
    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    setIsAdding(true);

    try {
      const customAttributes = [
        { key: 'Flavour', value: flavour === 'original' ? 'Original' : 'Prune' },
        { key: 'Sachet Type', value: sachetType },
        { key: 'Delivery Date', value: deliveryDate },
        { key: 'Time Slot', value: timeSlot }
      ];

      if (instructions) {
        customAttributes.push({ key: 'Instructions', value: instructions });
      }

      const variantId = getVariantId();
      await addItem(variantId, quantity, customAttributes);
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
          <div>
            <ProductCarousel images={getCurrentImages()} autoPlay={true} />
          </div>

          <div className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div>
              <h1 className="font-playfair-bold text-3xl md:text-4xl mb-2 text-wellness-dark">
                {product.name}
              </h1>
              <p className="font-source-sans text-wellness-text text-sm uppercase tracking-wide">
                {product.category}
              </p>
              <p className="mt-2 text-sm font-source-sans text-wellness-text">
                {product.fixedSize}
              </p>
            </div>

            {/* Flavour Selection - Radio Buttons */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark text-sm mb-3">
                Select Kue Lapis Flavour
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`border-2 p-4 cursor-pointer text-center transition-all ${
                    flavour === 'original'
                      ? 'border-wellness-rose bg-wellness-blush'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="flavour"
                    value="original"
                    checked={flavour === 'original'}
                    onChange={() => setFlavour('original')}
                    className="sr-only"
                  />
                  <div className="font-nunito-regular text-wellness-dark font-semibold">
                    Original
                  </div>
                  <div className="text-xs font-source-sans text-wellness-text mt-1">
                    Classic flavor
                  </div>
                </label>

                <label
                  className={`border-2 p-4 cursor-pointer text-center transition-all ${
                    flavour === 'prune'
                      ? 'border-wellness-rose bg-wellness-blush'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="flavour"
                    value="prune"
                    checked={flavour === 'prune'}
                    onChange={() => setFlavour('prune')}
                    className="sr-only"
                  />
                  <div className="font-nunito-regular text-wellness-dark font-semibold">
                    Prune
                  </div>
                  <div className="text-xs font-source-sans text-wellness-text mt-1">
                    Rich & fruity
                  </div>
                </label>
              </div>
            </div>

            {/* Sachet Type Selection - Dropdown */}
            <div>
              <label className="block font-nunito-regular text-wellness-dark text-sm mb-2">
                Bird's Nest Sachet Type
              </label>
              <select
                value={sachetType}
                onChange={(e) => setSachetType(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 font-source-sans text-wellness-dark focus:outline-none focus:ring-2 focus:ring-wellness-rose"
              >
                <option value="Honey">Honey (For Children)</option>
                <option value="RockSugar">Rock Sugar (For Elderly)</option>
                <option value="ZeroSugar">Zero Sugar (For Pregnant Ladies & Diabetics)</option>
              </select>
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
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>
              <p className="text-sm font-source-sans text-wellness-text">
                Fixed price: ${product.price} per set
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
                  Experience the perfect combination of traditional Indonesian Kue Lapis with our
                  premium bird's nest. This unique pairing brings together two wellness traditions
                  in one delightful package.
                </p>
                <p className="mb-3">
                  Each set includes 6 bottles (50ml each) of your chosen bird's nest sachet type
                  (Honey, Rock Sugar, or Zero Sugar) paired with one box of handcrafted Kue Lapis
                  (10x20cm) in either Original or Prune flavor.
                </p>
                <p>
                  Perfect for gifting, special occasions, or treating yourself to a unique wellness
                  experience that combines nutrition with traditional flavors.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="What's Included">
                <p className="mb-3">
                  <strong>Bird's Nest (6 × 50ml bottles):</strong> Your choice of Honey, Rock Sugar,
                  or Zero Sugar sachet. All made with premium Indonesian bird's nest, no preservatives.
                </p>
                <p className="mb-3">
                  <strong>Kue Lapis (1 box, 10x20cm):</strong> Your choice of Original or Prune flavor.
                  Handcrafted using traditional methods with quality ingredients.
                </p>
                <p>
                  <strong>Total Value:</strong> Fixed price of ${product.price} per complete set.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Storage & Consumption">
                <p className="mb-3">
                  <strong>Bird's Nest:</strong> Refrigerate immediately at 4°C. Consume within 10-14
                  days for optimal freshness. Ready to drink straight from the bottle.
                </p>
                <p className="mb-3">
                  <strong>Kue Lapis:</strong> Store at room temperature in a cool, dry place. Best
                  consumed within 7 days. Can be refrigerated to extend freshness.
                </p>
                <p>
                  <strong>Serving Suggestion:</strong> Enjoy the Kue Lapis with a bottle of bird's
                  nest for a complete wellness treat!
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="Delivery & Gift Options">
                <p className="mb-3">
                  <strong>Delivery:</strong> Island-wide across Singapore. Choose between 3-5PM or
                  7-9PM time slots. Free delivery for orders above $120.
                </p>
                <p className="mb-3">
                  <strong>Gift Packaging:</strong> This set comes beautifully packaged, making it
                  perfect for gifting to loved ones.
                </p>
                <p>
                  <strong>Notice Period:</strong> Minimum 24 hours advance notice required for delivery
                  to ensure freshness of both items.
                </p>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KueLapisNest;
