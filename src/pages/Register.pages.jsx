import { Login, Register, AuthFeedback } from '../components/indexComponents'
import './Register.scss'

export const RegisterPage = () => {
    return (
        <div className="registerLayout">
            <Login />
            <Register />
            <AuthFeedback />
        </div>
    )
}
