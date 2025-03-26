import * as fs from "fs";
import * as path from "path";

class ClassCrearLogs {
    
    async crearLogs(funcion: string, data: any = "", respuesta: any = ""): Promise<void> {
        let fecha = new Date();
        let year = `${fecha.getFullYear()}`;
        let mes = `${fecha.getMonth() + 1}`;
        let dia = `${fecha.getDate()}`; 
        let fechaActual = `${year}-${mes}-${dia}`;

        this.crearCarpetas(fechaActual, path.join(__dirname, "../logs/"));

        try {
            const NombreArchivo = `${funcion}`;
            const rutaDirectorio = path.join(__dirname, "../logs", fechaActual);
            const rutaArchivo = path.join(rutaDirectorio, `${NombreArchivo}.txt`);

            if (!fs.existsSync(rutaDirectorio)) {
                fs.mkdirSync(rutaDirectorio, { recursive: true });
            }

            fs.appendFileSync(
                rutaArchivo,
                `\n---Registro iniciado -> ${new Date().toISOString()}\n
                \n ###### INICIO ###### \n
                \n ###### Peticion ###### \n
                \n ${funcion}: => ${JSON.stringify(data, null, 2)}\n ***RESPUESTA***** \n
                \n ${respuesta === "" ? "No se envió la data para la respuesta" : JSON.stringify(respuesta, null, 2)}
                `
            );

        } catch (error) {
            console.error("Error al escribir en el archivo de logs:", error);
        }
    }

    crearCarpetas(nombre: string, ruta: string): void {
        try {
            fs.mkdirSync(path.join(ruta, nombre), { recursive: true });
        } catch (error) {
            console.error("Error al crear directorio:", error);
        }
    }
}

export default ClassCrearLogs;
