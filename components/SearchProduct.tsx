
import React, { useState } from 'react';

const SearchProduct: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim() === '') {
      return;
    }
    const encodedQuery = encodeURIComponent(query.trim());
    const searchUrl = `https://www.amazon.com/s?k=${encodedQuery}&linkCode=ll2&sr=1-1&tag=product-review-spec-20&th=1`;
    window.open(searchUrl, '_blank', 'noopener,noreferrer');
    setQuery('');
  };

  return (
    <div className="my-12 text-center">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Looking for something specific?</h2>
      <p className="text-gray-400 mb-6 max-w-xl mx-auto">
        If you don't see your desired product in the deals below, use this search to find it on Amazon.
      </p>
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'wireless earbuds'"
          className="flex-grow bg-gray-700 border border-gray-600 text-gray-100 text-lg rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-3 transition"
          aria-label="Search for a product on Amazon"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg py-3 px-6 rounded-lg shadow-md hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50"
          aria-label="Submit search"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchProduct;
