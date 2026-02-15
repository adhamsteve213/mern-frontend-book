import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex items-center gap-4 bg-white p-4 rounded shadow">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-500">${item.price} x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-red-500 text-white rounded" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-lg font-bold">Total: ${total}</div>
            <Link to="/checkout" className="bg-green-600 text-white px-4 py-2 rounded">Proceed to Order</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
