import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist = false, compact = false }) => {
  const badge = product.inStock ? 'In stock' : 'Sold out';
  const imageHeight = compact ? 'h-40' : 'h-56';

  const handleAdd = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onAddToCart(product);
  };

  const handleWish = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleWishlist(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-transform transform hover:-translate-y-1 duration-300"
    >
      <div className={`relative ${imageHeight} w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200`}>
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
        <button
          type="button"
          aria-label="Toggle wishlist"
          onClick={handleWish}
          className={`absolute top-2 right-2 rounded-full px-2 py-1 text-sm shadow ${isInWishlist ? 'bg-white text-red-500' : 'bg-black/60 text-white'}`}
        >
          ♥
        </button>
        <span className="absolute bottom-2 left-2 text-xs font-semibold px-2 py-1 bg-white/85 rounded-full text-gray-700 shadow">{badge}</span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold line-clamp-2 text-gray-900">{product.name}</h3>
          <span className="text-indigo-600 font-bold">${product.price}</span>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-2 mt-2">
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleWish}
            className={`px-3 py-2 rounded-lg border ${isInWishlist ? 'border-red-400 text-red-500' : 'border-gray-200 text-gray-600'} hover:border-indigo-300 hover:text-indigo-700 transition-colors`}
          >
            {isInWishlist ? 'Saved' : 'Wishlist'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
