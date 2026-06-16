import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import './AuthFeedback.scss'

export const AuthFeedback = () => {
    const { data, loading, error } = useContext(UserContext)

    return (
        <div className="auth-feedback">
            {loading && (
                <div className="feedback loading">
                    Cargando...
                </div>
            )}
            {error && !loading && (
                <div className="feedback error-msg">
                    {error?.error || 'Error desconocido'}
                </div>
            )}
            {data && !error && !loading && (
                <div className="feedback success-msg">
                    {data?.data?.msg || 'Operación exitosa'}
                </div>
            )}
        </div>
    )
}
