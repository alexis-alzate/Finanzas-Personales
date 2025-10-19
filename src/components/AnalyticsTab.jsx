import React, { useState } from 'react';
import { TrendingUp, DollarSign, Flame, BarChart3, Award, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsTab = ({
    allExpenses = [],
    allSavings = [],
    allSalaryIncomes = [],
    allExtraIncomes = [],
    formatCurrency,
    categories,
    months
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    if (!allExpenses.length && !allSavings.length && !allSalaryIncomes.length) {
        return (
            <div className="text-center py-16">
                <p className="text-white/70 text-xl">No hay suficientes datos para generar análisis</p>
                <p className="text-white/50 mt-2">Empieza a registrar tus gastos e ingresos</p>
            </div>
        );
    }

    const getMonthlyTrends = () => {
        const monthlyData = {};

        allExpenses.forEach(expense => {
            const date = new Date(expense.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { gastos: 0, ahorros: 0, ingresos: 0 };
            }
            monthlyData[monthKey].gastos += expense.amount;
        });

        allSavings.forEach(saving => {
            const date = new Date(saving.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { gastos: 0, ahorros: 0, ingresos: 0 };
            }
            monthlyData[monthKey].ahorros += saving.amount;
        });

        [...allSalaryIncomes, ...allExtraIncomes].forEach(income => {
            const date = new Date(income.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { gastos: 0, ahorros: 0, ingresos: 0 };
            }
            monthlyData[monthKey].ingresos += income.amount;
        });

        return Object.entries(monthlyData)
            .map(([key, data]) => {
                const [year, month] = key.split('-');
                return {
                    mes: `${months[parseInt(month) - 1].substring(0, 3)} ${year}`,
                    Gastos: data.gastos,
                    Ahorros: data.ahorros,
                    Ingresos: data.ingresos
                };
            })
            .sort((a, b) => a.mes.localeCompare(b.mes))
            .slice(-6);
    };

    const getSavingsRate = () => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const currentMonthIncome = [...allSalaryIncomes, ...allExtraIncomes]
            .filter(income => {
                const date = new Date(income.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, income) => sum + income.amount, 0);

        const currentMonthSavings = allSavings
            .filter(saving => {
                const date = new Date(saving.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, saving) => sum + saving.amount, 0);

        if (currentMonthIncome === 0) return 0;
        return (currentMonthSavings / currentMonthIncome) * 100;
    };

    const getTopExpenses = () => {
        return [...allExpenses]
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 10);
    };

    const getCategoryDistribution = () => {
        const categoryTotals = {};

        allExpenses.forEach(expense => {
            if (!categoryTotals[expense.category]) {
                categoryTotals[expense.category] = 0;
            }
            categoryTotals[expense.category] += expense.amount;
        });

        return Object.entries(categoryTotals).map(([category, total]) => {
            const cat = categories.find(c => c.value === category);
            return {
                name: cat?.label || category,
                value: total,
                color: cat?.color || '#8884d8'
            };
        }).sort((a, b) => b.value - a.value);
    };

    const monthlyTrends = getMonthlyTrends();
    const savingsRate = getSavingsRate();
    const topExpenses = getTopExpenses();
    const categoryDistribution = getCategoryDistribution();

    const COLORS = [
        '#FF6B9D', '#C44569', '#00D2FF', '#3A7BD5',
        '#FFA502', '#FF6348', '#5F27CD', '#00B894',
        '#FDCB6E', '#E17055'
    ];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 25;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        if (percent < 0.05) return null;

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="font-bold"
                style={{
                    textShadow: '2px 2px 6px rgba(0,0,0,0.8)',
                    fontSize: '13px'
                }}
            >
                {`${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white rounded-xl p-3 shadow-2xl border-2 border-purple-500">
                    <p className="font-bold text-gray-900 text-sm mb-1">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-gray-700 font-semibold text-xs" style={{ color: entry.color }}>
                            {entry.name}: <span className="font-bold">{formatCurrency(entry.value)}</span>
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const CustomPieTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white rounded-xl p-3 shadow-2xl border-2 border-purple-500">
                    <p className="font-bold text-gray-900 text-sm">{payload[0].name}</p>
                    <p className="text-purple-600 font-black text-lg">{formatCurrency(payload[0].value)}</p>
                    <p className="text-gray-600 text-xs">{((payload[0].value / categoryDistribution.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}% del total</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Botón desplegable estilo Deudas */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl p-6 shadow-xl transition-all hover:scale-102 flex items-center justify-between"
            >
                <div className="flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm animate-pulse">
                        <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-3xl font-black">📊 Análisis Avanzado</h2>
                        <p className="text-white/80 text-sm font-semibold mt-1">
                            {isExpanded ? 'Ocultar análisis detallado' : 'Ver insights profesionales de tus finanzas'}
                        </p>
                    </div>
                </div>
                <div className="bg-white/20 p-3 rounded-xl">
                    {isExpanded ? (
                        <ChevronUp className="w-8 h-8 text-white" />
                    ) : (
                        <ChevronDown className="w-8 h-8 text-white" />
                    )}
                </div>
            </button>

            {/* Contenido desplegable */}
            {isExpanded && (
                <div className="space-y-8 animate-fadeIn">
                    {/* Métricas Rápidas */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all transform hover:shadow-green-500/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm animate-pulse">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-white font-black text-base">Tasa de Ahorro</h3>
                            </div>
                            <p className="text-5xl font-black text-white drop-shadow-xl mb-1">{savingsRate.toFixed(1)}%</p>
                            <p className="text-white/90 text-sm font-bold">Del ingreso mensual</p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all transform hover:shadow-blue-500/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm animate-pulse">
                                    <BarChart3 className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-white font-black text-base">Total Gastado</h3>
                            </div>
                            <p className="text-3xl font-black text-white drop-shadow-xl mb-1">
                                {formatCurrency(allExpenses.reduce((sum, exp) => sum + exp.amount, 0))}
                            </p>
                            <p className="text-white/90 text-sm font-bold">Histórico total</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 shadow-xl hover:scale-105 transition-all transform hover:shadow-purple-500/50">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm animate-pulse">
                                    <DollarSign className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-white font-black text-base">Total Ahorrado</h3>
                            </div>
                            <p className="text-3xl font-black text-white drop-shadow-xl mb-1">
                                {formatCurrency(allSavings.reduce((sum, sav) => sum + sav.amount, 0))}
                            </p>
                            <p className="text-white/90 text-sm font-bold">Histórico total</p>
                        </div>
                    </div>

                    {/* Gráfica de Tendencias */}
                    {monthlyTrends.length > 0 && (
                        <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-xl animate-pulse">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                Tendencias de los Últimos 6 Meses
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={monthlyTrends}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                                    <XAxis
                                        dataKey="mes"
                                        stroke="#ffffff"
                                        style={{ fontSize: '12px', fontWeight: 'bold' }}
                                        tick={{ fill: '#ffffff' }}
                                    />
                                    <YAxis
                                        stroke="#ffffff"
                                        style={{ fontSize: '12px', fontWeight: 'bold' }}
                                        tick={{ fill: '#ffffff' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend wrapperStyle={{ fontSize: '14px', fontWeight: 'bold' }} />
                                    <Line type="monotone" dataKey="Ingresos" stroke="#10b981" strokeWidth={3} dot={{ r: 5, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                                    <Line type="monotone" dataKey="Gastos" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: '#ef4444', strokeWidth: 2, stroke: '#fff' }} />
                                    <Line type="monotone" dataKey="Ahorros" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    )}

                    {/* Distribución por Categorías */}
                    {categoryDistribution.length > 0 && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Torta 3D */}
                            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                    <div className="bg-gradient-to-br from-pink-500 to-purple-500 p-2 rounded-xl animate-pulse">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    Distribución por Categorías
                                </h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <PieChart>
                                        <Pie
                                            data={categoryDistribution}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={true}
                                            label={renderCustomizedLabel}
                                            outerRadius={110}
                                            innerRadius={65}
                                            fill="#8884d8"
                                            dataKey="value"
                                            paddingAngle={4}
                                            onMouseEnter={onPieEnter}
                                            activeIndex={activeIndex}
                                            activeShape={{
                                                outerRadius: 120,
                                                stroke: '#fff',
                                                strokeWidth: 2
                                            }}
                                        >
                                            {categoryDistribution.map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomPieTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Barras */}
                            <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                    <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-xl animate-pulse">
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    Top Categorías
                                </h3>
                                <ResponsiveContainer width="100%" height={350}>
                                    <BarChart data={categoryDistribution.slice(0, 6)}>
                                        <defs>
                                            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={1} />
                                                <stop offset="95%" stopColor="#ec4899" stopOpacity={1} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
                                        <XAxis
                                            dataKey="name"
                                            stroke="#ffffff"
                                            angle={-15}
                                            textAnchor="end"
                                            height={80}
                                            style={{ fontSize: '11px', fontWeight: 'bold' }}
                                            tick={{ fill: '#ffffff' }}
                                        />
                                        <YAxis
                                            stroke="#ffffff"
                                            style={{ fontSize: '12px', fontWeight: 'bold' }}
                                            tick={{ fill: '#ffffff' }}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Bar
                                            dataKey="value"
                                            fill="url(#barGradient)"
                                            radius={[8, 8, 0, 0]}
                                            maxBarSize={60}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    )}

                    {/* Top 10 Gastos */}
                    {topExpenses.length > 0 && (
                        <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-xl rounded-2xl p-6 border border-orange-500/30 shadow-xl">
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2 rounded-xl animate-pulse">
                                    <Flame className="w-6 h-6 text-white" />
                                </div>
                                🔥 Top 10 Gastos Más Grandes
                            </h3>
                            <div className="space-y-3">
                                {topExpenses.map((expense, index) => {
                                    const cat = categories.find(c => c.value === expense.category);
                                    return (
                                        <div key={expense.id} className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 flex items-center justify-between border border-orange-500/30 hover:scale-102 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-md opacity-40"></div>
                                                    <div className="relative bg-gradient-to-br from-orange-500 to-red-500 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                                                        <span className="text-white font-black text-base">#{index + 1}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-white font-bold text-base">{expense.description}</p>
                                                    <p className="text-orange-200 text-sm">{cat?.label || 'Sin categoría'} • {new Date(expense.date).toLocaleDateString('es')}</p>
                                                </div>
                                            </div>
                                            <p className="text-2xl font-black text-white drop-shadow-lg">{formatCurrency(expense.amount)}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AnalyticsTab;
