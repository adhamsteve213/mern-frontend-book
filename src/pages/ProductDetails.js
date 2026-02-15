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

  if (!product) return <div className="p-8">Product not found</div>;

  const isInWishlist = !!wishlist.find(w => String(w.id) === String(product.id));
  return (
    <div className="p-8 min-h-screen">
      {message && <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{message}</div>}
      <div className="flex flex-col md:flex-row gap-8">
        <img src={product.image} alt={product.name} className="w-full md:w-1/3 rounded shadow" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="mt-4">
            <span className="font-bold text-xl mr-4">${product.price}</span>
            <button onClick={() => addToCart(product)} className="bg-blue-600 text-white px-4 py-2 rounded">Add to cart</button>
            <button onClick={() => toggleWishlist(product)} className={`ml-2 ${isInWishlist ? 'text-red-600' : 'text-gray-400'}`}>❤️</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
