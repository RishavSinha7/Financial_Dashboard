import React from 'react';
import { Lightbulb, TrendingUp } from 'lucide-react';
import { mockInsights } from '../utils/mockData';
import './InsightsPanel.css';

const InsightsPanel = () => {
    return (
        <div className="insights-panel">
            <div className="insights-header">
                <Lightbulb className="insights-icon" size={20} />
                <h3>Smart Insights</h3>
            </div>

            <div className="insights-content">
                <div className="insight-card">
                    <div className="insight-label">Highest Spending Category</div>
                    <div className="insight-value">{mockInsights.highestSpendingCategory}</div>
                </div>

                <div className="insight-card highlight">
                    <TrendingUp className="highlight-icon" size={16} />
                    <div className="insight-message">
                        {mockInsights.insightMessage}
                    </div>
                </div>

                <div className="insight-card alert">
                    <div className="insight-label">Largest Transaction</div>
                    <div className="insight-message">
                        Highest expense: ₹{mockInsights.largestTransaction.amount.toLocaleString('en-IN')} ({mockInsights.largestTransaction.category})
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsPanel;
