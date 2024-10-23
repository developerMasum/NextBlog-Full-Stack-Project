import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTumblr,
  FaTiktok,
  FaVimeoV,
} from 'react-icons/fa';

const socialIcons = [
  { icon: <FaFacebookF />, link: '#' },

  { icon: <FaInstagram />, link: '#' },
  { icon: <FaPinterestP />, link: '#' },
  { icon: <FaVimeoV />, link: '#' },
  { icon: <FaTumblr />, link: '#' },
  { icon: <FaTiktok />, link: '#' },
];

const ConnectAndFollow = () => {
  return (
    <div className="bg-white border border-gray-300 p-6 rounded-md">
      <h2 className="text-xl font-bold text-center mb-4 border-b-2 border-gray-300 pb-2">
        Connect & Follow
      </h2>
      <div className="flex justify-center space-x-4">
        {socialIcons.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:border-gray-500 text-gray-600 hover:text-blue-600 transition-colors"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ConnectAndFollow;
