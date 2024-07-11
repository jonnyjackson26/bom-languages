import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import NextButton from '../../components/NextButton/NextButton.jsx'
import DocumentTitle from "../../components/DocumentTitle.jsx";
import { theBookOfBOOKNAMEchapterX } from "../../../public/data/_languages.js"
import { getNextButtonInfo, getPrevButtonInfo } from "../../utils/next-and-prev-button-info.js"
import { substringForWords } from "../../utils/substringForWords.js"
import { Context } from "../../main.jsx";
import myData from "../../../public/data/_languages.js"
import books from "../../../public/data/books.js"
import "../ChapterPage/ChapterPage.css"

import dialogue from "../../../public/data/dialouge.js"


export function ChapterPage({ book, chapter }) {
    const [verses, setVerses] = useState([]);
    const [language, setLanguage] = useContext(Context);
    const [showDialogue, setShowDialogue] = useState(false); //make this like a context thing or whatever like langauge is, so that when u have it on and then go to another page its still on

    DocumentTitle(myData[language][book.urlName] + " " + chapter);

    useEffect(() => {
        const fetchVerses = async () => {
            try {
                let path = `data/bom/bom-${language}/${book.urlName}/${chapter}.txt`;
                const response = await fetch(path);
                const text = await response.text();
                const lines = text.split('\n').slice(0, -1); //I slice because the text files have an empty \n at the end
                //setVerses(lines.map((line, index) => <p key={index}> {index + 1} {line}</p>));
                if (!showDialogue) {
                    setVerses(lines.map((line, index) => <p key={index}> {index + 1} {line}</p>));
                }

                //dialouge
                if (showDialogue) {
                    const dialoguesForChapter = dialogue.filter(dialogue => dialogue.bookIndex === books.findIndex(item => item.urlName === book.urlName) && dialogue.chapterIndex === chapter);
                    const modifiedVerses = lines.map((line, index) => {
                        const verseNumber = index + 1;
                        const dialoguesForVerse = dialoguesForChapter.filter(dialogue =>
                            dialogue.startVerse <= verseNumber && dialogue.endVerse >= verseNumber
                        ); //all the dialouges that have at least a portion in the verse

                        if (dialoguesForVerse.length >= 1) { //if there is at least a part of a dialouge in the verse
                            let dialogueForVerse = dialoguesForVerse[0];
                            if (dialoguesForVerse.length == 2) { //if theres two dialouges to a single verse //assumes there is always either 0, 1, or 2 dialouges to a verse but never more
                                //in dialouge array they can be in any order, since this logic determines which one actually starts first
                                let firstDialogue = dialoguesForVerse[0].startWord <= dialoguesForVerse[1].startWord ? dialoguesForVerse[0] : dialoguesForVerse[1];
                                let secondDialogue = dialoguesForVerse[0].startWord <= dialoguesForVerse[1].startWord ? dialoguesForVerse[1] : dialoguesForVerse[0];

                                // Determine the start and end word indices within the line for the multi-verse-spanning quote
                                const startWordFirstDialogue = firstDialogue.startVerse === verseNumber ? firstDialogue.startWord : 0;
                                const endWordFirstDialogue = firstDialogue.endVerse === verseNumber ? firstDialogue.endWord : line.split(' ').length;
                                const startWordSecondDialogue = secondDialogue.startVerse === verseNumber ? secondDialogue.startWord : 0;
                                const endWordSecondDialogue = secondDialogue.endVerse === verseNumber ? secondDialogue.endWord : line.split(' ').length;
                                return (
                                    <p key={index}>
                                        {/*surround verseNumber with span only if startWordIndex is 0*/}
                                        {startWordFirstDialogue === 0 ? (
                                            <span className={`dialogue ${firstDialogue.who}`}>{verseNumber}{' '}</span>
                                        ) : (
                                            verseNumber + ' '
                                        )}
                                        {substringForWords(line, 0, startWordFirstDialogue)}{' '}
                                        <span className={`dialogue ${firstDialogue.who}`}>
                                            {substringForWords(line, startWordFirstDialogue, endWordFirstDialogue)}
                                        </span>

                                        {' '}{substringForWords(line, endWordFirstDialogue, startWordSecondDialogue)}{' '}
                                        <span className={`dialogue ${secondDialogue.who}`}>
                                            {substringForWords(line, startWordSecondDialogue, endWordSecondDialogue)}
                                        </span>


                                        {' '}{substringForWords(line, endWordSecondDialogue, "end")}
                                    </p>
                                );

                            } else { //if theres only dialouge to a verse
                                // Determine the start and end word indices within the line for the multi-verse-spanning quote
                                const startWordIndex = dialogueForVerse.startVerse === verseNumber ? dialogueForVerse.startWord : 0;
                                const endWordIndex = dialogueForVerse.endVerse === verseNumber ? dialogueForVerse.endWord : line.split(' ').length;
                                return (
                                    <p key={index}>
                                        {/*surround verseNumber with span only if startWordIndex is 0*/}
                                        {startWordIndex === 0 ? (
                                            <span className={`dialogue ${dialogueForVerse.who}`}>{verseNumber}{' '}</span>
                                        ) : (
                                            verseNumber + ' '
                                        )}
                                        {substringForWords(line, 0, startWordIndex)}{' '}
                                        <span className={`dialogue ${dialogueForVerse.who}`}>
                                            {substringForWords(line, startWordIndex, endWordIndex)}
                                        </span>
                                        {' '}{substringForWords(line, endWordIndex, "end")}
                                    </p>
                                );
                            }
                        } else { //if there is no dialouge whatsoever in the verse
                            return <p key={index}>{verseNumber} {line}</p>; //just print out the verse normal
                        }
                    });
                    setVerses(modifiedVerses);
                }
            } catch (error) {
                console.error('Error fetching verses:', error);
            }
        };
        fetchVerses();
    }, [book.urlName, chapter, language, showDialogue]);



    const toggleDialogue = () => {
        setShowDialogue(prevState => !prevState); // Toggle showDialogue state
    };

    return (
        <>
            <NavBar book={book} chapter={chapter} />
            <h1>
                {theBookOfBOOKNAMEchapterX(language, myData[language][book.urlName], chapter)}
            </h1>

            <NextButton info={getPrevButtonInfo(book, chapter)} />
            <NextButton info={getNextButtonInfo(book, chapter)} />

            <button onClick={toggleDialogue}>{showDialogue ? 'Hide Dialogue' : 'Show Dialogue'}</button>

            {verses}
        </>
    );
}