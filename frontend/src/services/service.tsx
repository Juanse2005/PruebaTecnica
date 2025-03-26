import axios from "axios";
import Producto from "../interfaces/producto";
import DetalleOrden from "../interfaces/detalle-orden";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getProductos = async () => {
  try {
    const response = await axiosInstance.get(`/products`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos", error);
    throw error;
  }
};

export const getProductosById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`); 
    return response.data;
  } catch (error) {
    console.error("Error al obtener el producto", error);
    throw error;
  }
};

export const putProductos = async (id_producto: number, formData: Producto) => {
  try {
    const response = await axiosInstance.put(`/products/${id_producto}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el producto", error);
    throw error;
  }
};

export const getOrden = async () => {
  try {
    const response = await axiosInstance.get(`/orders`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ordenes", error);
    throw error;
  }
};

export const createOrden = async (total: number, detalles: DetalleOrden[]) => {
  const fecha = new Date().toISOString(); 
  const orden = {
    fecha,
    total,
    detalles,
  };

  try {
    const response = await axiosInstance.post(`/orders`, orden);
    return response.data;
  } catch (error) {
    console.error("Error al crear la orden", error);
    throw error;
  }
};