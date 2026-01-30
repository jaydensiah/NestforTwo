import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#D8CDCB' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Links */}
        <nav className="flex justify-center space-x-12 mb-10">
          <Link
            to="/shop"
            className="font-nunito-regular font-bold text-sm tracking-widest hover:opacity-70 transition-opacity duration-200"
            style={{ color: '#636260' }}
          >
            SHOP
          </Link>
          <Link
            to="/about"
            className="font-nunito-regular font-bold text-sm tracking-widest hover:opacity-70 transition-opacity duration-200"
            style={{ color: '#636260' }}
          >
            ABOUT
          </Link>
          <Link
            to="/faqs"
            className="font-nunito-regular font-bold text-sm tracking-widest hover:opacity-70 transition-opacity duration-200"
            style={{ color: '#636260' }}
          >
            FAQS
          </Link>
          <Link
            to="/contact"
            className="font-nunito-regular font-bold text-sm tracking-widest hover:opacity-70 transition-opacity duration-200"
            style={{ color: '#636260' }}
          >
            CONTACT
          </Link>
        </nav>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center space-x-5 mb-10">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/nestfortwo.sg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
            aria-label="Instagram"
          >
            <FaInstagram className="text-xl" style={{ color: '#B76E79' }} />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/nestfortwo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
            aria-label="Facebook"
          >
            <FaFacebookF className="text-xl" style={{ color: '#B76E79' }} />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@nestfortwo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200"
            aria-label="TikTok"
          >
            <FaTiktok className="text-xl" style={{ color: '#B76E79' }} />
          </a>

          {/* Lemon8 */}
          <a
            href="https://www.lemon8-app.com/@nestfortwo"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200 overflow-hidden"
            aria-label="Lemon8"
          >
            <img
              src="/images/Lemon8.png"
              alt="Lemon8"
              className="w-12 h-12 object-contain"
            />
          </a>

          {/* Xiao Hong Shu */}
          <a
            href="https://www.xiaohongshu.com/user/profile/68a03186000000001900d5ff"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity duration-200 overflow-hidden"
            aria-label="Xiao Hong Shu"
          >
            <img
              src="/images/XHS.png"
              alt="Xiao Hong Shu"
              className="w-12 h-12 object-contain"
            />
          </a>
        </div>

        {/* Contact Info */}
        <div className="flex justify-center items-center space-x-16 mb-10">
          <a
            href="mailto:contact@nestfortwo.com"
            className="font-nunito-regular text-sm hover:opacity-70 transition-opacity duration-200"
            style={{ color: '#636260' }}
          >
            contact@nestfortwo.com
          </a>
          <a
            href="tel:+6580336503"
            className="font-nunito-regular text-sm hover:opacity-70 transition-opacity duration-200"
            style={{ color: '#636260' }}
          >
            +65 80336503
          </a>
        </div>

        {/* Divider Line */}
        <div className="border-t mb-8" style={{ borderColor: '#C4B8B6' }}></div>

        {/* Copyright */}
        <div className="text-center">
          <p
            className="font-nunito-light text-sm"
            style={{ color: '#636260' }}
          >
            &copy; 2026 Nest For Two. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
