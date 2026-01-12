import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/shared/WhatsAppButton';

// Pages
import Home from './pages/Home';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Partnerships from './pages/Partnerships';

// Product Pages
import ProductHoney from './pages/products/ProductHoney';
import ProductZeroSugar from './pages/products/ProductZeroSugar';
import ProductRockSugar from './pages/products/ProductRockSugar';
import ProductDried from './pages/products/ProductDried';
import KueLapisNest from './pages/products/KueLapisNest';
import OriginalKueLapis from './pages/products/OriginalKueLapis';
import PruneKueLapis from './pages/products/PruneKueLapis';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-wellness-cream">
          {/* Fixed Navbar with Announcement Bar */}
          <Navbar />

          {/* Main Content - Add top padding to account for fixed navbar (80px nav + 40px announcement = 120px) */}
          <main className="flex-grow mt-[120px]">
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />

              {/* Cart */}
              <Route path="/cart" element={<Cart />} />

              {/* Information Pages */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/partnerships" element={<Partnerships />} />

              {/* Product Pages - Freshly Cooked */}
              <Route path="/products/honey" element={<ProductHoney />} />
              <Route path="/products/zero-sugar" element={<ProductZeroSugar />} />
              <Route path="/products/rock-sugar" element={<ProductRockSugar />} />

              {/* Product Pages - Dried */}
              <Route path="/products/dried" element={<ProductDried />} />

              {/* Product Pages - Kue Lapis */}
              <Route path="/products/kue-lapis-nest" element={<KueLapisNest />} />
              <Route path="/products/original-kue-lapis" element={<OriginalKueLapis />} />
              <Route path="/products/prune-kue-lapis" element={<PruneKueLapis />} />

              {/* Catch-all route for debugging */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-white">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-lg mb-2">No routes matched location: {window.location.pathname}</p>
                    <p className="text-sm text-gray-600">Check console for debugging info</p>
                  </div>
                </div>
              } />
            </Routes>
          </main>

          {/* Footer */}
          <Footer />

          {/* WhatsApp Sticky Button - Hidden on cart page */}
          <WhatsAppButton />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
