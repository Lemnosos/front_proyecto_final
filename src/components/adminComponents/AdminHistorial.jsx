import { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { TablaGenerica } from '../index'
import './AdminHistorial.scss'

export const AdminHistorial = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const { consultaApi, data, loading, error } = useFetch()

    useEffect(() => {
        cargarHistorial()
    }, [])

    const cargarHistorial = () => {
        consultaApi(`${BASE_URL}/admin/historial`, { method: 'GET' })
    }

    const historial = data?.data?.combates || []

    return (
        <div className="admin-historial">
            <h1>Historial de peleas</h1>

            {!loading && (
                <TablaGenerica
                    datos={historial}
                    columnas={['Personaje', 'Enemigo', 'Resultado', 'Turnos']}
                    llaves={['nombre_personaje', 'nombre_enemigo', 'resultado', 'turnos']} />
            )}

        </div>
    )
}
