// src/components/AddTab.jsx

import React from 'react';
import AddExpenseForm from './AddExpenseForm';
import AddSavingForm from './AddSavingForm';
import AddInvestmentForm from './AddInvestmentForm'; // Importamos el nuevo componente
import { Plus } from 'lucide-react';

const AddTab = (props) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Centro de Transacciones</h2>
                <p className="text-white/70 max-w-lg mx-auto">Aquí puedes registrar todos tus movimientos: gastos diarios, ahorros, inversiones y cualquier ingreso extra.</p>
            </div>

            {/* Contenedor principal de formularios */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Columna Izquierda */}
                <div className="space-y-8">
                    <AddExpenseForm {...props} />
                    <AddSavingForm {...props} />
                </div>

                {/* Columna Derecha */}
                <div className="space-y-8">
                    <AddInvestmentForm {...props} />

                    {/* Tarjeta para Ingreso Extra */}
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-500/30 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-green-500 p-3 rounded-xl">
                                    <Plus className="text-white" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white">Añadir Ingreso Extra</h3>
                            </div>
                            <p className="text-white/80 mb-6">
                                Registra dinero que no es parte de tu ingreso fijo (bonos, regalos, ventas, etc.) para que se sume a tu "Dinero Disponible".
                            </p>
                        </div>
                        <button
                            onClick={() => props.setShowExtraIncomeModal(true)}
                            className="w-full mt-auto bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Agregar Ingreso Extra
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTab;
