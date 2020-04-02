import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function Nav(){
    return(
        <nav>
            <ul className="nav-link-container">
                <Link to="/" className="nav-link"><i className="fas fa-globe-americas"></i><br/>Countries</Link>
                <Link to="/map" className="nav-link"><i className="fas fa-map-marked-alt"></i><br/>Map</Link>
                <a href="/stats" className="nav-link"><i className="fas fa-chart-line"></i><br/>Statistics</a>
                <a href="/dua" className="nav-link"><i className="fas fa-mosque"></i><br/>Dua</a>
                <a href="/about" className="nav-link"><i className="far fa-user"></i><br/>About</a>
            </ul>
        </nav>
    );
}

export default Nav;