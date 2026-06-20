export const estadoInicial = {
    activo: false,
    turno: null,
    hpPersonaje: null,
    hpEnemigo: null,
    vidaMaxPersonaje: null,
    vidaMaxEnemigo: null,
    defensaJugador: 0,
    defensaEnemigo: 0,
    turnos: 0,
    resultado: null
}

export const combatReducer = (state, action) => {
    switch (action.type) {
        case 'INICIAR_COMBATE': {
            const velPersonaje = action.payload.velocidadPersonaje
            const velEnemigo = action.payload.velocidadEnemigo
            const primerTurno = velPersonaje >= velEnemigo ? 'jugador' : 'enemigo'
            return {
                ...state,
                activo: true,
                turno: primerTurno,
                hpPersonaje: action.payload.hpPersonaje,
                hpEnemigo: action.payload.hpEnemigo,
                vidaMaxPersonaje: action.payload.vidaMaxPersonaje,
                vidaMaxEnemigo: action.payload.vidaMaxEnemigo,
                defensaJugador: 0,
                defensaEnemigo: 0,
                turnos: 0,
                resultado: null
            }
        }

        case 'ATACAR': {
            const dano = Math.max(0, action.payload.ataque - state.defensaEnemigo)
            const nuevoHp = state.hpEnemigo - dano
            if (nuevoHp <= 0) {
                return {
                    ...state,
                    hpEnemigo: 0,
                    defensaEnemigo: 0,
                    turnos: state.turnos + 1,
                    activo: false,
                    turno: null,
                    resultado: 'victoria'
                }
            }
            return {
                ...state,
                hpEnemigo: nuevoHp,
                defensaEnemigo: 0,
                turnos: state.turnos + 1,
                turno: 'enemigo'
            }
        }

        case 'DEFENDER_JUGADOR': {
            return {
                ...state,
                defensaJugador: action.payload.defensa,
                turnos: state.turnos + 1,
                turno: 'enemigo'
            }
        }

        case 'CURAR_JUGADOR': {
            const curacion = Math.round(state.vidaMaxPersonaje * 0.25)
            const nuevoHp = Math.min(state.hpPersonaje + curacion, state.vidaMaxPersonaje)
            return {
                ...state,
                hpPersonaje: nuevoHp,
                turnos: state.turnos + 1,
                turno: 'enemigo'
            }
        }

        case 'TURNO_ENEMIGO': {
            const { accion, ataque, defensa, vidaMax } = action.payload

            if (accion === 'atacar') {
                const dano = Math.max(0, ataque - state.defensaJugador)
                const nuevoHp = state.hpPersonaje - dano
                if (nuevoHp <= 0) {
                    return {
                        ...state,
                        hpPersonaje: 0,
                        defensaJugador: 0,
                        turnos: state.turnos + 1,
                        activo: false,
                        turno: null,
                        resultado: 'derrota'
                    }
                }
                return {
                    ...state,
                    hpPersonaje: nuevoHp,
                    defensaJugador: 0,
                    turnos: state.turnos + 1,
                    turno: 'jugador'
                }
            }

            if (accion === 'defender') {
                return {
                    ...state,
                    defensaEnemigo: defensa,
                    turnos: state.turnos + 1,
                    turno: 'jugador'
                }
            }

            if (accion === 'curar') {
                const curacion = Math.round(vidaMax * 0.15)
                const nuevoHp = Math.min(state.hpEnemigo + curacion, state.vidaMaxEnemigo)
                return {
                    ...state,
                    hpEnemigo: nuevoHp,
                    turnos: state.turnos + 1,
                    turno: 'jugador'
                }
            }

            return state
        }

        case 'ABANDONAR': {
            return {
                ...estadoInicial,
                resultado: 'derrota'
            }
        }

        case 'RESETEAR': {
            return { ...estadoInicial }
        }

        default:
            return state
    }
}
