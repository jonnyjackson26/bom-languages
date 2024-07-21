import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import books from '../../../public/data/books.js';
import NavBar from "../../components/NavBar/NavBar.jsx";
import myData from "../../../public/data/_languages.js";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import GridListViewSwitcher from "../../components/GridListViewSwitcher/GridListViewSwitcher.jsx";
import IconButton from '../../components/IconButton/IconButton.jsx';
import { LanguageContext, ThemeContext } from "../../main.jsx";

export function Home({ splitScreen, l, setSelectedBook }) {
    const { language, setLanguage } = useContext(LanguageContext);
    const { theme, setTheme } = useContext(ThemeContext);
    const [isGridView, setIsGridView] = useState(true); // State for view mode

    useEffect(() => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');
    }, [theme]);

    if (!splitScreen) {
        DocumentTitle(myData[language]["bookOfMormon"]);
    }

    const handleViewChange = (isGrid) => {
        setIsGridView(isGrid); // Update view mode state
    };


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
                    <GridListViewSwitcher onViewChange={handleViewChange} />
                    <IconButton to="/split-screen" icon="fa-solid fa-language" />
                </>
            )}

            <div className={isGridView ? "book-container-grid" : "book-container-list"}>
                {books.map((book) => (
                    <Link
                        className={isGridView ? "book-grid" : "book-list"}
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
