import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import books from '../../../public/data/books.js';
import NavBar from "../../components/NavBar/NavBar.jsx";
import myData from "../../../public/data/_languages.js";
import DocumentTitle from "../../components/DocumentTitle.jsx";
import GridListViewSwitcher from "../../components/GridListViewSwitcher/GridListViewSwitcher.jsx";

import { Context } from "../../main.jsx";

export function Home() {
    const [language, setLanguage] = useContext(Context);
    const [isGridView, setIsGridView] = useState(true); // State for view mode

    DocumentTitle(myData[language]["bookOfMormon"]);

    const handleViewChange = (isGrid) => {
        setIsGridView(isGrid); // Update view mode state
    };

    return (
        <>
            <NavBar book={undefined} chapter={undefined} />
            <h1 className="title">
                {myData[language]["book-of-mormon"]} {/*The Book of Mormon: Another Testament of Jesus Christ*/}
            </h1>

            <GridListViewSwitcher onViewChange={handleViewChange} />

            <div className={isGridView ? "book-container-grid" : "book-container-list"}>
                {books.map((book) => (
                    <Link className={isGridView ? "book-grid" : "book-list"} key={book.urlName} to={`/${book.urlName}`}>
                        {myData[language][book.urlName]}
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Home;
