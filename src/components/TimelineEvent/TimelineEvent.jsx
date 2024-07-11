
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./TimelineEvent.css"



export function TimelineEvent({ event }) {

    return (
        <div className="timelineEventBox">
            <Link to={`/timeline/${event.id}`}>
                {event.description}
            </Link>
            <p className="date">{event.date}</p>
            <p className="reference">{event.reference}</p>
            <p className="dateReference">{event.dateReference}</p>
            <img src={event.getImagePath()} alt={event.id} />
        </div>
    );
}


/*
this.id = id;
this.description = description;
this.reference = reference;
this.date = date;
this.dateReference = dateReference;
*/