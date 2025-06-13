import bcrypt from 'bcrypt';
import UserRepository from '../repository/user.repository.js';

const userRepository = new UserRepository();

class UserService {
    async register(userData) {
    const { email, password } = userData;

    const existingUser = await userRepository.getByEmail(email);
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
        ...userData,
        password: hashedPassword,
      role: 'user' //asignar rol por defecto
    };

    return await userRepository.create(newUser);
    }

    async getByEmail(email) {
    return await userRepository.getByEmail(email);
    }

    async getById(id) {
    return await userRepository.getById(id);
    }

    async updatePassword(email, newPassword) {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    return await userRepository.updatePasswordByEmail(email, hashedPassword);
    }

    async getCurrentUser(user) {
    return user; //el DTO ya se aplica en el controlador
    }
}

export default UserService;