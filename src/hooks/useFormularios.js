import { useState } from 'react'

/**
 * Hook personalizado para manejo de formularios con validación.
 * Centraliza el estado de los campos y los errores, evitando
 * lógica repetitiva en cada componente.
 *
 * @param {object} initialValues - Valores iniciales del formulario
 * @returns {{ values: object, errors: object, handleChange: Function, validate: Function, reset: Function }}
 */
export const useFormularios = (initialValues = {}) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    /**
     * Actualiza el campo correspondiente en `values` al escribir.
     * Si ese campo tenía un error, lo limpia automáticamente.
     *
     * @param {Event} e - Evento del input (debe tener `target.name` y `target.value`)
     */
    const handleChange = (e) => {
        const { name, value } = e.target
        setValues(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
        }
    }

    /**
     * Valida los campos según las reglas proporcionadas.
     * Cada regla debe tener la forma `{ required: boolean, message: string }`.
     *
     * @param {object} rules - Objeto con reglas: `{ campo: { required, message } }`
     * @returns {boolean} `true` si no hay errores, `false` en caso contrario
     */
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

    /**
     * Reinicia los valores del formulario.
     * Si se proporciona `newValues`, usa esos; si no, vuelve a `initialValues`.
     * También limpia todos los errores.
     *
     * @param {object|null} newValues - Nuevos valores opcionales para el formulario
     */
    const reset = (newValues) => {
        setValues(newValues ?? initialValues)
        setErrors({})
    }

    return { values, errors, handleChange, validate, reset }
}
