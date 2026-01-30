import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = () => {
  const { cart, loading, clearCart } = useContext(CartContext);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      setIsClearing(true);
      try {
        await clearCart();
      } catch (error) {
        console.error('Failed to clear cart:', error);
      } finally {
        setIsClearing(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wellness-rose mx-auto mb-4"></div>
          <p className="font-source-sans text-wellness-text">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const hasItems = cart && cart.lineItems && cart.lineItems.length > 0;

  return (
    <div className="pt-10 pb-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {hasItems ? (
          <>
            {/* Header with Clear Cart button */}
            <div className="relative mb-8">
              <h1 className="font-playfair-bold text-4xl text-center text-wellness-dark">
                Your Cart Items
              </h1>
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-wellness-rose hover:text-red-700 font-source-sans text-sm transition-colors disabled:opacity-50"
              >
                {isClearing ? 'Clearing...' : 'Clear Cart'}
              </button>
            </div>

            {/* Cart Items */}
            <div className="space-y-8">
              <div className="space-y-4">
                {cart.lineItems.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>

              {/* Cart Summary */}
              <CartSummary cart={cart} />
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
