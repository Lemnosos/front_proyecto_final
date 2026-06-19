import { useState } from 'react'

export const useFormularios = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    const validate = (rules = {}) => {
        const newErrors = {}
        for (const [field, rule] of Object.entries(rules)) {
            if (rule.required && !values[field]?.trim()) {
                newErrors[field] = rule.message || 'Campo obligatorio'
            }
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const reset = (newValues) => {
        setValues(newValues ?? initialValues)
        setErrors({})
    }

    return { values, errors, handleChange, validate, reset }
}