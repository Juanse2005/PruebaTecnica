import { Router } from 'express';
import { actualizarProducto, consultarProducto, eliminarProducto, insertarProducto } from '../controllers/producto';
import { login, register } from '../controllers/auth';
import { consultarOrden, insertarOrden } from '../controllers/orden';
const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);

router.get('/orders', consultarOrden)
router.get('/orders/:id', consultarOrden)
router.post('/orders', insertarOrden)

router.post('/products', insertarProducto)
router.get('/products', consultarProducto)
router.get('/products/:id', consultarProducto)
router.put('/products/:id', actualizarProducto)
router.delete('/products/:id', eliminarProducto)

export default router;
