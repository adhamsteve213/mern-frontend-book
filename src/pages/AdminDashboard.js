import React, { useState, useEffect } from 'react';
import api from '../api';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const [form, setForm] = useState({ title: '', description: '', price: '', inStock: true, category: ''});
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  if (!user?.isAdmin) {
    return (
      <div className="p-8">
        <h3 className="text-xl font-bold">Admin access required</h3>
        <p className="mt-2">You need to be an admin to view this page.</p>
      </div>
    );
  }

  const handleImageUpload = async () => {
    if (!imageFile) return null;
    const fd = new FormData();
    fd.append('image', imageFile);
    const res = await api.post('/products/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    return res?.data?.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      let imageUrl = '';
      if (imageFile) imageUrl = await handleImageUpload();

      const payload = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        image: imageUrl || '',
        inStock: !!form.inStock,
        category: form.category
      };

      await api.post('/products', payload);
      setMessage('Product added');
      setForm({ title: '', description: '', price: '', inStock: true, category: ''});
      setImageFile(null);
      // Refresh list
      try { const res2 = await api.get('/products'); setProducts(res2.data.products || []); } catch (e) {}
    } catch (err) {
      setMessage('Failed to add product: ' + (err?.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete product?')) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) { console.error(err); }
  };

  const startEdit = (prod) => {
    setEditingId(prod._id);
    setForm({ title: prod.title, description: prod.description, price: prod.price, inStock: prod.inStock, category: prod.category });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingId) return;
    try {
      const payload = { title: form.title, description: form.description, price: Number(form.price), image: '', inStock: !!form.inStock, category: form.category };
      const res = await api.put(`/products/${editingId}`, payload);
      setProducts(prev => prev.map(p => p._id === editingId ? res.data.product : p));
      setEditingId(null);
      setForm({ title: '', description: '', price: '', inStock: true, category: ''});
      setMessage('Product updated');
    } catch (err) {
      setMessage('Failed to update product: ' + (err?.response?.data?.message || err.message));
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <form onSubmit={editingId ? handleUpdate : handleSubmit} className="bg-white p-4 rounded shadow max-w-lg">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="border rounded w-full px-3 py-2 mb-3" />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className="border rounded w-full px-3 py-2 mb-3"></textarea>
        <input placeholder="Price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="border rounded w-full px-3 py-2 mb-3" />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({...form, category: e.target.value})} className="border rounded w-full px-3 py-2 mb-3" />
        <div className="mb-3">
          <label className="block text-sm mb-1">Image</label>
          <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
        </div>
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">{editingId ? 'Update Product' : 'Add Product'}</button>
        {message && <p className="mt-2">{message}</p>}
      </form>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Products</h3>
        <ul className="space-y-3">
          {products.map(p => (
            <li key={p._id} className="bg-white p-3 rounded shadow flex items-center justify-between">
              <div>
                <h4 className="font-bold">{p.title}</h4>
                <div className="text-sm text-gray-500">${p.price} — {p.category}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => startEdit(p)} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
