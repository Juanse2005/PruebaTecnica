import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';
import ClassCrearLogs from '../class/ClassCrearLogs'; // Importamos la clase para logs

const prisma = new PrismaClient();
const logs = new ClassCrearLogs(); // Instanciamos la clase de logs

export const consultarOrden = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        if (id) {
            let datosConsulta = await prisma.detalle_orden.findMany({
                where: {
                    id_orden: parseInt(id)
                }
            });
            logs.crearLogs(consultarOrden.name, req.params, datosConsulta);
            res.json({
                data: datosConsulta
            });
        } else {
            let datosConsulta = await prisma.orden.findMany();
            const orden = Array.isArray(datosConsulta) ? datosConsulta : [];
            logs.crearLogs(consultarOrden.name, req.params, orden);
            res.json({
                data: orden
            });
        }
    } catch (error: any) {
        logs.crearLogs(consultarOrden.name, req.params, error.message);
        console.error("Error en consultar orden:", error.message);
        res.status(500).json({ error: "Error al obtener las ordenes" });
    }
};

export const insertarOrden = async (req: Request, res: Response) => {
    const { fecha, total, id_usuario, detalles } = req.body;
    try {
        const resultado = await prisma.$transaction(async (prisma) => {
            const ordenInsertada = await prisma.orden.create({
                data: { fecha, total, id_usuario }
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
        logs.crearLogs(insertarOrden.name, req.body, resultado);
        res.json({
            message: "Orden y detalles creados con éxito",
            data: resultado
        });
    } catch (error: any) {
        logs.crearLogs(insertarOrden.name, req.body, error.message);
        console.error("Error al crear la orden o los detalles:", error.message);
        res.status(500).json({ error: "Error al crear la orden o los detalles" });
    }
};
