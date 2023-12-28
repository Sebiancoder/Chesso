import React, { useEffect, useState} from "react";
import './ChessHeader.css'
const ChessHeader = (props: any) => {

    const [currTurn, setCurrTurn] = useState<string>("");
    useEffect(() => {
        console.log(currTurn);
        setCurrTurn(props.game_state.turn())
    }, [props])
    // console.log(currTurn);
    // var curr_player: string = "It's white's turn";
    // if (currTurn == 'w') {
    //     curr_player = "It's white's turn";
    // } else if (currTurn == 'b'){
    //     curr_player = "It's black's turn";
    // }
    return (
        <div>
            <p>{
                //props.game_state.turn()
                props.game_state.isGameOver() ?
                props.game_state.isCheckmate() ?
                currTurn == 'w' ?
                <p id="black"> Black has checkmated white </p> : <p id="white"> White has checkmated black! </p>
                : props.game_state.isThreefoldRepetition() ?
                <p id="gray"> Game drawn due to threefold repetition </p> :
                props.game_state.isStalemate() ?
                <p id="gray"> Game drawn due to stalemate </p> :
                props.game_state.isInsufficientMaterial() ?
                <p id="gray"> Game drawn due to insufficient material </p> :
                props.game_state.isDraw() ? <p id="gray"> Game drawn due to 50-move rule </p> :
                <p id="gray"> Game Over </p> : 
                currTurn == 'w' ? <p id="white"> White to move </p>: 
                <p id="black"> Black to move </p>

                // currTurn == 'w' ? "White to move" : props.game_state.isGameOver() 
                // ? props.game_state.isCheckmate()
                // ? currTurn == 'w'
                // ? "White has checkmated black!"
                // : "Black has checkmated white!"
                // ? "Game Over!" :  "Black to move"
                //props.game_state.isGameOver() ? "Game Over!" :  currTurn
            }</p>
        </div>
    )

}

export default ChessHeader;