import { useState } from 'react'

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

    /**
     * Ejecuta una petición HTTP con fetch.
     * Asigna automáticamente `credentials: 'include'` para enviar cookies.
     * Actualiza `data`, `loading` y `error` según el resultado.
     *
     * @param {string} url  - Endpoint al que realizar la petición
     * @param {object} opciones - Opciones de fetch (method, headers, body, etc.)
     */
    const consultaApi = async (url, opciones) => {
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
    }

    /**
     * Reinicia los tres estados (data, loading, error) a sus valores iniciales.
     */
    const clearFetch = () => {
        setData(null)
        setError(null)
        setLoading(false)
    }

    return { data, loading, error, consultaApi, clearFetch }
}
