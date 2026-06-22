import { useEffect } from 'react'
import './App.scss'
import { NavBar } from './components/NavBar'
import { Rutas } from './routes/Rutas'

function App() {

  return (
    <>
      <header>
        <p>Este es el header</p>
        <title>Tortazos y mamporros</title>
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
