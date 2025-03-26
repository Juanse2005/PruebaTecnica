import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Producto from "../interfaces/producto";
import { getProductosById, putProductos } from "../services/service";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState<Producto | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (id) {
            setIsLoading(true);
            getProductosById(parseInt(id))
                .then((response) => {
                    setFormData(response.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setError("Error al cargar el producto.");
                    setIsLoading(false);
                    console.error("Error:", err);
                });
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            try {
                await putProductos(formData.id_producto, formData);
                navigate("/dashboard");
            } catch (err) {
                setError("Error al actualizar el producto.");
                console.error("Error:", err);
            }
        }
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Editar Producto</h2>
                {formData ? (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor</label>
                            <input
                                type="number"
                                id="valor"
                                name="valor"
                                value={formData.valor || ""}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <button type="submit" className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                            Actualizar Producto
                        </button>
                        <Link
                            to="/dashboard"
                            className="mt-4 w-full block text-center bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                        >
                            Volver
                        </Link>
                    </form>
                ) : (
                    <div>No se encontró el producto.</div>
                )}
            </div>            </div>

    );
};

export default EditProduct;
