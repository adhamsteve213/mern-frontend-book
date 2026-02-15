import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

const Wishlist = () => {
  const { wishlist, addToCart, toggleWishlist, message } = useContext(CartContext);

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {message && <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{message}</div>}
      {wishlist.length === 0 ? (
        <div>No items in wishlist yet</div>
      ) : (
        <ul className="space-y-4">
          {wishlist.map(item => (
            <li key={item.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-gray-500">${item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => addToCart(item)} className="bg-blue-600 text-white px-3 py-1 rounded">Add to cart</button>
                <button onClick={() => toggleWishlist(item)} className="px-3 py-1 bg-red-100 text-red-500 rounded">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
