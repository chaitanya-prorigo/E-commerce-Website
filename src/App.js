import Login from './components/login';
import './App.css';
import Product from './components/product';
import CartItems from './components/cartItems';
import { CartProvider } from './context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/cart" element={<CartItems />} />
                </Routes>
            </Router>
        </CartProvider>
    )
}

export default App;
