import React from 'react';
import AddExpenseForm from './AddExpenseForm';
import AddSavingForm from './AddSavingForm';
import { TrendingUp, Plus } from 'lucide-react';

const AddTab = ({
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
    // Props para ahorros externos
    savingDescription,
    setSavingDescription,
    savingAmount,
    setSavingAmount,
    savingDate,
    setSavingDate,
    addExternalSaving,
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
    remaining,
    getCategoryTotal,
    totalExternalSavings,
    formatCurrency,
    // Props para ingresos extra
    setShowExtraIncomeModal
}) => {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Header */}
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Registrar Transacciones</h2>
                <p className="text-white/70">Agrega gastos, ahorros, inversiones o ingresos extra</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Agregar Gasto */}
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

                {/* Agregar Ahorro Externo */}
                <AddSavingForm
                    savingDescription={savingDescription}
                    setSavingDescription={setSavingDescription}
                    savingAmount={savingAmount}
                    setSavingAmount={setSavingAmount}
                    savingDate={savingDate}
                    setSavingDate={setSavingDate}
                    addExternalSaving={addExternalSaving}
                />

                {/* Agregar Inversión */}
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
                            <p className="text-white">🚨 Emergencia: {formatCurrency(getCategoryTotal('emergencia') + totalExternalSavings)}
                                <span className="text-white/50 text-xs ml-1">
                                    (Gastos: {formatCurrency(getCategoryTotal('emergencia'))} + Externos: {formatCurrency(totalExternalSavings)})
                                </span>
                            </p>
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

                {/* Agregar Ingreso Extra */}
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-500/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500 p-3 rounded-xl">
                            <Plus className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Ingreso Extra</h3>
                    </div>
                    <p className="text-white/80 mb-6">
                        Registra dinero adicional que no es parte de tu ingreso mensual fijo (bonos, regalos, ventas, etc.)
                    </p>
                    <button
                        onClick={() => setShowExtraIncomeModal(true)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Agregar Ingreso Extra
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddTab;
