import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import NextButton from '../../components/NextButton/NextButton.jsx'
import DocumentTitle from "../../components/DocumentTitle.jsx";
import { theBookOfBOOKNAMEchapterX } from "../../../public/data/_languages.js"
import { getNextButtonInfo, getPrevButtonInfo } from "../../utils/next-and-prev-button-info.js"
import { Context } from "../../main.jsx";
import myData from "../../../public/data/_languages.js"
import books from "../../../public/data/books.js"
import "../ChapterPage/ChapterPage.css"


export function ChapterPage({ book, chapter }) {
    const [verses, setVerses] = useState([]);
    const [language, setLanguage] = useContext(Context);

    DocumentTitle(myData[language][book.urlName] + " " + chapter);

    useEffect(() => {
        const fetchVerses = async () => {
            try {
                let path = `data/bom/bom-${language}/${book.urlName}/${chapter}.txt`;
                const response = await fetch(path);
                const text = await response.text();
                const lines = text.split('\n').slice(0, -1); //I slice because the text files have an empty \n at the end
                setVerses(lines.map((line, index) => <p className="verse-class" key={index}>
                    <span className="verse-number-class" >{index + 1} </span>
                    {line}
                </p>));

            } catch (error) {
                console.error('Error fetching verses:', error);
            }
        };
        fetchVerses();
    }, [book.urlName, chapter, language]);



    return (
        <>
            <NavBar book={book} chapter={chapter} />
            <h1 className="title">
                {theBookOfBOOKNAMEchapterX(language, myData[language][book.urlName], chapter)}
            </h1>

            <div className="nextButton-container">
                <NextButton info={getPrevButtonInfo(book, chapter)} />
                <NextButton info={getNextButtonInfo(book, chapter)} />
            </div>

            {verses}
        </>
    );
}