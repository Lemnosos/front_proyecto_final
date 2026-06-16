import { useFetch } from '../hooks/useFetch'
import './AdminUsuarios.scss'

export const AdminUsuarios = () => {
    const { data, loading, error } = useFetch()

    return (
        <div className="admin-usuarios">
            <h3>Usuarios</h3>
        </div>
    )
}
