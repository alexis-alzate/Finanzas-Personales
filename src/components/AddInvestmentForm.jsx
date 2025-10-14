// src/components/AddInvestmentForm.jsx

import React from 'react';
import { TrendingUp } from 'lucide-react';

const AddInvestmentForm = ({
    investmentDescription,
    setInvestmentDescription,
    investmentAmount,
    setInvestmentAmount,
    investmentSource,
    setInvestmentSource,
    investmentDate,
    setInvestmentDate,
    addInvestment,
    remaining,
    getCategoryTotal,
    totalExternalSavings,
    formatCurrency
}) => {
    return (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                    <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white">Registrar Inversión</h3>
            </div>
            <div className="space-y-4 flex-grow flex flex-col">
                <input
                    type="text"
                    value={investmentDescription}
                    onChange={(e) => setInvestmentDescription(e.target.value)}
                    placeholder="Descripción (ej: Acciones de Apple)"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder="Monto a invertir"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <select
                    value={investmentSource}
                    onChange={(e) => setInvestmentSource(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="disponible" className="bg-gray-800">Sacar de: 💵 Dinero Disponible</option>
                    <option value="emergencia" className="bg-gray-800">Sacar de: 🚨 Ahorro Emergencia</option>
                    <option value="ambos" className="bg-gray-800">Sacar de: 🔄 Ambos (50/50)</option>
                </select>
                <div className="bg-black/20 rounded-xl p-3 space-y-1 text-sm">
                    <p className="text-white/70">Fondos disponibles:</p>
                    <p className="text-white">💵 Disponible: {formatCurrency(remaining)}</p>
                    <p className="text-white">🚨 Emergencia: {formatCurrency(getCategoryTotal('emergencia') + totalExternalSavings)}</p>
                </div>
                <input
                    type="date"
                    value={investmentDate}
                    onChange={(e) => setInvestmentDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    onClick={addInvestment}
                    className="w-full mt-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all"
                >
                    💎 Registrar Inversión
                </button>
            </div>
        </div>
    );
};

export default AddInvestmentForm;
