import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generarHash = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const compararHash = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password, hash);
}

export const iniciarJwt = (datoCodificado: object): string => {
    const privateKey = 'apiPrueba_data';
    const token = jwt.sign(
        datoCodificado,
        privateKey,
        { expiresIn: '8h', algorithm: 'HS256' } // Cambiar a HS256
    );
    return token;
}

export const validarJwt = (token: string): object | { mensajeError: string } => {
    try {
        const privateKey = 'apiVotacion_data';
        const decoded = jwt.verify(token, privateKey);
        if (typeof decoded === 'object' && decoded !== null) {
            return decoded;
        } else {
            return { mensajeError: 'El token no es válido' };
        }
    } catch (error: any) {
        return { mensajeError: msgErrorJwt(error.message) };
    }
}

export const msgErrorJwt = (mensajeToken: string): string => {
    let validarMensaje = mensajeToken.replace(/\s/g, '_');
    let mensajeResp = '';

    switch (validarMensaje) {
        case 'jwt_expired':
            mensajeResp = 'El token expiró';
            break;
        case 'jwt_malformed':
            mensajeResp = 'El token no tiene tres componentes (delimitados por un .)';
            break;
        case 'jwt_signature_is_required':
            mensajeResp = 'El token no tiene tres componentes (delimitados por un .)';
            break;
        case 'invalid_signature':
            mensajeResp = 'Se requiere firma JWT';
            break;
        case 'invalid_token':
            mensajeResp = 'El token no es válido';
            break;
        default:
            mensajeResp = 'El token no es válido';
            break;
    }

    return mensajeResp;
}
