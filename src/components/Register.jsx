import { useContext } from 'react'
import { useFormularios } from '../hooks/useFormularios'
import { UserContext } from '../context/UserContext'
import './Register.scss'
import { useFetch } from '../hooks/useFetch'

const BASE_URL = import.meta.env.VITE_URL_LOCAL

export const Register = () => {
    const { values, handleChange } = useFormularios({ email: '', password: '' })
    const { data, loading, error } = useFetch()
    const { register } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        register(values)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ol>
                    <li><h3>Crear cuenta</h3></li>
                    <li>
                        <label htmlFor='nombre'>Introduce el nombre</label>
                    </li>
                    <li>
                        <input id="nombre" name="nombre" placeholder="Nombre" value={values.nombre} onChange={handleChange} />
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
                    </li>
                    <li>
                        <label htmlFor='password'>Introduce la contraseña</label>
                    </li>
                    <li>
                        <input id="password" name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                    </li>
                    <li>
                        <input type="submit" value="Crear cuenta"></input>
                    </li>
                </ol>
            </form >
        </>
    )
}
