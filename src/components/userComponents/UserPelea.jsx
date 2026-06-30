import { useState, useEffect, useRef, useReducer, useMemo } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useFetch } from '../../hooks/useFetch'
import { useCombatReducer, combateInicial } from '../../hooks/useCombatReducer'
import './UserPelea.scss'

export const UserPelea = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER

    const [personaje, setPersonaje] = useState(null)
    const [enemigo, setEnemigo] = useState(null)
    const [combate, dispatch] = useReducer(useCombatReducer, combateInicial)

    const [animJugador, setAnimJugador] = useState(null);
    const [animEnemigo, setAnimEnemigo] = useState(null);
    const [swordTarget, setSwordTarget] = useState({ x: 0, y: 0 });
    const charRef = useRef(null);
    const enemyRef = useRef(null);

    const { data, consultaApi } = useFetch();

    const iniciarCombate = () => {
        if (!personaje || !enemigo) return
        dispatch({
            type: 'INICIAR_COMBATE',
            payload: {
                hpPersonaje: personaje.vida,
                hpEnemigo: enemigo.vida,
                vidaMaxPersonaje: personaje.vida,
                vidaMaxEnemigo: enemigo.vida,
                velocidadPersonaje: personaje.velocidad,
                velocidadEnemigo: enemigo.velocidad,
                nombreJugador: personaje.nombre,
                nombreEnemigo: enemigo.nombre
            }
        })
    }

    const abandonarCombate = () => {
        if (!personaje || !enemigo) return
        consultaApi(`${BASE_URL}/users/historial`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_personaje: personaje.id,
                id_enemigo: enemigo.id,
                resultado: 'derrota',
                turnos: 0
            })
        })
        dispatch({ type: 'ABANDONAR' })
    }

    const logText = useMemo(() =>
        combate.log.map(entry => `Turno ${entry.turno} — ${entry.quien}: ${entry.detalle}`).join('\n'),
        [combate.log]
    )

    const nuevaPelea = () => {
        consultaApi(`${BASE_URL}/users/enemigo`, { method: 'GET' })
        dispatch({ type: 'RESETEAR' })
    }

    const curar = () => {
        if (!personaje) return
        dispatch({ type: 'CURAR_JUGADOR' })
        setAnimJugador('curar')
    }

    const defender = () => {
        if (!personaje) return
        dispatch({ type: 'DEFENDER_JUGADOR', payload: { defensa: personaje.defensa } })
        setAnimJugador('defender')
    }

    const atacar = () => {
        if (!personaje || !enemigo) return
        const charRect = charRef.current.getBoundingClientRect()
        const enemyRect = enemyRef.current.getBoundingClientRect()
        const dx = (enemyRect.left + enemyRect.width / 2) - (charRect.left + charRect.width / 2)
        const dy = (enemyRect.top + enemyRect.height / 2) - (charRect.top + charRect.height / 2)
        setSwordTarget({ x: dx, y: dy })
        dispatch({ type: 'ATACAR', payload: { ataque: personaje.ataque } })
        setAnimJugador('atacar')
    }

    useEffect(() => {
        Promise.all([
            consultaApi(`${BASE_URL}/users/personaje`, { method: 'GET' }),
            consultaApi(`${BASE_URL}/users/enemigo`, { method: 'GET' })
        ])
    }, [])

    useEffect(() => {
        if (data?.data?.personaje) setPersonaje(data.data.personaje)
        if (data?.data?.enemigo) setEnemigo(data.data.enemigo)
    }, [data])

    useEffect(() => {
        if (!combate.activo || combate.turno !== 'enemigo') return
        const acciones = ['atacar', 'defender', 'curar']
        const accion = acciones[Math.floor(Math.random() * 3)]

        setAnimEnemigo(accion)
        const dispatchTimer = setTimeout(() => {
            dispatch({
                type: 'TURNO_ENEMIGO',
                payload: {
                    accion,
                    ataque: enemigo.ataque,
                    defensa: enemigo.defensa,
                    vidaMax: enemigo.vida
                }
            })
        }, 3000)
        return () => clearTimeout(dispatchTimer)
    }, [combate.activo, combate.turno, enemigo])

    useEffect(() => {
        if (combate.turno === 'jugador' || combate.resultado) {
            setAnimJugador(null)
            setAnimEnemigo(null)
        }
    }, [combate.turno, combate.resultado])

    useEffect(() => {
        if (!combate.resultado || !personaje || !enemigo) return
        consultaApi(`${BASE_URL}/users/historial`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_personaje: personaje.id,
                id_enemigo: enemigo.id,
                resultado: combate.resultado,
                turnos: combate.turnos
            })
        })
    }, [combate.resultado])

    return (
        <>
            <h1>Espacio de pelea contra enemigos</h1>

            <div className='gridContainer-pelea'>

                {/* PERSONAJE */}
                <div className='personaje'>
                    <h4>Estadisticas de {personaje?.nombre}</h4>

                    <div className='imgContainer'>

                        <AnimatePresence>
                            {animJugador === 'curar' && (
                                <motion.div
                                    className="aura"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: [1, 1.6, 1.2], opacity: [0, 1, 0] }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 1.0 }}
                                />
                            )}

                            {animJugador === 'defender' && (
                                <motion.div
                                    className="shield"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: [1, 1.4, 1], opacity: [0, 1, 0.8] }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                />
                            )}

                            {animJugador === 'atacar' && (
                                <motion.img
                                    src="https://res.cloudinary.com/dymas3eqs/image/upload/f_auto/v1782743443/espada_snu3o8.jpg"
                                    className="sword"
                                    initial={{ x: 0, y: 0, opacity: 1, rotate: -45 }}
                                    animate={{ x: swordTarget.x, y: swordTarget.y, opacity: 0, rotate: 0 }}
                                    transition={{ duration: 3 }}
                                />
                            )}
                        </AnimatePresence>

                        {/* IMAGEN PERSONAJE */}
                        {
                            !combate.resultado &&
                            <img src="https://res.cloudinary.com/dymas3eqs/image/upload/f_auto/v1782226455/imagenes/caballero_tranquilo.jpg"
                                alt='Caballero del personaje' ref={charRef} />
                        }
                        {
                            combate.resultado === 'victoria' &&
                            <img src="https://res.cloudinary.com/dymas3eqs/image/upload/f_auto/v1782226477/imagenes/caballero_victorioso.jpg" loading="lazy"
                                alt='Caballero del personaje' ref={charRef} />
                        }
                        {
                            combate.resultado === 'derrota' &&
                            <img src="https://res.cloudinary.com/dymas3eqs/image/upload/f_auto/v1782226499/imagenes/caballer_derrotado.jpg" loading="lazy"
                                alt='Caballero del personaje' ref={charRef} />
                        }

                    </div>

                    <div className='estadisticas'>
                        <ol>
                            <li>Vida: {combate.hpPersonaje ?? personaje?.vida}</li>
                            <li>Ataque: {personaje?.ataque}</li>
                            <li>Defensa: {personaje?.defensa}</li>
                        </ol>
                    </div>
                </div>

                {/* PANEL CENTRAL */}
                <div className='panelCentral'>
                    {combate.resultado && (
                        <button onClick={nuevaPelea}>Iniciar nueva pelea</button>
                    )}

                    {!combate.activo && !combate.resultado && (
                        <button onClick={iniciarCombate}>Iniciar combate</button>
                    )}

                    {combate.activo && (
                        <>
                            {combate.turno === 'jugador' && (
                                <div className='acciones-fila'>
                                    <button onClick={atacar}>Atacar</button>
                                    <button onClick={defender}>Defender</button>
                                    <button onClick={curar}>Curar</button>
                                </div>
                            )}
                            {combate.turno === 'enemigo' && (
                                <p>Turno del enemigo...</p>
                            )}
                            <button onClick={abandonarCombate}>Abandonar combate</button>

                        </>
                    )}
                </div>

                {/* ENEMIGO */}
                <div className='enemigo'>
                    <h4>Estadisticas del {enemigo?.nombre}</h4>
                    <div className='imgContainer'>

                        <AnimatePresence>
                            {animEnemigo === 'curar' && (
                                <motion.div
                                    className="aura"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: [1, 1.6, 1.2], opacity: [0, 1, 0] }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 1.0 }}
                                />
                            )}

                            {animEnemigo === 'defender' && (
                                <motion.div
                                    className="shield"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: [1, 1.4, 1], opacity: [0, 1, 0.8] }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                />
                            )}

                            {animEnemigo === 'atacar' && (
                                <motion.img
                                    src="https://res.cloudinary.com/dymas3eqs/image/upload/f_auto/v1782743443/espada_snu3o8.jpg"
                                    className="sword"
                                    initial={{ scale: 0.3, opacity: 0, rotate: 45 }}
                                    animate={{ scale: [1, 1.3, 1], opacity: [0, 1, 0] }}
                                    exit={{ scale: 0.3, opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                />
                            )}
                        </AnimatePresence>

                        <img src={enemigo?.url} alt={enemigo?.nombre} ref={enemyRef} />
                    </div>
                    <div className='estadisticas'>
                        <ol>
                            <li>Vida: {combate.hpEnemigo ?? enemigo?.vida}</li>
                            <li>Ataque: {enemigo?.ataque}</li>
                            <li>Defensa: {enemigo?.defensa}</li>
                        </ol>
                    </div>
                </div>

                <textarea
                    className="combat-log"
                    readOnly
                    rows={10}
                    value={logText}
                />

            </div>

        </>
    )
}