import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import books from '../../../public/data/books.js';
import NavBar from "../../components/NavBar/NavBar.jsx";
import myData from "../../../public/data/_languages.js";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import IconButton from '../../components/IconButton/IconButton.jsx';
import { LanguageContext, ThemeContext } from "../../main.jsx";

export function Home({ splitScreen, l, setSelectedBook }) {
    const { language, setLanguage } = useContext(LanguageContext);
    const { theme, setTheme } = useContext(ThemeContext);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');
    }, [theme]);

    if (!splitScreen) {
        DocumentTitle(myData[language]["bookOfMormon"]);
    }


    return (
        <>
            {!splitScreen && (
                <NavBar book={undefined} chapter={undefined} />
            )}

            <h1 className="title">
                {splitScreen ? myData[l]["book-of-mormon"] : myData[language]["book-of-mormon"]}
            </h1>

            {!splitScreen && (
                <>
                    <IconButton to="/split-screen" icon="fa-solid fa-language" />
                </>
            )}

            <div className="book-container-grid">
                {books.map((book) => (
                    <Link
                        className={"book-grid"}
                        key={book.urlName}
                        to={splitScreen ? '#' : `/${book.urlName}`}
                        onClick={(e) => {
                            if (splitScreen) {
                                e.preventDefault(); // Prevent default link behavior
                                setSelectedBook(book); // Update the selected book
                            }
                        }}
                    >
                        {splitScreen ? myData[l][book.urlName] : myData[language][book.urlName]}
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Home;
