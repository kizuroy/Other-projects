import React from 'react';
import './App.css'; // You can import your global app styles here if needed
import Timer from './Timer/Timer'; // Import the Timer component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Study Timer App</h1>
        <button>Login</button>
      </header>
      <Timer /> {/* Add the Timer component here */}
    </div>
    );
}

export default App;
