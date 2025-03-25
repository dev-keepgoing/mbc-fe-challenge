import React from 'react';
import logo from '../assets/logo.png'

const CardInfo: React.FC = () => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-gray-800">
    <img
        className="w-full h-48 object-contain"
        src={logo}
        alt="Card image"
    />
    <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">Card Title</h2>
        <p className="text-gray-700 text-base">
        This is a short description about the content inside the card. It's styled with padding and spacing using Tailwind utilities.
        </p>
    </div>
    </div>
  );
};

export default CardInfo;