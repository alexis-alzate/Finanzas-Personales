import React, { useState } from 'react';
import { Wallet, TrendingDown, TrendingUp, Target, Edit, Plus, Landmark, X } from 'lucide-react';

// 🔥 ESTE ES EL CÓDIGO CORRECTO Y COMPLETO (SOLO UNA VERSIÓN)
const SummaryCards = ({
    monthlyIncome,
    totalSpent,
    remaining,
    remainingPercentage,
    totalSavings,
    savingsGoal,
    savingsPercentage,
    formatCurrency,
    setShowIncomeModal,
    setShowGoalModal,
    setTempIncome,
    setTempGoal,
    setShowExtraIncomeModal,
    totalExtraIncome = 0,
    patrimonioTotal = 0
}) => {
    // Estado para controlar la visibilidad del modal de patrimonio
    const [showPatrimonioModal, setShowPatrimonioModal] = useState(false);

    return (
        <>
            {/* Tarjeta de Patrimonio Total - DESTACADA Y CLICKEABLE */}
            <button
                onClick={() => setShowPatrimonioModal(true)}
                className="mb-6 w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-6 md:p-8 text-white transform hover:scale-[1.02] transition-all cursor-pointer text-left"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                            <Landmark className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                        <div className="text-left">
                            <p className="text-sm md:text-base font-bold">🏦 Patrimonio Total</p>
                            <p className="text-xs opacity-90">Haz clic para ver detalles</p>
                        </div>
                    </div>
                </div>
                <p className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{formatCurrency(patrimonioTotal)}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs md:text-sm">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <p className="opacity-75 mb-1">💵 Disponible</p>
                        <p className="font-bold">{formatCurrency(remaining)}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <p className="opacity-75 mb-1">🎯 Ahorros</p>
                        <p className="font-bold">{formatCurrency(totalSavings)}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                        <p className="opacity-75 mb-1">📈 Crecimiento</p>
                        <p className="font-bold text-green-200">+{monthlyIncome > 0 ? ((patrimonioTotal / monthlyIncome) * 100).toFixed(0) : 0}%</p>
                    </div>
                </div>
            </button>

            {/* Modal de Detalles del Patrimonio */}
            {showPatrimonioModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl w-full text-white">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Landmark className="w-8 h-8 text-yellow-300" />
                                <h3 className="text-2xl md:text-3xl font-bold">Desglose Patrimonial</h3>
                            </div>
                            <button
                                onClick={() => setShowPatrimonioModal(false)}
                                className="text-white hover:text-gray-300"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="bg-white/10 rounded-xl p-6 mb-6">
                            <p className="text-sm opacity-75 mb-2">Total Consolidado</p>
                            <p className="text-4xl md:text-5xl font-bold text-yellow-300">{formatCurrency(patrimonioTotal)}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-lg font-semibold">💵 Dinero Disponible</span>
                                    <span className="text-2xl font-bold">{formatCurrency(remaining)}</span>
                                </div>
                                <p className="text-sm opacity-75">Efectivo listo para gastar o invertir.</p>
                            </div>

                            <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-lg font-semibold">🎯 Total Ahorros</span>
                                    <span className="text-2xl font-bold">{formatCurrency(totalSavings)}</span>
                                </div>
                                <p className="text-sm opacity-75">Programados + Emergencia + Externos.</p>
                                <div className="mt-2 text-xs opacity-60">
                                    Meta: {formatCurrency(savingsGoal)} ({savingsPercentage.toFixed(0)}% completado)
                                </div>
                            </div>

                            {totalExtraIncome > 0 && (
                                <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-lg font-semibold">✨ Ingresos Extra</span>
                                        <span className="text-2xl font-bold text-green-300">{formatCurrency(totalExtraIncome)}</span>
                                    </div>
                                    <p className="text-sm opacity-75">Dinero adicional recibido este mes.</p>
                                </div>
                            )}

                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-4">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-lg font-semibold">📊 Indicador de Riqueza</span>
                                    <span className="text-2xl font-bold text-yellow-300">
                                        {monthlyIncome > 0 ? ((patrimonioTotal / monthlyIncome)).toFixed(1) : 0}x
                                    </span>
                                </div>
                                <p className="text-sm opacity-75">
                                    Tu patrimonio equivale a {monthlyIncome > 0 ? ((patrimonioTotal / monthlyIncome)).toFixed(1) : 0} meses de tu ingreso.
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowPatrimonioModal(false)}
                            className="w-full mt-6 bg-white text-purple-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Tarjetas Originales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                {/* ... (Las 4 tarjetas de Ingreso, Gastado, Disponible, Meta van aquí sin cambios) ... */}
                {/* Las dejo aquí para referencia, pero no necesitan cambios */}
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-4 md:p-6 text-white transform hover:scale-105 transition-transform relative">
                    <button onClick={() => { setTempIncome(String(monthlyIncome)); setShowIncomeModal(true); }} className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/30 p-1.5 md:p-2 rounded-lg"><Edit className="w-3 h-3 md:w-4 md:h-4" /></button>
                    <div className="flex items-center justify-between mb-2"><Wallet className="w-8 h-8 md:w-10 md:h-10" /><span className="text-xs md:text-sm opacity-80">Ingreso Mensual</span></div>
                    <p className="text-2xl md:text-3xl font-bold break-words">{formatCurrency(monthlyIncome)}</p>
                </div>
                <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-2xl p-4 md:p-6 text-white transform hover:scale-105 transition-transform">
                    <div className="flex items-center justify-between mb-2"><TrendingDown className="w-8 h-8 md:w-10 md:h-10" /><span className="text-xs md:text-sm opacity-80">Total Gastado</span></div>
                    <p className="text-2xl md:text-3xl font-bold break-words">{formatCurrency(totalSpent)}</p>
                    <p className="text-xs md:text-sm opacity-80 mt-1">{monthlyIncome > 0 ? ((totalSpent / monthlyIncome) * 100).toFixed(1) : 0}% del ingreso</p>
                </div>
                <div className={`bg-gradient-to-br ${remaining >= 0 ? 'from-green-500 to-green-700' : 'from-red-500 to-red-700'} rounded-2xl shadow-2xl p-4 md:p-6 text-white transform hover:scale-105 transition-transform relative`}>
                    <button onClick={() => setShowExtraIncomeModal(true)} className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/30 p-1.5 md:p-2 rounded-lg" title="Agregar Ingreso Extra"><Plus className="w-3 h-3 md:w-4 md:h-4" /></button>
                    <div className="flex items-center justify-between mb-2"><TrendingUp className="w-8 h-8 md:w-10 md:h-10" /><span className="text-xs md:text-sm opacity-80">Disponible</span></div>
                    <p className="text-2xl md:text-3xl font-bold break-words">{formatCurrency(remaining)}</p>
                    <div className="mt-2 space-y-1"><p className="text-xs md:text-sm opacity-80">{remainingPercentage.toFixed(1)}% restante</p>{totalExtraIncome > 0 && (<p className="text-xs opacity-70 flex items-center gap-1"><Plus className="w-3 h-3" />Extras: {formatCurrency(totalExtraIncome)}</p>)}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-2xl p-4 md:p-6 text-white transform hover:scale-105 transition-transform relative">
                    <button onClick={() => { setTempGoal(String(savingsGoal)); setShowGoalModal(true); }} className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/30 p-1.5 md:p-2 rounded-lg"><Edit className="w-3 h-3 md:w-4 md:h-4" /></button>
                    <div className="flex items-center justify-between mb-2"><Target className="w-8 h-8 md:w-10 md:h-10" /><span className="text-xs md:text-sm opacity-80">Meta de Ahorro</span></div>
                    <p className="text-2xl md:text-3xl font-bold break-words">{formatCurrency(totalSavings)}</p>
                    <p className="text-xs md:text-sm opacity-80 mt-1">{savingsPercentage.toFixed(0)}% de {formatCurrency(savingsGoal)}</p>
                </div>
            </div>
        </>
    );
};

export default SummaryCards;
