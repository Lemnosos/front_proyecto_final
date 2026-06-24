import { useContext } from 'react'
import { useFormularios } from '../../hooks/useFormularios'
import { UserContext } from '../../context/UserContext'
import './Login.scss'

export const Login = () => {
    const { values, errors, handleChange, serializarFormulario } = useFormularios({ email: '', password: '' })
    const { logIn } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formulario = serializarFormulario(e.target)
        logIn(formulario)
    }

    return (
        <form onSubmit={handleSubmit}>
            <ol>
                <li>
                    <h3>Iniciar sesión</h3>
                </li>
                <li>
                    <label htmlFor='email'>Introduce el email</label>
                </li>
                <li>
                    <input id="email" name="email" placeholder="aaaa@aaaa.aaaa" value={values.email} onChange={handleChange} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                </li>
                <li>
                    <label htmlFor='password'>Introduce la contraseña</label>
                </li>
                <li>
                    <input id="password" name="password" type="password" placeholder="contraseña" value={values.password} onChange={handleChange} />
                    {errors.password && <span className="field-error">{errors.password}</span>}
                </li>
                <li>
                    <button>Iniciar sesión</button>
                </li>
            </ol>
        </form>
    )
}
