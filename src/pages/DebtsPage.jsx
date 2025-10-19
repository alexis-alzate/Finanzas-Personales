import React, { useState } from 'react';
import { CreditCard, PlusCircle, DollarSign, Eye, Trash2 } from 'lucide-react';
import BottomSheet from '../components/BottomSheet';

function DebtsPage({
    // Props para manejar deudas
    debts,
    debtPayments,
    addDebt,
    deleteDebt,
    addDebtPayment,
    deleteDebtPayment,
    formatCurrency,
    remaining
}) {
    const [showMenu, setShowMenu] = useState(true);
    const [activeView, setActiveView] = useState(null);

    // Estados para agregar deuda
    const [debtName, setDebtName] = useState('');
    const [debtTotal, setDebtTotal] = useState('');
    const [debtMonthlyPayment, setDebtMonthlyPayment] = useState('');
    const [debtStartDate, setDebtStartDate] = useState(new Date().toISOString().split('T')[0]);

    // Estados para pagar cuota
    const [selectedDebt, setSelectedDebt] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0]);
    const [paymentNote, setPaymentNote] = useState('');

    const menuOptions = [
        {
            id: 'add',
            icon: PlusCircle,
            label: 'Agregar Deuda',
            color: 'from-red-500 to-pink-600',
            description: 'Registra una nueva deuda'
        },
        {
            id: 'pay',
            icon: DollarSign,
            label: 'Pagar Cuota',
            color: 'from-green-500 to-emerald-600',
            description: 'Registra un pago de deuda'
        },
        {
            id: 'list',
            icon: Eye,
            label: 'Ver Deudas',
            color: 'from-blue-500 to-indigo-600',
            description: 'Lista de todas tus deudas'
        }
    ];

    const handleOptionClick = (optionId) => {
        setActiveView(optionId);
        setShowMenu(false);
    };

    const handleBack = () => {
        setActiveView(null);
        setShowMenu(true);
        setSelectedDebt(null);
    };

    // Calcular total pagado de una deuda
    const getTotalPaid = (debtId) => {
        return debtPayments
            .filter(p => p.debtId === debtId)
            .reduce((sum, p) => sum + p.amount, 0);
    };

    // Calcular totales generales
    const totalDebts = debts.reduce((sum, d) => sum + d.totalAmount, 0);
    const totalPaid = debts.reduce((sum, d) => sum + getTotalPaid(d.id), 0);
    const totalRemaining = totalDebts - totalPaid;
    const totalMonthlyPayments = debts
        .filter(d => d.status === 'active')
        .reduce((sum, d) => sum + d.monthlyPayment, 0);

    return (
        <div className="pb-32 px-4">
            {/* Menú principal */}
            {showMenu && (
                <div className="space-y-4 mt-6">
                    <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <CreditCard className="w-8 h-8" />
                        Mis Deudas
                    </h1>

                    {/* Resumen de deudas */}
                    <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 rounded-2xl shadow-xl mb-6">
                        <p className="text-white/80 text-sm mb-2">Total Adeudado</p>
                        <p className="text-3xl font-bold text-white">{formatCurrency(totalRemaining)}</p>

                        <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-white/80 text-xs mb-1">Total Pagado</p>
                                <p className="text-lg font-bold text-white">{formatCurrency(totalPaid)}</p>
                            </div>
                            <div>
                                <p className="text-white/80 text-xs mb-1">Cuotas Mensuales</p>
                                <p className="text-lg font-bold text-white">{formatCurrency(totalMonthlyPayments)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Lista rápida de deudas activas */}
                    {debts.filter(d => d.status === 'active').length > 0 && (
                        <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl mb-6">
                            <h3 className="text-white font-bold mb-3">Deudas Activas</h3>
                            <div className="space-y-2">
                                {debts.filter(d => d.status === 'active').map(debt => {
                                    const paid = getTotalPaid(debt.id);
                                    const remaining = debt.totalAmount - paid;
                                    const progress = (paid / debt.totalAmount) * 100;

                                    return (
                                        <div key={debt.id} className="bg-white/10 p-3 rounded-xl">
                                            <div className="flex justify-between items-start mb-2">
                                                <p className="text-white font-semibold text-sm">{debt.name}</p>
                                                <p className="text-white text-xs">{progress.toFixed(0)}%</p>
                                            </div>
                                            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full transition-all"
                                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                                />
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-white/60">Falta: {formatCurrency(remaining)}</span>
                                                <span className="text-white/60">Cuota: {formatCurrency(debt.monthlyPayment)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

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

            {/* Vista: Agregar Deuda */}
            <BottomSheet
                isOpen={activeView === 'add'}
                onClose={handleBack}
                title="Nueva Deuda"
                icon={PlusCircle}
            >
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Nombre de la deuda (ej: Tarjeta Bancolombia)"
                        value={debtName}
                        onChange={(e) => setDebtName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="number"
                        placeholder="Monto total de la deuda"
                        value={debtTotal}
                        onChange={(e) => setDebtTotal(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="number"
                        placeholder="Cuota mensual"
                        value={debtMonthlyPayment}
                        onChange={(e) => setDebtMonthlyPayment(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <input
                        type="date"
                        value={debtStartDate}
                        onChange={(e) => setDebtStartDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />

                    <button
                        onClick={() => {
                            if (debtName && debtTotal && debtMonthlyPayment) {
                                addDebt({
                                    name: debtName,
                                    totalAmount: parseFloat(debtTotal),
                                    monthlyPayment: parseFloat(debtMonthlyPayment),
                                    startDate: debtStartDate,
                                    status: 'active'
                                });
                                setDebtName('');
                                setDebtTotal('');
                                setDebtMonthlyPayment('');
                                handleBack();
                            }
                        }}
                        className="w-full bg-white text-red-600 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
                    >
                        💳 Agregar Deuda
                    </button>
                </div>
            </BottomSheet>

            {/* Vista: Pagar Cuota */}
            <BottomSheet
                isOpen={activeView === 'pay'}
                onClose={handleBack}
                title="Pagar Cuota"
                icon={DollarSign}
            >
                <div className="space-y-4">
                    <div className="bg-white/10 p-4 rounded-xl mb-4">
                        <p className="text-white/80 text-sm mb-1">Disponible para pagar:</p>
                        <p className="text-2xl font-bold text-white">{formatCurrency(remaining)}</p>
                    </div>

                    {!selectedDebt ? (
                        <div className="space-y-2">
                            <p className="text-white text-sm mb-3">Selecciona la deuda a pagar:</p>
                            {debts.filter(d => d.status === 'active').map(debt => (
                                <button
                                    key={debt.id}
                                    onClick={() => {
                                        setSelectedDebt(debt);
                                        setPaymentAmount(String(debt.monthlyPayment));
                                    }}
                                    className="w-full bg-white/10 p-4 rounded-xl text-left hover:bg-white/20 transition-all"
                                >
                                    <p className="text-white font-semibold">{debt.name}</p>
                                    <p className="text-white/60 text-sm">Cuota sugerida: {formatCurrency(debt.monthlyPayment)}</p>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="bg-blue-500/20 p-4 rounded-xl mb-4">
                                <p className="text-white font-semibold">{selectedDebt.name}</p>
                                <p className="text-white/60 text-sm">Cuota: {formatCurrency(selectedDebt.monthlyPayment)}</p>
                            </div>

                            <input
                                type="number"
                                placeholder="Monto a pagar"
                                value={paymentAmount}
                                onChange={(e) => setPaymentAmount(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />

                            <input
                                type="date"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />

                            <input
                                type="text"
                                placeholder="Nota (opcional)"
                                value={paymentNote}
                                onChange={(e) => setPaymentNote(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />

                            <button
                                onClick={() => {
                                    if (paymentAmount) {
                                        addDebtPayment({
                                            debtId: selectedDebt.id,
                                            amount: parseFloat(paymentAmount),
                                            date: paymentDate,
                                            note: paymentNote
                                        });
                                        setPaymentAmount('');
                                        setPaymentNote('');
                                        setSelectedDebt(null);
                                        handleBack();
                                    }
                                }}
                                className="w-full bg-white text-green-600 py-4 rounded-xl font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
                            >
                                💸 Registrar Pago
                            </button>

                            <button
                                onClick={() => setSelectedDebt(null)}
                                className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold hover:bg-white/20 transition-all"
                            >
                                ← Cambiar Deuda
                            </button>
                        </>
                    )}
                </div>
            </BottomSheet>

            {/* Vista: Lista de Deudas */}
            <BottomSheet
                isOpen={activeView === 'list'}
                onClose={handleBack}
                title="Todas las Deudas"
                icon={Eye}
            >
                <div className="space-y-4">
                    {debts.length === 0 ? (
                        <p className="text-white/60 text-center py-8">No tienes deudas registradas</p>
                    ) : (
                        debts.map(debt => {
                            const paid = getTotalPaid(debt.id);
                            const remaining = debt.totalAmount - paid;
                            const progress = (paid / debt.totalAmount) * 100;
                            const payments = debtPayments.filter(p => p.debtId === debt.id);

                            return (
                                <div key={debt.id} className="bg-white/10 p-5 rounded-xl">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{debt.name}</h3>
                                            <p className="text-white/60 text-xs">Desde: {new Date(debt.startDate).toLocaleDateString('es')}</p>
                                        </div>
                                        <button
                                            onClick={() => deleteDebt(debt.id)}
                                            className="text-red-400 hover:text-red-300 p-2"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="bg-white/10 p-3 rounded-lg mb-3 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/80">Deuda Total:</span>
                                            <span className="text-white font-bold">{formatCurrency(debt.totalAmount)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/80">Pagado:</span>
                                            <span className="text-green-400 font-bold">{formatCurrency(paid)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/80">Falta:</span>
                                            <span className="text-red-400 font-bold">{formatCurrency(remaining)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/80">Cuota Mensual:</span>
                                            <span className="text-white font-bold">{formatCurrency(debt.monthlyPayment)}</span>
                                        </div>
                                    </div>

                                    <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                                        <div
                                            className={`h-3 rounded-full transition-all ${progress >= 100 ? 'bg-green-500' : 'bg-blue-500'
                                                }`}
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        />
                                    </div>
                                    <p className="text-white/60 text-xs text-center mb-3">
                                        Progreso: {progress.toFixed(1)}%
                                    </p>

                                    {payments.length > 0 && (
                                        <details className="mt-3">
                                            <summary className="text-white/80 text-sm cursor-pointer hover:text-white">
                                                Ver historial de pagos ({payments.length})
                                            </summary>
                                            <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                                                {payments.map(payment => (
                                                    <div key={payment.id} className="bg-white/5 p-2 rounded text-xs flex justify-between items-center">
                                                        <div>
                                                            <p className="text-white">{formatCurrency(payment.amount)}</p>
                                                            <p className="text-white/60">{new Date(payment.date).toLocaleDateString('es')}</p>
                                                            {payment.note && <p className="text-white/40 italic">{payment.note}</p>}
                                                        </div>
                                                        <button
                                                            onClick={() => deleteDebtPayment(payment.id)}
                                                            className="text-red-400 hover:text-red-300"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </details>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </BottomSheet>
        </div>
    );
}

export default DebtsPage;
