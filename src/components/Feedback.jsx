import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import './Feedback.scss'

export const Feedback = () => {
    const { loading, error, data } = useContext(UserContext)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (loading || error || data?.data?.msg) {
            setVisible(true)

            const timer = setTimeout(() => {
                setVisible(false)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [loading, error, data])

    if (!visible) return <></>

    return (
        <div className="auth-feedback">
            {loading && (
                <div className="feedback loading">
                    Carganding...
                </div>
            )}

            {error && (
                <div className="feedback error-msg">
                    {error.error || 'Error desconocido'}
                </div>
            )}

            {data?.data?.msg && (
                <div className="feedback success-msg">
                    {data.data.msg}
                </div>
            )}
        </div>
    )
}