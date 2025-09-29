import Login from './components/login';
import './App.css';
import Product from './components/product';
import CartItems from './components/cartItems';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext';


function App() {

  return (
    <CartProvider>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/product" element={<Product />} />
            <Route path="/cart" element={<CartItems />} />
          </Routes>
        </Router>
      </SearchProvider>
    </CartProvider>
  )
}

export default App;
