import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrdenById } from "../services/service";
import DetalleOrden from "../interfaces/detalle-orden";

const OrdenesDetalle = () => {
    const { id } = useParams();
    const [detalles, setDetalles] = useState<DetalleOrden[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getOrdenById(parseInt(id))
                .then((response) => {
                    if (response.data && Array.isArray(response.data)) {
                        setDetalles(response.data);
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
        return <div className="container-a"> <div className="text-2xl font-bold text-center text-gray-700 mb-6">No se encontraron detalles para esta orden.</div>
            <Link
                to="/ordenes"
                className="mt-4 w-full block text-center bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
            >
                Volver
            </Link>
        </div>
    }

    return (
        <div className="container-a">
            <div className="max-w-4xl mx-auto p-6  rounded-lg shadow-md bg-gray-100">
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
                    className="mt-4 w-full block text-center bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                >
                    Volver
                </Link>
            </div>
        </div>
    );
};

export default OrdenesDetalle;