import { Link } from 'react-router'
import './Public.pages.scss'

export const PublicPage = () => {
    return (
        <>
            <p>Al registrarte en esta página te convertirás en un guerrero que lucha contra enemigos que podrías escontrarte en una mazmorra</p>

            <p>Registrate en este <Link to="/registro">enlace</Link> y disfuta de la aventura</p>

            <p>Bienvenidos, aventureros, a <strong>TORTAZOS Y MAMPORROS</strong></p>

        </>
    )
}
