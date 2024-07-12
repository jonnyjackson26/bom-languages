import { Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import myData from '../../../../public/data/_languages'
import './SplitScreenPath.css';

import { Context } from "../../../main"; //can make custom hook

const SplitScreenPath = ({ book, chapter }) => {
    const [language, setLanguage] = useContext(Context);
    return (
        <>
            <div id="path-container">
                <Link to="/" className="link">
                    {myData[language]["bookOfMormon"]}
                </Link>
                {/* Render book.bookName link only if book is defined */}
                {book && <Link to={`/${book.urlName}`} className="link">
                    {myData[language][book.urlName]}
                </Link>}
                {/* Render chapter link only if both book and chapter are defined */}
                {book && chapter && <Link to={`/${book.urlName}/${chapter}`} className="link">
                    {myData[language]["chapter"]} {chapter}
                </Link>}
            </div>
        </>
    )
}
export default SplitScreenPath;