import express from 'express';
import cors from 'cors';
import productosRoutes from './routes/routes';
import dotenv from 'dotenv';

dotenv.config();

export class Servidor {
    private readonly app: express.Application;

    private readonly port: string | number;

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? 3000;

        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
        

    }

    private routes(): void {
        this.app.use('/', productosRoutes);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log("El servidor está en el puerto", this.port);
        });
    }
}
