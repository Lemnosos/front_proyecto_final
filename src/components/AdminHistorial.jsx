import { useFetch } from '../hooks/useFetch'
import './AdminHistorial.scss'

export const AdminHistorial = () => {
    const { data, loading, error } = useFetch()

    return (
        <div className="admin-historial">
            <h3>Historial de Combates</h3>
        </div>
    )
}
