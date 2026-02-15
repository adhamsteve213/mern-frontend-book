
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyOrders from './pages/MyOrders';
import AdminDashboard from './pages/AdminDashboard';
import Books from './pages/Books';
import Contact from './pages/Contact';
import About from './pages/About';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [search, setSearch] = React.useState('');
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const closeSidebar = () => setSidebarOpen(false);
  
  return (
    <AuthProvider>
      <CartProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} onSearch={setSearch} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar onSearch={setSearch} isOpen={sidebarOpen} onToggle={toggleSidebar} />
            <main className="flex-1 bg-gray-50 overflow-y-auto transition-all duration-300 flex flex-col">
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home search={search} />} />
                  <Route path="/books" element={<Books search={search} />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/orders" element={<MyOrders />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  {/* OAuth removed; no auth success route */}
                </Routes>
              </div>
              <Footer />
            </main>
          </div>
        </div>
      </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
