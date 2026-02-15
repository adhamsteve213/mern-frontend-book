import React, { useContext, useEffect, useMemo, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import productsData from '../assets/products';
import api from '../api';
import ProductCard from '../components/ProductCard';

const shimmerGradient = 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500';

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
    <div className="min-h-screen bg-gray-50">
      <section className={`relative overflow-hidden ${shimmerGradient} text-white px-6 py-12 md:px-12 md:py-16`}> 
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_25%),radial-gradient(circle_at_80%_0%,white,transparent_20%),radial-gradient(circle_at_50%_80%,white,transparent_20%)]" />
        <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="inline-flex items-center px-3 py-1 bg-white/15 border border-white/25 rounded-full text-sm">New • Winter reading list</span>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">Discover bold stories, vivid art, and the books everyone is talking about.</h1>
            <p className="text-lg text-white/90">Swipe through animated picks, tap into curated collections, and fill your cart in a few clicks.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#booksbar" className="bg-white text-indigo-700 font-semibold px-4 py-2 rounded shadow hover:translate-y-[-2px] transition-transform">Browse all books</a>
              <a href="#curated" className="border border-white/60 text-white px-4 py-2 rounded hover:bg-white/10 transition-colors">View editor picks</a>
            </div>
            {message && <div className="mt-2 inline-block bg-white/15 border border-white/20 text-white px-3 py-1 rounded">{message}</div>}
          </div>
          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-white/30 animate-pulse" />
            <div className="relative grid grid-cols-2 gap-4">
              {featured.slice(0,4).map((p, idx) => (
                <div key={p.id || idx} className="bg-white/10 backdrop-blur rounded-xl p-3 shadow-lg border border-white/20 transform hover:-translate-y-1 transition-transform">
                  <div className="h-28 w-full rounded-lg overflow-hidden bg-white/20">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="mt-2 text-sm font-semibold line-clamp-2">{p.name}</div>
                  <div className="text-xs text-white/80">${p.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-10 py-10" id="booksbar">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Drawings & designs book bar</h2>
            <p className="text-gray-500">Every product in one animated ribbon—swipe through illustrations, design picks, and vibrant covers.</p>
          </div>
          <div className="text-sm text-gray-600">{filteredProducts.length} titles</div>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max snap-x snap-mandatory animate-pulse">
            {filteredProducts.map(product => (
              <div key={product.id} className="snap-start w-72 shrink-0">
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

      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-10" id="featured">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Animated carousel</h2>
            <p className="text-gray-500">Loop through illustrated, design-heavy picks with a smooth card carousel.</p>
          </div>
          <div className="text-sm text-gray-600">{featured.length} picks</div>
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max snap-x snap-mandatory">
            {featured.map(product => (
              <div key={product.id} className="snap-start w-72 shrink-0 transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]">
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

      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-12" id="curated">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Card carousel</h2>
            <p className="text-gray-500">Stacked cards for fast browsing—tap any design-forward cover to open details.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> Live
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <section className="max-w-6xl mx-auto px-6 md:px-10 pb-14" id="suggestions">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">You might also like</h2>
            <p className="text-gray-500">Fresh suggestions generated from our catalog.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
