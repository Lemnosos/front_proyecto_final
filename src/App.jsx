import { useEffect } from 'react'
import './App.scss'
import { NavBar } from './components/NavBar'
import { Rutas } from './routes/Rutas'

function App() {

  useEffect(() => {
    document.title = 'Tortazos y Mamporros'
  }, [])

  return (
    <>
      <main>
        <h2>Bienvenido a Tortazos y mamporros</h2>
        <NavBar />
        <Rutas />
      </main>
      <footer>
        Proyecto realizado por mí para el proyecto final del bootcamp
      </footer>
    </>
  )
}

export default App
