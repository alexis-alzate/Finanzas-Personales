import { BarChart3, Calculator, Edit, LogOut, Target, TrendingUp, X } from 'lucide-react';

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
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-full sm:w-80 bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Contenedor con scroll */}
                <div className="h-full flex flex-col">
                    {/* Header - FIJO */}
                    <div className="flex-shrink-0 p-4 sm:p-6 border-b border-white/10">
                        <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                                <h2 className="text-xl sm:text-2xl font-bold text-white">💼 Menú</h2>
                                <p className="text-white/70 text-xs sm:text-sm mt-1 truncate">{currentUser?.email}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="flex-shrink-0 text-white hover:bg-white/20 p-2 rounded-lg transition-all ml-2"
                            >
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Menu Items - CON SCROLL */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                        {/* Configuración */}
                        <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">
                                Configuración
                            </p>

                            <div className="space-y-2">
                                <button
                                    onClick={() =>
                                        handleOptionClick(() => {
                                            setTempIncome(String(monthlyIncome));
                                            setShowIncomeModal(true);
                                        })
                                    }
                                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all group active:scale-95"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                                        <Edit className="w-5 h-5 text-blue-300" />
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className="font-semibold text-sm sm:text-base">💼 Ingreso Quincenal</p>
                                        <p className="text-xs text-white/70 truncate">Tu salario cada 15 días</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() =>
                                        handleOptionClick(() => {
                                            setTempGoal(String(savingsGoal));
                                            setShowGoalModal(true);
                                        })
                                    }
                                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all group active:scale-95"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                                        <Target className="w-5 h-5 text-purple-300" />
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className="font-semibold text-sm sm:text-base">🎯 Meta de Ahorro</p>
                                        <p className="text-xs text-white/70 truncate">Cambiar objetivo mensual</p>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Herramientas */}
                        <div>
                            <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3">
                                Herramientas
                            </p>

                            <div className="space-y-2">
                                <button
                                    onClick={() => handleOptionClick(() => setShowCalculator(true))}
                                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-all group active:scale-95"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                                        <Calculator className="w-5 h-5 text-yellow-300" />
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className="font-semibold text-sm sm:text-base">🧮 Calculadora 10%</p>
                                        <p className="text-xs text-white/70 truncate">Diezmos y porcentajes</p>
                                    </div>
                                </button>

                                <button
                                    disabled
                                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-white/40 rounded-xl cursor-not-allowed opacity-60"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                                        <BarChart3 className="w-5 h-5" />
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className="font-semibold text-sm sm:text-base">📊 Comparación</p>
                                        <p className="text-xs text-white/50 truncate">Próximamente...</p>
                                    </div>
                                </button>

                                <button
                                    disabled
                                    className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 text-white/40 rounded-xl cursor-not-allowed opacity-60"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div className="text-left flex-1 min-w-0">
                                        <p className="font-semibold text-sm sm:text-base">📈 Reportes Pro</p>
                                        <p className="text-xs text-white/50 truncate">Próximamente...</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer - FIJO */}
                    <div className="flex-shrink-0 p-4 sm:p-6 border-t border-white/10 space-y-3 bg-gradient-to-t from-black/20">
                        <button
                            onClick={() => handleOptionClick(handleLogout)}
                            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-all border border-red-500/30 active:scale-95"
                        >
                            <LogOut className="w-5 h-5 text-red-300" />
                            <span className="font-bold text-sm sm:text-base">Cerrar Sesión</span>
                        </button>

                        <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                            <p className="text-white/50 text-xs text-center font-semibold">
                                ⚡ ZaetaSoft
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
