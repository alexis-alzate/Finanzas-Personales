import React from 'react';
import { Calendar } from 'lucide-react';

const MonthSelector = ({
    selectedMonth,
    selectedYear,
    months,
    setSelectedMonth,
    setSelectedYear,
    showMonthSelector,
    setShowMonthSelector,
    getAvailableMonths,
    expenses,
    formatCurrency
}) => {
    return (
        <>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-4 md:p-6 mb-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-center md:text-left w-full md:w-auto">
                            <p className="text-white/80 text-xs md:text-sm font-semibold mb-1">Período Actual</p>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white flex items-center justify-center md:justify-start gap-2 md:gap-3 flex-wrap">
                                <Calendar className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0" />
                                <span className="break-words">{months[selectedMonth]} {selectedYear}</span>
                            </h2>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
                            <button
                                onClick={() => {
                                    if (selectedMonth === 0) {
                                        setSelectedMonth(11);
                                        setSelectedYear(selectedYear - 1);
                                    } else {
                                        setSelectedMonth(selectedMonth - 1);
                                    }
                                }}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-xl transition-all"
                            >
                                <span className="text-xl md:text-2xl">←</span>
                            </button>

                            <button
                                onClick={() => setShowMonthSelector(!showMonthSelector)}
                                className="bg-white text-purple-600 px-3 md:px-6 py-2 md:py-3 rounded-xl font-bold hover:bg-white/90 transition-all shadow-lg text-xs md:text-base whitespace-nowrap"
                            >
                                Ver Otros Meses
                            </button>

                            <button
                                onClick={() => {
                                    if (selectedMonth === 11) {
                                        setSelectedMonth(0);
                                        setSelectedYear(selectedYear + 1);
                                    } else {
                                        setSelectedMonth(selectedMonth + 1);
                                    }
                                }}
                                className="bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-xl transition-all"
                            >
                                <span className="text-xl md:text-2xl">→</span>
                            </button>

                            <button
                                onClick={() => {
                                    const now = new Date();
                                    setSelectedMonth(now.getMonth());
                                    setSelectedYear(now.getFullYear());
                                }}
                                className="bg-yellow-400 text-purple-900 px-3 md:px-6 py-2 md:py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all shadow-lg text-xs md:text-base whitespace-nowrap"
                            >
                                Hoy
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showMonthSelector && (
                <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl p-8 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800">Seleccionar Período</h3>
                        <button
                            onClick={() => setShowMonthSelector(false)}
                            className="text-gray-500 hover:text-gray-700 text-2xl"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {getAvailableMonths().map((period, idx) => {
                            const isSelected = period.month === selectedMonth && period.year === selectedYear;
                            const isCurrent = period.month === new Date().getMonth() && period.year === new Date().getFullYear();
                            const monthExpenses = expenses.filter(exp => {
                                const expDate = new Date(exp.date);
                                return expDate.getMonth() === period.month && expDate.getFullYear() === period.year;
                            });
                            const monthTotal = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);

                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        setSelectedMonth(period.month);
                                        setSelectedYear(period.year);
                                        setShowMonthSelector(false);
                                    }}
                                    className={`p-4 rounded-xl transition-all transform hover:scale-105 ${isSelected
                                            ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                                            : isCurrent
                                                ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-lg'
                                                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                                        }`}
                                >
                                    <p className="font-bold text-lg">{months[period.month]}</p>
                                    <p className={`text-sm ${isSelected || isCurrent ? 'text-white/80' : 'text-gray-600'}`}>
                                        {period.year}
                                    </p>
                                    {monthExpenses.length > 0 && (
                                        <p className={`text-xs mt-2 font-semibold ${isSelected || isCurrent ? 'text-white/90' : 'text-gray-700'}`}>
                                            {formatCurrency(monthTotal)}
                                        </p>
                                    )}
                                    {isCurrent && !isSelected && (
                                        <span className="text-xs bg-white text-orange-600 px-2 py-0.5 rounded-full mt-1 inline-block">
                                            Actual
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default MonthSelector;
