import { useContext } from 'react'
import { useFormularios } from '../../hooks/useFormularios'
import { UserContext } from '../../context/UserContext'
import './Register.scss'
import { Feedback } from '../Feedback'

export const Register = () => {
    const { values, errors, handleChange, serializarFormulario } = useFormularios({ nombre: '', apodo: '', email: '', password: '' })
    const { register } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formulario = serializarFormulario(e.target)
        register({ ...formulario, rol: 'user' })
    }

    return (
        <>
            <form onSubmit={handleSubmit} >
                <ol>
                    <li><h3>Crear cuenta</h3></li>
                    <li>
                        <label htmlFor='nombre'>Introduce el nombre</label>
                    </li>
                    <li>
                        <input id="nombre" name="nombre" placeholder="Nombre" value={values.nombre} onChange={handleChange} />
                        {errors.nombre && <span className="field-error">{errors.nombre}</span>}
                    </li>
                    <li>
                        <label htmlFor='apodo'>Introduce el apodo</label>
                    </li>
                    <li>
                        <input id="apodo" name="apodo" placeholder="Apodo" value={values.apodo} onChange={handleChange} />
                    </li>
                    <li>
                        <label htmlFor='email'>Introduce el email</label>
                    </li>
                    <li>
                        <input id="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                        {errors.email && <span className="field-error">{errors.email}</span>}
                    </li>
                    <li>
                        <label htmlFor='password'>Introduce la contraseña</label>
                    </li>
                    <li>
                        <input id="password" name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                        {errors.password && <span className="field-error">{errors.password}</span>}
                    </li>
                    <li>
                        <input type="submit" value="Crear cuenta" />
                    </li>
                </ol>
            </form >

            <Feedback />
        </>
    )
}
