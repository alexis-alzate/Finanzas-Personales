import React from 'react';
import { Calculator, DollarSign, TrendingUp, Briefcase, Calendar, X } from 'lucide-react';

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
    addExtraIncome,
    showSalaryModal,
    setShowSalaryModal,
    salaryAmount,
    setSalaryAmount,
    salaryDate,
    setSalaryDate,
    salaryPeriod,
    setSalaryPeriod,
    addSalaryIncome
}) => {

    return (
        <>
            {/* Modal de Ingreso Quincenal Base - VERSIÓN MEJORADA */}
            {showIncomeModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-purple-400/30">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-purple-500/20 rounded-xl">
                                    <DollarSign className="w-6 h-6 text-purple-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Ingreso Quincenal Base</h2>
                            </div>
                            <button
                                onClick={() => setShowIncomeModal(false)}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        <p className="text-purple-200 mb-6 font-medium">
                            💼 Configura tu salario base que recibes cada 15 días
                        </p>

                        <div className="space-y-4">
                            {/* Monto del Salario Base */}
                            <div>
                                <label className="block text-sm font-semibold text-purple-200 mb-2">
                                    💰 Salario Quincenal Base
                                </label>
                                <input
                                    type="number"
                                    value={tempIncome}
                                    onChange={(e) => setTempIncome(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white placeholder-purple-300/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-lg font-semibold"
                                    placeholder="975000"
                                />
                                <p className="text-xs text-purple-300/60 mt-2">
                                    Vista previa: {formatCurrency(parseFloat(tempIncome) || 0)}
                                </p>
                            </div>

                            {/* Info del ingreso mensual */}
                            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                                <p className="text-sm text-blue-200">
                                    💡 <strong>Nota:</strong> Este es tu ingreso base quincenal.<br />
                                    Tu ingreso mensual estimado sería: <strong>{formatCurrency((parseFloat(tempIncome) || 0) * 2)}</strong>
                                </p>
                            </div>

                            {/* Explicación adicional */}
                            <div className="bg-purple-500/20 border border-purple-400/30 rounded-xl p-4">
                                <p className="text-sm text-purple-200">
                                    📅 <strong>¿Qué es esto?</strong><br />
                                    Este es el monto fijo que ganas cada quincena. Se usa para calcular tu presupuesto automáticamente.
                                </p>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowIncomeModal(false)}
                                    className="flex-1 bg-white/10 backdrop-blur text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={async () => {
                                        const newIncome = parseFloat(tempIncome);
                                        if (newIncome > 0) {
                                            setMonthlyIncome(newIncome);
                                            await updateUserProfile({
                                                quincenalIncome: newIncome,
                                                monthlyIncome: newIncome
                                            });
                                            setShowIncomeModal(false);
                                            alert('✅ Ingreso quincenal base guardado correctamente');
                                        } else {
                                            alert('⚠️ Por favor ingresa un monto válido mayor a 0');
                                        }
                                    }}
                                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                                >
                                    Guardar Configuración
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Modal de Meta de Ahorro */}
            {showGoalModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
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

            {/* Modal de Ingreso Extra */}
            {showExtraIncomeModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
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
                            💰 Registra dinero adicional que no es parte de tu ingreso fijo quincenal
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
                                💡 <strong>Tip:</strong> Este dinero se sumará automáticamente a tu "Disponible" y aumentará tu patrimonio total 💚
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

            {/* Modal de Salario Quincenal */}
            {showSalaryModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-purple-400/30">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-500/20 rounded-xl">
                                    <Briefcase className="w-6 h-6 text-blue-400" />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Registrar Salario</h2>
                            </div>
                            <button
                                onClick={() => setShowSalaryModal(false)}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {/* Selector de Quincena */}
                            <div>
                                <label className="block text-sm font-semibold text-purple-200 mb-2">
                                    📅 Periodo de Pago
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setSalaryPeriod('quincena-1')}
                                        className={`p-4 rounded-xl font-semibold transition-all ${salaryPeriod === 'quincena-1'
                                            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                                            : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">📆</div>
                                        <div className="text-sm">Quincena 1</div>
                                        <div className="text-xs opacity-70">Días 1-15</div>
                                    </button>
                                    <button
                                        onClick={() => setSalaryPeriod('quincena-2')}
                                        className={`p-4 rounded-xl font-semibold transition-all ${salaryPeriod === 'quincena-2'
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                                            : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                            }`}
                                    >
                                        <div className="text-2xl mb-1">📅</div>
                                        <div className="text-sm">Quincena 2</div>
                                        <div className="text-xs opacity-70">Días 16-31</div>
                                    </button>
                                </div>
                            </div>

                            {/* Monto */}
                            <div>
                                <label className="block text-sm font-semibold text-purple-200 mb-2">
                                    💰 Monto del Salario
                                </label>
                                <input
                                    type="number"
                                    value={salaryAmount}
                                    onChange={(e) => setSalaryAmount(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white placeholder-purple-300/50 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-lg font-semibold"
                                    placeholder="975000"
                                />
                                <p className="text-xs text-purple-300/60 mt-2">
                                    Vista previa: {formatCurrency(parseFloat(salaryAmount) || 0)}
                                </p>
                            </div>

                            {/* Fecha */}
                            <div>
                                <label className="block text-sm font-semibold text-purple-200 mb-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    Fecha de Pago
                                </label>
                                <input
                                    type="date"
                                    value={salaryDate}
                                    onChange={(e) => setSalaryDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                                />
                            </div>

                            {/* Info adicional */}
                            <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                                <p className="text-sm text-blue-200">
                                    <strong>💼 Resumen:</strong><br />
                                    Registrarás tu salario de la <strong>{salaryPeriod === 'quincena-1' ? 'Quincena 1' : 'Quincena 2'}</strong> por <strong>{formatCurrency(parseFloat(salaryAmount) || 0)}</strong>
                                </p>
                            </div>

                            {/* Botones */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => setShowSalaryModal(false)}
                                    className="flex-1 bg-white/10 backdrop-blur text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={() => {
                                        if (!salaryAmount) {
                                            alert('Por favor ingresa el monto del salario');
                                            return;
                                        }
                                        addSalaryIncome();
                                    }}
                                    className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg"
                                >
                                    Registrar Salario
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Calculadora */}
            {showCalculator && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
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
