// src/components/AddTab.jsx (versión con Salarios Quincenales)

import React from 'react';
import AddExpenseForm from './AddExpenseForm';
import AddSavingForm from './AddSavingForm';
import AddInvestmentForm from './AddInvestmentForm';
import { Plus, Briefcase } from 'lucide-react'; // ⬅️ Agregamos Briefcase

const AddTab = ({
    description, setDescription, amount, setAmount, category, setCategory, date, setDate, categories, addExpense,
    savingDescription, setSavingDescription, savingAmount, setSavingAmount, savingDate, setSavingDate, addExternalSaving,
    investmentDescription, setInvestmentDescription, investmentAmount, setInvestmentAmount, investmentSource, setInvestmentSource, investmentDate, setInvestmentDate, addInvestment,
    remaining, getCategoryTotal, totalExternalSavings,
    formatCurrency,
    setShowExtraIncomeModal,
    setShowSalaryModal // ⬅️ NUEVA PROP
}) => {
    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Registrar Transacciones</h2>
                <p className="text-white/70">Agrega gastos, ahorros, inversiones o ingresos</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Agregar Gasto */}
                <AddExpenseForm
                    description={description} setDescription={setDescription} amount={amount} setAmount={setAmount}
                    category={category} setCategory={setCategory} date={date} setDate={setDate}
                    categories={categories} addExpense={addExpense}
                />

                {/* ⬇️ NUEVO: Registrar Salario Quincenal */}
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-blue-500/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-blue-500 p-3 rounded-xl">
                            <Briefcase className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Registrar Salario Quincenal</h3>
                    </div>

                    <div className="bg-blue-500/10 backdrop-blur rounded-xl p-4 mb-4">
                        <div className="flex items-start gap-3">
                            <span className="text-3xl">💼</span>
                            <div>
                                <p className="text-white font-semibold mb-1">¿Recibiste tu pago?</p>
                                <p className="text-blue-200 text-sm">
                                    Registra tu salario de $975,000 cada quincena. Esto te ayudará a tener un control exacto de tus ingresos mensuales.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setShowSalaryModal(true)}
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Registrar Salario de Quincena
                    </button>
                </div>

                {/* Agregar Ahorro Externo */}
                <AddSavingForm
                    savingDescription={savingDescription} setSavingDescription={setSavingDescription}
                    savingAmount={savingAmount} setSavingAmount={setSavingAmount}
                    savingDate={savingDate} setSavingDate={setSavingDate}
                    addExternalSaving={addExternalSaving}
                />

                {/* Agregar Inversión */}
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
                        <div className="bg-green-500 p-3 rounded-xl">
                            <Plus className="text-white" size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white">Añadir Ingreso Extra</h3>
                    </div>
                    <p className="text-white/90 mb-6 text-sm md:text-base">
                        Registra dinero adicional que no es parte de tu salario quincenal (bonos, propinas, ventas, etc.)
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
