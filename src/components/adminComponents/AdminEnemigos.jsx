import { useState, useEffect, useMemo } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { Feedback, FormularioStats, TablaGenerica } from '../index'
import './AdminEnemigos.scss'

export const AdminEnemigos = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const [formVisible, setFormVisible] = useState(false)
    const [editando, setEditando] = useState(null)

    const { consultaApi, data, loading, error } = useFetch()

    const cargarEnemigos = () => {
        consultaApi(`${BASE_URL}/admin/enemigos`, { method: 'GET' })
    }

    const enemigos = data?.data?.enemigos || []

    const abrirFormCrear = () => {
        setEditando(null)
        setFormVisible(true)
    }

    const abrirFormEditar = (enemigo) => {
        setEditando(enemigo)
        setFormVisible(true)
    }

    const handleSubmit = async (values, image) => {
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

    const initialValues = useMemo(() =>
        editando ? {
            nombre: editando.nombre,
            vida: String(editando.vida),
            ataque: String(editando.ataque),
            defensa: String(editando.defensa),
            velocidad: String(editando.velocidad),
            tipo: editando.tipo,
            url: editando.url
        } : undefined,
        [editando]
    )

    const acciones = useMemo(() => [
        { nombre: 'Editar', onClick: (enemigo) => abrirFormEditar(enemigo), clase: 'btn-editar' },
        { nombre: 'Borrar', onClick: (enemigo) => eliminar(enemigo.id), clase: 'btn-eliminar' }
    ], [])

    return (
        <div className="admin-enemigos">
            <div className="header">
                <h1>Enemigos</h1>
                <button onClick={abrirFormCrear} className="btn-crear">Crear enemigo</button>
            </div>

            {formVisible && (
                <FormularioStats
                    key={editando?.id ?? 'crear'}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    onCancel={() => setFormVisible(false)}
                    isEditando={!!editando}
                />
            )}

            {!loading && (
                <>
                    <TablaGenerica
                        datos={enemigos}
                        columnas={['Nombre', 'Vida', 'Ataque', 'Defensa', 'Velocidad', 'Tipo']}
                        llaves={['nombre', 'vida', 'ataque', 'defensa', 'velocidad', 'tipo']}
                        acciones={acciones}
                    />
                </>
            )}
        </div>
    )
}
