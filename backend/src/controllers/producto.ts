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

            const rol = datosConsulta && Array.isArray(datosConsulta) && datosConsulta.length > 0 ? datosConsulta : null;

            res.json({
                data: rol
            });
        }
    } catch (error: any) {
        console.error("Error en consultarRol:", error.message);
        res.status(500).json({ error: "Error al obtener los productos" });
    }
}

export const insertarProducto = async (req: Request, res: Response) => {
    const { nombre, id_categoria, valor } = req.body;
    try {
        const productoInsertado = await prisma.producto.create({
            data: {
                nombre, id_categoria, valor
            }
        });
        res.json({
            message: "Prodcuto creado con éxito",
            data: productoInsertado
        });
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(500).json({ error: "Error al actualizar el rol" });
    }
}

export const actualizarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombre, id_categoria, valor } = req.body;
    try {
        const productoActualizado = await prisma.producto.update({
            where: { id_producto: parseInt(id) },
            data: {
                nombre, id_categoria, valor
            }
        });
        res.json({
            message: "Prodcuto actualizado con éxito",
            data: productoActualizado
        });
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(500).json({ error: "Error al actualizar el rol" });
    }

}

export const eliminarProducto = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const productoEliminado = await prisma.producto.delete({
            where: { id_producto: parseInt(id) }
        });
        res.json({
            message: "Prodcuto eliminado con éxito",
            data: productoEliminado
        });
    } catch (error) {
        console.error("Error al actualizar rol:", error);
        res.status(500).json({ error: "Error al actualizar el rol" });
    }

}