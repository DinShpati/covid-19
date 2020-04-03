import React from 'react';
import '../style.css';

export default class About extends React.Component {


    render(){
        return(
            <div className="container">
                <h1 className="mainHeader"><img src="https://p3cdn4static.sharpschool.com/UserFiles/Servers/Server_1051846/Image/News/coronavirus.png" alt="." style={{maxWidth: '50px'}}/>About:</h1>
                <div className="container4" align='left'>
                    <br/>
                    <br/>
                    <h2 className="headerAbout">This is a covid-19 application that provides free opensource information regarding covid-19. The covid-19 data in this application is sourced from The Center for Systems Science and Engineering at John Hopkins University which is accessed through a Application Programming Interface (API) provided by @mathdroid.</h2>
                    <br/>
                    <h2 className="headerAbout">Built with: HTML, CSS, Javascript, ReactJS, MapBox, and Postman</h2>
                    <br/>
                    <h2 className="headerAbout">Built by: Din Spataj</h2>
                    <h2 className="headerAbout">www.dinshpati.com</h2>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }

}