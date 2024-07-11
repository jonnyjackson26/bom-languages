import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './SplitScreen.css';
import NavBar from "../../components/NavBar/NavBar.jsx";


export function SplitScreen() {


    return (
        <>
            <NavBar book={undefined} chapter={undefined} />

            <h1 className="title">split screen
            </h1>


        </>
    );
}

export default SplitScreen;
