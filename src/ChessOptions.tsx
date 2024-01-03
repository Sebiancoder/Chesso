import './ChessOptions.css';
import './App.css'
import EvalBar from './EvalBar';
import React, { useEffect, useState} from "react";
const ChessOptions = (props: any) => {

    return (
        <div id="chessOptions">
            <button id="btn1" onClick={props.onToggleEvalBar}>{props.isVisible ? 'Hide Eval Bar' : 'Show Eval Bar'}</button>
            <button id="btn2" onClick={props.reset}>Reset Game</button>
            <button id="undo" onClick={props.undo}>Undo Last Move</button>
        </div>
    )

}

export default ChessOptions