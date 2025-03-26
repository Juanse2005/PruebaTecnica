import { Request, Response, NextFunction } from 'express';
import { validarJwt } from '../class/funciones';

interface User {
    id_usuario: number;
    primer_nombre: string;
    primer_apellido: string;
    email: string;
    id_rol: number;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const verificarToken = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No se proporcionó un token' });
    }

    const decoded = validarJwt(token)

    if ('mensajeError' in decoded) {
        return res.status(401).json({ error: decoded.mensajeError });
    }

    req.user = decoded as User;
    next();
};
