import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function Nav(){
    return(
        <nav>
            <ul className="nav-link-container">
                <Link to="/" className="nav-link"><i className="fas fa-globe-americas"></i><br/>Countries</Link>
                <Link to="/map" className="nav-link"><i className="fas fa-map-marked-alt"></i><br/>Map</Link>
                <Link to="/stats" className="nav-link"><i className="fas fa-chart-line"></i><br/>Statistics</Link>
                <Link to="/dua" className="nav-link"><i className="fas fa-mosque"></i><br/>Dua</Link>
                <Link to="/about" className="nav-link"><i className="far fa-user"></i><br/>About</Link>
            </ul>
        </nav>
    );
}

export default Nav;