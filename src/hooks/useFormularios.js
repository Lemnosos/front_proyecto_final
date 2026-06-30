import { useState, useCallback } from 'react'

export const useFormularios = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setValues(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }, [errors])

    const serializarFormulario = useCallback((formularioDOM) => {
        const formData = new FormData(formularioDOM)
        return Object.fromEntries(formData.entries())
    }, [])

    const reset = useCallback((newValues) => {
        setValues(newValues ?? initialValues)
        setErrors({})
    }, [initialValues])

    return {
        values,
        errors,
        handleChange,
        serializarFormulario,
        reset
    }
}
