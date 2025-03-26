import { useCart } from "../context/CartContext";
import { createOrden } from "../services/service";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { carrito, total, eliminarDelCarrito } = useCart();
  const navigate = useNavigate();

  const handleEliminar = (id_producto: number) => {
    if (window.confirm("¿Estás seguro de eliminar este producto del carrito?")) {
      eliminarDelCarrito(id_producto);
    }
  };

  const handleComprar = async () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío. No se puede realizar la compra.");
      return;
    }

    const detalles = carrito.map((producto) => ({
      id_producto: producto.id_producto,
      cantidad: producto.cantidad || 1,
      precio: producto.valor,
    }));

    try {
      const response = await createOrden(total, detalles); 
      alert("Compra realizada con éxito. ID de la orden: " + response.id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error al realizar la compra:", error);
      alert("Hubo un error al realizar la compra. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Carrito de Compras</h1>

      {/* Si el carrito está vacío */}
      {carrito.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600">No hay productos en el carrito.</p>
          <img
            src="/images/empty-cart.svg"
            alt="Carrito vacío"
            className="mx-auto mt-6 w-64"
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4 text-left">Producto</th>
                <th className="p-4 text-center">Cantidad</th>
                <th className="p-4 text-center">Precio</th>
                <th className="p-4 text-center">Total</th>
                <th className="p-4 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {carrito.map((producto) => (
                <tr
                  key={producto.id_producto}
                  className="border-b hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-4 text-gray-800">{producto.nombre}</td>
                  <td className="p-4 text-center text-gray-800">{producto.cantidad}</td>
                  <td className="p-4 text-center text-gray-800">${producto.valor.toFixed(2)}</td>
                  <td className="p-4 text-center text-gray-800">
                    ${(producto.valor * producto.cantidad).toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-150"
                      onClick={() => handleEliminar(producto.id_producto)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Total y botón de compra */}
      {carrito.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800">
            Total: <span className="text-blue-600">${total.toFixed(2)}</span>
          </h3>
          <button
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-150"
            onClick={handleComprar}
          >
            Comprar
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;