import React, { Component } from 'react';
import './App.css';
import CardRow from './components/CardRow';
import Header from './components/Header';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid p-3">
          <Header />
          <CardRow />
        </div>
      </div>
    );
  }
}

export default App;
