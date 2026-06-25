import { Login, Register, Feedback } from '../components/index'
import './Register.pages.scss'

export const RegisterPage = () => {
    return (
        <>
            <h1>Registro</h1>
            <div className="registerLayout">
                <Login />
                <Register />
                <Feedback />
            </div>
        </>

    )
}
