import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import DocumentTitle from "../../components/DocumentTitle.jsx";
import { Context } from "../../main.jsx";
import "../CharacterPage/CharacterPage.css"
import { FamilyTree } from "../../components/FamilyTree/FamilyTree.jsx"


export function CharacterPage({ character }) {
    DocumentTitle(character.name);

    // Function to handle null values
    const formatValue = (value) => !value ? "None" : value;

    return (
        <>
            <NavBar book={null} chapter={null} />

            <div className="character-container">
                <h1>{character.name}</h1>
                <p>Father's name: {formatValue(character.fatherName)}</p>
                <p>Mother's name: {formatValue(character.motherName)}</p>
                <p>Children IDs: {character.childrenIDs.map(formatValue).join(", ")}</p>
                <p>Spouse IDs: {character.spouseIDs.map(formatValue).join(", ")}</p>
                {/*<p>Nicknames: {character.nicknames.map(formatValue).join(", ")}</p>
                <p>Gender: {character.gender === 0 ? "Male" : "Female"}</p>
    <           p>Description: {formatValue(character.description)}</p>*/}
            </div>

            <FamilyTree character={character} />
        </>
    );
}
