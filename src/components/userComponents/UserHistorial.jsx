import { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { TablaGenerica } from '../index'

export const UserHistorial = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const { consultaApi, data, loading, error } = useFetch()

    const cargarHistorial = () => {
        consultaApi(`${BASE_URL}/users/historial`, { method: 'GET' })
    }

    const historial = data?.data?.combates || []

    useEffect(() => {
        cargarHistorial()
    }, [])


    return (
        <div className="user-historial page-center">
            <h1>Historial de peleas de tu pesonaje</h1>

            {!loading && (
                <TablaGenerica
                    datos={historial}
                    columnas={['Enemigo', 'Resultado', 'Turnos']}
                    llaves={['nombre_enemigo', 'resultado', 'turnos']}
                />
            )}

        </div>
    )
}
