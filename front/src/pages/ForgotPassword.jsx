import { useState } from 'react'
import axios from 'axios'

export default function ForgotPassword() {
    const [email, setEmail] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await axios.post('http://localhost:8080/api/sessions/forgot-password', { email })
        alert('Correo de recuperación enviado')
    } catch (err) {
        alert('Error al enviar el correo')
    }
    }

    return (
    <form onSubmit={handleSubmit}>
        <h2>Recuperar Contraseña</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">Enviar</button>
    </form>
    )
}