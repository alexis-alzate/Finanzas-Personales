import React, { useState } from 'react';
import { PiggyBank, PlusCircle, Eye, TrendingUp, Gem } from 'lucide-react';
import BottomSheet from '../components/BottomSheet';

function SavingsPage({
    // Props para ahorro normal (categoría)
    description,
    setDescription,
    amount,
    setAmount,
    date,
    setDate,
    category,
    setCategory,
    addExpense,

    // Props para ahorro externo
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

    // Props de visualización
    filteredExternalSavings,
    filteredInvestments,
    deleteExternalSaving,
    deleteInvestment,
    formatCurrency,
    getCategoryTotal,
    remaining,
    totalExternalSavings
}) {
    const [showMenu, setShowMenu] = useState(true);
    const [activeView, setActiveView] = useState(null);

    const menuOptions = [
        {
            id: 'normal',
            icon: PiggyBank,
            label: 'Ahorro Normal',
            color: 'from-blue-500 to-cyan-600',
            description: 'Apartar dinero del disponible'
        },
        {
            id: 'external',
            icon: TrendingUp,
            label: 'Ahorro Externo',
            color: 'from-green-500 to-emerald-600',
            description: 'Dinero que NO viene de tu quincena'
        },
        {
            id: 'investment',
            icon: Gem,
            label: 'Inversión',
            color: 'from-purple-500 to-pink-600',
            description: 'Invertir tu dinero'
        },
        {
            id: 'list',
            icon: Eye,
            label: 'Ver Mis Ahorros',
            color: 'from-orange-500 to-red-600',
            description: 'Lista completa de ahorros e inversiones'
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

    const handleAddNormalSaving = () => {
        // Cambiar temporalmente la categoría a 'ahorros'
        setCategory('ahorros');
        addExpense();
        handleBack();
    };

    return (
        <div className="pb-24 px-4">
            {/* Menú principal */}
            {showMenu && (
                <div className="space-y-4 mt-6">
                    <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <PiggyBank className="w-8 h-8" />
                        Mis Ahorros
                    </h1>

                    {/* Resumen rápido */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-2xl shadow-xl mb-6">
                        <p className="text-white/80 text-sm mb-2">Total Ahorros Normales</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(getCategoryTotal('ahorros'))}</p>

                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-white/80 text-sm mb-2">Ahorros Externos</p>
                            <p className="text-2xl font-bold text-white">{formatCurrency(totalExternalSavings)}</p>
                        </div>
                    </div>

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

            {/* Vista: Ahorro Normal */}
            <BottomSheet
                isOpen={activeView === 'normal'}
                onClose={handleBack}
                title="Ahorro Normal"
                icon={PiggyBank}
            >
                <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-xl mb-4">
                        <p className="text-white/80 text-sm mb-1">Disponible para ahorrar:</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(remaining)}</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Descripción (ej: Ahorro mes de octubre)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="number"
                        placeholder="Monto a ahorrar"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <button
                        onClick={handleAddNormalSaving}
                        className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
                    >
                        💰 Guardar Ahorro
                    </button>

                    <p className="text-white/60 text-xs text-center">
                        ℹ️ Este ahorro sale de tu disponible actual
                    </p>
                </div>
            </BottomSheet>

            {/* Vista: Ahorro Externo */}
            <BottomSheet
                isOpen={activeView === 'external'}
                onClose={handleBack}
                title="Ahorro Externo"
                icon={TrendingUp}
            >
                <div className="space-y-4">
                    <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-xl mb-4">
                        <p className="text-white text-sm">
                            💡 <strong>Ahorro Externo:</strong> Dinero que NO viene de tu quincena (bonos, regalos, ventas, etc.)
                        </p>
                    </div>

                    <input
                        type="text"
                        placeholder="Descripción (ej: Bono de fin de año)"
                        value={savingDescription}
                        onChange={(e) => setSavingDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="number"
                        placeholder="Monto"
                        value={savingAmount}
                        onChange={(e) => setSavingAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="date"
                        value={savingDate}
                        onChange={(e) => setSavingDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <button
                        onClick={() => {
                            addExternalSaving();
                            handleBack();
                        }}
                        className="w-full bg-white text-green-600 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
                    >
                        💰 Agregar Ahorro Externo
                    </button>

                    <p className="text-white/60 text-xs text-center">
                        ℹ️ NO afecta tu disponible - es dinero extra
                    </p>
                </div>
            </BottomSheet>

            {/* Vista: Inversión */}
            <BottomSheet
                isOpen={activeView === 'investment'}
                onClose={handleBack}
                title="Nueva Inversión"
                icon={Gem}
            >
                <div className="space-y-4">
                    <div className="bg-purple-500/20 border border-purple-500/50 p-4 rounded-xl mb-4">
                        <p className="text-white/80 text-sm mb-2">Disponible: {formatCurrency(remaining)}</p>
                        <p className="text-white/80 text-sm">Ahorro Emergencia: {formatCurrency(getCategoryTotal('emergencia') + totalExternalSavings)}</p>
                    </div>

                    <input
                        type="text"
                        placeholder="Descripción (ej: CDT Bancolombia)"
                        value={investmentDescription}
                        onChange={(e) => setInvestmentDescription(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="number"
                        placeholder="Monto a invertir"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <select
                        value={investmentSource}
                        onChange={(e) => setInvestmentSource(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    >
                        <option value="disponible" className="bg-purple-900">Desde Disponible</option>
                        <option value="emergencia" className="bg-purple-900">Desde Ahorro Emergencia</option>
                        <option value="ambos" className="bg-purple-900">Mitad y Mitad</option>
                    </select>

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

            {/* Vista: Lista de Ahorros */}
            <BottomSheet
                isOpen={activeView === 'list'}
                onClose={handleBack}
                title="Mis Ahorros e Inversiones"
                icon={Eye}
            >
                <div className="space-y-6">
                    {/* Ahorros Externos */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5" />
                            Ahorros Externos
                        </h3>
                        {filteredExternalSavings && filteredExternalSavings.length === 0 ? (
                            <p className="text-white/60 text-sm">No hay ahorros externos este mes</p>
                        ) : (
                            <div className="space-y-2">
                                {filteredExternalSavings && filteredExternalSavings.map((saving) => (
                                    <div key={saving.id} className="bg-white/10 p-4 rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="text-white font-semibold">{saving.description}</p>
                                            <p className="text-white/60 text-xs">{new Date(saving.date).toLocaleDateString('es')}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-white font-bold">{formatCurrency(saving.amount)}</p>
                                            <button
                                                onClick={() => deleteExternalSaving(saving.id)}
                                                className="text-red-400 text-xs hover:text-red-300"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Inversiones */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                            <Gem className="w-5 h-5" />
                            Inversiones
                        </h3>
                        {filteredInvestments && filteredInvestments.length === 0 ? (
                            <p className="text-white/60 text-sm">No hay inversiones este mes</p>
                        ) : (
                            <div className="space-y-2">
                                {filteredInvestments && filteredInvestments.map((inv) => (
                                    <div key={inv.id} className="bg-white/10 p-4 rounded-xl">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="text-white font-semibold">{inv.description}</p>
                                                <p className="text-white/60 text-xs">{new Date(inv.date).toLocaleDateString('es')}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold">{formatCurrency(inv.amount)}</p>
                                                <button
                                                    onClick={() => deleteInvestment(inv.id)}
                                                    className="text-red-400 text-xs hover:text-red-300"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                        <div className="text-white/60 text-xs space-y-1">
                                            {inv.fromDisponible > 0 && <p>💵 Disponible: {formatCurrency(inv.fromDisponible)}</p>}
                                            {inv.fromEmergencia > 0 && <p>🚨 Emergencia: {formatCurrency(inv.fromEmergencia)}</p>}
                                            {inv.fromExternalSavings > 0 && <p>💰 Externos: {formatCurrency(inv.fromExternalSavings)}</p>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </BottomSheet>
        </div>
    );
}

export default SavingsPage;
