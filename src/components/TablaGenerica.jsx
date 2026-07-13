import { useState, useEffect, useMemo, memo } from 'react'
import './TablaGenerica.scss'

export const TablaGenerica = memo(({ datos = [], columnas = [], llaves, acciones = [] }) => {
    const [paginaActual, setPaginaActual] = useState(1)
    const [itemsPorPagina, setItemsPorPagina] = useState(10)
    const [tier, setTier] = useState('desktop')

    useEffect(() => {
        const mqPhone = window.matchMedia('(max-width: 768px)')
        const mqTablet = window.matchMedia('(max-width: 1024px)')
        const actualizar = () => {
            if (mqPhone.matches) setTier('phone')
            else if (mqTablet.matches) setTier('tablet')
            else setTier('desktop')
        }
        actualizar()
        mqPhone.addEventListener('change', actualizar)
        mqTablet.addEventListener('change', actualizar)
        return () => {
            mqPhone.removeEventListener('change', actualizar)
            mqTablet.removeEventListener('change', actualizar)
        }
    }, [])

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
        if (totalPaginas <= 6) return Array.from({ length: totalPaginas }, (_, i) => i + 1)

        if (tier === 'phone') {
            const res = [1]
            if (paginaActual > 2) res.push('...')
            if (paginaActual !== 1 && paginaActual !== totalPaginas) res.push(paginaActual)
            if (paginaActual < totalPaginas - 1) res.push('...')
            if (totalPaginas > 1) res.push(totalPaginas)
            return res
        }

        if (tier === 'tablet') {
            const res = [1, 2]
            if (paginaActual > 4) res.push('...')
            if (paginaActual > 2 && paginaActual < totalPaginas - 1) res.push(paginaActual)
            if (paginaActual < totalPaginas - 3) res.push('...')
            if (totalPaginas > 2) res.push(totalPaginas - 1, totalPaginas)
            return [...new Set(res)]
        }

        const res = []
        const inicio = Math.max(1, paginaActual - 1)
        const fin = Math.min(totalPaginas, paginaActual + 1)
        if (inicio > 1) {
            res.push(1)
            if (inicio > 2) res.push('...')
        }
        for (let i = inicio; i <= fin; i++) res.push(i)
        if (fin < totalPaginas) {
            if (fin < totalPaginas - 1) res.push('...')
            res.push(totalPaginas)
        }
        return res
    }, [tier, paginaActual, totalPaginas])

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

                    {numerosPagina.map((num, idx) => (
                        num === '...' ? (
                            <span key={`e-${idx}`} className="ellipsis">...</span>
                        ) : (
                            <button
                                key={num}
                                onClick={() => cambiarPagina(num)}
                                className={paginaActual === num ? 'activo' : ''}
                            >
                                {num}
                            </button>
                        )
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
