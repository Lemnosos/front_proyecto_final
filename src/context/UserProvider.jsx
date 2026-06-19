import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from './UserContext'
import { useFetch } from '../hooks/useFetch'

/**
 * Proveedor de contexto de autenticación.
 * Expone métodos de login, registro, logout y renovación de token,
 * así como los estados `usuario` (id y rol) e `isLogued`.
 *
 * Tras login/register/renovar, observa el estado `data` de useFetch
 * y redirige automáticamente según el rol del usuario.
 *
 * @param {{ children: React.ReactNode }} props
 */
export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_URL_RENDER

    const { consultaApi, data, loading, error, clearFetch } = useFetch()

    const [usuario, setUsuario] = useState(null)
    const [isLogued, setIsLogued] = useState(false)

    /**
     * Inicia sesión: envía credenciales al backend.
     * La cookie httpOnly se recibe y almacena automáticamente.
     *
     * @param {{ email: string, password: string }} user
     */
    const logIn = async (user) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(user)
        }
        await consultaApi(`${BASE_URL}/public`, options)
    }

    /**
     * Cierra sesión: elimina la cookie en el backend y limpia el estado local.
     */
    const logOut = async () => {
        await consultaApi(`${BASE_URL}/public/logout`, { method: 'POST' })
        clearFetch()
        setUsuario(null)
        setIsLogued(false)
        navigate('/registro')
    }

    /**
     * Registra un nuevo usuario (rol 'user' o 'admin' según el campo `rol`).
     *
     * @param {{ nombre: string, apodo?: string, email: string, password: string, rol?: string }} user
     */
    const register = async (user) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(user)
        }
        await consultaApi(`${BASE_URL}/public/new`, options)
    }

    /**
     * Renueva la sesión usando la cookie existente.
     * Se ejecuta automáticamente al montar el provider (equivalente a auto-login).
     */
    const renovarToken = async () => {
        await consultaApi(`${BASE_URL}/public/renew`, { method: 'GET' })
    }

    useEffect(() => {
        renovarToken()
    }, [])

    useEffect(() => {
        if (!data?.data?.id) return
        const { id, role } = data.data
        setUsuario({ id, role })
        setIsLogued(true)
        navigate(role === 'admin' ? '/admin/enemigos' : '/user/personaje')
    }, [data])

    return (
        <UserContext.Provider
            value={{ usuario, isLogued, logIn, logOut, register, data, loading, error, clearFetch }}>
            {children}
        </UserContext.Provider>
    )
}
