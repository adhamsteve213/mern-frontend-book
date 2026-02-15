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
        className={`w-64 h-screen bg-white shadow-lg fixed left-0 top-0 p-4 flex flex-col z-20 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center gap-2 mb-6">
          <img src={jariridLogo} alt="logo" className="w-12 h-12 object-cover rounded-md" />
          <h1 className="text-xl font-semibold">Jarir Books</h1>
          <button type="button" onClick={onToggle} className="ml-auto p-1 rounded md:hidden hover:bg-gray-100">✕</button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <li><Link to="/" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>Home</Link></li>
            <li><Link to="/books" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>Books</Link></li>
            <li><Link to="/cart" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>Cart</Link></li>
            <li><Link to="/wishlist" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>Wishlist</Link></li>
            <li><Link to="/orders" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>My Orders</Link></li>
            <li><Link to="/about" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>About</Link></li>
            <li><Link to="/contact" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>Contact</Link></li>
            {user?.isAdmin && (
              <li><Link to="/admin" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>Admin</Link></li>
            )}
            {user ? (
              <li><button onClick={() => { handleLogout(); onToggle && onToggle(); }} className="block w-full text-left px-2 py-2 rounded hover:bg-gray-100">Logout</button></li>
            ) : (
              <>
                <li><Link to="/login" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>Login</Link></li>
                <li><Link to="/signup" className="block px-2 py-2 rounded hover:bg-gray-100" onClick={onToggle}>Signup</Link></li>
              </>
            )}
          </ul>
        </nav>

        <form onSubmit={handleSearch} className="mt-auto">
          <label htmlFor="search" className="sr-only">Search books</label>
          <div className="relative">
            <input
              id="search"
              value={query}
              onChange={handleInputChange}
              placeholder="Search books..."
              className="w-full border rounded py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded" type="submit">Search</button>
          </div>
        </form>
      </aside>

      {isOpen && <div className="fixed inset-0 bg-black/40 z-10 md:hidden" onClick={onToggle} />}
    </>
  );
};

export default Sidebar;
