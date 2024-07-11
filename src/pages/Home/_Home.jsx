import { Link } from "react-router-dom"
import './Home.css';
import React, { useState, useEffect, useContext } from 'react';
import books from '../../../public/data/books.js';
import NavBar from "../../components/NavBar/NavBar.jsx";
import myData from "../../../public/data/_languages.js"
import DocumentTitle from "../../components/DocumentTitle.jsx";

import { Context } from "../../main.jsx"; //can make custom hook


export function Home() {
    const [language, setLanguage] = useContext(Context);

    DocumentTitle(myData[language]["bookOfMormon"]);

    return (
        <>
            <NavBar book={undefined} chapter={undefined} />
            <h1 className="title">
                {myData[language]["book-of-mormon"]} {/*The Book of Mormon: Another Testament of Jesus Christ*/}
            </h1>

            <div className="book-container">
                {books.map((book) => (
                    <Link className="book" key={book.urlName} to={`/${book.urlName}`}>
                        {myData[language][book.urlName]} {/* Worte von Mormon or Words of Mormon */}
                    </Link>
                ))}
            </div>
        </>
    )
}


/*
TODO:
 - put nav bar on bottom for mobile
 - fix language dropdown

 long term:
 - sell books
 - add quotes in a json file
*/