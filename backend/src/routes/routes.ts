import { Router } from 'express';
import { actualizarProducto, consultarProducto, eliminarProducto, insertarProducto } from '../controllers/producto';
import { login, register } from '../controllers/auth';
import { consultarOrden, insertarOrden } from '../controllers/orden';
import { verificarToken } from '../middlewares/autenticacion';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);

router.get('/orders', verificarToken, consultarOrden)
router.get('/orders/:id', verificarToken, consultarOrden)
router.post('/orders', insertarOrden)

router.post('/products', verificarToken, insertarProducto)
router.get('/products', consultarProducto)
router.get('/products/:id', consultarProducto)
router.put('/products/:id', verificarToken, actualizarProducto)
router.delete('/products/:id', verificarToken, eliminarProducto)

export default router;
