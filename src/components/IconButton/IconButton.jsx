import React from 'react';
import { Link } from 'react-router-dom';
import './IconButton.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

const IconButton = ({ to, icon }) => {
    return (
        <Link to={to} className="icon-button">
            <i className={icon}></i>
        </Link>
    );
};

export default IconButton;
