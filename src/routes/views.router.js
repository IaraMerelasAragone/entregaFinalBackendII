<<<<<<< HEAD
import { Router } from 'express'
import passport from 'passport'
import ProductModel from '../dao/models/product.model.js'

const router = Router()

//ruta protegida que carga productos y muestra vista home
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
    const products = await ProductModel.find().lean()

    res.render('home', {
        title: 'Inicio',
        user: req.user,
        products
    })
    } catch (error) {
    console.error('Error al cargar productos:', error.message)
    res.status(500).send('Error al cargar productos')
    }
})

// Ruta protegida que muestra perfil
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.render('profile', {
    title: 'Perfil',
    user: req.user
    })
})

export default router
=======
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('home');
});

export default router;
>>>>>>> 4135bb5a8c56d7995fe87ed31a591d090de8b26d
