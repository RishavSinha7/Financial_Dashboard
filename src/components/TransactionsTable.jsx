import React, { useState } from 'react';
import { Plus, Filter, ArrowUpDown, Edit2, Trash2, XCircle } from 'lucide-react';
import useStore from '../store/useStore';
import CustomDropdown from './CustomDropdown';
import './TransactionsTable.css';

const TransactionsTable = () => {
    const {
        transactions,
        userRole,
        searchQuery, setSearchQuery,
        filterType, setFilterType,
        sortOrder, setSortOrder,
        addTransaction,
        editTransaction,
        deleteTransaction
    } = useStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTx, setEditingTx] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        category: 'Software',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        logo: 'default'
    });

    const getFilteredAndSortedTransactions = () => {
        let result = [...transactions];

        if (searchQuery) {
            result = result.filter(tx =>
                tx.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tx.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (filterType !== 'all') {
            result = result.filter(tx => tx.type === filterType);
        }

        result.sort((a, b) => {
            switch (sortOrder) {
                case 'date-desc': return new Date(b.date) - new Date(a.date);
                case 'date-asc': return new Date(a.date) - new Date(b.date);
                case 'amount-desc': return b.amount - a.amount;
                case 'amount-asc': return a.amount - b.amount;
                default: return 0;
            }
        });

        return result;
    };

    const filteredTransactions = getFilteredAndSortedTransactions();
    const hasActiveFilters = searchQuery !== '' || filterType !== 'all' || sortOrder !== 'date-desc';

    const clearFilters = () => {
        setSearchQuery('');
        setFilterType('all');
        setSortOrder('date-desc');
    };

    const handleOpenModal = (tx = null) => {
        if (userRole !== 'Admin') return; // Double protection
        if (tx) {
            setEditingTx(tx);
            setFormData({ ...tx });
        } else {
            setEditingTx(null);
            setFormData({
                name: '', amount: '', category: 'Software', type: 'expense',
                date: new Date().toISOString().split('T')[0], logo: 'default'
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            amount: Number(formData.amount),
            id: editingTx ? editingTx.id : Date.now().toString(),
            status: 'User Added'
        };

        if (editingTx) {
            editTransaction(payload);
        } else {
            addTransaction(payload);
        }
        setIsModalOpen(false);
    };

    return (
        <div className="transactions-container">
            <div className="transactions-header">
                <h3>Transactions</h3>

                <div className="transactions-actions">
                    {hasActiveFilters && (
                        <button className="btn-clear-filters" onClick={clearFilters}>
                            <XCircle size={14} /> Clear Filters
                        </button>
                    )}

                    <CustomDropdown
                        value={filterType}
                        onChange={setFilterType}
                        options={[
                            { value: 'all', label: 'All Types' },
                            { value: 'income', label: 'Income' },
                            { value: 'expense', label: 'Expense' }
                        ]}
                    />

                    <CustomDropdown
                        value={sortOrder}
                        onChange={setSortOrder}
                        options={[
                            { value: 'date-desc', label: 'Newest First' },
                            { value: 'date-asc', label: 'Oldest First' },
                            { value: 'amount-desc', label: 'Highest Amount' },
                            { value: 'amount-asc', label: 'Lowest Amount' }
                        ]}
                        alignRight={true}
                    />

                    <button
                        className={`btn-primary ${userRole !== 'Admin' ? 'disabled' : ''}`}
                        onClick={() => handleOpenModal()}
                        disabled={userRole !== 'Admin'}
                        title={userRole !== 'Admin' ? 'Only Admin can perform this action' : 'Add Transaction'}
                    >
                        <Plus size={16} /> Add Transaction
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="transactions-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Type</th>
                            {userRole === 'Admin' && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTransactions.length > 0 ? (
                            filteredTransactions.map(tx => (
                                <tr key={tx.id}>
                                    <td>
                                        <div className="tx-name-cell">
                                            <div className={`tx-icon tx-icon-${tx.logo}`}></div>
                                            <div>
                                                <div className="tx-name">{tx.name}</div>
                                                <div className="tx-status">{tx.status}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{tx.category}</td>
                                    <td>{new Date(tx.date).toLocaleDateString()}</td>
                                    <td className={tx.type === 'income' ? 'text-green' : 'text-red'}>
                                        {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                                    </td>
                                    <td>
                                        <span className={`type-badge type-${tx.type}`}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    {userRole === 'Admin' && (
                                        <td>
                                            <div className="row-actions">
                                                <button className="icon-btn-small" onClick={() => handleOpenModal(tx)}><Edit2 size={14} /></button>
                                                <button className="icon-btn-small delete" onClick={() => deleteTransaction(tx.id)}><Trash2 size={14} /></button>
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={userRole === 'Admin' ? 6 : 5} className="empty-state">
                                    <div className="empty-state-content">
                                        <h4>No transactions found</h4>
                                        <p>Try adjusting your filters or search query.</p>
                                        {hasActiveFilters && (
                                            <button className="btn-clear-filters centered" onClick={clearFilters}>
                                                Clear All Filters
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{editingTx ? 'Edit Transaction' : 'Add Transaction'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Amount</label>
                                <input required type="number" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
                            </div>
                            <div className="form-group row">
                                <div className="half">
                                    <label>Type</label>
                                    <select value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                                        <option value="expense">Expense</option>
                                        <option value="income">Income</option>
                                    </select>
                                </div>
                                <div className="half">
                                    <label>Category</label>
                                    <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                        <option value="Software">Software</option>
                                        <option value="Services">Services</option>
                                        <option value="Equipment">Equipment</option>
                                        <option value="Marketing">Marketing</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input required type="date" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionsTable;
