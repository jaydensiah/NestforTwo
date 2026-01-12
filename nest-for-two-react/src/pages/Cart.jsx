import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = () => {
  const { cart, loading } = useContext(CartContext);

  if (loading) {
    return (
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-wellness-rose mx-auto mb-4"></div>
          <p className="font-source-sans text-wellness-text">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const hasItems = cart && cart.lineItems && cart.lineItems.length > 0;

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-wellness-cream min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-playfair-bold text-4xl mb-8 text-center text-wellness-dark">
          Shopping Cart
        </h1>

        {hasItems ? (
          <div className="space-y-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {cart.lineItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Cart Summary */}
            <CartSummary cart={cart} />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default Cart;
