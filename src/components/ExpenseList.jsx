import React from 'react';

const ExpenseList = ({
    filteredExpenses,
    categories,
    formatCurrency,
    deleteExpense,
    // 👇 1. RECIBE LAS NUEVAS PROPS AQUÍ
    months,
    selectedMonth,
    selectedYear
}) => {

    if (!filteredExpenses) {
        return <p className="text-white/70">Cargando gastos...</p>;
    }

    return (
        <div className="bg-white/10 backdrop-blur rounded-2xl shadow-2xl p-6">
            {/* 2. AHORA ESTA LÍNEA FUNCIONARÁ SIN ERRORES */}
            <h2 className="text-xl font-bold text-white mb-6">Historial de Gastos - {months[selectedMonth]} {selectedYear}</h2>

            <div className="overflow-x-auto">
                {filteredExpenses.length > 0 ? (
                    <table className="w-full">
                        <thead>
                            <tr className="border-b-2 border-purple-300/30">
                                <th className="px-4 py-3 text-left text-sm font-bold text-white/70">Fecha</th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-white/70">Descripción</th>
                                <th className="px-4 py-3 text-left text-sm font-bold text-white/70">Categoría</th>
                                <th className="px-4 py-3 text-right text-sm font-bold text-white/70">Monto</th>
                                <th className="px-4 py-3 text-center text-sm font-bold text-white/70">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredExpenses
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((expense) => {
                                    // 3. AQUÍ ESTÁ LA SOLUCIÓN PARA EL ERROR DE CATEGORÍA
                                    const category = categories.find(cat => cat.value === expense.category) || { label: 'Sin Categoría', color: '#FFFFFF' };

                                    return (
                                        <tr key={expense.id} className="border-b border-white/10 hover:bg-white/5">
                                            <td className="px-4 py-3 text-white/90">{new Date(expense.date).toLocaleDateString('es-CO')}</td>
                                            <td className="px-4 py-3 text-white font-semibold">{expense.description}</td>
                                            <td className="px-4 py-3" style={{ color: category.color }}>{category.label}</td>
                                            <td className="px-4 py-3 text-right font-bold text-red-400">{formatCurrency(expense.amount)}</td>
                                            <td className="px-4 py-3 text-center">
                                                <button
                                                    onClick={() => deleteExpense(expense.id)}
                                                    className="text-white/50 hover:text-red-400"
                                                >
                                                    ✕
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center text-white/70 py-8">No hay gastos registrados para este período.</p>
                )}
            </div>
        </div>
    );
};

export default ExpenseList;
