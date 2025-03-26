import { Link } from 'react-router-dom';

function Nav() {

  return (
    <nav className="bg-blue-600 p-4 w-full">
      <div className=" mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Mi App</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">Home</Link>
          <Link to="/login" className="text-white hover:text-gray-300">Login</Link>
          <Link to="/register" className="text-white hover:text-gray-300">Registrarse</Link>
          <Link to="/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
          <Link to="/ordenes" className="text-white hover:text-gray-300">Ordenes</Link>
          <Link to="/cart"  className="text-white hover:text-gray-300">Ver carrito</Link>


        </div>
      </div>
    </nav>
  );



}

export default Nav;

