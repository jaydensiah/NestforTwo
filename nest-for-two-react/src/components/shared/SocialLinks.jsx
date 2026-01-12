import React from 'react';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/nestfortwo.sg',
      icon: <FaInstagram className="w-6 h-6" />,
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/nestfortwo',
      icon: <FaFacebook className="w-6 h-6" />,
    },
    {
      name: 'TikTok',
      url: 'https://tiktok.com/@nestfortwo',
      icon: <FaTiktok className="w-6 h-6" />,
    },
    {
      name: 'Lemon8',
      url: 'https://lemon8-app.com/@nestfortwo',
      icon: <img src="/images/Lemon8.png" alt="Lemon8" className="w-6 h-6" />,
    },
    {
      name: 'Xiaohongshu',
      url: 'https://www.xiaohongshu.com/user/profile/68a03186000000001900d5ff',
      icon: <img src="/images/xiaohongshu.svg" alt="Xiaohongshu" className="w-6 h-6" />,
    },
  ];

  return (
    <div className="flex gap-4 items-center">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-gray-800 rounded-full p-3 shadow-md hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out flex items-center justify-center"
          aria-label={`Visit our ${social.name}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
