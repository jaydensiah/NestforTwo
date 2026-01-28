import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose, IoChevronDown, IoChevronUp } from 'react-icons/io5';

const MobileMenu = ({ isOpen, onClose }) => {
  const [isShopExpanded, setIsShopExpanded] = useState(false);

  if (!isOpen) return null;

  const shopCategories = [
    { to: '/shop', label: 'All Products' },
    { to: '/shop?category=signature-bottle', label: 'Signature Bottle Series' },
    { to: '/shop?category=signature-gift', label: 'Signature Gift Set Series' },
    { to: '/shop?category=premium-dried', label: 'Premium Dried Series' },
    { to: '/shop?category=kue-lapis', label: 'Traditional Kue Lapis Series' }
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-in Menu */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Close Button */}
        <div className="flex justify-end p-4 border-b border-custom-border">
          <button
            onClick={onClose}
            className="p-2 hover:bg-wellness-blush rounded-full transition-colors duration-200"
            aria-label="Close menu"
          >
            <IoClose className="text-2xl text-wellness-dark" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-6">
          {/* Home */}
          <Link
            to="/"
            onClick={onClose}
            className="py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
          >
            HOME
          </Link>

          {/* Shop with Submenu */}
          <div className="mb-2">
            <button
              onClick={() => setIsShopExpanded(!isShopExpanded)}
              className="w-full flex items-center justify-between py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
            >
              <span>SHOP</span>
              {isShopExpanded ? (
                <IoChevronUp className="text-lg" />
              ) : (
                <IoChevronDown className="text-lg" />
              )}
            </button>

            {/* Expandable Submenu */}
            {isShopExpanded && (
              <div className="pl-4 mt-2 space-y-2 border-l-2 border-wellness-blush">
                {shopCategories.map((category) => (
                  <Link
                    key={category.to}
                    to={category.to}
                    onClick={onClose}
                    className="block py-2 text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About */}
          <Link
            to="/about"
            onClick={onClose}
            className="py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
          >
            ABOUT
          </Link>

          {/* Collaborations */}
          <Link
            to="/collaborations"
            onClick={onClose}
            className="py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
          >
            COLLABORATIONS
          </Link>

          {/* FAQs */}
          <Link
            to="/faqs"
            onClick={onClose}
            className="py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
          >
            FAQS
          </Link>

          {/* Contact */}
          <Link
            to="/contact"
            onClick={onClose}
            className="py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
