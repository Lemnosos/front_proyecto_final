import { useFetch } from '../hooks/useFetch'
import './AdminNuevoAdmin.scss'

export const AdminNuevoAdmin = () => {
    const { data, loading, error } = useFetch()

    return (
        <div className="admin-nuevo-admin">
            <h3>Nuevo Administrador</h3>
        </div>
    )
}
