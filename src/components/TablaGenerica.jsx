import { useState, useMemo, memo } from 'react'
import './TablaGenerica.scss'

export const TablaGenerica = memo(({ datos = [], columnas = [], llaves, acciones = [] }) => {
    const [paginaActual, setPaginaActual] = useState(1)
    const [itemsPorPagina, setItemsPorPagina] = useState(10)

    const totalPaginas = itemsPorPagina === Infinity ? 1 : Math.ceil(datos.length / itemsPorPagina)
    const inicio = (paginaActual - 1) * itemsPorPagina
    const fin = itemsPorPagina === Infinity ? datos.length : inicio + itemsPorPagina
    const datosPagina = useMemo(() => datos.slice(inicio, fin), [datos, inicio, fin])

    const cambiarPagina = (pagina) => {
        setPaginaActual(Math.max(1, Math.min(pagina, totalPaginas)))
    }

    const cambiarItemsPorPagina = (e) => {
        const valor = e.target.value
        setItemsPorPagina(valor === 'todos' ? Infinity : Number(valor))
        setPaginaActual(1)
    }

    const numerosPagina = useMemo(() => {
        const arr = []
        for (let i = 1; i <= totalPaginas; i++) arr.push(i)
        return arr
    }, [totalPaginas])

    if (datos.length === 0 && columnas.length === 0 && acciones.length === 0)
        return <p>No se puede generar la tabla</p>

    return (
        <div className="tabla-datos-wrapper">
            <table className="tabla-datos">
                <thead>
                    <tr>
                        {columnas.map((titulo) => (
                            <th key={titulo}>{titulo}</th>
                        ))}
                        {acciones.length != 0 && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {datos ?
                        datosPagina.map((dato, index) => (
                            <tr key={dato.id ?? index}>
                                {
                                    columnas.map((columna, idxColumna) => (
                                        <td key={columna} data-label={columna}>{dato[llaves ? llaves[idxColumna] : columna.toLowerCase()]}</td>
                                    ))
                                }
                                {acciones.length != 0 &&
                                    <td className="acciones" data-label="Acciones">
                                        {acciones.map((accion) => (
                                            <button
                                                key={accion.nombre}
                                                onClick={() => accion.onClick(dato)}
                                                className={accion.clase}
                                            >
                                                {accion.nombre}
                                            </button>
                                        ))}
                                    </td>
                                }
                            </tr>
                        ))
                        :
                        <tr>
                            <td
                                colSpan={columnas.length}
                                className="sin-datos">
                                No hay elementos que mostrar
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            {datos.length > 0 && (
                <div className="paginacion">
                    <button
                        onClick={() => cambiarPagina(paginaActual - 1)}
                        disabled={paginaActual === 1}
                    >
                        &lt;&lt; Anterior
                    </button>

                    {numerosPagina.map(num => (
                        <button
                            key={num}
                            onClick={() => cambiarPagina(num)}
                            className={paginaActual === num ? 'activo' : ''}
                        >
                            {num}
                        </button>
                    ))}

                    <button
                        onClick={() => cambiarPagina(paginaActual + 1)}
                        disabled={paginaActual === totalPaginas}
                    >
                        Siguiente &gt;&gt;
                    </button>

                    <select value={itemsPorPagina === Infinity ? 'todos' : itemsPorPagina} onChange={cambiarItemsPorPagina}>
                        <option value={5}>5 por página</option>
                        <option value={10}>10 por página</option>
                        <option value={20}>20 por página</option>
                        <option value={50}>50 por página</option>
                        <option value="todos">Todos</option>
                    </select>
                </div>
            )}
        </div>
    )
})
