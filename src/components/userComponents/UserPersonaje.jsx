import { useState, useEffect } from 'react'
import { useFormularios } from '../../hooks/useFormularios'
import { useFetch } from '../../hooks/useFetch'
import caballeroTranquilo from '../../assets/Caballero_tranquilo.jpg'
import { Feedback } from '../Feedback'
import './UserPersonaje.scss'

export const UserPersonaje = () => {
    const BASE_URL = import.meta.env.VITE_URL_LOCAL

    const [personaje, setPersonaje] = useState(null)
    const { data, loading, error, consultaApi } = useFetch()
    const { values, errors, handleChange, validate, reset } = useFormularios(
        { id: -1, nombre: '', vida: '100', ataque: '100', defensa: '100', velocidad: '100' })

    const tienePersonaje = !!personaje

    const traerPersonaje = () => {
        consultaApi(`${BASE_URL}/users/Personaje`, { method: 'GET' })
    }
    const handleCrear = (e) => {
        consultaApi(`${BASE_URL}/users/Personaje`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
    }
    const handleEditar = (e) => {
        console.log("Valores q se envian: ", values)
        consultaApi(`${BASE_URL}/users/Personaje`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
    }
    const handleBorrar = (e) => {
        consultaApi(`${BASE_URL}/users/Personaje`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: personaje?.id })
        })
    }

    const handleKeyDown = (e) => {
        // Permitimos solo teclas de control
        const allowedKeys = [
            'ArrowUp',
            'ArrowDown',
            'Tab'
        ]

        if (!allowedKeys.includes(e.key)) {
            e.preventDefault()
        }
    }

    useEffect(() => {
        traerPersonaje()
    }, [])

    useEffect(() => {
        if (data?.data?.personaje) {
            setPersonaje(data.data.personaje)
        }
    }, [data])

    useEffect(() => {
        if (tienePersonaje) {
            reset({
                id: personaje.id,
                nombre: personaje.nombre,
                vida: String(personaje.vida),
                ataque: String(personaje.ataque),
                defensa: String(personaje.defensa),
                velocidad: String(personaje.velocidad)
            })
        } else {
            reset()
        }
    }, [personaje])

    return (
        <>
            <h4>Datos de tu personaje</h4>

            <div className='flexContainer'>
                <div className='imgContainer'>
                    <img src={caballeroTranquilo} alt='Caballero tranquilo'></img>
                </div>

                <div className='statContainer'>
                    <li><h3>{tienePersonaje ? 'Modificar personaje' : 'Crear personaje'}</h3></li>

                    <li className='margin-top'>
                        <label htmlFor='nombre'>Nombre para el personaje</label>
                    </li>
                    <li>
                        <input id="nombre" name="nombre" placeholder="Nombre" value={values.nombre} onChange={handleChange} />
                    </li>

                    <li className='margin-top'>
                        <label htmlFor='vida'>Introduce la vida</label>
                    </li>
                    <li>
                        <input type='number' id="vida" name="vida" placeholder="100" min="50" max="200" value={values.vida} onChange={handleChange} onKeyDown={handleKeyDown} />
                    </li>

                    <li className='margin-top'>
                        <label htmlFor='ataque'>Introduce el ataque</label>
                    </li>
                    <li>
                        <input type='number' id="ataque" name="ataque" placeholder="100" min="50" max="200" value={values.ataque} onChange={handleChange} onKeyDown={handleKeyDown} />
                    </li>

                    <li className='margin-top'>
                        <label htmlFor='defensa'>Introduce la defensa</label>
                    </li>
                    <li>
                        <input type='number' id="defensa" name="defensa" placeholder="100" min="50" max="200" value={values.defensa} onChange={handleChange} onKeyDown={handleKeyDown} />
                    </li>

                    <li className='margin-top'>
                        <label htmlFor='velocidad'>Introduce la velocidad</label>
                    </li>
                    <li>
                        <input type='number' id="velocidad" name="velocidad" placeholder="100" min="50" max="200" value={values.velocidad} onChange={handleChange} onKeyDown={handleKeyDown} />
                    </li>

                    <li className='margin-top'>
                        {tienePersonaje ? (
                            <>
                                <button onClick={handleEditar}>Editar personaje</button>
                                <button onClick={handleBorrar}>Borrar personaje</button>
                            </>
                        ) : (
                            <button onClick={handleCrear}>Crear personaje</button>
                        )}
                    </li>
                </div>
            </div>
            <Feedback loading={loading} error={error} data={data} />
        </>
    )
}
