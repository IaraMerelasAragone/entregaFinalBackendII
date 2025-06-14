import { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
    e.preventDefault()
    try {
        const res = await axios.post('http://localhost:8080/api/sessions/login', { email, password })
        const token = res.data.token
        localStorage.setItem('token', token)
        alert('Login exitoso')
        window.location.href = '/profile'
    } catch (err) {
        alert('Error al iniciar sesión')
    }
    }

    return (
    <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
        <p><a href="/forgot-password">¿Olvidaste tu contraseña?</a></p>
    </form>
    )
}