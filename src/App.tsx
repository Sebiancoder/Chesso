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
  const [bestMove, setBestMove] = useState<string>("");
  const [currEvalScore, setCurrEvalScore] = useState<number>(0);
  const [prevEvalScore, setPrevEvalScore] = useState<number>(0);
  const [mate, setMate] = useState<number>(-1)

  //this variable is here to serve as a signal that the game state has changed, boardPosition can also be accessed thru gameState
  //when position changes gameState object will not change, so this variable is necessary to trigger certain listeners
  const [boardPosition, setBoardPosition] = useState<string>(startFEN);
  
  // variables to track state of stockfish engine
  const [sfInit, setSfInit] = useState<boolean>(false);
  const [sfReady, setSfReady] = useState<boolean>(false);
  const [engineCalculating, setEngineCalculating] = useState<boolean>(false)
  
  // stockfish engine
  const [stockfish_engine, set_stockfish_engine] = useState<StockfishWrapper>();
  //sets eval bar visibility
  const [isEvalBarVisible, setIsEvalBarVisible] = useState(true);
  //page load tasks
  useEffect(() => {
    
    if (!stockfish_engine) {
      
      // instantiate stockfish engine
      set_stockfish_engine(new StockfishWrapper(
        gameState,
        setSfReady,
        setSfInit,
        setBestMove,
        setCurrEvalScore,
        setEngineCalculating,
        setMate
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
    if (gameState.turn() === "b") {

      setPrevEvalScore(currEvalScore)

    } else {

      setPrevEvalScore(currEvalScore)

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
  const handleToggleEvalBar = (): void => {
    setIsEvalBarVisible(!isEvalBarVisible);
  }

  //reset game
  const reset_game = (): void => {
    setGameState(new Chess());
    setBestMove("");
    setCurrEvalScore(0);
    setPrevEvalScore(0);
    setBoardPosition(startFEN);
    setMate(-1);
    setSfInit(false);
    setSfReady(false);
    on_board_state_change(startFEN)
  }

  //undo last move
  const handleUndo = (): void => {
    gameState.undo();
    setBoardPosition(gameState.fen());
  }

  return (
    <div className="App">
      <div id="title">
        <img className='logoImg' src={logoImg}/>
        <h1 id="titleText">Chesso</h1>
      </div>
      <div id="main">
        <div id="chessboard_div">
          <ChessOptions undo={handleUndo} reset={reset_game} onToggleEvalBar={handleToggleEvalBar} isVisible={isEvalBarVisible}/>
          <div id="chessboardMain">
            <ChessHeader 
            game_state={gameState} 
            game_state_change_signal={boardPosition}/>
            <div id="chessAndEval">
              <ValidatedChessboard board_pos={boardPosition} set_board_pos={setBoardPosition} game_state={gameState} on_board_position_change={on_board_state_change}/>
              <EvalBar eval={currEvalScore} mate_on_board={mate} turn={gameState.turn()} mate={gameState.isCheckmate()} isVisible={isEvalBarVisible}/>
            </div>
          </div>
        </div>
        <div id="feedback_div">
          <Feedback
            game_state={gameState}
            game_state_change_signal={boardPosition}
            curr_score={currEvalScore}
            prev_score={prevEvalScore}
            engine_calc={engineCalculating}/>
        </div>
      </div>
    </div>
  );
}

export default App;
