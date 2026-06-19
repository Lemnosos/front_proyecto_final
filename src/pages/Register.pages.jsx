import { Login, Register, Feedback } from '../components/indexComponents'
import './Register.scss'

export const RegisterPage = () => {
    return (
        <div className="registerLayout">
            <Login />
            <Register />
            <Feedback />
        </div>
    )
}
