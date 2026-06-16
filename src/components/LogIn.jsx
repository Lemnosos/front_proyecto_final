import { useContext } from 'react'
import { useFormularios } from '../hooks/useFormularios'
import { UserContext } from '../context/UserContext'
import { useFetch } from '../hooks/useFetch'
import './Login.scss'

export const Login = () => {
    const { values, handleChange } = useFormularios({ email: '', password: '' })
    const { data, loading, error } = useFetch()
    const { logIn } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        logIn(values)
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
                </li>
                <li>
                    <label htmlFor='password'>Introduce la contraseña</label>
                </li>
                <li>
                    <input id="password" name="password" type="password" placeholder="contraseña" value={values.password} onChange={handleChange} />
                </li>
                <li>
                    <button>Iniciar sesión</button>
                </li>
            </ol>
        </form>
    )
}
