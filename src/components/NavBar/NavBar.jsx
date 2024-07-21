import React, { useState, useContext } from 'react';
import './NavBar.css';
import Path from './Path/Path.jsx'
import books from '../../../public/data/books.js';
import myData from "../../../public/data/_languages.js";
import { LanguageContext, ThemeContext } from "../../main.jsx";
import CustomDropdown from '../CustomDropdown/CustomDropdown.jsx';

const NavBar = ({ book, chapter }) => {
    const { language, setLanguage } = useContext(LanguageContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
    };

    const handleToggle = (name, checked) => {
        console.log(`${name} is ${checked ? 'checked' : 'unchecked'}`);
    };

    return (
        <nav className="navbar">
            <CustomDropdown onToggle={handleToggle} />
            <Path book={book} chapter={chapter} />



            <select
                id="languageSelect"
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

export default NavBar;
