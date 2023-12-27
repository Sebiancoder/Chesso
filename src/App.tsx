import React, { useState, useEffect } from 'react';
import './App.css';
import logoImg from './resources/images/logo.png'
import StockfishWrapper from "./stockfish_wrapper"

const App = () => {

  const [stockfish_engine, set_stockfish_engine] = useState<StockfishWrapper>();

  const [pageLoaded, setPageLoaded] = useState<Boolean>(false);
  
  useEffect(() => {

    if (!pageLoaded) {

      set_stockfish_engine(new StockfishWrapper())

      setPageLoaded(true)

    }

  }, []);

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
