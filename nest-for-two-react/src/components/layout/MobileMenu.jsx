import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoClose, IoChevronDown, IoChevronUp } from 'react-icons/io5';

const MobileMenu = ({ isOpen, onClose }) => {
  const [isProductsExpanded, setIsProductsExpanded] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-in Menu */}
      <div className="fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out">
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
          {/* Products with Submenu */}
          <div className="mb-2">
            <button
              onClick={() => setIsProductsExpanded(!isProductsExpanded)}
              className="w-full flex items-center justify-between py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
            >
              <span>PRODUCTS</span>
              {isProductsExpanded ? (
                <IoChevronUp className="text-lg" />
              ) : (
                <IoChevronDown className="text-lg" />
              )}
            </button>

            {/* Expandable Submenu */}
            {isProductsExpanded && (
              <div className="pl-4 mt-2 space-y-2 border-l-2 border-wellness-blush">
                <Link
                  to="/products/freshly-cooked"
                  onClick={onClose}
                  className="block py-2 text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
                >
                  Freshly Cooked
                </Link>
                <Link
                  to="/products/dried"
                  onClick={onClose}
                  className="block py-2 text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
                >
                  Dried
                </Link>
                <Link
                  to="/products/kue-lapis"
                  onClick={onClose}
                  className="block py-2 text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
                >
                  Kue Lapis
                </Link>
              </div>
            )}
          </div>

          {/* Other Navigation Links */}
          <Link
            to="/about"
            onClick={onClose}
            className="py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
          >
            ABOUT
          </Link>
          <Link
            to="/collaborations"
            onClick={onClose}
            className="py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
          >
            COLLABORATIONS
          </Link>
          <Link
            to="/faqs"
            onClick={onClose}
            className="py-3 text-wellness-dark font-nunito-regular text-base hover:text-wellness-rose transition-colors duration-200"
          >
            FAQS
          </Link>
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
