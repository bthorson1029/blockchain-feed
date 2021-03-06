import React, { Component } from 'react';
import './App.css';
import CardRow from './components/CardRow';
import Header from './components/Header';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="container-fluid p-0">
          <Header />
          <CardRow />
        </div>
      </div>
    );
  }
}

export default App;
