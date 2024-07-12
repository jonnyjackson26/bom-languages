import React, { useState, useEffect } from 'react';
import './SplitScreenLayoutToggle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLinesVertical, faGripLines } from '@fortawesome/free-solid-svg-icons';
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

const SplitScreenLayoutToggle = ({ onToggle }) => {
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
        <div className="layout-toggle">
            <div className="toggle-option">
                <input
                    type="radio"
                    id="column"
                    name="layout"
                    value="column"
                    checked={layout === 'column'}
                    onChange={() => handleLayoutChange('column')}
                />
                <label htmlFor="column" title="Column Layout">
                    <FontAwesomeIcon icon={faGripLinesVertical} />
                </label>
            </div>
            <div className="toggle-option">
                <input
                    type="radio"
                    id="row"
                    name="layout"
                    value="row"
                    checked={layout === 'row'}
                    onChange={() => handleLayoutChange('row')}
                />
                <label htmlFor="row" title="Row Layout">
                    <FontAwesomeIcon icon={faGripLines} />
                </label>
            </div>
            <div className="toggle-option">
                <input
                    type="radio"
                    id="inline"
                    name="layout"
                    value="inline"
                    checked={layout === 'inline'}
                    onChange={() => handleLayoutChange('inline')}
                />
                <label htmlFor="inline" title="Inline Layout">
                    <FontAwesomeIcon icon={faFileLines} />
                </label>
            </div>
        </div>
    );
};

export default SplitScreenLayoutToggle;
