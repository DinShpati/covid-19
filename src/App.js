import React from "react";
import "./style.css";
import Nav from './components/nav';
import Finder from './components/Finder';
import Map from './components/Map';
import Stats from './components/Stats';
import Dua from './components/Dua';
import About from './components/About';
import {BrowserRouter as Router, Switch, Route, HashRouter} from 'react-router-dom';


export default class App extends React.Component {

    render(){
        return (
            <HashRouter>
                <div className="container">
                    <Nav />
                    
                    <Switch>
                        <Route path="/" exact component={Finder}/>
                        <Route path="/map" component={Map}/>
                        <Route path="/stats" component={Stats}/>
                        <Route path="/dua" component={Dua}/>
                        <Route path="/about" component={About}/>
                    </Switch>
                </div>
        </HashRouter>
        );
    }
}