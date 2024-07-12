import { Link } from "react-router-dom"
import './BookPage.css'
import NavBar from "../../components/NavBar/NavBar.jsx";
import React, { useState, useEffect, useContext } from 'react';
import DocumentTitle from "../../components/DocumentTitle.jsx";

import myData, { theBookOfBOOKNAME } from "../../../public/data/_languages.js"

import { Context } from "../../main.jsx";

export function BookPage({ book, splitScreen, l, setSelectedChapter }) {
    const [language, setLanguage] = useContext(Context);

    if (!splitScreen) {
        DocumentTitle(myData[language][book.urlName]);
    }

    const chapterLinks = [];
    for (let i = 1; i <= book.numOfChapters; i++) {
        chapterLinks.push(
            <Link
                key={i}
                to={splitScreen ? '#' : `${i}`}
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

            {chapterLinks}
        </>
    );
}