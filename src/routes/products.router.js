import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middleware/auth.middleware.js';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/product.controller.js';

const router = Router();

router.use(passport.authenticate('jwt', { session: false }));

router.get('/', getProducts);

router.post('/', authorizeRoles('admin'), createProduct);

router.put('/:pid', authorizeRoles('admin'), updateProduct);

router.delete('/:pid', authorizeRoles('admin'), deleteProduct);

export default router;