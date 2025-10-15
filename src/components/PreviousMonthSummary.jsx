// src/components/PreviousMonthSummary.jsx

import React from 'react';
import { TrendingUp, TrendingDown, PiggyBank, Wallet } from 'lucide-react';

const PreviousMonthSummary = ({ summaryData, formatCurrency }) => {
    if (!summaryData) return null; // Si no hay datos, no se muestra nada

    // El monthMarker viene como "2025-10", lo convertimos a "Octubre"
    const [year, month] = summaryData.monthMarker.split('-');
    const monthName = new Date(year, month - 1, 1).toLocaleString('es-CO', { month: 'long' });

    return (
        <div className="bg-black/20 p-6 rounded-2xl border border-white/20 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">
                Resumen Final de <span className="capitalize text-purple-300">{monthName}</span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {/* Total Ingresos (Salario + Extras) */}
                <div className="bg-white/5 p-3 rounded-lg">
                    <TrendingUp size={20} className="mx-auto text-green-400 mb-1" />
                    <p className="text-xs text-white/70">Ingresos Totales</p>
                    <p className="font-bold text-green-400">{formatCurrency(summaryData.ingresosTotal || 0)}</p>
                </div>

                {/* Total Gastos */}
                <div className="bg-white/5 p-3 rounded-lg">
                    <TrendingDown size={20} className="mx-auto text-red-400 mb-1" />
                    <p className="text-xs text-white/70">Gastos Totales</p>
                    <p className="font-bold text-red-400">{formatCurrency(summaryData.gastosTotal || 0)}</p>
                </div>

                {/* Total Ahorros */}
                <div className="bg-white/5 p-3 rounded-lg">
                    <PiggyBank size={20} className="mx-auto text-cyan-400 mb-1" />
                    <p className="text-xs text-white/70">Ahorro Final</p>
                    <p className="font-bold text-cyan-400">{formatCurrency(summaryData.ahorrosTotal)}</p>
                </div>

                {/* Saldo Final (Disponible) */}
                <div className="bg-white/5 p-3 rounded-lg">
                    <Wallet size={20} className="mx-auto text-yellow-400 mb-1" />
                    <p className="text-xs text-white/70">Saldo Sobrante</p>
                    <p className="font-bold text-yellow-400">{formatCurrency(summaryData.disponibleFinal)}</p>
                </div>
            </div>
        </div>
    );
};

export default PreviousMonthSummary;
