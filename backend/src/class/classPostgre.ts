import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

export class Postgre {
    private readonly pool: Pool;

    constructor() {

        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        });

        this.testConnection();
    }


    // Función para probar la conexión
    private async testConnection() {
        try {
            const client = await this.pool.connect();
            console.log("✅ Conexión exitosa a PostgreSQL");
            client.release(); // Liberar conexión
        } catch (error) {
            console.error("❌ Error de conexión:", error);
        }

    }
}
