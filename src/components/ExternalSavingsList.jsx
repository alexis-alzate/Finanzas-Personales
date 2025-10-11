import React from 'react';
import { PiggyBank, Trash2, TrendingDown } from 'lucide-react';

const ExternalSavingsList = ({
    externalSavings,
    formatCurrency,
    deleteExternalSaving,
    months,
    selectedMonth,
    selectedYear,
    totalInvestedFromExternalSavings = 0  // Nueva prop
}) => {
    const filteredSavings = externalSavings.filter(saving => {
        const [year, month] = saving.date.split('-').map(Number);
        return month - 1 === selectedMonth && year === selectedYear;
    });

    const totalExternal = filteredSavings.reduce((sum, saving) => sum + saving.amount, 0);
    const totalAvailable = totalExternal - totalInvestedFromExternalSavings;

    if (filteredSavings.length === 0 && totalInvestedFromExternalSavings === 0) return null;

    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl p-8 mb-8 border-2 border-green-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <PiggyBank className="w-7 h-7 text-green-600" />
                    Ahorros Externos - {months[selectedMonth]} {selectedYear}
                </h2>
                <div className="text-right">
                    <p className="text-sm text-gray-600">Total Ingresado</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalExternal)}</p>

                    {totalInvestedFromExternalSavings > 0 && (
                        <>
                            <div className="flex items-center justify-end gap-2 mt-1">
                                <TrendingDown className="w-4 h-4 text-red-500" />
                                <p className="text-sm text-red-600">Invertido: {formatCurrency(totalInvestedFromExternalSavings)}</p>
                            </div>
                            <div className="border-t border-green-300 mt-2 pt-2">
                                <p className="text-xs text-gray-600">Disponible</p>
                                <p className="text-xl font-bold text-green-700">{formatCurrency(totalAvailable)}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {filteredSavings.length > 0 && (
                <div className="space-y-2">
                    {filteredSavings.map((saving) => (
                        <div key={saving.id} className="flex justify-between items-center p-4 bg-white rounded-xl border border-green-200 hover:shadow-md transition-all">
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{saving.description}</p>
                                <p className="text-sm text-gray-600">
                                    {(() => {
                                        const [year, month, day] = saving.date.split('-');
                                        const monthNames = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
                                        return `${day} ${monthNames[parseInt(month) - 1]} ${monthNames[parseInt(month) - 1]} ${year}`;
                                    })()}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <p className="text-xl font-bold text-green-600">{formatCurrency(saving.amount)}</p>
                                <button
                                    onClick={() => deleteExternalSaving(saving.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {filteredSavings.length === 0 && totalInvestedFromExternalSavings > 0 && (
                <div className="text-center py-6 bg-white/50 rounded-xl">
                    <p className="text-gray-600">No hay ahorros externos registrados este mes,</p>
                    <p className="text-gray-600">pero se han utilizado {formatCurrency(totalInvestedFromExternalSavings)} para inversiones.</p>
                </div>
            )}
        </div>
    );
};

export default ExternalSavingsList;
