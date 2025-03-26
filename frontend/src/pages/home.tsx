import React, { useEffect, useState } from "react";
import Producto from "../interfaces/producto";
import { getProductos } from "../services/service";
import { useCart } from "../context/CartContext";

function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const { agregarAlCarrito } = useCart();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [clickedProduct, setClickedProduct] = useState<number | null>(null);

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
      })
      .finally(() => setLoading(false));

  }, []);

  const handleAgregarAlCarrito = (producto: Producto) => {
    setClickedProduct(producto.id_producto);
    agregarAlCarrito(producto);

    setTimeout(() => {
      setClickedProduct(null);
    }, 1000);
  };


  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold text-center text-gray-700 my-6">
        Productos
      </h1>

      {loading && <p className="text-center text-gray-500">Cargando productos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && productos.length === 0 && (
        <p className="text-center text-gray-500">No hay productos disponibles.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <div
            key={producto.id_producto}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-transform duration-200 transform hover:scale-105"
          >
            <img
              src={"https://us.123rf.com/450wm/tkacchuk/tkacchuk2004/tkacchuk200400017/143745488-no-hay-icono-de-imagen-vector-de-l%C3%ADnea-editable-no-hay-imagen-no-hay-foto-disponible-o-no-hay.jpg"}
              alt={producto.nombre}
              className="w-full h-52 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{producto.nombre}</h3>
              <p className="text-gray-600">Valor: <span className="font-bold">${producto.valor}</span></p>
              <button
                className={`mt-4 w-full py-2 px-4 rounded-lg transition-all duration-300 ${clickedProduct === producto.id_producto
                  ? "bg-green-600 scale-110 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                onClick={() => handleAgregarAlCarrito(producto)}
              >
                {clickedProduct === producto.id_producto ? "Agregado ✓" : "Agregar al Carrito"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
