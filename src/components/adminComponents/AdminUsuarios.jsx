import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useFormularios } from '../../hooks/useFormularios'
import { Feedback } from '../Feedback'
import './AdminUsuarios.scss'

export const AdminUsuarios = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const { consultaApi, data, loading, error } = useFetch()

    useEffect(() => {
        cargarUsuarios()
    }, [])

    const cargarUsuarios = () => {
        consultaApi(`${BASE_URL}/admin/usuarios`, { method: 'GET' })
    }

    const usuarios = data?.data?.usuarios || []

    const eliminar = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este usuario?')) return
        await consultaApi(`${BASE_URL}/admin/usuarios/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        cargarUsuarios()
    }

    return (
        <div className="admin-usuarios">
            <div className="header">
                <h3>Listado de los usuarios registrados</h3>
            </div>

            <Feedback loading={loading} error={error} data={data} />

            {!loading && (
                <table className="tabla-usuarios">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apodo</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apodo}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.rol}</td>
                                <td className="acciones">
                                    <button onClick={() => eliminar(usuario.id)} className="btn-eliminar">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {usuarios.length === 0 && (
                            <tr>
                                <td colSpan="8" className="sin-datos">No hay usuarios registrados</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}
