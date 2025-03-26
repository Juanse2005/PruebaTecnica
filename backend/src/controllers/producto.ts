import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import ClassCrearLogs from '../class/ClassCrearLogs';

const prisma = new PrismaClient();
const logs = new ClassCrearLogs();

export const consultarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (id) {
            let datosConsulta = await prisma.producto.findUnique({
                where: {
                    id_producto: parseInt(id)
                }
            });
            logs.crearLogs(consultarProducto.name, req.query, datosConsulta);
            res.json({ data: datosConsulta });
        } else {
            let datosConsulta = await prisma.producto.findMany();
            const producto = Array.isArray(datosConsulta) ? datosConsulta : [];
            logs.crearLogs(consultarProducto.name, req.query, producto);
            res.json({ data: producto });
        }
    } catch (error: any) {
        console.error("Error en consultar producto:", error.message);
        logs.crearLogs(consultarProducto.name, req.query, error.message);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

export const insertarProducto = async (req: Request, res: Response) => {
    const { nombre, valor } = req.body;
    try {
        const productoInsertado = await prisma.producto.create({
            data: { nombre, valor }
        });
        logs.crearLogs(insertarProducto.name, req.body, productoInsertado);
        res.json({
            message: "Producto creado con éxito",
            data: productoInsertado
        });
    } catch (error) {
        console.error("Error al insertar producto:", error);
        logs.crearLogs(insertarProducto.name, req.body, (error as any).message);
        res.status(500).json({ error: "Error al insertar el producto" });
    }
};

export const actualizarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, valor } = req.body;
    try {
        const productoActualizado = await prisma.producto.update({
            where: { id_producto: parseInt(id) },
            data: { nombre, valor }
        });
        logs.crearLogs(actualizarProducto.name, req.body, productoActualizado);
        res.json({
            message: "Producto actualizado con éxito",
            data: productoActualizado
        });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        logs.crearLogs(actualizarProducto.name, req.body, (error as any));
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
};

export const eliminarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const productoEliminado = await prisma.producto.delete({
            where: { id_producto: parseInt(id) }
        });
        logs.crearLogs(eliminarProducto.name, req.params, productoEliminado);
        res.json({
            message: "Producto eliminado con éxito",
            data: productoEliminado
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        logs.crearLogs(eliminarProducto.name, req.params, (error as any));
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};