export const estadoInicial = {}

export const formularioReducer = (state, action) => {
    switch (action.type) {
        case 'INICIAR_COMBATE': {
            return {}
        }

        case 'ATACAR': {
            return {}
        }

        case 'DEFENDER_JUGADOR': {
            return {}
        }

        case 'CURAR_JUGADOR': {
            return {}
        }

        case 'TURNO_ENEMIGO': {

            return {}
        }

        case 'ABANDONAR': {
            return {}
        }

        case 'RESETEAR': {
            return {}
        }

        default:
            return {}
    }
}
