import React, { useState, useEffect } from 'react';
import './App.css';
import logoImg from './resources/images/logo.png'
import ValidatedChessboard from './ValidatedChessboard';
import ChessOptions from './ChessOptions';
import ChessHeader from './ChessHeader';
import Feedback from './Feedback';
import StockfishWrapper from "./stockfish_wrapper"
import { Chess } from 'chess.js';

const App = () => {

  const [bestMove, setBestMove] = useState<string>("")
  const [gameState, setGameState] = useState<Chess>(new Chess());
  
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
        <h1 id="titleText">Chesso</h1>
      </div>
      <div id="main">
        <div id="chessboard_div">
          <ChessHeader game_state={gameState}/>
          <div id="chessboardMain">
            <ChessOptions/>
            <ValidatedChessboard game_state={gameState}/>
          </div>
        </div>
        <div id="feedback_div">
          <Feedback
            game_state={gameState} 
            />
        </div>
      </div>
    </div>
  );
}

export default App;
