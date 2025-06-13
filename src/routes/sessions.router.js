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