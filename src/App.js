import React, { Component } from 'react';
import './App.css';
import CardRow from './components/CardRow';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row">
          <CardRow />
        </div>
      </div>
    );
  }
}

export default App;
