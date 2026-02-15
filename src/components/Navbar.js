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
    <nav className="navbar">
      <div className="navbar-inner">
        <button
          type="button"
          onClick={toggleSidebar}
          className={`navbar-toggle ${sidebarOpen ? 'navbar-toggle--open' : 'navbar-toggle--closed'}`}
          aria-label="Toggle sidebar"
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <svg className="navbar-toggle-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <img src={jariridLogo} alt="Jarir Books" className="navbar-logo" />

        <form onSubmit={handleSearch} className="navbar-search">
          <div className="navbar-search-row">
            <div className="navbar-search-wrap">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search books..."
                className="navbar-search-input"
              />
              {suggestions.length > 0 && (
                <ul className="navbar-suggestions">
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="navbar-suggestion-item"
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button
              type="submit"
              className="navbar-search-btn"
              aria-label="Search"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
