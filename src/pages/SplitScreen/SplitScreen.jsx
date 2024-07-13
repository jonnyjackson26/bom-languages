import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SplitScreen.css';
import ScriptureBroswer from '../../components/ScriptueBrowser/ScriptureBrowser.jsx';
import SplitScreenFABs from '../../components/SplitScreenFABs/SplitScreenFABs.jsx';

export function SplitScreen() {
    const [layout, setLayout] = useState("column");

    useEffect(() => {
        // Apply styles to the html and body elements
        document.documentElement.style.height = '100%';  // Set html height to 100%
        document.documentElement.style.margin = '0';     // Remove default margin
        document.documentElement.style.padding = '0';    // Remove default padding
        document.documentElement.style.overflow = 'hidden';  // Prevent scrolling on html element
        document.body.style.height = '100%';  // Set body height to 100%
        document.body.style.margin = '0';     // Remove default margin
        document.body.style.padding = '0';    // Remove default padding
        document.body.style.overflow = 'hidden';  // Prevent scrolling on body element

        // Clean up: Reset styles when the component unmounts
        return () => {
            document.documentElement.style.height = '';  // Reset html height
            document.documentElement.style.margin = '';  // Reset html margin
            document.documentElement.style.padding = '';  // Reset html padding
            document.documentElement.style.overflow = '';  // Reset html overflow
            document.body.style.height = '';  // Reset body height
            document.body.style.margin = '';  // Reset body margin
            document.body.style.padding = '';  // Reset body padding
            document.body.style.overflow = '';  // Reset body overflow
            // Reset other styles as needed
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount


    useEffect(() => {
        const initialLayout = window.innerWidth <= 768 ? 'row' : 'column';
        handleLayoutChange(initialLayout);
    }, []);

    const handleLayoutChange = (mode) => {
        setLayout(mode);
        const container = document.querySelector('.splitscreen-container');
        const leftDiv = document.getElementById('splitscreen-1');
        const rightDiv = document.getElementById('splitscreen-2');

        {/* idk why but column and row are inverted. */ }
        if (mode === "column") {
            container.classList.remove('column-layout');
            container.classList.add('row-layout');
            leftDiv.classList.remove('column-layout');
            leftDiv.classList.add('row-layout');
            rightDiv.classList.remove('column-layout');
            rightDiv.classList.add('row-layout');
        } else if (mode === "row") {
            container.classList.remove('row-layout');
            container.classList.add('column-layout');
            leftDiv.classList.remove('row-layout');
            leftDiv.classList.add('column-layout');
            rightDiv.classList.remove('row-layout');
            rightDiv.classList.add('column-layout');
        };
    };

    return (
        <>
            <div className="split-screen-wrapper">
                <div className="splitscreen-container">
                    <div id="splitscreen-1">
                        <ScriptureBroswer />
                    </div>
                    <div id='splitscreen-2'>
                        <ScriptureBroswer />
                    </div>
                </div>
                <SplitScreenFABs onToggle={handleLayoutChange} /> {/* home button, row layout, col layout*/}
            </div>
        </>
    );
}

export default SplitScreen;
