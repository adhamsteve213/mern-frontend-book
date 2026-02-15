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
    <div className="page-container">
      <h2 className="page-title">Checkout</h2>
      <div className="checkout-grid">
        <div className="checkout-card">
          <div className="checkout-fields">
            <input placeholder="First Name" value={form.FirstName} onChange={(e) => setForm({...form, FirstName: e.target.value})} className="checkout-input" />
            <input placeholder="Middle Name" value={form.MiddleName} onChange={(e) => setForm({...form, MiddleName: e.target.value})} className="checkout-input" />
            <input placeholder="Last Name" value={form.LastName} onChange={(e) => setForm({...form, LastName: e.target.value})} className="checkout-input" />
            <input placeholder="Address" value={form.Address} onChange={(e) => setForm({...form, Address: e.target.value})} className="checkout-input" />
            <input placeholder="Zip Code" value={form.ZipCode} onChange={(e) => setForm({...form, ZipCode: e.target.value})} className="checkout-input" />
            <input placeholder="Phone Number" value={form.PhoneNumber} onChange={(e) => setForm({...form, PhoneNumber: e.target.value})} className="checkout-input" />
            <select value={form.PaymentMethod} onChange={(e) => setForm({...form, PaymentMethod: e.target.value})} className="checkout-select">
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Credit Card">Credit Card</option>
            </select>

            {form.PaymentMethod === 'Credit Card' && (
              <>
                <div className="checkout-cc-box">
                  <div className="checkout-cc-header">
                    <span className="checkout-cc-label">Card Information</span>
                    <div className="checkout-cc-icons">
                      <svg style={{width:'2rem',height:'1.25rem'}} viewBox="0 0 32 20" fill="none">
                        <rect width="32" height="20" rx="3" fill="#1434CB"/>
                        <circle cx="12" cy="10" r="5" fill="#EB001B"/>
                        <circle cx="20" cy="10" r="5" fill="#FF5F00"/>
                      </svg>
                      <svg style={{width:'2rem',height:'1.25rem'}} viewBox="0 0 32 20" fill="none">
                        <rect width="32" height="20" rx="3" fill="#0066B2"/>
                        <path d="M18 8h6v4h-6z" fill="#FFA500"/>
                      </svg>
                    </div>
                  </div>
                  
                  <div className="checkout-cc-fields">
                    <div>
                      <label className="checkout-cc-field-label">Card Number</label>
                      <input 
                        placeholder="1234 5678 9012 3456" 
                        value={form.CardNumber} 
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
                          setForm({...form, CardNumber: val});
                        }}
                        className="checkout-cc-input" 
                        maxLength="19"
                      />
                    </div>
                    
                    <div className="checkout-cc-row">
                      <div>
                        <label className="checkout-cc-field-label">Expiry Date</label>
                        <input 
                          placeholder="MM / YY" 
                          value={form.ExpireDate} 
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) val = val.slice(0,2) + ' / ' + val.slice(2,4);
                            setForm({...form, ExpireDate: val});
                          }}
                          className="checkout-cc-input" 
                          maxLength="7"
                        />
                      </div>
                      <div>
                        <label className="checkout-cc-field-label">CVV</label>
                        <input 
                          placeholder="123" 
                          type="password"
                          value={form.CVV} 
                          onChange={(e) => setForm({...form, CVV: e.target.value.replace(/\D/g, '')})} 
                          className="checkout-cc-input" 
                          maxLength="4"
                        />
                      </div>
                    </div>
                    
                    <div className="checkout-cc-secure">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={handleCreditCardSubmit} 
                  disabled={loading} 
                  className="btn-pay"
                >
                  {loading ? 'Processing Payment...' : `Pay $${total}`}
                </button>
              </>
            )}

            {form.PaymentMethod === 'Cash on Delivery' && (
              <button type="button" onClick={handleCashOnDelivery} disabled={loading} className="btn-order">
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            )}
            {message && <div className={message.includes('successful') || message.includes('successfully') ? 'msg-success' : 'msg-error'}>{message}</div>}
          </div>
        </div>

        <div className="checkout-card">
          <h3 className="checkout-summary-title">Order Summary</h3>
          <ul className="checkout-summary-list">
            {cart.map(item => (
              <li key={item.id} className="checkout-summary-item">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-summary-total">Total: ${total}</div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
