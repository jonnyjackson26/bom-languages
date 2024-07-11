import { Link } from "react-router-dom"
import NavBar from "../components/NavBar/NavBar.jsx";
import React, { useState, useEffect, useContext } from 'react';
import DocumentTitle from "../components/DocumentTitle.jsx";

import myData, { theBookOfBOOKNAME } from "../../public/data/_languages.js"

import { Context } from "../main";

export function BookPage({ book }) {
    const [language, setLanguage] = useContext(Context);

    DocumentTitle(myData[language][book.urlName]);

    const chapterLinks = [];
    for (let i = 1; i <= book.numOfChapters; i++) {
        chapterLinks.push(
            <Link key={i} to={`${i}`}>{myData[language]["chapter"]} {i}</Link> // Chapter 6 or Capitulo 6
        );
    }

    return (
        <>
            <NavBar book={book} chapter={undefined} />
            <h1>
                {theBookOfBOOKNAME(language, book.bookName)} {/* The Book of Jacob, or El Libro de Jacob etc */}
            </h1>

            {chapterLinks}
        </>
    );
}