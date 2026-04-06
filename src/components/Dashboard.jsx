import React from 'react';
import SummaryCard from './SummaryCard';
import ChartSection from './ChartSection';
import InsightsPanel from './InsightsPanel';
import TransactionsTable from './TransactionsTable';
import { mockSummary } from '../utils/mockData';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="cards-grid">
                <SummaryCard
                    title="Monthly Income"
                    amount={mockSummary.monthlyIncome}
                    change={mockSummary.incomeChange}
                    isPositive={mockSummary.incomeChange > 0}
                    graphColor="var(--color-green)"
                    points={[10, 20, 15, 30, 25, 45, 60, 40, 70, 85, 80, 100]}
                />
                <SummaryCard
                    title="Monthly Savings"
                    amount={mockSummary.monthlySavings}
                    change={mockSummary.savingsChange}
                    isPositive={mockSummary.savingsChange > 0}
                    graphColor="var(--color-orange)"
                    points={[20, 15, 25, 20, 30, 25, 35, 45, 40, 50, 70, 90]}
                />
                <SummaryCard
                    title="Monthly Outcome"
                    amount={mockSummary.monthlyOutcome}
                    change={Math.abs(mockSummary.outcomeChange)}
                    isPositive={mockSummary.outcomeChange > 0}
                    graphColor="var(--color-red)"
                    points={[5, 10, 8, 15, 20, 15, 30, 25, 40, 35, 60, 85]}
                />
            </div>

            <div className="charts-insights-row">
                <ChartSection />
                <InsightsPanel />
            </div>

            <div className="transactions-row">
                <TransactionsTable />
            </div>
        </div>
    );
};

export default Dashboard;
