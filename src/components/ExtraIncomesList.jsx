// src/components/ExtraIncomesList.jsx

import React from 'react';
import { TrendingUp } from 'lucide-react';

const ExtraIncomesList = ({ incomes, deleteIncome, formatCurrency }) => {
    // Si no hay ingresos, no mostramos nada.
    if (!incomes || incomes.length === 0) {
        return null;
    }

    const total = incomes.reduce((sum, income) => sum + income.amount, 0);

    return (
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-green-300" />
                🌱 Ingresos Extra del Mes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {incomes.map((income) => (
                    <div key={income.id} className="bg-white/10 rounded-xl p-4 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-white font-semibold">{income.description}</p>
                            <button
                                onClick={() => deleteIncome(income.id)}
                                className="text-red-400 hover:text-red-300"
                            >
                                ✕
                            </button>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-300">{formatCurrency(income.amount)}</p>
                            <p className="text-white/50 text-xs mt-1">{new Date(income.date).toLocaleDateString('es')}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 text-right">
                <p className="text-white/80">Total Ingresos Extra: <span className="font-bold text-lg text-green-300">{formatCurrency(total)}</span></p>
            </div>
        </div>
    );
};

export default ExtraIncomesList;
