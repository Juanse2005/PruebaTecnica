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
import Layout from './components/layout';
import footer from './components/footer';
import { CartProvider } from './context/CartContext';
import Footer from './components/footer';
import OrdenesDetalle from './pages/ordenes_detalle';

function App() {

  return (
    <CartProvider>

      <Router>
        <Nav />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/ordenes" element={<Ordenes />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
            <Route path="/ordenes_detalle/:id" element={<OrdenesDetalle />} />
          </Route>
        </Routes>
      </Router>
      <Footer />

    </CartProvider>

  )
}

export default App
