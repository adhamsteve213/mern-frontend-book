import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import productsData from '../assets/products';
import api from '../api';
import ProductCard from '../components/ProductCard';

const Home = ({ search: searchProp = '' }) => {
  const { addToCart, toggleWishlist, wishlist, message } = useContext(CartContext);
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

  const featured = filteredProducts.slice(0, 10);
  const curatedGrid = filteredProducts.slice(10, 22);
  const suggestions = filteredProducts.slice(22, 34);

  return (
    <div className="home">
      <section className="home-hero"> 
        <div className="home-hero-overlay" />
        <div className="home-hero-inner">
          <div className="home-hero-text">
            <span className="home-hero-badge">New • Winter reading list</span>
            <h1 className="home-hero-title">Discover bold stories, vivid art, and the books everyone is talking about.</h1>
            <p className="home-hero-subtitle">Swipe through animated picks, tap into curated collections, and fill your cart in a few clicks.</p>
            <div className="home-hero-actions">
              <a href="#booksbar" className="home-hero-btn-primary">Browse all books</a>
              <a href="#curated" className="home-hero-btn-secondary">View editor picks</a>
            </div>
            {message && <div className="home-hero-message">{message}</div>}
          </div>
          <div className="home-hero-cards">
            <div className="home-hero-cards-blur" />
            <div className="home-hero-cards-grid">
              {featured.slice(0,4).map((p, idx) => (
                <div key={p.id || idx} className="home-hero-card">
                  <div className="home-hero-card-img">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <div className="home-hero-card-title line-clamp-2">{p.name}</div>
                  <div className="home-hero-card-price">${p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home-section" id="booksbar">
        <div className="home-section-header">
          <div>
            <h2 className="home-section-title">Drawings & designs book bar</h2>
            <p className="home-section-subtitle">Every product in one animated ribbon—swipe through illustrations, design picks, and vibrant covers.</p>
          </div>
          <div className="home-section-count">{filteredProducts.length} titles</div>
        </div>
        <div className="home-scroll-wrap">
          <div className="home-scroll-inner">
            {filteredProducts.map(product => (
              <div key={product.id} className="home-scroll-item">
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={!!wishlist.find(w => w.id === product.id)}
                  compact
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" id="featured">
        <div className="home-section-header">
          <div>
            <h2 className="home-section-title">Animated carousel</h2>
            <p className="home-section-subtitle">Loop through illustrated, design-heavy picks with a smooth card carousel.</p>
          </div>
          <div className="home-section-count">{featured.length} picks</div>
        </div>
        <div className="home-scroll-wrap">
          <div className="home-scroll-inner">
            {featured.map(product => (
              <div key={product.id} className="home-scroll-item home-scroll-item--animated">
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={!!wishlist.find(w => w.id === product.id)}
                  compact
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" id="curated">
        <div className="home-section-header">
          <div>
            <h2 className="home-section-title">Card carousel</h2>
            <p className="home-section-subtitle">Stacked cards for fast browsing—tap any design-forward cover to open details.</p>
          </div>
          <div className="home-section-live">
            <span className="home-live-dot" /> Live
          </div>
        </div>
        <div className="home-grid-3">
          {curatedGrid.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isInWishlist={!!wishlist.find(w => w.id === product.id)}
            />
          ))}
        </div>
      </section>

      <section className="home-section" id="suggestions">
        <div className="home-section-header">
          <div>
            <h2 className="home-section-title">You might also like</h2>
            <p className="home-section-subtitle">Fresh suggestions generated from our catalog.</p>
          </div>
        </div>
        <div className="home-grid-4">
          {suggestions.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              isInWishlist={!!wishlist.find(w => w.id === product.id)}
              compact
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
