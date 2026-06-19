import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import './Feedback.scss'

/**
 * Componente que muestra feedback al usuario (cargando, error, éxito).
 * Acepta props opcionales `loading`, `error` y `data`; si no se pasan,
 * intenta obtenerlos del UserContext como fallback.
 * Esto permite usarlo tanto con useFetch local (AdminEnemigos) como
 * con el contexto global (Login, Register).
 *
 * @param {{ loading?: boolean, error?: object|null, data?: object|null }} props
 */
export const Feedback = ({ loading: propLoading, error: propError, data: propData }) => {
    const context = useContext(UserContext)
    const loading = propLoading !== undefined ? propLoading : context?.loading
    const error = propError !== undefined ? propError : context?.error
    const data = propData !== undefined ? propData : context?.data

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
            {data && !error && !loading && data?.data?.msg && (
                <div className="feedback success-msg">
                    {data.data.msg}
                </div>
            )}
        </div>
    )
}
