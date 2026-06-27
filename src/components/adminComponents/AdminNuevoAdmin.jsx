import { useContext } from 'react'
import { useFormularios } from '../../hooks/useFormularios'
import { UserContext } from '../../context/UserContext'
import { Feedback } from '../Feedback'
import { useNavigate } from 'react-router'


export const AdminNuevoAdmin = () => {
    const navigate = useNavigate()
    const { values, errors, handleChange, serializarFormulario } = useFormularios({ nombre: '', apodo: '', email: '', password: '' })
    const { register } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formulario = serializarFormulario(e.target)
        const nuevoUsuario = { ...formulario, rol: 'admin' }
        await register(nuevoUsuario)
        navigate('/admin/usuarios')
    }

    return (
        <div className="admin-nuevo-admin page-center">
            <form onSubmit={handleSubmit}>
                <ol>
                    <li>
                        <h1>Crear nueva cuenta de administrador</h1>
                    </li>
                    <li>
                        <label htmlFor='nombre'>Introduce el nombre</label>
                    </li>
                    <li>
                        <input id="nombre" name="nombre" placeholder="Nombre" value={values.nombre} onChange={handleChange} />
                        {errors.nombre && <span className="field-error">{errors.nombre}</span>}
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
            </form>
        </div>
    )
}
