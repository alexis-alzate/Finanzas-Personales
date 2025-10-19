import React from 'react';
import { Briefcase, DollarSign, Calendar } from 'lucide-react';

const IncomesPage = ({
    // Props para modal de salario
    setShowSalaryModal,

    // Props para modal de ingreso extra
    setShowExtraIncomeModal,

    // Props para datos filtrados
    filteredSalaryIncomes,
    filteredExtraIncomes,

    // Props para funciones de eliminación
    deleteSalaryIncome,
    deleteExtraIncome,

    // Función de formato
    formatCurrency
}) => {
    // Calcular totales
    const totalSalaryIncome = filteredSalaryIncomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExtraIncome = filteredExtraIncomes.reduce((sum, income) => sum + income.amount, 0);
    const totalIncome = totalSalaryIncome + totalExtraIncome;

    return (
        <div className="pb-24 px-4">
            <h1 className="text-3xl font-bold text-white mb-6 mt-6 flex items-center gap-3">
                <Briefcase className="w-8 h-8" />
                Ingresos
            </h1>

            {/* Resumen de ingresos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Briefcase className="w-6 h-6 text-white" />
                        <p className="text-white/80 text-sm font-semibold">Salarios</p>
                    </div>
                    <p className="text-3xl font-bold text-white">{formatCurrency(totalSalaryIncome)}</p>
                    <p className="text-white/70 text-xs mt-1">{filteredSalaryIncomes.length} registros</p>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="w-6 h-6 text-white" />
                        <p className="text-white/80 text-sm font-semibold">Ingresos Extra</p>
                    </div>
                    <p className="text-3xl font-bold text-white">{formatCurrency(totalExtraIncome)}</p>
                    <p className="text-white/70 text-xs mt-1">{filteredExtraIncomes.length} registros</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-xl">
                    <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-6 h-6 text-white" />
                        <p className="text-white/80 text-sm font-semibold">Total Mensual</p>
                    </div>
                    <p className="text-3xl font-bold text-white">{formatCurrency(totalIncome)}</p>
                    <p className="text-white/70 text-xs mt-1">Este mes</p>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <button
                    onClick={() => setShowSalaryModal(true)}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-6 px-6 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-3 transform hover:scale-105"
                >
                    <Briefcase className="w-6 h-6" />
                    💼 Registrar Salario Quincenal
                </button>

                <button
                    onClick={() => setShowExtraIncomeModal(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-6 px-6 rounded-2xl font-bold transition-all shadow-lg flex items-center justify-center gap-3 transform hover:scale-105"
                >
                    <DollarSign className="w-6 h-6" />
                    💰 Agregar Ingreso Extra
                </button>
            </div>

            {/* Salarios Quincenales */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-6 h-6" />
                    💼 Salarios Quincenales
                </h2>

                {filteredSalaryIncomes.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                        <p className="text-white/60">No hay salarios registrados este mes</p>
                        <p className="text-white/40 text-sm mt-2">Haz clic en "Registrar Salario Quincenal" para agregar uno</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredSalaryIncomes
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((salary) => (
                                <div key={salary.id} className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-6 border border-blue-400/30">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-white font-semibold">💼 {salary.description}</p>
                                            <p className="text-xs text-blue-200 mt-1">
                                                {salary.period === 'quincena-1' ? '📆 Días 1-15' : '📅 Días 16-31'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deleteSalaryIncome(salary.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors text-xl"
                                            title="Eliminar salario"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="text-3xl font-bold text-blue-300 mb-2">{formatCurrency(salary.amount)}</p>
                                    <p className="text-white/50 text-xs">
                                        📅 {new Date(salary.date).toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* Ingresos Extra */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <DollarSign className="w-6 h-6" />
                    💰 Ingresos Extra
                </h2>

                {filteredExtraIncomes.length === 0 ? (
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
                        <p className="text-white/60">No hay ingresos extra registrados este mes</p>
                        <p className="text-white/40 text-sm mt-2">Haz clic en "Agregar Ingreso Extra" para agregar uno</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredExtraIncomes
                            .sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((income) => (
                                <div key={income.id} className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-400/30">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-white font-semibold">{income.description}</p>
                                        <button
                                            onClick={() => deleteExtraIncome(income.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="text-3xl font-bold text-green-300 mb-2">{formatCurrency(income.amount)}</p>
                                    <p className="text-white/50 text-xs">
                                        📅 {new Date(income.date).toLocaleDateString('es', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </p>
                                </div>
                            ))}
                    </div>
                )}
            </div>

            {/* Información adicional */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-400/30">
                <h3 className="text-lg font-bold text-white mb-3">💡 Información</h3>
                <ul className="space-y-2 text-white/80 text-sm">
                    <li>• <strong>Salarios Quincenales:</strong> Registra tu salario cada vez que lo recibes (cada 15 días)</li>
                    <li>• <strong>Ingresos Extra:</strong> Dinero adicional como bonos, regalos, ventas, trabajos freelance, etc.</li>
                    <li>• <strong>Total Mensual:</strong> Suma de todos tus ingresos del mes actual</li>
                </ul>
            </div>
        </div>
    );
};

export default IncomesPage;
