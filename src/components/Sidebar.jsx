import React from 'react';
import { LayoutDashboard, FileText, CreditCard, ArrowRightLeft, BarChart3, Settings, HelpCircle, PieChart } from 'lucide-react';
import useStore from '../store/useStore';
import './Sidebar.css';

const Sidebar = () => {
    const { isSidebarOpen, closeSidebar } = useStore();

    return (
        <>
            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="logo-icon">
                        <PieChart color="#fff" size={20} />
                    </div>
                    <h2 className="logo-text">FinDash</h2>
                </div>

                <div className="menu-group">
                    <h3 className="menu-label">Main Menu</h3>
                    <ul>
                        <li className="menu-item active">
                            <LayoutDashboard size={20} />
                            <span>Dashboard</span>
                        </li>
                        <li className="menu-item">
                            <FileText size={20} />
                            <span>Invoices</span>
                        </li>
                        <li className="menu-item">
                            <CreditCard size={20} />
                            <span>Cards</span>
                        </li>
                        <li className="menu-item">
                            <ArrowRightLeft size={20} />
                            <span>Transaction</span>
                        </li>
                        <li className="menu-item">
                            <BarChart3 size={20} />
                            <span>Statistics</span>
                        </li>
                    </ul>
                </div>

                <div className="menu-group">
                    <h3 className="menu-label">Other Menu</h3>
                    <ul>
                        <li className="menu-item">
                            <Settings size={20} />
                            <span>Settings</span>
                        </li>
                        <li className="menu-item">
                            <HelpCircle size={20} />
                            <span>Help Centre</span>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
