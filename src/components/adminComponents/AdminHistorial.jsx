import { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Feedback } from '../Feedback'
import './AdminHistorial.scss'

export const AdminHistorial = () => {
    const BASE_URL = import.meta.env.VITE_URL_LOCAL
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
            <h3>Historial de peleas</h3>

            <Feedback loading={loading} error={error} data={data} />

            {!loading && (
                <table className="tabla-historial">
                    <thead>
                        <tr>
                            <th>Personaje</th>
                            <th>Enemigo</th>
                            <th>Resultado</th>
                            <th>Turnos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historial.map(combate => (
                            <tr key={combate.id_pelea}>
                                <td>{combate.nombre_personaje}</td>
                                <td>{combate.nombre_enemigo}</td>
                                <td>{combate.resultado}</td>
                                <td>{combate.turnos}</td>
                            </tr>
                        ))}
                        {historial.length === 0 && (
                            <tr>
                                <td colSpan="8" className="sin-datos">No hay Historial de combates registrados</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}
