import React from 'react';
import './App.css';
import Header from './Header';
import Timer from "./Timer/Timer";
import Notes from './Notes'

function App() {
  return (
    <div className="App">
      <Header />
      <Timer></Timer>
      <Notes></Notes>
    </div>
    );
}

export default App;
