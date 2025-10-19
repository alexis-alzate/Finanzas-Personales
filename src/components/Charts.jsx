import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, LineChart, Line } from 'recharts';
import { Wallet, CheckCircle } from 'lucide-react';

const Charts = ({
    pieData,
    spentPercentage,
    remaining,
    remainingPercentage,
    savingsPercentage,
    totalSavings,
    savingsGoal,
    dailyExpenses,
    months,
    selectedMonth,
    selectedYear,
    formatCurrency
}) => {
    const radialData = [{
        name: 'Disponible',
        value: remainingPercentage,
        fill: remaining > 0 ? '#10B981' : '#EF4444'
    }];

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                {/* Velocímetro de Presupuesto */}
                <div className="bg-white/95 backdrop-blur rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Velocímetro de Presupuesto</h2>
                    <div className="flex flex-col items-center">
                        <ResponsiveContainer width="100%" height={250} className="md:!h-[300px]">
                            <RadialBarChart
                                cx="50%"
                                cy="70%"
                                innerRadius="60%"
                                outerRadius="90%"  // ← CAMBIAR de 90 a "90%"
                                barSize={25}
                                data={[{
                                    name: 'Gastado',
                                    value: Math.min(spentPercentage, 100),
                                    fill: spentPercentage > 90 ? '#EF4444' : spentPercentage > 70 ? '#F59E0B' : '#10B981'
                                }]}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar
                                    background={{ fill: '#E5E7EB' }}
                                    dataKey="value"
                                    cornerRadius={30}
                                />
                                <text
                                    x="50%"
                                    y="60%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                                    fill={spentPercentage > 90 ? '#EF4444' : spentPercentage > 70 ? '#F59E0B' : '#10B981'}
                                >
                                    {spentPercentage.toFixed(0)}%
                                </text>
                                <text
                                    x="50%"
                                    y="72%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-xs md:text-sm"
                                    fill="#6B7280"
                                >
                                    del presupuesto usado
                                </text>
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-3 gap-2 md:gap-4 w-full mt-3 md:mt-4">
                            <div className="text-center p-2 md:p-3 bg-green-100 rounded-lg">
                                <p className="text-[10px] md:text-xs text-green-700 font-semibold">0-70%</p>
                                <p className="text-green-800 font-bold text-xs md:text-sm">✓ Bien</p>
                            </div>
                            <div className="text-center p-2 md:p-3 bg-yellow-100 rounded-lg">
                                <p className="text-[10px] md:text-xs text-yellow-700 font-semibold">70-90%</p>
                                <p className="text-yellow-800 font-bold text-xs md:text-sm">⚠ Cuidado</p>
                            </div>
                            <div className="text-center p-2 md:p-3 bg-red-100 rounded-lg">
                                <p className="text-[10px] md:text-xs text-red-700 font-semibold">90-100%</p>
                                <p className="text-red-800 font-bold text-xs md:text-sm">✕ Alerta</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progreso Meta de Ahorro */}
                <div className="bg-white/95 backdrop-blur rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Progreso Meta de Ahorro</h2>
                    <div className="flex flex-col items-center">
                        <ResponsiveContainer width="100%" height={250} className="md:!h-[300px]">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="90%"  // ← CAMBIAR de "100%" a "90%"
                                barSize={35}
                                data={[{
                                    name: 'Ahorrado',
                                    value: Math.min(savingsPercentage, 100),
                                    fill: savingsPercentage >= 100 ? '#10B981' : savingsPercentage >= 50 ? '#3B82F6' : '#8B5CF6'
                                }]}
                                startAngle={180}
                                endAngle={0}
                            >
                                <RadialBar
                                    background={{ fill: '#E5E7EB' }}
                                    dataKey="value"
                                    cornerRadius={30}
                                />
                                <text
                                    x="50%"
                                    y="60%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-3xl md:text-4xl lg:text-5xl font-bold"
                                    fill={savingsPercentage >= 100 ? '#10B981' : savingsPercentage >= 50 ? '#3B82F6' : '#8B5CF6'}
                                >
                                    {savingsPercentage.toFixed(0)}%
                                </text>
                                <text
                                    x="50%"
                                    y="72%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-xs md:text-sm"
                                    fill="#6B7280"
                                >
                                    de tu meta
                                </text>
                            </RadialBarChart>
                        </ResponsiveContainer>
                        <div className="w-full mt-3 md:mt-4 space-y-2">
                            <div className="flex justify-between text-xs md:text-sm">
                                <span className="text-gray-600">Ahorrado:</span>
                                <span className="font-bold text-gray-800">{formatCurrency(totalSavings)}</span>
                            </div>
                            <div className="flex justify-between text-xs md:text-sm">
                                <span className="text-gray-600">Meta:</span>
                                <span className="font-bold text-gray-800">{formatCurrency(savingsGoal)}</span>
                            </div>
                            <div className="flex justify-between text-xs md:text-sm">
                                <span className="text-gray-600">Falta:</span>
                                <span className="font-bold text-purple-600">{formatCurrency(Math.max(0, savingsGoal - totalSavings))}</span>
                            </div>
                            {savingsPercentage >= 100 && (
                                <div className="bg-green-100 text-green-800 px-3 md:px-4 py-2 rounded-lg text-center font-bold flex items-center justify-center gap-2 mt-3 text-xs md:text-sm">
                                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                                    ¡Meta alcanzada!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                {/* Distribución del Presupuesto */}
                <div className="bg-white/95 backdrop-blur rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Distribución del Presupuesto</h2>
                    {pieData.length > 0 ? (
                        <ResponsiveContainer width="100%" height={280} className="md:!h-[350px]">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={window.innerWidth < 768 ? 90 : 120}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(value) => formatCurrency(value)} />
                            </PieChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-[280px] md:h-[350px] flex items-center justify-center text-gray-400">
                            <div className="text-center">
                                <Wallet className="w-12 h-12 md:w-20 md:h-20 mx-auto mb-4 opacity-30" />
                                <p className="text-sm md:text-lg">No hay gastos registrados</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Dinero Disponible */}
                <div className="bg-white/95 backdrop-blur rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Dinero Disponible</h2>
                    <div className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={280} className="md:!h-[350px]">
                            <RadialBarChart
                                cx="50%"
                                cy="50%"
                                innerRadius="60%"
                                outerRadius="100%"
                                barSize={35}
                                data={radialData}
                                startAngle={90}
                                endAngle={-270}
                            >
                                <RadialBar
                                    background
                                    dataKey="value"
                                    cornerRadius={30}
                                />
                                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-3xl md:text-4xl font-bold" fill={remaining >= 0 ? '#10B981' : '#EF4444'}>
                                    {remainingPercentage.toFixed(0)}%
                                </text>
                                <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="text-xs md:text-sm" fill="#6B7280">
                                    Disponible
                                </text>
                            </RadialBarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="text-center mt-3 md:mt-4">
                        <p className="text-2xl md:text-3xl font-bold" style={{ color: remaining >= 0 ? '#10B981' : '#EF4444' }}>
                            {formatCurrency(remaining)}
                        </p>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">de {formatCurrency(totalSavings)}</p>
                    </div>
                </div>
            </div>

            {/* Tendencia de Gastos */}
            <div className="bg-white/95 backdrop-blur rounded-xl md:rounded-2xl shadow-2xl p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Tendencia de Gastos - {months[selectedMonth]} {selectedYear}</h2>
                <ResponsiveContainer width="100%" height={250} className="md:!h-[300px]">
                    <LineChart data={dailyExpenses}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="fecha"
                            style={{ fontSize: '11px' }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            style={{ fontSize: '11px' }}
                        />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend wrapperStyle={{ fontSize: '12px' }} />
                        <Line type="monotone" dataKey="monto" stroke="#8b5cf6" strokeWidth={2} name="Gasto Diario" dot={{ fill: '#8b5cf6', r: 3 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default Charts;
