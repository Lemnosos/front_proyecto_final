import { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './AdminEstadisticas.scss'

const COLORS = ['#4caf50', '#e53935', '#ff9800']

export const AdminEstadisticas = () => {
    const BASE_URL = import.meta.env.VITE_URL_RENDER
    const { consultaApi, data, loading, error } = useFetch()

    useEffect(() => {
        consultaApi(`${BASE_URL}/admin/estadisticas`, { method: 'GET' })
    }, [])

    if (loading) return <p className="page-center">Cargando estadísticas...</p>
    if (error) return <p className="page-center">Error al cargar estadísticas</p>
    if (!data?.data) return null

    const d = data.data

    const resultadoData = [
        { name: 'Victorias', value: d.victorias },
        { name: 'Derrotas', value: d.derrotas }
    ]

    return (
        <div className="admin-estadisticas page-center">
            <h1>Estadísticas</h1>

            <div className="tarjetas">
                <div className="tarjeta"><span className="numero">{d.total_combates}</span><span className="label">Combates</span></div>
                <div className="tarjeta"><span className="numero">{d.total_usuarios}</span><span className="label">Usuarios</span></div>
                <div className="tarjeta"><span className="numero">{d.total_enemigos}</span><span className="label">Enemigos</span></div>
                <div className="tarjeta"><span className="numero">{d.media_turnos}</span><span className="label">Media turnos</span></div>
            </div>

            <div className="graficos">
                <div className="grafico">
                    <h3>Victorias / Derrotas</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={resultadoData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {resultadoData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="grafico">
                    <h3>Victorias y Derrotas por Enemigo</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={d.enemigos_mas_peleados}>
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="victorias" name="Victorias" fill="#4caf50" />
                            <Bar dataKey="derrotas" name="Derrotas" fill="#e53935" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="grafico">
                    <h3>Combates por Personaje</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={d.combates_por_personaje}>
                            <XAxis dataKey="nombre" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" name="Combates" fill="#4a90d9" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}
