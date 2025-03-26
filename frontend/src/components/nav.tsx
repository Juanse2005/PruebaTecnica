import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Nav() {
  const { user, logout } = useAuth();
  const idRol = localStorage.getItem("id_rol");

  return (
    <nav className="bg-blue-600 p-4 w-full">
      <div className="mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Mi App</h1>
        <div className="space-x-4">
          {(idRol === "2" || !user) && (
            <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          )}
          {(idRol === "2") && (
            <Link to="/cart" className="text-white hover:text-gray-300">Ver carrito</Link>
          )}

          {!user && (
            <>
              <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-300">Registrarse</Link>
            </>
          )}

          {idRol === "1" && (
            <>
              <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
              <Link to="/ordenes" className="text-white hover:text-gray-300">Ordenes</Link>
            </>
          )}

          {user && (
            <button
              onClick={logout}
              className="text-white hover:text-gray-300"
            >
              Salir
            </button>
          )}
        </div>
      </div>
    </nav >
  );
}

export default Nav;