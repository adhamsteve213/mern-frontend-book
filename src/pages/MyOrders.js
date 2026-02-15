import React, { useEffect, useState, useContext } from 'react';
import { api } from '../api';
import { AuthContext } from '../contexts/AuthContext';
import productsData from '../assets/products';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user?.id) {
      const fetchOrders = async () => {
        try {
          const res = await api.get(`/orders/user/${user.id}`);
          setOrders(res.data || []);
        } catch (err) {
          console.error(err);
        }
      };
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="page-container">
        <h2 className="page-title">My Orders</h2>
        <div>Please login to view your orders.</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h2 className="page-title">My Orders</h2>
      {orders.length === 0 ? (
        <div>No Orders yet</div>
      ) : (
        <ul className="orders-list">
          {orders.map(order => (
            <li key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3 className="order-id">Order #{order._id}</h3>
                  <p className="order-total">Total: ${order.totalAmount}</p>
                </div>
                <div>
                  <span className="order-date">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <ul className="order-items">
                {order.items.map(item => {
                  const product = productsData.find(p => String(p.id) === String(item.productId));
                  return (
                    <li key={item.productId} className="order-item">
                      <div>{product ? product.name : `Product ${item.productId}`}</div>
                      <div>Qty: {item.quantity}</div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
