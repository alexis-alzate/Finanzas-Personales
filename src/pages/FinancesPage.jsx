import React, { useState } from 'react';
import { Wallet, TrendingDown, TrendingUp, BarChart3 } from 'lucide-react';

// Importar los componentes que ya tienes
import AddExpenseForm from '../components/AddExpenseForm';
import AddSavingForm from '../components/AddSavingForm';
import OverviewTab from '../components/OverviewTab';

const FinancesPage = ({
    // Props para gastos
    description,
    setDescription,
    amount,
    setAmount,
    category,
    setCategory,
    date,
    setDate,
    categories,
    addExpense,
    filteredExpenses,
    deleteExpense,
    categoryData,
    formatCurrency,

    // Props para ahorros externos
    savingDescription,
    setSavingDescription,
    savingAmount,
    setSavingAmount,
    savingDate,
    setSavingDate,
    addExternalSaving,
    filteredExternalSavings,
    deleteExternalSaving,

    // Props para inversiones
    investmentDescription,
    setInvestmentDescription,
    investmentAmount,
    setInvestmentAmount,
    investmentSource,
    setInvestmentSource,
    investmentDate,
    setInvestmentDate,
    addInvestment,
    filteredInvestments,
    deleteInvestment,
    remaining,
    getCategoryTotal,
    totalExternalSavings,

    // Props para estadísticas (NUEVO)
    recommendations,
    pieData,
    spentPercentage,
    remainingPercentage,
    savingsPercentage,
    totalSavings,
    savingsGoal,
    dailyExpenses,
    months,
    selectedMonth,
    selectedYear
}) => {
    const [activeTab, setActiveTab] = useState('gastos'); // gastos, ahorros, estadisticas

    return (
        <div className="pb-24 px-4">
            <h1 className="text-3xl font-bold text-white mb-6 mt-6 flex items-center gap-3">
                <Wallet className="w-8 h-8" />
                Finanzas
            </h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-2">
                <button
                    onClick={() => setActiveTab('gastos')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'gastos'
                            ? 'bg-red-500 text-white shadow-lg'
                            : 'text-white/70 hover:bg-white/10'
                        }`}
                >
                    <TrendingDown className="w-5 h-5" />
                    Gastos
                </button>
                <button
                    onClick={() => setActiveTab('ahorros')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'ahorros'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'text-white/70 hover:bg-white/10'
                        }`}
                >
                    <TrendingUp className="w-5 h-5" />
                    Ahorros
                </button>
                <button
                    onClick={() => setActiveTab('estadisticas')}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'estadisticas'
                            ? 'bg-purple-500 text-white shadow-lg'
                            : 'text-white/70 hover:bg-white/10'
                        }`}
                >
                    <BarChart3 className="w-5 h-5" />
                    Estadísticas
                </button>
            </div>

            {/* Contenido según el tab activo */}
            {activeTab === 'gastos' && (
                <div className="space-y-6">
                    {/* Formulario de gastos */}
                    <AddExpenseForm
                        description={description}
                        setDescription={setDescription}
                        amount={amount}
                        setAmount={setAmount}
                        category={category}
                        setCategory={setCategory}
                        date={date}
                        setDate={setDate}
                        categories={categories}
                        addExpense={addExpense}
                    />

                    {/* Resumen de categorías */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryData.map((cat) => (
                            <div
                                key={cat.value}
                                className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-white font-semibold text-sm">{cat.label}</span>
                                    <span className="text-2xl">{cat.icon && <cat.icon className="w-5 h-5 text-white" />}</span>
                                </div>
                                <p className="text-2xl font-bold text-white">{formatCurrency(cat.spent)}</p>
                                {cat.limit && (
                                    <div className="mt-2">
                                        <div className="w-full bg-white/20 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full transition-all ${cat.isOverLimit ? 'bg-red-500' : 'bg-green-500'
                                                    }`}
                                                style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-white/70 mt-1">
                                            {cat.limitType === 'quincenal' ? `Quincena ${cat.quincenaActual}` : 'Mensual'}: {formatCurrency(cat.limit)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Lista de gastos */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4">Gastos Recientes</h3>
                        <div className="space-y-3">
                            {filteredExpenses.length === 0 ? (
                                <p className="text-white/50 text-center py-8">No hay gastos registrados</p>
                            ) : (
                                filteredExpenses
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .slice(0, 10)
                                    .map((expense) => {
                                        const cat = categories.find(c => c.value === expense.category);
                                        return (
                                            <div key={expense.id} className="bg-white/5 rounded-xl p-4 flex justify-between items-center">
                                                <div>
                                                    <p className="text-white font-semibold">{expense.description}</p>
                                                    <p className="text-white/50 text-sm">{cat?.label || 'Sin categoría'}</p>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <p className="text-white font-bold">{formatCurrency(expense.amount)}</p>
                                                    <button
                                                        onClick={() => deleteExpense(expense.id)}
                                                        className="text-red-400 hover:text-red-300"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'ahorros' && (
                <div className="space-y-6">
                    {/* Formulario de ahorros externos */}
                    <AddSavingForm
                        savingDescription={savingDescription}
                        setSavingDescription={setSavingDescription}
                        savingAmount={savingAmount}
                        setSavingAmount={setSavingAmount}
                        savingDate={savingDate}
                        setSavingDate={setSavingDate}
                        addExternalSaving={addExternalSaving}
                    />

                    {/* Formulario de inversiones */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                                <TrendingUp className="text-white" size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white">Registrar Inversión</h3>
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                value={investmentDescription}
                                onChange={(e) => setInvestmentDescription(e.target.value)}
                                placeholder="Descripción inversión"
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                type="number"
                                value={investmentAmount}
                                onChange={(e) => setInvestmentAmount(e.target.value)}
                                placeholder="Monto"
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <select
                                value={investmentSource}
                                onChange={(e) => setInvestmentSource(e.target.value)}
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="disponible" className="bg-gray-800">💵 Dinero Disponible</option>
                                <option value="emergencia" className="bg-gray-800">🚨 Ahorro Emergencia</option>
                                <option value="ambos" className="bg-gray-800">🔄 Ambos (50/50)</option>
                            </select>
                            <div className="bg-white/10 rounded-xl p-3 space-y-1 text-sm">
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
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                            >
                                💎 Registrar Inversión
                            </button>
                        </div>
                    </div>

                    {/* Lista de ahorros externos */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl p-8 border-2 border-green-200">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">💰 Ahorros Externos</h2>
                        <div className="space-y-2">
                            {filteredExternalSavings.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No hay ahorros externos registrados</p>
                            ) : (
                                filteredExternalSavings
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((saving) => (
                                        <div key={saving.id} className="flex justify-between items-center p-4 bg-white rounded-xl border border-green-200">
                                            <div>
                                                <p className="font-semibold text-gray-800">{saving.description}</p>
                                                <p className="text-sm text-gray-600">{new Date(saving.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <p className="text-xl font-bold text-green-600">{formatCurrency(saving.amount)}</p>
                                                <button
                                                    onClick={() => deleteExternalSaving(saving.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>

                    {/* Lista de inversiones */}
                    {filteredInvestments.length > 0 && (
                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border border-purple-500/30">
                            <h3 className="text-xl font-bold text-white mb-4">💎 Inversiones Recientes</h3>
                            <div className="space-y-3">
                                {filteredInvestments
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .slice(0, 5)
                                    .map((investment) => (
                                        <div key={investment.id} className="bg-white/10 rounded-xl p-4 flex justify-between items-center">
                                            <div>
                                                <p className="text-white font-semibold">{investment.description}</p>
                                                <p className="text-white/50 text-sm">{new Date(investment.date).toLocaleDateString()}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <p className="text-white font-bold">{formatCurrency(investment.amount)}</p>
                                                <button
                                                    onClick={() => deleteInvestment(investment.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'estadisticas' && (
                <OverviewTab
                    categoryData={categoryData}
                    formatCurrency={formatCurrency}
                    recommendations={recommendations}
                    pieData={pieData}
                    spentPercentage={spentPercentage}
                    remaining={remaining}
                    remainingPercentage={remainingPercentage}
                    savingsPercentage={savingsPercentage}
                    totalSavings={totalSavings}
                    savingsGoal={savingsGoal}
                    dailyExpenses={dailyExpenses}
                    months={months}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                />
            )}
        </div>
    );
};

export default FinancesPage;
