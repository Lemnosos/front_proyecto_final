import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { UserContext } from './UserContext'
import { useFetch } from '../hooks/useFetch'
import { decodeJWT } from '../utils/gestionarToken'

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()
    const BASE_URL = import.meta.env.VITE_URL_LOCAL

    const [usuario, setUsuario] = useState({})
    const [isLogued, setIsLogued] = useState(false)
    const { consultaApi, data, loading, error, clearFetch } = useFetch()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        fetch(`${BASE_URL}/public/renew`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(json => {
                if (!json.ok) return localStorage.removeItem('token')
                const newToken = json.data.token
                localStorage.setItem('token', newToken)
                const { id, rol: role } = decodeJWT(newToken)
                setUsuario({ id, role })
                setIsLogued(true)
            })
            .catch(() => localStorage.removeItem('token'))
    }, [])

    const logIn = async (user) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(user)
        }
        const res = await consultaApi(`${BASE_URL}/public`, options)
        if (!res?.ok) return
        const { token } = res.data
        localStorage.setItem('token', token)
        const { id, rol: role } = decodeJWT(token)
        setUsuario({ id, role })
        setIsLogued(true)
        navigate(role === 'admin' ? '/admin' : '/user')
    }

    const logOut = () => {
        clearFetch()
        setUsuario(null)
        setIsLogued(false)
        localStorage.removeItem('token')
        navigate('/registro')
    }

    const register = async (user) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(user)
        }
        const res = await consultaApi(`${BASE_URL}/public/new`, options)
        if (!res?.ok) return
        const { token } = res.data
        localStorage.setItem('token', token)
        const { id, rol: role } = decodeJWT(token)
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