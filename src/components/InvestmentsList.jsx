// src/components/InvestmentsList.jsx

import React from 'react';
import { TrendingUp } from 'lucide-react';

const InvestmentsList = ({ investments, deleteInvestment, formatCurrency }) => {
    if (!investments || investments.length === 0) {
        return null;
    }

    const total = investments.reduce((sum, inv) => sum + inv.amount, 0);

    return (
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-purple-300" />
                💎 Inversiones del Mes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {investments.map((investment) => (
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
                            {investment.fromDisponible > 0 && <p>💵 Disponible: {formatCurrency(investment.fromDisponible)}</p>}
                            {investment.fromEmergencia > 0 && <p>🚨 Emergencia: {formatCurrency(investment.fromEmergencia)}</p>}
                            {investment.fromExternalSavings > 0 && <p>💰 Externos: {formatCurrency(investment.fromExternalSavings)}</p>}
                        </div>
                        <p className="text-white/50 text-xs mt-2">{new Date(investment.date).toLocaleDateString('es')}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/20 text-right">
                <p className="text-white/80">Total Invertido: <span className="font-bold text-lg text-purple-300">{formatCurrency(total)}</span></p>
            </div>
        </div>
    );
};

export default InvestmentsList;
