import { useState, useContext, useEffect } from 'react';
import SweetnessLevelSelector from '../components/product/SweetnessLevelSelector';
import { PRODUCTS } from '../config/products';
import { CartContext } from '../context/CartContext';

const FLAVOUR_KEY_MAP = {
  'Honey': 'honey',
  'Rock Sugar': 'rockSugar',
  'Zero Sugar': 'zeroSugar'
};

const SWEETNESS_DISPLAY = {
  '25': '25%',
  '50': '50%',
  '100': '100%',
  'side': 'Sugar on the Side'
};

const SpecialOrderBulk180 = () => {
  const product = PRODUCTS.SPECIAL_BULK_180;
  const { addItem } = useContext(CartContext);

  useEffect(() => {
    document.title = "Nest for Two - Special Order";
    window.scrollTo(0, 0);
  }, []);

  const [flavour, setFlavour] = useState('');
  const [sweetness, setSweetness] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const getVariant = () => {
    if (!flavour || !sweetness) return null;
    const key = `${FLAVOUR_KEY_MAP[flavour]}_${sweetness}`;
    return product.variants[key] || null;
  };

  const currentVariant = getVariant();
  const showSubtotal = flavour && sweetness;

  const handleAddToCart = async () => {
    if (!flavour) {
      alert('Please select a Flavour');
      return;
    }
    if (!sweetness) {
      alert('Please select a Sweetness Level');
      return;
    }

    setIsAdding(true);

    try {
      const customAttributes = [
        { key: 'Flavour', value: flavour },
        { key: 'Sweetness Level', value: SWEETNESS_DISPLAY[sweetness] },
        { key: 'Delivery Schedule', value: 'Every 10th, 20th and 30th of the month - 6 months period' }
      ];

      await addItem(currentVariant.id, 1, customAttributes);
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
      <div className="max-w-xl mx-auto">
        <div className="space-y-6 bg-white pt-0 pb-6">
          <div>
            <h1 className="font-playfair-bold mb-2 text-wellness-dark text-[20px] sm:text-[30px]">
              {product.name}
            </h1>
          </div>

          <div>
            <label className="block font-source-sans mb-2 uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
              Size
            </label>
            <div className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-source-sans text-[13px] sm:text-[14px] bg-wellness-rose text-white border-2 border-wellness-rose shadow-md inline-block">
              {product.fixedSize}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
                Flavour
              </label>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {product.flavours.map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFlavour(option)}
                  className={`
                    px-4 sm:px-5 py-2 sm:py-2.5
                    rounded-full
                    font-source-sans
                    text-[13px] sm:text-[14px]
                    transition-all duration-200
                    border-2
                    ${flavour === option
                      ? 'bg-wellness-rose text-white border-wellness-rose shadow-md'
                      : 'bg-white text-[#636260] border-[#d1d5db] hover:border-wellness-rose hover:text-wellness-rose'
                    }
                  `}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <label className="font-source-sans uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
                Sweetness Level
              </label>
            </div>
            <SweetnessLevelSelector
              selected={sweetness}
              onChange={setSweetness}
              sideLabel="Sugar on the Side"
            />
          </div>

          <div>
            <label className="block font-source-sans mb-2 uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
              Quantity
            </label>
            <div className="inline-flex items-center border border-gray-300 rounded-md overflow-hidden">
              <span className="px-5 py-2 font-source-sans text-[14px] text-[#636260] bg-gray-50">
                1
              </span>
            </div>
          </div>

          <div>
            <label className="block font-source-sans mb-2 uppercase text-[12px] sm:text-[14px]" style={{ color: '#81775A' }}>
              Delivery Date
            </label>
            <input
              type="text"
              readOnly
              value="Delivery every 10th, 20th and 30th of the month - 6 months period"
              className="w-full px-4 py-3 border border-gray-300 rounded-md font-source-sans text-[13px] sm:text-[14px] bg-gray-50 cursor-default focus:outline-none"
              style={{ color: '#636260' }}
            />
          </div>

          {showSubtotal && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-source-sans" style={{ color: '#636260' }}>
                  Subtotal:
                </span>
                <span className="font-source-sans text-2xl" style={{ color: '#B76E79' }}>
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-wellness-rose text-white py-4 font-source-sans text-lg hover:bg-rose-gold-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded"
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialOrderBulk180;
