import React, { useState } from 'react';
import { ProductDeal } from '../types';

interface DealCardProps {
  deal: ProductDeal;
}

// Base64 encoded placeholder image provided by the user
const placeholderImage =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAEAAQADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAn/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD/tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//Z';

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const renderImage = () => {
    if (imageError || !deal.imageUrl) {
      return (
        <div className="relative aspect-square w-full bg-gray-800">
          <img
            src={placeholderImage}
            alt="Loading product image..."
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 font-bold text-sm px-3 py-1 rounded-md shadow-lg">
            {deal.discountPercentage}% OFF
          </div>
        </div>
      );
    }
    return (
      <div className="relative">
        <img
          src={deal.imageUrl}
          alt={deal.productName}
          className="aspect-square w-full object-cover"
          onError={handleImageError}
        />
        <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 font-bold text-sm px-3 py-1 rounded-md shadow-lg">
          {deal.discountPercentage}% OFF
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      {renderImage()}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-100 mb-2 h-14 overflow-hidden">{deal.productName}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{deal.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-cyan-400">${deal.salePrice.toFixed(2)}</span>
            <span className="text-lg text-gray-500 line-through">${deal.originalPrice.toFixed(2)}</span>
          </div>
        </div>
        <a
          href={deal.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto block w-full bg-blue-600 text-white text-center font-bold py-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          View Deal
        </a>
      </div>
    </div>
  );
};

export default DealCard;