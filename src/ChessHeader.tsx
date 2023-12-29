import React, { useEffect, useState} from "react";
import './ChessHeader.css'
const ChessHeader = (props: any) => {

    const [currTurn, setCurrTurn] = useState<string>("");

    useEffect(() => {

        setCurrTurn(props.game_state.turn())

    }, [props])
    
    return (
        <div>
            {
                //props.game_state.turn()
                props.game_state.isGameOver() ?
                props.game_state.isCheckmate() ?
                currTurn == 'w' ?
                <p id="black"> Black Wins By Checkmate! </p> : <p id="white"> White Wins By Checkmate! </p>
                : props.game_state.isThreefoldRepetition() ?
                <p id="gray"> Game Drawn By Threefold Repetition </p> :
                props.game_state.isStalemate() ?
                <p id="gray"> Game Drawn By Stalemate </p> :
                props.game_state.isInsufficientMaterial() ?
                <p id="gray"> Game Drawn By Insufficient Material </p> :
                props.game_state.isDraw() ? <p id="gray"> Game Drawn By 50-move Rule </p> :
                <p id="gray"> Game Over </p> : 
                currTurn == 'w' ? <p id="white"> White to Move </p>: 
                <p id="black"> Black to Move </p>

                // currTurn == 'w' ? "White to move" : props.game_state.isGameOver() 
                // ? props.game_state.isCheckmate()
                // ? currTurn == 'w'
                // ? "White has checkmated black!"
                // : "Black has checkmated white!"
                // ? "Game Over!" :  "Black to move"
                //props.game_state.isGameOver() ? "Game Over!" :  currTurn
            }
        </div>
    )

}

export default ChessHeader;