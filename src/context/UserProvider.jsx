import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from './UserContext'
import { useFetch } from '../hooks/useFetch'

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_URL_LOCAL

    const [usuario, setUsuario] = useState({})
    const [isLogued, setIsLogued] = useState(false)
    const { consultaApi, data, loading, error, clearFetch } = useFetch()

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${BASE_URL}/public/renew`, {
                    credentials: 'include'
                })
                const json = await res.json()
                if (!json.ok) return
                const { id, role } = json.data
                setUsuario({ id, role })
                setIsLogued(true)
                navigate(role === 'admin' ? '/admin' : '/user')
            } catch {
                /* sin sesión activa */
            }
        })()
    }, [])

    const logIn = async (user) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(user)
        }
        const res = await consultaApi(`${BASE_URL}/public`, options)
        if (!res?.ok) return
        const { id, role } = res.data
        setUsuario({ id, role })
        setIsLogued(true)
        navigate(role === 'admin' ? '/admin' : '/user')
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
        const res = await consultaApi(`${BASE_URL}/public/new`, options)
        if (!res?.ok) return
        const { id, role } = res.data
        setUsuario({ id, role })
        setIsLogued(true)
        navigate('/user')
    }

    return (
        <UserContext.Provider
            value={{ usuario, isLogued, logIn, logOut, register, data, loading, error }}>
            {children}
        </UserContext.Provider>
    )
}