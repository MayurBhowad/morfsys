import React, { Component } from 'react'
import Img from "./images/img1.jpg";
import "./styles.scss";

export class App extends Component {
    render() {
        return (
            <div>
                <p>Hello World</p>
                <img src={Img} />
            </div>
        )
    }
}

export default App
