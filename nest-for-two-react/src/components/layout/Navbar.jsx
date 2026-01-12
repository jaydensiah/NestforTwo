import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline, IoMenuOutline, IoChevronDown } from 'react-icons/io5';
import AnnouncementBar from './AnnouncementBar';
import MobileMenu from './MobileMenu';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-white">
        {/* Announcement Bar */}
        <AnnouncementBar />

        {/* Main Navigation Bar */}
        <nav className="h-20 border-b border-custom-border bg-white">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
            {/* Mobile: Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-wellness-dark hover:text-wellness-rose transition-colors duration-200"
              aria-label="Open menu"
            >
              <IoMenuOutline className="text-2xl" />
            </button>

            {/* Brand Logo */}
            <Link
              to="/"
              className="font-didot text-2xl md:text-3xl text-wellness-dark tracking-wide hover:text-wellness-rose transition-colors duration-200"
            >
              NEST FOR TWO
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Products with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsProductsDropdownOpen(true)}
                onMouseLeave={() => setIsProductsDropdownOpen(false)}
              >
                <button className="flex items-center space-x-1 text-wellness-dark font-nunito-regular text-sm tracking-wide hover:text-wellness-rose transition-colors duration-200 py-2">
                  <span>PRODUCTS</span>
                  <IoChevronDown className="text-base" />
                </button>

                {/* Dropdown Menu */}
                {isProductsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-custom-border shadow-lg rounded-md overflow-hidden">
                    <Link
                      to="/products/freshly-cooked"
                      className="block px-4 py-3 text-wellness-text font-nunito-light text-sm hover:bg-custom-dropdownHover hover:text-wellness-rose transition-colors duration-200"
                    >
                      Freshly Cooked
                    </Link>
                    <Link
                      to="/products/dried"
                      className="block px-4 py-3 text-wellness-text font-nunito-light text-sm hover:bg-custom-dropdownHover hover:text-wellness-rose transition-colors duration-200"
                    >
                      Dried
                    </Link>
                    <Link
                      to="/products/kue-lapis"
                      className="block px-4 py-3 text-wellness-text font-nunito-light text-sm hover:bg-custom-dropdownHover hover:text-wellness-rose transition-colors duration-200"
                    >
                      Kue Lapis
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className="text-wellness-dark font-nunito-regular text-sm tracking-wide hover:text-wellness-rose transition-colors duration-200"
              >
                ABOUT
              </Link>
              <Link
                to="/collaborations"
                className="text-wellness-dark font-nunito-regular text-sm tracking-wide hover:text-wellness-rose transition-colors duration-200"
              >
                COLLABORATIONS
              </Link>
              <Link
                to="/faqs"
                className="text-wellness-dark font-nunito-regular text-sm tracking-wide hover:text-wellness-rose transition-colors duration-200"
              >
                FAQS
              </Link>
              <Link
                to="/contact"
                className="text-wellness-dark font-nunito-regular text-sm tracking-wide hover:text-wellness-rose transition-colors duration-200"
              >
                CONTACT
              </Link>
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="p-2 text-wellness-dark hover:text-wellness-rose transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <IoCartOutline className="text-2xl" />
              {/* Cart count badge - can be implemented later */}
              {/* <span className="absolute -top-1 -right-1 bg-wellness-rose text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span> */}
            </Link>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-30" /> {/* 40px announcement + 80px nav = 120px (h-30) */}
    </>
  );
};

export default Navbar;
