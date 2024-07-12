import React, { useState, useContext } from 'react';
import './SplitScreenNavBar.css';
import SplitScreenPath from '../SplitScreenPath/SplitScreenPath.jsx';
import books from '../../../../public/data/books.js';
import myData from "../../../../public/data/_languages.js";
import { Context } from "../../../main.jsx";

const SplitScreenNavBar = ({ l, book, chapter, setSelectedBook, setSelectedChapter, setSelectedL }) => {

    const handleLanguageChange = (lang) => {
        setSelectedL(lang);
    };

    return (
        <nav className="splitscreen-navbar">
            <SplitScreenPath l={l} book={book} chapter={chapter} setSelectedBook={setSelectedBook} setSelectedChapter={setSelectedChapter} />

            <select
                id="splitscreen-languageSelect"
                onChange={(e) => handleLanguageChange(e.target.value)}
                value={l}
            >
                {Object.keys(myData).map((langKey) => (
                    <option key={langKey} value={langKey}>
                        {l === langKey ? `🌐` : `${myData[langKey][langKey]} / ${myData[l][langKey]}`}
                    </option>
                ))}
            </select>

        </nav>
    );
};

export default SplitScreenNavBar;
