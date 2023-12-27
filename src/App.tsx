import React, { useState, useEffect } from 'react';
import './App.css';
import logoImg from './resources/images/logo.png'
import StockfishWrapper from "./stockfish_wrapper"

const App = () => {

  const [bestMove, setBestMove] = useState<string>("")
  const [boardPosition, setBoardPosition] = useState<string>("")
  
  const [stockfish_engine, set_stockfish_engine] = useState<StockfishWrapper>(new StockfishWrapper(setBestMove));

  // instantiate stockfish engine
  useEffect(() => {

    stockfish_engine.init_sf()

    return function quit_sf() {

      stockfish_engine.sf_initialized = true

    }

  }, [])

  return (
    <div className="App">
      <div id="title">
        <img className='logoImg' src={logoImg}/>
        <h1>Chesso</h1>
      </div>
      <div id="main">
        <div id="chessboard_div">

        </div>
        <div id="feedback_div">

        </div>
      </div>
    </div>
  );
}

export default App;
