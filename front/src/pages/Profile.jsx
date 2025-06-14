import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Profile() {
    const [user, setUser] = useState(null)

    useEffect(() => {
    const fetchProfile = async () => {
        const token = localStorage.getItem('token')
        if (!token) return alert('No estás logueado')

        try {
        const res = await axios.get('http://localhost:8080/api/sessions/current', {
            headers: {
            Authorization: `Bearer ${token}`
            }
        })
        setUser(res.data.user)
        } catch (err) {
        alert('Error al cargar perfil')
        }
    }

    fetchProfile()
    }, [])

    if (!user) return <p>Cargando perfil...</p>

    return (
    <div>
        <h2>Perfil de Usuario</h2>
        <p>Nombre: {user.first_name} {user.last_name}</p>
        <p>Email: {user.email}</p>
        <p>Rol: {user.role}</p>
    </div>
    )
}