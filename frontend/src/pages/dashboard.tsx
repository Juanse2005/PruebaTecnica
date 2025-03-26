import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductos } from "../services/service"; 

const Dashboard = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    getProductos()
      .then((response) => {
        setProductos(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar los productos.");
        setIsLoading(false);
        console.error("Error:", err);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6 text-center">Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-3 px-6 border-b text-left text-gray-700">ID</th>
              <th className="py-3 px-6 border-b text-left text-gray-700">Nombre</th>
              <th className="py-3 px-6 border-b text-left text-gray-700">Valor</th>
              <th className="py-3 px-6 border-b text-left text-gray-700">Editar</th>
              <th className="py-3 px-6 border-b text-left text-gray-700">Eliminar</th>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {productos.length > 0 ? (
              productos.map((producto) => (
                <tr key={producto.id_producto} className="hover:bg-gray-100">
                  <td className="py-3 px-6 border-b text-gray-600">{producto.id_producto}</td>
                  <td className="py-3 px-6 border-b text-gray-600">{producto.nombre}</td>
                  <td className="py-3 px-6 border-b text-gray-600">{producto.valor}</td>
                  <td className="py-3 px-6 border-b text-gray-600 text-center">
                    <Link to={`/edit-product/${producto.id_producto}`}>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                        Editar
                      </button>
                    </Link>
                  </td>
                  <td className="py-3 px-6 border-b text-gray-600 text-center">
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-3 px-6 text-center text-gray-600">
                  No se encontraron productos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
