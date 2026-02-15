import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [form, setForm] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Address: '',
    ZipCode: '',
    PhoneNumber: '',
    PaymentMethod: 'Cash on Delivery',
    CardNumber: '',
    CVV: '',
    ExpireDate: ''
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleCashOnDelivery = async () => {
    if (!form.FirstName || !form.LastName || !form.Address || !form.ZipCode || !form.PhoneNumber) {
      setMessage('Please fill in all required personal and address details.');
      return;
    }
    if (cart.length === 0) {
      setMessage('Your cart is empty. Please add items before checking out.');
      return;
    }
    if (!user?.id) {
      setMessage('Please login to place order');
      return;
    }

    setLoading(true);
    try {
      const items = cart.filter(c => c.id != null).map(c => ({
        productId: String(c.id),
        quantity: c.quantity,
        price: c.price
      }));

      const payload = {
        userId: user.id,
        ...form,
        totalAmount: parseFloat(total),
        items
      };

      const res = await api.post('/checkout', payload);
      if (res?.data) {
        clearCart();
        setMessage('Order placed successfully (Cash).');
        try {
          await api.post('/orders', {
            userId: payload.userId,
            checkoutId: res.data._id,
            items,
            totalAmount: payload.totalAmount,
            shippingAddress: payload.Address
          });
        } catch (err) { /* ignore */ }
        navigate('/orders');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error creating checkout: ' + (err?.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const handleCreditCardSubmit = async () => {
    setMessage(null);
    
    if (!form.FirstName || !form.LastName || !form.Address || !form.ZipCode || !form.PhoneNumber) {
      setMessage('Please fill in all required personal and address details.');
      return;
    }
    if (!form.CardNumber || !form.CVV || !form.ExpireDate) {
      setMessage('Please fill in all credit card details.');
      return;
    }
    if (cart.length === 0) {
      setMessage('Your cart is empty. Please add items before checking out.');
      return;
    }
    if (!user?.id) {
      setMessage('Please login to place order');
      return;
    }

    setLoading(true);
    try {
      const items = cart.filter(c => c.id != null).map(c => ({
        productId: String(c.id),
        quantity: c.quantity,
        price: c.price
      }));

      const payload = {
        userId: user.id,
        ...form,
        totalAmount: parseFloat(total),
        items
      };

      const res = await api.post('/checkout', payload);
      if (res?.data) {
        clearCart();
        setMessage('Order placed successfully with Credit Card.');
        try {
          await api.post('/orders', {
            userId: payload.userId,
            checkoutId: res.data._id,
            items,
            totalAmount: payload.totalAmount,
            shippingAddress: payload.Address
          });
        } catch (err) { /* ignore */ }
        navigate('/orders');
      }
    } catch (err) {
      console.error(err);
      setMessage('Error processing payment: ' + (err?.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="grid grid-cols-1 gap-3">
            <input placeholder="First Name" value={form.FirstName} onChange={(e) => setForm({...form, FirstName: e.target.value})} className="border rounded px-3 py-2" />
            <input placeholder="Middle Name" value={form.MiddleName} onChange={(e) => setForm({...form, MiddleName: e.target.value})} className="border rounded px-3 py-2" />
            <input placeholder="Last Name" value={form.LastName} onChange={(e) => setForm({...form, LastName: e.target.value})} className="border rounded px-3 py-2" />
            <input placeholder="Address" value={form.Address} onChange={(e) => setForm({...form, Address: e.target.value})} className="border rounded px-3 py-2" />
            <input placeholder="Zip Code" value={form.ZipCode} onChange={(e) => setForm({...form, ZipCode: e.target.value})} className="border rounded px-3 py-2" />
            <input placeholder="Phone Number" value={form.PhoneNumber} onChange={(e) => setForm({...form, PhoneNumber: e.target.value})} className="border rounded px-3 py-2" />
            <select value={form.PaymentMethod} onChange={(e) => setForm({...form, PaymentMethod: e.target.value})} className="border rounded px-3 py-2">
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
            </select>

            {form.PaymentMethod === 'Credit Card' && (
              <>
                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 mt-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Card Information</span>
                    <div className="flex gap-1">
                      <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                        <rect width="32" height="20" rx="3" fill="#1434CB"/>
                        <circle cx="12" cy="10" r="5" fill="#EB001B"/>
                        <circle cx="20" cy="10" r="5" fill="#FF5F00"/>
                      </svg>
                      <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                        <rect width="32" height="20" rx="3" fill="#0066B2"/>
                        <path d="M18 8h6v4h-6z" fill="#FFA500"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Card Number</label>
                      <input 
                        placeholder="1234 5678 9012 3456" 
                        value={form.CardNumber} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                          setForm({...form, CardNumber: val});
                        }}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono" 
                        maxLength="19"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Expiry Date</label>
                        <input 
                          placeholder="MM / YY" 
                          value={form.ExpireDate} 
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) val = val.slice(0,2) + ' / ' + val.slice(2,4);
                            setForm({...form, ExpireDate: val});
                          }}
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono" 
                          maxLength="7"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
                        <input 
                          placeholder="123" 
                          type="password"
                          value={form.CVV} 
                          onChange={(e) => setForm({...form, CVV: e.target.value.replace(/\D/g, '')})} 
                          className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono" 
                          maxLength="4"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 pt-2">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-xs text-gray-600">Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleCreditCardSubmit} 
                  disabled={loading} 
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg mt-4 font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing Payment...' : `Pay $${total}`}
                </button>
              </>
            )}

            {form.PaymentMethod === 'Cash on Delivery' && (
              <button type="button" onClick={handleCashOnDelivery} disabled={loading} className="bg-blue-600 text-white px-3 py-2 rounded mt-2 disabled:bg-gray-400">
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            )}
            {message && <div className={`mt-2 ${message.includes('successful') || message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-bold">Order Summary</h3>
          <ul className="mt-3 space-y-2">
            {cart.map(item => (
              <li key={item.id} className="flex items-center justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold">Total: ${total}</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
