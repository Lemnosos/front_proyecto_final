import './App.scss'
import { NavBar } from './components/NavBar'
import { Rutas } from './routes/Rutas'

function App() {

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h2>Tortazos y mamporros</h2>
        <Rutas />
      </main>
      <footer>
        <p> Proyecto realizado por mí para el proyecto final del bootcamp</p>
      </footer>
    </>
  )
}

export default App
