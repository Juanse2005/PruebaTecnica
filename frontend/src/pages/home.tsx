import React, { useEffect, useState } from "react";
import Producto from "../interfaces/producto";
import { getProductos } from "../services/service";
import { useCart } from "../context/CartContext"; 

function Home() {
    const [productos, setProductos] = useState<Producto[]>([]);
    const { agregarAlCarrito } = useCart(); 

    useEffect(() => {
        getProductos()
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setProductos(response.data);
                } else {
                    console.error("Los datos obtenidos no son un arreglo");
                }
            })
            .catch((error: unknown) => {
                if (error instanceof Error) {
                    console.error("Error al obtener los productos", error.message);
                } else {
                    console.error("Error al obtener los productos", error);
                }
            });
    }, []);

    return (
        <>
            <h1 className="text-2xl mt-6 mb-4 text-center font-semibold text-gray-900">Productos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
                {productos.map((producto) => (
                    <div
                        key={producto.id_producto}
                        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                    >
                        <img
                            src="https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"
                            alt={producto.nombre}
                        />
                        <h3 className="text-xl font-semibold text-gray-800">{producto.nombre}</h3>
                        <p className="text-gray-600">Valor: ${producto.valor}</p>
                        <button
                            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                            onClick={() => agregarAlCarrito(producto)} 
                        >
                            Agregar al Carrito
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;
