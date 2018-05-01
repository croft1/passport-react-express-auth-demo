import React, {Component} from 'react';
import axios from 'axios';

import {FlatButton} from 'material-ui';
import MTP from 'material-ui/styles/MuiThemeProvider';
import getmt from 'material-ui/styles/getMuiTheme';
import dark from 'material-ui/styles/baseThemes/darkBaseTheme';
import './App.css';

const githubLoginUrl = "http://localhost:3000/login/github";

class App extends Component {
    constructor(props) {
        super(props);
    }

    login(event) {
        console.log("Login clicked");
        console.log(event);
        axios.get(githubLoginUrl)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    loginXhr(e) {
        e.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.open('get', 'http://localhost:3000/login/github');
        xhr.send();
    }

    render() {
        return (
            <MTP muiTheme={getmt(dark)}>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-title">Passport React Express Auth Demo</h1>
                    </header>
                    <p className="App-intro">
                        <FlatButton
                            onClick={this.login.bind(this)}
                            label={"Login with github"}
                            primary={true}/>
                    </p>
                    <a href="https://mewc.info">Creator</a><br/>
                    <a href="https://github.com/croft1/passport-react-express-auth-demo">Repo</a>
                </div>
            </MTP>
        );
    }
}

export default App;
