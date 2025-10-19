import React, { useState } from 'react';
import { Wallet, PlusCircle, Eye, PieChart, TrendingUp } from 'lucide-react';
import BottomSheet from '../components/BottomSheet';
import OverviewTab from '../components/OverviewTab';

function ExpensesPage({
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
    categoryData,
    formatCurrency,
    recommendations,
    pieData,
    spentPercentage,
    remaining,
    remainingPercentage,
    savingsPercentage,
    totalSavings,
    savingsGoal,
    dailyExpenses,
    months,
    selectedMonth,
    selectedYear,
    filteredExpenses,
    deleteExpense
}) {
    const [showMenu, setShowMenu] = useState(true);
    const [activeView, setActiveView] = useState(null); // 'add', 'content'
    const [activeTab, setActiveTab] = useState('list'); // 'list', 'budgets', 'stats'

    const menuOptions = [
        {
            id: 'add',
            icon: PlusCircle,
            label: 'Agregar Gasto',
            color: 'from-green-500 to-emerald-600',
            description: 'Registra un nuevo gasto'
        },
        {
            id: 'content',
            icon: Eye,
            label: 'Ver Contenido',
            color: 'from-blue-500 to-indigo-600',
            description: 'Lista, Presupuestos y Estadísticas'
        }
    ];

    const handleOptionClick = (optionId) => {
        setActiveView(optionId);
        setShowMenu(false);
    };

    const handleBack = () => {
        setActiveView(null);
        setShowMenu(true);
    };

    return (
        <div className="pb-24 px-4">
            {/* Menú principal */}
            {showMenu && (
                <div className="space-y-4 mt-6">
                    <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Wallet className="w-8 h-8" />
                        Gastos
                    </h1>

                    <div className="grid grid-cols-1 gap-4">
                        {menuOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleOptionClick(option.id)}
                                    className={`bg-gradient-to-r ${option.color} p-6 rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 text-left`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="bg-white/20 p-4 rounded-xl">
                                            <Icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{option.label}</h3>
                                            <p className="text-white/80 text-sm">{option.description}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Vista: Agregar Gasto (BottomSheet) */}
            <BottomSheet
                isOpen={activeView === 'add'}
                onClose={handleBack}
                title="Agregar Gasto"
                icon={PlusCircle}
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Descripción del gasto"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="number"
                        placeholder="Monto"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value} className="bg-indigo-900">
                                {cat.label}
                            </option>
                        ))}
                    </select>

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <button
                        onClick={() => {
                            addExpense();
                            handleBack();
                        }}
                        className="w-full bg-white text-indigo-600 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
                    >
                        💸 Agregar Gasto
                    </button>
                </div>
            </BottomSheet>

            {/* Vista: Contenido (con tabs) */}
            {activeView === 'content' && (
                <div className="mt-6">
                    <button
                        onClick={handleBack}
                        className="mb-4 text-white/80 hover:text-white flex items-center gap-2"
                    >
                        ← Volver
                    </button>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-2">
                        <button
                            onClick={() => setActiveTab('list')}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'list'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            <Eye className="w-5 h-5" />
                            Ver Lista
                        </button>
                        <button
                            onClick={() => setActiveTab('budgets')}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'budgets'
                                    ? 'bg-purple-500 text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            <PieChart className="w-5 h-5" />
                            Presupuestos
                        </button>
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${activeTab === 'stats'
                                    ? 'bg-orange-500 text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/10'
                                }`}
                        >
                            <TrendingUp className="w-5 h-5" />
                            Estadísticas
                        </button>
                    </div>

                    {/* Contenido de tabs */}
                    {activeTab === 'list' && (
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Gastos Recientes</h3>
                            <div className="space-y-3">
                                {filteredExpenses.length === 0 ? (
                                    <p className="text-white/60 text-center py-8">No hay gastos registrados este mes</p>
                                ) : (
                                    filteredExpenses
                                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                                        .map((expense) => {
                                            const cat = categories.find(c => c.value === expense.category);
                                            return (
                                                <div
                                                    key={expense.id}
                                                    className="bg-white/10 p-4 rounded-xl flex items-center justify-between hover:bg-white/20 transition-all"
                                                >
                                                    <div className="flex-1">
                                                        <p className="text-white font-semibold">{expense.description}</p>
                                                        <p className="text-white/60 text-sm">{cat?.label || expense.category}</p>
                                                        <p className="text-white/40 text-xs">{new Date(expense.date).toLocaleDateString('es')}</p>
                                                    </div>
                                                    <div className="text-right flex items-center gap-3">
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
                    )}

                    {activeTab === 'budgets' && (
                        <div className="space-y-4">
                            {categoryData.map((cat) => (
                                <div key={cat.value} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            {cat.icon && <cat.icon className="w-6 h-6 text-white" />}
                                            <span className="text-white font-semibold text-lg">{cat.label}</span>
                                        </div>
                                        <span className="text-white text-xl font-bold">{formatCurrency(cat.spent)}</span>
                                    </div>
                                    {cat.limit && (
                                        <>
                                            <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                                                <div
                                                    className={`h-3 rounded-full transition-all ${cat.isOverLimit ? 'bg-red-500' : cat.isNearLimit ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${Math.min(cat.percentage, 100)}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-white/70 text-sm">
                                                    {cat.percentage.toFixed(0)}% usado
                                                </p>
                                                <p className="text-white/60 text-sm">
                                                    {cat.limitType === 'quincenal' ? `Quincena ${cat.quincenaActual}` : 'Mensual'}: {formatCurrency(cat.limit)}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'stats' && (
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
            )}
        </div>
    );
}

export default ExpensesPage;
