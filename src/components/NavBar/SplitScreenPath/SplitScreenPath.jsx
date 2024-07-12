import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import myData from '../../../../public/data/_languages'
import './SplitScreenPath.css';

import { Context } from "../../../main"; //can make custom hook

const SplitScreenPath = ({ l, book, chapter, setSelectedBook, setSelectedChapter }) => {

    return (
        <>
            <div id="path-container">
                <Link onClick={(e) => {
                    e.preventDefault();
                    setSelectedBook(null);
                    setSelectedChapter(null);
                }}
                    className="link">
                    {myData[l]["bookOfMormon"]}
                </Link>
                {/* Render book.bookName link only if book is defined */}
                {book && <Link onClick={(e) => {
                    e.preventDefault();
                    setSelectedBook(book);
                    setSelectedChapter(null);
                }}
                    className="link">
                    {myData[l][book.urlName]}
                </Link>}
                {/* Render chapter link only if both book and chapter are defined */}
                {book && chapter && <Link onClick={(e) => {
                    e.preventDefault();
                    setSelectedChapter(chapter);
                }}
                    className="link">
                    {myData[l]["chapter"]} {chapter}
                </Link>}
            </div>
        </>
    )
}
export default SplitScreenPath;