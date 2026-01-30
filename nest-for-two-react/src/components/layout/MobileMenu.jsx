import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  IoClose,
  IoChevronForward,
  IoHomeOutline,
  IoBagOutline,
  IoInformationCircleOutline,
  IoHelpCircleOutline,
  IoChatbubbleEllipsesOutline,
  IoCartOutline,
  IoGridOutline,
  IoGiftOutline,
  IoLeafOutline,
  IoCafeOutline,
  IoLayersOutline
} from 'react-icons/io5';
import { CartContext } from '../../context/CartContext';

const MobileMenu = ({ isOpen, onClose }) => {
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const { itemCount } = useContext(CartContext);

  const shopCategories = [
    { to: '/shop', label: 'All Products', icon: IoGridOutline },
    { to: '/shop?category=signature-bottle', label: 'Signature Bottle Series', icon: IoCafeOutline },
    { to: '/shop?category=signature-gift', label: 'Signature Gift Set Series', icon: IoGiftOutline },
    { to: '/shop?category=premium-dried', label: 'Premium Dried Series', icon: IoLeafOutline },
    { to: '/shop?category=kue-lapis', label: 'Traditional Kue Lapis Series', icon: IoLayersOutline }
  ];

  const mainLinks = [
    { to: '/', label: 'Home', icon: IoHomeOutline },
    { to: '/about', label: 'About', icon: IoInformationCircleOutline },
    { to: '/faqs', label: 'FAQs', icon: IoHelpCircleOutline },
    { to: '/contact', label: 'Contact', icon: IoChatbubbleEllipsesOutline }
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? 'bg-opacity-50 visible' : 'bg-opacity-0 invisible'
        }`}
        onClick={onClose}
      />

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-out overflow-hidden flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with Logo & Close */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link
            to="/"
            onClick={onClose}
            className="font-didot text-xl text-wellness-dark tracking-wide"
          >
            NEST FOR TWO
          </Link>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            aria-label="Close menu"
          >
            <IoClose className="text-2xl text-wellness-dark" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Cart Quick Access */}
          <Link
            to="/cart"
            onClick={onClose}
            className="flex items-center mx-4 mt-4 p-4 bg-wellness-blush/50 rounded-lg hover:bg-wellness-blush transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <IoCartOutline className="text-2xl text-wellness-rose" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-wellness-rose text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </div>
              <span className="font-nunito-regular text-wellness-dark">
                MY CART
              </span>
            </div>
          </Link>

          {/* Main Navigation */}
          <nav className="px-4 mt-6">
            <p className="px-2 mb-3 text-xs font-source-sans font-semibold text-gray-400 uppercase tracking-wider">
              Menu
            </p>

            {/* Home Link */}
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-4 px-3 py-3.5 rounded-lg text-wellness-dark hover:bg-gray-50 transition-colors duration-200 group"
            >
              <IoHomeOutline className="text-xl text-gray-400 group-hover:text-wellness-rose transition-colors" />
              <span className="font-nunito-regular">HOME</span>
            </Link>

            {/* Shop with Expandable Submenu */}
            <div>
              <button
                onClick={() => setIsShopExpanded(!isShopExpanded)}
                className="w-full flex items-center gap-4 px-3 py-3.5 rounded-lg text-wellness-dark hover:bg-gray-50 transition-colors duration-200 group"
              >
                <IoBagOutline className="text-xl text-gray-400 group-hover:text-wellness-rose transition-colors" />
                <span className="font-nunito-regular flex-1 text-left">SHOP</span>
                <IoChevronForward
                  className={`text-lg text-gray-400 transition-transform duration-200 ${
                    isShopExpanded ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {/* Submenu with smooth animation */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isShopExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="ml-4 pl-4 border-l-2 border-wellness-blush space-y-1 py-2">
                  {shopCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <Link
                        key={category.to}
                        to={category.to}
                        onClick={onClose}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-wellness-blush/30 hover:text-wellness-dark transition-colors duration-200"
                      >
                        <IconComponent className="text-lg text-wellness-rose/70" />
                        <span className="font-source-sans text-sm">{category.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Other Main Links */}
            {mainLinks.slice(1).map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className="flex items-center gap-4 px-3 py-3.5 rounded-lg text-wellness-dark hover:bg-gray-50 transition-colors duration-200 group"
                >
                  <IconComponent className="text-xl text-gray-400 group-hover:text-wellness-rose transition-colors" />
                  <span className="font-nunito-regular">{link.label.toUpperCase()}</span>
                </Link>
              );
            })}
          </nav>
        </div>

      </div>
    </>
  );
};

export default MobileMenu;
