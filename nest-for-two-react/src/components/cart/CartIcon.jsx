import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import { CartContext } from '../../context/CartContext';

const CartIcon = () => {
  const { itemCount } = useContext(CartContext);

  return (
    <Link to="/cart" className="relative inline-flex items-center">
      <FiShoppingCart className="w-6 h-6 text-wellness-dark hover:text-wellness-rose transition-colors duration-200" />

      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-wellness-rose text-white text-xs font-nunito-regular font-semibold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
