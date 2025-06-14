import UserService from '../services/user.service.js'

const userService = new UserService()

export const getCurrentUser = async (req, res) => {
    try {
    const user = await userService.getCurrentUser(req.user)
    res.json({ status: 'success', payload: user })
    } catch (err) {
    res.status(500).json({ status: 'error', error: err.message })
    }
}

export const updateUserPassword = async (req, res) => {
    try {
    const { email, newPassword } = req.body
    await userService.updatePassword(email, newPassword)
    res.json({ status: 'success', message: 'Contraseña actualizada correctamente' })
    } catch (err) {
    res.status(400).json({ status: 'error', error: err.message })
    }
}