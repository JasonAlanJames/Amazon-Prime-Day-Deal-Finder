
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-8 md:py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
        AI Prime Day Deal Finder
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto">
        Discover the best Prime Day deals, categorized and sorted by discount, powered by Gemini.
      </p>
    </header>
  );
};

export default Header;
