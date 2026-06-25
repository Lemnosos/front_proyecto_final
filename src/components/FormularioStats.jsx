import { useState } from 'react'
import { useFormularios } from '../hooks/useFormularios'
import './FormularioStats.scss'

export const FormularioStats = (
    {
        initialValues =
        {
            nombre: '',
            vida: '',
            ataque: '',
            defensa: '',
            velocidad: '',
            tipo: 'normal',
            url: ''
        },
        onSubmit,
        onCancel,
        isEditando = false
    }
) => {
    const { values, handleChange } = useFormularios(initialValues)
    const [image, setImage] = useState(null);

    return (
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(values, image); }} className="form-enemigos">
            <h2>{isEditando ? 'Editar enemigo' : 'Nuevo enemigo'}</h2>
            {isEditando ? (
                <div className="edit-layout">
                    <div className="edit-image">
                        {values.url && (
                            <>
                                <label>Imagen actual</label>
                                <img src={values.url} alt="Enemigo" />
                            </>
                        )}
                    </div>
                    <div className="form-grid edit-stats">
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
                    </div>
                </div>
            ) : (
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
                    <div className="full-width">
                        <label>Imagen asociada al enemigo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                </div>
            )}
            <div className="form-actions">
                <button type="submit">{isEditando ? 'Guardar cambios' : 'Crear'}</button>
                <button type="button" onClick={onCancel}>Cancelar</button>
            </div>
        </form>
    )
}
