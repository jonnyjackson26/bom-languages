import React, { useState } from 'react';
import './GridListViewSwitcher.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons';

const GridListViewSwitcher = ({ onViewChange }) => {
    const [isGridView, setIsGridView] = useState(true);

    const toggleViewMode = () => {
        setIsGridView(prev => !prev);
        onViewChange(!isGridView); // Pass current view mode to parent component
    };

    return (
        <div className="view-switcher">
            <button className={`view-switcher-btn ${isGridView ? 'active' : ''}`} onClick={toggleViewMode}>
                <FontAwesomeIcon icon={faTh} /> {/* Grid View Icon */}
            </button>
            <button className={`view-switcher-btn ${!isGridView ? 'active' : ''}`} onClick={toggleViewMode}>
                <FontAwesomeIcon icon={faBars} /> {/* List View Icon */}
            </button>
        </div>
    );
};

export default GridListViewSwitcher;
