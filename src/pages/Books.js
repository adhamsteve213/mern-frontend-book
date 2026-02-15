import React, { useContext, useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { CartContext } from '../contexts/CartContext';
import api from '../api';
import productsData from '../assets/products';

const Books = ({ search: searchProp = '' }) => {
  const { addToCart, toggleWishlist, wishlist } = useContext(CartContext);
  const [remoteProducts, setRemoteProducts] = useState(null);
  const search = (searchProp || '').toLowerCase();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setRemoteProducts(res.data.products || []);
      } catch (err) {
        setRemoteProducts(null);
      }
    };
    fetchProducts();
  }, []);

  const productList = useMemo(() => {
    const list = Array.isArray(remoteProducts) && remoteProducts.length ? remoteProducts : productsData;
    return list.map(p => ({
      id: p._id || p.id,
      name: p.title || p.name,
      description: p.description || p.description,
      price: p.price || p.price,
      image: p.image || p.image,
      inStock: p.inStock || p.inStock,
    }));
  }, [remoteProducts]);

  const filteredProducts = useMemo(() => {
    if (!search) return productList;
    return productList.filter(p =>
      p.name.toLowerCase().includes(search) ||
      (p.description || '').toLowerCase().includes(search)
    );
  }, [productList, search]);

  return (
    <div className="books-page">
      <div className="books-header">
        <div>
          <h1 className="books-title">All Books</h1>
          <p className="books-subtitle">Browse the full collection. Add to cart, wishlist, or tap any card to open details.</p>
        </div>
        <div className="books-count">{filteredProducts.length} titles</div>
      </div>

      <div className="books-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            isInWishlist={!!wishlist.find(w => w.id === product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Books;
