import './ChessOptions.css';
import EvalBar from './EvalBar';
import React, { useEffect, useState} from "react";
const ChessOptions = (props: any) => {
    // const [isVisible, setIsVisible] = useState<boolean>(true);
    // const toggleVisibility = () => {
    //     setIsVisible(!isVisible);
    //   };
    return (
        <div id="chessOptions">
            <button id="btn" onClick={props.onToggleEvalBar}>{props.isVisible ? 'Hide Eval Bar' : 'Show Eval Bar'}</button>
        </div>
    )

}

export default ChessOptions