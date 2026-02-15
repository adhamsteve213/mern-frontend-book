import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../assets/products';
import api from '../api';
import { useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist, message } = useContext(CartContext);
  const [remoteProduct, setRemoteProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        if (res.data?.product) setRemoteProduct(res.data.product);
      } catch (err) {
        setRemoteProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  const product = remoteProduct ? {
    id: remoteProduct._id,
    name: remoteProduct.title || remoteProduct.name,
    price: remoteProduct.price,
    image: remoteProduct.image,
    description: remoteProduct.description,
    inStock: remoteProduct.inStock,
  } : productsData.find(p => String(p.id) === id);

  if (!product) return <div className="page-container">Product not found</div>;

  const isInWishlist = !!wishlist.find(w => String(w.id) === String(product.id));
  return (
    <div className="product-details-page">
      {message && <div className="product-details-message">{message}</div>}
      <div className="product-details-layout">
        <img src={product.image} alt={product.name} className="product-details-img" />
        <div className="product-details-info">
          <h2 className="product-details-name">{product.name}</h2>
          <p className="product-details-desc">{product.description}</p>
          <div className="product-details-actions">
            <span className="product-details-price">${product.price}</span>
            <button onClick={() => addToCart(product)} className="btn-add-cart">Add to cart</button>
            <button onClick={() => toggleWishlist(product)} className={`btn-wish ${isInWishlist ? 'btn-wish--active' : 'btn-wish--inactive'}`}>❤️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
