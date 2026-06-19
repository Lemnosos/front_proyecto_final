import { useEffect, useState } from 'react'
import { useFormularios } from '../../hooks/useFormularios'
import { useFetch } from '../../hooks/useFetch'
import './UserUsuario.scss'
import { Feedback } from '../Feedback'

export const UserUsuario = () => {
    const BASE_URL = import.meta.env.VITE_URL_LOCAL
    const [usuario, setUsuario] = useState(null)
    const { values, errors, handleChange, validate, reset } = useFormularios({ nombre: '', apodo: '', email: '', password: '' })
    const { data, loading, error, consultaApi } = useFetch()

    const tieneUsuario = !!usuario

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate({
            nombre: { required: false, message: 'El nombre es obligatorio' },
            apodo: { required: false, message: 'El nombre es obligatorio' },
            email: { required: false, message: 'El email es obligatorio' },
            password: { required: false, message: 'La contraseña es obligatoria' }
        })) return
        console.log(values)
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
                    <li><h3>Crear cuenta</h3></li>

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
                        <input id="email" name="email" value={values.email} onChange={handleChange} />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </li>

                    <li>
                        <input type="submit" value="Actualizar cuenta" />
                    </li>
                </ol>
            </form>

            <Feedback />
        </div>

    )
}
