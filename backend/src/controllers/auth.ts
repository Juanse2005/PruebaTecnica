import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { iniciarJwt, compararHash, generarHash } from '../class/funciones';
import ClassCrearLogs from '../class/ClassCrearLogs';

const prisma = new PrismaClient();
const logs = new ClassCrearLogs();

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email, password } = req.body;

    try {
        const consultarUsuarios = await prisma.usuario.findUnique({
            where: {
                email: email
            },
            select: {
                id_usuario: true,
                primer_nombre: true,
                segundo_nombre: true,
                primer_apellido: true,
                segundo_apellido: true,
                email: true,
                password: true,
                id_rol: true
            }
        });

        if (!consultarUsuarios) {
            logs.crearLogs(login.name, req.body, "Usuario no encontrado");
            return res.status(400).json({ error: "Usuario no encontrado" });
        }

        const usuario = consultarUsuarios;
        if (!usuario.password) {
            logs.crearLogs(login.name, req.body, "Usuario no tiene contraseña válida");
            return res.status(400).json({ error: "Usuario no tiene contraseña válida" });
        }

        const compararpass = await compararHash(password, usuario.password);

        if (compararpass) {
            const token = iniciarJwt({
                id_usuario: usuario.id_usuario,
                email: usuario.email,
                id_rol: usuario.id_rol
            });

            const resp = {
                id_usuario: usuario.id_usuario,
                primer_nombre: usuario.primer_nombre,
                primer_apellido: usuario.primer_apellido,
                email: usuario.email,
                id_rol: usuario.id_rol,
                token: token
            };

            logs.crearLogs(login.name, req.body, resp);
            return res.json({ data: resp });
        } else {
            logs.crearLogs(login.name, req.body, "Contraseña incorrecta");
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

    } catch (error: any) {
        console.error("Error en login:", error.message);
        logs.crearLogs(login.name, req.body, error.message);
        return res.status(500).json({ error: "Error al intentar iniciar sesión" });
    }
};

export const register = async (req: Request, res: Response) => {
    const { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, password, id_rol } = req.body;

    const hashpass = await generarHash(password);

    try {
        let datosConsulta = await prisma.usuario.create({
            data: { primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, email, password: hashpass, id_rol }
        });
        logs.crearLogs(register.name, req.body, datosConsulta);
        res.json({
            message: "Rol insertado con éxito",
            data: datosConsulta
        });
    } catch (error: any) {
        console.error("Error en insertarRol:", error.message);
        logs.crearLogs(register.name, req.body, error.message);
        res.status(500).json({ error: "Error al insertar el rol" });
    }
}