import React from 'react';
import { Calculator, DollarSign, TrendingUp } from 'lucide-react';

const Modals = ({
    showIncomeModal,
    setShowIncomeModal,
    tempIncome,
    setTempIncome,
    setMonthlyIncome,
    showGoalModal,
    setShowGoalModal,
    tempGoal,
    setTempGoal,
    setSavingsGoal,
    showCalculator,
    setShowCalculator,
    calculatorAmount,
    setCalculatorAmount,
    calculatorResult,
    setCalculatorResult,
    formatCurrency,
    updateUserProfile,
    showExtraIncomeModal,
    setShowExtraIncomeModal,
    extraIncomeDescription,
    setExtraIncomeDescription,
    extraIncomeAmount,
    setExtraIncomeAmount,
    extraIncomeDate,
    setExtraIncomeDate,
    addExtraIncome
}) => {
    return (
        <>
            {showIncomeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Editar Ingreso Mensual</h3>
                        <p className="text-gray-600 mb-6">Ingresa tu ingreso mensual total</p>
                        <input
                            type="number"
                            value={tempIncome}
                            onChange={(e) => setTempIncome(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all mb-6"
                            placeholder="975000"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowIncomeModal(false)}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    const newIncome = parseFloat(tempIncome);
                                    if (newIncome > 0) {
                                        setMonthlyIncome(newIncome);
                                        updateUserProfile({ monthlyIncome: newIncome });
                                        setShowIncomeModal(false);
                                    }
                                }}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showGoalModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Editar Meta de Ahorro</h3>
                        <p className="text-gray-600 mb-6">¿Cuánto quieres ahorrar este mes?</p>
                        <input
                            type="number"
                            value={tempGoal}
                            onChange={(e) => setTempGoal(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all mb-6"
                            placeholder="380000"
                        />
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowGoalModal(false)}
                                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    const newGoal = parseFloat(tempGoal);
                                    if (newGoal > 0) {
                                        setSavingsGoal(newGoal);
                                        updateUserProfile({ savingsGoal: newGoal });
                                        setShowGoalModal(false);
                                    }
                                }}
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showExtraIncomeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-3 rounded-xl">
                                    <TrendingUp className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white">Agregar Ingreso Extra</h3>
                            </div>
                            <button
                                onClick={() => setShowExtraIncomeModal(false)}
                                className="text-white hover:text-gray-200 text-2xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-white/90 mb-6 font-semibold">
                            💰 Registra dinero adicional que no es parte de tu ingreso fijo mensual
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-white font-semibold mb-2">Descripción</label>
                                <input
                                    type="text"
                                    value={extraIncomeDescription}
                                    onChange={(e) => setExtraIncomeDescription(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-white/20 text-white placeholder-white/50"
                                    placeholder="Ej: Dinero Bancolombia, Bono, Regalo..."
                                />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Monto (COP)</label>
                                <input
                                    type="number"
                                    value={extraIncomeAmount}
                                    onChange={(e) => setExtraIncomeAmount(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-white/20 text-white placeholder-white/50"
                                    placeholder="50000"
                                />
                            </div>

                            <div>
                                <label className="block text-white font-semibold mb-2">Fecha</label>
                                <input
                                    type="date"
                                    value={extraIncomeDate}
                                    onChange={(e) => setExtraIncomeDate(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all bg-white/20 text-white"
                                />
                            </div>
                        </div>

                        <div className="bg-white/20 rounded-xl p-4 my-6">
                            <p className="text-white text-sm">
                                💡 <strong>Tip:</strong> Este dinero se sumará automáticamente a tu "Disponible" 💚
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowExtraIncomeModal(false)}
                                className="flex-1 bg-white/20 text-white py-3 rounded-xl font-semibold hover:bg-white/30 transition-all border-2 border-white/30"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={addExtraIncome}
                                className="flex-1 bg-white text-green-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
                            >
                                💰 Agregar Ingreso
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showCalculator && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-8 max-w-md w-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <Calculator className="w-8 h-8 text-white" />
                                <h3 className="text-2xl font-bold text-white">Calculadora 10%</h3>
                            </div>
                            <button
                                onClick={() => setShowCalculator(false)}
                                className="text-white hover:text-gray-200 text-2xl font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-white mb-4 font-semibold">Calcula el 10% de cualquier monto</p>

                        <input
                            type="number"
                            value={calculatorAmount}
                            onChange={(e) => {
                                setCalculatorAmount(e.target.value);
                                const amount = parseFloat(e.target.value);
                                if (!isNaN(amount)) {
                                    setCalculatorResult(amount * 0.1);
                                } else {
                                    setCalculatorResult(0);
                                }
                            }}
                            className="w-full px-4 py-3 border-2 border-white rounded-xl focus:ring-2 focus:ring-white focus:border-transparent transition-all mb-4 text-lg font-semibold"
                            placeholder="Ingresa el monto"
                        />

                        {calculatorAmount && (
                            <div className="bg-white/90 rounded-xl p-6 mb-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700 font-semibold">Monto ingresado:</span>
                                        <span className="text-2xl font-bold text-gray-900">{formatCurrency(parseFloat(calculatorAmount) || 0)}</span>
                                    </div>
                                    <div className="border-t-2 border-gray-300 pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-semibold">10% es:</span>
                                            <span className="text-3xl font-bold text-green-600">{formatCurrency(calculatorResult)}</span>
                                        </div>
                                    </div>
                                    <div className="border-t-2 border-gray-300 pt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-700 font-semibold">Te quedan:</span>
                                            <span className="text-2xl font-bold text-blue-600">{formatCurrency((parseFloat(calculatorAmount) || 0) - calculatorResult)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white/20 rounded-xl p-4 mb-4">
                            <p className="text-white text-sm">
                                💡 <strong>Tip:</strong> Usa esta calculadora para calcular tu diezmo u otros porcentajes rápidamente.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                setShowCalculator(false);
                                setCalculatorAmount('');
                                setCalculatorResult(0);
                            }}
                            className="w-full bg-white text-orange-600 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modals;
