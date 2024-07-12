import { Link } from "react-router-dom"
import './BookPage.css'
import NavBar from "../../components/NavBar/NavBar.jsx";
import React, { useState, useEffect, useContext } from 'react';
import DocumentTitle from "../../components/DocumentTitle.jsx";

import myData, { theBookOfBOOKNAME } from "../../../public/data/_languages.js"

import { Context } from "../../main.jsx";

export function BookPage({ book, splitScreen, setSelectedChapter }) {
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
                {myData[language]["chapter"]} {i}
            </Link> // Chapter 6 or Capitulo 6
        );
    }

    return (
        <>
            {!splitScreen && (
                <NavBar book={book} chapter={undefined} />
            )}

            <h1 className="title">
                {theBookOfBOOKNAME(language, book.bookName)} {/* The Book of Jacob, or El Libro de Jacob etc */}
            </h1>

            {chapterLinks}
        </>
    );
}