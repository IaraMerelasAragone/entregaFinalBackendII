import { useState } from 'react'
import axios from 'axios'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post('http://localhost:8080/api/sessions/forgot-password', { email })
        setMessage(res.data.message)
    } catch (err) {
        setMessage(err.response?.data?.error || 'Error al enviar el correo')
    }
    }

    return (
    <div>
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
        <input
            type="email"
            placeholder="Tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
        />
        <button type="submit">Enviar enlace</button>
        </form>
        {message && <p>{message}</p>}
    </div>
    )
}

export default ForgotPassword