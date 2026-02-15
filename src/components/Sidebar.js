import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import jariridLogo from '../assets/jaririd.png';
import products from '../assets/products';

const Sidebar = ({ onSearch, isOpen, onToggle }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
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

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : 'sidebar--closed'}`}
      >
        <div className="sidebar-header">
          <img src={jariridLogo} alt="logo" className="sidebar-logo" />
          <h1 className="sidebar-title">Jarir Books</h1>
          <button type="button" onClick={onToggle} className="sidebar-close">✕</button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/" className="sidebar-link" onClick={onToggle}>Home</Link></li>
            <li><Link to="/books" className="sidebar-link" onClick={onToggle}>Books</Link></li>
            <li><Link to="/cart" className="sidebar-link" onClick={onToggle}>Cart</Link></li>
            <li><Link to="/wishlist" className="sidebar-link" onClick={onToggle}>Wishlist</Link></li>
            <li><Link to="/orders" className="sidebar-link" onClick={onToggle}>My Orders</Link></li>
            <li><Link to="/about" className="sidebar-link" onClick={onToggle}>About</Link></li>
            <li><Link to="/contact" className="sidebar-link" onClick={onToggle}>Contact</Link></li>
            {user?.isAdmin && (
              <li><Link to="/admin" className="sidebar-link" onClick={onToggle}>Admin</Link></li>
            )}
            {user ? (
              <li><button onClick={() => { handleLogout(); onToggle && onToggle(); }} className="sidebar-logout-btn">Logout</button></li>
            ) : (
              <>
                <li><Link to="/login" className="sidebar-link" onClick={onToggle}>Login</Link></li>
                <li><Link to="/signup" className="sidebar-link" onClick={onToggle}>Signup</Link></li>
              </>
            )}
          </ul>
        </nav>

        <form onSubmit={handleSearch} className="sidebar-search">
          <label htmlFor="search" className="sr-only">Search books</label>
          <div className="sidebar-search-wrap">
            <input
              id="search"
              value={query}
              onChange={handleInputChange}
              placeholder="Search books..."
              className="sidebar-search-input"
            />
            {suggestions.length > 0 && (
              <ul className="sidebar-search-suggestions">
                {suggestions.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="sidebar-search-suggestion"
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
            <button className="sidebar-search-btn" type="submit">Search</button>
          </div>
        </form>
      </aside>

      {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
    </>
  );
};

export default Sidebar;
