import React, { useState } from 'react';
import { TrendingUp, DollarSign, Calendar, Briefcase } from 'lucide-react';

const TransactionsTab = ({
    filteredExpenses,
    filteredExternalSavings,
    filteredInvestments,
    filteredExtraIncomes,
    filteredSalaryIncomes = [],
    filteredSavings = [],

    allExpenses = [],
    allExternalSavings = [],
    allInvestments = [],
    allExtraIncomes = [],
    allSalaryIncomes = [],
    allSavings = [],

    deleteExpense,
    deleteExternalSaving,
    deleteInvestment,
    deleteExtraIncome,
    deleteSalaryIncome,
    deleteSaving,

    categories,
    formatCurrency,
    months,
    selectedMonth,
    selectedYear,
    totalExtraIncome
}) => {
    const [viewMode, setViewMode] = useState('all');
    const [showAllHistory, setShowAllHistory] = useState(false);

    const expensesToShow = showAllHistory ? allExpenses : filteredExpenses;
    const savingsToShow = showAllHistory ? allExternalSavings : filteredExternalSavings;
    const investmentsToShow = showAllHistory ? allInvestments : filteredInvestments;
    const incomesToShow = showAllHistory ? allExtraIncomes : filteredExtraIncomes;
    const salariesToShow = showAllHistory ? allSalaryIncomes : filteredSalaryIncomes;
    const unifiedSavingsToShow = showAllHistory ? allSavings : filteredSavings;

    const getButtonClass = (mode) => (
        `py-2 px-4 rounded-xl font-semibold transition-all ${viewMode === mode
            ? 'bg-white text-purple-600 shadow-lg'
            : 'bg-white/20 text-white hover:bg-white/30'
        }`
    );

    const getSavingTypeInfo = (type) => {
        switch (type) {
            case 'interno':
                return { icon: '💰', label: 'Ahorro Interno', color: 'text-blue-300' };
            case 'externo':
                return { icon: '🏦', label: 'Ahorro Externo', color: 'text-green-300' };
            case 'emergencia':
                return { icon: '🚨', label: 'Ahorro Emergencia', color: 'text-red-300' };
            default:
                return { icon: '💵', label: 'Ahorro', color: 'text-white' };
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Historial de Transacciones</h2>
                    <button
                        onClick={() => setShowAllHistory(!showAllHistory)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${showAllHistory
                            ? 'bg-yellow-500 text-white shadow-lg'
                            : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                    >
                        <Calendar className="w-4 h-4" />
                        {showAllHistory ? 'Solo este mes' : 'Ver todo el historial'}
                    </button>
                </div>

                {showAllHistory && (
                    <div className="mb-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl p-3">
                        <p className="text-yellow-200 text-sm">
                            📅 Mostrando <strong>TODO el historial</strong> de todos los meses
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    <button onClick={() => setViewMode('all')} className={getButtonClass('all')}>Todo</button>
                    <button onClick={() => setViewMode('salaries')} className={getButtonClass('salaries')}>💼 Salarios</button>
                    <button onClick={() => setViewMode('expenses')} className={getButtonClass('expenses')}>Gastos</button>
                    <button onClick={() => setViewMode('savings')} className={getButtonClass('savings')}>Ahorros</button>
                    <button onClick={() => setViewMode('investments')} className={getButtonClass('investments')}>Inversiones</button>
                    <button onClick={() => setViewMode('income')} className={getButtonClass('income')}>Extras</button>
                </div>
            </div>

            {/* 💼 Salarios */}
            {(viewMode === 'all' || viewMode === 'salaries') && salariesToShow?.length > 0 && (
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-500/30">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Briefcase className="text-blue-300" />
                        💼 Salarios Quincenales {showAllHistory ? '(Todos los meses)' : `- ${months[selectedMonth]} ${selectedYear}`}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {salariesToShow.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((salary) => (
                                <div key={salary.id} className="bg-white/10 rounded-xl p-4 border-2 border-blue-400/30">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="text-white font-semibold">💼 Salario - {salary.period === 'quincena-1' ? 'Quincena 1' : 'Quincena 2'}</p>
                                            <p className="text-xs text-blue-200 mt-1">
                                                {salary.period === 'quincena-1' ? '📆 Días 1-15' : '📅 Días 16-31'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => deleteSalaryIncome(salary.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="text-3xl font-bold text-blue-300">{formatCurrency(salary.amount)}</p>
                                    <p className="text-white/50 text-xs mt-2">
                                        📅 {new Date(salary.date).toLocaleDateString('es')}
                                    </p>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* 💰 Ingresos Extra */}
            {(viewMode === 'all' || viewMode === 'income') && incomesToShow?.length > 0 && (
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <DollarSign className="text-green-300" />
                        💰 Ingresos Extra
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {incomesToShow.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((income) => (
                                <div key={income.id} className="bg-white/10 rounded-xl p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-white font-semibold">{income.description}</p>
                                        <button
                                            onClick={() => deleteExtraIncome(income.id)}
                                            className="text-red-400 hover:text-red-300 transition-colors p-1"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                    <p className="text-2xl font-bold text-green-300">{formatCurrency(income.amount)}</p>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* 💎 Ahorros (Nuevo sistema unificado) */}
            {(viewMode === 'all' || viewMode === 'savings') && unifiedSavingsToShow?.length > 0 && (
                <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl p-6 border border-cyan-500/30">
                    <h3 className="text-xl font-bold text-white mb-4">💎 Ahorros Registrados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {unifiedSavingsToShow.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((saving) => {
                                const typeInfo = getSavingTypeInfo(saving.type);
                                return (
                                    <div key={saving.id} className="bg-white/10 rounded-xl p-4 border-2 border-cyan-400/30">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{typeInfo.icon}</span>
                                                <div>
                                                    <p className="text-white font-semibold">{saving.description}</p>
                                                    <p className="text-xs text-cyan-200">{typeInfo.label}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => deleteSaving(saving.id)}
                                                className="text-red-400 hover:text-red-300 transition-colors p-1"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                        <p className={`text-2xl font-bold ${typeInfo.color}`}>{formatCurrency(saving.amount)}</p>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}

            {/* 💸 Gastos */}
            {(viewMode === 'all' || viewMode === 'expenses') && expensesToShow?.length > 0 && (
                <div className="bg-white/10 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">💸 Gastos</h3>
                    <div className="space-y-3">
                        {expensesToShow.sort((a, b) => new Date(b.date) - new Date(a.date))
                            .map((expense) => {
                                const category = categories.find(cat => cat.value === expense.category);
                                return (
                                    <div key={expense.id} className="bg-white/5 rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    {category?.icon && <category.icon className="w-5 h-5 text-white" />}
                                                    <span className="font-semibold text-white">{expense.description}</span>
                                                </div>
                                                <p className="text-sm text-white/60">{category?.label || 'Sin categoría'}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <p className="text-xl font-bold text-white">{formatCurrency(expense.amount)}</p>
                                                <button
                                                    onClick={() => deleteExpense(expense.id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors p-1"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionsTab;
