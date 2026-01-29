import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoCartOutline, IoMenuOutline } from 'react-icons/io5';
import AnnouncementBar from './AnnouncementBar';
import MobileMenu from './MobileMenu';

// NavLink component with active state and hover underline effect
const NavLink = ({ to, children, isActive }) => {
  return (
    <Link
      to={to}
      className={`relative font-source-sans font-bold text-sm tracking-wide py-2 group ${
        isActive ? 'text-wellness-rose' : 'text-wellness-dark'
      }`}
    >
      {children}
      {/* Animated underline - only shows on hover, loads from left to right, halfway width */}
      <span
        className="absolute bottom-0 left-0 h-0.5 bg-wellness-rose transition-all duration-300 ease-out w-0 group-hover:w-1/2"
      />
    </Link>
  );
};

// Shop dropdown image card component
const ShopDropdownCard = ({ to, image, label }) => {
  return (
    <Link
      to={to}
      className="relative block overflow-hidden group"
    >
      {/* Image - Recommended size: 300x400px */}
      <img
        src={image}
        alt={label}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {/* Text at bottom left */}
      <div className="absolute bottom-2 left-4 right-4">
        <span className="text-white font-source-sans font-bold text-sm tracking-wide">
          {label}
        </span>
      </div>
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false);
  const location = useLocation();

  // Check if current path matches
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
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
              {/* HOME */}
              <NavLink to="/" isActive={isActive('/')}>
                HOME
              </NavLink>

              {/* SHOP with Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsShopDropdownOpen(true)}
                onMouseLeave={() => setIsShopDropdownOpen(false)}
              >
                <Link
                  to="/shop"
                  className={`relative font-source-sans font-bold text-sm tracking-wide py-2 group ${
                    isActive('/shop') ? 'text-wellness-rose' : 'text-wellness-dark'
                  }`}
                >
                  SHOP
                  {/* Animated underline - only shows on hover */}
                  <span
                    className="absolute bottom-0 left-0 h-0.5 bg-wellness-rose transition-all duration-300 ease-out w-0 group-hover:w-1/2"
                  />
                </Link>

                {/* Shop Dropdown Menu - Full width with 4 image columns */}
                <div
                  className={`fixed left-0 right-0 bg-white border-b border-gray-200 shadow-xl transition-all duration-300 ${
                    isShopDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  style={{ top: '120px' }}
                >
                  <div className="max-w-6xl mx-auto px-8 py-6">
                    <div className="grid grid-cols-4 gap-4">
                      <ShopDropdownCard
                        to="/shop?category=signature-bottle"
                        image="/images/NavBar_Bottles.png"
                        label="Signature Bottle Series"
                      />
                      <ShopDropdownCard
                        to="/shop?category=signature-gift"
                        image="/images/NavBar_Gift.png"
                        label="Signature Gift Set Series"
                      />
                      <ShopDropdownCard
                        to="/shop?category=premium-dried"
                        image="/images/NavBar_Dried.png"
                        label="Premium Dried Series"
                      />
                      <ShopDropdownCard
                        to="/shop?category=kue-lapis"
                        image="/images/NavBar_Kue.png"
                        label="Traditional Kue Lapis Series"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ABOUT */}
              <NavLink to="/about" isActive={isActive('/about')}>
                ABOUT
              </NavLink>

              {/* FAQS */}
              <NavLink to="/faqs" isActive={isActive('/faqs')}>
                FAQS
              </NavLink>

              {/* CONTACT */}
              <NavLink to="/contact" isActive={isActive('/contact')}>
                CONTACT
              </NavLink>
            </div>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="p-2 text-wellness-dark hover:text-wellness-rose transition-colors duration-200 relative"
              aria-label="Shopping cart"
            >
              <IoCartOutline className="text-2xl" />
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
