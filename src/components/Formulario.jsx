import { useState, useEffect } from 'react'
import { useFormularios } from '../hooks/useFormularios'

export const Formulario = (titulo = '', valores) => {
    const { values, serializarFormulario, handleChange } = useFormularios
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault()
        serializarFormulario(e.target)
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <h4>{titulo}</h4>
            <div className="form-grid">
                <div>
                    <label>Nombre</label>
                    <input name="nombre" value={valores.nombre} onChange={handleChange} />
                </div>
                <div>
                    <label>Vida</label>
                    <input name="vida" type="number" value={valores.vida} onChange={handleChange} />
                </div>
                <div>
                    <label>Ataque</label>
                    <input name="ataque" type="number" value={valores.ataque} onChange={handleChange} />
                </div>
                <div>
                    <label>Defensa</label>
                    <input name="defensa" type="number" value={valores.defensa} onChange={handleChange} />
                </div>
                <div>
                    <label>Velocidad</label>
                    <input name="velocidad" type="number" value={valores.velocidad} onChange={handleChange} />
                </div>
                {(valores.tipo) &&
                    <div>
                        <label>Tipo</label>
                        <select name="tipo" value={values.tipo} onChange={handleChange}>
                            <option value="normal">Normal</option>
                            <option value="boss">Boss</option>
                        </select>
                    </div>}
                {(valores.url) &&
                    <div>
                        <label>Imagen asociada al enemigo</label>
                        <img href={valores.url}></img>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                }
            </div>
            <div className="form-actions">
                <button type="button" onClick=''>Crear</button>
                <button type="button" onClick=''>Editar</button>
                <button type="button" onClick=''>Borrar</button>
            </div>
        </form>
    )
}
