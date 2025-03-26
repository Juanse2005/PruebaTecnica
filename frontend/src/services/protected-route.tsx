import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { token } = useAuth();
  const idRol = Number(localStorage.getItem('id_rol')); // Obtén el rol desde localStorage y conviértelo a número

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {idRol === 1 && (
        <Outlet />
      )}
      {idRol !== 1 && (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default ProtectedRoute;