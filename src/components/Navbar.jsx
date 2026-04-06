import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import useStore from '../store/useStore';
import './Navbar.css';

const Navbar = () => {
    const { userRole, setUserRole, searchQuery, setSearchQuery, toggleSidebar } = useStore();
    const [isRoleMenuOpen, setIsRoleMenuOpen] = React.useState(false);

    const handleRoleSelect = (role) => {
        setUserRole(role);
        setIsRoleMenuOpen(false);
    };

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button className="icon-btn mobile-menu-btn" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <div className="title-wrapper">
                    <h1 className="page-title">Dashboard</h1>
                    <p className="page-subtitle">Get the latest update for 7 days</p>
                </div>
            </div>

            <div className="navbar-right">
                <div className="search-container">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Type here to search"
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="nav-actions">
                    <button className="icon-btn" aria-label="Notifications">
                        <Bell size={20} />
                        <span className="badge"></span>
                    </button>

                    <div className="role-switcher">
                        <div className="custom-dropdown">
                            <div className="dropdown-selected" onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}>
                                <span className="selected-text">{userRole === 'Viewer' ? 'Viewer (Read-only)' : 'Admin'}</span>
                                <ChevronDown size={14} className="dropdown-arrow" />
                            </div>
                            {isRoleMenuOpen && (
                                <div className="dropdown-options">
                                    <div
                                        className={`dropdown-option ${userRole === 'Viewer' ? 'active' : ''}`}
                                        onClick={() => handleRoleSelect('Viewer')}
                                    >
                                        Viewer (Read-only)
                                    </div>
                                    <div
                                        className={`dropdown-option ${userRole === 'Admin' ? 'active' : ''}`}
                                        onClick={() => handleRoleSelect('Admin')}
                                    >
                                        Admin
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="profile-menu">
                        <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="profile-img" />
                        <div className="profile-info">
                            <span className="profile-name">Rishav Sinha</span>
                        </div>
                        <ChevronDown size={16} color="#888" className="profile-arrow" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
