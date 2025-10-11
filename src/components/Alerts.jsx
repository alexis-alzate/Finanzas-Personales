
import React from 'react';
import { Bell, AlertTriangle } from 'lucide-react';

const Alerts = ({ categoryData, formatCurrency }) => {
    const hasAlerts = categoryData.some(cat => cat.isNearLimit || cat.isOverLimit);

    if (!hasAlerts) return null;

    return (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start gap-4">
                <Bell className="w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0 animate-bounce" />
                <div className="flex-1 w-full">
                    <h3 className="text-white font-bold text-lg md:text-xl mb-2">⚠️ Alertas de Presupuesto</h3>
                    <div className="space-y-2">
                        {categoryData.filter(cat => cat.isOverLimit).map(cat => (
                            <div key={cat.value} className="bg-red-600 text-white px-3 md:px-4 py-2 md:py-3 rounded-lg font-semibold flex items-start md:items-center gap-2 text-sm md:text-base">
                                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 md:mt-0" />
                                <span className="break-words">¡{cat.label} ha excedido el límite! {formatCurrency(cat.spent)} de {formatCurrency(cat.limit)}</span>
                            </div>
                        ))}
                        {categoryData.filter(cat => cat.isNearLimit).map(cat => (
                            <div key={cat.value} className="bg-white/90 text-orange-800 px-3 md:px-4 py-2 md:py-3 rounded-lg font-semibold flex items-start md:items-center gap-2 text-sm md:text-base">
                                <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 mt-0.5 md:mt-0" />
                                <span className="break-words">Cuidado: {cat.label} está al {cat.percentage.toFixed(0)}% ({formatCurrency(cat.spent)} de {formatCurrency(cat.limit)})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Alerts;
