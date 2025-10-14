import React from 'react';
import CategoryStatus from './CategoryStatus';
import Recommendations from './Recommendations';
import Charts from './Charts';

const OverviewTab = ({
    categoryData,
    formatCurrency,
    recommendations,
    pieData,
    spentPercentage,
    remaining,
    remainingPercentage,
    savingsPercentage,
    totalSavings,
    savingsGoal,
    dailyExpenses,
    months,
    selectedMonth,
    selectedYear
}) => {
    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Estado de Categorías */}
            <CategoryStatus categoryData={categoryData} formatCurrency={formatCurrency} />

            {/* Recomendaciones */}
            <Recommendations recommendations={recommendations} />

            {/* Gráficas */}
            <Charts
                pieData={pieData}
                spentPercentage={spentPercentage}
                remaining={remaining}
                remainingPercentage={remainingPercentage}
                savingsPercentage={savingsPercentage}
                totalSavings={totalSavings}
                savingsGoal={savingsGoal}
                dailyExpenses={dailyExpenses}
                months={months}
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                formatCurrency={formatCurrency}
            />
        </div>
    );
};

export default OverviewTab;
