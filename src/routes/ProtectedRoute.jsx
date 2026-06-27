import { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../context/UserContext'

export const ProtectedRoute = ({ role, children }) => {
    const { usuario, isLogued, checking } = useContext(UserContext)

    if (checking) return null
    if (!isLogued) return <Navigate to="/" />
    if (usuario?.role !== role) return <Navigate to="/" />

    return children
}
