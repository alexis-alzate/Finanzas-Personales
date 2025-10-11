import React from 'react';
import { PiggyBank } from 'lucide-react';

const AddSavingForm = ({
    savingDescription,
    setSavingDescription,
    savingAmount,
    setSavingAmount,
    savingDate,
    setSavingDate,
    addExternalSaving
}) => {
    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl p-8 mb-8 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <PiggyBank className="w-7 h-7 text-green-600" />
                Agregar Ahorro Externo
            </h2>
            <p className="text-sm text-gray-600 mb-4">
                💡 Registra ahorros que no vienen de tu ingreso mensual (bonos, regalos, ventas, etc.)
            </p>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                    <input
                        type="text"
                        value={savingDescription}
                        onChange={(e) => setSavingDescription(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        placeholder="Ej: Bono de trabajo, Regalo, Venta de algo"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Monto (COP)</label>
                        <input
                            type="number"
                            step="1000"
                            value={savingAmount}
                            onChange={(e) => setSavingAmount(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                            placeholder="50000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Fecha</label>
                        <input
                            type="date"
                            value={savingDate}
                            onChange={(e) => setSavingDate(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-green-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <button
                    onClick={addExternalSaving}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg"
                >
                    💰 Agregar Ahorro
                </button>
            </div>
        </div>
    );
};

export default AddSavingForm;
