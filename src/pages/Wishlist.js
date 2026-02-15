import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Wishlist = () => {
  const { wishlist, addToCart, toggleWishlist, message } = useContext(CartContext);

  return (
    <div className="page-container">
      <h2 className="page-title">Wishlist</h2>
      {message && <div className="product-details-message">{message}</div>}
      {wishlist.length === 0 ? (
        <div>No items in wishlist yet</div>
      ) : (
        <ul className="wishlist-list">
          {wishlist.map(item => (
            <li key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} className="wishlist-item-img" />
              <div className="wishlist-item-info">
                <h4 className="wishlist-item-name">{item.name}</h4>
                <p className="wishlist-item-price">${item.price}</p>
              </div>
              <div className="wishlist-item-actions">
                <button onClick={() => addToCart(item)} className="btn-blue">Add to cart</button>
                <button onClick={() => toggleWishlist(item)} className="btn-red-light">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
