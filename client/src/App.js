import React, { Component } from 'react';
import { Button } from 'primereact/button';
import logo from './logo.svg';
import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Login from './views/Auth/Login/Login';
import 'primeflex/primeflex.css';
import HeaderBar from './components/HeaderBar';
import 'antd/dist/antd.css';
import './index.css';
class App extends Component {

  render() {
    return (
      <>
        <HeaderBar></HeaderBar>
      </>
    );
  }
}


export default App;