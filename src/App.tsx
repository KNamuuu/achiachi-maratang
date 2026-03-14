import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Stores from './pages/Stores';
import Partnership from './pages/Partnership';

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="font-body">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/stores" element={<Stores />} />
              <Route path="/partnership" element={<Partnership />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isHome && <Footer />}
    </div>
  );
}
