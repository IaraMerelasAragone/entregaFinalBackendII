import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middleware/auth.middleware.js';
import {
    createCart,
    addProductToCart,
    purchaseCart
} from '../controllers/cart.controller.js';

const router = Router();

//crear carrito vacio
router.post('/', createCart);

//agregar producto (protegido por rol)
router.post(
    '/:cid/product/:pid',
    passport.authenticate('jwt', { session: false }),
    authorizeRoles('user'),
    addProductToCart
);

//ejecutar compra (protegido por rol)
router.post(
    '/:cid/purchase',
    passport.authenticate('jwt', { session: false }),
    authorizeRoles('user'),
    purchaseCart
);

export default router;