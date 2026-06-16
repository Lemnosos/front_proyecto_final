import { useEffect, useContext } from 'react'
import './App.scss'
import { UserContext } from './context/UserContext'
import { NavBar } from './components/NavBar'
import { Rutas } from './routes/Rutas'

function App() {
  const { logIn, logOut } = useContext(UserContext)

  useEffect(() => {
    document.title = 'Tortazos y Mamporros'
  }, [])

  const handleLoginUser = () => logIn({ id: 1, role: 'user' })
  const handleLoginAdmin = () => logIn({ id: 2, role: 'admin' })

  return (
    <>
      <main>
        <h2>Bienvenido a Toratazos y mamporros</h2>
        <NavBar />
        <Rutas />
      </main>
      <footer>
        Proyecto realizado por mí para el proyecto final del bootcamp
        <div>
          <button onClick={handleLoginUser}>Login User</button>
          <button onClick={handleLoginAdmin}>Login Admin</button>
          <button onClick={logOut}>Logout</button>
        </div>
      </footer>
    </>
  )
}

export default App
