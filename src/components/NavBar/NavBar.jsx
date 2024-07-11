import React, { useState, useEffect, useContext } from 'react';
import './NavBar.css'
import Path from '../Path/Path.jsx';
import books from '../../../public/data/books.js';
import myData from "../../../public/data/_languages.js"

import { Context } from "../../main.jsx";

const NavBar = ({ book, chapter }) => {
    const [language, setLanguage] = useContext(Context);

    const handleLanguageChange = async (lang) => {
        setLanguage(lang);
    }

    return (
        <nav className="navbar">

            <Path book={book} chapter={chapter} />


            {/*<img src="public/language.png" alt="languages" className='icon'></img>*/}
            <select id="languageSelect" onChange={(e) => handleLanguageChange(e.target.value)} value={language}>
                <option value="english">🌐</option>
                {Object.keys(myData).map((langKey) => (
                    <option key={langKey} value={langKey}>
                        {myData[langKey][langKey]} / {myData[language][langKey]}
                    </option>
                ))}
            </select>

        </nav >
    );
};

export default NavBar;
