import { useState, useEffect, useRef, useReducer } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { useFetch } from '../../hooks/useFetch'
import caballeroTranquilo from '../../assets/Caballero_tranquilo.jpg'
import caballeroDerrotado from '../../assets/Caballero_derrotado.jpg'
import caballeroVictorioso from '../../assets/Cabellero_victorioso.jpg'
import espada from '../../assets/espada.jpg'
import { combatReducer, estadoInicial } from '../../hooks/combatReducer'
import './UserPelea.scss'

export const UserPelea = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER

    const [personaje, setPersonaje] = useState(null)
    const [enemigo, setEnemigo] = useState(null)
    const [combate, dispatch] = useReducer(combatReducer, estadoInicial)

    // 🔥 estados de animación
    const [healing, setHealing] = useState(false);
    const [defending, setDefending] = useState(false);
    const [attacking, setAttacking] = useState(false);
    const [swordTarget, setSwordTarget] = useState({ x: 0, y: 0 });
    const charRef = useRef(null);
    const enemyRef = useRef(null);

    const { data, loading, error, consultaApi } = useFetch();

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
                velocidadEnemigo: enemigo.velocidad
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
                turnos: combate.turnos || 0
            })
        })
        dispatch({ type: 'ABANDONAR' })
    }

    const nuevaPelea = () => {
        consultaApi(`${BASE_URL}/users/enemigo`, { method: 'GET' })
        dispatch({ type: 'RESETEAR' })
    }

    //curar
    const curar = () => {
        if (!personaje) return
        dispatch({ type: 'CURAR_JUGADOR' })
        setHealing(true);
        setTimeout(() => setHealing(false), 1000);
    };

    //defender
    const defender = () => {
        if (!personaje) return
        dispatch({ type: 'DEFENDER_JUGADOR', payload: { defensa: personaje.defensa } })
        setDefending(true);
        setTimeout(() => setDefending(false), 900);
    };

    //atacar
    const atacar = () => {
        if (!personaje || !enemigo) return
        const charRect = charRef.current.getBoundingClientRect()
        const enemyRect = enemyRef.current.getBoundingClientRect()
        const dx = (enemyRect.left + enemyRect.width / 2) - (charRect.left + charRect.width / 2)
        const dy = (enemyRect.top + enemyRect.height / 2) - (charRect.top + charRect.height / 2)
        setSwordTarget({ x: dx, y: dy })
        dispatch({ type: 'ATACAR', payload: { ataque: personaje.ataque } })
        setAttacking(true);
        setTimeout(() => setAttacking(false), 1000);
    };

    useEffect(() => {
        consultaApi(`${BASE_URL}/users/Personaje`, { method: 'GET' })
        consultaApi(`${BASE_URL}/users/enemigo`, { method: 'GET' })
    }, [])

    useEffect(() => {
        if (data?.data?.personaje) setPersonaje(data.data.personaje)
        if (data?.data?.enemigo) setEnemigo(data.data.enemigo)
    }, [data])

    useEffect(() => {
        if (!combate.activo || combate.turno !== 'enemigo') return
        const acciones = ['atacar', 'defender', 'curar']
        const accion = acciones[Math.floor(Math.random() * 3)]
        const timer = setTimeout(() => {
            dispatch({
                type: 'TURNO_ENEMIGO',
                payload: {
                    accion,
                    ataque: enemigo.ataque,
                    defensa: enemigo.defensa,
                    vidaMax: enemigo.vida
                }
            })
        }, 1000)
        return () => clearTimeout(timer)
    }, [combate.activo, combate.turno, enemigo])

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
            <h4>Espacio de pelea contra enemigos</h4>

            <div className='flexContainer-pelea'>

                {/* PERSONAJE */}
                <div className='personaje'>
                    <h4>Estadisticas de {personaje?.nombre}</h4>

                    <div className='imgContainer'>

                        <AnimatePresence>
                            {/*CURAR */}
                            {healing && (
                                <motion.div
                                    className="aura"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: [1, 1.6, 1.2], opacity: [0, 1, 0] }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 1.0 }}
                                />
                            )}

                            {/*DEFENDER */}
                            {defending && (
                                <motion.div
                                    className="shield"
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: [1, 1.4, 1], opacity: [0, 1, 0.8] }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.9 }}
                                />
                            )}

                            {/*ATACAR */}
                            {attacking && (
                                <motion.img
                                    src={espada}
                                    className="sword"
                                    initial={{ x: 0, y: 0, opacity: 1, rotate: -45 }}
                                    animate={{ x: swordTarget.x, y: swordTarget.y, opacity: 0, rotate: 0 }}
                                    transition={{ duration: 1 }}
                                />
                            )}
                        </AnimatePresence>

                        {/* IMAGEN PERSONAJE */}
                        {
                            !combate.resultado &&
                            <img src={caballeroTranquilo} alt='Caballero del personaje' ref={charRef} />
                        }
                        {
                            combate.resultado === 'victoria' &&
                            <img src={caballeroVictorioso} alt='Caballero del personaje' ref={charRef} />
                        }
                        {
                            combate.resultado === 'derrota' &&
                            <img src={caballeroDerrotado} alt='Caballero del personaje' ref={charRef} />
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
                                <>
                                    <button onClick={atacar}>Atacar</button>
                                    <button onClick={defender}>Defender</button>
                                    <button onClick={curar}>Curar</button>
                                </>
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

            </div>
        </>
    )
}