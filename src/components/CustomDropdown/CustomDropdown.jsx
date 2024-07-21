import React, { useState, useContext, useEffect, useRef } from 'react';
import { LanguageContext, ThemeContext } from "../../main.jsx";
import './CustomDropdown.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const CustomDropdown = ({ onToggle }) => {
    const { language, setLanguage } = useContext(LanguageContext);
    const { theme, setTheme } = useContext(ThemeContext);
    const dropdownRef = useRef(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [toggles, setToggles] = useState({
        lightDarkMode: theme === 'dark', // initialize based on current theme
        serifSansSerif: false,
        verseParagraph: false,
    });

    useEffect(() => {
        if (toggles.lightDarkMode) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }, [toggles.lightDarkMode, setTheme]);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleToggleChange = (toggle) => {
        setToggles((prevToggles) => {
            const updatedToggles = { ...prevToggles, [toggle]: !prevToggles[toggle] };
            if (onToggle) {
                onToggle(toggle, updatedToggles[toggle]);
            }
            return updatedToggles;
        });
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="custom-dropdown" ref={dropdownRef}>
            <button className="dropdown-button" onClick={handleDropdownToggle}>
                &#x22EE;
            </button>
            <div className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
                <div className="dropdown-item" onClick={() => handleToggleChange('lightDarkMode')}>
                    <span>Light/Dark Mode</span>
                    <div className={`toggle ${toggles.lightDarkMode ? 'active' : ''}`} />
                </div>
                <div className="dropdown-item" onClick={() => handleToggleChange('serifSansSerif')}>
                    <span>Serif/Sans Serif</span>
                    <div className={`toggle ${toggles.serifSansSerif ? 'active' : ''}`} />
                </div>
                <div className="dropdown-item" onClick={() => handleToggleChange('verseParagraph')}>
                    <span>Verse/Paragraph Mode</span>
                    <div className={`toggle ${toggles.verseParagraph ? 'active' : ''}`} />
                </div>
            </div>
        </div>
    );
};

export default CustomDropdown;
