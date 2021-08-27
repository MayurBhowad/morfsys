import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './components/auth/Login.component';
import Signup from './components/auth/Signup.component';
import Home from './components/Home.component';
import Img from "./images/img1.jpg";
import "./styles.scss";

export class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Route exact path="/"><Redirect to="/login" /></Route>
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/home" component={Home} />
                </Router>
            </div>
        )
    }
}

export default App
