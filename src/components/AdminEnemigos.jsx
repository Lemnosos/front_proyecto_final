import { useFetch } from '../hooks/useFetch'
import './AdminEnemigos.scss'

export const AdminEnemigos = () => {
    const { data, loading, error } = useFetch()

    return (
        <div className="admin-enemigos">
            <h3>Enemigos</h3>
        </div>
    )
}
