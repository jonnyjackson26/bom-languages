import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar.jsx';
import DocumentTitle from "../components/DocumentTitle.jsx";
import timelineEvents from '../../public/data/timeline/timelineEvents.js';
import { TimelineEvent } from "../components/TimelineEvent/TimelineEvent.jsx"
import "../pages/TimelinePage.css"

export function TimelinePage() {
    DocumentTitle("Timeline from Book of Mormon");
    return (
        <>
            <NavBar book={null} chapter={null} />

            <h1>Book of Mormon Timeline</h1>

            <div className="timeline">
                <div className="line"></div>
                <div className="events-container">
                    {timelineEvents.map((event, index) => (
                        < TimelineEvent key={event.id} event={event} index={index} />
                    ))}
                </div>
            </div>
        </>

    );
}
