import React, { useState } from 'react';
import './SerifSansSerifToggle.css';

const SerifSansSerifToggle = ({ onToggle }) => {
    const [isSansSerif, setIsSansSerif] = useState(false);

    const toggleFont = () => {
        const newFont = !isSansSerif;
        setIsSansSerif(newFont);
        onToggle(newFont); // Notify parent component about font change
    };

    return (
        <div className="serif-sans-serif-toggle">
            <input
                type="checkbox"
                id="fontToggle"
                className="toggle-checkbox"
                checked={isSansSerif}
                onChange={toggleFont}
            />
            <label htmlFor="fontToggle" className="toggle-label">
                <div className={`toggle-background ${isSansSerif ? 'sans-serif' : 'serif'}`}>
                    <div className="toggle-icon serif-icon">A</div>
                    <div className="toggle-icon sans-serif-icon">A</div>
                    <div className={`toggle-switch ${isSansSerif ? 'sans-serif' : 'serif'}`}></div>
                </div>
            </label>
        </div>
    );
};

export default SerifSansSerifToggle;
