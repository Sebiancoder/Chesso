import React, { useState, useEffect } from 'react';
import './App.css';
import logoImg from './resources/images/logo.png'
import { startFEN } from "./constants"
import ValidatedChessboard from './ValidatedChessboard';
import ChessOptions from './ChessOptions';
import ChessHeader from './ChessHeader';
import Feedback from './Feedback';
import StockfishWrapper from "./stockfish_wrapper"
import { Chess } from 'chess.js';
import EvalBar from './EvalBar';

const App = () => {

  //chess game state
  const [gameState, setGameState] = useState<Chess>(new Chess());
  const [bestMove, setBestMove] = useState<string>("")
  const [currEvalScore, setCurrEvalScore] = useState<number>(0)
  const [lastWhiteScore, setLastWhiteScore] = useState<number>(0)
  const [lastBlackScore, setLastBlackScore] = useState<number>(0)

  //this variable is here to serve as a signal that the game state has changed, boardPosition can also be accessed thru gameState
  //when position changes gameState object will not change, so this variable is necessary to trigger certain listeners
  const [boardPosition, setBoardPosition] = useState<string>(startFEN);
  
  // variables to track state of stockfish engine
  const [sfInit, setSfInit] = useState<boolean>(false);
  const [sfReady, setSfReady] = useState<boolean>(false);
  const [engineCalculating, setEngineCalculating] = useState<boolean>(false)
  
  // stockfish engine
  const [stockfish_engine, set_stockfish_engine] = useState<StockfishWrapper>();

  //page load tasks
  useEffect(() => {
    
    if (!stockfish_engine) {
      
      // instantiate stockfish engine
      set_stockfish_engine(new StockfishWrapper(
        setSfReady,
        setSfInit,
        setBestMove,
        setCurrEvalScore,
        setEngineCalculating
        ))

    }

  }, [])

  //when the stockfish wrapper, is instantiated, initialize the stockfish engine
  useEffect(() => {

    stockfish_engine?.init_sf()

  }, [stockfish_engine])

  // when stockfish is initialized, send a message to check if it is ready
  useEffect(() => {

    if(stockfish_engine && sfInit) {

      stockfish_engine.check_ready()

    }

  }, [sfInit])

  // if the ready state changed, start calculating new moves
  useEffect(() => {

    if(stockfish_engine && sfReady) {

      setEngineCalculating(true)
      stockfish_engine.start_analysis(20)

    }

  }, [sfReady])

  //listener for board position changes
  const on_board_state_change = (boardPosition: string): void => {

    setBoardPosition(boardPosition)

    // prev Eval as curr Eval
    if (gameState.turn() === "w") {

      setLastBlackScore(currEvalScore)

    } else {

      setLastWhiteScore(currEvalScore)

    }
    
    //if stockfish engine initialized, set up position in stockfish engine
    if (stockfish_engine && sfInit) {

      setSfReady(false)
      stockfish_engine.new_game()
      stockfish_engine.set_analyze_mode(true)
      stockfish_engine.set_position(boardPosition)
      stockfish_engine.check_ready()

    }

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
            <EvalBar eval={currEvalScore} turn={gameState.turn()}/>
          </div>
        </div>
        <div id="feedback_div">
          <Feedback
            game_state={gameState}
            game_state_change_signal={boardPosition}
            best_move={bestMove} 
            />
          <p>{bestMove}</p>
          <p>curr {currEvalScore}</p>
          <p>prevWhite {lastWhiteScore}</p>
          <p>prevBlack {lastBlackScore}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
