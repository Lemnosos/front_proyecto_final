import { Routes, Route, Navigate } from 'react-router'
import { PublicPage, AdminPage, UserPage, RegisterPage } from '../pages/indexPages'
import { AdminEnemigos, AdminUsuarios, AdminHistorial, AdminNuevoAdmin } from '../components/indexComponents'
import { ProtectedRoute } from './ProtectedRoute'
import { UserPersonaje, UserPelea, UserUsuario, UserHistorial } from '../components/indexComponents'

export const Rutas = () => {
    return (
        <Routes>
            <Route path="/" element={<PublicPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/user" element={
                <ProtectedRoute role="user">
                    <UserPage />
                </ProtectedRoute>} >
                <Route index element={<Navigate to="personaje" />} />
                <Route path="personaje" element={<UserPersonaje />} />
                <Route path="pelea" element={<UserPelea />} />
                <Route path="usuario" element={<UserUsuario />} />
                <Route path="historial" element={<UserHistorial />} />
            </Route>

            <Route path="/admin" element={
                <ProtectedRoute role="admin">
                    <AdminPage />
                </ProtectedRoute>}>
                <Route index element={<Navigate to="enemigos" />} />
                <Route path="enemigos" element={<AdminEnemigos />} />
                <Route path="usuarios" element={<AdminUsuarios />} />
                <Route path="historial" element={<AdminHistorial />} />
                <Route path="nuevoAdmin" element={<AdminNuevoAdmin />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    )
}
