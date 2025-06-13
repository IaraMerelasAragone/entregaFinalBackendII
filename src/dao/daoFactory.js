import UserModel from './models/user.model.js'

export default class DaoFactory {
    static getUserDao() {
    return UserModel
    }
}