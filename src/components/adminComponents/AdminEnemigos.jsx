import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useFormularios } from '../../hooks/useFormularios'
import { Feedback } from '../Feedback'
import './AdminEnemigos.scss'

export const AdminEnemigos = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const [formVisible, setFormVisible] = useState(false)
    const [editando, setEditando] = useState(null)

    const [image, setImage] = useState(null);
    const [name, setName] = useState("");

    const { consultaApi, data, loading, error } = useFetch()
    const { values, errors, handleChange, serializarFormulario, reset } = useFormularios({
        nombre: '', vida: '', ataque: '', defensa: '', velocidad: '', tipo: 'normal', url: ''
    })



    const cargarEnemigos = () => {
        consultaApi(`${BASE_URL}/admin/enemigos`, { method: 'GET' })
    }

    const enemigos = data?.data?.enemigos || []

    const abrirFormCrear = () => {
        setEditando(null)
        reset()
        setFormVisible(true)
    }

    const abrirFormEditar = (enemigo) => {
        setEditando(enemigo)
        reset({
            nombre: enemigo.nombre,
            vida: String(enemigo.vida),
            ataque: String(enemigo.ataque),
            defensa: String(enemigo.defensa),
            velocidad: String(enemigo.velocidad),
            tipo: enemigo.tipo,
            url: enemigo.url
        })
        setFormVisible(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('nombre', values.nombre)
        formData.append('vida', values.vida)
        formData.append('ataque', values.ataque)
        formData.append('defensa', values.defensa)
        formData.append('velocidad', values.velocidad)
        formData.append('tipo', values.tipo)
        if (image) formData.append('image', image)

        if (editando) {
            await consultaApi(`${BASE_URL}/admin/enemigos`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, id: editando.id })
            })
        } else {
            await consultaApi(`${BASE_URL}/admin/enemigos`, {
                method: 'POST',
                body: formData
            })
        }

        setFormVisible(false)
        cargarEnemigos()
    }

    const eliminar = async (id) => {
        if (!confirm('¿Estás seguro de eliminar este enemigo?')) return
        await consultaApi(`${BASE_URL}/admin/enemigos`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        })
        cargarEnemigos()
    }

    useEffect(() => {
        cargarEnemigos()
    }, [])

    return (
        <div className="admin-enemigos">
            <div className="header">
                <h3>Enemigos</h3>
                <button onClick={abrirFormCrear} className="btn-crear">Crear enemigo</button>
            </div>

            {formVisible && (
                <form onSubmit={handleSubmit} className="form-enemigo">
                    <h4>{editando ? 'Editar enemigo' : 'Nuevo enemigo'}</h4>
                    <div className="form-grid">
                        <div>
                            <label>Nombre</label>
                            <input name="nombre" value={values.nombre} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Vida</label>
                            <input name="vida" type="number" value={values.vida} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Ataque</label>
                            <input name="ataque" type="number" value={values.ataque} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Defensa</label>
                            <input name="defensa" type="number" value={values.defensa} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Velocidad</label>
                            <input name="velocidad" type="number" value={values.velocidad} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Tipo</label>
                            <select name="tipo" value={values.tipo} onChange={handleChange}>
                                <option value="normal">Normal</option>
                                <option value="boss">Boss</option>
                            </select>
                        </div>
                        <div>
                            <label>Imagen asociada al enemigo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit">{editando ? 'Guardar cambios' : 'Crear'}</button>
                        <button type="button" onClick={() => setFormVisible(false)}>Cancelar</button>
                    </div>
                </form>
            )}

            {!loading && (
                <table className="tabla-enemigos">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Vida</th>
                            <th>Ataque</th>
                            <th>Defensa</th>
                            <th>Velocidad</th>
                            <th>Tipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enemigos.map(enemigo => (
                            <tr key={enemigo.id}>
                                <td>{enemigo.nombre}</td>
                                <td>{enemigo.vida}</td>
                                <td>{enemigo.ataque}</td>
                                <td>{enemigo.defensa}</td>
                                <td>{enemigo.velocidad}</td>
                                <td>{enemigo.tipo}</td>
                                <td className="acciones">
                                    <button onClick={() => abrirFormEditar(enemigo)} className="btn-editar">Editar</button>
                                    <button onClick={() => eliminar(enemigo.id)} className="btn-eliminar">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                        {enemigos.length === 0 && (
                            <tr>
                                <td colSpan="8" className="sin-datos">No hay enemigos registrados</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            <Feedback loading={loading} error={error} data={data} />
        </div>
    )
}
