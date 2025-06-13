import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import UserModel from '../dao/models/user.model.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

//estrategia Local (login)
passport.use(
    'login',
    new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', session: false },
    async (email, password, done) => {
        try {
        const user = await UserModel.findOne({ email });
        if (!user) return done(null, false, { message: 'Usuario no encontrado' });

        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) return done(null, false, { message: 'Contraseña incorrecta' });

        return done(null, user);
        } catch (error) {
        return done(error);
        }
    }
    )
);

//estrategia JWT
passport.use(
    'jwt',
    new JWTStrategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: JWT_SECRET
    },
    async (jwt_payload, done) => {
        try {
        const user = await UserModel.findById(jwt_payload.id);
        if (!user) return done(null, false);

        return done(null, user);
        } catch (error) {
        return done(error, false);
        }
    }
    )
);

export default passport;