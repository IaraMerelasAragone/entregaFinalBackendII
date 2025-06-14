import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('')
    const { token } = useParams()

    const handleReset = async (e) => {
    e.preventDefault()
    try {
        await axios.post('http://localhost:8080/api/sessions/reset-password', {
        token,
        newPassword
        })
        alert('Contraseña actualizada correctamente')
    } catch (err) {
        alert('Error al actualizar la contraseña')
    }
    }

    return (
    <form onSubmit={handleReset}>
        <h2>Restablecer Contraseña</h2>
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Nueva contraseña" />
        <button type="submit">Restablecer</button>
    </form>
    )
}