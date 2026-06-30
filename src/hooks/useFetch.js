import { useState, useCallback } from 'react'

/**
 * Hook personalizado para peticiones HTTP con gestión de estado.
 * No retorna el JSON directamente; en su lugar expone los estados
 * `data`, `loading` y `error` que se actualizan automáticamente.
 * Todas las peticiones incluyen `credentials: 'include'` para cookies.
 *
 * @returns {{ data: object|null, loading: boolean, error: object|null, consultaApi: Function, clearFetch: Function }}
 */
export const useFetch = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const consultaApi = useCallback(async (url, opciones) => {
        setLoading(true)
        setError(null)
        setData(null)
        try {
            const res = await fetch(url, { ...opciones, credentials: 'include' })
            const json = await res.json()
            if (!res.ok) {
                setData(null)
                setError(json)
            } else {
                setData(json)
                setError(null)
            }
        } catch (err) {
            setError(err)
            setData(null)
        } finally {
            setLoading(false)
        }
    }, [])

    const clearFetch = useCallback(() => {
        setData(null)
        setError(null)
        setLoading(false)
    }, [])

    return { data, loading, error, consultaApi, clearFetch }
}
