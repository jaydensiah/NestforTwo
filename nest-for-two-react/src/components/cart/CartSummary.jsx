import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Button from '../ui/Button';

const FREE_DELIVERY_THRESHOLD = 120;

const CartSummary = () => {
  const { cart, checkout } = useContext(CartContext);

  if (!cart || !cart.lineItems || cart.lineItems.length === 0) {
    return null;
  }

  // Calculate subtotal
  const subtotal = cart.lineItems.reduce((total, item) => {
    return total + (parseFloat(item.variant.price.amount) * item.quantity);
  }, 0);

  // Calculate delivery fee
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 10;

  // Calculate amount needed for free delivery
  const amountForFreeDelivery = FREE_DELIVERY_THRESHOLD - subtotal;

  // Calculate total
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    checkout();
  };

  return (
    <div className="bg-wellness-cream border border-gray-200 rounded-lg p-6 sticky top-24">
      <h2 className="font-playfair-bold text-wellness-dark text-2xl mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        {/* Subtotal */}
        <div className="flex justify-between text-wellness-text font-nunito-regular">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Delivery Fee */}
        <div className="flex justify-between text-wellness-text font-nunito-regular">
          <span>Delivery</span>
          <span className={deliveryFee === 0 ? 'text-wellness-rose font-semibold' : ''}>
            {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>

        {/* Free Delivery Message */}
        {amountForFreeDelivery > 0 && (
          <div className="pt-2 border-t border-gray-200">
            <p className="text-sm text-wellness-rose font-nunito-regular">
              Add ${amountForFreeDelivery.toFixed(2)} more for free delivery!
            </p>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-between text-wellness-dark font-nunito-regular font-bold text-xl pt-4 border-t border-gray-300">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        size="lg"
        onClick={handleCheckout}
        className="w-full"
      >
        Proceed to Checkout
      </Button>

      {/* Additional Info */}
      <p className="text-xs text-wellness-text text-center mt-4 font-nunito-regular">
        Taxes and additional fees calculated at checkout
      </p>
    </div>
  );
};

export default CartSummary;
