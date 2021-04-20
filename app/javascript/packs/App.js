import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import HomeIndex from "./Pages/Home/HomeIndex";
import CreateLyricIndex from "./Pages/CreateLyric/CreateLyricIndex";
import EditIndex from "./Pages/edit/EditIndex";
import './app.css';

export default class App extends Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomeIndex} />
                    <Route path="/create" exact component={CreateLyricIndex} />
                    <Route path="/edit" exact component={EditIndex} />
                </Switch>
            </Router>
        );
    }
}