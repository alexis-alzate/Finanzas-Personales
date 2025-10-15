// src/components/AddTab.jsx (versión refactorizada)

import React from 'react';
import AddExpenseForm from './AddExpenseForm';
import AddSavingForm from './AddSavingForm';
import AddInvestmentForm from './AddInvestmentForm'; // <-- 1. Importa el nuevo componente
import { Plus } from 'lucide-react';

// Fíjate que ahora recibe menos props, solo las necesarias
const AddTab = ({
    description, setDescription, amount, setAmount, category, setCategory, date, setDate, categories, addExpense,
    savingDescription, setSavingDescription, savingAmount, setSavingAmount, savingDate, setSavingDate, addExternalSaving,
    investmentDescription, setInvestmentDescription, investmentAmount, setInvestmentAmount, investmentSource, setInvestmentSource, investmentDate, setInvestmentDate, addInvestment,
    remaining, getCategoryTotal, totalExternalSavings,
    formatCurrency,
    setShowExtraIncomeModal
}) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Registrar Transacciones</h2>
                <p className="text-white/70">Agrega gastos, ahorros, inversiones o ingresos extra</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AddExpenseForm
                    description={description} setDescription={setDescription} amount={amount} setAmount={setAmount}
                    category={category} setCategory={setCategory} date={date} setDate={setDate}
                    categories={categories} addExpense={addExpense}
                />

                <AddSavingForm
                    savingDescription={savingDescription} setSavingDescription={setSavingDescription}
                    savingAmount={savingAmount} setSavingAmount={setSavingAmount}
                    savingDate={savingDate} setSavingDate={setSavingDate}
                    addExternalSaving={addExternalSaving}
                />

                {/* 2. Reemplaza todo el formulario anterior por este simple componente */}
                <AddInvestmentForm
                    investmentDescription={investmentDescription} setInvestmentDescription={setInvestmentDescription}
                    investmentAmount={investmentAmount} setInvestmentAmount={setInvestmentAmount}
                    investmentSource={investmentSource} setInvestmentSource={setInvestmentSource}
                    investmentDate={investmentDate} setInvestmentDate={setInvestmentDate}
                    addInvestment={addInvestment}
                    remaining={remaining}
                    getCategoryTotal={getCategoryTotal}
                    totalExternalSavings={totalExternalSavings}
                    formatCurrency={formatCurrency}
                />

                {/* Agregar Ingreso Extra */}
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-500/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-green-500 p-3 rounded-xl"><Plus className="text-white" size={24} /></div>
                        <h3 className="text-xl font-bold text-white">Añadir Ingreso Extra</h3>
                    </div>
                    <p className="text-white/90 mb-6 text-sm md:text-base">
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
