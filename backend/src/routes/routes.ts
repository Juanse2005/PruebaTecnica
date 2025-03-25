import { Router } from 'express';
import { consultarProductos } from '../controllers/productos';
const router: Router = Router();

router.get('/productos', consultarProductos)




export default router;
