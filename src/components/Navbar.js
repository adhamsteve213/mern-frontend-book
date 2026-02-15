import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products from '../assets/products';
import jariridLogo from '../assets/jaririd.png';

const Navbar = ({ onToggleSidebar, sidebarOpen, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().startsWith(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/product/${product.id}`);
    setQuery('');
    setSuggestions([]);
  };

  const toggleSidebar = () => {
    onToggleSidebar();
  };

  return (
    <nav className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-4 px-4 py-3">
        <button
          type="button"
          onClick={toggleSidebar}
          className={`p-2 rounded-lg transition-colors ${sidebarOpen ? 'bg-red-100 text-red-700' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
          aria-label="Toggle sidebar"
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <img src={jariridLogo} alt="Jarir Books" className="h-10 w-10 object-cover rounded-md" />

        <form onSubmit={handleSearch} className="flex-1 max-w-xs ml-auto">
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search books..."
                className="w-full border border-gray-300 rounded-l-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-3 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
