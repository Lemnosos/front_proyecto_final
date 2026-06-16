import { useState } from 'react'

export const useFetch = (url, opciones) => {

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const consultaApi = async (url, opciones) => {
        let res
        try {
            res = await fetch(url, opciones)
            if (!res.ok) {
                setData(null)
                setLoading(false)
                setError(res.json())

            } else {
                const json = await res.json()
                setData(json)
                setLoading(false)
                setError(null)
            }
        } catch (error) {
            setData(null)
            setLoading(false)
            setError(error)
        }
    }

    return { data, loading, error, consultaApi }
}
