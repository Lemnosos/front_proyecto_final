import { Outlet } from 'react-router'
import './User.scss'

export const UserPage = () => {
    return (
        <div className="user-page">
            <Outlet />
        </div>
    )
}
