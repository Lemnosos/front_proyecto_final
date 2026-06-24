import { useEffect } from 'react'
import './App.scss'
import { NavBar } from './components/NavBar'
import { Rutas } from './routes/Rutas'
import { UserContext } from './context/UserContext.jsx'

function App() {

  return (
    <>
      <header>
        <p>Bienvenido a la pagina del juego de Tortazos y mamporros</p>
        <NavBar />
      </header>
      <main>
        <h2>Bienvenido a Tortazos y mamporros</h2>
        <Rutas />
      </main>
      <footer>
        <p> Proyecto realizado por mí para el proyecto final del bootcamp</p>
      </footer>
    </>
  )
}

export default App
