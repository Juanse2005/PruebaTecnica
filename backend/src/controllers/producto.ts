import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const consultarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (id) {
            let datosConsulta = await prisma.producto.findUnique({
                where: {
                    id_producto: parseInt(id)
                }
            });
            res.json({
                data: datosConsulta
            });
        }
        else {
            let datosConsulta = await prisma.producto.findMany();

            const producto = Array.isArray(datosConsulta) ? datosConsulta : [];

            res.json({
                data: producto
            });
        }
    } catch (error: any) {
        console.error("Error en consultar producto:", error.message);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
}

export const insertarProducto = async (req: Request, res: Response) => {
    const { nombre, valor } = req.body;
    try {
        const productoInsertado = await prisma.producto.create({
            data: {
                nombre, valor
            }
        });
        res.json({
            message: "Producto creado con éxito",
            data: productoInsertado
        });
    } catch (error) {
        console.error("Error al insertar producto:", error);
        res.status(500).json({ error: "Error al insertar el rol" });
    }
}

export const actualizarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, valor } = req.body;
    try {
        const productoActualizado = await prisma.producto.update({
            where: { id_producto: parseInt(id) },
            data: {
                nombre, valor
            }
        });
        res.json({
            message: "Producto actualizado con éxito",
            data: productoActualizado
        });
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        res.status(500).json({ error: "Error al actualizar el producto" });
    }

}

export const eliminarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const productoEliminado = await prisma.producto.delete({
            where: { id_producto: parseInt(id) }
        });
        res.json({
            message: "Producto eliminado con éxito",
            data: productoEliminado
        });
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }

}