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
    filteredSavings, // ← AGREGAR
    allExpenses,
    allExternalSavings,
    allInvestments,
    allExtraIncomes,
    allSalaryIncomes,
    allSavings, // ← AGREGAR
    deleteExpense,
    deleteExternalSaving,
    deleteInvestment,
    deleteExtraIncome,
    deleteSalaryIncome,
    deleteSaving, // ← AGREGAR
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

            <div className="mb-8">
                <TransactionsTab
                    filteredExpenses={filteredExpenses}
                    filteredExternalSavings={filteredExternalSavings}
                    filteredInvestments={filteredInvestments}
                    filteredExtraIncomes={filteredExtraIncomes}
                    filteredSalaryIncomes={filteredSalaryIncomes}
                    filteredSavings={filteredSavings} // ← AGREGAR
                    allExpenses={allExpenses}
                    allExternalSavings={allExternalSavings}
                    allInvestments={allInvestments}
                    allExtraIncomes={allExtraIncomes}
                    allSalaryIncomes={allSalaryIncomes}
                    allSavings={allSavings} // ← AGREGAR
                    deleteExpense={deleteExpense}
                    deleteExternalSaving={deleteExternalSaving}
                    deleteInvestment={deleteInvestment}
                    deleteExtraIncome={deleteExtraIncome}
                    deleteSalaryIncome={deleteSalaryIncome}
                    deleteSaving={deleteSaving} // ← AGREGAR
                    categories={categories}
                    formatCurrency={formatCurrency}
                    months={months}
                    selectedMonth={selectedMonth}
                    selectedYear={selectedYear}
                    totalExtraIncome={totalExtraIncome}
                    totalInvestedFromExternalSavings={totalInvestedFromExternalSavings}
                />
            </div>

            <div>
                <AnalyticsTab
                    allExpenses={allExpenses}
                    allSavings={allSavings}
                    allSalaryIncomes={allSalaryIncomes}
                    allExtraIncomes={allExtraIncomes}
                    formatCurrency={formatCurrency}
                    categories={categories}
                    months={months}


                />

            </div>
        </div>
    );
}

export default ReportsPage;
