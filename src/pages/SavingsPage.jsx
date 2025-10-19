import React, { useState } from 'react';
import { PiggyBank, PlusCircle, TrendingUp, Eye } from 'lucide-react';
import BottomSheet from '../components/BottomSheet';

function SavingsPage({
    // Props del sistema viejo (ahorros externos)
    savingDescription,
    setSavingDescription,
    savingAmount,
    setSavingAmount,
    savingDate,
    setSavingDate,
    addExternalSaving,

    // Props de inversiones
    investmentDescription,
    setInvestmentDescription,
    investmentAmount,
    setInvestmentAmount,
    investmentSource,
    setInvestmentSource,
    investmentDate,
    setInvestmentDate,
    addInvestment,

    // Props de listas
    filteredExternalSavings,
    filteredInvestments,
    deleteExternalSaving,
    deleteInvestment,

    // Props generales
    formatCurrency,
    getCategoryTotal,
    remaining,
    totalExternalSavings,

    // Props del modal de ahorros unificado (NUEVO SISTEMA)
    setShowSavingModal
}) {
    const [showMenu, setShowMenu] = useState(true);
    const [activeView, setActiveView] = useState(null); // 'investments', 'list'

    const menuOptions = [
        {
            id: 'saving',
            icon: PlusCircle,
            label: 'Registrar Ahorro',
            color: 'from-green-500 to-emerald-600',
            description: 'Interno, Externo o Emergencia'
        },
        {
            id: 'investments',
            icon: TrendingUp,
            label: 'Inversiones',
            color: 'from-purple-500 to-pink-600',
            description: 'Registra tus inversiones'
        },
        {
            id: 'list',
            icon: Eye,
            label: 'Ver Todo',
            color: 'from-blue-500 to-indigo-600',
            description: 'Lista de ahorros e inversiones'
        }
    ];

    const handleOptionClick = (optionId) => {
        if (optionId === 'saving') {
            // Abrir el modal de ahorro unificado
            setShowSavingModal(true);
        } else {
            setActiveView(optionId);
            setShowMenu(false);
        }
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
                        <PiggyBank className="w-8 h-8" />
                        Gestión de Ahorros
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

            {/* Vista: Inversiones */}
            <BottomSheet
                isOpen={activeView === 'investments'}
                onClose={handleBack}
                title="Registrar Inversión"
                icon={TrendingUp}
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        value={investmentDescription}
                        onChange={(e) => setInvestmentDescription(e.target.value)}
                        placeholder="Ej: CDT Bancolombia"
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        placeholder="Monto"
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <select
                        value={investmentSource}
                        onChange={(e) => setInvestmentSource(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        <option value="disponible" className="bg-gray-800">💵 Dinero Disponible</option>
                        <option value="emergencia" className="bg-gray-800">🚨 Ahorro Emergencia</option>
                        <option value="externalSavings" className="bg-gray-800">🏦 Ahorros Externos</option>
                        <option value="ambos" className="bg-gray-800">🔄 Ambos (50/50)</option>
                    </select>

                    <div className="bg-white/10 rounded-xl p-4 space-y-2 text-sm">
                        <p className="text-white/70 font-semibold">Fondos disponibles:</p>
                        <p className="text-white">💵 Disponible: {formatCurrency(remaining)}</p>
                        <p className="text-white">🚨 Emergencia: {formatCurrency(getCategoryTotal('emergencia') + totalExternalSavings)}</p>
                    </div>

                    <input
                        type="date"
                        value={investmentDate}
                        onChange={(e) => setInvestmentDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <button
                        onClick={() => {
                            addInvestment();
                            handleBack();
                        }}
                        className="w-full bg-white text-purple-600 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
                    >
                        💎 Registrar Inversión
                    </button>
                </div>
            </BottomSheet>

            {/* Vista: Ver Todo */}
            <BottomSheet
                isOpen={activeView === 'list'}
                onClose={handleBack}
                title="Ahorros e Inversiones"
                icon={Eye}
            >
                <div className="space-y-6">
                    {/* Ahorros Externos */}
                    <div>
                        <h3 className="text-white font-bold mb-3 text-lg">💰 Ahorros Externos</h3>
                        <div className="space-y-2">
                            {filteredExternalSavings.length === 0 ? (
                                <p className="text-white/60 text-center py-4">No hay ahorros externos</p>
                            ) : (
                                filteredExternalSavings
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((saving) => (
                                        <div key={saving.id} className="bg-white/10 p-4 rounded-xl flex justify-between items-center">
                                            <div>
                                                <p className="text-white font-semibold">{saving.description}</p>
                                                <p className="text-white/60 text-sm">{new Date(saving.date).toLocaleDateString('es')}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <p className="text-white font-bold">{formatCurrency(saving.amount)}</p>
                                                <button
                                                    onClick={() => deleteExternalSaving(saving.id)}
                                                    className="text-red-400 hover:text-red-300"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>

                    {/* Inversiones */}
                    <div>
                        <h3 className="text-white font-bold mb-3 text-lg">💎 Inversiones</h3>
                        <div className="space-y-2">
                            {filteredInvestments.length === 0 ? (
                                <p className="text-white/60 text-center py-4">No hay inversiones</p>
                            ) : (
                                filteredInvestments
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((investment) => (
                                        <div key={investment.id} className="bg-white/10 p-4 rounded-xl flex justify-between items-center">
                                            <div>
                                                <p className="text-white font-semibold">{investment.description}</p>
                                                <p className="text-white/60 text-sm">{new Date(investment.date).toLocaleDateString('es')}</p>
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
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </BottomSheet>
        </div>
    );
}

export default SavingsPage;
