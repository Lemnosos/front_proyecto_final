import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import caballeroTranquilo from '../../assets/Caballero_tranquilo.jpg'
import caballeroDerrotado from '../../assets/Caballero_derrotado.jpg'
import caballeroVictorioso from '../../assets/Cabellero_victorioso.jpg'
import './UserPelea.scss'

export const UserPelea = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const [resultado, setResultado] = useState(null)
    const [personaje, setPersonaje] = useState(null)
    const [enemigo, setEnemigo] = useState(null)
    const { data, loading, error, consultaApi } = useFetch()

    const calcularResultado = () => {

        if (!personaje || !enemigo) return

        const t_personaje = enemigo.vida / personaje.ataque
        const t_enemigo = personaje.vida / enemigo.ataque
        const resultado = t_personaje <= t_enemigo ? 'victoria' : 'derrota'
        setResultado(resultado)

        const combate = {
            id_personaje: personaje.id,
            id_enemigo: enemigo.id,
            resultado,
            turnos: Math.ceil(Math.min(t_personaje, t_enemigo))
        }

        consultaApi(`${BASE_URL}/users/historial`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combate)
        })

    }

    const abandonarCombate = () => {
        if (!personaje || !enemigo) return

        const combate = {
            id_personaje: personaje.id,
            id_enemigo: enemigo.id,
            resultado: 'derrota',
            turnos: 0
        }

        setResultado('derrota')

        consultaApi(`${BASE_URL}/users/historial`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(combate)
        })
    }

    const NuevaPelea = () => {
        consultaApi(`${BASE_URL}/users/enemigo`, { method: 'GET' })
        setResultado(null)
    }

    useEffect(() => {
        consultaApi(`${BASE_URL}/users/Personaje`, { method: 'GET' })
        consultaApi(`${BASE_URL}/users/enemigo`, { method: 'GET' })
    }, [])

    useEffect(() => {
        if (data?.data?.personaje) setPersonaje(data.data.personaje)
        if (data?.data?.enemigo) setEnemigo(data.data.enemigo)
    }, [data])

    return (
        <>
            <h4>Espacio de pelea contra enemigos</h4>

            <div className='flexContainer-pelea'>

                <div className='personaje'>
                    <h4>Estadisticas de {personaje?.nombre}</h4>
                    <div className='imgContainer'>
                        {
                            !resultado &&
                            <img src={caballeroTranquilo} alt='Caballero del personaje'></img>
                        }
                        {
                            resultado === 'victoria' &&
                            <img src={caballeroVictorioso} alt='Caballero del personaje'></img>
                        }
                        {
                            resultado === 'derrota' &&
                            <img src={caballeroDerrotado} alt='Caballero del personaje'></img>
                        }
                    </div>
                    <div className='estadisticas'>
                        <ol>
                            <li>
                                Vida: {personaje?.vida}
                            </li>
                            <li>
                                Ataque: {personaje?.ataque}
                            </li>
                            <li>
                                Defensa: {personaje?.defensa}
                            </li>
                        </ol>
                    </div>
                </div>

                <div className='panelCentral'>
                    {
                        resultado && <button onClick={NuevaPelea}>Iniciar nueva pelea</button>
                    }

                    <button onClick={calcularResultado}>Iniciar combate</button>
                    <button onClick={abandonarCombate}>Abandonar combate</button>
                </div>

                <div className='enemigo'>
                    <h4>Estadisticas del {enemigo?.nombre}</h4>
                    <div className='imgContainer'>
                        <img src={enemigo?.url} alt={enemigo?.nombre}></img>
                    </div>
                    <div className='estadisticas'>
                        <ol>
                            <li>
                                Vida: {enemigo?.vida}
                            </li>
                            <li>
                                Ataque: {enemigo?.ataque}
                            </li>
                            <li>
                                Defensa: {enemigo?.defensa}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    )
}