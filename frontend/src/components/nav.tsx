import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Nav() {
  const { user, logout } = useAuth();
  const idRol = Number(localStorage.getItem("id_rol")); // Convierte a número para evitar errores

  const handleLogout = () => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas cerrar sesión?");
    if (confirmacion) {
      logout();
    }
  };



  return (
    <nav className="bg-blue-600 p-4 w-full">
      <div className="container mx-auto max-w-screen-xl flex flex-wrap justify-between items-center">
        <h1 className="text-white text-2xl font-bold">NUT SHOP</h1>

        <div className="flex items-center space-x-4 p-2">
          {(idRol === 2 || !user) && (
            <Link to="/" className="text-white hover:text-gray-300 transition">Home</Link>
          )}
          {idRol === 2 && (
            <Link to="/cart" className="text-white hover:text-gray-300 transition">Ver carrito</Link>
          )}
          {!user && (
            <>
              <Link to="/login" className="text-white hover:text-gray-300 transition">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300 transition">Registrarse</Link>
            </>
          )}
          {idRol === 1 && (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-300 transition">Dashboard</Link>
              <Link to="/ordenes" className="text-white hover:text-gray-300 transition">Órdenes</Link>
            </>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Salir
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
