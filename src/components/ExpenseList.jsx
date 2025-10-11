import React from 'react';
import { Wallet, Trash2 } from 'lucide-react';

const ExpenseList = ({
    filteredExpenses,
    categories,
    formatCurrency,
    deleteExpense,
    months,
    selectedMonth,
    selectedYear
}) => {
    return (
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Historial - {months[selectedMonth]} {selectedYear}</h2>
            <div className="overflow-x-auto">
                {filteredExpenses.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gradient-to-r from-purple-100 to-pink-100 border-b-2 border-purple-300">
                                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Fecha</th>
                                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Descripción</th>
                                <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Categoría</th>
                                <th className="px-4 py-4 text-right text-sm font-bold text-gray-700">Monto</th>
                                <th className="px-4 py-4 text-center text-sm font-bold text-gray-700">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses.map((expense) => {
                                const cat = categories.find(c => c.value === expense.category);
                                return (
                                    <tr key={expense.id} className="border-b hover:bg-purple-50 transition-colors">
                                        <td className="px-4 py-4 text-sm text-gray-600 font-medium">
                                            {new Date(expense.date).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </td>
                                        <td className="px-4 py-4 text-sm text-gray-800 font-medium">{expense.description}</td>
                                        <td className="px-4 py-4 text-sm">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: cat.color + '30', color: cat.color }}>
                                                {cat.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-sm text-right font-bold text-gray-800">
                                            {formatCurrency(expense.amount)}
                                        </td>
                                        <td className="px-4 py-4 text-center">
                                            <button
                                                onClick={() => deleteExpense(expense.id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-16 text-gray-400">
                        <Wallet className="w-24 h-24 mx-auto mb-4 opacity-30" />
                        <p className="text-xl font-semibold">No hay gastos en {months[selectedMonth]} {selectedYear}</p>
                        <p className="text-sm mt-2">Selecciona otro mes o agrega gastos para este período</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;
