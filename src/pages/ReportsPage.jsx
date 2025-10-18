import React from 'react';
import { BarChart3 } from 'lucide-react';
import TransactionsTab from '../components/TransactionsTab';
import AnalyticsTab from '../components/AnalyticsTab';

function ReportsPage({
    filteredExpenses,
    filteredExternalSavings,
    filteredInvestments,
    filteredExtraIncomes,
    filteredSalaryIncomes,
    allExpenses,
    allExternalSavings,
    allInvestments,
    allExtraIncomes,
    allSalaryIncomes,
    deleteExpense,
    deleteExternalSaving,
    deleteInvestment,
    deleteExtraIncome,
    deleteSalaryIncome,
    categories,
    formatCurrency,
    months,
    selectedMonth,
    selectedYear,
    totalExtraIncome,
    totalInvestedFromExternalSavings
}) {
    return (
        <div className="pb-24 px-4">
            <h1 className="text-3xl font-bold text-white mb-6 mt-6 flex items-center gap-3">
                <BarChart3 className="w-8 h-8" />
                Reportes y Análisis
            </h1>

            {/* Historial de Transacciones */}
            <div className="mb-8">
                <TransactionsTab
                    filteredExpenses={filteredExpenses}
                    filteredExternalSavings={filteredExternalSavings}
                    filteredInvestments={filteredInvestments}
                    filteredExtraIncomes={filteredExtraIncomes}
                    filteredSalaryIncomes={filteredSalaryIncomes}
                    allExpenses={allExpenses}
                    allExternalSavings={allExternalSavings}
                    allInvestments={allInvestments}
                    allExtraIncomes={allExtraIncomes}
                    allSalaryIncomes={allSalaryIncomes}
                    deleteExpense={deleteExpense}
                    deleteExternalSaving={deleteExternalSaving}
                    deleteInvestment={deleteInvestment}
                    deleteExtraIncome={deleteExtraIncome}
                    deleteSalaryIncome={deleteSalaryIncome}
                    categories={categories}
                    formatCurrency={formatCurrency}
                    months={months}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    totalExtraIncome={totalExtraIncome}
                    totalInvestedFromExternalSavings={totalInvestedFromExternalSavings}
                />
            </div>

            {/* Analytics */}
            <div>
                <AnalyticsTab />
            </div>
        </div>
    );
}

export default ReportsPage;
