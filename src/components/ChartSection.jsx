import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { mockMonthlyStats } from '../utils/mockData';
import CustomDropdown from './CustomDropdown';
import useStore from '../store/useStore';
import './ChartSection.css';

// Transform mock data for Recharts
const processLineData = () => {
    return mockMonthlyStats.labels.map((label, index) => ({
        name: label,
        Income: mockMonthlyStats.income[index],
        Expenses: mockMonthlyStats.expenses[index]
    }));
};

const COLORS = ['#ea605b', '#f29648', '#48b871', '#5b87ea', '#9b59b6', '#f1c40f'];

const ChartSection = () => {
    const { transactions } = useStore();
    const lineData = processLineData();

    // Dynamically calculate pie chart data based on user transactions
    const pieData = React.useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const grouped = expenses.reduce((acc, curr) => {
            acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
            return acc;
        }, {});

        const data = Object.keys(grouped).map(key => ({
            name: key,
            value: grouped[key]
        })).sort((a, b) => b.value - a.value); // Sort highest first

        // Fallback for empty state
        return data.length > 0 ? data : [
            { name: 'Rent', value: 25000 },
            { name: 'Food & Dining', value: 8000 }
        ];
    }, [transactions]);

    return (
        <div className="charts-container">
            {/* Time-based line chart */}
            <div className="chart-card line-chart-card">
                <div className="chart-header">
                    <h3>Statistics</h3>
                    <div className="chart-legend-custom">
                        <span className="legend-item"><span className="dot dot-income"></span> Total Income</span>
                        <span className="legend-item"><span className="dot dot-expense"></span> Total Expenses</span>
                        <CustomDropdown
                            value="monthly"
                            onChange={() => { }}
                            options={[
                                { value: 'monthly', label: 'Monthly' },
                                { value: 'yearly', label: 'Yearly' }
                            ]}
                            alignRight={true}
                        />
                    </div>
                </div>
                <div className="chart-body">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={lineData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', padding: '12px 16px' }}
                                itemStyle={{ color: '#333', fontWeight: 600, fontSize: '14px' }}
                                labelStyle={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: '12px', fontWeight: 500 }}
                                cursor={{ stroke: '#e8e8e8', strokeWidth: 1, strokeDasharray: '3 3' }}
                            />
                            <Line type="monotone" dataKey="Income" stroke="var(--color-green)" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff', fill: 'var(--color-green)' }} />
                            <Line type="monotone" dataKey="Expenses" stroke="var(--color-orange)" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff', fill: 'var(--color-orange)' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Category-based pie chart */}
            <div className="chart-card pie-chart-card">
                <div className="chart-header">
                    <h3>Spending Breakdown</h3>
                </div>
                <div className="chart-body">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} style={{ outline: 'none', cursor: 'pointer', transition: 'all 0.3s ease' }} className="pie-cell" />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}
                                itemStyle={{ fontWeight: 600 }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ChartSection;
