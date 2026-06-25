import { Outlet } from 'react-router'
import './Admin.pages.scss'
import { Feedback } from '../components'

export const AdminPage = () => {
    return (
        <div className="admin-page">
            <Outlet />
            <Feedback />
        </div>
    )
}
