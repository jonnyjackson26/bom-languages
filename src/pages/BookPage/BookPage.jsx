import { Link } from "react-router-dom"
import './BookPage.css'
import NavBar from "../../components/NavBar/NavBar.jsx";
import React, { useState, useEffect, useContext } from 'react';
import DocumentTitle from "../../components/DocumentTitle.jsx";

import myData, { theBookOfBOOKNAME } from "../../../public/data/_languages.js"

import { LanguageContext, ThemeContext } from "../../main.jsx";

export function BookPage({ book, splitScreen, l, setSelectedChapter }) {
    const { language, setLanguage } = useContext(LanguageContext);
    const { theme, setTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');
    }, [theme]);

    if (!splitScreen) {
        DocumentTitle(myData[language][book.urlName]);
    }

    const chapterLinks = [];
    for (let i = 1; i <= book.numOfChapters; i++) {
        chapterLinks.push(
            <Link
                key={i}
                to={splitScreen ? '#' : `${i}`}
                className="chapter-item"
                onClick={(e) => {
                    if (splitScreen) {
                        e.preventDefault(); // Prevent default link behavior
                        setSelectedChapter(i); // Update the selected book
                    }
                }}
            >
                {splitScreen ? `${myData[l]["chapter"]} ${i}` : `${myData[language]["chapter"]} ${i}`}
            </Link> // Chapter 6 or Capitulo 6
        );
    }

    return (
        <>
            {!splitScreen && (
                <NavBar book={book} chapter={undefined} />
            )}

            <h1 className="title">
                {splitScreen ? theBookOfBOOKNAME(l, book.bookName) : theBookOfBOOKNAME(language, book.bookName)}
            </h1>

            <div className="chapters-container">
                {chapterLinks}
            </div>

        </>
    );
}