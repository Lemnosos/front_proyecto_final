import { NavLink } from 'react-router'
import { UserContext } from '../context/UserContext.jsx'
import { useFetch } from '../hooks/useFetch.js'
import { useContext } from 'react'
import './NavBar.scss'

export const NavBar = () => {
    const { usuario, isLogued, logOut } = useContext(UserContext)
    const { data } = useFetch()

    return (
        <nav>
            <ul className='nav flexContainer-navBar'>
                {!isLogued &&
                    <>
                        <li>
                            <NavLink
                                to='/'
                                className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/registro'
                                className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Registro
                            </NavLink>
                        </li>
                    </>
                }
                {isLogued && usuario?.role === 'user' &&
                    <>
                        <li>
                            <NavLink to='/user/personaje'
                                className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Personaje
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/user/pelea'
                                className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Combatir
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/user/usuario'
                                className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Revisar cuenta
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/user/historial'
                                className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Historial de combates
                            </NavLink>
                        </li>
                    </>}
                {isLogued && usuario?.role === 'admin' && (
                    <>
                        <li>
                            <NavLink to='/admin/enemigos' className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Enemigos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/usuarios' className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Usuarios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/historial' className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Historial
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/nuevoAdmin' className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                                Nuevo Admin
                            </NavLink>
                        </li>
                    </>
                )}
                {isLogued &&
                    <li className="logout-btn">
                        <button onClick={logOut}>Cerrar sesión</button>
                    </li>}
            </ul>
        </nav>
    )
}
