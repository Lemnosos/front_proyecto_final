import { useContext } from 'react'
import { Navigate } from 'react-router'
import { UserContext } from '../context/UserContext'

export const ProtectedRoute = ({ role, children }) => {
    const { usuario, isLogued } = useContext(UserContext)

    if (!isLogued) return <Navigate to="/registro" />
    if (usuario?.role !== role) return <Navigate to="/registro" />

    return children
}
