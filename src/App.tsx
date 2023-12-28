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

  //this variable is here to serve as a signal that the game state has changed, boardPosition can also be accessed thru gameState
  //when position changes gameState object will not change, so this variable is necessary to trigger certain listeners
  const [boardPosition, setBoardPosition] = useState<string>("");
  
  const [sfInit, setSfInit] = useState<boolean>(false);
  const [sfReady, setSfReady] = useState<boolean>(false);

  const [stockfish_engine, set_stockfish_engine] = useState<StockfishWrapper>(new StockfishWrapper(
    sfReady,
    setSfReady,
    setSfInit,
    setBestMove
  ));

  // instantiate stockfish engine
  useEffect(() => {

    stockfish_engine.init_sf()

    return function quit_sf_initialization() {

      stockfish_engine.sf_initialized = true

    }

  }, [])

  // if stockfish is initialized, send a message to check if it is ready
  useEffect(() => {

    if(sfInit) {

      stockfish_engine.check_ready()

    }

  }, [sfInit])

  // if it is ready, tell it that a new game is initiated
  useEffect(() => {

    if(sfReady) {

      stockfish_engine.set_analyze_mode(true)

    }

  }, [sfReady])

  //listener for board position changes
  const on_board_state_change = (boardPosition: string): void => {

    setBoardPosition(boardPosition)

    stockfish_engine.new_game()
    stockfish_engine.start_analysis(boardPosition, 20)

  }

  //reset game
  const reset_game = (): void => {



  }

  return (
    <div className="App">
      <div id="title">
        <img className='logoImg' src={logoImg}/>
        <h1 id="titleText">Chesso</h1>
      </div>
      <div id="main">
        <div id="chessboard_div">
          <ChessHeader 
          game_state={gameState} 
          game_state_change_signal={boardPosition}/>
          <div id="chessboardMain">
            <ChessOptions on_reset={reset_game}/>
            <ValidatedChessboard game_state={gameState} on_board_position_change={on_board_state_change}/>
          </div>
        </div>
        <div id="feedback_div">
          <Feedback
            game_state={gameState}
            game_state_change_signal={boardPosition}
            best_move={bestMove} 
            />
          <p>{bestMove}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
