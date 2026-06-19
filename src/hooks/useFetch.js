import { useState } from 'react'

export const useFetch = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

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

    const clearFetch = () => {
        setData(null)
        setError(null)
        setLoading(false)
    }

    return { data, loading, error, consultaApi, clearFetch }
}
