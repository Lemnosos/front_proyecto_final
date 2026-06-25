import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Feedback, TablaGenerica } from '../index'
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
                <h1>Listado de los usuarios registrados</h1>
            </div>

            {!loading && (
                <>
                    <TablaGenerica
                        columnas={['Nombre', 'Apodo', 'Email', 'Rol', 'Acciones']}
                        datos={usuarios}
                        llaves={['nombre', 'apodo', 'email', 'rol']}
                        acciones={
                            [
                                {
                                    nombre: 'Borrar',
                                    onClick: (usuario) => eliminar(usuario.id),
                                    clase: 'btn-eliminar'
                                }
                            ]
                        }
                    />
                </>
            )}
        </div>
    )
}
