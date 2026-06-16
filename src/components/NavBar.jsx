import { NavLink } from 'react-router'
import { UserContext } from '../context/UserContext.jsx'
import { useContext } from 'react'
import './NavBar.scss'

export const NavBar = () => {
    const { usuario, isLogued } = useContext(UserContext)

    return (
        <nav>
            <ul className='nav flexContainer'>
                <li>
                    <NavLink
                        to='/registro'
                        className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                        Registro
                    </NavLink>
                </li>
                {isLogued && usuario?.role === 'user' &&
                    <li>
                        <NavLink
                            to='/user'
                            className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                            Info Usuario
                        </NavLink>
                    </li>}
                {isLogued && usuario?.role === 'admin' &&
                    <li>
                        <NavLink
                            to='/admin'
                            className={({ isActive }) => isActive ? 'activo' : 'normal'}>
                            Info Admin
                        </NavLink>
                    </li>}
            </ul>
        </nav>
    )
}
