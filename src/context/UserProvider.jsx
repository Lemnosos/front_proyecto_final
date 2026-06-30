import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from './UserContext'
import { useFetch } from '../hooks/useFetch'

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_URL_RENDER

    const { consultaApi, data, loading, error, clearFetch } = useFetch()

    const [usuario, setUsuario] = useState(null)
    const [isLogued, setIsLogued] = useState(false)
    const [checking, setChecking] = useState(true)

    const borrarToken = useCallback(async () => {
        try {
            await consultaApi(`${BASE_URL}/public/delete`, { method: 'GET' })
        } catch {
        } finally {
            setChecking(false)
        }
    }, [consultaApi, BASE_URL])

    const logIn = useCallback(async (user) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(user)
        }
        await consultaApi(`${BASE_URL}/public`, options)
        setChecking(false)
    }, [consultaApi, BASE_URL])

    const logOut = useCallback(() => {
        clearFetch()
        setUsuario(null)
        setIsLogued(false)
        navigate('/registro')
        borrarToken()
    }, [clearFetch, navigate, borrarToken])

    const register = useCallback(async (user) => {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(user)
        }
        await consultaApi(`${BASE_URL}/public/new`, options)
        setChecking(false)
    }, [consultaApi, BASE_URL])

    useEffect(() => {
        if (!data?.data?.id) return
        const { id, role } = data.data
        setUsuario({ id, role })
        setIsLogued(true)
        navigate(role === 'admin' ? '/admin/enemigos' : '/user/personaje')
        setChecking(false)
    }, [data])

    const contextValue = useMemo(() => ({
        usuario, isLogued, checking, logIn, logOut, register, data, loading, error, clearFetch
    }), [usuario, isLogued, checking, logIn, logOut, register, data, loading, error, clearFetch])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}
