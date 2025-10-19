import React from 'react';
import { PiggyBank, X } from 'lucide-react';

const SavingModal = ({
    showSavingModal,
    setShowSavingModal,
    newSavingDescription,
    setNewSavingDescription,
    newSavingAmount,
    setNewSavingAmount,
    newSavingType,
    setNewSavingType,
    newSavingDate,
    setNewSavingDate,
    addSaving,
    formatCurrency,
    remaining
}) => {
    if (!showSavingModal) return null;

    const savingTypes = [
        {
            value: 'interno',
            label: '💰 Ahorro Interno',
            description: 'De tu dinero disponible',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            value: 'externo',
            label: '🏦 Ahorro Externo',
            description: 'Dinero que traes de fuera',
            color: 'from-green-500 to-emerald-500'
        },
        {
            value: 'emergencia',
            label: '🚨 Ahorro Emergencia',
            description: 'Fondo de emergencias',
            color: 'from-red-500 to-orange-500'
        }
    ];

    const selectedType = savingTypes.find(t => t.value === newSavingType);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-purple-400/30">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-purple-500/20 rounded-xl">
                            <PiggyBank className="w-6 h-6 text-purple-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Registrar Ahorro</h2>
                    </div>
                    <button
                        onClick={() => setShowSavingModal(false)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div className="space-y-4">
                    {/* Tipo de Ahorro */}
                    <div>
                        <label className="block text-sm font-semibold text-purple-200 mb-2">
                            🎯 Tipo de Ahorro
                        </label>
                        <div className="grid grid-cols-1 gap-3">
                            {savingTypes.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => setNewSavingType(type.value)}
                                    className={`p-4 rounded-xl font-semibold transition-all text-left ${newSavingType === type.value
                                            ? `bg-gradient-to-r ${type.color} text-white shadow-lg scale-105`
                                            : 'bg-white/10 text-purple-200 hover:bg-white/20'
                                        }`}
                                >
                                    <div className="font-bold">{type.label}</div>
                                    <div className="text-xs opacity-70 mt-1">{type.description}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block text-sm font-semibold text-purple-200 mb-2">
                            📝 Descripción
                        </label>
                        <input
                            type="text"
                            value={newSavingDescription}
                            onChange={(e) => setNewSavingDescription(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white placeholder-purple-300/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                            placeholder="Ej: Ahorro para vacaciones"
                        />
                    </div>

                    {/* Monto */}
                    <div>
                        <label className="block text-sm font-semibold text-purple-200 mb-2">
                            💵 Monto
                        </label>
                        <input
                            type="number"
                            value={newSavingAmount}
                            onChange={(e) => setNewSavingAmount(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white placeholder-purple-300/50 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all text-lg font-semibold"
                            placeholder="100000"
                        />
                        <p className="text-xs text-purple-300/60 mt-2">
                            Vista previa: {formatCurrency(parseFloat(newSavingAmount) || 0)}
                        </p>
                    </div>

                    {/* Info de disponible */}
                    {(newSavingType === 'interno' || newSavingType === 'emergencia') && (
                        <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                            <p className="text-sm text-blue-200">
                                💰 <strong>Disponible:</strong> {formatCurrency(remaining)}
                            </p>
                        </div>
                    )}

                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-semibold text-purple-200 mb-2">
                            📅 Fecha
                        </label>
                        <input
                            type="date"
                            value={newSavingDate}
                            onChange={(e) => setNewSavingDate(e.target.value)}
                            className="w-full px-4 py-3 bg-white/10 backdrop-blur border-2 border-purple-300/30 text-white rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Resumen */}
                    <div className={`bg-gradient-to-r ${selectedType.color} bg-opacity-20 border border-white/30 rounded-xl p-4`}>
                        <p className="text-sm text-white">
                            <strong>📋 Resumen:</strong><br />
                            Registrarás <strong>{selectedType.label}</strong> por <strong>{formatCurrency(parseFloat(newSavingAmount) || 0)}</strong>
                        </p>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={() => setShowSavingModal(false)}
                            className="flex-1 bg-white/10 backdrop-blur text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                if (!newSavingDescription || !newSavingAmount) {
                                    alert('Por favor completa todos los campos');
                                    return;
                                }
                                addSaving();
                            }}
                            className={`flex-1 bg-gradient-to-r ${selectedType.color} text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all`}
                        >
                            Guardar Ahorro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavingModal;
