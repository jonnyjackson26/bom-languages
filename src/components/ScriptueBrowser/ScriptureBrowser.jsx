import "./ScriptureBrowser.css"
import React, { useContext, useState } from 'react';
import myData from "../../../public/data/_languages.js";
import { Context } from "../../main.jsx";
import books from '../../../public/data/books.js';
import SplitScreenNavBar from "../NavBar/SplitScreenNavBar/SplitScreenNavBar.jsx";
import { ChapterPage } from '../../pages/ChapterPage/ChapterPage.jsx';
import { BookPage } from '../../pages/BookPage/BookPage.jsx';
import Home from "../../pages/Home/_Home.jsx";

const ScriptureBrowser = () => {
    const [language, setLanguage] = useContext(Context);
    const [selectedBook, setSelectedBook] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);

    return (
        <>
            <SplitScreenNavBar book={selectedBook} chapter={selectedChapter} setSelectedChapter={setSelectedChapter} setSelectedBook={setSelectedBook} />
            {selectedBook ? (
                selectedChapter ? (
                    <ChapterPage book={selectedBook} chapter={selectedChapter} splitScreen={true} setSelectedChapter={setSelectedChapter} setSelectedBook={setSelectedBook} />
                ) : (
                    <BookPage book={selectedBook}
                        splitScreen={true}
                        setSelectedChapter={setSelectedChapter}
                    />
                )
            ) : (
                <Home
                    splitScreen={true}
                    books={books}
                    isGridView={true} // or false based on your state
                    language={language}
                    myData={myData}
                    setSelectedBook={setSelectedBook}
                />
            )}
        </>
    );
};

export default ScriptureBrowser;
