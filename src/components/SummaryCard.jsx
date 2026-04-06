import React from 'react';
import classNames from 'classnames';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './SummaryCard.css';

const SummaryCard = ({ title, amount, change, isPositive, graphColor, points }) => {
    // A simple static SVG line chart mapping points to path (this replaces the complex chart lib for tiny graphs)
    // For production, this could be a small Recharts LineChart or <canvas>.
    // We'll calculate a basic polyline for visual representation (Mock line)

    const width = 150;
    const height = 40;

    // Generating a mocked smooth path based on points
    const pointsStr = points.map((p, i) => `${(i / (points.length - 1)) * width},${height - (p / Math.max(...points)) * height}`).join(' L ');

    return (
        <div className="summary-card">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                <h2 className="card-amount">₹{amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>

                <div className={classNames('card-change', { 'positive': isPositive, 'negative': !isPositive })}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <span>{isPositive ? '+' : ''}{change}% last month</span>
                </div>
            </div>

            <div className="card-graph">
                <svg viewBox={`0 0 ${width} ${height}`} className="mini-graph" preserveAspectRatio="none">
                    <path
                        d={`M ${pointsStr}`}
                        fill="none"
                        stroke={graphColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SummaryCard;
