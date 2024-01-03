import React, { useEffect, useState} from "react";
import './ChessHeader.css'
import './App.css'
const ChessHeader = (props: any) => {

    const [currTurn, setCurrTurn] = useState<string>("");

    useEffect(() => {

        setCurrTurn(props.game_state.turn())

    }, [props])
    
    return (
        <div id="chessHeader">
            {
                props.game_state.isGameOver() ?
                props.game_state.isCheckmate() ?
                currTurn == 'w' ?
                <p id="black" className="headerFill"> Black Wins By Checkmate! </p> : <p id="white" className="headerFill"> White Wins By Checkmate! </p>
                : props.game_state.isThreefoldRepetition() ?
                <p id="gray" className="headerFill"> Game Drawn By Threefold Repetition </p> :
                props.game_state.isStalemate() ?
                <p id="gray" className="headerFill"> Game Drawn By Stalemate </p> :
                props.game_state.isInsufficientMaterial() ?
                <p id="gray" className="headerFill"> Game Drawn By Insufficient Material </p> :
                props.game_state.isDraw() ? <p id="gray" className="headerFill"> Game Drawn By 50-move Rule </p> :
                <p id="gray" className="headerFill"> Game Over </p> : 
                currTurn == 'w' ? <p id="white" className="headerFill"> White to Move </p>: 
                <p id="black" className="headerFill"> Black to Move </p>
            }
        </div>
    )

}

export default ChessHeader;