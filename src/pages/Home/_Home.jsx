import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import books from '../../../public/data/books.js';
import NavBar from "../../components/NavBar/NavBar.jsx";
import myData from "../../../public/data/_languages.js";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import GridListViewSwitcher from "../../components/GridListViewSwitcher/GridListViewSwitcher.jsx";
import DarkLightToggle from '../../components/DarkLightToggle/DarkLightToggle.jsx';
import IconButton from '../../components/IconButton/IconButton.jsx';
import { Context } from "../../main.jsx";
import SerifSansSerifToggle from '../../components/SerifSansSerifToggle/SerifSansSerifToggle.jsx';

export function Home({ splitScreen, l, setSelectedBook }) {
    const [language, setLanguage] = useContext(Context);
    const [isGridView, setIsGridView] = useState(true); // State for view mode
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSerif, setIsSerif] = useState(false); // State for font style

    if (!splitScreen) {
        DocumentTitle(myData[language]["bookOfMormon"]);
    }

    const handleViewChange = (isGrid) => {
        setIsGridView(isGrid); // Update view mode state
    };

    const handleLightDarkModeToggle = (mode) => {
        setIsDarkMode(mode);
        if (mode) {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    };

    const handleFontToggle = (isSerif) => {
        setIsSerif(isSerif);
        if (isSerif) {
            document.body.classList.add('serif-font');
            document.body.classList.remove('sans-serif-font');
        } else {
            document.body.classList.add('sans-serif-font');
            document.body.classList.remove('serif-font');
        }
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
                    <DarkLightToggle onToggle={handleLightDarkModeToggle} />
                    <SerifSansSerifToggle onToggle={handleFontToggle} />
                    <IconButton to="/home" icon="fas fa-home" />
                    <IconButton to="/settings" icon="fas fa-cog" />
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
