import React, { createContext, useContext, useState, useEffect } from "react";
import Producto from "../interfaces/producto";

interface CartContextType {
  carrito: Producto[];
  agregarAlCarrito: (producto: Producto) => void;
  eliminarDelCarrito: (id_producto: number) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const nuevoTotal = carrito.reduce(
      (acc, item) => acc + item.valor * (item.cantidad || 1),
      0
    );
    setTotal(nuevoTotal);
  }, [carrito]);

  const agregarAlCarrito = (producto: Producto) => {
    const productoExistente = carrito.find(
      (item) => item.id_producto === producto.id_producto
    );
    if (productoExistente) {
      setCarrito(
        carrito.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: (item.cantidad || 0) + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id_producto: number) => {
    setCarrito(carrito.filter((item) => item.id_producto !== id_producto));
  };

  return (
    <CartContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito, total }}
    >
      {children}
    </CartContext.Provider>
  );
};