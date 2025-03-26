import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrdenById } from "../services/service";
import DetalleOrden from "../interfaces/detalle-orden"; // Importa la interfaz

const OrdenesDetalle = () => {
    const { id } = useParams(); // Obtener el ID de la orden desde la URL
    const [detalles, setDetalles] = useState<DetalleOrden[]>([]); // Estado para almacenar los detalles de la orden
    const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
    const [error, setError] = useState<string>(""); // Estado para manejar errores

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getOrdenById(parseInt(id))
                .then((response) => {
                    if (response.data && Array.isArray(response.data)) {
                        setDetalles(response.data); // Almacenar solo los detalles de la orden
                    } else {
                        setError("No se encontraron detalles para esta orden.");
                    }
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError("Error al cargar los detalles de la orden.");
                    setIsLoading(false);
                    console.error("Error:", err);
                });
        }
    }, [id]);

    if (isLoading) {
        return <div className="text-center">Cargando...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (detalles.length === 0) {
        return <div className="container"> <div className="text-center">No se encontraron detalles para esta orden.</div>;</div>
    }

    return (
        <div className="container">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Detalles de la Orden</h1>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-4 text-left">ID Detalle</th>
                                <th className="p-4 text-center">ID Producto</th>
                                <th className="p-4 text-center">Cantidad</th>
                                <th className="p-4 text-center">Precio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalles.map((detalle) => (
                                <tr key={detalle.id_detalle_orden} className="border-b hover:bg-gray-50">
                                    <td className="p-4 text-gray-800">{detalle.id_detalle_orden}</td>
                                    <td className="p-4 text-center text-gray-800">{detalle.id_producto}</td>
                                    <td className="p-4 text-center text-gray-800">{detalle.cantidad}</td>
                                    <td className="p-4 text-center text-gray-800">
                                        ${Number(detalle.precio).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link
                    to="/ordenes"
                    className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Volver a Órdenes
                </Link>
            </div>
        </div>
    );
};

export default OrdenesDetalle;