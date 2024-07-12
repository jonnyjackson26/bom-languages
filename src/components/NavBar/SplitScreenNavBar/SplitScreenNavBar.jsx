import React, { useState, useContext } from 'react';
import './SplitScreenNavBar.css';
import SplitScreenPath from '../SplitScreenPath/SplitScreenPath.jsx';
import books from '../../../../public/data/books.js';
import myData from "../../../../public/data/_languages.js";
import { Context } from "../../../main.jsx";

const SplitScreenNavBar = ({ book, chapter }) => {
    const [language, setLanguage] = useContext(Context);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    return (
        <nav className="splitscreen-navbar">
            <SplitScreenPath book={book} chapter={chapter} />

            <select
                id="splitscreen-languageSelect"
                onChange={(e) => handleLanguageChange(e.target.value)}
                value={language}
            >
                {Object.keys(myData).map((langKey) => (
                    <option key={langKey} value={langKey}>
                        {language === langKey ? `🌐` : `${myData[langKey][langKey]} / ${myData[language][langKey]}`}
                    </option>
                ))}
            </select>

        </nav>
    );
};

export default SplitScreenNavBar;
