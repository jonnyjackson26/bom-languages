import React, { useState } from 'react';
import './DarkLightToggle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const DarkLightToggle = ({ onToggle }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        onToggle(newMode); // Notify parent component about mode change
    };

    return (
        <div className="dark-light-toggle">
            <input
                type="checkbox"
                id="modeToggle"
                className="toggle-checkbox"
                checked={isDarkMode}
                onChange={toggleMode}
            />
            <label htmlFor="modeToggle" className="toggle-label">
                <div className={`toggle-background ${isDarkMode ? 'dark' : 'light'}`}>
                    <div className="toggle-icon sun-icon">
                        <FontAwesomeIcon icon={faSun} />
                    </div>
                    <div className="toggle-icon moon-icon">
                        <FontAwesomeIcon icon={faMoon} />
                    </div>
                    <div className={`toggle-switch ${isDarkMode ? 'dark' : 'light'}`}></div>
                </div>
            </label>
        </div>
    );
};

export default DarkLightToggle;
