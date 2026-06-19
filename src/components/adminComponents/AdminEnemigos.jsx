import { useState, useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useFormularios } from '../../hooks/useFormularios'
import { Feedback } from '../Feedback'
import './AdminEnemigos.scss'

export const AdminEnemigos = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const [formVisible, setFormVisible] = useState(false)
    const [editando, setEditando] = useState(null)
    const { consultaApi, data, loading, error } = useFetch()
    const { values, errors, handleChange, validate, reset } = useFormularios({
        nombre: '', vida: '', ataque: '', defensa: '', velocidad: '', tipo: 'normal', url: ''
    })

    useEffect(() => {
        cargarEnemigos()
    }, [])

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
        if (!validate({
            nombre: { required: true, message: 'El nombre es obligatorio' },
            vida: { required: true, message: 'La vida es obligatoria' },
            ataque: { required: true, message: 'El ataque es obligatorio' },
            defensa: { required: true, message: 'La defensa es obligatoria' },
            velocidad: { required: true, message: 'La velocidad es obligatoria' },
            tipo: { required: true, message: 'El tipo es obligatorio' },
            url: { required: true, message: 'La url es obligatorio' },
        })) return

        const payload = {
            nombre: values.nombre,
            vida: Number(values.vida),
            ataque: Number(values.ataque),
            defensa: Number(values.defensa),
            velocidad: Number(values.velocidad),
            tipo: values.tipo,
            url: values.url
        }

        if (editando) {
            await consultaApi(`${BASE_URL}/admin/enemigos`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editando.id, ...payload })
            })
        } else {
            await consultaApi(`${BASE_URL}/admin/enemigos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
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
                            {errors.nombre && <span className="field-error">{errors.nombre}</span>}
                        </div>
                        <div>
                            <label>Vida</label>
                            <input name="vida" type="number" value={values.vida} onChange={handleChange} />
                            {errors.vida && <span className="field-error">{errors.vida}</span>}
                        </div>
                        <div>
                            <label>Ataque</label>
                            <input name="ataque" type="number" value={values.ataque} onChange={handleChange} />
                            {errors.ataque && <span className="field-error">{errors.ataque}</span>}
                        </div>
                        <div>
                            <label>Defensa</label>
                            <input name="defensa" type="number" value={values.defensa} onChange={handleChange} />
                            {errors.defensa && <span className="field-error">{errors.defensa}</span>}
                        </div>
                        <div>
                            <label>Velocidad</label>
                            <input name="velocidad" type="number" value={values.velocidad} onChange={handleChange} />
                            {errors.velocidad && <span className="field-error">{errors.velocidad}</span>}
                        </div>
                        <div>
                            <label>Tipo</label>
                            <select name="tipo" value={values.tipo} onChange={handleChange}>
                                <option value="normal">Normal</option>
                                <option value="boss">Boss</option>
                            </select>
                            {errors.tipo && <span className="field-error">{errors.tipo}</span>}
                        </div>
                        <div>
                            <label>URL de la imagen asociada</label>
                            <input name="url" value={values.url} onChange={handleChange} />
                            {errors.url && <span className="field-error">{errors.url}</span>}
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit">{editando ? 'Guardar cambios' : 'Crear'}</button>
                        <button type="button" onClick={() => setFormVisible(false)}>Cancelar</button>
                    </div>
                </form>
            )}

            <Feedback loading={loading} error={error} data={data} />

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
        </div>
    )
}
