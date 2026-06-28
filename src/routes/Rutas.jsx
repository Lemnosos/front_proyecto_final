import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router'
import { ProtectedRoute } from './ProtectedRoute'

const AdminPage = lazy(() => import('../pages/Admin.pages').then(m => ({ default: m.AdminPage })))
const UserPage = lazy(() => import('../pages/User.pages').then(m => ({ default: m.UserPage })))
const RegisterPage = lazy(() => import('../pages/Register.pages').then(m => ({ default: m.RegisterPage })))
const PublicPage = lazy(() => import('../pages/Public.pages').then(m => ({ default: m.PublicPage })))

const AdminEnemigos = lazy(() => import('../components/adminComponents/AdminEnemigos').then(m => ({ default: m.AdminEnemigos })))
const AdminHistorial = lazy(() => import('../components/adminComponents/AdminHistorial').then(m => ({ default: m.AdminHistorial })))
const AdminNuevoAdmin = lazy(() => import('../components/adminComponents/AdminNuevoAdmin').then(m => ({ default: m.AdminNuevoAdmin })))
const AdminUsuarios = lazy(() => import('../components/adminComponents/AdminUsuarios').then(m => ({ default: m.AdminUsuarios })))
const AdminEstadisticas = lazy(() => import('../components/adminComponents/AdminEstadisticas').then(m => ({ default: m.AdminEstadisticas })))

const UserHistorial = lazy(() => import('../components/userComponents/UserHistorial').then(m => ({ default: m.UserHistorial })))
const UserPelea = lazy(() => import('../components/userComponents/UserPelea').then(m => ({ default: m.UserPelea })))
const UserPersonaje = lazy(() => import('../components/userComponents/UserPersonaje').then(m => ({ default: m.UserPersonaje })))
const UserUsuario = lazy(() => import('../components/userComponents/UserUsuario').then(m => ({ default: m.UserUsuario })))

export const Rutas = () => {
    return (
        <Suspense fallback={<p>Cargando...</p>}>
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
                    <Route path="estadisticas" element={<AdminEstadisticas />} />
                </Route>

                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </Suspense>
    )
}
