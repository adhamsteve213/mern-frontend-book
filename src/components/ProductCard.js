import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist = false, compact = false }) => {
  const badge = product.inStock ? 'In stock' : 'Sold out';
  const imageClass = compact ? 'product-card-image-wrap product-card-image-wrap--short' : 'product-card-image-wrap product-card-image-wrap--tall';

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
      className="product-card"
    >
      <div className={imageClass}>
        <img src={product.image} alt={product.name} className="product-card-image" loading="lazy" />
        <button
          type="button"
          aria-label="Toggle wishlist"
          onClick={handleWish}
          className={`product-card-wish-btn ${isInWishlist ? 'product-card-wish-btn--active' : 'product-card-wish-btn--inactive'}`}
        >
          ♥
        </button>
        <span className="product-card-badge">{badge}</span>
      </div>

      <div className="product-card-body">
        <div className="product-card-header">
          <h3 className="product-card-name line-clamp-2">{product.name}</h3>
          <span className="product-card-price">${product.price}</span>
        </div>
        <p className="product-card-desc line-clamp-2">{product.description}</p>

        <div className="product-card-actions">
          <button
            type="button"
            onClick={handleAdd}
            className="product-card-add-btn"
          >
            Add to Cart
          </button>
          <button
            type="button"
            onClick={handleWish}
            className={`product-card-wishlist-btn ${isInWishlist ? 'product-card-wishlist-btn--active' : ''}`}
          >
            {isInWishlist ? 'Saved' : 'Wishlist'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
