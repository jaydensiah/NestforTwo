import { useContext, useState } from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { CartContext } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useContext(CartContext);
  const [isUpdating, setIsUpdating] = useState(false);

  // Extract custom attributes
  const getCustomAttribute = (key) => {
    const attr = item.customAttributes?.find(attr => attr.key === key);
    return attr?.value || '';
  };

  const deliveryDate = getCustomAttribute('Delivery Date');
  const timeSlot = getCustomAttribute('Time Slot');

  // Handle quantity update
  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    try {
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle item removal
  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await removeItem(item.id);
    } catch (error) {
      console.error('Failed to remove item:', error);
      setIsUpdating(false);
    }
  };

  // Calculate line total
  const lineTotal = parseFloat(item.variant.price.amount) * item.quantity;

  return (
    <div className="flex gap-4 py-6 border-b border-gray-200 last:border-b-0">
      {/* Product Thumbnail */}
      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
        {item.variant.image ? (
          <img
            src={item.variant.image.src}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            {/* Product Name */}
            <h3 className="font-nunito-regular text-wellness-dark font-semibold text-base mb-1">
              {item.title}
            </h3>

            {/* Variant, Delivery Date and Time Slot */}
            <div className="text-sm text-wellness-text space-y-1">
              {item.variant.title !== 'Default Title' && (
                <p>{item.variant.title}</p>
              )}
              {deliveryDate && (
                <p>Delivery: {deliveryDate}</p>
              )}
              {timeSlot && (
                <p>Time: {timeSlot}</p>
              )}
            </div>
          </div>
        </div>

        {/* Quantity Selector and Remove Button */}
        <div className="mt-4 flex items-center justify-between">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <FiMinus className="w-4 h-4 text-wellness-dark" />
            </button>

            <span className="px-4 py-2 min-w-[3rem] text-center font-nunito-regular text-wellness-dark">
              {item.quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <FiPlus className="w-4 h-4 text-wellness-dark" />
            </button>
          </div>

          {/* Line Total and Remove Button - Centered */}
          <div className="flex items-center justify-center gap-4">
            <p className="font-nunito-regular text-wellness-dark font-bold text-lg">
              ${lineTotal.toFixed(2)}
            </p>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              disabled={isUpdating}
              className="p-2 text-wellness-rose hover:bg-wellness-blush rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Remove item"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
