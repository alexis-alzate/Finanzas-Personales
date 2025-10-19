import React from 'react';
import MonthSelector from '../components/MonthSelector';
import SummaryCards from '../components/SummaryCards';
import Alerts from '../components/Alerts';

function HomePage({
    // Props de mes
    selectedMonth,
    selectedYear,
    months,
    setSelectedMonth,
    setSelectedYear,
    showMonthSelector,
    setShowMonthSelector,
    getAvailableMonths,

    // Props de datos
    monthlyIncome,
    totalSpent,
    remaining,
    remainingPercentage,
    totalSavings,
    savingsGoal,
    savingsPercentage,
    patrimonioTotal,
    totalExtraIncome,

    // Props de funciones
    formatCurrency,
    setShowIncomeModal,
    setShowGoalModal,
    setTempIncome,
    setTempGoal,
    setShowExtraIncomeModal,
    setShowSavingModal, // ← NUEVO

    // Props de alertas
    categoryData,
    expenses
}) {
    return (
        <div className="pb-24">
            <MonthSelector
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                months={months}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
                showMonthSelector={showMonthSelector}
                setShowMonthSelector={setShowMonthSelector}
                getAvailableMonths={getAvailableMonths}
                expenses={expenses}
                formatCurrency={formatCurrency}
            />

            <SummaryCards
                monthlyIncome={monthlyIncome}
                totalSpent={totalSpent}
                remaining={remaining}
                remainingPercentage={remainingPercentage}
                totalSavings={totalSavings}
                savingsGoal={savingsGoal}
                savingsPercentage={savingsPercentage}
                formatCurrency={formatCurrency}
                setShowIncomeModal={setShowIncomeModal}
                setShowGoalModal={setShowGoalModal}
                setTempIncome={setTempIncome}
                setTempGoal={setTempGoal}
                setShowExtraIncomeModal={setShowExtraIncomeModal}
                setShowSavingModal={setShowSavingModal} // ← NUEVO
                totalExtraIncome={totalExtraIncome}
                patrimonioTotal={patrimonioTotal}
            />

            <Alerts
                categoryData={categoryData}
                formatCurrency={formatCurrency}
            />
        </div>
    );
}

export default HomePage;
