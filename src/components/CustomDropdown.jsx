import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './CustomDropdown.css';

const CustomDropdown = ({ value, options, onChange, alignRight = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value) || options[0];

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
                <span className="selected-text">{selectedOption.label}</span>
                <ChevronDown size={14} className="dropdown-arrow" />
            </div>
            {isOpen && (
                <div className={`dropdown-options ${alignRight ? 'align-right' : 'align-left'}`}>
                    {options.map((opt) => (
                        <div
                            key={opt.value}
                            className={`dropdown-option ${value === opt.value ? 'active' : ''}`}
                            onClick={() => {
                                onChange(opt.value);
                                setIsOpen(false);
                            }}
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
