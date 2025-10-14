import React, { useState } from 'react';
import ExpenseList from './ExpenseList';
import ExternalSavingsList from './ExternalSavingsList';
import { TrendingUp, DollarSign } from 'lucide-react';

const TransactionsTab = ({
    filteredExpenses,
    categories,
    formatCurrency,
    deleteExpense,
    months,
    selectedMonth,
    selectedYear,
    filteredExternalSavings,
    deleteExternalSaving,
    totalInvestedFromExternalSavings,
    filteredInvestments,
    deleteInvestment,
    filteredExtraIncomes,
    deleteExtraIncome,
    totalExtraIncome
}) => {
    const [viewMode, setViewMode] = useState('all'); // 'all', 'expenses', 'savings', 'investments', 'income'

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header con filtros */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <h2 className="text-2xl font-bold text-white mb-4">Historial de Transacciones</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <button
                        onClick={() => setViewMode('all')}
                        className={`py-2 px-4 rounded-xl font-semibold transition-all ${viewMode === 'all'
                                ? 'bg-white text-purple-600 shadow-lg'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                    >
                        Todo
                    </button>
                    <button
                        onClick={() => setViewMode('expenses')}
                        className={`py-2 px-4 rounded-xl font-semibold transition-all ${viewMode === 'expenses'
                                ? 'bg-white text-purple-600 shadow-lg'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                    >
                        Gastos
                    </button>
                    <button
                        onClick={() => setViewMode('savings')}
                        className={`py-2 px-4 rounded-xl font-semibold transition-all ${viewMode === 'savings'
                                ? 'bg-white text-purple-600 shadow-lg'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                    >
                        Ahorros
                    </button>
                    <button
                        onClick={() => setViewMode('investments')}
                        className={`py-2 px-4 rounded-xl font-semibold transition-all ${viewMode === 'investments'
                                ? 'bg-white text-purple-600 shadow-lg'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                    >
                        Inversiones
                    </button>
                    <button
                        onClick={() => setViewMode('income')}
                        className={`py-2 px-4 rounded-xl font-semibold transition-all ${viewMode === 'income'
                                ? 'bg-white text-purple-600 shadow-lg'
                                : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                    >
                        Ingresos Extra
                    </button>
                </div>
            </div>

            {/* Ingresos Extra */}
            {(viewMode === 'all' || viewMode === 'income') && filteredExtraIncomes && filteredExtraIncomes.length > 0 && (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/30">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <DollarSign className="text-green-300" />
                        💰 Ingresos Extra del Mes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredExtraIncomes.map((income) => (
                            <div key={income.id} className="bg-white/10 rounded-xl p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-white font-semibold">{income.description}</p>
                                    <button
                                        onClick={() => deleteExtraIncome(income.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p className="text-2xl font-bold text-green-300">{formatCurrency(income.amount)}</p>
                                <p className="text-white/50 text-xs mt-2">{new Date(income.date).toLocaleDateString('es')}</p>
                            </div>
                        ))}
                    </div>
                    {totalExtraIncome > 0 && (
                        <div className="mt-4 pt-4 border-t border-green-500/30">
                            <p className="text-white text-lg">
                                <span className="text-white/70">Total Ingresos Extra: </span>
                                <span className="font-bold text-green-300">{formatCurrency(totalExtraIncome)}</span>
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Inversiones */}
            {(viewMode === 'all' || viewMode === 'investments') && filteredInvestments && filteredInvestments.length > 0 && (
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="text-purple-300" />
                        💎 Inversiones del Mes
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredInvestments.map((investment) => (
                            <div key={investment.id} className="bg-white/10 rounded-xl p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <p className="text-white font-semibold">{investment.description}</p>
                                    <button
                                        onClick={() => deleteInvestment(investment.id)}
                                        className="text-red-400 hover:text-red-300"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <p className="text-2xl font-bold text-purple-300">{formatCurrency(investment.amount)}</p>
                                <div className="mt-2 space-y-1 text-sm text-white/70">
                                    {investment.fromDisponible > 0 && (
                                        <p>💵 Disponible: {formatCurrency(investment.fromDisponible)}</p>
                                    )}
                                    {investment.fromEmergencia > 0 && (
                                        <p>🚨 Emergencia: {formatCurrency(investment.fromEmergencia)}</p>
                                    )}
                                    {investment.fromExternalSavings > 0 && (
                                        <p>💰 Externos: {formatCurrency(investment.fromExternalSavings)}</p>
                                    )}
                                </div>
                                <p className="text-white/50 text-xs mt-2">{new Date(investment.date).toLocaleDateString('es')}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Ahorros Externos */}
            {(viewMode === 'all' || viewMode === 'savings') && (
                <ExternalSavingsList
                    externalSavings={filteredExternalSavings}
                    formatCurrency={formatCurrency}
                    deleteExternalSaving={deleteExternalSaving}
                    months={months}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    totalInvestedFromExternalSavings={totalInvestedFromExternalSavings}
                />
            )}

            {/* Lista de Gastos */}
            {(viewMode === 'all' || viewMode === 'expenses') && (
                <ExpenseList
                    filteredExpenses={filteredExpenses}
                    categories={categories}
                    formatCurrency={formatCurrency}
                    deleteExpense={deleteExpense}
                    months={months}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                />
            )}
        </div>
    );
};

export default TransactionsTab;
