import { NavLink } from 'react-router'
import { UserContext } from '../context/UserContext.jsx'
import { useContext } from 'react'
import './NavBar.scss'

const navLinkClass = ({ isActive }) => isActive ? 'activo' : 'normal'

export const NavBar = () => {
    const { usuario, isLogued, logOut } = useContext(UserContext)

    return (
        <nav>
            <ul className='nav flexContainer-navBar'>
                {!isLogued &&
                    <>
                        <li>
                            <NavLink
                                to='/'
                                className={navLinkClass}>
                                Inicio
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/registro'
                                className={navLinkClass}>
                                Registro
                            </NavLink>
                        </li>
                    </>
                }
                {isLogued && usuario?.role === 'user' &&
                    <>
                        <li>
                            <NavLink to='/user/personaje'
                                className={navLinkClass}>
                                Personaje
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/user/pelea'
                                className={navLinkClass}>
                                Combatir
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/user/usuario'
                                className={navLinkClass}>
                                Revisar cuenta
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/user/historial'
                                className={navLinkClass}>
                                Historial de combates
                            </NavLink>
                        </li>
                    </>}
                {isLogued && usuario?.role === 'admin' && (
                    <>
                        <li>
                            <NavLink to='/admin/enemigos' className={navLinkClass}>
                                Enemigos
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/usuarios' className={navLinkClass}>
                                Usuarios
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/historial' className={navLinkClass}>
                                Historial
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/nuevoAdmin' className={navLinkClass}>
                                Nuevo Admin
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='/admin/estadisticas' className={navLinkClass}>
                                Estadísticas
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
