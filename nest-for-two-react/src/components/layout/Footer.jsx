import React from 'react';
import { Link } from 'react-router-dom';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter } from 'react-icons/io5';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-custom-footerBg border-t border-custom-border">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="font-didot text-2xl text-wellness-dark tracking-wide">
              NEST FOR TWO
            </h3>
            <p className="text-wellness-text font-nunito-light text-sm leading-relaxed">
              Premium bird's nest products crafted with care for your wellness journey.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-nunito-regular text-wellness-dark text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to="/shipping"
                className="text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
              >
                SHIPPING
              </Link>
              <Link
                to="/faqs"
                className="text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
              >
                FAQ
              </Link>
              <Link
                to="/collaborations"
                className="text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
              >
                COLLABORATIONS
              </Link>
              <Link
                to="/contact"
                className="text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
              >
                CONTACT US
              </Link>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="font-nunito-regular text-wellness-dark text-sm tracking-wider uppercase">
              Connect With Us
            </h4>
            <div className="space-y-3">
              <a
                href="mailto:contact@nestfortwo.com"
                className="block text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
              >
                contact@nestfortwo.com
              </a>

              {/* Social Media Icons */}
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wellness-text hover:text-wellness-rose transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <IoLogoFacebook className="text-2xl" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wellness-text hover:text-wellness-rose transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <IoLogoInstagram className="text-2xl" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wellness-text hover:text-wellness-rose transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <IoLogoTwitter className="text-2xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-custom-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-wellness-text font-nunito-light text-sm">
              &copy; {currentYear} Nest For Two. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-wellness-text font-nunito-light text-sm hover:text-wellness-rose transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
