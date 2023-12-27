import React from 'react';
import logo from './logo.svg';
import './App.css';
import logoImg from './resources/images/logo.png'
import Chessboard from 'chessboardjsx';
import WithMoveValidation from './WithMoveValidation';

function App() {
  return (
    <div className="App">
      <div id="title">
        <img className='logoImg' src={logoImg}/>
        <h1>Chesso</h1>
      </div>
      <div id="main">
        <div id="chessboard_div">
        <WithMoveValidation />
        </div>
        <div id="feedback_div">

        </div>
      </div>
    </div>
  );
}

export default App;
