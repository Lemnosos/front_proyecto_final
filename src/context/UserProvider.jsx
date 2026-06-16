import { useState } from 'react'
import { UserContext } from './UserContext'
import { useFetch } from '../hooks/useFetch'
import { decodeJWT } from '../utils/gestionarToken'

export const UserProvider = ({ children }) => {

    const BASE_URL = import.meta.env.VITE_URL_LOCAL

    const [usuario, setUsuario] = useState({})
    const [isLogued, setIsLogued] = useState(false)
    const { consultaApi, data, loading, error } = useFetch()

    const logIn = async (user) => {
        //mandar datos al endpoint de loguear y esperar el token (hook de fetchs)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'Authorization': `Bearer ${token}`,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(user)
        }
        //no hace falta hacer control de errores
        //ya se gestionan en useFetch
        await consultaApi(`${BASE_URL}/public`, options)
        const { token } = data
        localStorage.setItem('token', token)
    }

    const logOut = () => {
        setUsuario(null)
        setIsLogued(false)
        setToken(null)
        localStorage.setItem('token', null)
        //redireccionar a '/'o '/login'... cualquier pagina pública
    }

    const register = async (user) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                // 'Authorization': `Bearer ${token}`,
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(user)
        }
        //no hace falta hacer control de errores
        //ya se gestionan en useFetch
        await consultaApi(`${BASE_URL}/public/new`, options)
        const { token } = data
        localStorage.setItem('token', token)
    }

    return (
        <UserContext.Provider value={{ usuario, isLogued, logIn, logOut, register }}>
            {children}
        </UserContext.Provider>
    )
}