import "./ScriptureBrowser.css"
import React, { useContext, useState } from 'react';
import { Context } from "../../main.jsx";
import SplitScreenNavBar from "../NavBar/SplitScreenNavBar/SplitScreenNavBar.jsx";
import { ChapterPage } from '../../pages/ChapterPage/ChapterPage.jsx';
import { BookPage } from '../../pages/BookPage/BookPage.jsx';
import Home from "../../pages/Home/_Home.jsx";

const ScriptureBrowser = () => {
    const [language, setLanguage] = useContext(Context);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [selectedL, setSelectedL] = useState(language);

    return (
        <>
            <SplitScreenNavBar l={selectedL} book={selectedBook} chapter={selectedChapter} setSelectedChapter={setSelectedChapter} setSelectedBook={setSelectedBook} setSelectedL={setSelectedL} />
            {selectedBook ? (
                selectedChapter ? (
                    <ChapterPage book={selectedBook} chapter={selectedChapter} splitScreen={true} setSelectedChapter={setSelectedChapter} setSelectedBook={setSelectedBook} l={selectedL} />
                ) : (
                    <BookPage book={selectedBook}
                        splitScreen={true}
                        setSelectedChapter={setSelectedChapter}
                        l={selectedL}
                    />
                )
            ) : (
                <Home
                    l={selectedL}
                    splitScreen={true}
                    setSelectedBook={setSelectedBook}
                />
            )}
        </>
    );
};

export default ScriptureBrowser;
