import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from './UserContext'
import { useFetch } from '../hooks/useFetch'

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_URL_LOCAL

    const { consultaApi, data, loading, error, clearFetch } = useFetch()

    const [usuario, setUsuario] = useState(null)
    const [isLogued, setIsLogued] = useState(false)

    const logIn = async (user) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(user)
        }
        await consultaApi(`${BASE_URL}/public`, options)
    }

    const logOut = async () => {
        await consultaApi(`${BASE_URL}/public/logout`, { method: 'POST' })
        clearFetch()
        setUsuario(null)
        setIsLogued(false)
        navigate('/registro')
    }

    const register = async (user) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(user)
        }
        await consultaApi(`${BASE_URL}/public/new`, options)
    }

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
