import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import Nav from './components/nav'
import Dashboard from './pages/dashboard'
import Home from './pages/home';
import Ordenes from './pages/ordenes';
import Register from './pages/register';
import ProtectedRoute from './services/protected-route';
import EditProduct from './pages/editProduct';
import Cart from './pages/cart';
import { CartProvider } from './context/CartContext';

function App() {

  return (
    <CartProvider>

      <Router>
        <Nav />
        <div className="container mx-auto p-4 w-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/ordenes" element={<Ordenes />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </CartProvider>

  )
}

export default App
