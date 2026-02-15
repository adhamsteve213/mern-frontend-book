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
      <div className="p-8 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>
        <div>Please login to view your orders.</div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div>No Orders yet</div>
      ) : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">Order #{order._id}</h3>
                  <p className="text-gray-500">Total: ${order.totalAmount}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <ul className="mt-3">
                {order.items.map(item => {
                  const product = productsData.find(p => String(p.id) === String(item.productId));
                  return (
                    <li key={item.productId} className="flex items-center justify-between p-2 border rounded my-1">
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
