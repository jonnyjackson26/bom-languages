import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Person.css"


export function Person({ character, relation }) {
    return (
        <>
            <div className={`person ${relation}`}> {/*should i add a key to this? */}
                <Link key={`${character.id}`} to={`/characters/${character.id}`}>{character.name}</Link>
            </div>
        </>
    );
}