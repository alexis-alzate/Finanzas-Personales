import React, { useState } from 'react';
import { PiggyBank, PlusCircle, TrendingUp, Eye } from 'lucide-react';
import BottomSheet from '../components/BottomSheet';

function SavingsPage({
    savingDescription,
    setSavingDescription,
    savingAmount,
    setSavingAmount,
    savingDate,
    setSavingDate,
    addExternalSaving,
    investmentDescription,
    setInvestmentDescription,
    investmentAmount,
    setInvestmentAmount,
    investmentSource,
    setInvestmentSource,
    investmentDate,
    setInvestmentDate,
    addInvestment,
    filteredExternalSavings,
    filteredInvestments,
    deleteExternalSaving,
    deleteInvestment,
    formatCurrency,
    getCategoryTotal,
    remaining,
    totalExternalSavings,
    setShowSavingModal
}) {
    const [showMenu, setShowMenu] = useState(true);
    const [activeView, setActiveView] = useState(null);

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

            {/* Vista: Inversiones - RESPONSIVE */}
            <BottomSheet
                isOpen={activeView === 'investments'}
                onClose={handleBack}
                title="Registrar Inversión"
                icon={TrendingUp}
            >
                <div className="space-y-3">
                    <input
                        type="text"
                        value={investmentDescription}
                        onChange={(e) => setInvestmentDescription(e.target.value)}
                        placeholder="Ej: CDT Bancolombia"
                        className="w-full px-3 py-2.5 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                    />

                    <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        placeholder="Monto"
                        className="w-full px-3 py-2.5 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                    />

                    <select
                        value={investmentSource}
                        onChange={(e) => setInvestmentSource(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                    >
                        <option value="disponible" className="bg-gray-800">💵 Dinero Disponible</option>
                        <option value="emergencia" className="bg-gray-800">🚨 Ahorro Emergencia</option>
                        <option value="externalSavings" className="bg-gray-800">🏦 Ahorros Externos</option>
                        <option value="ambos" className="bg-gray-800">🔄 Ambos (50/50)</option>
                    </select>

                    <div className="bg-white/10 rounded-xl p-3 space-y-1 text-xs md:text-sm">
                        <p className="text-white/70 font-semibold">Fondos disponibles:</p>
                        <p className="text-white">💵 Disponible: {formatCurrency(remaining)}</p>
                        <p className="text-white">🚨 Emergencia: {formatCurrency(getCategoryTotal('emergencia') + totalExternalSavings)}</p>
                    </div>

                    <input
                        type="date"
                        value={investmentDate}
                        onChange={(e) => setInvestmentDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                    />

                    <button
                        onClick={() => {
                            addInvestment();
                            handleBack();
                        }}
                        className="w-full bg-white text-purple-600 py-3 rounded-xl font-bold text-base hover:bg-white/90 transition-all shadow-lg"
                    >
                        💎 Registrar Inversión
                    </button>
                </div>
            </BottomSheet>

            {/* Vista: Ver Todo - RESPONSIVE */}
            <BottomSheet
                isOpen={activeView === 'list'}
                onClose={handleBack}
                title="Ahorros e Inversiones"
                icon={Eye}
            >
                <div className="space-y-4">
                    {/* Ahorros Externos */}
                    <div>
                        <h3 className="text-white font-bold mb-3 text-base md:text-lg">💰 Ahorros Externos</h3>
                        <div className="space-y-2">
                            {filteredExternalSavings.length === 0 ? (
                                <p className="text-white/60 text-center py-4 text-sm">No hay ahorros externos</p>
                            ) : (
                                filteredExternalSavings
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((saving) => (
                                        <div key={saving.id} className="bg-white/10 p-3 rounded-xl flex justify-between items-center gap-2">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-white font-semibold text-sm truncate">{saving.description}</p>
                                                <p className="text-white/60 text-xs">{new Date(saving.date).toLocaleDateString('es')}</p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <p className="text-white font-bold text-sm">{formatCurrency(saving.amount)}</p>
                                                <button
                                                    onClick={() => deleteExternalSaving(saving.id)}
                                                    className="text-red-400 hover:text-red-300 p-1"
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
                        <h3 className="text-white font-bold mb-3 text-base md:text-lg">💎 Inversiones</h3>
                        <div className="space-y-2">
                            {filteredInvestments.length === 0 ? (
                                <p className="text-white/60 text-center py-4 text-sm">No hay inversiones</p>
                            ) : (
                                filteredInvestments
                                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                                    .map((investment) => (
                                        <div key={investment.id} className="bg-white/10 p-3 rounded-xl flex justify-between items-center gap-2">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-white font-semibold text-sm truncate">{investment.description}</p>
                                                <p className="text-white/60 text-xs">{new Date(investment.date).toLocaleDateString('es')}</p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <p className="text-white font-bold text-sm">{formatCurrency(investment.amount)}</p>
                                                <button
                                                    onClick={() => deleteInvestment(investment.id)}
                                                    className="text-red-400 hover:text-red-300 p-1"
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
