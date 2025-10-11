import React from 'react';
import { Wallet, TrendingDown, TrendingUp, Target, Edit, Plus } from 'lucide-react';

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
    totalExtraIncome = 0
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl p-4 md:p-6 text-white transform hover:scale-105 transition-transform relative">
                <button
                    onClick={() => {
                        setTempIncome(String(monthlyIncome));
                        setShowIncomeModal(true);
                    }}
                    className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/30 p-1.5 md:p-2 rounded-lg transition-all"
                >
                    <Edit className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <div className="flex items-center justify-between mb-2">
                    <Wallet className="w-8 h-8 md:w-10 md:h-10" />
                    <span className="text-xs md:text-sm opacity-80">Ingreso Mensual</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold break-words">{formatCurrency(monthlyIncome)}</p>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-2xl p-4 md:p-6 text-white transform hover:scale-105 transition-transform">
                <div className="flex items-center justify-between mb-2">
                    <TrendingDown className="w-8 h-8 md:w-10 md:h-10" />
                    <span className="text-xs md:text-sm opacity-80">Total Gastado</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold break-words">{formatCurrency(totalSpent)}</p>
                <p className="text-xs md:text-sm opacity-80 mt-1">{((totalSpent / monthlyIncome) * 100).toFixed(1)}% del ingreso</p>
            </div>

            <div className={`bg-gradient-to-br ${remaining >= 0 ? 'from-green-500 to-green-700' : 'from-red-500 to-red-700'} rounded-2xl shadow-2xl p-4 md:p-6 text-white transform hover:scale-105 transition-transform relative`}>
                <button
                    onClick={() => setShowExtraIncomeModal(true)}
                    className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/30 p-1.5 md:p-2 rounded-lg transition-all group"
                    title="Agregar Ingreso Extra"
                >
                    <Plus className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <div className="flex items-center justify-between mb-2">
                    <TrendingUp className="w-8 h-8 md:w-10 md:h-10" />
                    <span className="text-xs md:text-sm opacity-80">Disponible</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold break-words">{formatCurrency(remaining)}</p>
                <div className="mt-2 space-y-1">
                    <p className="text-xs md:text-sm opacity-80">{remainingPercentage.toFixed(1)}% restante</p>
                    {totalExtraIncome > 0 && (
                        <p className="text-xs opacity-70 flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            Extras: {formatCurrency(totalExtraIncome)}
                        </p>
                    )}
                </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-2xl p-4 md:p-6 text-white transform hover:scale-105 transition-transform relative">
                <button
                    onClick={() => {
                        setTempGoal(String(savingsGoal));
                        setShowGoalModal(true);
                    }}
                    className="absolute top-3 right-3 md:top-4 md:right-4 bg-white/20 hover:bg-white/30 p-1.5 md:p-2 rounded-lg transition-all"
                >
                    <Edit className="w-3 h-3 md:w-4 md:h-4" />
                </button>
                <div className="flex items-center justify-between mb-2">
                    <Target className="w-8 h-8 md:w-10 md:h-10" />
                    <span className="text-xs md:text-sm opacity-80">Meta de Ahorro</span>
                </div>
                <p className="text-2xl md:text-3xl font-bold break-words">{formatCurrency(totalSavings)}</p>
                <p className="text-xs md:text-sm opacity-80 mt-1">
                    {savingsPercentage.toFixed(0)}% de {formatCurrency(savingsGoal)}
                </p>
            </div>
        </div>
    );
};

export default SummaryCards;
