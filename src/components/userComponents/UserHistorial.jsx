import { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Feedback } from '../Feedback'
import './UserHistorial.scss'

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
        <div className="user-historial">
            <h3>Historial de peleas de tu pesonaje</h3>

            {!loading && (
                <table className="tabla-historial">
                    <thead>
                        <tr>
                            <th>Enemigo</th>
                            <th>Resultado</th>
                            <th>Turnos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map(combate => (
                            <tr key={combate.id_pelea}>
                                <td>{combate.nombre_enemigo}</td>
                                <td>{combate.resultado}</td>
                                <td>{combate.turnos}</td>
                            </tr>
                        ))}
                        {historial.length === 0 && (
                            <tr>
                                <td colSpan="3" className="sin-datos">No hay Historial de combates registrados</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            <Feedback loading={loading} error={error} data={data} />

        </div>
    )
}
