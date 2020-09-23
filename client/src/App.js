import React, { Component } from 'react';
import {Button} from 'primereact/button';
import logo from './logo.svg';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Login from './views/Auth/Login/Login';
import 'primeflex/primeflex.css';

class App extends Component {

    render() {
        return (
          <div className="App">
            <Login></Login>
          </div>
        );
    }
}


export default App;