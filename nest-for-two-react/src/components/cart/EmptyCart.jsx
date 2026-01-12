import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import Button from '../ui/Button';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon */}
      <div className="mb-6 p-8 bg-wellness-blush rounded-full">
        <FiShoppingBag className="w-16 h-16 text-wellness-rose" />
      </div>

      {/* Message */}
      <h2 className="font-playfair-bold text-wellness-dark text-3xl mb-3">
        Your cart is empty
      </h2>

      <p className="text-wellness-text font-nunito-regular text-lg mb-8 max-w-md">
        Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
      </p>

      {/* Shop Products Button */}
      <Link to="/">
        <Button variant="primary" size="lg">
          Shop Products
        </Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
