export const mockTransactions = [
  { id: '1', date: '2023-10-24', amount: 850, category: 'Food & Dining', type: 'expense', name: 'Zomato', status: 'Order Successful', logo: 'cactus' },
  { id: '2', date: '2023-10-23', amount: 85000, category: 'Salary', type: 'income', name: 'Tech Corp Inc.', status: 'Credited', logo: 'meta' },
  { id: '3', date: '2023-10-22', amount: 25000, category: 'Rent', type: 'expense', name: 'Apartment Rent', status: 'Transferred', logo: 'meta' },
  { id: '4', date: '2023-10-21', amount: 4200, category: 'Shopping', type: 'expense', name: 'Amazon', status: 'Order Successful', logo: 'dexcom' },
  { id: '5', date: '2023-10-20', amount: 1850, category: 'Bills & Utilities', type: 'expense', name: 'Electricity Bill', status: 'Paid', logo: 'alphabet' },
  { id: '6', date: '2023-10-19', amount: 450, category: 'Food & Dining', type: 'expense', name: 'Swiggy', status: 'Order Successful', logo: 'meta' },
  { id: '7', date: '2023-10-18', amount: 1500, category: 'Groceries', type: 'expense', name: 'Blinkit', status: 'Order Successful', logo: 'alphabet' },
  { id: '8', date: '2023-10-17', amount: 350, category: 'Transport', type: 'expense', name: 'Uber', status: 'Paid', logo: 'cactus' }
];

export const mockMonthlyStats = {
  income: [85000, 85000, 85000, 85000, 85000, 85000, 85000, 85000, 85000, 85000, 95000, 85000],
  expenses: [35000, 42000, 38000, 50000, 36000, 39000, 41000, 37000, 35000, 48000, 52000, 45000],
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

export const mockSummary = {
  totalBalance: 145000.50,
  balanceChange: 12.5,
  monthlyIncome: 85000.00,
  incomeChange: 0.0,
  monthlySavings: 37000.50,
  savingsChange: 15.2,
  monthlyOutcome: 48000.00,
  outcomeChange: 5.5
};

export const mockInsights = {
  highestSpendingCategory: 'Food & Dining',
  monthlyComparison: 15,
  insightMessage: 'You spent 15% more this month than last month',
  largestTransaction: {
    amount: 25000,
    category: 'Rent'
  }
};
