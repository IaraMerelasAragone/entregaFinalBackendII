import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const ResetPassword = () => {
    const [params] = useSearchParams()
    const token = params.get('token')

    const [newPassword, setNewPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post('http://localhost:8080/api/sessions/reset-password', {
        token,
        newPassword
        })
        setMessage(res.data.message)
    } catch (err) {
        setMessage(err.response?.data?.error || 'Error al cambiar contraseña')
    }
    }

    return (
    <div>
        <h2>Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
        />
        <button type="submit">Actualizar</button>
        </form>
        {message && <p>{message}</p>}
    </div>
    )
}

export default ResetPassword