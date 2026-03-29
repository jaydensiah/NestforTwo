import { useState, useContext, useEffect } from 'react';
import ProductCarousel from '../../components/product/ProductCarousel';
import PurchaseTypeToggle from '../../components/product/PurchaseTypeToggle';
import SizeSelector from '../../components/product/SizeSelector';
import SweetnessLevelSelector from '../../components/product/SweetnessLevelSelector';
import QuantitySelector from '../../components/product/QuantitySelector';
import DatePicker from '../../components/product/DatePicker';
import TimeSlotSelector from '../../components/product/TimeSlotSelector';
import CollapsibleSection from '../../components/product/CollapsibleSection';
import { PRODUCTS } from '../../config/products';
import { CartContext } from '../../context/CartContext';
import { formatDateShort } from '../../utils/dateHelpers';

const ProductHoney = () => {
  const product = PRODUCTS.HONEY;
  const { addItem } = useContext(CartContext);

  // Set page title and scroll to top
  useEffect(() => {
    document.title = "Nest for Two - Shop";
    window.scrollTo(0, 0);
  }, []);

  const [size, setSize] = useState('50ml');
  const [sweetness, setSweetness] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('1-5PM');
  const [isAdding, setIsAdding] = useState(false);
  const [showSweetnessInfo, setShowSweetnessInfo] = useState(false);

  // Get unique size options (dedupe by size)
  const variantOptions = Object.values(product.variants)
    .filter((v, i, arr) => arr.findIndex(x => x.size === v.size) === i);

  // Get current variant
  const sweetnessKey = sweetness === 'side' ? 'Side' : sweetness;
  const variantKey = `oneTime${size}${sweetnessKey}`;
  const currentVariant = product.variants[variantKey];

  const handleAddToCart = async () => {
    if (!sweetness) {
      alert('Please select a Sweetness Level');
      return;
    }

    if (!deliveryDate) {
      alert('Please select a delivery date');
      return;
    }

    setIsAdding(true);

    try {
      const customAttributes = [
        { key: 'Delivery Date', value: formatDateShort(deliveryDate) },
        { key: 'Time Slot', value: timeSlot }
      ];

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

          <div className="space-y-6 bg-white pt-0 pb-6">
            <div>
              <h1 className="font-playfair-bold mb-2 text-wellness-dark text-[20px] sm:text-[30px]">
                {product.name}
              </h1>
              {product.label && (
                <p className="mt-2 inline-block bg-wellness-rose text-white px-3 py-1 font-source-sans rounded-full" style={{ fontSize: '12px' }}>
                  {product.label}
                </p>
              )}
            </div>

            <div>
              <label className="block font-source-sans mb-2 uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
                Purchase Type
              </label>
              <PurchaseTypeToggle />
            </div>

            <div className="radio-rose">
              <div className="flex items-center gap-2 mb-3">
                <label className="font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
                  Size
                </label>
              </div>
              <SizeSelector
                options={variantOptions}
                selected={size}
                onChange={setSize}
              />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <label className="font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
                  Sweetness Level
                </label>
                <button
                  type="button"
                  onClick={() => setShowSweetnessInfo(true)}
                  className="w-4 h-4 rounded-full bg-[#B76E79] text-white flex items-center justify-center hover:bg-[#a25d68] transition-colors text-[10px] font-bold"
                  aria-label="Learn more about sweetness levels"
                >
                  ?
                </button>
              </div>
              <SweetnessLevelSelector
                selected={sweetness}
                onChange={setSweetness}
                sideLabel="Honey on the Side"
              />
            </div>

            {/* Sweetness Info Modal */}
            {showSweetnessInfo && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
                onClick={() => setShowSweetnessInfo(false)}
              >
                <div
                  className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-playfair-bold text-lg" style={{ color: '#81775A' }}>
                      About Sweetness Levels
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowSweetnessInfo(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                      aria-label="Close"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="font-source-sans text-[14px] leading-relaxed" style={{ color: '#636260' }}>
                    <p className="mb-4">
                      Based on your selected sweetness level, we will adjust and mix the flavour directly into the bottles during preparation.
                    </p>
                    <p>
                      If you select <span className="font-semibold" style={{ color: '#B76E79' }}>Honey on the Side</span>, we will provide the Honey sachets separately so you can adjust the sweetness to your liking. 6 Honey sachets will be given.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSweetnessInfo(false)}
                    className="mt-6 w-full bg-wellness-rose text-white py-2.5 font-source-sans rounded hover:bg-[#a25d68] transition-colors"
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}

            <div>
              <label className="block font-source-sans mb-2 uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
                Quantity
              </label>
              <QuantitySelector quantity={quantity} onChange={setQuantity} />
            </div>

            <DatePicker
              value={deliveryDate}
              onChange={setDeliveryDate}
            />

            <div className="radio-rose">
              <TimeSlotSelector selected={timeSlot} onChange={setTimeSlot} />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-source-sans" style={{ color: '#636260' }}>
                  Subtotal:
                </span>
                <span className="font-source-sans text-2xl" style={{ color: '#B76E79' }}>
                  {currentVariant ? `$${(currentVariant.price * quantity).toFixed(2)}` : '—'}
                </span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="w-full bg-wellness-rose text-white py-4 font-source-sans text-lg hover:bg-rose-gold-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </button>

            {/* Collapsible Sections */}
            <div className="mt-6">
              <CollapsibleSection title="Description" defaultOpen={true} hideTopBorder={true}>
                <p className="mb-3">
                 We highly recommend our Honey flavoured birdnest to families with young children as it offers a rich, satisfying sweetness that will surely make kids smile.
                </p>
                <p className="mb-3">
                  Each bottle of 50ml contains 3 grams of premium bird's nest (dry weight), with no chemical fragrances, preservatives, additives, artificial colouring and alcohol.
                </p>
              </CollapsibleSection>

              <CollapsibleSection title="WHAT'S INCLUDED">
                <img
                  src="/images/Included_Bottles.png"
                  alt="What's included in your order"
                  className="w-full h-auto rounded-lg"
                />
              </CollapsibleSection>

              <CollapsibleSection title="HOW TO CONSUME YOUR BIRD'S NEST">
                <img
                  src="/images/HTC_Honey_Bottle.png"
                  alt="How to consume your bird's nest"
                  className="w-full h-auto rounded-lg"
                />
              </CollapsibleSection>

              <CollapsibleSection title="HOW TO STORE YOUR BIRD'S NEST">
                <img
                  src="/images/HTS_Bottles.png"
                  alt="How to store your bird's nest"
                  className="w-full h-auto rounded-lg"
                />
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHoney;
