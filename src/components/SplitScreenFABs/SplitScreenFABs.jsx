import React, { useState, useEffect } from 'react';
import './SplitScreenFABs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLinesVertical, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const SplitScreenFABs = ({ onToggle }) => {
    const [layout, setLayout] = useState('column');

    useEffect(() => {
        const initialLayout = window.innerWidth <= 768 ? 'row' : 'column';
        handleLayoutChange(initialLayout);
    }, []);

    const handleLayoutChange = (newLayout) => {
        setLayout(newLayout);
        onToggle(newLayout); // Notify parent component about layout change
    };

    return (
        <div className="fab-container">
            <button
                className={`toggle-button ${layout === 'row' ? 'active' : ''}`}
                onClick={() => handleLayoutChange('row')}
                title="Row Layout"
            >
                <FontAwesomeIcon icon={faGripLines} />
            </button>

            <button
                className={`toggle-button ${layout === 'column' ? 'active' : ''}`}
                onClick={() => handleLayoutChange('column')}
                title="Column Layout"
            >
                <FontAwesomeIcon icon={faGripLinesVertical} />
            </button>
            <Link to="/" className="fab home-fab">
                <i className="fas fa-home"></i>
            </Link>
        </div>
    );
};

export default SplitScreenFABs;
