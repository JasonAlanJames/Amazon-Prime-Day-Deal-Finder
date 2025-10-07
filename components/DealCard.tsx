
import React from 'react';
import { ProductDeal } from '../types';

interface DealCardProps {
  deal: ProductDeal;
}

const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      <div className="relative">
        <img 
          src={`https://picsum.photos/seed/${deal.productName}/400/300`} 
          alt={deal.productName} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 font-bold text-lg px-4 py-2 rounded-bl-lg">
          {deal.discountPercentage}% OFF
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-100 mb-2 h-14 overflow-hidden">{deal.productName}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{deal.description}</p>
        <div className="flex items-baseline justify-between mb-4">
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
