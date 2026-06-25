import { Outlet } from 'react-router'
import './User.pages.scss'
import { Feedback } from '../components'

export const UserPage = () => {
    return (
        <div className="user-page">
            <Outlet />
            <Feedback />
        </div>
    )
}
