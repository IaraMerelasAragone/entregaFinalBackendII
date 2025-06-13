import UserModel from '../dao/models/user.model.js';

export default class UserRepository {
    async getByEmail(email) {
    return await UserModel.findOne({ email });
    }

    async getById(id) {
    return await UserModel.findById(id);
    }

    async create(userData) {
    return await UserModel.create(userData);
    }

    async updatePasswordByEmail(email, newHashedPassword) {
    return await UserModel.findOneAndUpdate(
        { email },
        { password: newHashedPassword }
    );
    }

    async findAll() {
    return await UserModel.find();
    }
}