import React, { useState } from "react";
import Producto from "../interfaces/producto";
import axios from "axios";

const CreateProduct = () => {
    const [producto, setProducto] = useState<Omit<Producto, "cantidad">>({
        id_producto: 0,
        nombre: "",
        valor: 0,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const baseURL = "http://localhost:3000";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(`${baseURL}/products`, {
                ...producto,
                valor: Number(producto.valor),
             },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
            console.log("Producto creado:", response.data);
            setSuccess(true);
            setProducto({ id_producto: 0, nombre: "", valor: 0 });
            window.location.href = "/dashboard";
        } catch (error) {
            console.error("Error al crear el producto:", error);
            setError("Hubo un error al registrar el producto. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProducto((prevProducto) => ({
            ...prevProducto,
            [name]: name === "valor" ? value.replace(/\D/g, "") : value, 
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Agregar nuevo producto
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-600">
                            Nombre del producto
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={producto.nombre}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="valor" className="block text-sm font-medium text-gray-600">
                            Valor
                        </label>
                        <input
                            type="text"
                            id="valor"
                            name="valor"
                            value={producto.valor}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    {success && <div className="text-green-500 text-sm mb-4">Producto creado con éxito.</div>}

                    <button
                        type="submit"
                        className={`w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Crear Producto"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;