import { useEffect, useState } from 'react'
import { useFormularios } from '../../hooks/useFormularios'
import { useFetch } from '../../hooks/useFetch'
import './UserUsuario.scss'
import { Feedback } from '../Feedback'

export const UserUsuario = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const [usuario, setUsuario] = useState(null)
    const { values, errors, handleChange, reset } = useFormularios({ nombre: '', apodo: '', email: '', password: '' })
    const { data, loading, error, consultaApi } = useFetch()

    const tieneUsuario = !!usuario

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!usuario) return
        await consultaApi(`${BASE_URL}/users/usuarios/${usuario.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ apodo: values.apodo })
        })
        traerUsuario()
    }

    const traerUsuario = () => {
        consultaApi(`${BASE_URL}/users/usuarios`, { method: 'GET' })
    }

    useEffect(() => {
        traerUsuario()
    }, [])

    useEffect(() => {
        if (data?.data?.usuario) {
            setUsuario(data.data.usuario)
        }
    }, [data])

    useEffect(() => {
        if (tieneUsuario) {
            reset({
                nombre: usuario.nombre,
                apodo: usuario.apodo,
                email: usuario.email,
                password: usuario.password,
                rol: usuario.rol
            })
        } else {
            reset()
        }
    }, [usuario])

    return (
        <div className='flexContainer-usuario'>
            <form onSubmit={handleSubmit}>
                <ol>
                    <li><h1>Revisar datos de la cuenta</h1></li>

                    <li>
                        <label htmlFor='nombre'>Introduce el nombre</label>
                    </li>
                    <li>
                        <input id="nombre" name="nombre" value={values.nombre} readOnly />
                    </li>

                    <li>
                        <label htmlFor='apodo'>Introduce el apodo</label>
                    </li>
                    <li>
                        <input id="apodo" name="apodo" value={values.apodo} onChange={handleChange} />
                        {errors.apodo && <span className="field-error">{errors.apodo}</span>}
                    </li>

                    <li>
                        <label htmlFor='email'>Introduce el email</label>
                    </li>
                    <li>
                        <input id="email" name="email" value={values.email} readOnly />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </li>

                    <li>
                        <input type="submit" value="Actualizar cuenta" />
                    </li>
                </ol>
            </form>
        </div>

    )
}
