import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const consultarOrden = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (id) {
            let datosConsulta = await prisma.orden.findUnique({
                where: {
                    id_orden: parseInt(id)
                }
            });
            res.json({
                data: datosConsulta
            });
        }
        else {
            let datosConsulta = await prisma.orden.findMany();

            const orden = datosConsulta && Array.isArray(datosConsulta) && datosConsulta.length > 0 ? datosConsulta : null;

            res.json({
                data: orden
            });
        }
    } catch (error: any) {
        console.error("Error en consultar orden:", error.message);
        res.status(500).json({ error: "Error al obtener las ordenes" });
    }
}


export const insertarOrden = async (req: Request, res: Response) => {
    const { fecha, total, detalles } = req.body;
    try {
        const resultado = await prisma.$transaction(async (prisma) => {
            const ordenInsertada = await prisma.orden.create({
                data: { fecha, total }
            });
            const detallesInsertados = await prisma.detalle_orden.createMany({
                data: detalles.map((detalle: { id_producto: number; cantidad: number; precio: number }) => ({
                    id_orden: ordenInsertada.id_orden,
                    id_producto: detalle.id_producto,
                    cantidad: detalle.cantidad,
                    precio: detalle.precio
                }))
            });

            return { orden: ordenInsertada, detalles: detallesInsertados };
        });
        res.json({
            message: "Orden y detalles creados con éxito",
            data: resultado
        });
    } catch (error) {
        console.error("Error al crear la orden o los detalles:", error);
        res.status(500).json({ error: "Error al crear la orden o los detalles" });
    }
};