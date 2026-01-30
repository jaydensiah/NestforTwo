import { useState, useContext, useEffect } from 'react';
import ProductCarousel from '../../components/product/ProductCarousel';
import QuantitySelector from '../../components/product/QuantitySelector';
import DatePicker from '../../components/product/DatePicker';
import TimeSlotSelector from '../../components/product/TimeSlotSelector';
import CollapsibleSection from '../../components/product/CollapsibleSection';
import { PRODUCTS } from '../../config/products';
import { CartContext } from '../../context/CartContext';

const Dried250g = () => {
  const product = PRODUCTS.DRIED_250G;
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('1-5PM');
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

      await addItem(product.variant.id, quantity, customAttributes);
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
              <p className="mt-2 inline-block bg-wellness-rose text-white px-3 py-1 font-source-sans rounded-full" style={{ fontSize: '12px' }}>
                SAVE {product.savings}
              </p>
            </div>

            {/* Size - Fixed, Pre-selected with Savings Badge */}
            <div>
              <label className="block font-source-sans mb-2 uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
                Size
              </label>
              <div className="border border-gray-200 p-4 rounded relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-wellness-rose flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-wellness-rose"></div>
                    </div>
                    <span className="font-source-sans text-wellness-dark font-medium">
                      {product.fixedSize}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 font-source-sans text-[14px] line-through mr-2">
                      ${product.originalPrice}
                    </span>
                    <span className="font-source-sans text-[18px]" style={{ color: '#B76E79' }}>
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-source-sans mb-2 uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
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
            <div className="radio-rose">
              <TimeSlotSelector selected={timeSlot} onChange={setTimeSlot} />
            </div>

            {/* Subtotal */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-source-sans" style={{ color: '#636260' }}>
                  Subtotal:
                </span>
                <div className="text-right">
                  {quantity > 1 && (
                    <span className="text-gray-400 font-source-sans text-base line-through mr-2">
                      ${(product.originalPrice * quantity).toFixed(2)}
                    </span>
                  )}
                  <span className="font-source-sans text-2xl" style={{ color: '#B76E79' }}>
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
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
                           <img
                             src="/images/Dried_Description.png"
                             alt="More info about dried bird's nest"
                             className="w-full h-auto rounded-lg"
                           />
                         </CollapsibleSection>
           
           
                         <CollapsibleSection title="HOW TO OPEN THE CONTAINER">
                           <img
                             src="/images/Dried_HTO.png"
                             alt="How to open the container"
                             className="w-full h-auto rounded-lg"
                           />
                         </CollapsibleSection>
           
                         <CollapsibleSection title="HOW TO STORE YOUR BIRD'S NEST">
                           <img
                             src="/images/Dried_HTS.png"
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

export default Dried250g;
