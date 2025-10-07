
import React, { useState, useCallback } from 'react';
import { DealCategory } from './types';
import { fetchPrimeDayDeals } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import DealCard from './components/DealCard';
import SearchProduct from './components/SearchProduct';

const App: React.FC = () => {
  const [dealCategories, setDealCategories] = useState<DealCategory[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchDeals = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setDealCategories(null);
    try {
      const deals = await fetchPrimeDayDeals();
      setDealCategories(deals);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="text-center my-16 bg-red-900/50 border border-red-700 p-6 rounded-lg max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-red-300 mb-2">Oops! Something went wrong.</h2>
          <p className="text-red-200">{error}</p>
        </div>
      );
    }

    if (dealCategories) {
      return (
        <>
          <SearchProduct />
          <div className="space-y-12">
            {dealCategories.map((category) => (
              <section key={category.categoryName}>
                <h2 className="text-3xl font-bold text-gray-100 mb-6 border-l-4 border-cyan-400 pl-4">
                  {category.categoryName}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.deals.map((deal) => (
                    <DealCard key={deal.productName} deal={deal} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </>
      );
    }

    return (
      <div className="text-center my-16">
        <button
          onClick={handleFetchDeals}
          disabled={isLoading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl py-4 px-10 rounded-full shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Searching...' : 'Find Prime Day Deals'}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <main>
          {renderContent()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;