import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SplitScreen.css';
import NavBar from "../../components/NavBar/NavBar.jsx";
import SplitScreenLayoutToggle from '../../components/SplitScreenLayoutToggle/SplitScreenLayoutToggle.jsx';
import ScriptureBroswer from '../../components/ScriptueBrowser/ScriptureBrowser.jsx';

export function SplitScreen() {
    const [layout, setLayout] = useState("column");

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
            container.classList.remove('column-layout', 'inline-layout');
            container.classList.add('row-layout');
            leftDiv.classList.remove('column-layout', 'inline-layout');
            leftDiv.classList.add('row-layout');
            rightDiv.classList.remove('column-layout', 'inline-layout');
            rightDiv.classList.add('row-layout');
        } else if (mode === "row") {
            container.classList.remove('row-layout', 'inline-layout');
            container.classList.add('column-layout');
            leftDiv.classList.remove('row-layout', 'inline-layout');
            leftDiv.classList.add('column-layout');
            rightDiv.classList.remove('row-layout', 'inline-layout');
            rightDiv.classList.add('column-layout');
        } else if (mode === "inline") {
            container.classList.remove('row-layout', 'column-layout');
            container.classList.add('inline-layout');
            leftDiv.classList.remove('row-layout', 'column-layout');
            leftDiv.classList.add('inline-layout');
            rightDiv.classList.remove('row-layout', 'column-layout');
            rightDiv.classList.add('inline-layout');
        }
    };

    return (
        <>
            <div className="split-screen-wrapper">
                <NavBar book={undefined} chapter={undefined} />
                <SplitScreenLayoutToggle onToggle={handleLayoutChange} />
                <div className="splitscreen-container">
                    <div id="splitscreen-1">
                        <ScriptureBroswer />
                    </div>
                    <div id='splitscreen-2'>
                        <ScriptureBroswer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default SplitScreen;
