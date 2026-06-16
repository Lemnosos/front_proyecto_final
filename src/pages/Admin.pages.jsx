import { Outlet } from 'react-router'
import './Admin.scss'

export const AdminPage = () => {
    return (
        <div className="admin-page">
            <Outlet />
        </div>
    )
}
