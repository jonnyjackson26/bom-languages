import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar.jsx';
import DocumentTitle from "../../components/DocumentTitle.jsx";
import { Context } from "../../main.jsx";
import "../TimelineEventPage/TimelineEventPage.css"


export function TimelineEventPage({ timelineEvent }) {
    DocumentTitle(timelineEvent.description);

    return (
        <>
            <NavBar book={null} chapter={null} />
            <div className='timelineEvent-container'>
                <h1>description: {timelineEvent.description}</h1>
                <p>id: {timelineEvent.id}</p>
                <p>reference: {timelineEvent.reference}</p>
                <p>date: {timelineEvent.date}</p>
                <p>dateReference: {timelineEvent.dateReference}</p>
            </div>
        </>
    );
}
