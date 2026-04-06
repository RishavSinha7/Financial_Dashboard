import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockTransactions } from '../utils/mockData';

const useStore = create(
    persist(
        (set) => ({
            userRole: 'Viewer', // 'Viewer' or 'Admin'
            setUserRole: (role) => set({ userRole: role }),

            transactions: mockTransactions,
            addTransaction: (transaction) => set((state) => ({ transactions: [transaction, ...state.transactions] })),
            editTransaction: (updatedTx) => set((state) => ({
                transactions: state.transactions.map(tx => tx.id === updatedTx.id ? updatedTx : tx)
            })),
            deleteTransaction: (id) => set((state) => ({
                transactions: state.transactions.filter(tx => tx.id !== id)
            })),

            // Filters for transactions
            searchQuery: '',
            setSearchQuery: (query) => set({ searchQuery: query }),
            filterType: 'all', // 'all', 'income', 'expense'
            setFilterType: (type) => set({ filterType: type }),
            sortOrder: 'date-desc', // 'date-desc', 'date-asc', 'amount-desc', 'amount-asc'
            setSortOrder: (order) => set({ sortOrder: order }),

            // Sidebar Mobile State
            isSidebarOpen: false,
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            closeSidebar: () => set({ isSidebarOpen: false }),
        }),
        {
            name: 'findash-storage',
            partialize: (state) => ({ transactions: state.transactions, userRole: state.userRole }),
            version: 1, // Invalidate old cache so the new personal transactions generate
        }
    )
);

export default useStore;
