import { Routes, Route, Navigate } from 'react-router'
import { PublicPage, AdminPage, UserPage, RegisterPage } from '../pages/indexPages'
import { ProtectedRoute } from './ProtectedRoute'

export const Rutas = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/user" element={<ProtectedRoute role="user"><UserPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPage /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
