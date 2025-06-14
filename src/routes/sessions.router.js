<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 4135bb5a8c56d7995fe87ed31a591d090de8b26d
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

import UserService from '../services/user.service.js'
import UserDTO from '../dto/user.dto.js'
import { sendRecoveryEmail } from '../utils/mailer.js'

dotenv.config()

const router = Router()
const userService = new UserService()
const JWT_SECRET = process.env.JWT_SECRET

//registro
router.post('/register', async (req, res) => {
    try {
    const user = await userService.register(req.body)
    res.status(201).json({ message: 'Usuario registrado', user })
    } catch (err) {
    res.status(400).json({ error: err.message })
    }
})

//login
router.post('/login', passport.authenticate('login', { session: false }), (req, res) => {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
})

//usuario actual
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const safeUser = new UserDTO(req.user)
    res.json({ user: safeUser })
})

//recuperacion de contraseña - enviar correo
router.post('/forgot-password', async (req, res) => {
    try {
    const { email } = req.body
    const user = await userService.getByEmail(email)

    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' })

    await sendRecoveryEmail(email, token)

    res.json({ message: 'Correo de recuperación enviado' })
    } catch (error) {
    res.status(500).json({ error: error.message })
    }
})

//recuperacion de contraseña - restablecer contraseña
router.post('/reset-password', async (req, res) => {
    try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token y nueva contraseña son requeridos' })
    }

//verificar token
    let payload
    try {
        payload = jwt.verify(token, JWT_SECRET)
    } catch (err) {
        return res.status(400).json({ error: 'Token inválido o expirado' })
    }

    const user = await userService.getByEmail(payload.email)
    if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' })
    }

    const isSamePassword = bcrypt.compareSync(newPassword, user.password)
    if (isSamePassword) {
        return res.status(400).json({ error: 'La nueva contraseña no puede ser igual a la anterior' })
    }

    await userService.updatePassword(payload.email, newPassword)

    res.json({ message: 'Contraseña actualizada correctamente' })
    } catch (error) {
    res.status(500).json({ error: error.message })
    }
})

<<<<<<< HEAD
export default router
=======
export default router
=======
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import UserService from '../services/user.service.js';
import UserDTO from '../dto/user.dto.js';

dotenv.config();
const router = Router();
const userService = new UserService();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
    const user = await userService.register(req.body);
    res.status(201).json({ message: 'Usuario registrado', user });
    } catch (err) {
    res.status(400).json({ error: err.message });
    }
});

router.post('/login', passport.authenticate('login', { session: false }), (req, res) => {
    const token = jwt.sign({ id: req.user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const safeUser = new UserDTO(req.user);
    res.json({ user: safeUser });
});

export default router;
>>>>>>> 88dd525ca43d4d3814aeb723f7cb9adf1cce1460
>>>>>>> 4135bb5a8c56d7995fe87ed31a591d090de8b26d
