import React from 'react';
import { X, Settings, Calculator, LogOut, Edit, Target, TrendingUp, BarChart3 } from 'lucide-react';

const Sidebar = ({
    isOpen,
    onClose,
    currentUser,
    handleLogout,
    setShowIncomeModal,
    setShowGoalModal,
    setShowCalculator,
    setTempIncome,
    setTempGoal,
    monthlyIncome,
    savingsGoal
}) => {
    const handleOptionClick = (action) => {
        action();
        onClose();
    };

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Menú</h2>
                            <p className="text-white/70 text-sm mt-1">{currentUser?.email}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 space-y-2 overflow-y-auto">
                        <div className="mb-4">
                            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                                Configuración
                            </p>

                            <button
                                onClick={() =>
                                    handleOptionClick(() => {
                                        setTempIncome(String(monthlyIncome));
                                        setShowIncomeModal(true);
                                    })
                                }
                                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all group"
                            >
                                <Edit className="w-5 h-5 text-blue-300" />
                                <div className="text-left flex-1">
                                    <p className="font-semibold">Editar Ingreso Mensual</p>
                                    <p className="text-xs text-white/70">Actualizar ingreso fijo</p>
                                </div>
                            </button>

                            <button
                                onClick={() =>
                                    handleOptionClick(() => {
                                        setTempGoal(String(savingsGoal));
                                        setShowGoalModal(true);
                                    })
                                }
                                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all group"
                            >
                                <Target className="w-5 h-5 text-purple-300" />
                                <div className="text-left flex-1">
                                    <p className="font-semibold">Editar Meta de Ahorro</p>
                                    <p className="text-xs text-white/70">Cambiar objetivo mensual</p>
                                </div>
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2">
                                Herramientas
                            </p>

                            <button
                                onClick={() => handleOptionClick(() => setShowCalculator(true))}
                                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all group"
                            >
                                <Calculator className="w-5 h-5 text-yellow-300" />
                                <div className="text-left flex-1">
                                    <p className="font-semibold">Calculadora 10%</p>
                                    <p className="text-xs text-white/70">Para diezmos y porcentajes</p>
                                </div>
                            </button>

                            <button
                                disabled
                                className="w-full flex items-center gap-3 px-4 py-3 text-white/40 rounded-xl cursor-not-allowed"
                            >
                                <BarChart3 className="w-5 h-5" />
                                <div className="text-left flex-1">
                                    <p className="font-semibold">Comparación de Meses</p>
                                    <p className="text-xs text-white/50">Próximamente...</p>
                                </div>
                            </button>

                            <button
                                disabled
                                className="w-full flex items-center gap-3 px-4 py-3 text-white/40 rounded-xl cursor-not-allowed"
                            >
                                <TrendingUp className="w-5 h-5" />
                                <div className="text-left flex-1">
                                    <p className="font-semibold">Reportes Detallados</p>
                                    <p className="text-xs text-white/50">Próximamente...</p>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={() => handleOptionClick(handleLogout)}
                        className="w-full flex items-center gap-3 px-4 py-4 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-all border border-red-500/30"
                    >
                        <LogOut className="w-5 h-5 text-red-300" />
                        <span className="font-semibold">Cerrar Sesión</span>
                    </button>

                    <div className="mt-4 p-3 bg-white/5 rounded-xl">
                        <p className="text-white/50 text-xs text-center">
                            Presupuesto Personal v2.0
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
