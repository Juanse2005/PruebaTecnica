import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrden } from "../services/service";

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    getOrden()
      .then((response) => {
        setOrdenes(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar las órdenes.");
        setIsLoading(false);
        console.error("Error:", err);
      });
  }, []);

  if (isLoading) {
    return <div className="text-center">Cargando órdenes...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container">
        <h1 className="text-2xl font-semibold mb-6 text-center">Órdenes</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 border-b text-left text-gray-700">ID</th>
                <th className="py-3 px-6 border-b text-left text-gray-700">Fecha</th>
                <th className="py-3 px-6 border-b text-left text-gray-700">Total</th>
                <th className="py-3 px-6 border-b text-left text-gray-700">Ver detalle</th>
              </tr>
            </thead>
            <tbody className="bg-gray-50">
              {ordenes.length > 0 ? (
                ordenes.map((orden) => (
                  <tr key={orden.id_orden} className="hover:bg-gray-100">
                    <td className="py-3 px-6 border-b text-gray-600">{orden.id_orden}</td>
                    <td className="py-3 px-6 border-b text-gray-600">{orden.fecha}</td>
                    <td className="py-3 px-6 border-b text-gray-600">{orden.total}</td>
                    <td className="py-3 px-6 border-b text-gray-600 text-center">
                      <Link to={`/orden-detail/${orden.id_orden}`}>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                          Ver detalle
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-3 px-6 text-center text-gray-600">
                    No se encontraron órdenes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Ordenes;
