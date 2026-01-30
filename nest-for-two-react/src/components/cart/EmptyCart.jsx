import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Cart Icon */}
      <IoCartOutline className="w-16 h-16 text-[#9E9E9E] mb-6" />

      {/* Message */}
      <h2
        className="font-source-sans mb-3"
        style={{ color: '#636260', fontSize: '20px' }}
      >
        Your cart is empty
      </h2>

      <p
        className="font-source-sans mb-8"
        style={{ color: '#81775A', fontSize: '16px' }}
      >
        Add some delicious bird's nest products to get started
      </p>

      {/* Shop Products Button */}
      <Link
        to="/shop"
        className="font-source-sans text-white px-8 py-3"
        style={{ backgroundColor: '#B76E79', fontSize: '16px' }}
      >
        Shop Products
      </Link>
    </div>
  );
};

export default EmptyCart;
